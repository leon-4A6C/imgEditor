const editor = new Editor(300, 300);
const file = document.getElementById("file");

file.addEventListener("change", (e) => {
  const blob = e.target.files[0];
  editor.image = blob;
});
