import React, { Component, Fragment } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/styles/prism';
import './App.css';

import ProfilePicture from "profile-picture"
import "profile-picture/build/ProfilePicture.css"

import example from "./example.jpg";

class App extends Component {
  constructor(props) {
    super(props);

    this.profilePictureRef = React.createRef();
    this.state = {
      image: null,
      debug: true,
      frame: "rounded-square",
      hasImage: false
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  setHasImage(hasImage) {
    this.setState({ hasImage });
  }

  handleClick() {
    this.setState({
      image: this.profilePictureRef.current.getImageAsDataUrl()
    });
  }


  renderOptions() {
    return (
      <Fragment>
        <div className="Actions">
          {this.state.image ? (
            <Fragment>
            <img src={this.state.image} alt="profile" />
            <hr />
            </Fragment>
          ) : null}
          <button className="Button" onClick={this.handleClick.bind(this)}>
            Preview
          </button>
          <ul>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="debug"
                  checked={this.state.debug}
                  onChange={this.handleInputChange.bind(this)}
                />
                Debug (console)
              </label>
            </li>
            <li>
              <strong>Frame</strong>
              <ul>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="frame"
                      value="rounded-square"
                      checked={this.state.frame === "rounded-square"}
                      onChange={this.handleInputChange.bind(this)}
                    />
                    Rounded square
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="frame"
                      value="square"
                      checked={this.state.frame === "square"}
                      onChange={this.handleInputChange.bind(this)}
                    />
                    Square
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      type="radio"
                      name="frame"
                      value="circle"
                      checked={this.state.frame === "circle"}
                      onChange={this.handleInputChange.bind(this)}
                    />
                    Circle
                  </label>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </Fragment>
    );
  }

  render() {
    return (
        <div className="App">
        <div className="Demo">
          <div className="Card">
            <ProfilePicture
              ref={this.profilePictureRef}
              frameFormat="circle"
              image={example}
              debug={this.state.debug}
              useHelper={true}
              onImageLoaded={this.setHasImage.bind(this, true)}
              onImageRemoved={this.setHasImage.bind(this, false)}
              cropSize={220}
            />
            <hr />
            <small>Picture from <a href="https://www.oscars.org/news/academy-celebrates-10-years-napoleon-dynamite-live-commentary-event" target="_blank" rel="noopener noreferrer">
            https://www.oscars.org/news/academy-celebrates-10-years-napoleon-dynamite-live-commentary-event</a></small>
          </div>
          {this.state.hasImage ? this.renderOptions() : null}
          </div>
          <div className="container">
            <SyntaxHighlighter language='javascript' style={atomDark}>
{`
import React, { Component } from 'react';

import ProfilePicture from "profile-picture"
import "profile-picture/build/ProfilePicture.css"

class App extends Component {
  constructor(props) {
    super(props)

    this.profilePictureRef = React.createRef();
  }

  handleUpload() {
    const PP = this.profilePicture.current;
    const imageData = PP.getData();
    const file = imageData.file;
    const imageAsDataURL = PP.getImageAsDataUrl();

    ...
    //add here the upload logic...
  }

  render() {
    return <ProfilePicture
      ref={this.profilePictureRef}
      useHelper={true}
      debug={true}
    />

    <button onClick={this.handleUpload.bind(this)}>Upload</button>
  }
}
`}
            </SyntaxHighlighter>
          </div>
        </div>
    );
  }
}


export default App;
