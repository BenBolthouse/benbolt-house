/* eslint-disable no-param-reassign */

export default class LinkedList {
  constructor() {
    this.head = null;
  }
  /**
   * Returns the last node of the list.
   */
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
  /**
   * Finds and returns a node by a given id.
   * @param {Number | String} id
   */
  find(id) {
    let curr = this.head;
    if (!curr) return null;
    while (curr) {
      if (curr.id === id) return curr;
      curr = curr.next;
    }
    return null;
  }
  /**
   * Adds a node at the end of the list and then returns true.
   * @param {Object} node
   */
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
  /**
   * Removes and returns the node at the end of the list.
   */
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
  /**
   * Inserts the given node into the list at the head position.
   * @param {Object} node
   */
  unshift(node) {
    if (this.head) node.next = this.head;
    this.head = node;
  }
  /**
   * Removes and returns the node at the head position.
   */
  shift() {
    let out;
    if (this.head) out = this.head;
    else return null;
    if (this.head.next) this.head = this.head.next;
    else this.head = null;
    return out;
  }
}
