const INVALID_CANVAS = "INVALID_CANVAS";
const INVALID_IMAGESRC = "INVALID_IMAGESRC";

/**
 * Render a give image source to a given canvas element.
 * It will clear the canvas before rendering again.
 *
 * @author Daniel Salvagni <danielsalvagni@gmail.com>
 * @param {object} settings Function settings
 * @param {Image} settings.imageSrc Image instance
 * @param {HTMLCanvasElement} settings.canvas Destionation canvas instance
 * @param {HTMLImageElement} settings.imageSrc Image instance
 * @param {number} settings.imageX Desired image x position
 * @param {number} settings.imageY Desired image y position
 * @param {number} settings.imageWidth Current image width
 * @param {number} settings.imageHeight Current image height
 * @param {number} settings.cropSize Crop size is also related to the canvas size. The canvas should have the same measure.
 * @param {function} settings.onError Error callbak
 */
const renderToCanvas = settings => {
  const config = {
    canvas: null,
    cropSize: 160,
    imageSrc: null,
    imageX: 0,
    imageY: 0,
    imageWidth: 320,
    imageHeight: 320,
    onError: () => {},
    ...settings
  };

  if (!config.canvas)
    if (typeof config.onError === "function")
      config.onError.call(this, { error: INVALID_CANVAS });

  if (!config.imageSrc)
    if (typeof config.onError === "function")
      config.onError.call(this, { error: INVALID_IMAGESRC });

  const context = config.canvas.getContext("2d");

  context.clearRect(0, 0, config.cropSize, config.cropSize);
  context.save();
  context.globalCompositeOperation = "destination-over";
  context.drawImage(
    config.imageSrc,
    config.imageX,
    config.imageY,
    config.imageWidth,
    config.imageHeight
  );
  context.restore();
};

/**
 * Render a give image source to a given canvas element.
 * It can also render a colored layer on top of the image.
 * @author Daniel Salvagni <danielsalvagni@gmail.com>
 *
 * @param {object} settings Function settings
 * @param {HTMLCanvasElement} settings.canvas Destionation canvas instance
 * @param {HTMLImageElement} settings.imageSrc Image instance
 * @param {number} settings.imageX Current image x position
 * @param {number} settings.imageY Current image y position
 * @param {number} settings.imageWidth Current image width
 * @param {number} settings.imageHeight Current image height
 * @param {number} settings.frameLeft It needs the position left from the frame element in order to calculate properly the X position
 * @param {number} settings.frameTop It needs the position top from the frame element in order to calculate properly the Y position
 * @param {number} settings.canvasWidth Canvas width must be defined
 * @param {number} settings.canvasHeight Canvas height must be defined
 * @param {number} settings.rgbaColor Color for the colored layer
 * @param {function} settings.onError Error callbak
 */
const updateHelper = settings => {
  const config = {
    canvas: null,
    imageSrc: null,
    imageX: 0,
    imageY: 0,
    imageWidth: 320,
    imageHeight: 320,
    rgbaColor: "rgba(255,255,255,.90)",
    frameLeft: 0,
    frameTop: 0,
    canvasWidth: 0,
    canvasHeight: 0,
    onError: () => {},
    ...settings
  };

  if (!config.canvas)
    if (typeof config.onError === "function")
      config.onError.call(this, { error: INVALID_CANVAS });

  if (!config.imageSrc)
    if (typeof config.onError === "function")
      config.onError.call(this, { error: INVALID_IMAGESRC });

  let x = config.imageX + config.frameLeft;
  let y = config.imageY + config.frameTop;

  config.canvas.width = config.canvasWidth;
  config.canvas.height = config.canvasHeight;

  const context = config.canvas.getContext("2d");
  /**
   * Clear
   */
  context.clearRect(0, 0, config.canvasWidth, config.canvasHeight);
  context.save();
  context.globalCompositeOperation = "destination-over";
  /**
   * Draw the helper
   */
  context.beginPath();
  context.rect(0, 0, config.canvasWidth, config.canvasHeight);
  context.fillStyle = config.rgbaColor;
  context.fill("evenodd");
  /**
   * Draw the image
   */
  context.drawImage(
    config.imageSrc,
    x,
    y,
    config.imageWidth,
    config.imageHeight
  );
  context.restore();
};

/**
 * Clear both default and helper canvas.
 *
 * @param {object} settings Function settings
 * @param {HTMLCanvasElement} settings.photoCanvas Default photo canvas instance
 * @param {HTMLCanvasElement} settings.helperCanvas Helper canvas instance
 * @param {number} settings.cropSize Crop size
 * @param {number} settings.helperHeight Helper canvas height
 * @param {number} settings.helperWidth Helper canvas width
 */
const clearCanvas = settings => {
  const {
    photoCanvas,
    helperCanvas,
    cropSize,
    helperWidth,
    helperHeight
  } = settings;
  const photoContext = photoCanvas.getContext("2d");

  photoContext.clearRect(0, 0, cropSize, cropSize);
  photoContext.save();

  if (helperCanvas) {
    const helperContext = helperCanvas.getContext("2d");
    helperContext.clearRect(0, 0, helperWidth, helperHeight);
    helperContext.save();
  }
};

export {
  renderToCanvas,
  updateHelper,
  clearCanvas,
  INVALID_CANVAS,
  INVALID_IMAGESRC
};
