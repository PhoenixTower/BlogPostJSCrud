const Joi = require("joi")

async function validateSignup(data) {
    const Schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
    });
    const { error, value } = Schema.validate(data);
    return { error, value }
}

async function validateLogin(data) {
    const Schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
    });
    const { error, value } = Schema.validate(data);
    return { error, value }
}

async function validateGetAllUser(data) {
    const Schema = Joi.object({
        page: Joi.number().integer(),
        limit: Joi.number().integer(),
        csvDownload: Joi.boolean(),
        exportFile: Joi.boolean()
    });
    const { error, value } = Schema.validate(data);
    return { error, value }
}

module.exports = { validateLogin, validateSignup, validateGetAllUser }