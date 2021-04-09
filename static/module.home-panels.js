/* eslint-disable no-undef */

// helpers
function visit(ele) {
  const bnd = ele.getBoundingClientRect();
  if (bnd.top < 200) return true;
  return false;
}

class Article {
  constructor(element) {
    this.element = element;
    this.head = null;
  }
  pushPanel(panel) {
    if (!this.head) this.head = panel;
    else {
      let cur = this.head;
      while (cur) {
        if (cur.next) cur = cur.next;
        else {
          cur.next = panel;
          return;
        }
      }
    }
  }
  updatePush() {
    if (this.head) {
      let cur = this.head;
      while (cur) {
        if (cur.next) {
          const nxe = cur.next.element;
          cur.push = nxe.offsetTop;
        }
        cur = cur.next;
      }
    }
  }
  updateVisited(id) {
    if (this.head) {
      let cur = this.head;
      while (cur) {
        if (cur.id === id) {
          const ele = cur.element;
          ele.classList.add('visited');
        }
        cur = cur.next;
      }
    }
  }
}

class Panel {
  constructor(id, element, parent) {
    this.id = id;
    this.element = element;
    this.parent = parent;
    this.next = null;
    this.push = null;
    this.scrollTop = null;
    this.pushElement = element.querySelector('.push-container');
    if (this.pushElement) {
      this.pushElement.addEventListener('click', () => {
        this.parent.scroll({
          top: this.push,
          behavior: 'smooth',
        });
      });
    }
  }
}

// visited status
document.addEventListener('DOMContentLoaded', () => {
  const article = new Article(document.getElementById('article'));
  article.pushPanel(new Panel('panelA', document.getElementById('panelA'), article.element));
  article.pushPanel(new Panel('panelB', document.getElementById('panelB'), article.element));
  article.pushPanel(new Panel('panelC', document.getElementById('panelC'), article.element));
  article.pushPanel(new Panel('panelD', document.getElementById('panelD'), article.element));
  article.pushPanel(new Panel('panelE', document.getElementById('panelE'), article.element));
  article.updatePush();
  console.log(article);
});
