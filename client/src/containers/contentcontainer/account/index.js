import React, { Component } from 'react'
import "./account.css"

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.count = 0;
    }

  render() {
    return (
      <div className="account">
        {`Account ${++this.count}`}
      </div>
    )
  }
}
