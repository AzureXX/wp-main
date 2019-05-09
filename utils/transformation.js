const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  mongooseId(id) {
    return new ObjectId(ObjectId.isValid(id) ? id : '000000000000000000000000');
  },
  multi(item) {
    return {
      us: item ? item.us : null,
      ru: item ? item.ru : null,
      az: item ? item.az : null
    };
  },
  strToArr(item, id) {
    if (id)
      return item
        ? item.split(',').map(i => {
            return this.mongooseId(i.trim());
          })
        : null;
    return item ? item.split(',').map(i => i.trim()) : null;
  },
  getObject(body, type) {
    switch (type) {
      case 'book':
        return this.getBookObject(body);
      case 'movie':
        return this.getMovieObject(body);
      case 'course':
        return this.getCourseObject(body);
      case 'person':
        return this.getPersonObject(body);
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
      name: this.multi(name),
      description: this.multi(description),
      authors: this.strToArr(authors, true),
      genres: this.strToArr(genres),
      ISBN: isbn,
      published: published,
      publisher: this.strToArr(publisher, true),
      wikipediaLink: this.multi(wikipediaLink),
      website: this.multi(website),
      img: this.multi(img),
      tags: this.strToArr(tags)
    };
  },
  getMovieObject(body) {
    const { name, description, actors, genres, img, crew, tags } = body;
    return {
      name: this.multi(name),
      description: this.multi(description),
      img: this.multi(img),
      actors: this.strToArr(actors, true),
      genres: this.strToArr(genres),
      crew: crew
        ? crew.map(item => ({
            role: item.role,
            id: this.mongooseId(item.id.trim())
          }))
        : null,
      tags: this.strToArr(tags)
    };
  },
  getCourseObject(body) {
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
      name: this.multi(name),
      description: this.multi(description),
      authors: this.strToArr(authors, true),
      genres: genres ? genres.split(',').map(item => item.trim()) : null,
      published: published,
      publisher: this.strToArr(publisher, true),
      website: this.multi(website),
      img: this.multi(img),
      video: this.multi(video),
      tags: this.strToArr(tags)
    };
  },
  getPersonObject(body) {
    const { name, description, wikipediaLink, tags, img } = body;
    return {
      name: this.multi(name),
      description: this.multi(description),
      wikipediaLink: this.multi(wikipediaLink),
      img: this.multi(img),
      tags: this.strToArr(tags)
    };
  },
  getOffset: (page, size) => {
    page = parseInt(page);
    if (isNaN(page)) page = 1;
    const offset = (page - 1) * size;
    return offset;
  }
};
