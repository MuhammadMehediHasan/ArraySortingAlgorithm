const canvas = document.querySelector("canvas");
const elementCount = document.querySelector('#elementCount');
const arrayChanged = document.querySelector("#arrayChanged");
const arrayAccessed = document.querySelector('#arrayAccessed');
const splash = document.querySelector('audio');

canvas.height = innerHeight;
canvas.width = innerWidth;
canvas.style.backgroundColor = "rgb(33,33,33)";

const c = canvas.getContext("2d");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array = []) {
    elementCount.textContent = "Total Element: " + array.length;
  let arr = [...array];
    let arrayChangedI = 0;
    let arrayAccessedI = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;


        splash.currentTime = 0;
        splash.volume = .3;
        splash.play();

        draw(arr, j);

        arrayChanged.textContent = "Comparisons: " + arrayChangedI;
        arrayChangedI++;

        await sleep(.05);
      }

      arrayAccessed.textContent = "Array Accessed: " + arrayAccessedI;
      arrayAccessedI++;
    }
  }

  finishingTouch(arr);
  return arr;
}

function draw(heights, colorIndex) {
  const barWidth = canvas.width / heights.length;

  let x, y;
  function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    x = 0;

    heights.forEach((barHeight, index) => {
      if (colorIndex === index) {
        c.fillStyle = "brown";
      } else if (colorIndex + 1 === index) {
        c.fillStyle = "orange";
      } else {
        c.fillStyle = "white";
      }

      y = canvas.height - barHeight;
      c.fillRect(x, y, barWidth, barHeight);

      x += barWidth;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

function finishingTouch(heights) {
  const barWidth = canvas.width / heights.length;

  let x, y;
  function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    x = 0;
    heights.forEach((barHeight, index) => {
      c.fillStyle = "lime";
      y = canvas.height - barHeight;
      c.fillRect(x, y, barWidth, barHeight);
      x += barWidth;
    });
    requestAnimationFrame(animate);
  }
  animate();
}


function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

let oldHistory = Array.from(Array(63).keys());

oldHistory = oldHistory.map(val => val + (Math.random() * 663));

shuffle(oldHistory);

bubbleSort(oldHistory);
