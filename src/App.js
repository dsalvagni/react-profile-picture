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

  billboardAd() {
    return {__html: '<script type="text/javascript">try {window._mNHandle.queue.push(function (){window._mNDetails.loadTag("403824754", "970x250", "403824754");});}catch (error) {console.log("Ad",error);}</script>'};
  }

  leaderboardAd() {
    return { __html: '<script type="text/javascript">try {window._mNHandle.queue.push(function (){window._mNDetails.loadTag("915984225", "970x90", "915984225");});}catch (error) {console.log("Ad",error);}</script>'};
  }

  render() {
    return (
        <div className="App">
        <header className="Header">
          <a rel="external nofollow" href="https://github.com/dsalvagni/react-profile-picture">Find it on Github @dsalvagni/react-profile-picture</a>
        </header>
        <div className="Demo">
          <div className="Page-Header">
          <h1 className="Page-Title">Profile Picture</h1>
          <p className="Page-Description">Simple way to update your avatar. <br/> <span>A React version of <a rel="external nofollow" href="https://github.com/dsalvagni/profile-picture">profile-picture</a></span></p>
          </div>
          <div className="Example">
            <div className="Card">
              <ProfilePicture
                ref={this.profilePictureRef}
                frameFormat={this.state.frame}
                image={example}
                debug={this.state.debug}
                useHelper={true}
                onImageLoaded={this.setHasImage.bind(this, true)}
                onImageRemoved={this.setHasImage.bind(this, false)}
                cropSize={220}
              />
              <hr />
              <small>Picture from <a href="https://www.oscars.org/news/academy-celebrates-10-years-napoleon-dynamite-live-commentary-event" target="_blank" rel="noopener noreferrer">
              https://www.oscars.org/news/academy-celebrates-10-years-napoleon-dynamite-live-commentary-event</a></small> <br />
              <small>Icons generated from <a href="https://icomoon.io/app" target="_blank" rel="noopener noreferrer">https://icomoon.io/app</a></small>
            </div>
            {this.state.hasImage ? this.renderOptions() : null}
          </div>
          </div>
          <div className="container">
            <div dangerouslySetInnerHTML={this.billboardAd()}></div>
          <h1>About</h1>
          <p>This is a React version of <a rel="external nofollow" href="https://github.com/dsalvagni/profile-picture">Profile Picture (jQuery)</a> which was published +3 years ago.</p>
          <p>I've decided to write a React version of it as a personal project. I've noticed that the jQuery version got some attention on <a href="https://codepen.io/dsalvagni/details/BLapab">codepen</a> (+30k views) and I thought that it would be great if I could move the old code to a modern library.</p>
          <h2>Setup</h2>
          <p>The better option would be to add this component into your project by cloning this repository and building it yourself with the design changes that you might want to make. </p>
          <p><em>I'm not sure if this is going to be published on NPM.</em> <a rel="external nofollow" href="https://github.com/dsalvagni/react-profile-picture/issues/new">Should I?</a></p>
          <p>Anyway, you can always add it to your project also by installing using NPM + Github:</p>


            <SyntaxHighlighter language='javascript' style={atomDark}>{`npm i --save git+https://github.com/dsalvagni/react-profile-picture.git`}</SyntaxHighlighter>
          
          <h2>Example</h2>
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
            <div dangerouslySetInnerHTML={this.billboardAd()}></div>
            <h2>Options</h2>
            <p><a rel="external nofollow" href="https://github.com/dsalvagni/react-profile-picture">Find the options and other info here.</a></p>
          </div>
          <footer>
            Made with <span role="img" aria-labelledby="red heart">❤️</span> and <span role="img" aria-labelledby="snowflake">❄️</span> by <a href="https://twitter.com/danielsalvagni">@danielsalvagni</a>.
          </footer>
        </div>
    );
  }
}

export default App;
