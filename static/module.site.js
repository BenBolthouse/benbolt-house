/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */

/**
 * Handles adding CSS classes to elements tagged with 'orientation'; if the
 * viewport is wider than it is tall then tagged elements receive the class
 * landscape, and the opposite is true for portrait orientated viewport. Of
 * course, classes portrait and landscape are mutually exclusive and do not
 * appear together on elements.
 */
export const updateOrientationClasses = () => {
  function run() {
    const targets = document.querySelectorAll('[orientation]');
    const viewportHeight = document.body.offsetHeight;
    const viewportWidth = document.body.offsetWidth;
    if (viewportHeight >= viewportWidth) {
      targets.forEach((t) => {
        t.classList.add('portrait');
        t.classList.remove('landscape');
      });
    } else {
      targets.forEach((t) => {
        t.classList.add('landscape');
        t.classList.remove('portrait');
      });
    }
  }
  window.addEventListener('resize', () => run());
  document.addEventListener('DOMContentLoaded', () => run());
  return run;
};

/**
 * Creates css variables for elements with class name fit-viewport; updates on
 * load and window resize.
 */
export const updateViewportHeightStyles = () => {
  function run() {
    const targets = document.querySelectorAll('[fitviewport]');
    const viewportHeightCalc = window.innerHeight * 0.01;
    targets.forEach((a) => {
      a.style.setProperty('--vh', `${viewportHeightCalc}px`);
      a.style.transition = 'height 0.5s ease';
    });
  }
  window.addEventListener('resize', () => run());
  document.addEventListener('DOMContentLoaded', () => run());
  return run;
};

// runtime execution of module scripts
updateOrientationClasses();
updateViewportHeightStyles();
