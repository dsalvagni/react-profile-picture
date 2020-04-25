import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import Message from "./components/Message/Message";
import Frame from "./components/Frame/Frame";
import ZoomScale from "./components/ZoomScale/ZoomScale";
import Dropzone from "./components/Dropzone/Dropzone";
import Status from "./constants/Status";
import StatusMessage from "./constants/StatusMessage";
import Icon from "./components/Icon/Icon";

import { fileReader } from "./lib/FileReader";
import { processFile } from "./lib/ProcessFile";
import { fitToFrame, centerImage, scaleImage } from "./lib/FitToFrame";
import {
  renderToCanvas,
  updateHelper,
  clearCanvas
} from "./lib/RenderToCanvas";

import stylesheet from "./sass/ProfilePicture.scss";

class ProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.dragging = false;
    this.draggingPosition = {
      x: 0,
      y: 0,
      clientX: 0,
      clientY: 0
    };

    this.canvasRef = React.createRef();
    this.helperRef = React.createRef();
    this.frameRef = React.createRef();
    this.photoHelperRef = React.createRef();
    this.inputFileRef = React.createRef();

    this.onMoving = this.onMoving.bind(this);
    this.onMovingEnd = this.onMovingEnd.bind(this);

    this.state = {
      status: Status.EMPTY,
      loadedData: {},
      imageData: {},
      file: props.image
    };

    if (props.image) {
      this.processFile(props.image);
    }
  }

  componentWillMount() {
    this.registerImageEvents();
    this.debug("[componentWillMount]");
  }

  componentWillUnmount() {
    ["mousemove", "touchmove"].forEach(eName =>
      window.removeEventListener(eName, this.onMoving, false)
    );
    ["mouseup", "touchend"].forEach(eName =>
      window.removeEventListener(eName, this.onMovingEnd, false)
    );
    this.debug("[componentWillUnmount]");
  }

  resetState() {
    const state = { ...this.state };
    state.status = Status.EMPTY;
    state.loadedData = {};
    state.imageData = {};

    const photoHelper = this.photoHelperRef.current,
      helperWidth = photoHelper.clientWidth,
      helperHeight = photoHelper.clientHeight,
      cropSize = this.props.cropSize;

    this.setState(
      state,
      clearCanvas.bind(this, {
        photoCanvas: this.canvasRef.current,
        helperCanvas: this.helperRef.current,
        cropSize,
        helperWidth,
        helperHeight
      })
    );

    this.debug("[resetState]");
  }

  setStatus(status = Status.EMPTY) {
    const state = { ...this.state };

    state.status = status;
    this.setState(state);
    this.props.onStatusChange.call(this, status);
    this.debug("[setStatus]", { status: status });
  }

  dragStart(e) {
    this.dragging = true;
    this.draggingPosition.clientX = e.clientX;
    this.draggingPosition.clientY = e.clientY;
    if (e.touches) {
      this.draggingPosition.clientX = e.touches[0].clientX;
      this.draggingPosition.clientY = e.touches[0].clientY;
    }
    this.draggingPosition.x =
      this.draggingPosition.clientX - this.state.imageData.imageX;
    this.draggingPosition.y =
      this.draggingPosition.clientY - this.state.imageData.imageY;

    this.debug("[dragStart]", { draggingPosition: this.draggingPosition });
  }

  onMovingEnd() {
    this.dragging = false;
    this.debug("[mouseup, touchend]");
  }

  onMoving(e) {
    if (this.dragging) {
      e.preventDefault();
      const state = { ...this.state };
      const imageData = { ...state.imageData };
      let refresh = false;
      this.draggingPosition.clientX = e.clientX;
      this.draggingPosition.clientY = e.clientY;
      if (e.touches) {
        this.draggingPosition.clientX = e.touches[0].clientX;
        this.draggingPosition.clientY = e.touches[0].clientY;
      }

      var dy = this.draggingPosition.clientY - this.draggingPosition.y;
      var dx = this.draggingPosition.clientX - this.draggingPosition.x;
      dx = Math.min(dx, 0);
      dy = Math.min(dy, 0);
      /**
       * Limit the area to drag horizontally
       */
      if (imageData.imageWidth + dx >= this.props.cropSize) {
        imageData.imageX = dx;
        refresh = true;
      }
      if (imageData.imageHeight + dy >= this.props.cropSize) {
        imageData.imageY = dy;
        refresh = true;
      }
      if (refresh) {
        state.imageData = imageData;
        this.setState(state, this.renderImage.bind(this));
        this.debug("[mousemove, touchstart]", { ...imageData, refresh });
      }
    }
  }

  registerImageEvents() {
    ["mouseup", "touchend"].forEach(eName => {
      window.addEventListener(
        eName,
        this.onMovingEnd,
        false
      );
    });

    ["mousemove", "touchmove"].forEach(eName => {
      window.addEventListener(
        eName,
        this.onMoving,
        false
      );
    });
  }

  handleDragOut() {
    this.setStatus(Status.EMPTY);
    this.debug("[handleDragOut]");
  }

  handleDragOver() {
    this.setStatus(Status.DRAGOVER);
    this.debug("[handleDragOver]");
  }

  handleZoom(event) {
    this.scaleImage(Number(event.target.value));
    this.props.onZoomChange.call(this, { zoom: event.target.value });
    this.debug("[handleZoom]", { zoom: event.target.value });
  }

  handleFileChange(event) {
    this.readFile(event.target.files[0]);
    event.target.value = "";
    this.debug("[handleFileChange]", { file: event.target.files[0] });
  }

  handleTapToSelect() {
    this.inputFileRef.current.click();
    this.debug("[handleTapToSelect]");
  }

  handleOnDrop(file) {
    this.readFile(file);
    this.debug("[handleOnDrop]", { file });
  }

  handleRemove() {
    this.resetState();
    this.props.onImageRemoved.call(this);
    this.debug("[onImageRemoved]");
  }

  readFile(file) {
    this.setStatus(Status.LOADING);

    fileReader(file, {
      onLoadStart: () => {
        this.props.onImageLoading.call(this);
        this.debug("[onLoadStart]");
      },
      onError: error => {
        this.props.onError.call(this);
        this.onError(error);
        this.debug("[onLoadStart]", { error });
      },
      onLoadEnd: data => {
        const { base64Image } = data;

        const state = { ...this.state };
        state.file = file;
        this.setState(state);

        this.processFile(base64Image);
        this.debug("[onLoadEnd]", { data });
      }
    });
  }

  processFile(file) {
    processFile(file, {
      minImageSize: this.props.minImageSize,
      maxImageSize: this.props.maxImageSize,
      onLoad: data => {
        this.onImageDataLoaded(file, data);
        this.debug("[onLoad]", { data });
      },
      onError: error => {
        this.props.onError.call(this);
        this.onError(error);
        this.debug("[onError]", { error });
      }
    });
  }

  onImageDataLoaded(base64Image, loadedData) {
    const state = { ...this.state };
    state.loadedData = loadedData;

    const { cropSize, minZoom, maxZoom } = this.props;

    const imageData = fitToFrame({
      cropSize,
      imageWidth: loadedData.imageWidth,
      imageHeight: loadedData.imageHeight,
      minZoom,
      maxZoom
    });

    const positions = centerImage({
      cropSize,
      imageWidth: imageData.imageWidth,
      imageHeight: imageData.imageHeight,
      imageX: imageData.imageX,
      imageY: imageData.imageY
    });

    imageData.imageX = positions.imageX;
    imageData.imageY = positions.imageY;
    imageData.imageSrc = loadedData.imageSrc;
    state.imageData = imageData;
    state.status = Status.LOADED;
    this.setState(state, this.renderImage.bind(this));
    this.props.onImageLoaded.call(this, { data: loadedData });
    this.debug("[onImageLoaded]", { data: loadedData });
  }

  scaleImage(zoom) {
    const state = { ...this.state };
    const imageData = { ...state.imageData };
    const loadedData = { ...state.loadedData };

    const newValues = scaleImage({
      ...imageData,
      zoom,
      originalWidth: loadedData.originalImageWidth,
      originalHeight: loadedData.originalImageHeight,
      cropSize: this.props.cropSize
    });

    state.imageData = {
      ...imageData,
      ...newValues,
      zoom
    };
    this.setState(state, this.renderImage.bind(this));
    this.debug("[scaleImage]", { zoom, data: state.imageData });
  }

  renderImage() {
    renderToCanvas({
      canvas: this.canvasRef.current,
      cropSize: this.props.cropSize,
      onError: error => {
        this.onError(error);
        this.props.onError.call(this, error);
      },
      ...this.state.imageData
    });

    if (this.props.useHelper) {
      let frame = this.frameRef.current;
      let frameLeft = frame.offsetLeft;
      let frameTop = frame.offsetTop;

      let photoHelper = this.photoHelperRef.current;
      let photoHelperWidth = photoHelper.clientWidth;
      let photoHelperHeight = photoHelper.clientHeight;

      updateHelper({
        canvas: this.helperRef.current,
        cropSize: this.props.cropSize,
        onError: error => {
          this.onError(error);
          this.props.onError.bind(this);
        },
        frameTop,
        frameLeft,
        canvasWidth: photoHelperWidth,
        canvasHeight: photoHelperHeight,
        ...this.state.imageData
      });
    }

    this.props.onImagePropertiesChange.bind(this, {
      data: { ...this.state.imageData }
    });

    this.debug("[scalrenderImageeImage]", {
      data: { ...this.state.imagesData }
    });
  }

  renderMessages() {
    switch (this.state.status) {
      case Status.EMPTY:
      case Status.INVALID_FILE_TYPE:
      case Status.INVALID_IMAGE_SIZE:
        return (
          <Message onClick={this.handleTapToSelect.bind(this)}>
            {StatusMessage[this.state.status]}
          </Message>
        );
      case Status.LOADED:
        return null;

      default:
        return <Message>{StatusMessage[this.state.status]}</Message>;
    }
  }

  onError(message) {
    this.setStatus(message.error);
  }

  getImageAsDataUrl(quality = 1) {
    return this.canvasRef.current.toDataURL(quality);
  }

  getData() {
    return { ...this.state.imageData };
  }

  setImage(image) {
    this.readFile(image);
  }

  debug(message, extra = {}) {
    if (!this.props.debug) return;
    console.log(message, { ...extra });
  }

  render() {
    const cssClasses = [
      stylesheet["profile-picture"],
      stylesheet[`profile-picture--${this.state.status}`]
    ];
    return (
      <div className={cssClasses.join(" ")}>
        <div className={stylesheet["profile-picture__photo"]}>
          <div
            className={stylesheet["photo__helper"]}
            onMouseDown={
              !this.props.useHelper ? null : this.dragStart.bind(this)
            }
            onTouchStart={
              !this.props.useHelper ? null : this.dragStart.bind(this)
            }
            ref={this.photoHelperRef}
          >
            <Dropzone
              onDrop={this.handleOnDrop.bind(this)}
              onDragOver={this.handleDragOver.bind(this)}
              onDragOut={this.handleDragOut.bind(this)}
            >
              {this.props.useHelper ? (
                <canvas
                  className={stylesheet["profile-picture__canvas-helper"]}
                  ref={this.helperRef}
                />
              ) : null}
              <Frame
                frameRef={this.frameRef}
                size={this.props.cropSize}
                format={this.props.frameFormat}
              >
                <canvas
                  onMouseDown={
                    this.props.useHelper ? null : this.dragStart.bind(this)
                  }
                  onTouchStart={
                    this.props.useHelper ? null : this.dragStart.bind(this)
                  }
                  width={this.props.cropSize}
                  height={this.props.cropSize}
                  className={stylesheet["profile-picture__canvas"]}
                  ref={this.canvasRef}
                />
                {this.renderMessages()}
              </Frame>
            </Dropzone>
          </div>

          <div className={stylesheet["photo__options"]}>
            {this.state.status === Status.LOADED ? (
              <Fragment>
                <div className={stylesheet["options__zoom"]}>
                  <ZoomScale
                    min={this.state.imageData.minZoom}
                    max={this.state.imageData.maxZoom}
                    value={this.state.imageData.zoom}
                    onChange={this.handleZoom.bind(this)}
                  />
                </div>
                <div className={stylesheet["options__remove"]}>
                  <button
                    className={stylesheet["remove__button"]}
                    onClick={this.handleRemove.bind(this)}
                  >
                    <Icon name="trash" size={20} />
                  </button>
                </div>
              </Fragment>
            ) : null}
          </div>
        </div>
        <input
          className={stylesheet["profile-picture__input"]}
          type="file"
          accept="image/jpg,image/jpeg,image/png,image/bmp,image/gif"
          ref={this.inputFileRef}
          onChange={this.handleFileChange.bind(this)}
        />
      </div>
    );
  }
}

ProfilePicture.propTypes = {
  image: PropTypes.string,
  frameSize: PropTypes.number.isRequired,
  frameFormat: PropTypes.oneOf(["circle", "square", "rounded-square"]),
  cropSize: PropTypes.number.isRequired,
  minZoom: PropTypes.number.isRequired,
  maxZoom: PropTypes.number.isRequired,
  minImageSize: PropTypes.number.isRequired,
  maxImageSize: PropTypes.number.isRequired,
  useHelper: PropTypes.bool.isRequired,
  debug: PropTypes.bool.isRequired,
  // Callbacks
  onImagePropertiesChange: PropTypes.func,
  onImageLoading: PropTypes.func,
  onImageLoaded: PropTypes.func,
  onImageRemoved: PropTypes.func,
  onError: PropTypes.func,
  onZoomChange: PropTypes.func,
  onStatusChange: PropTypes.func
};

ProfilePicture.defaultProps = {
  frameSize: 160,
  frameFormat: "rounded-square",
  cropSize: 160,
  minZoom: 0.1,
  maxZoom: 2,
  minImageSize: 320,
  maxImageSize: 1000,
  useHelper: false,
  debug: false,
  // Callbacks
  onImagePropertiesChange: () => {},
  onImageLoading: () => {},
  onImageLoaded: () => {},
  onError: () => {},
  onZoomChange: () => {},
  onStatusChange: () => {},
  onImageRemoved: () => {}
};

export default ProfilePicture;
