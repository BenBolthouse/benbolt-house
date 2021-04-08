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
    };
  }
  static formatKeywordsFromArray(array) {
    let out = '';
    if (array.length) {
      array.forEach((k) => {
        out += `${k.toLowerCase()},`;
      });
    }
    return out.slice(0, out.length - 1);
  }
}

module.exports = Page;
