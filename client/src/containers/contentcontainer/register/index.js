import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./register.css";
import $ from "jquery";
import classnames from "classnames";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: {
        name: ""
      },
      email: "",
      password: "",
      success: {
        username: ""
      },
      errors: {
        username: "",
        email: "",
        password: ""
      }
    };
  }

  onInputChange = e => {
    if (e.target.name === "username") {
      this.setState({
        username: {
          name: e.target.value
        }
      });
    } else if (e.target.name === "email") {
      this.setState({
        email: e.target.value
      });
    } else if (e.target.name === "password") {
      this.setState({
        password: e.target.value
      });
    }
  };

  onInputFocus = e => {
    this.setState({
      success: {
        ...this.state.success,
        [e.target.name]: ""
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: ""
      }
    });
  };

  onInputBlur = e => {
    // TODO: validation
    this.setState(this.state); // TODO: will be deleted
  };

  onUCheck = () => {
    const userData = {
      username: {
        name: this.state.username.name
      }
    };

    axios
      .post("/api/register/ucheck", userData)
      .then(res =>
        this.setState({
          success: {
            ...this.state.success,
            username: res.data.username
          }
        })
      )
      .catch(err =>
        this.setState({
          errors: {
            ...this.state.errors,
            username: err.response.data.username
          }
        })
      );
  };

  onTogglePasswordVisability = () => {
    if ($(".register-page_f_eye-button").attr("datatoggle") === "false") {
      $(".register-page_f_password-field").attr("type", "text");
      $(".register-page_f_closed-eye-icon").addClass("display_none");
      $(".register-page_f_opened-eye-icon").addClass("display_block");
      $(".register-page_f_eye-button").attr("datatoggle", "true");
    } else {
      $(".register-page_f_password-field").attr("type", "password");
      $(".register-page_f_closed-eye-icon").removeClass("display_none");
      $(".register-page_f_opened-eye-icon").removeClass("display_block");
      $(".register-page_f_eye-button").attr("datatoggle", "false");
    }
  };

  onSignup = () => {
    const userData = {
      username: {
        name: this.state.username.name
      },
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/api/register", userData
      )
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        this.setState({ errors: err.response.data })
      });
  };

  componentDidUpdate() {
    const { username, email, password } = this.state.errors;
    if (username || email || password) {
      $("#signup-button").attr("disabled", "");
    } else {
      $("#signup-button").removeAttr("disabled");
    }
    if (username || this.state.success.username) {
      $(".register-page_f_i18n-username-check-button").attr("disabled", "");
    } else {
      $(".register-page_f_i18n-username-check-button").removeAttr("disabled");
    }
  }

  render() {
    return (
      <div className="register-container noselect">
      <div className="processBar" />
        <div className="register-page">
          <div className="register-page_form">
            <label
              htmlFor="register-page_f_username"
              className={classnames("register-page_f_i18n-username", {
                color_white: $(".register-page_f_username-field").is(":focus")
              })}
            >
              Username (display name)
            </label>
            <div
              className={classnames("register-page_f_username", {
                "border-bottom_white": $(".register-page_f_username-field").is(
                  ":focus"
                ),
                "border-bottom_rgb16300": this.state.errors.username,
                "border-bottom_rgb52140255": this.state.success.username
              })}
            >
              <input
                type="text"
                autoComplete="off"
                id="register-page_f_username"
                className="register-page_f_username-field"
                name="username"
                value={this.state.username.name}
                onChange={this.onInputChange}
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
              />
              <button
                className="register-check-button register-page_f_i18n-username-check-button"
                onClick={this.onUCheck}
              >
                check
              </button>
            </div>
            <div className="register-page_f_feedback-bar">
              <div
                className={classnames("register-page_f_fb_username", {
                  color_rgb16300: this.state.errors.username,
                  color_rgb52140255: this.state.success.username
                })}
              >
                {this.state.errors.username}
                {this.state.success.username}
              </div>
            </div>
            <label
              htmlFor="register-page_f_email"
              className={classnames("register-page_f_i18n-email", {
                color_white: $(".register-page_f_email-field").is(":focus")
              })}
            >
              Email (will never show)
            </label>
            <div
              className={classnames("register-page_f_email", {
                "border-bottom_rgb16300": this.state.errors.email,
                "border-bottom_white": $(".register-page_f_email-field").is(
                  ":focus"
                )
              })}
            >
              <input
                type="text"
                autoComplete="off"
                id="register-page_f_email"
                className="register-page_f_email-field"
                name="email"
                value={this.state.email}
                onChange={this.onInputChange}
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
              />
            </div>
            <div className="register-page_f_feedback-bar">
              <div
                className={classnames("register-page_f_fb_email", {
                  color_rgb16300: this.state.errors.email
                })}
              >
                {this.state.errors.email}
              </div>
            </div>
            <label
              htmlFor="register-page_f_password"
              className={classnames("register-page_f_i18n-password", {
                color_white: $(".register-page_f_password-field").is(":focus")
              })}
            >
              Password
            </label>
            <div
              className={classnames("register-page_f_password", {
                "border-bottom_rgb16300": this.state.errors.password,
                "border-bottom_white": $(".register-page_f_password-field").is(
                  ":focus"
                )
              })}
            >
              <input
                type="password"
                autoComplete="off"
                id="register-page_f_password"
                className="register-page_f_password-field"
                name="password"
                value={this.state.password}
                onChange={this.onInputChange}
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
              />
              <div
                className="register-page_f_eye-button"
                onClick={this.onTogglePasswordVisability}
                datatoggle="false"
              >
                <svg
                  className="register-page_f_opened-eye-icon"
                  width="32px"
                  height="32px"
                  viewBox="0 0 493.763 493.763"
                  fill="rgb(149, 149, 149)"
                >
                  <path d="M219.267,235.448c-15.23,15.23-15.23,39.924,0,55.155c15.229,15.229,39.924,15.229,55.155,0    c15.229-15.23,15.229-39.925,0-55.155C259.191,220.218,234.496,220.217,219.267,235.448z M273.361,261.964    c-3.163,3.163-11.426,0.028-18.455-7.001c-7.03-7.028-10.163-15.292-7.001-18.455c3.163-3.163,11.426-0.028,18.455,7.001    C273.39,250.539,276.524,258.801,273.361,261.964z" />
                  <path d="M493.618,280.299c-2.499-3.59-4.943-7.217-7.416-10.825c-11.234-16.395-24.361-31.432-38.634-45.25    c-18.247-17.668-38.232-33.562-59.815-46.977c-21.725-13.503-44.939-24.555-69.36-32.229    c-20.185-6.343-41.121-10.143-62.259-11.08c-19.646-0.87-39.361,1.082-58.568,5.226c-25.07,5.41-49.316,14.792-71.924,26.844    c-22.479,11.984-43.529,26.554-62.86,43.136c-9.581,8.219-18.742,16.945-27.403,26.127c-8.199,8.692-16.095,17.792-23.099,27.482    c-2.513,3.477-4.929,7.017-7.358,10.551c-1.583,2.305-3.196,4.588-4.749,6.911c-0.308,0.46-0.209,0.493,0.341,0.936    c1.125,0.904,2.251,1.811,3.376,2.716c4.019,3.231,7.868,6.657,11.876,9.902c10.058,8.143,20.533,15.773,31.28,22.979    c21.353,14.315,43.874,26.92,67.405,37.287c4.774,2.104,9.615,4.03,14.447,5.994c-10.817-6.859-21.424-13.953-31.621-21.716    c-10.308-7.848-20.254-16.162-29.828-24.89c-11.343-10.34-22.193-21.244-32.37-32.735c19.287-12.559,38.938-24.542,59.188-35.491    c19.651-10.624,39.85-20.042,60.676-28.12c4.186-1.624,8.418-3.162,12.689-4.611c-9.357,14.609-14.787,31.962-14.787,50.561    c0,51.832,42.168,94,94,94c51.833,0,94-42.168,94-94c0-18.5-5.375-35.767-14.641-50.327c5.421,1.832,10.797,3.792,16.121,5.865    c24.207,9.427,47.465,21.143,70.049,33.943c15.688,8.894,31.021,18.39,46.147,28.207c-17.028,19.229-35.871,36.935-56.022,52.855    c-12.084,9.547-24.713,18.213-37.709,26.459c11.85-4.81,23.533-9.886,34.938-15.685c11.521-5.855,22.777-12.227,33.75-19.054    c17.941-11.164,35.457-23.409,51.418-37.288c1.821-1.584,3.69-3.093,5.572-4.606c0.949-0.766,1.9-1.529,2.85-2.294    C493.79,280.724,493.88,280.675,493.618,280.299z M246.844,327.026c-35.29,0-64-28.71-64-64c0-35.291,28.71-64,64-64    c35.291,0,64,28.71,64,64C310.845,298.316,282.135,327.026,246.844,327.026z" />
                </svg>
                <svg
                  className="register-page_f_closed-eye-icon"
                  width="32px"
                  height="32px"
                  viewBox="0 0 493.763 493.763"
                  fill="rgb(149, 149, 149)"
                >
                  <path d="M493.618,280.299c-2.499-3.59-4.943-7.217-7.416-10.825c-11.234-16.395-24.361-31.432-38.634-45.25    c-18.247-17.668-38.232-33.562-59.815-46.977c-21.725-13.503-44.939-24.555-69.36-32.229    c-20.185-6.343-41.121-10.143-62.259-11.08c-19.646-0.87-39.361,1.082-58.568,5.226c-25.07,5.41-49.316,14.792-71.924,26.844    c-22.479,11.984-43.529,26.554-62.86,43.136c-9.581,8.219-18.742,16.945-27.403,26.127c-8.199,8.692-16.095,17.792-23.099,27.482    c-2.513,3.477-4.929,7.017-7.358,10.551c-1.583,2.305-3.196,4.588-4.749,6.911c-0.308,0.46-0.209,0.493,0.341,0.936    c1.125,0.904,2.251,1.811,3.376,2.716c4.019,3.231,7.868,6.657,11.876,9.902c10.058,8.143,20.533,15.773,31.28,22.979    c21.353,14.315,43.874,26.92,67.405,37.287c4.774,2.104,9.615,4.03,14.447,5.994c-10.817-6.859-21.424-13.953-31.621-21.716    c-10.308-7.848-20.254-16.162-29.828-24.89c-11.343-10.34-22.193-21.244-32.37-32.735c19.287-12.559,38.938-24.542,59.188-35.491    c19.651-10.624,39.85-20.042,60.676-28.12c4.186-1.624,8.418-3.162,12.689-4.611c-9.357,14.609-14.787,31.962-14.787,50.561    c0,51.832,42.168,94,94,94c51.833,0,94-42.168,94-94c0-18.5-5.375-35.767-14.641-50.327c5.421,1.832,10.797,3.792,16.121,5.865    c24.207,9.427,47.465,21.143,70.049,33.943c15.688,8.894,31.021,18.39,46.147,28.207c-17.028,19.229-35.871,36.935-56.022,52.855    c-12.084,9.547-24.713,18.213-37.709,26.459c11.85-4.81,23.533-9.886,34.938-15.685c11.521-5.855,22.777-12.227,33.75-19.054    c17.941-11.164,35.457-23.409,51.418-37.288c1.821-1.584,3.69-3.093,5.572-4.606c0.949-0.766,1.9-1.529,2.85-2.294    C493.79,280.724,493.88,280.675,493.618,280.299z M246.844,327.026c-35.29,0-64-28.71-64-64c0-35.291,28.71-64,64-64    c35.291,0,64,28.71,64,64C310.845,298.316,282.135,327.026,246.844,327.026z" />
                  <line
                    x1="100"
                    y1="400"
                    x2="340"
                    y2="110"
                    style={{ stroke: "rgb(0, 110, 255)", strokeWidth: 54 }}
                  />
                  <line
                    x1="160"
                    y1="400"
                    x2="400"
                    y2="110"
                    style={{ stroke: "rgb(25, 25, 25)", strokeWidth: 40 }}
                  />
                </svg>
              </div>
            </div>
            <div className="register-page_f_feedback-bar">
              <div
                className={classnames("register-page_f_fb_password", {
                  color_rgb16300: this.state.errors.password
                })}
              >
                {this.state.errors.password}
              </div>
            </div>
            <div className="register-page_f_submit-block">
              <button
                onClick={this.onSignup}
                className="register-page_f_i18n-submit-signup-button"
                id="signup-button"
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="register-page_terms-privacy-cookie-policies">
            <span className="register-page_tpcp_i18n-first">
              By clicking "Sign Up", you acknowledge that you have read and
              understand{" "}
            </span>
            <Link
              to="/termsofservice"
              className="register-page_i18n-terms-of-service"
            >
              terms of service
            </Link>
            <span className="register-page_tpcp_i18n-second">, </span>
            <Link
              to="/privacypolicy"
              className="register-page_i18n-privacy-policy"
            >
              privacy policy
            </Link>
            <span className="register-page_tpcp_i18n-third"> and </span>
            <Link
              to="/cookiepolicy"
              className="register-page_i18n-cookie-policy"
            >
              cookie policy
            </Link>
            <span className="register-page_tpcp_i18n-fourth">
              , and that your continued use of the website is subject to these
              policies.
            </span>
          </div>
          <div className="register-page_f_to-signin-block">
            <span className="register-page_f_tsb_i18n-ahaa">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="register-page_f_tsb_i18n-signin-button"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
