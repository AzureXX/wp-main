const schema = require('../schemas/bookSchema')

module.exports = (reqBody) => {
    let validationResult = schema.validate(reqBody, {
        abortEarly: false
    })

    if (validationResult.error) {
        console.log('===================== START ========================')
        throw validationResult.error.details.map(e => {
            console.log('===================== Error Start ========================')
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
                    switch (e.type) {
                        case 'object.length':
                            return 'form.modified'
                        case 'object.unknown':
                            return 'form.modified'
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
                    switch (e.type) {
                        case 'object.length':
                            return 'form.modified'
                        case 'object.unknown':
                            return 'form.modified'
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
                    switch (e.type) {
                        case 'object.length':
                            return 'form.modified'
                        case 'object.unknown':
                            return 'form.modified'
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
                        case 'array.base':
                            return 'form.modified'
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
                case 'ISBN': {
                    switch (e.type) {
                        case 'string.alphanum':
                            return 'ISBN.invalidChars'
                    }
                }
                case 'published': {
                    switch (e.type) {
                        case 'date.base':
                            return 'published.required'
                        case 'date.less':
                            return 'published.timeLimit'
                    }
                }
                case 'publisher': {
                    switch (e.type) {
                        case 'string.base':
                            return 'form.modified'
                        case 'mongooseID.invalid':
                            return 'publisher.invalidID'
                    }
                }
                case 'wikipediaLink': {
                    switch (e.path[1]) {
                        case 'us': {
                            switch (e.type) {
                                case 'string.pattern.base':
                                    return 'wikipediaLinkUS.invalidChars'
                            }
                        }
                        case 'ru': {
                            switch (e.type) {
                                case 'string.pattern.base':
                                    return 'wikipediaLinkRU.invalidChars'
                            }
                        }
                        case 'az': {
                            switch (e.type) {
                                case 'string.pattern.base':
                                    return 'wikipediaLinkAZ.invalidChars'
                            }
                        }
                    }
                    switch (e.type) {
                        case 'object.length':
                            return 'form.modified'
                        case 'object.unknown':
                            return 'form.modified'
                    }
                }
                case 'website': {
                    switch (e.path[1]) {
                        case 'us': {
                            switch (e.type) {
                                case 'string.pattern.base':
                                    return 'websiteUS.invalidChars'
                            }
                        }
                        case 'ru': {
                            switch (e.type) {
                                case 'string.pattern.base':
                                    return 'websiteRU.invalidChars'
                            }
                        }
                        case 'az': {
                            switch (e.type) {
                                case 'string.pattern.base':
                                    return 'websiteAZ.isbn.invalidChars'
                            }
                        }
                    }
                    switch (e.type) {
                        case 'object.length':
                            return 'form.modified'
                        case 'object.unknown':
                            return 'form.modified'
                    }
                }
            }
        })
    }
}