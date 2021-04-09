const fs = require('fs');
const path = require('path');

const { production } = require('../config');

class Page {
  constructor(view, options) {
    this.view = view;
    this.config = {
      head: {
        title: options.title || 'My Website',
        description: options.description || 'Page Description',
        noindex: options.noindex !== undefined ? options.noindex : false,
        keywords: options.keywords !== undefined
          ? Page.formatKeywordsFromArray(options.keywords)
          : [],
      },
      modules: options.modules && options.modules.length
        ? Page.formatModulesFromArray(options.modules)
        : [],
      production,
    };
  }
  static formatKeywordsFromArray(array) {
    let out = '';
    if (array.length) {
      array.forEach((k) => {
        out += `${k.toLowerCase()},`;
      });
      return out.slice(0, out.length - 1);
    }
    return [];
  }
  static formatModulesFromArray(array) {
    const out = [];
    if (array.length) {
      array.forEach((m) => {
        const exs = fs.existsSync(path.join(__dirname, '..', 'static', `module.${m}.js`));
        if (exs) out.push(`module.${m}.js`);
      });
      return out;
    }
    return [];
  }
}

module.exports = Page;
