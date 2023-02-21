const board = document.querySelector(".board");
const reset = document.getElementById("reset");
const result = document.querySelector("#result");
const turn = document.querySelector("#turn");
let count = 0;
let x_arr = [],
  o_arr = [];
win_arr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [0, 4, 8],
  [2, 5, 8],
];
const generateButtons = () => {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const button = document.createElement("button");
    board.appendChild(button);
    button.addEventListener("click", () => press(button, i));
  }
};
generateButtons();
const buttons = document.querySelectorAll(".board button");

function press(button, index) {
  if (count % 2 == 0) {
    button.innerHTML = "X";
    x_arr.push(index);
    if (check_won(x_arr)) {
      result.innerHTML = "X Winner";
      for (let i = 0; i < 9; i++) {
        if (buttons[i].innerHTML == "")
          buttons[i].setAttribute("disabled", true);
      }
    }
    if (count == 8 && check_won(x_arr) != true) {
      result.innerHTML = "DRAW";
    }
    count++;
    turn.innerHTML = "O Turn";
  } else {
    button.innerHTML = "O";
    o_arr.push(index);
    if (check_won(o_arr)) {
      result.innerHTML = "O Winner";
      for (let i = 0; i < 9; i++) {
        if (buttons[i].innerHTML == "")
          buttons[i].setAttribute("disabled", true);
      }
    }
    count++;
    turn.innerHTML = "X Turn";
  }
  button.setAttribute("disabled", true);
}
reset.addEventListener("click", () => {
  for (let i = 0; i < 9; i++) {
    buttons[i].innerHTML = "";
    buttons[i].removeAttribute("disabled");
  }
  result.innerHTML = "";
  count = 0;
  x_arr = [];
  o_arr = [];
  turn.innerHTML = "X Turn";
});

function check_won(arr) {
  arr.sort((a, b) => a - b);
  let subArr = chunk(arr, 1);

  for (let i = 0; i < subArr.length; i++) {
    if (searchForArray(win_arr, subArr[i])) {
      return true;
    }
  }
}
function searchForArray(haystack, needle) {
  var i, j, current;
  for (i = 0; i < haystack.length; ++i) {
    if (needle.length === haystack[i].length) {
      current = haystack[i];
      for (j = 0; j < needle.length && needle[j] === current[j]; ++j);
      if (j === needle.length) return true;
    }
  }
  return false;
}
const chunk = function subset(arra, arra_size) {
  var result_set = [],
    result;

  for (var x = 0; x < Math.pow(2, arra.length); x++) {
    result = [];
    i = arra.length - 1;
    do {
      if ((x & (1 << i)) !== 0) {
        result.push(arra[i]);
      }
    } while (i--);

    if (result.length >= arra_size) {
      result_set.push(result.sort((a, b) => a - b));
    }
  }

  return result_set;
};
