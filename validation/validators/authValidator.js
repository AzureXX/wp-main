const schema = require('../schemas/authSchema')

module.exports.signUp = (reqBody) => {    
    let validationResult = schema.signUp.validate(reqBody, {
        abortEarly: false
    })

    if (validationResult.error) {
        throw new Error(validationResult.error.details.map(e => {
            switch (e.path[0]) {
                case 'email': {
                    switch (e.type) {
                        case 'string.empty':
                            return 'email.required';
                        case 'string.email':
                            return 'email.notEmail';
                    }
                }
                case 'password': {
                    switch (e.type) {
                        case 'string.empty':
                            return 'password.required'
                        case 'string.min':
                            return 'password.min'
                    }
                }
                case 'password2': {
                    switch (e.type) {
                        case 'any.only':
                            return 'password.notMatch'
                    }
                }
                case 'username':{
                    switch (e.type) {
                        case 'string.pattern.base':
                            return 'username.invalidChars'
                        case 'string.min':
                            return 'username.min'
                        case 'string.max':
                            return 'username.max'
                    }
                }
                case 'type':
                    switch (e.type) {
                        case 'string.empty':
                            return 'type.required'
                        case 'any.only':
                            return 'type.notAllowed'
                    }
            }
        }))
    }
}

module.exports.signIn = (reqBody) => {
    let validationResult = schema.signIn.validate(reqBody, {
        abortEarly: false
    })

    if (validationResult.error) {
        throw new Error(validationResult.error.details.map(e => {
            switch (e.path[0]) {
                case 'email': {
                    switch (e.type) {
                        case 'string.empty':
                            return 'email.required';
                        case 'string.email':
                            return 'email.notEmail';
                    }
                }
                case 'password': {
                    switch (e.type) {
                        case 'string.empty':
                            return 'password.required'
                    }
                }
            }
        }))
    }
}