/* eslint-disable no-undef */
/* eslint-disable import/extensions */

import LinkedList from './LinkedList.mjs';

export class Page extends LinkedList {
  /**
   * @param {Element} element
   */
  constructor(element) {
    super();
    this.id = element.id;
    this.element = element;
  }
}

export class Article extends LinkedList {
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
      const desktop = window.innerWidth > 768;
      const pad = 300;
      const scroll = window.scrollY;
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
        if (scroll >= prevScroll && scroll < currScroll) {
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

export class Section {
  /**
   * @param {Element} element Element's id must be unique to the parent Article.
   */
  constructor(element) {
    this.id = element.id;
    this.element = element;
    this.next = null;
  }
}
