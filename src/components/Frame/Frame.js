import React, { Component } from "react";
import PropTypes from "prop-types";

import stylesheet from "./Frame.scss";

class Frame extends Component {
  render() {
    const cssClasses = [stylesheet["frame"], [`frame--${this.props.format}`]];
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
