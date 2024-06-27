window.addEventListener('DOMContentLoaded', () => {
  onFontSizeChange();
})

const detector = document.querySelector('html');
const fsElement = document.getElementById('fontSize');

function getFontSize(ele) {
  return window.getComputedStyle(ele).getPropertyValue('font-size')
}

function onFontSizeChange() {
  const { scale } = window.visualViewport,
    fontSize = getFontSize(detector);

  fsElement.textContent = fontSize;
}

const resizeObserver = new ResizeObserver(onFontSizeChange);
resizeObserver.observe(detector);


let remove = null;
const output = document.querySelector("#pixelRatio");

const updatePixelRatio = () => {
  if (remove != null) {
    remove();
  }
  const mqString = `(resolution: ${window.devicePixelRatio}dppx)`;
  const media = matchMedia(mqString);
  media.addEventListener("change", updatePixelRatio);
  remove = () => {
    media.removeEventListener("change", updatePixelRatio);
  };

  output.textContent = `devicePixelRatio: ${window.devicePixelRatio}`;
};

updatePixelRatio();