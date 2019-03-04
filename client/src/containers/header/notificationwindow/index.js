import React, { Component } from 'react'
import "./notificationwindow.css"
import Scrollbar from "../../widgets/Scrollbar";

export default class NotificationWindow extends Component {
    constructor(props) {
        super(props);
        this.osTargetRef = React.createRef();
      }

  render() {
    return (
      <div className="notification-window">
        <Scrollbar
          tag="div"
          ref={this.osRef}
          className="notification-window_scrollbar"
          options={{}}
        >
        <div className="notification-window_container">
          <p>Notification window</p>
          <p>Notification window</p>
          <p>Notification window</p>
          <p>Notification window</p>
          <p>Notification window</p>
          <p>Notification window</p>
          <p>Notification window</p>
          <p>Notification window</p>
          <p>Notification window</p>
          <p>Notification window</p>
          <p>Notification window</p>
          </div>
        </Scrollbar>
      </div>
    )
  }
}
