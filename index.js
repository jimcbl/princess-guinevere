const knightInput = "172 2 0 1 1";
const journeyInput = "1 2 9 18 99";
let result;

let hp, level, remedy, maidenKiss, phoenixDown, maxhp;
let knightArr, journeyArr;

const preprocess = () => {
  knightArr = knightInput.split(" ").map((i) => Number(i));
  journeyArr = knightInput.split(" ").map((i) => Number(i));
  [hp, level, remedy, maidenKiss, phoenixDown] = [...knightArr];
};
const calculateJouney = () => {};

const main = () => {
  preprocess();
  handleHTML();
};

const handleHTML = () => {
  $("#knight").html(knight);
  $("#journey").html(journey);
  $("#result").html(result);
};
