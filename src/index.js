/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */

const OBFUSCATION_DELAY = 500;

class LinkedList {
  constructor() {
    this.head = null;
  }
  last() {
    let curr = this.head;
    if (!curr) return null;
    while (curr) {
      if (!curr.next) {
        return curr;
      }
      curr = curr.next;
    }
    return null;
  }
  find(id) {
    let curr = this.head;
    if (!curr) return null;
    while (curr) {
      if (curr.id === id) return curr;
      curr = curr.next;
    }
    return null;
  }
  push(node) {
    let curr = this.head;
    if (!curr) {
      this.head = node;
      return true;
    }
    while (curr) {
      if (!curr.next) {
        curr.next = node;
        return true;
      }
      curr = curr.next;
    }
    return false;
  }
  pop() {
    let prev;
    let curr;
    if (!this.head) return null;
    if (!this.head.next) {
      prev = this.head;
      this.head = null;
      return prev;
    }
    prev = this.head;
    curr = this.head.next;
    while (curr) {
      if (!curr.next) {
        prev.next = null;
        return curr;
      }
      prev = prev.next;
      curr = curr.next;
    }
    return null;
  }
  unshift(node) {
    if (this.head) node.next = this.head;
    this.head = node;
  }
  shift() {
    let out;
    if (this.head) out = this.head;
    else return null;
    if (this.head.next) this.head = this.head.next;
    else this.head = null;
    return out;
  }
}

class Page extends LinkedList {
  /**
   * @param {Element} element
   */
  constructor(element) {
    super();
    this.id = element.id;
    this.element = element;
  }
}

class Article extends LinkedList {
  /**
   * @param {Element} element Element's id must be unique to the parent Page.
   */
  constructor(element) {
    super();
    this.id = element.id;
    this.element = element;
    this.currentId = null;
    this.sectionLinks = element.querySelectorAll('[data-section-link]');

    // handles the show and hide behavior of the navigation element
    const navs = this.element.querySelectorAll('nav');
    if (navs.length) {
      navs.forEach((n) => {
        window.addEventListener('scroll', () => {
          if (window.scrollY + 100 >= window.innerHeight) {
            n.classList.add('switch');
          } else n.classList.remove('switch');
        });
      });
    }

    // updates the currentId on scroll based on section visibility
    window.addEventListener('scroll', () => {
      const pad = 300;
      let prev = this.head;
      let curr = this.head ? this.head.next : null;
      if (!prev) {
        this.currentId = null;
        return;
      }
      if (!curr) {
        this.currentId = prev.element.id;
        return;
      }
      while (curr) {
        const prevScroll = prev.element.offsetTop - pad;
        const currScroll = curr.element.offsetTop - pad;
        if (window.scrollY >= prevScroll && window.scrollY < currScroll) {
          this.currentId = prev.element.id;
          return;
        }
        prev = prev.next;
        curr = curr.next;
      }
      this.currentId = this.last().element.id;
    });

    // updates links with active classes based on currentId
    // additionally updates sections with seen classes
    window.addEventListener('scroll', () => {
      this.sectionLinks.forEach((link) => {
        const id = link.getAttribute('data-section-link');
        if (this.currentId === id) {
          link.classList.add('active');
        } else link.classList.remove('active');
      });
      const section = this.find(this.currentId).element;
      section.classList.add('seen');
    });

    // forces a scroll to the current element immediately on resize
    window.addEventListener('resize', () => {
      setTimeout(() => {
        const section = this.find(this.currentId).element;
        window.scroll({ top: section.offsetTop });
      }, 100);
    });
  }

  applyInitialSeen(id) {
    setTimeout(() => {
      this.find(id).element.classList.add('seen');
    }, 500);
  }

  updateSectionLinksAssociations() {
    this.sectionLinks.forEach((link) => {
      const id = link.getAttribute('data-section-link');
      const section = this.find(id);
      link.addEventListener('click', (evt) => {
        evt.preventDefault();
        window.scroll({ top: section.element.offsetTop });
      });
    });
  }
}

class Section {
  /**
   * @param {Element} element Element's id must be unique to the parent Article.
   */
  constructor(element) {
    this.id = element.id;
    this.element = element;
    this.next = null;
  }
}

function _viewportHeightUpdate() {
  const elems = document.body.querySelectorAll('[data-viewport-height]');
  const viewportHeight = window.innerHeight;
  elems.forEach((elem) => {
    elem.style.minHeight = `${viewportHeight}px`;
  });
}

function _viewportWidthUpdate() {
  const elems = document.body.querySelectorAll('[data-viewport-width]');
  const viewportWidth = window.innerWidth;
  elems.forEach((elem) => {
    elem.style.width = `${viewportWidth}px`;
  });
}

function _orientationUpdate() {
  const elems = document.body.querySelectorAll('[data-orientation]');
  const landscape = window.innerWidth >= window.innerHeight;
  if (landscape) {
    elems.forEach((elem) => {
      elem.classList.add('landscape');
      elem.classList.remove('portrait');
    });
  } else {
    elems.forEach((elem) => {
      elem.classList.add('portrait');
      elem.classList.remove('landscape');
    });
  }
}

function _removeDOMObfuscation() {
  setTimeout(() => {
    const obfuscation = document.body.querySelector('[data-dom-loading]');
    const articles = document.body.querySelectorAll('article');
    const buttons = document.body.querySelectorAll('button');
    if (obfuscation) obfuscation.classList.add('hidden');
    articles.forEach((a) => {
      document.body.style.overflowY = 'scroll';
    });
    buttons.forEach((b) => {
      b.disabled = false;
    });
  }, OBFUSCATION_DELAY);
}

function _constructVDOMTree() {
  const pages = document.body.querySelectorAll('[data-page]');
  pages.forEach((p) => {
    const page = new Page(p);
    const articles = p.querySelectorAll('[data-article]');
    articles.forEach((a) => {
      const article = new Article(a);
      page.push(article);
      const sections = a.querySelectorAll('[data-section]');
      sections.forEach((s) => {
        article.push(new Section(s));
      });
      article.updateSectionLinksAssociations();
      article.applyInitialSeen('intro');
    });
  });
}

function _handleContactSubmitEvent() {
  const form = document.getElementById('contactForm');
  const fetching = document.getElementById('contactFormFetching');
  const success = document.getElementById('contactFormSuccess');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const { elements } = evt.target;

    const body = {
      email: elements.email.value,
      name: elements.name.value,
      phone: elements.phone.value,
      body: elements.body.value,
      _csrf: elements._csrf.value,
    };

    fetching.classList.toggle('hidden');

    fetch('/api/v1/contact', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((response) => {
        fetching.classList.toggle('hidden');
        success.classList.toggle('hidden');

        // Prevents the user from doing immediate resubmissions... or
        // spamming the contact form :)
        Object.values(elements).forEach((x) => { x.disabled = true; });
      })
      .catch((err) => {
        fetching.classList.toggle('hidden');
      });
  });
}

function _debounce(callback) {
  let timeout;
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(callback, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  _handleContactSubmitEvent();
  _constructVDOMTree();
  _viewportHeightUpdate();
  _viewportWidthUpdate();
  _orientationUpdate();
  _removeDOMObfuscation();
});

window.addEventListener('resize', () => {
  _debounce(_viewportHeightUpdate());
  _debounce(_viewportWidthUpdate());
  _orientationUpdate();
});

window.addEventListener('scroll', () => {
  _viewportHeightUpdate();
  _viewportWidthUpdate();
});
