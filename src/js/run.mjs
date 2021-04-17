/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */

import { Page, Article, Section } from './DomDataStructures.mjs';

const OBFUSCATION_DELAY = 10;

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

function _debounce(callback) {
  let timeout;
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(callback, 500);
}

document.addEventListener('DOMContentLoaded', () => {
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
