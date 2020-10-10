document.addEventListener("DOMContentLoaded", () => {
  // select all the divs in the classname grid
  const squares = document.querySelectorAll(".grid div");
  // select and name the span element
  const scoreDisplay = document.querySelector("span");
  // select and name the button element
  const startBtn = document.querySelector(".start");

  // set width and other variables within the game
  const width = 10;
  let currIndex = 0,
    appleIndex = 0;

  // use array to represent the snake, divs with the value 2 are head, 1 are the body
  // and 0 are the tail
  let currSnake = [2, 1, 0],
    // the snake travels in the right direction first (direction = 1)
    direction = 1,
    score = 0,
    speed = 0.9,
    intervalTime = 0,
    interval = 0;

  // add event listener for when the user presses a key and clicks button
  document.addEventListener("keyup", movement);
  startBtn.addEventListener("click", start);

  // Start/Reset game
  function start() {
    // remove all occurrences of snake and apple from the divs and reset every variable
    currSnake.forEach((index) => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    clearInterval(interval);
    score = 0;

    // generate a random location for the apple
    randomApple();

    // Initialise variables for start of new game
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 1000;
    currSnake = [2, 1, 0];
    currIndex = 0;

    // add class names to divs the snake array is currently occupying
    currSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcomes, intervalTime);
  }

  /**
   * Function which deals with all decsion outcomes the user makes on the snake. These
   * include when the snake hits the border (bottom, top, left or right), when the snake
   * hits itself and when the snake gets the apple.
   */
  function moveOutcomes() {
    if (
      // if snake hits bottom, right, left or top of board or if it goes into itself
      (currSnake[0] + width >= width * width && direction === width) ||
      (currSnake[0] % width === width - 1 && direction === 1) ||
      (currSnake[0] % width === 0 && direction === -1) ||
      (currSnake[0] - width < 0 && direction === -width) ||
      squares[currSnake[0] + direction].classList.contains("snake")
    ) {
      return clearInterval(interval);
    }

    // define what the tail of the snake is. Remove class name of snake from the tail
    // and give a direction to the head of the snake
    const tail = currSnake.pop();
    squares[tail].classList.remove("snake");
    currSnake.unshift(currSnake[0] + direction);

    // if the snake gets apple remove apple from the board, add new tail to the snake on
    // the board and add the new tail to the snake array.
    if (squares[currSnake[0]].classList.contains("apple")) {
      squares[currSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currSnake.push(tail);

      // then generate a new random location for the apple
      randomApple();

      // increment the score and update the scoreboard
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);

      // increase the difficulty of the game by increasing the interval time
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }

    // reset interval
    squares[currSnake[0]].classList.add("snake");
  }

  /**
   * Function which generates and adds the apple to a random location on the board
   */
  function randomApple() {
    // generate a random number based on square length and round down the random number
    // generated to the nearest integer to ensure the number is below/includes 100
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
      // make sure apple doesn't appear with divs with class name snake
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
  }

  /**
   * Function which deals with the user input when they press on their keyboard to move
   * the snake around the grid. The only keys permitted are, w,a,s,d and the arrow keys.
   * @param {Event} e an event which holds the value of the key pressed by the user
   */
  function movement(e) {
    // remove snake from board between each move to that the snake doesn't reappear
    // in multiple places
    squares[currIndex].classList.remove("snake");

    // get the keycode for the arrow keys and change letter to lowercase
    arrow = e.keyCode;
    letter = e.key.toLowerCase();

    // right
    if (arrow === 39 || letter === "d") {
      direction = 1;
      // up
    } else if (arrow === 38 || letter === "w") {
      direction = -width;
      // left
    } else if (arrow === 37 || letter === "a") {
      direction = -1;
      //  down
    } else if (arrow === 40 || letter === "s") {
      direction = +width;
    }
  }
});
