const nodemailer = require("nodemailer")


const sendEmail = async (options) => {

  const transporter = nodemailer.createTransport({
    host : process.env.EMAIL_HOST,
    port : process.env.EMAIL_PORT,
    auth : {
      user : process.env.EMAIL_USER,
      pass : process.env.EMAIL_PASSWORD
    }
  })

  const emailOptions = {
    from : 'Duckie support <support@duckie.im>',
    to : options.email,
    subject : options.subject,
    text : options.message,
    html : `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Request</title>
    <style type="text/css">
        /* Client-specific styles */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        
        /* Reset styles */
        body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
        
        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
        
        /* Main styles */
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #444444;
            background-color: #f7f7f7;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            padding: 20px 0;
        }
        
        .logo {
            max-width: 150px;
        }
        
        .content {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        h1 {
            color: #2c3e50;
            font-size: 24px;
            margin-top: 0;
        }
        
        p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
        }
        
        .button {
            background-color: #FFEB00;
            border-radius: 4px;
            color: #344CB7 !important;
            display: inline-block;
            font-size: 16px;
            font-weight: bold;
            line-height: 40px;
            text-align: center;
            text-decoration: none;
            width: 200px;
            -webkit-text-size-adjust: none;
            mso-hide: all;
        }
        
        .button:hover {
            background-color: #2980b9 !important;
        }
        
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #999999;
        }
        
        .divider {
            border-top: 1px solid #eeeeee;
            margin: 20px 0;
        }
        
        .small {
            font-size: 14px;
            color: #777777;
        }
        .elegant-blue-text {
          color: #344CB7;
          font-weight: 700; /* Bold */
          font-size: 1.5rem; /* 24px equivalent */
          font-family: 'Segoe UI', Roboto, -apple-system, sans-serif;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
          line-height: 1.4;
          transition: all 0.3s ease;
        }
  
        /* Hover effect for extra elegance */
        .elegant-blue-text:hover {
          color: #2a3da0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }
    </style>
</head>
<body style="margin: 0; padding: 0;">
    <!-- Email Header -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" valign="top" style="padding: 20px 0;">
                            <span class="elegant-blue-text">Duckie.</span>
                        </td>
                    </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
            </td>
        </tr>
    </table>
    
    <!-- Email Body -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 0 10px;">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 30px; border-radius: 8px;">
                            <h1 style="color: #2c3e50; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 24px; font-weight: bold; margin: 0 0 20px 0;">Password Reset Request</h1>
                            <p style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">We received a request to reset your password. Click the button below to set a new password:</p>
                            
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 25px 0;">
                                <tr>
                                    <td align="center">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center" bgcolor="#3498db" style="border-radius: 4px;">
                                                    <a href="${options.url}" target="_blank" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 4px; padding: 12px 25px; border: 1px solid #3498db; display: inline-block; font-weight: bold;">Reset Password</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">If you didn't request a password reset, please ignore this email or contact support if you have questions.</p>
                            
                            <div style="border-top: 1px solid #eeeeee; margin: 20px 0;"></div>
                            
                            <p class="small" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #777777; margin: 0;">This password reset link will expire in 10 minutes. For security reasons, we don't store your password, so it must be reset if you forget it.</p>
                        </td>
                    </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
            </td>
        </tr>
    </table>
    
    <!-- Email Footer -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 20px 10px;">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; color: #999999; padding: 20px 0;">
                            <p style="margin: 0;">© 2025 Duckie monetization Hub. All rights reserved.</p>
                            <p style="margin: 5px 0 0 0;">
                                <a href="https://www.duckie.im/privacy-policies" style="color: #999999; text-decoration: underline;">Privacy Policy</a> | 
                                <a href="https://www.duckie.im/terms-of-use" style="color: #999999; text-decoration: underline;">Terms of Service</a>
                            </p>
                            <p style="margin: 5px 0 0 0;">
                                30 N Gould St Ste R  Sheridan, WY 82801
                            </p>
                        </td>
                    </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
            </td>
        </tr>
    </table>
</body>
</html>`
  }

  await transporter.sendMail(emailOptions)

}

module.exports = sendEmail