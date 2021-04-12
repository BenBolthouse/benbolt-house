/* eslint-disable brace-style */
/* eslint-disable no-undef */
/* eslint-disable max-len */

export class Article {
  /**
   * @param {Element} element Article element from the dom
   * @param {Function | Array<Function> | null} onScrollCb Function or array of functions to call on article scroll
   * @param {Function | Array<Function> | null} onWindowResizeCb Function or array of functions to call on window resize
   */
  constructor(element, onScrollCb, onWindowResizeCb) {
    this.element = element; // ------- article DOM element
    this.current = null; // ---------- panel currently fit to the viewport
    this.head = null; // ------------- head of linked list—first panel pushed to article

    // run all onScrollCb functions when a scroll event is detected
    this.element.addEventListener('scroll', () => {
      const isArray = Array.isArray(onScrollCb);
      const arrayNotEmpty = isArray && onScrollCb.length > 0;
      // run all array functions in sequence
      if (isArray && arrayNotEmpty) {
        onScrollCb.forEach(f => f());
      }
      // otherwise run the callback
      else if (onScrollCb) onScrollCb();
    });

    // run all onScrollCb functions when a scroll event is detected
    window.addEventListener('resize', () => {
      const isArray = Array.isArray(onWindowResizeCb);
      const arrayNotEmpty = isArray && onWindowResizeCb.length > 0;
      // run all array functions in sequence
      if (isArray && arrayNotEmpty) {
        onWindowResizeCb.forEach(f => f());
      }
      // otherwise run the callback
      else if (onWindowResizeCb) onWindowResizeCb();
    });
  }

  /**
   * Adds a new panel to the end of the panel linked list.
   * @param {Panel} panel
   */
  add(panel) {
    if (!this.head) {
      this.current = panel;
      this.head = panel;
    } else {
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

  /**
   * Intended usage is on article scroll or window resize event
   */
  // updateBreakpoints() {
  //   if (this.head) {
  //     let cur = this.head;
  //     while (cur) {
  //       if (cur.next) {
  //         const nxe = cur.next.element;
  //         cur.breakpoint = nxe.offsetTop;
  //       }
  //       cur = cur.next;
  //     }
  //   }
  // }

  // updateVisited() {
  //   if (this.head) {
  //     let cur = this.head;
  //     while (cur) {
  //       const ele = cur.element;
  //       const bdt = ele.getBoundingClientRect().top;
  //       if (bdt < 10) {
  //         ele.classList.add('visited');
  //         this.current = cur.breakpoint;
  //       }
  //       cur = cur.next;
  //     }
  //   }
  // }
}
export class Panel {
  constructor(id, element, parent) {
    this.id = id;
    this.element = element;
    this.next = null;
  }
}

// list construction on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const article = new Article(document.getElementById('article'));
  article.add(new Panel('panelA', document.getElementById('panelA'), article.element));
  article.add(new Panel('panelB', document.getElementById('panelB'), article.element));
  article.add(new Panel('panelC', document.getElementById('panelC'), article.element));
  article.add(new Panel('panelD', document.getElementById('panelD'), article.element));
  article.add(new Panel('panelE', document.getElementById('panelE'), article.element));
});
