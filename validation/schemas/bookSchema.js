const joi = require('@hapi/joi')
const mongooseID = require('mongoose').Types.ObjectId

module.exports = joi.object({
    name: joi.object({
        us: joi.string()
            .required()
            .trim()
            .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=\;]*)$/),
        ru: joi.string()
            .trim()
            .allow('')
            .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=\;]*)$/),
        az: joi.string()
            .trim()
            .allow('')
            .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=\;]*)$/)
    }),
    description: joi.object({
        us: joi.string()
            .trim()
            .allow('')
            .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=]*)$/),
        ru: joi.string()
            .trim()
            .allow('')
            .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=]*)$/),
        az: joi.string()
            .trim()
            .allow('')
            .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=]*)$/)
    }),
    img: joi.object({
        us: joi.string()
            .trim()
            .allow('')
            .pattern(/^(?:[^\<\>\ ]*)$/),
        ru: joi.string()
            .trim()
            .allow('')
            .pattern(/^(?:[^\<\>\ ]*)$/),
        az: joi.string()
            .trim()
            .allow('')
            .pattern(/^(?:[^\<\>\ ]*)$/)
    }),
    tags: joi.object().allow({}),
    authors: joi.custom((value, helpers) => {
        if (!mongooseID.isValid(value))
            return helpers.error('mongooseID.invalid')
        return value
    }, 'MongooseID_validity_checker'),
    genres: joi.string()
        .trim()
        .allow('')
        .custom((value, helpers) => {
            let genreArr = value.split(',')
            let length = genreArr.length

            for (let i = 0; i < length; i++) {
                if (!/^(?:[^0123456789\<\>\ \.\!\?\`\'\"\~\#\$\%\^\&\*\(\)\_\+\=\/\|)]*)$/.test(genreArr[i])) {
                    return helpers.error('genre.invalidChars')
                }
            }
            return value
        }, 'Genre_checker'),
    isbn: joi.string()
        .trim()
        .alphanum()
        .allow(''),
    published: joi.date()
        .less('now')
        .required(),
    publisher: joi.string()
        .allow('')
        .custom((value, helpers) => {
            if (!mongooseID.isValid(value))
                return helpers.error('mongooseID.invalid')
            return value
        }, 'MongooseID_validity_checker'),
    wikipediaLink: joi.object({
        us: joi.string()
            .trim()
            .pattern(/^(?:[^\<\>\ ]*)$/),
        ru: joi.string()
            .trim()
            .pattern(/^(?:[^\<\>\ ]*)$/),
        az: joi.string()
            .trim()
            .pattern(/^(?:[^\<\>\ ]*)$/),
    }),
    website: joi.object({
        us: joi.string()
            .trim()
            .pattern(/^(?:[^\<\>\ ]*)$/),
        ru: joi.string()
            .trim()
            .pattern(/^(?:[^\<\>\ ]*)$/),
        az: joi.string()
            .trim()
            .pattern(/^(?:[^\<\>\ ]*)$/),
    })
})