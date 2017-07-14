class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rect {
  constructor(x, y, w, h, color = "#000") {
    this.pos = new Vec(x, y);
    this.size = new Vec(w, h);
    this.color = color;
  }
}

class Img extends Rect {
  constructor(imgUrl, x = 0, y = 0, w, h) {
    super(x, y, w || 100, h || 100);
    this.scale = new Vec(1, 1);
    this.rotation = 0; // rotation in degrees
    this.img = document.createElement("img");
    this.img.src = imgUrl;
    this.img.addEventListener("load", e => {
      this.img.width = w || this.img.naturalWidth;
      this.img.height = h || this.img.naturalHeight;
      this.size.x = this.img.width;
      this.size.y = this.img.height;
    });
  }

  get actualSize() {
    return new Vec(this.size.x * this.scale.x, this.size.y * this.scale.y);
  }

}

class InputHandler {
  constructor(editor) {
    this.editor = editor;
    this.editor.canvas.addEventListener("wheel", e => {
      this.scaleImage(e);
    });
    this.editor.canvas.addEventListener("mousemove", e => {
      this.moveImage(e);
    });
  }
  moveImage(e) {
    if (e.buttons === 1) {
      // move the img
      this.editor.img.pos.x += e.movementX;
      this.editor.img.pos.y += e.movementY;
      e.target.style.cursor = "grab";
    } else {
      e.target.style.cursor = "auto";
    }
  }
  scaleImage(e) {
    let scale = 0.1;
    if (e.deltaY > 0) {
      scale = -0.1;
    }
    this.editor.img.scale.x += scale;
    this.editor.img.scale.y += scale;
  }
}

class Editor {
  // you have to give it an width and height and you can give it an parent where it will "sit" in.
  constructor(width, height, desiredWidth, desiredHeight, parent = document.body) {
    this.canvas = document.createElement("canvas");
    this.canvas.classList.add("editorCanvas");
    this.canvas.height = this.height =  height;
    this.canvas.width = this.width =  width;
    this.context = this.canvas.getContext("2d");
    this.padding = 120; // minimum between the edges of the mask and the border

    this.mask = new Rect(this.width/2, this.height/2, desiredWidth || this.width, desiredHeight || this.height, "rgba(0, 0, 0, 0.4)");
    // TODO: add an mask thingy

    this.img;
    this.parent = parent;
    // add/append it to the parent or body
    this.parent.appendChild(this.canvas);

    this.inputHandler = new InputHandler(this);

    // the "game" loop
    this.update = () => {

      this.draw();
      requestAnimationFrame(this.update);
    }
    this.update();
  }


  draw() {
    this.context.fillStyle = "#fff";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height); // clear the screen

    if (this.img) {
      this.drawImage(this.img);
    }

    this.drawRect(this.mask);

  }

  drawRect(rect) {
    this.context.save();
    this.context.fillStyle = rect.color;
    this.context.strokeRect(rect.pos.x - rect.size.x/2, rect.pos.y - rect.size.y/2, rect.size.x, rect.size.y);
    this.context.restore();
  }

  drawImage(img) {
    this.context.drawImage(img.img, img.pos.x - img.actualSize.x/2, img.pos.y - img.actualSize.y/2, img.scale.x * img.size.x, img.scale.y * img.size.y); // draws from the middle
  }

  set image(img) {

    if (img instanceof Blob) {
      img = URL.createObjectURL(img); // make an imgURL of the blob
    }

    this.img = new Img(img);

  }

  get blob() {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.drawImage(this.canvas, this.mask.pos.x - this.mask.size.x/2, this.mask.pos.y - this.mask.size.y/2, this.mask.size.x, this.mask.size.y, 0, 0, this.mask.size.x, this.mask.size.y);
      canvas.toBlob(resolve);
    });
  }

  get dataUrl() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.drawImage(this.canvas, this.mask.pos.x - this.mask.size.x/2, this.mask.pos.y - this.mask.size.y/2, this.mask.size.x, this.mask.size.y, 0, 0, this.mask.size.x, this.mask.size.y);
    return canvas.toDataURL();
  }

}
