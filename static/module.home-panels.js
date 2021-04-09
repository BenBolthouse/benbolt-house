/* eslint-disable no-undef */

// helpers
function visit(ele) {
  const bnd = ele.getBoundingClientRect();
  if (bnd.top < 200) return true;
  return false;
}

// state
let article;
const panels = {
  panelA,
  panelB,
  panelC,
  panelD,
  panelE,
};
const visited = {
  panelB: false,
  panelC: false,
  panelD: false,
  panelE: false,
};

// on dom load
document.addEventListener('DOMContentLoaded', () => {
  article = document.getElementById('article');
  Object.keys(panels).forEach((p) => {
    panels[p] = document.getElementById(p);
  });
  article.addEventListener('scroll', () => {
    Object.values(panels).forEach((p) => {
      const vst = visited[p.id];
      if (!vst && visit(p)) {
        visited[p.id] = true;
        panels[p.id].classList.add('visited');
      }
    });
  });
});
