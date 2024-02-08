/*----------------------inserta la posición del cursor----------------------*/

const injectCursorPosition = ({x, y}) => {
  document.documentElement.style.setProperty("--x", x);
  document.documentElement.style.setProperty("--y", y);
};

document.body.addEventListener('pointermove', injectCursorPosition)
