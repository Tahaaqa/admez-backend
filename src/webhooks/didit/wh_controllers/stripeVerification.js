const Stripe = require('stripe');
const axios = require('axios');
const { PassThrough } = require('stream');
const User = require("../../../models/user.model.js");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Verification = require("../../../models/verification.model.js")

module.exports = SubmitstripeVerification = async (vendor_data, kyc , face) => {
  try {
    const user = await User.findOne({ _id: vendor_data });
    
    if (!user || !user.stripeAccountId) {
      throw new Error('User or Stripe account not found');
    }

 
    const uploadFromUrl = async (url, fileName) => {
      try {
        const response = await axios({
          method: 'get',
          url: url,
          responseType: 'stream'
        });

        const passThrough = new PassThrough();
        response.data.pipe(passThrough);

   
        let contentType = 'image/jpg';
        if (url.toLowerCase().endsWith('.png')) contentType = 'image/png';
        if (url.toLowerCase().endsWith('.pdf')) contentType = 'application/pdf';

        return await stripe.files.create({
          purpose: 'identity_document',
          file: {
            data: passThrough,
            name: fileName,
            type: contentType
          }
        });
      } catch (error) {
        console.error(`Error uploading ${fileName} from URL:`, error);
        throw new Error(`Failed to upload ${fileName}: ${error.message}`);
      }
    };

    if (kyc.document_type.toLowerCase() == "passport") {
      // Passport only needs front and portrait
      const [frontUpload, portraitUpload] = await Promise.all([
        uploadFromUrl(kyc.full_front_image, 'passport_front.jpg'),
        uploadFromUrl(face.target_image, 'portrait.jpg')
      ]);

      await stripe.accounts.update(
        user.stripeAccountId,
        {
          individual: {
            verification: {
              document: {
                front: frontUpload.id
              },
              additional_document: {
                front: portraitUpload.id
              }
            }
          }
        }
      );
    } else {
      // Other documents need front, back and portrait
      const [frontUpload, backUpload, portraitUpload] = await Promise.all([
        uploadFromUrl(kyc.full_front_image, 'id_front.jpg'),
        uploadFromUrl(kyc.full_back_image, 'id_back.jpg'),
        uploadFromUrl(face.target_image, 'portrait.jpg')
      ]);

      await stripe.accounts.update(
        user.stripeAccountId,
        {
          individual: {
            verification: {
              document: {
                front: frontUpload.id,
                back: backUpload.id
              },
              additional_document: {
                front: portraitUpload.id
              }
            }
          }
        }
      );
    }

    return { success: true };
  } catch (error) {
    console.error('Stripe verification error:', error);
    await Verification.findOneAndUpdate(
      {
        user : vendor_data
      },
      {
        status : "Unable to verify"
      }
    )
    throw error;
  }
};