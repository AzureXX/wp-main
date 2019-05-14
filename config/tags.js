module.exports = {
    user: [{
        id: 1,
        name: "kid",
        effect: {
            books: {
                kid: +1000,
                fantasy: +800,
                classics: -200,
                erotics: -10000
            },
            movies: {
                kid: +1000,
                fantasy: +400,
                classics: -150,
                erotics: -10000
            },
            courses: {
                kid: +300
            },
            education: {
                kid: +300
            },
        }
    }
    ],
    book: [{
        id: 1,
        name: "kid",
        effect: {
            kid: +100,
        }
    }],
    movie: [{
        id: 1,
        name: "kid",
        effect: {
            kid: +100,
        }
    }],
    course: [{
        id: 1,
        name: "kid",
        effect: {
            kid: +100,
        }
    }],
    education: [{
        id: 1,
        name: "kid",
        effect: {
            kid: +100
        }
    }],

}