const input8 = `.....................U.........w..................
l.................................................
...........o.a................U...w...............
............................................W.....
..........T....................s.............7....
.............................................W....
.........T..............4....n.d.H.........5......
......T.....oj...U.....n...w......H...........z...
.G..x..........................E.....V..H.........
.........a....................d....s.......7w.....
...j....r.............o.............V.......d...W.
.......r..J.Goa.U...............n................z
.........Jj.........M..........Pv.................
...J...........t..3..M..............sLV...........
...................t................n.............
....r...........X...........M........v............
...x....t......I......a.PM...............W........
...........1.Bj....I........vO.h.dL...............
.........6....Rr......B...X........h..5v.L..z.....
......1G...........x.....3B.......5...............
.................B....0..........4..E.............
.....................X.....5..h....P....f.....D...
.......1........J.....eK..........................
..................I....R....K...........k.........
......G..................O........................
...........H...9...............K8.P.4..k..E.......
............1....3.............8.F.............f..
.........................4........................
.l...........X............9.......................
....N.................R...t.e.....................
...g............3..R.........e....h.........f.....
...........................e......i...............
................2...I.7..9..O.....s.........k.....
....................6...9E.............F..O.......
........................KN........................
.......g......................Z.........F..f...Y..
...........................A....i.................
...........6g...b........8.......y.....S..........
..l.....6.....m...............8...................
....u..m...b...............p...A..................
..............b.p........................k........
....m......2...........Z..y....i..................
........g2.....b.........i....D..ZF...............
......2.0...........p............N..........A.....
...m.............S...y........A...Z...N...........
..S..l..........................................Y.
........S....0u.................y......DY.........
...........0.........................D............
.................u...................p...Y........
.......u..........................................`;

type Coords = {
  x: number;
  y: number;
};

const getAnthenasCoords = () => {
  const lines = input8.split("\n");
  let coords: { [key: string]: Coords[] }[] = [];
  lines.forEach((line, y) => {
    line.split("").forEach((char, x) => {
      if (char !== ".") {
        if (!coords[char]) {
          coords[char] = [];
        }
        coords[char].push({ x, y });
      }
    });
  });
  return coords;
};

const createAntinodes = () => {
  const coords: { [key: string]: Coords[] }[] = getAnthenasCoords();
  let map = input8.split("\n").map((line) => line.split(""));
  let map2 = input8.split("\n").map((line) => line.split(""));
  Object.keys(coords).forEach((char) => {
    coords[char].forEach((coord: Coords) => {
      coords[char].filter((c: Coords) => c.x !== coord.x && c.y !== coord.y).forEach((c: Coords) => {
        const vector = {
          x: c.x - coord.x,
          y: c.y - coord.y,
        };
        const possibleAntinode = {
          x: coord.x - (c.x - coord.x),
          y: coord.y - (c.y - coord.y),
        };
        let possibleAntinode2 = {
          x: coord.x - vector.x,
          y: coord.y - vector.y,
        };
        if (
          possibleAntinode.x >= 0 &&
          possibleAntinode.x < map[0].length &&
          possibleAntinode.y >= 0 &&
          possibleAntinode.y < map.length &&
          map[possibleAntinode.y][possibleAntinode.x] !== char
        ) {
          map[possibleAntinode.y][possibleAntinode.x] = "#";
        }
        map2[coord.y][coord.x] = "#";
        while (
          possibleAntinode2.x >= 0 &&
          possibleAntinode2.x < map[0].length &&
          possibleAntinode2.y >= 0 &&
          possibleAntinode2.y < map.length
        ) {
          map2[possibleAntinode2.y][possibleAntinode2.x] = "#";
          possibleAntinode2 = {
            x: possibleAntinode2.x - vector.x,
            y: possibleAntinode2.y - vector.y,
          };
        }
      });
    });
  });

  let sum = 0;

  map.forEach((line) => {
    line.forEach((char) => {
      if (char === "#") {
        sum++;
      }
    })
  });

  let sum2 = 0;

  map2.forEach((line) => {
    line.forEach((char) => {
      if (char === "#") {
        sum2++;
      }
    })
  });

  return {
    part1: sum,
    part2: sum2,
  };
};

console.log(createAntinodes());



const timer = () => {
  const start = performance.now();
  createAntinodes();
  const end = performance.now();
  console.log(`Full day 8 function took ${String(end - start).slice(0, 5)} milliseconds.`);
  return;
}

timer();

