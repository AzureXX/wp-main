const schema = require('../schemas/bookSchema')

module.exports = (reqBody) => {
    let validationResult = schema.validate(reqBody, {
        abortEarly: false
    })

    if (validationResult.error) {
        throw validationResult.error.details.map(e => {
            // console.log(validationResult)
            console.log(e)
            // return `[ ${e.type} ] error at path [ ${e.path} ]`
            switch (e.path[0]) {
                case 'name': {
                    switch (e.path[1]) {
                        case 'us': {
                            switch (e.type) {
                                case 'string.empty':
                                    return 'nameUS.isEmpty'
                                case 'string.pattern.base':
                                    return 'nameUS.invalidChars'
                            }
                        }
                        case 'ru': {
                            switch (e.type) {
                                case 'string.pattern.base':
                                    return 'nameRU.invalidChars'
                            }
                        }
                        case 'az': {
                            switch (e.type) {
                                case 'string.pattern.base':
                                    return 'nameAZ.invalidChars'
                            }
                        }
                    }
                }
                case 'description': {
                    switch (e.path[1]) {
                        case 'us': {
                            switch (e.type) {
                                case 'string.pattern.base':
                                    return 'descriptionUS.invalidChars'
                            }
                        }
                        case 'ru': {
                            switch (e.type) {
                                case 'string.pattern.base':
                                    return 'descriptionRU.invalidChars'
                            }
                        }
                        case 'az': {
                            switch (e.type) {
                                case 'string.pattern.base':
                                    return 'descriptionAZ.invalidChars'
                            }
                        }
                    }
                }
                case 'img': {
                    switch (e.path[1]) {
                        case 'us': {
                            switch (e.type) {
                                case 'string.pattern.base':
                                    return 'imgUS.invalidChars'
                            }
                        }
                        case 'ru': {
                            switch (e.type) {
                                case 'string.pattern.base':
                                    return 'imgRU.invalidChars'
                            }
                        }
                        case 'az': {
                            switch (e.type) {
                                case 'string.pattern.base':
                                    return 'imgAZ.invalidChars'
                            }
                        }
                    }
                }
                case 'tags': {
                    switch (e.type) {
                        case 'object.base':
                            return 'tags.invalidType'
                    }
                }
                case 'authors': {
                    switch (e.type) {
                        case 'mongooseID.invalid':
                            return 'authors.invalidID'
                    }
                }
                case 'genres': {
                    switch (e.type) {
                        case 'genre.invalidChars':
                            return 'genre.invalidChars'
                    }
                }
                case 'isbn': {
                    switch (e.type) {
                        case 'string.alphanum':
                            return 'isbn.invalidChars'
                    }
                }
                case 'published': {
                    switch (e.type) {
                        case 'date.base':
                            return 'published.invalidType'
                        case 'date.less':
                            return 'published.timeLimit'
                    }
                }
                case 'publisher': {
                    switch (e.type) {
                        case 'string.base':
                            return 'publisher.invalidType'
                        case 'mongooseID.invalid':
                            return 'publisher.invalidID'
                    }
                }
            }
        })
    }
}