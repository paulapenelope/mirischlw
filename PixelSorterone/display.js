let pixels = [];
let canvas = document.createElement('canvas');
let context;
let mImgData;
let startButton;

browser.runtime.onMessage.addListener((request) => {
  screenshot = request.data;

  bitmap = new Image();
  bitmap.src = request.data;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = "0px";
  canvas.style.zIndex = 200;
  canvas.classList.add("p5Canvas")
  context = canvas.getContext('2d');

  bitmap.onload = function () {
     setTimeout(function () {
      take_screenshot();
      startSorting();
    }, 2000);
  };
});

function take_screenshot() {
  context.drawImage(bitmap, 0, 0, window.innerWidth, window.innerHeight);
  document.body.appendChild(canvas);
  createStartButton();
}

function createStartButton() {
  startButton = document.createElement('button');
  startButton.textContent = "Now I'm bored";
  startButton.style.position = "fixed";
  startButton.style.bottom = "10px";
  startButton.style.left = "10px";
  startButton.addEventListener('click', initiateSorting);
  document.body.appendChild(startButton);
}

function initiateSorting() {
  startButton.disabled = true;
  startSorting();
}

function startSorting() {
  loadPixels();

  // Loop 1000 times to speed up the animation.
  for (let i = 0; i < 10000; i++) {
    sortPixels();
  }

  context.putImageData(mImgData, 0, 0);

  requestAnimationFrame(startSorting);
}

function sortPixels() {
  const x = Math.floor(Math.random() * canvas.width);
  const y = Math.floor(Math.random() * (canvas.height - 1));
  
  const px1 = (y * canvas.width + x) * 4;
  const px2 = ((y + 5) * canvas.width + (x + 1)) * 4;

  const redOne = pixels[px1];
  const greenOne = pixels[px1 + 1];
  const blueOne = pixels[px1 + 2];

  const redTwo = pixels[px2];
  const greenTwo = pixels[px2 + 1];
  const blueTwo = pixels[px2 + 2];

  const totalOne = redOne + greenOne + blueOne;
  const totalTwo = redTwo + greenTwo + blueTwo;

  if (totalOne < totalTwo) {
    pixels[px1] = redTwo;
    pixels[px1 + 1] = greenTwo;
    pixels[px1 + 2] = blueTwo;
    pixels[px2] = redOne;
    pixels[px2 + 1] = greenOne;
    pixels[px2 + 2] = blueOne;
  }

  pixels[px1 + 3] = 255;
}

function loadPixels() {
  mImgData = context.getImageData(0, 0, canvas.width, canvas.height);
  pixels = mImgData.data;
}
