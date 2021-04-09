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
document.addEventListener('DOMContentLoaded', () => {
  const body = document.getElementsByTagName('body')[0];
  updateOrientationClass(body);
  window.addEventListener('resize', () => {
    updateOrientationClass(body);
  });
});
