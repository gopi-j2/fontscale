window.addEventListener('DOMContentLoaded', () => {
  onFontSizeChange();
})

const detector = document.querySelector('html');
const fsElement = document.getElementById('fontSize');
const hiddenElement = document.querySelector('[data-hidden-element]');

function getFontSize(ele) {
  return window.getComputedStyle(ele).getPropertyValue('font-size')
}

function getElementHeight(ele) {
  return ele.offsetHeight;
}
function onFontSizeChange() {
  const { scale } = window.visualViewport,
    fontSize = getFontSize(detector),
    elementHeight = getElementHeight(hiddenElement);

  fsElement.textContent = elementHeight;
}

const resizeObserver = new ResizeObserver(onFontSizeChange);
resizeObserver.observe(hiddenElement);