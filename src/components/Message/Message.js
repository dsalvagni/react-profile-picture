import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./Message.scss";

class Message extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={style.message}>
        {this.props.onClick ? (
          <button className={style['message__button']} onClick={this.props.onClick}>
            <div className={style["message__content"]}>{this.props.children}</div>
          </button>
        ) : (
          <div className={style["message__content"]}>{this.props.children}</div>
        )}
      </div>
    );
  }
}

Message.propTypes = {
  onClick: PropTypes.func
};

export default Message;
