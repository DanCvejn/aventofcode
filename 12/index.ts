const input12 = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

type Area = {
  count: number,
  type: string,
  perimeter: number,
}

const directions = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
]

const countFencePrice = () => {
  let areas: Area[] = [];
  const plot = input12.split("\n");
  plot.forEach((line, y) => {
    line.split("").forEach((area, x) => {
      if (!areas.find(a => a.type === area)) {
        areas.push({ type: area, count: 0, perimeter: 0 });
      }
      areas.find(a => a.type === area)!.count += 1;
      let neighbourAreas = 0;
      for (let i = 0; i < 4; i++) {
        const next = { x: x + directions[i].x, y: y + directions[i].y }
        if (
          next.x >= 0 &&
          next.y >= 0 &&
          next.x < plot[0].length &&
          next.y < plot.length
        ) {
          if (plot[next.y][next.x] === area) {
            neighbourAreas++;
          }
        }
      }
      areas.find(a => a.type === area)!.perimeter += 4 - neighbourAreas;
    });
  });

  console.log(areas);


  let sum = 0;
  areas.forEach(area => {
    sum += area.count * area.perimeter;
  })
  return sum;
}

console.log(countFencePrice());
