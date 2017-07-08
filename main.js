const container = document.getElementById("container");
const editor = new Editor(300, 300, container);
const file = document.getElementById("file");

file.addEventListener("change", e => {
  const blob = e.target.files[0];
  editor.image = blob;
});

container.children[0].addEventListener("wheel", e => {
  let scale = 0.1;
  if (e.deltaY > 0) {
    scale = -0.1;
  }
  editor.img.scale.x += scale;
  editor.img.scale.y += scale;
});

container.children[0].addEventListener("mousemove", e => {
  if (e.buttons === 1) {
    // move the img
    editor.img.pos.x += e.movementX;
    editor.img.pos.y += e.movementY;
    e.target.style.cursor = "grab";
  } else {
    e.target.style.cursor = "auto";
  }
})
