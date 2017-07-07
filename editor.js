class Editor {
  // you have to give it an width and height and you can give it an parent where it will "sit" in.
  constructor(width, height, parent) {
    this.canvas = document.createElement("canvas");
    this.canvas.height = this.height =  height;
    this.canvas.width = this.width =  width;
    this.context = this.canvas.getContext("2d");

    this.img;

    // add/append it to the parent or body
    if (parent) {
      parent.appendChild(this.canvas);
    } else {
      document.body.appendChild(this.canvas);
    }
  }

  set img(img) {
    this.img = img;
    // TODO: add it to the canvas
  }
}
