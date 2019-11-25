const schema = require('../schemas/bookSchema')

module.exports = (reqBody) => {
    let validationResult = schema.validate(reqBody, {
        abortEarly: false
    })

    if (validationResult.error) {
        console.log(validationResult.error.details)
        throw new Error('validation Error')
        // throw validationResult.error.details.map(e => {
        //     switch (e.path[0]) {
        //         case 'name':
        //             switch (e.type) {
        //                 case 'string.empty':
        //                     return 'name.required'

        //             }
        //     }
        // })
    }
}