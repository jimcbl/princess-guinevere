const knightInput = "152 1 0 1 1";
const journeyInput = "3 5";
let result;

let hp, level, remedy, maidenKiss, phoenixDown, maxhp;
let knightArr = [];
let journeyArr = [];

const baseDamage = {
    1: 1,
    2: 1.5,
    3: 4.5,
    4: 6.5,
    5: 8.5,
};

const preprocess = () => {
    knightArr = knightInput.split(" ").map((i) => Number(i));
    journeyArr = journeyInput.split(" ").map((i) => Number(i));
    [hp, level, remedy, maidenKiss, phoenixDown] = [...knightArr];
    maxhp = hp;
};

const calcResult = () => {
    return parseInt(hp) + level + remedy + maidenKiss + phoenixDown;
};
const getDamage = (event, levelO) => {
    // console.log("baseDamage", baseDamage[event]);
    return baseDamage[event] * 10 * levelO;
};
const handleEventFrom1to5 = (i, event) => {
    const index = i + 1;
    const b = index % 10;
    const levelO = index > 6 ? (b > 5 ? b : 5) : b;
    // console.log("event", event);
    // console.log("level", level);
    // console.log("levelO", levelO);
    // console.log("hp", hp);

    if (level > levelO) {
        level = level + 1 > 10 ? 10 : level + 1;
    }
    if (level < levelO) {
        // console.log("damage", getDamage(event, levelO));
        hp = parseInt(hp - getDamage(event, levelO));
        if (hp < 1) {
            if (phoenixDown < 1) return -1;
            hp = maxhp;
            phoenixDown = phoenixDown - 1;
        }
    }

    // console.log("afterHp", hp);
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
    if (result < 1) result = -1;
    console.log("endhp", hp);
    console.log("result", result);
    handleHTML();
};

const handleHTML = () => {
    $("#knight").html(knightInput);
    $("#journey").html(journeyInput);

    $("#result").html(result);
};

main();
