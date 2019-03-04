import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.css";
import Scrollbar from "../widgets/Scrollbar";
import Header from "../header";
import ContentContainer from "../contentcontainer";
import Landing from "../contentcontainer/landing";
import Posts from "../contentcontainer/posts";
import Login from "../contentcontainer/login";
import Register from "../contentcontainer/register";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.osRef = React.createRef();
    this.state = {
      style: {
        sideNav: {
          display: ""
        },
        contentContainer: {
          left: "",
          width: ""
        }
      },
      appType: this.props.appType,
      hamButtonFlag: this.props.hamButtonFlag,
      flags: {
        messageButton: false,
        notificationButton: false,
        userButton: false,
        tuneButton: false
      }
    };
  }

  toggleHamButton = () => {
    if (this.state.appType === "mobile") {
      if (!this.state.hamButtonFlag) {
        this.setState({
          style: {
            sideNav: {
              display: "display_block"
            },
            contentContainer: {
              left: "left_0px",
              width: "width_100vw"
            }
          },
          hamButtonFlag: !this.state.hamButtonFlag,
          flags: {
            tuneButton: false
          }
        });
      } else {
        this.setState({
          style: {
            sideNav: {
              display: "display_none"
            },
            contentContainer: {
              left: "left_0px",
              width: "width_100vw"
            }
          },
          hamButtonFlag: !this.state.hamButtonFlag,
          flags: {
            tuneButton: false
          }
        });
      }
    } else if (this.state.appType === "desktop") {
      if (this.state.hamButtonFlag) {
        this.setState({
          style: {
            sideNav: {
              display: "display_none"
            },
            contentContainer: {
              left: "left_0px",
              width: "width_100vw"
            }
          },
          hamButtonFlag: !this.state.hamButtonFlag,
          flags: {
            tuneButton: false
          }
        });
      } else {
        this.setState({
          style: {
            sideNav: {
              display: "display_block"
            },
            contentContainer: {
              left: "left_240px",
              width: "width_calc100vw-240px"
            }
          },
          hamButtonFlag: !this.state.hamButtonFlag,
          flags: {
            tuneButton: false
          }
        });
      }
    }
  };

  render() {
    return (
      <Router>
        <Scrollbar
          tag="div"
          ref={this.osRef}
          className="app-container"
          options={{
            overflowBehavior: { y: "hidden" }
          }}
        >
          <Header
            flags={this.state.flags}
            cssProps={this.state.style.sideNav}
            toggleHamButton={this.toggleHamButton}
          />
          <ContentContainer cssProps={this.state.style.contentContainer}>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/posts" component={Posts} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
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
