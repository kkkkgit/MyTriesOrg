const wrapper = document.getElementById("tiles");

let columns = 0,
    rows = 0,
    toggled = false;

const colors = [
  "rgb(229, 57, 87)",
  "rgb(100, 56, 178)",
  "rgb(245, 100, 10)",
  "rgb(123, 189, 145)",
  "rgb(68, 57, 255)",
  "rgb(20, 32, 53)"
];

let count = -1;

const handleOnClick = index => {
  count = count + 1;

  anime({
    targets: ".tile",
    backgroundColor: colors[count % (colors.length - 1)],
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index
    })
  });
}

const createTile = index => {
  const tile = document.createElement("div");

  tile.classList.add("tile");

  tile.style.opacity = toggled ? 0 : 1;

  tile.onclick = e => handleOnClick(index);

  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  })
}

const createGrid = () => {
  wrapper.innerHTML = "";

  columns = Math.floor(document.body.clientWidth / 50);
  rows = Math.floor(document.body.clientHeight / 50);

  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);

  createTiles(columns * rows);
}

createGrid();

window.onresize = () => createGrid();