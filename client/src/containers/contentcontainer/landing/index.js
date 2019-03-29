import React, { Component } from "react";
import "./landing.css";
import axios from "axios";

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {
        garbage1: "",
        garbage2: "",
        garbage3: "",
        garbage4: "",
        garbage5: "",
        garbage6: "",
        garbage7: "",
        garbage8: ""
      }
    }
  }

  componentDidMount() {
    axios.get("/api/register/test"
      // , {
      //   onDownloadProgress: (event) => {
      //     let length = event.lengthComputable 
      //   ? event.total 
      //   : event.target.getResponseHeader('X-Actual-Content-Length')
      //     if (length) {
      //       console.log(event)
      //       console.log(event.loaded)
      //       console.log(length)
      //       // $(".processBar").text(Math.round(event.target.response.length / length * 100) + "%");
      //       $(`<p> ${Math.round(event.loaded / length * 100)}% </p>`).appendTo(".processBar");
      //   }
      //   }
      // }
      )
      .then(res => this.setState({ 
        content: res.data
      }))
      .catch(err => console.log(err));
  };

  render() {
    
    return (
        <div className="landing">
        {this.state.content.garbage1}
        {this.state.content.garbage2}
        {this.state.content.garbage3}
        {this.state.content.garbage4}
        {this.state.content.garbage5}
        {this.state.content.garbage6}
        {this.state.content.garbage7}
        {this.state.content.garbage8}
        </div>
    );
  }
}
