const knightInput = "998 1 0 0 0";
const journeyInput = "4 6 1 1 1";

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
let isTiny = false;
let tinyRound = 3;

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
const handleEventFrom1to6 = (i, event) => {
    const index = i + 1;
    const b = index % 10;
    const levelO = index > 6 ? (b > 5 ? b : 5) : b;
    console.log(" hp, level, remedy, maidenKiss, phoenixDown, maxhp", [
        hp,
        level,
        remedy,
        maidenKiss,
        phoenixDown,
        maxhp,
    ]);

    const fightMonster = () => {
        if (level === levelO) return;
        if (level > levelO) {
            level = level + 1 > 10 ? 10 : level + 1;
        } else {
            hp = parseInt(hp - getDamage(event, levelO));
            if (hp < 1) {
                if (phoenixDown < 1) return -1;
                hp = maxhp;
                phoenixDown = phoenixDown - 1;
                isTiny = false;
            }
        }
    };
    const fightShaman = () => {
        if (level === levelO) return;
        if (level > levelO) {
            level = level + 2 > 10 ? 10 : level + 2;
        } else {
            hp = hp < 5 ? 1 : parseInt(hp / 5);
            if (remedy < 1) {
                isTiny = true;
                tinyRound = 3;
            } else {
                remedy = remedy - 1;
                hp = hp * 5;
            }
        }
    };

    if (event < 6) {
        fightMonster();
    } else {
        fightShaman();
    }
};

const calculateJouney = () => {
    for (let i = 0; i < journeyArr.length; i++) {
        const event = journeyArr[i];
        if (event === 0) {
            return;
        }
        if (event < 7) {
            handleEventFrom1to6(i, event);
        }
        // console.log("tinyRound", tinyRound);
        if (isTiny) {
            if (tinyRound === 0) {
                hp = hp * 5;
                isTiny = false;
            }
            tinyRound = tinyRound - 1;
            console.log("tinyRound", tinyRound);
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
