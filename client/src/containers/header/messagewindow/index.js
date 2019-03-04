import React, { Component } from 'react'
import "./messagewindow.css"
import Scrollbar from "../../widgets/Scrollbar";

export default class MessageWindow extends Component {
    constructor(props) {
        super(props);
        this.osTargetRef = React.createRef();
      }

  render() {
    return (
      <div className="message-window">
        <Scrollbar
          tag="div"
          ref={this.osRef}
          className="message-window_scrollbar"
          options={{}}
        >
        <div className="message-window_container">
          <p>Message window</p>
          <p>Message window</p>
          <p>Message window</p>
          <p>Message window</p>
          <p>Message window</p>
          <p>Message window</p>
          <p>Message window</p>
          <p>Message window</p>
          <p>Message window</p>
          <p>Message window</p>
          <p>Message window</p>
          </div>
        </Scrollbar>
      </div>
    )
  }
}
