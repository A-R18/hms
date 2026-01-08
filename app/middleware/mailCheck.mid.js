const checkMailExistence = async (req, res, next) => {
  const email = req.body.email;
  const result = await mailCheck(email);
  if (result === "email already exsists") {
    res.status(400).json({ alert: "Existing email can't be reused!" });
  }
  next();
};

//{{$randomPassword}}
//{{$randomEmail}}
module.exports = checkMailExistence;
