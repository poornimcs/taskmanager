const Joi = require("joi");

const tripSchema = Joi.object({
  tripName: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Trip name is required"
    }),

  destination: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Destination is required"
    }),

  startDate: Joi.date()
    .required(),

  endDate: Joi.date()
    .greater(Joi.ref("startDate"))
    .required()
    .messages({
      "date.greater":
        "End date must be greater than start date"
    })
});

module.exports = tripSchema;