const container = document.getElementById("container");
const editor = new Editor(300, 300, container);
const file = document.getElementById("file");
const scale = document.getElementById("scale");
const scaleDisplay = document.getElementById("scaleDisplay");
const offsetX = document.getElementById("offsetX");
const offsetXdisplay = document.getElementById("offsetXdisplay");
const offsetY = document.getElementById("offsetY");
const offsetYdisplay = document.getElementById("offsetYdisplay");

file.addEventListener("change", e => {
  const blob = e.target.files[0];
  editor.image = blob;
});

scale.addEventListener("change", e => {
  editor.img.scale.x = e.target.value;
  editor.img.scale.y = e.target.value;
  scaleDisplay.innerHTML = e.target.value;
});
offsetX.addEventListener("change", e => {
  editor.img.pos.x = e.target.value;
  offsetXdisplay.innerHTML = e.target.value;
});
offsetY.addEventListener("change", e => {
  editor.img.pos.y = e.target.value;
  offsetYdisplay.innerHTML = e.target.value;
});
container.children[0].addEventListener("wheel", e => {
  let scale = 0.1;
  if (e.deltaY > 0) {
    scale = -0.1;
  }
  editor.img.scale.x += scale;
  editor.img.scale.y += scale;
});
