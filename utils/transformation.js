const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    mongooseId: id => {
        return new ObjectId(ObjectId.isValid(id) ? id : '000000000000000000000000');
    },
    getObject (body, type)  {
        switch (type) {
            case "book":
                return this.getBookObject(body)
                case "movie":
                return this.getMovieObject(body)
                case "course":
                return this.getCourseObject(body)
                case "person":
                return this.getPersonObject(body)
        }
    },
    getBookObject(body) {
        const {
            name,
            description,
            authors,
            genres,
            isbn,
            published,
            publisher,
            wikipediaLink,
            website,
            tags,
            img
        } = body;

        return {
            name: {
                us: name ? name.us : null,
                ru: name ? name.ru : null,
                az: name ? name.az : null
            },
            description: {
                us: description ? description.us : null,
                ru: description ? description.ru : null,
                az: description ? description.az : null
            },
            authors: authors ?
                authors.split(',').map(item => {
                    return this.mongooseId(item.trim());
                }) : null,
            genres: genres ? genres.split(',').map(item => item.trim()) : null,
            ISBN: isbn,
            published: published,
            publisher: publisher ?
                publisher.split(',').map(item => {
                    return this.mongooseId(item.trim());
                }) : null,
            wikipediaLink: {
                us: wikipediaLink ? wikipediaLink.us : null,
                ru: wikipediaLink ? wikipediaLink.ru : null,
                az: wikipediaLink ? wikipediaLink.az : null
            },
            website: {
                us: website ? website.us : null,
                ru: website ? website.ru : null,
                az: website ? website.az : null
            },
            img: {
                us: img ? img.us : null,
                ru: img ? img.ru : null,
                az: img ? img.az : null
            },
            tags: tags ? tags.split(',').map(item => item.trim()) : null
        };
    },
    getMovieObject(body)  {
        const { name, description, actors, genres, img, crew } = body;
        return {
            name: {
                us: name ? name.us : null,
                ru: name ? name.ru : null,
                az: name ? name.az : null
            },
            description: {
                us: description ? description.us : null,
                ru: description ? description.ru : null,
                az: description ? description.az : null
            },
            img: {
                us: img ? img.us : null,
                ru: img ? img.ru : null,
                az: img ? img.az : null
            },
            actors: actors ?
                actors.split(',').map(item => {
                    return this.mongooseId(item.trim());
                }) : null,
            genres: genres ? genres.split(',').map(item => item.trim()) : null,
            crew: crew ?
                crew.map(item => ({
                    role: item.role,
                    id: this.mongooseId(item.id.trim())
                })) : null
        };
    },
    getCourseObject(body)  {
        const {
            name,
            description,
            authors,
            genres,
            published,
            publisher,
            website,
            img,
            video,
            tags
        } = body;
        return {
            name: {
                us: name ? name.us : null,
                ru: name ? name.ru : null,
                az: name ? name.az : null
            },
            description: {
                us: description ? description.us : null,
                ru: description ? description.ru : null,
                az: description ? description.az : null
            },
            authors: authors ?
                authors.split(',').map(item => {
                    return this.mongooseId(item.trim());
                }) : null,
            genres: genres ? genres.split(',').map(item => item.trim()) : null,
            published: published,
            publisher: publisher ?
                publisher.split(',').map(item => {
                    return this.mongooseId(item.trim());
                }) : null,
            website: {
                us: website ? website.us : null,
                ru: website ? website.ru : null,
                az: website ? website.az : null
            },
            img: {
                us: img ? img.us : null,
                ru: img ? img.ru : null,
                az: img ? img.az : null
            },
            video: {
                us: video ? video.us : null,
                ru: video ? video.ru : null,
                az: video ? video.az : null
            },
            tags: tags ? tags.split(',').map(item => item.trim()) : null
        };
    },
    getPersonObject(body)  {
        const { name, description, wikipediaLink, tags, img } = body;
        return {
            name: {
                us: name ? name.us : null,
                ru: name ? name.ru : null,
                az: name ? name.az : null
            },
            description: {
                us: description ? description.us : null,
                ru: description ? description.ru : null,
                az: description ? description.az : null
            },
            wikipediaLink: {
                us: wikipediaLink ? wikipediaLink.us : null,
                ru: wikipediaLink ? wikipediaLink.ru : null,
                az: wikipediaLink ? wikipediaLink.az : null
            },
            img: {
                us: img ? img.us : null,
                ru: img ? img.ru : null,
                az: img ? img.az : null
            },
            tags: tags ? tags.split(',').map(item => item.trim()) : null
        };
    },
    getOffset: (page, size) => {
        page = parseInt(page);
        if (isNaN(page)) page = 1;
        const offset = (page - 1) * size;
        return offset
    }
};