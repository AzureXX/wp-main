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
            .allow(null, '')
            .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=\;]*)$/),
        az: joi.string()
            .trim()
            .allow(null, '')
            .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=\;]*)$/)
    }).length(3),
    description: joi.object({
        us: joi.string()
            .trim()
            .allow(null, '')
            .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=]*)$/),
        ru: joi.string()
            .trim()
            .allow(null, '')
            .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=]*)$/),
        az: joi.string()
            .trim()
            .allow(null, '')
            .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=]*)$/)
    }).length(3),
    img: joi.object({
        us: joi.string()
            .trim()
            .allow(null, '')
            .pattern(/^(?:[^\<\>\ ]*)$/),
        ru: joi.string()
            .trim()
            .allow(null, '')
            .pattern(/^(?:[^\<\>\ ]*)$/),
        az: joi.string()
            .trim()
            .allow(null, '')
            .pattern(/^(?:[^\<\>\ ]*)$/)
    }).length(3),
    tags: joi.object()
        .allow({}, null, ''),
    authors: joi.array()
        .allow(null,'')
        .custom((value, helpers) => {
            let length = value.length
            for (let i = 0; i < length; i++) {
                if (!mongooseID.isValid(value[i]))
                    return helpers.error('mongooseID.invalid')
                return value
            }
        }, 'MongooseID_validity_checker'),
    genres: joi.array()
        .allow(null,'')
        .custom((value, helpers) => {
            let length = value.length

            for (let i = 0; i < length; i++) {
                if (!/^(?:[^0123456789\<\>\ \.\!\?\`\'\"\~\#\$\%\^\&\*\(\)\+\=\/\|\:\;\@)]*)$/.test(value[i])) {
                    return helpers.error('genre.invalidChars')
                }
            }
            return value
        }, 'Genre_checker'),
    ISBN: joi.string()
        .trim()
        .alphanum()
        .allow(null, ''),
    published: joi.date()
        .less('now')
        .required(),
    publisher: joi.string()
        .allow(null, '')
        .custom((value, helpers) => {
            if (!mongooseID.isValid(value))
                return helpers.error('mongooseID.invalid')
            return value
        }, 'MongooseID_validity_checker'),
    wikipediaLink: joi.object({
        us: joi.string()
            .allow(null, '')
            .trim()
            .pattern(/^(?:[^\<\>\ ]*)$/),
        ru: joi.string()
            .allow(null, '')
            .trim()
            .pattern(/^(?:[^\<\>\ ]*)$/),
        az: joi.string()
            .allow(null, '')
            .trim()
            .pattern(/^(?:[^\<\>\ ]*)$/),
    }).length(3),
    website: joi.object({
        us: joi.string()
            .allow(null, '')
            .trim()
            .pattern(/^(?:[^\<\>\ ]*)$/),
        ru: joi.string()
            .allow(null, '')
            .trim()
            .pattern(/^(?:[^\<\>\ ]*)$/),
        az: joi.string()
            .allow(null, '')
            .trim()
            .pattern(/^(?:[^\<\>\ ]*)$/),
    }).length(3)
})