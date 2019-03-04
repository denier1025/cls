import React, { Component } from "react";
import "./register.css";
import { Link } from "react-router-dom";

export default class Register extends Component {
  render() {
    return (
      <div className="register-container noselect">
        <div className="register-page">
          <div className="register-page_form">
            <label
              htmlFor="register-page_f_username-field"
              className="register-page_f_i18n-username"
            >
              Display Name
            </label>
            <div className="register-page_f_username-block">
              <input
                type="text"
                id="register-page_f_username-field"
                className="register-page_f_username-field"
                name="cls-username"
              />
              <div className="register-check-button register-page_f_i18n-username-check-button">
                check
              </div>
              <svg
                viewBox="0 0 44 44"
                width="24px"
                height="24px"
                className="register-page_f_username-check-icon"
              >
                <path
                  d="m22,0c-12.2,0-22,9.8-22,22s9.8,22 22,22 22-9.8 22-22-9.8-22-22-22zm12.7,15.1l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.6-0.1-0.7-0.3l-7.8-8.4-.2-.2c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.3 0.4,0.9 0,1.3z"
                  fill="rgb(52, 140, 255)"
                />
              </svg>
              <svg
                viewBox="0 0 44 44"
                width="24px"
                height="24px"
                className="register-page_f_username-cross-icon"
              >
                <path
                  d="m22,0c-12.2,0-22,9.8-22,22s9.8,22 22,22 22-9.8 22-22-9.8-22-22-22zm3.2,22.4l7.5,7.5c0.2,0.2 0.3,0.5 0.3,0.7s-0.1,0.5-0.3,0.7l-1.4,1.4c-0.2,0.2-0.5,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.5-7.5c-0.2-0.2-0.5-0.2-0.7,0l-7.5,7.5c-0.2,0.2-0.5,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l7.5-7.5c0.2-0.2 0.2-0.5 0-0.7l-7.5-7.5c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.2-0.2 0.5-0.3 0.7-0.3s0.5,0.1 0.7,0.3l7.5,7.5c0.2,0.2 0.5,0.2 0.7,0l7.5-7.5c0.2-0.2 0.5-0.3 0.7-0.3 0.3,0 0.5,0.1 0.7,0.3l1.4,1.4c0.2,0.2 0.3,0.5 0.3,0.7s-0.1,0.5-0.3,0.7l-7.5,7.5c-0.2,0.1-0.2,0.5 3.55271e-15,0.7z"
                  fill="rgb(163, 0, 0)"
                />
              </svg>
            </div>
            <div className="register-page_f_feedback-bar">
              <div className="register-page_f_fb_username" />
            </div>
            <label
              htmlFor="register-page_f_email-field"
              className="register-page_f_i18n-email"
            >
              Email (never shown)
            </label>
            <div className="register-page_f_email-block">
              <input
                type="email"
                id="register-page_f_email-field"
                className="register-page_f_email-field"
                name="cls-email"
              />
              <div className="register-check-button register-page_f_i18n-email-check-button">
                check
              </div>
              <svg
                viewBox="0 0 44 44"
                width="24px"
                height="24px"
                className="register-page_f_email-check-icon"
              >
                <path
                  d="m22,0c-12.2,0-22,9.8-22,22s9.8,22 22,22 22-9.8 22-22-9.8-22-22-22zm12.7,15.1l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.6-0.1-0.7-0.3l-7.8-8.4-.2-.2c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.3 0.4,0.9 0,1.3z"
                  fill="rgb(52, 140, 255)"
                />
              </svg>
              <svg
                viewBox="0 0 44 44"
                width="24px"
                height="24px"
                className="register-page_f_email-cross-icon"
              >
                <path
                  d="m22,0c-12.2,0-22,9.8-22,22s9.8,22 22,22 22-9.8 22-22-9.8-22-22-22zm3.2,22.4l7.5,7.5c0.2,0.2 0.3,0.5 0.3,0.7s-0.1,0.5-0.3,0.7l-1.4,1.4c-0.2,0.2-0.5,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.5-7.5c-0.2-0.2-0.5-0.2-0.7,0l-7.5,7.5c-0.2,0.2-0.5,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l7.5-7.5c0.2-0.2 0.2-0.5 0-0.7l-7.5-7.5c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.2-0.2 0.5-0.3 0.7-0.3s0.5,0.1 0.7,0.3l7.5,7.5c0.2,0.2 0.5,0.2 0.7,0l7.5-7.5c0.2-0.2 0.5-0.3 0.7-0.3 0.3,0 0.5,0.1 0.7,0.3l1.4,1.4c0.2,0.2 0.3,0.5 0.3,0.7s-0.1,0.5-0.3,0.7l-7.5,7.5c-0.2,0.1-0.2,0.5 3.55271e-15,0.7z"
                  fill="rgb(163, 0, 0)"
                />
              </svg>
            </div>
            <div className="register-page_f_feedback-bar">
              <div className="register-page_f_fb_email" />
            </div>
            <label
              htmlFor="register-page_f_password-field"
              className="register-page_f_i18n-password"
            >
              Password
            </label>
            <div className="register-page_f_password-block">
              <input
                type="password"
                id="register-page_f_password-field"
                className="register-page_f_password-field"
                name="cls-password"
              />
              <div className="register-page_f_eye-button">
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
                    style={{ stroke: "rgb(30, 30, 30)", strokeWidth: 40 }}
                  />
                </svg>
              </div>
            </div>
            <div className="register-page_f_feedback-bar">
              <div className="register-page_f_fb_password" />
            </div>
            <div className="register-page_f_submit-block">
              <div className="register-page_f_i18n-submit-signup-button">Sign Up</div>
            </div>
          </div>
          <div className="register-page_terms-privacy-cookie-policies">
            <span className="register-page_tpcp_i18n-first">
              By clicking "Sign Up", you acknowledge that you have read and
              understand{" "}
            </span>
            <Link to="/termsofservice" className="register-page_i18n-terms-of-service">terms of service</Link>
            <span className="register-page_tpcp_i18n-second">, </span>
            <Link to="/privacypolicy" className="register-page_i18n-privacy-policy">privacy policy</Link>
            <span className="register-page_tpcp_i18n-third"> and </span>
            <Link to="/cookiepolicy" className="register-page_i18n-cookie-policy">cookie policy</Link>
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
