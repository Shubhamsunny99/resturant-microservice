const { Validator } = require('node-input-validator');

addRestuarantValidation = (req, res, next) => {
    const validate = new Validator(req.body, {
      name      : "required|string",
      location  : "required|string",
      lang      : "required|string",
      lat       : "required|string"
    });
  
    validate.check().then((matched) => {
      if (!matched) {
        let key = Object.keys(validate.errors)[0]
        return res.json({
            status : 400,
            error : validate.errors[key].message
        })
      } else {
        next()
      }
    }).catch((err) => {
        return res.json({
            status : 400,
            error : err
        })
    })
};

addMenuValidation = (req, res, next) => {
  const validate = new Validator(req.body, {
    restuarantID : "required|string",
    menuName     : "required|string",
    cuisine      : "required|string",
    price        : "required|integer"
  });

  validate.check().then((matched) => {
    if (!matched) {
      let key = Object.keys(validate.errors)[0]
      return res.json({
          status : 400,
          error : validate.errors[key].message
      })
    } else {
      next()
    }
  }).catch((err) => {
      return res.json({
          status : 400,
          error : err
      })
  })
};

  module.exports = {
    addRestuarantValidation : addRestuarantValidation,
    addMenuValidation       : addMenuValidation
  }