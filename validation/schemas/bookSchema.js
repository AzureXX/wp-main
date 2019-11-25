const joi = require('@hapi/joi')
const mongooseID = require('mongoose').Types.ObjectId

module.exports = joi.object({
    name: joi.object({
        us: joi.string()
            .required()
            .trim()
            .pattern(/^(?:[^\<\>]*)$/),
        ru: joi.string()
            .trim()
            .pattern(/^(?:[^\<\>]*)$/),
        az: joi.string()
            .trim()
            .pattern(/^(?:[^\<\>]*)$/)
    }),
    description: joi.object({
        us: joi.string()
            .trim()
            .pattern(/^(?:[^\<\>]*)$/),
        ru: joi.string()
            .trim()
            .pattern(/^(?:[^\<\>]*)$/),
        az: joi.string()
            .trim()
            .pattern(/^(?:[^\<\>]*)$/)
    }),
    img: joi.object({
        us: joi.string()
            .trim()
            .pattern(/^(?:[^\<\>]*)$/),
        ru: joi.string()
            .trim()
            .pattern(/^(?:[^\<\>]*)$/),
        az: joi.string()
            .trim()
            .pattern(/^(?:[^\<\>]*)$/)
    }),
    tags: joi.object(),
    authors: joi.string()
        .custom((value, helpers) => {
            if (!mongooseID.isValid(value)) return 'mongooseID.invalid'
            return value
        }, 'Mongoose validID checker'),
    genres: joi.string()
        .trim()
        .pattern(/^(?:[^\<\>]*)$/),
    isbn: joi.string()
        .trim()
        .alphanum()
        .pattern(/^(?:[^\<\>]*)$/),
    published: joi.string()
        .custom((value, helpers) => {
            if (new Date(value) == 'Invalid Date') return 'date.invalid'
            return value
        }, 'Valid time checker')
        .required(),
    publisher: joi.string()
        .custom((value, helpers) => {
            if (!mongooseID.isValid(value)) return 'mongooseID.invalid'
            return value
        }, 'Mongoose validID checker'),
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