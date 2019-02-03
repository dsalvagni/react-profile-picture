import React, { Component } from "react";
import PropTypes from "prop-types";

import stylesheet from "./Frame.scss";

class Frame extends Component {
  render() {
    const framesMap = {
      circle: stylesheet["frame--circle"],
      square: stylesheet["frame--square"],
      "rounded-square": stylesheet["frame--rounded-square"]
    }
    const cssClasses = [stylesheet["frame"], framesMap[this.props.format]];
    const style = {
      width: `${this.props.size}px`,
      height: `${this.props.size}px`
    };
    return (
      <div
        className={cssClasses.join(" ")}
        style={style}
        ref={this.props.frameRef}
      >
        {this.props.children}
      </div>
    );
  }
}

Frame.propTypes = {
  size: PropTypes.number.isRequired,
  format: PropTypes.oneOf(["circle", "square", "rounded-square"])
};

Frame.defaultProps = {
  size: 160,
  format: "circle"
};

export default Frame;
