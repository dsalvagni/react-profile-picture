/**
 * @typedef {Object} ImageData
 * @property {number} scaleRatio Current ration for the new image sizes
 * @property {number} minZoom Updated minimum scale acceptable
 * @property {number} maxZoom Updated maximum scale acceptable
 * @property {number} imageWidth Updated image width
 * @property {number} imageHeight Updated image height
 */

/**
 * @typedef {Object} Point
 * @property {number} imageX X position
 * @property {number} imageY Y Position
 */

/**
 * @typedef {Object} PointAndSizes
 * @property {number} imageX X position
 * @property {number} imageY Y Position
 * @property {number} imageWidth Image width
 * @property {number} imageHeight Image height
 */

/**
 * Resize and position the image to fit into the frame
 * @author Daniel Salvagni <danielsalvagni@gmail.com>
 *
 * @param {object} options Function settings
 * @param {number} options.cropSize Desirable image crop size
 * @param {number} options.imageWidth Desirable final image width
 * @param {number} options.imageHeight Desirable final image height
 * @param {number} options.minZoom Minimum image scale acceptable
 * @param {number} options.maxZoom Maximum image scale acceptable
 * @returns {ImageData} Update values for image size and scale
 */
const fitToFrame = options => {
  const config = {
    cropSize: 160,
    imageWidth: 320,
    imageHeight: 320,
    minZoom: 0.1,
    maxZoom: 2,
    ...options
  };

  let newHeight, newWidth, scaleRatio;
  let frameRatio = config.cropSize / config.cropSize;
  let imageRatio = config.imageHeight / config.imageWidth;

  if (frameRatio > imageRatio) {
    newHeight = config.cropSize;
    scaleRatio = newHeight / config.imageHeight;
    newWidth = parseFloat(config.imageWidth) * scaleRatio;
  } else {
    newWidth = config.cropSize;
    scaleRatio = newWidth / config.imageWidth;
    newHeight = parseFloat(config.imageHeight) * scaleRatio;
  }

  return {
    scaleRatio,
    minZoom: scaleRatio,
    maxZoom: config.maxZoom - scaleRatio,
    zoom: scaleRatio,
    imageWidth: newWidth,
    imageHeight: newHeight
  };
};

/**
 *
 * Set the image to the center of the frame
 * @author Daniel Salvagni <danielsalvagni@gmail.com>
 * @param {object} options Function settings
 * @param {number} options.cropSize Desirable image crop size
 * @param {number} options.imageWidth Desirable final image width
 * @param {number} options.imageHeight Desirable final image height
 * @param {number} options.imageX Current image X position
 * @param {number} options.imageY Current image Y position
 * @returns {Point} New images X,Y positions
 */
const centerImage = options => {
  const config = {
    cropSize: 160,
    imageWidth: 320,
    imageHeight: 320,
    imageX: 0,
    imageY: 0,
    ...options
  };

  config.imageX = config.imageX || 0;
  config.imageY = config.imageY || 0;

  let x = Math.abs(config.imageX - (config.imageWidth - config.cropSize) / 2);
  let y = Math.abs(config.imageY - (config.imageHeight - config.cropSize) / 2);
  x = config.imageX - x;
  y = config.imageY - y;
  x = Math.min(x, 0);
  y = Math.min(y, 0);

  if (config.imageWidth + x < config.cropSize) {
    /**
     * Calculates to handle the empty space on the right side
     */
    x = Math.abs(config.imageWidth - config.cropSize) * -1;
  }
  if (config.imageHeight + y < config.cropSize) {
    /**
     * Calculates to handle the empty space on bottom
     */
    y = Math.abs(config.imageHeight - config.cropSize) * -1;
  }

  return {
    imageX: x,
    imageY: y
  };
};

/**
 * Calculates the new image's position based in its new size
 * @author Daniel Salvagni <danielsalvagni@gmail.com>
 * @param {number} newWidth
 * @param {number} newHeight
 * @param {object} settings Function settings
 * @param {number} settings.cropSize Desirable image crop size
 * @param {number} settings.imageWidth Current image width
 * @param {number} settings.imageHeight Current image height
 * @param {number} settings.imageX Current image X position
 * @param {number} settings.imageY Current image Y position
 * @returns {Point} Update image X,Y positions
 */
const getPosition = (newWidth, newHeight, settings) => {
  const config = {
    imageX: 0,
    imageY: 0,
    cropSize: 160,
    imageWidth: 320,
    imageHeight: 320,
    ...settings
  };

  let deltaY = (config.imageY - config.cropSize / 2) / config.imageHeight;
  let deltaX = (config.imageX - config.cropSize / 2) / config.imageWidth;
  let imageY = deltaY * newHeight + config.cropSize / 2;
  let imageX = deltaX * newWidth + config.cropSize / 2;
  imageY = Math.min(imageY, 0);
  imageX = Math.min(imageX, 0);

  if (newWidth + imageX < config.cropSize) {
    /**
     * Calculates to handle the empty space on the right side
     */
    imageX = Math.abs(newWidth - config.cropSize) * -1;
  }
  if (newHeight + imageY < config.cropSize) {
    /**
     * Calculates to handle the empty space on bottom
     */
    imageY = Math.abs(newHeight - config.cropSize) * -1;
  }
  return {
    imageX,
    imageY
  };
};

/**
 * Given a new scale, resize the image
 * @author Daniel Salvagni <danielsalvagni@gmail.com>
 * @param {object} settings Function settings
 * @param {number} settings.zoom Desirable image scale
 * @param {number} settings.originalWidth Original image width
 * @param {number} settings.originalHeight Original image height
 * @returns {PointAndSizes} Returns new image's size and position
 */
const scaleImage = settings => {
  const config = {
    zoom: 0.1,
    originalWidth: 320,
    originalHeight: 320,
    ...settings
  };
  /**
   * Calculates the image position to keep it centered
   */
  let newWidth = Math.ceil(config.originalWidth * config.zoom);
  let newHeight = Math.ceil(config.originalHeight * config.zoom);

  newWidth = Math.max(newWidth, settings.cropSize);
  newHeight = Math.max(newHeight, settings.cropSize);

  let position = getPosition(newWidth, newHeight, settings);
  /**
   * Set the ouput
   */
  return {
    imageWidth: newWidth,
    imageHeight: newHeight,
    imageX: position.imageX,
    imageY: position.imageY
  };
};

export { fitToFrame, centerImage, getPosition, scaleImage };
