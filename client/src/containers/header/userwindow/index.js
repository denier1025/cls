import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./userwindow.css";
import $ from "jquery";
import Scrollbar from "../../widgets/Scrollbar";

class UserWindow extends Component {
  constructor(props) {
    super(props);
    this.osTargetRef = React.createRef();
  }

  componentDidUpdate() {
    const userButton = $(".user-button");
    userButton.removeClass("background-color_rgba5214025505");
    userButton.siblings(".user-window").removeClass("display_block");
    userButton.attr("datatoggle", "false");
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
          <nav className="user-window_container">
            <ul className="user-window_c_items">
              <li className="user-window_c_item">
                <Link to="/account" className="user-window_c_i_link">
                  <div className="user-window_c_account-icon-cover">
                    <svg
                      height="24px"
                      width="24px"
                      viewBox="0 0 24 24"
                      fill="rgb(149, 149, 149)"
                      className="user-window_c_account-icon"
                    >
                      <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z" />
                      <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                  </div>
                  <div className="user-window_c_i18n-account text-dimension">
                    Account
                  </div>
                </Link>
              </li>
              <li className="user-window_c_item">
                <Link to="/postlab" className="user-window_c_i_link">
                  <div className="user-window_c_post-icon-cover">
                    <svg
                      height="24px"
                      width="24px"
                      viewBox="-86 -85 510 510"
                      fill="rgb(149, 149, 149)"
                      className="user-window_c_post-icon"
                    >
                      <path d="m267 328.058594 60.441406-62.058594h-60.441406zm0 0" />
                      <path d="m0 340h251v-82.132812c0-4.417969 4.0625-7.867188 8.480469-7.867188h78.519531v-250h-338zm53.320312-265h132.816407c4.417969 0 8 3.582031 8 8s-3.582031 8-8 8h-132.816407c-4.417968 0-8-3.582031-8-8s3.582032-8 8-8zm0 64h225.199219c4.417969 0 8 3.582031 8 8s-3.582031 8-8 8h-225.199219c-4.417968 0-8-3.582031-8-8s3.582032-8 8-8zm0 62h225.199219c4.417969 0 8 3.582031 8 8s-3.582031 8-8 8h-225.199219c-4.417968 0-8-3.582031-8-8s3.582032-8 8-8zm0 0" />
                    </svg>
                  </div>
                  <div className="user-window_c_i18n-postlab text-dimension">
                    Post Lab
                  </div>
                </Link>
              </li>
              <li className="user-window_c_item">
                <Link to="#" className="user-window_c_i_link">
                  <div className="user-window_c_i18n-account text-dimension">
                    Text Text Text Text Text Text
                  </div>
                </Link>
              </li>
              <li className="user-window_c_item">
                <Link to="#" className="user-window_c_i_link">
                  <div className="user-window_c_i18n-account text-dimension">
                    Text
                  </div>
                </Link>
              </li>
              <li className="user-window_c_item">
                <Link to="#" className="user-window_c_i_link">
                  <div className="user-window_c_i18n-account text-dimension">
                    Text
                  </div>
                </Link>
              </li>
              <li className="user-window_c_item">
                <Link to="#" className="user-window_c_i_link">
                  <div className="user-window_c_i18n-account text-dimension">
                    Text
                  </div>
                </Link>
              </li>
              <li className="user-window_c_item">
                <Link to="#" className="user-window_c_i_link">
                  <div className="user-window_c_i18n-account text-dimension">
                    Text
                  </div>
                </Link>
              </li>
              <li className="user-window_c_item">
                <Link to="#" className="user-window_c_i_link">
                  <div className="user-window_c_i18n-account text-dimension">
                    Text
                  </div>
                </Link>
              </li>
              <li className="user-window_c_item">
                <Link to="#" className="user-window_c_i_link">
                  <div className="user-window_c_i18n-account text-dimension">
                    Text
                  </div>
                </Link>
              </li>
              <li className="user-window_c_item">
                <Link to="#" className="user-window_c_i_link">
                  <div className="user-window_c_i18n-account text-dimension">
                    Text
                  </div>
                </Link>
              </li>
              <li className="user-window_c_item">
                <Link to="#" className="user-window_c_i_link">
                  <div className="user-window_c_i18n-account text-dimension">
                    Text
                  </div>
                </Link>
              </li>
            </ul>
            <div className="user-window_c_signout-button-container">
              <div className="user-window_c_signout-button">
                <div className="user-window_c_signout-icon-cover">
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 16 16"
                    fill="rgb(149, 149, 149)"
                    className="user-window_c_signout-icon"
                  >
                    <path d="M9 4v-3h-9v14h9v-3h-1v2h-7v-12h7v2z" />
                    <path d="M16 8l-5-4v2h-5v4h5v2z" />
                  </svg>
                </div>
                <div className="user-window_c_i18n-signout text-dimension">
                  Sign Out
                </div>
              </div>
            </div>
          </nav>
        </Scrollbar>
      </div>
    );
  }
}

export default withRouter(UserWindow);
