import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.css";
import $ from "jquery";
import Scrollbar from "../widgets/Scrollbar";
import Header from "../header";
import ContentContainer from "../contentcontainer";
import Landing from "../contentcontainer/landing";
import Login from "../contentcontainer/login";
import Register from "../contentcontainer/register";
import Account from "../contentcontainer/account";
import Posts from "../contentcontainer/posts";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.osRef = React.createRef();
    this.state = {
      appType: this.props.appType,
      hamButtonFlag: this.props.hamButtonFlag
    };
  }

  closeModalWindow = e => {
    if (!$.contains($(".app-header_r_message-container")[0], e.target)) {
      const messageButton = $(".message-button");
      messageButton.removeClass("background-color_rgba11111111105");
      messageButton.siblings(".message-window").removeClass("display_block");
      messageButton.attr("datatoggle", "false");
    } 
    if(!$.contains($(".app-header_r_notification-container")[0], e.target)) {
      const notificationButton = $(".notification-button");
      notificationButton.removeClass("background-color_rgba11111111105");
      notificationButton
        .siblings(".notification-window")
        .removeClass("display_block");
      notificationButton.attr("datatoggle", "false");
    } 
    if (!$.contains($(".app-header_r_user-container")[0], e.target)) {
      const userButton = $(".user-button");
      userButton.removeClass("background-color_rgba5214025505");
      userButton.siblings(".user-window").removeClass("display_block");
      userButton.attr("datatoggle", "false");
    } 
    if (!$.contains($(".app-header_r_tune-container")[0], e.target)) {
      const tuneButton = $(".tune-button");
      tuneButton.removeClass("background-color_rgba11111111105");
      tuneButton.siblings(".tune-window").removeClass("display_block");
      tuneButton.attr("datatoggle", "false");
    }
  };

  toggleHamButton = () => {
    if (this.state.appType === "mobile") {
      if (!this.state.hamButtonFlag) {
        $(".side-nav").addClass("display_block");
        this.setState({
          hamButtonFlag: !this.state.hamButtonFlag
        });
      } else {
        $(".side-nav").removeClass("display_block");
        this.setState({
          hamButtonFlag: !this.state.hamButtonFlag
        });
      }
    } else if (this.state.appType === "desktop") {
      if (this.state.hamButtonFlag) {
        $(".side-nav").addClass("display_none");
        $(".content-container").addClass("left_0px");
        $(".content-container").addClass("width_100vw");
        this.setState({
          hamButtonFlag: !this.state.hamButtonFlag
        });
      } else {
        $(".side-nav").removeClass("display_none");
        $(".content-container").removeClass("left_0px");
        $(".content-container").removeClass("width_100vw");
        this.setState({
          hamButtonFlag: !this.state.hamButtonFlag
        });
      }
    }
  };

  changeHBF = () => {
    this.setState({
      hamButtonFlag: false
    })
  }

  render() {
    return (
      <Router>
        <Scrollbar
          tag="div"
          ref={this.osRef}
          className="app-container"
          options={{
            overflowBehavior: { x: "scroll", y: "hidden" }
          }}
          onClick={e => this.closeModalWindow(e)}
        >
          <Header appType={this.state.appType} changeHBF={this.changeHBF} toggleHamButton={this.toggleHamButton} />
          <ContentContainer>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/account" component={Account} />
              <Route path="/posts" component={Posts} />
              <Route
                component={() => (
                  <h1 style={{ textAlign: "center", marginTop: "128px" }}>
                    404 Not found.
                  </h1>
                )}
              />
            </Switch>
          </ContentContainer>
        </Scrollbar>
      </Router>
    );
  }
}
