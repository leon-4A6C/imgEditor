const editor = new Editor(300, 300, document.getElementById("container"));
const file = document.getElementById("file");
const scale = document.getElementById("scale");
const scaleDisplay = document.getElementById("scaleDisplay");

file.addEventListener("change", e => {
  const blob = e.target.files[0];
  editor.image = blob;
});

scale.addEventListener("change", e => {
  editor.img.scale.x = e.target.value;
  editor.img.scale.y = e.target.value;
  scaleDisplay.innerHTML = e.target.value;
});
