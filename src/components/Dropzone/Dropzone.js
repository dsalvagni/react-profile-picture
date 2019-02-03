import React, { Component } from "react";
import PropTypes from "prop-types";
const IDLE = "IDLE";
const OVER = "OVER";

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.dropzoneElement = React.createRef();
    this.state = {
      status: IDLE
    };
  }

  preventDefault(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }

  handleDrop(event) {
    this.setStatus();
    event.stopPropagation();
    if (typeof this.props.onDrop === "function")
      this.props.onDrop.call(this, event.dataTransfer.files[0]);
  }

  componentDidMount() {
    const dropzoneArea = this.dropzoneElement.current;
    [
      "drag",
      "dragstart",
      "dragend",
      "dragover",
      "dragenter",
      "dragleave",
      "drop"
    ].forEach(eName => {
      dropzoneArea.addEventListener(
        eName,
        this.preventDefault.bind(this),
        false
      );
    });
  }

  componentWillUnount() {
    const dropzoneArea = this.dropzoneElement.current;
    [
      "drag",
      "dragstart",
      "dragend",
      "dragover",
      "dragenter",
      "dragleave",
      "drop"
    ].forEach(eName => {
      dropzoneArea.removeEventListener(eName);
    });
  }

  setStatus(status = IDLE) {
    const state = { ...this.state };
    if (state.status === status) return;

    if (status === IDLE)
      if (typeof this.props.onDragOut === "function")
        this.props.onDragOut.call(this);

    if (status === OVER)
      if (typeof this.props.onDragOver === "function")
        this.props.onDragOver.call(this);

    state.status = status;
    this.setState(state);
  }
  render() {
    return (
      <div
        ref={this.dropzoneElement}
        onDragEnter={() => this.setStatus(OVER)}
        onDragOver={() => this.setStatus(OVER)}
        onDragLeave={() => this.setStatus()}
        onDrop={this.handleDrop.bind(this)}
      >
        {this.props.children}
      </div>
    );
  }
}

Dropzone.propTypes = {
  onDrop: PropTypes.func
};

Dropzone.defaultProps = {
  onDrop: () => {},
  onDragOver: () => {},
  onDragOut: () => {}
};

export default Dropzone;

// function registerDropZoneEvents() {
//             var target = null;
//             /**
//              * Stop event propagation to all dropzone related events.
//              */
//             self.element.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 e.originalEvent.dataTransfer.dropEffect = 'copy';
//             });

//             /**
//              * Register the events when the file is out or dropped on the dropzone
//              */
//             self.element.on('dragend dragleave drop', function (e) {
//                 if (target === e.target) {
//                     self.element.removeClass('is-dragover');
//                 }
//             });
//             /**
//              * Register the events when the file is over the dropzone
//              */
//             self.element.on('dragover dragenter', function (e) {
//                 target = e.target;
//                 self.element.addClass('is-dragover');
//             });
//             /**
//              * On a file is selected, calls the readFile method.
//              * It is allowed to select just one file - we're forcing it here.
//              */
//             self.element.on('change', 'input[type=file]', function (e) {
//                 if (this.files && this.files.length) {
//                     readFile(this.files[0]);
//                     this.value = '';
//                 }
//             });
//             /**
//              * Handle the click to the hidden input file so we can browser files.
//              */
//             self.element.on('click', '.photo--empty .photo__frame', function (e) {
//                 $(cssSelector + ' input[type=file]').trigger('click');

//             });
//             /**
//              * Register the remove action to the remove button.
//              */
//             self.element.on('click', '.remove', function (e) {
//                 removeImage();
//             });
//             /**
//              * Register the drop element to the container component
//              */
//             self.element.on('drop', function (e) {
//                 readFile(e.originalEvent.dataTransfer.files[0]);
//             });

//         }
