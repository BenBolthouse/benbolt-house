const { production } = require('../config');
const { keywords } = require('./_utils');

class Page {
  /**
   * @param {String} view Name of the Handlebars view to render
   * @param {Object} options Configuration object to render data to the template
   */
  constructor(view, options) {
    this.view = view;
    this.config = {
      title: options.title,
      description: options.description,
      keywords: options.keywords !== undefined ? keywords(options.keywords) : null,
      data: options.data,
      production,
    };
  }
}

module.exports = Page;
