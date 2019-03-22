import React, { Component } from "react";
import "./tunewindow.css";
import Scrollbar from "../../widgets/Scrollbar";

export default class TuneWindow extends Component {
  constructor(props) {
    super(props);
    this.osTargetRef = React.createRef();
  }

  render() {
    return (
      <div className="tune-window">
      {/* <div className={`tune-window ${this.props.cssProps.display}`}> */}
        <Scrollbar
          tag="div"
          ref={this.osRef}
          className="tune-window_scrollbar"
          options={{}}
        >
        <div className="tune-window_container">
          <p>Tune window</p>
          <p>Tune window</p>
          <p>Tune window</p>
          <p>Tune window</p>
          <p>Tune window</p>
          <p>Tune window</p>
          <p>Tune window</p>
          <p>Tune window</p>
          <p>Tune window</p>
          <p>Tune window</p>
          <p>Tune window</p>
          </div>
        </Scrollbar>
      </div>
    );
  }
}
