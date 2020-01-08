const Limit = require("../models/Limit");

module.exports.checkLimit = async (userID, recName) => {
  return;
  let userRecLimit = await Limit.findOne({ userID });
  if (userRecLimit.recommendations[`${recName}`] <= 0) {
    throw new Error("user.recommendationLimit");
  }
};

module.exports.changeLimit = async (userID, recommendationName, amount) => {
  return;
  await Limit.updateOne(
    { userID },
    {
      $inc: {
        [`recommendations.${recommendationName}`]: amount
      }
    }
  );
};
