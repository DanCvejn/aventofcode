// const input11 = `125 17`;
const input11 = `5 62914 65 972 0 805922 6521 1639064`;

const addToStones = (stones: { [key: string]: number }, stone: string, toAdd: number = 1) => {
  if (!stones[stone]) {
    stones[stone] = toAdd;
  } else {
    stones[stone] += toAdd;
  }
  return stones;
};


const replaceStones = (blinks: number) => {
  let stonesTmp = input11.split(" ");
  let stones = {};
  stonesTmp.forEach((stone) => {
    stones = addToStones(stones, stone);
  });
  for (let i = 0; i < blinks; i++) {
    let newStones = {};
    for (let stone in stones) {
      if (stone === "0") {
        newStones = addToStones(newStones, "1", stones[stone]);
      } else if (stone.length % 2 === 0) {
        newStones = addToStones(newStones, String(Number(stone.slice(0, stone.length / 2))), stones[stone]);
        newStones = addToStones(newStones, String(Number(stone.slice(stone.length / 2))), stones[stone]);
      } else {
        newStones = addToStones(newStones, String(Number(stone) * 2024), stones[stone]);
      }
    }
    stones = newStones;
  }

  let sum = 0;
  Object.keys(stones).forEach((stone) => {
    sum += stones[stone];
  })
  return sum;
};


console.log(replaceStones(25));
console.log(replaceStones(75));
