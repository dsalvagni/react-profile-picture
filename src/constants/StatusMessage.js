import React, { Fragment } from "react";
import Status from "./Status";
import Icon from "../components/Icon/Icon";

import style from "../components/Message/Message.scss";

const StatusMessage = (messages, type) => {
  switch (type) {
    case Status.EMPTY:
      return <p className={style["message__text"]}>{messages.DEFAULT}</p>;

    case Status.LOADING:
      return <Icon name="loading" size={48} />;

    case Status.DRAGOVER:
      return (
        <Fragment>
          <Icon name="upload" size={48} />
          <p className={style["message__text"]}>{messages.DRAGOVER}</p>
        </Fragment>
      );
    case Status.INVALID_FILE_TYPE:
      return (
        <Fragment>
          <p className={style["message__text"]}>{messages.INVALID_FILE_TYPE}</p>
          <p className={style["message__text"]}>{messages.DEFAULT}</p>
        </Fragment>
      );

    case Status.INVALID_IMAGE_SIZE:
      return (
        <Fragment>
          <p className={style["message__text"]}>
            {messages.INVALID_IMAGE_SIZE}
          </p>
          <p className={style["message__text"]}>{messages.DEFAULT}</p>
        </Fragment>
      );

    case Status.LOADED:
      return null;
  }
};

export default StatusMessage;
