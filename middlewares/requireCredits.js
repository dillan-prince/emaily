module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res
      .status(403) // Forbidden
      .send({
        error: "You do not have enough credits to perform this operation."
      });
  }

  next();
};
