/* eslint-disable no-undef */

// vertical versus horizontal orientation
function updateOrientationClass(body) {
  const hgt = body.offsetHeight;
  const wdt = body.offsetWidth;
  if (hgt >= wdt) {
    body.classList.add('portrait');
    body.classList.remove('landscape');
  } else {
    body.classList.add('landscape');
    body.classList.remove('portrait');
  }
}
function updateViewportHeight() {
  // credit: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  const vh = window.innerHeight * 0.01;
  const articles = document.querySelectorAll('.fit-viewport');
  articles.forEach(a => a.style.setProperty('--vh', `${vh}px`));
  // end credit
}
document.addEventListener('DOMContentLoaded', () => {
  const body = document.getElementsByTagName('body')[0];
  updateOrientationClass(body);
  updateViewportHeight();
  setInterval(() => {
    updateOrientationClass(body);
    updateViewportHeight();
  }, 10);
});
