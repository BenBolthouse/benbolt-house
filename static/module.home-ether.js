/* eslint-disable no-undef */


const VARIABLE_START_TIME = 12;
const VARIABLE_SPEED = 2;
const VARIABLE_SIZE = 4;
const QUANTITY = 140;
const SPREAD_X = 4000;

document.addEventListener('DOMContentLoaded', () => {
  let ether = document.querySelector('.ether.near');
  for (let i = 0; i <= QUANTITY; i += 1) {
    const rndStartTime = 2 + (Math.random() * (VARIABLE_START_TIME * 2));
    const rndLeft = (Math.random() * SPREAD_X) - (SPREAD_X / 2);
    const rndSpeed = (VARIABLE_START_TIME * 2) + (Math.random() * (VARIABLE_SPEED * 2));
    const node = document.createElement('div');
    node.classList.add('node');
    node.style.animation = `ether-node-float ${rndSpeed}s linear ${rndStartTime}s infinite`;
    node.style.left = `${rndLeft}px`;
    ether.appendChild(node);
  }
  ether = document.querySelector('.ether.far');
  for (let i = 0; i <= (QUANTITY * 2); i += 1) {
    const rndStartTime = 2 + (Math.random() * VARIABLE_START_TIME);
    const rndLeft = (Math.random() * SPREAD_X) - (SPREAD_X / 2);
    const rndSpeed = VARIABLE_START_TIME + (Math.random() * VARIABLE_SPEED);
    const node = document.createElement('div');
    node.classList.add('node');
    node.style.animation = `ether-node-float ${rndSpeed}s linear ${rndStartTime}s infinite`;
    node.style.left = `${rndLeft}px`;
    ether.appendChild(node);
  }
});

