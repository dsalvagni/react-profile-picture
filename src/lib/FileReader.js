const INVALID_FILE_TYPE = "INVALID_FILE_TYPE";
const UNKNOWN = "UNKNOWN";

/**
 * Wrapper for the JS FileReader API.
 * @author Daniel Salvagni <danielsalvagni@gmail.com>
 * 
 * @param {File} file Image file
 * @param {object} settings Function's settings
 * @param {function} settings.onError Error Callback 
 * @param {function} settings.onLoadStart Start Callback
 * @param {function} settings.onLoadEnd Finished loading callback
 * @returns {object} FileReader instance
 */
const fileReader = (file, settings) => {
  if (!file.type.match("image.*"))
    if (typeof config.onError === "function")
      config.onError.call(this, { error: INVALID_FILE_TYPE });

  const config = {
    onError: () => {},
    onLoadStart: () => {},
    onLoadEnd: () => {},
    ...settings
  };

  const reader = new FileReader();

  reader.onloadstart = () => {
    if (typeof config.onLoadStart === "function")
      config.onLoadStart.call(this, { file });
  };
  reader.onloadend = data => {
    if (typeof config.onLoadEnd === "function")
      config.onLoadEnd.call(this, {
        base64Image: data.target.result,
        type: file.type
      });
  };
  reader.onerror = () => {
    if (typeof config.onError === "function")
      config.onError.call(this, { error: UNKNOWN });
  };

  reader.readAsDataURL(file);
  return reader;
};

export { fileReader, UNKNOWN, INVALID_FILE_TYPE };
