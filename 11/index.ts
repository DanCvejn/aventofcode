const input11 = `125 17`;
// const input11 = `5 62914 65 972 0 805922 6521 1639064`;

const replaceStones = (blinks: number) => {
  let stones = input11.split(" ");
  let sum = 0;
  stones.forEach((stone) => {
    let nextStones: string[] = [stone];
    for (let i = 0; i < blinks; i++) {
      let nextStones2: string[] = [];
      console.log(i + 1, nextStones.length);

      nextStones.forEach((stone2) => {
        if (stone2 === "0") {
          nextStones2.push("1");
        } else if (stone2.length % 2 === 0) {
          nextStones2.push(String(Number(stone2.slice(0, stone2.length / 2))));
          nextStones2.push(String(Number(stone2.slice(stone2.length / 2))));
        } else {
          nextStones2.push(String(Number(stone2) * 2024));
        }
      })
      nextStones = nextStones2;
    }
    sum += nextStones.length;
  })
  return sum;
}


console.log(replaceStones(25));
console.log(replaceStones(75));
