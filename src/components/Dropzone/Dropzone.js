import React, { Component } from "react";
import PropTypes from "prop-types";
const IDLE = "IDLE";
const OVER = "OVER";

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.preventDefault = this.preventDefault.bind(this);
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
        this.preventDefault,
        false
      );
    });
  }

  componentWillUnmount() {
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
      dropzoneArea.removeEventListener(eName, this.preventDefault, false);
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
