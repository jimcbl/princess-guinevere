const knightInput = "152 1 0 1 1";
const journeyInput = "3 5";

const baseDamage = {
    1: 1,
    2: 1.5,
    3: 4.5,
    4: 6.5,
    5: 8.5,
};

let result;
let hp, level, remedy, maidenKiss, phoenixDown, maxhp;
let knightArr = [];
let journeyArr = [];

const preprocess = () => {
    knightArr = knightInput.split(" ").map((i) => Number(i));
    journeyArr = journeyInput.split(" ").map((i) => Number(i));
    [hp, level, remedy, maidenKiss, phoenixDown] = [...knightArr];
    maxhp = hp;
};

const calcResult = () => {
    const res = parseInt(hp) + level + remedy + maidenKiss + phoenixDown;
    return res < 1 ? -1 : res;
};
const getDamage = (event, levelO) => {
    return baseDamage[event] * 10 * levelO;
};
const handleEventFrom1to5 = (i, event) => {
    const index = i + 1;
    const b = index % 10;
    const levelO = index > 6 ? (b > 5 ? b : 5) : b;

    if (level === levelO) return;
    if (level > levelO) {
        level = level + 1 > 10 ? 10 : level + 1;
    } else {
        hp = parseInt(hp - getDamage(event, levelO));
        if (hp < 1) {
            if (phoenixDown < 1) return -1;
            hp = maxhp;
            phoenixDown = phoenixDown - 1;
        }
    }
};

const calculateJouney = () => {
    for (let i = 0; i < journeyArr.length; i++) {
        const event = journeyArr[i];
        if (event === 0) {
            return;
        }
        if (event < 6) {
            handleEventFrom1to5(i, event);
        }
    }
};

const main = () => {
    preprocess();
    calculateJouney();
    result = calcResult();
    handleHTML();
};

const handleHTML = () => {
    console.log("endhp", hp);
    console.log("result", result);
    $("#knight").html(knightInput);
    $("#journey").html(journeyInput);
    $("#result").html(result);
};

main();
