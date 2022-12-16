// Should be used to create complex objects

enum ImageFormat {
  PNG = 'png',
  JPG = 'jpg',
}

interface IResolution {
  width: number;
  height: number;
}

interface IImageConversion extends IResolution {
  format: ImageFormat;
}

class ImageBuilder {
  private formats: ImageFormat[] = [];
  private resolutions: IResolution[] = [];

  addPNG() {
    if (this.formats.includes(ImageFormat.PNG)) {
      return this;
    }
    this.formats.push(ImageFormat.PNG);
    return this;
  }

  addJPG() {
    if (this.formats.includes(ImageFormat.JPG)) {
      return this;
    }
    this.formats.push(ImageFormat.JPG);
    return this;
  }

  addResolution(width: number, height: number) {
    this.resolutions.push({ width, height });
    return this;
  }

  build(): IImageConversion[] {
    const res: IImageConversion[] = [];

    for (let r of this.resolutions) {
      for (let f of this.formats) {
        res.push({
          format: f,
          width: r.width,
          height: r.height,
        });
      }
    }
    return res;
  }
}

console.log(
  new ImageBuilder()
    .addJPG()
    .addPNG()
    .addResolution(100, 50)
    .addResolution(200, 200)
    .build()
);
