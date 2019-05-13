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
  common({ name, description, img, tags }) {
    return {
      name: this.multi(name),
      description: this.multi(description),
      img: this.multi(img),
      tags: this.strToArr(tags)
    };
  },
  strToArr(item, isID) {
    if (isID)
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
      case 'educationCategory':
        return this.getEducationCategoryObject(body);
      case 'educationSubcategory':
        return this.getEducationSubcategoryObject(body);
      case 'educationTopic':
        return this.getEducationTopicObject(body);
      case 'educationSubtopic':
        return this.getEducationSubtopicObject(body);
    }
  },
  getBookObject(body) {
    const {
      authors,
      genres,
      isbn,
      published,
      publisher,
      wikipediaLink,
      website
    } = body;

    return {
      ...this.common(body),
      authors: this.strToArr(authors, true),
      genres: this.strToArr(genres),
      ISBN: isbn,
      published: published,
      publisher: this.strToArr(publisher, true),
      wikipediaLink: this.multi(wikipediaLink),
      website: this.multi(website)
    };
  },
  getMovieObject(body) {
    const { actors, genres, crew } = body;
    return {
      ...this.common(body),
      actors: this.strToArr(actors, true),
      genres: this.strToArr(genres),
      crew: crew
        ? crew.map(item => ({
            role: item.role,
            id: this.mongooseId(item.id.trim())
          }))
        : null
    };
  },
  getCourseObject(body) {
    const { authors, genres, published, publisher, website, video } = body;
    return {
      ...this.common(body),
      authors: this.strToArr(authors, true),
      genres: genres ? genres.split(',').map(item => item.trim()) : null,
      published: published,
      publisher: this.strToArr(publisher, true),
      website: this.multi(website),
      video: this.multi(video)
    };
  },
  getPersonObject(body) {
    const { wikipediaLink } = body;
    return {
      ...this.common(body),
      wikipediaLink: this.multi(wikipediaLink)
    };
  },
  getEducationCategoryObject(body) {
    const { subcategories } = body;
    return {
      ...this.common(body),
      subcategories: this.strToArr(subcategories, true)
    };
  },
  getEducationSubcategoryObject(body) {
    const { categories, topics } = body;
    return {
      ...this.common(body),
      categories: this.strToArr(categories, true),
      topics: this.strToArr(topics, true)
    };
  },
  getEducationTopicObject(body) {
    const { subcategories, subtopics } = body;
    return {
      ...this.common(body),
      subcategories: this.strToArr(subcategories, true),
      subtopics: this.strToArr(subtopics, true)
    };
  },
  getEducationSubtopicObject(body) {
    const { topics } = body;
    return {
      ...this.common(body),
      topics: this.strToArr(topics, true)
    };
  },
  getOffset: (page, size) => {
    page = parseInt(page);
    if (isNaN(page)) page = 1;
    const offset = (page - 1) * size;
    return offset;
  }
};
