import React, { Component } from 'react'
import "./userwindow.css"
import Scrollbar from "../../widgets/Scrollbar";

export default class UserWindow extends Component {
    constructor(props) {
        super(props);
        this.osTargetRef = React.createRef();
      }

  render() {
    return (
      <div className="user-window">
        <Scrollbar
          tag="div"
          ref={this.osRef}
          className="user-window_scrollbar"
          options={{}}
        >
        <div className="user-window_container">
          <p>User window</p>
          <p>User window</p>
          <p>User window</p>
          <p>User window</p>
          <p>User window</p>
          <p>User window</p>
          <p>User window</p>
          <p>User window</p>
          <p>User window</p>
          <p>User window</p>
          </div>
        </Scrollbar>
      </div>
    )
  }
}
