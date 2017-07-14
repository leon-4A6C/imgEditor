const container = document.getElementById("container");
const editor = new Editor(600, 300, 300, 150, container);
const file = document.getElementById("file");
const updateButton = document.getElementById("updateButton");
const saveButton = document.getElementById("saveButton");

file.addEventListener("change", e => {
  const blob = e.target.files[0];
  editor.image = blob;
});

updateButton.addEventListener("click", e => {
  const desiredWidth = document.getElementById("desiredWidth").value;
  const desiredHeight = document.getElementById("desiredHeight").value;

  editor.mask.size.x = parseInt(desiredWidth);
  editor.mask.size.y = parseInt(desiredHeight);

});

saveButton.addEventListener("click", e => {
  editor.blob.then(blob => {
    console.log(blob);
  });
  const a = document.createElement("a");
  a.download = "bla.png";
  a.setAttribute("data-auto-download", true);
  a.href = editor.dataUrl;
  a.innerHTML = "download link";
  document.body.appendChild(a);
  console.log(a);
});
