const Media = require('../../models/media.model');
const User = require('../../models/user.model');
const { ObjectId } = require('mongoose').Types;

const ban = async (userId) => {
  // Validate userId
  if (!ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID');
  }

  // Start a transaction
  const session = await User.startSession();
  session.startTransaction();

  try {
 
    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error('No user to ban');
    }

 
    user.restricted = true;
    await user.save({ session });

 
    await Media.updateMany(
      { user: userId },
      { $set: { expired: true } },
      { session }
    );

 
    await session.commitTransaction();
    console.log(`User ${userId} banned successfully`);

 
    return { success: true, message: 'User banned successfully' };
  } catch (error) {
 
    await session.abortTransaction();
    console.error(`Error banning user ${userId}:`, error);
    throw error;
  } finally {
 
    session.endSession();
  }
};

module.exports = ban;