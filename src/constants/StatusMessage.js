import React, { Fragment } from "react";
import Status from "./Status";
import Icon from "../components/Icon/Icon";

import style from "../components/Message/Message.scss"

const StatusMessage = {
  [Status.EMPTY]: <p className={style["message__text"]}>Drop your photo here or tap to select.</p>,
  [Status.LOADING]:<Icon name="loading" size={48}/>,
  [Status.DRAGOVER]: (
    <Fragment>
      <Icon name="upload" size={48}/>
      <p className={style["message__text"]}>Drop your photo</p>
    </Fragment>
  ),
  [Status.INVALID_FILE_TYPE]: (
    <Fragment>
      <p className={style["message__text"]}>Only images allowed.</p>
      <p className={style["message__text"]}>Drop your photo here or tap to select.</p>
    </Fragment>
  ),
  [Status.INVALID_IMAGE_SIZE]: (
    <Fragment>
      <p className={style["message__text"]}>Your photo must be larger than 350px.</p>
      <p className={style["message__text"]}>Drop your photo here or tap to select.</p>
    </Fragment>
  ),
  [Status.LOADED]: null
};

export default StatusMessage;
