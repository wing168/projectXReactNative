// Validation
const Joi = require('@hapi/joi');

const signUpValidation = (data) => {

    const schema = Joi.object({
        firstName: Joi.string().empty('').default('First name'),
        lastName: Joi.string().empty('').default('Surname'),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
};

//NO need to validate login as to prevent providing clues on how to log in

// const logInValidation = (data) => {

//     const schema = Joi.object({
//         email: Joi.string().min(6).required().email(),
//         password: Joi.string().min(6).required()
//     });

//     return schema.validate(data);
// };

module.exports.signUpValidation = signUpValidation;





