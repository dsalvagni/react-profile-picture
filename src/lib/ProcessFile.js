const INVALID_IMAGE_SIZE = "INVALID_IMAGE_SIZE";

/**
 * Validates if a given string is has a DataURl pattern.
 * @author Daniel Salvagni <danielsalvagni@gmail.com>
 * @param {string} s
 * @returns {boolean}
 */
const isDataUrl = s => {
  s = s.toString();
  return !!s.match(
    /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i
  );
};

/**
 * @param {string} imageUrl File path or DataURL image
 * @author Daniel Salvagni <danielsalvagni@gmail.com>
 * @param {object} settings Settings as image size and also callbacks
 * @param {number} settings.minWidth Minimum acceptable image width
 * @param {number} settings.minHeight Minimum acceptable image height
 * @param {number} settings.maxHeight Maximum desirable image height
 * @param {number} settings.maxWidth Minimum desirable image width
 * @param {function} settings.onError Error callback
 * @param {function} settings.onLoad Load callback
 * 
 */
const processFile = (imageUrl, settings) => {
  const image = new Image();
  const config = {
    minWidth: 320,
    minHeight: 320,
    maxHeight: 1000,
    maxWidth: 1000,
    onError: () => {},
    onLoad: () => {},
    ...settings
  };

  if (!isDataUrl) image.crossOrigin = "anonymous";

  image.onload = () => {
    let ratio,
      newHeight,
      newWidth,
      imageWidth = image.width,
      imageHeight = image.height;

    if (imageWidth < config.minWidth || imageHeight < config.minHeight)
      if (typeof config.onError === "function")
        return config.onError.call(this, { error: INVALID_IMAGE_SIZE });

    let frameRatio = config.maxHeight / config.maxWidth;
    let imageRatio = config.imageHeight / config.imageWidth;

    if (frameRatio > imageRatio) {
      newHeight = config.maxHeight;
      ratio = newHeight / imageHeight;
      newWidth = parseFloat(imageWidth) * ratio;
    } else {
      newWidth = config.maxWidth;
      ratio = newWidth / imageWidth;
      newHeight = parseFloat(imageHeight) * ratio;
    }

    const output = {
      imageSrc: image,
      newWidth,
      newHeight,
      imageWidth,
      imageHeight,
      originalImageWidth: imageWidth,
      originalImageHeight: imageHeight,
      imageX: 0,
      imageY: 0,
      ratio
    };

    if (typeof config.onLoad === "function")
      return config.onLoad.call(this, output);
  };

  image.src = imageUrl;
};

export { processFile, INVALID_IMAGE_SIZE, isDataUrl };
