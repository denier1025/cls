import React, { Component } from "react";
import "./contentcontainer.css";
import Scrollbar from "../widgets/Scrollbar";

export default class ContentContainer extends Component {
  constructor(props) {
    super(props);
    this.osRef = React.createRef();
  }

  render() {
    return (
      <Scrollbar
        tag="div"
        ref={this.osRef}
        className="content-container"
        options={{
          overflowBehavior: { x: "hidden", y: "scroll" }
        }}
      >
        <div className="content-children">{this.props.children}</div>
      </Scrollbar>
    );
  }
}
