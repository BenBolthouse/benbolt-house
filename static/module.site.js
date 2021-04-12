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

// get updates on load, window resize and delay after resize -- delay accounts
// for mobile experiences and shifts in browser sizes due to changes in browser
// UI elements
document.addEventListener('DOMContentLoaded', () => {
  const body = document.getElementsByTagName('body')[0];
  updateOrientationClass(body);
  updateViewportHeight();
  window.addEventListener('resize', () => {
    updateOrientationClass(body);
    updateViewportHeight();
    setTimeout(() => {
      updateOrientationClass(body);
      updateViewportHeight();
    }, 500);
  });
});
