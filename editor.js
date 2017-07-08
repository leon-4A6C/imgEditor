class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rect {
  constructor(x, y, w, h) {
    this.pos = new Vec(x, y);
    this.size = new Vec(w, h);
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
  }

  drawImage(img) {
    this.context.drawImage(img.img, img.pos.x - img.actualSize.x/2, img.pos.y - img.actualSize.y/2, img.scale.x * img.size.x, img.scale.y * img.size.y);
  }

  set image(img) {

    if (img instanceof Blob) {
      img = URL.createObjectURL(img); // make an imgURL of the blob
    }

    this.img = new Img(img);

  }

  get blob() {
    return this.canvas.toBlob();
  }

  get dataUrl() {
    return this.canvas.toDataURL();
  }

}
