(this.webpackJsonpexample=this.webpackJsonpexample||[]).push([[0],{237:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(24),i=a.n(r),o=(a(40),a(25)),s=a(3),c=a(26),u=a(27),m=a(34),h=a(33),d=a(239),p=a(11),g=(a(41),a(28)),E=a.n(g),b=(a(44),a(29)),f=a.n(b),v=function(e){Object(m.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).profilePictureRef=l.a.createRef(),n.state={image:null,debug:!0,frame:"rounded-square",constraints:"",hasImage:!1,messages:{DEFAULT:"Drop your photo here or tap to select.",INVALID_IMAGE_SIZE:"Your photo must be larger than 350px.",DRAGOVER:"Drop your photo",INVALID_FILE_TYPE:"Only images allowed."}},n}return Object(u.a)(a,[{key:"handleInputChange",value:function(e){var t=e.target,a="checkbox"===t.type?t.checked:t.value,n=t.name;this.setState(Object(s.a)({},n,a))}},{key:"handleMessageChange",value:function(e){var t=e.target,a=t.value,n=t.name;this.setState({messages:Object(o.a)({},this.state.messages,Object(s.a)({},n,a))})}},{key:"setHasImage",value:function(e){this.setState({hasImage:e})}},{key:"handleClick",value:function(){this.setState({image:this.profilePictureRef.current.getImageAsDataUrl()})}},{key:"renderOptions",value:function(){return l.a.createElement(n.Fragment,null,l.a.createElement("div",{className:"Actions"},this.state.image?l.a.createElement(n.Fragment,null,l.a.createElement("img",{src:this.state.image,alt:"profile"}),l.a.createElement("hr",null)):null,l.a.createElement("button",{className:"Button",onClick:this.handleClick.bind(this)},"Preview"),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("label",null,l.a.createElement("input",{type:"checkbox",name:"debug",checked:this.state.debug,onChange:this.handleInputChange.bind(this)}),"Debug (console)")),l.a.createElement("hr",null),l.a.createElement("li",null,l.a.createElement("strong",null,"Frame"),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("label",null,l.a.createElement("input",{type:"radio",name:"frame",value:"rounded-square",checked:"rounded-square"===this.state.frame,onChange:this.handleInputChange.bind(this)}),"Rounded square")),l.a.createElement("li",null,l.a.createElement("label",null,l.a.createElement("input",{type:"radio",name:"frame",value:"square",checked:"square"===this.state.frame,onChange:this.handleInputChange.bind(this)}),"Square")),l.a.createElement("li",null,l.a.createElement("label",null,l.a.createElement("input",{type:"radio",name:"frame",value:"circle",checked:"circle"===this.state.frame,onChange:this.handleInputChange.bind(this)}),"Circle")))),l.a.createElement("li",null,l.a.createElement("strong",null,"Constraints"),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("label",null,l.a.createElement("input",{type:"radio",name:"constraints",value:"",checked:""===this.state.constraints,onChange:this.handleInputChange.bind(this)}),"None")),l.a.createElement("li",null,l.a.createElement("label",null,l.a.createElement("input",{type:"radio",name:"constraints",value:"horizontal",checked:"horizontal"===this.state.constraints,onChange:this.handleInputChange.bind(this)}),"Only Horizontal")),l.a.createElement("li",null,l.a.createElement("label",null,l.a.createElement("input",{type:"radio",name:"constraints",value:"vertical",checked:"vertical"===this.state.constraints,onChange:this.handleInputChange.bind(this)}),"Only Vertical")))),l.a.createElement("hr",null),l.a.createElement("li",null,l.a.createElement("strong",null,"Messages"),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("input",{type:"text",name:"DEFAULT",placeholder:"Drop your photo here or tap to select.",value:this.state.messages.DEFAULT,onChange:this.handleMessageChange.bind(this)})),l.a.createElement("li",null,l.a.createElement("input",{type:"text",name:"INVALID_FILE_TYPE",placeholder:"Only images allowed.",value:this.state.messages.INVALID_FILE_TYPE,onChange:this.handleMessageChange.bind(this)})),l.a.createElement("li",null,l.a.createElement("input",{type:"text",name:"INVALID_IMAGE_SIZE",placeholder:"Your photo must be larger than 350px.",value:this.state.messages.INVALID_IMAGE_SIZE,onChange:this.handleMessageChange.bind(this)})),l.a.createElement("li",null,l.a.createElement("input",{type:"text",name:"DRAGOVER",placeholder:"Drop your photo",value:this.state.messages.DRAGOVER,onChange:this.handleMessageChange.bind(this)})))))))}},{key:"billboardAd",value:function(){var e=document.createElement("script");return e.type="text/javascript",e.id="billboard-ad",e.text='\n              try {\n                window._mNHandle.queue.push(function (){\n                  window._mNDetails.loadTag("403824754", "970x250", "403824754");\n                });\n            }\n            catch (error) {\n              console.log(\'leaderboard\', error);\n            }\n            ',document.getElementById("billboard-ad")||document.body.appendChild(e),l.a.createElement("div",{id:"403824754"})}},{key:"leaderboardAd",value:function(){var e=document.createElement("script");return e.type="text/javascript",e.id="leaderboard-ad",e.text='\n              try {\n                window._mNHandle.queue.push(function (){\n                    window._mNDetails.loadTag("915984225", "970x90", "915984225");\n                });\n            }\n            catch (error) {\n              console.log(\'leaderboard\', error);\n            }\n            ',document.getElementById("leaderboard-ad")||document.body.appendChild(e),l.a.createElement("div",{id:"915984225"})}},{key:"render",value:function(){return l.a.createElement("div",{className:"App"},l.a.createElement("header",{className:"Header"},l.a.createElement("a",{rel:"external nofollow",href:"https://github.com/dsalvagni/react-profile-picture"},"Find it on Github @dsalvagni/react-profile-picture")),l.a.createElement("div",{className:"Demo"},l.a.createElement("div",{className:"Page-Header"},l.a.createElement("h1",{className:"Page-Title"},"Profile Picture"),l.a.createElement("p",{className:"Page-Description"},"Simple way to update your avatar. ",l.a.createElement("br",null)," ",l.a.createElement("span",null,"A React version of"," ",l.a.createElement("a",{rel:"external nofollow",href:"https://github.com/dsalvagni/profile-picture"},"profile-picture")))),l.a.createElement("div",{className:"Example"},l.a.createElement("div",{className:"Card"},l.a.createElement(E.a,{ref:this.profilePictureRef,frameFormat:this.state.frame,image:f.a,debug:this.state.debug,useHelper:!0,onImageLoaded:this.setHasImage.bind(this,!0),onImageRemoved:this.setHasImage.bind(this,!1),messages:this.state.messages,constraints:this.state.constraints,cropSize:220}),l.a.createElement("hr",null),l.a.createElement("small",null,"Picture from"," ",l.a.createElement("a",{href:"https://www.oscars.org/news/academy-celebrates-10-years-napoleon-dynamite-live-commentary-event",target:"_blank",rel:"noopener noreferrer"},"https://www.oscars.org/news/academy-celebrates-10-years-napoleon-dynamite-live-commentary-event"))," ",l.a.createElement("br",null),l.a.createElement("small",null,"Icons generated from"," ",l.a.createElement("a",{href:"https://icomoon.io/app",target:"_blank",rel:"noopener noreferrer"},"https://icomoon.io/app"))),this.state.hasImage?this.renderOptions():null)),l.a.createElement("div",{className:"container"},this.billboardAd(),l.a.createElement("h1",null,"About"),l.a.createElement("p",null,"This is a React version of"," ",l.a.createElement("a",{rel:"external nofollow",href:"https://github.com/dsalvagni/profile-picture"},"Profile Picture (jQuery)")," ","which was published +3 years ago."),l.a.createElement("p",null,"I've decided to write a React version of it as a personal project. I've noticed that the jQuery version got some attention on"," ",l.a.createElement("a",{href:"https://codepen.io/dsalvagni/details/BLapab"},"codepen")," ","(+30k views) and I thought that it would be great if I could move the old code to a modern library."),l.a.createElement("h2",null,"Setup"),l.a.createElement("p",null,"The better option would be to add this component into your project by cloning this repository and building it yourself with the design changes that you might want to make."," "),l.a.createElement("p",null,l.a.createElement("em",null,"I'm not sure if this is going to be published on NPM.")," ",l.a.createElement("a",{rel:"external nofollow",href:"https://github.com/dsalvagni/react-profile-picture/issues/new"},"Should I?")),l.a.createElement("p",null,"Anyway, you can always add it to your project also by installing using NPM + Github:"),l.a.createElement(d.a,{language:"javascript",style:p.atomDark},"npm i --save git+https://github.com/dsalvagni/react-profile-picture.git"),l.a.createElement("h2",null,"Example"),l.a.createElement(d.a,{language:"javascript",style:p.atomDark},'\nimport React, { Component } from \'react\';\n\nimport ProfilePicture from "profile-picture"\nimport "profile-picture/build/ProfilePicture.css"\n\nclass App extends Component {\n  constructor(props) {\n    super(props)\n\n    this.profilePictureRef = React.createRef();\n  }\n\n  handleUpload() {\n    const PP = this.profilePicture.current;\n    const imageData = PP.getData();\n    const file = imageData.file;\n    const imageAsDataURL = PP.getImageAsDataUrl();\n\n    ...\n    //add here the upload logic...\n  }\n\n  render() {\n    return <ProfilePicture\n      ref={this.profilePictureRef}\n      useHelper={true}\n      debug={true}\n    />\n\n    <button onClick={this.handleUpload.bind(this)}>Upload</button>\n  }\n}\n'),this.leaderboardAd(),l.a.createElement("h2",null,"Options"),l.a.createElement("p",null,l.a.createElement("a",{rel:"external nofollow",href:"https://github.com/dsalvagni/react-profile-picture"},"Find the options and other info here."))),l.a.createElement("footer",null,"Made with"," ",l.a.createElement("span",{role:"img","aria-labelledby":"red heart"},"\u2764\ufe0f")," ","and"," ",l.a.createElement("span",{role:"img","aria-labelledby":"snowflake"},"\u2744\ufe0f")," ","by ",l.a.createElement("a",{href:"https://twitter.com/danielsalvagni"},"@danielsalvagni"),"."))}}]),a}(n.Component);i.a.render(l.a.createElement(v,null),document.getElementById("root"))},29:function(e,t,a){e.exports=a.p+"static/media/example.aea3bfc1.jpg"},35:function(e,t,a){e.exports=a(237)},40:function(e,t,a){},41:function(e,t,a){}},[[35,1,2]]]);
//# sourceMappingURL=main.c8309eac.chunk.js.map