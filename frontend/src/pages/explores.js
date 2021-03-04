import React from "react";
import { render } from "react-dom";

const contentState = {"entityMap":{"0":{"type":"mention","mutability":"IMMUTABLE","data":{"mention":{"id":"1","name":"Matthew Russell","email":"matthew.russell@google.com","avatar":"https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg"}}},"1":{"type":"mention","mutability":"IMMUTABLE","data":{"mention":{"id":"22","name":"Pascal Brandt","email":"pascalbrandt@fastmail.com","avatar":"https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png"}}}},"blocks":[{"key":"6f83o","text":"Hello Matthew Russell and Pascal Brandt please visit www.avocode.com for more info.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":6,"length":15,"key":0},{"offset":26,"length":13,"key":1}],"data":{}}]};
const contentState1 = {"blocks":[{"key":"3i46t","text":"Hello World Julian Krispel-Samsel  Matthew Russell , youtube.com","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":12,"length":21,"key":0},{"offset":35,"length":15,"key":1}],"data":{}}],"entityMap":{"0":{"type":"mention","mutability":"IMMUTABLE","data":{"mention":{"id":1230,"name":"Julian Krispel-Samsel","email":"julian.krispel@google.com","avatar":"https://avatars2.githubusercontent.com/u/1188186?v=3&s=400"}}},"1":{"type":"mention","mutability":"IMMUTABLE","data":{"mention":{"id":1,"name":"Matthew Russell","email":"matthew.russell@google.com","avatar":"https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg"}}}}}
class App extends React.Component {
  

  render() {
    return (
      <></>
    )
  }
}

render(<App />, document.getElementById("root"));
