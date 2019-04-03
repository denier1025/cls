import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./account.css";

export default class Account extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="account noselect">
        <nav className="account-nav">
          <ul className="account-nav_items">
            <li className="account-nav_item">
              <Link to="/privatedata">
                <div className="account-nav_i_lock-icon-cover">
                  <svg
                    className="account-nav_i_lic_lock-icon"
                    viewBox="0 0 299.995 299.995"
                    height="24px"
                    width="24px"
                    fill="rgb(149, 149, 149)"
                  >
                    <path
                      d="M149.997,161.485c-8.613,0-15.598,6.982-15.598,15.598c0,5.776,3.149,10.807,7.817,13.505v17.341h15.562v-17.341
				c4.668-2.697,7.817-7.729,7.817-13.505C165.595,168.467,158.611,161.485,149.997,161.485z"
                    />
                    <path
                      d="M150.003,85.849c-13.111,0-23.775,10.665-23.775,23.775v25.319h47.548v-25.319
				C173.775,96.516,163.111,85.849,150.003,85.849z"
                    />
                    <path
                      d="M149.995,0.001C67.156,0.001,0,67.159,0,149.998c0,82.837,67.156,149.997,149.995,149.997s150-67.161,150-149.997
				C299.995,67.159,232.834,0.001,149.995,0.001z M196.085,227.118h-92.173c-9.734,0-17.626-7.892-17.626-17.629v-56.919
				c0-8.491,6.007-15.582,14.003-17.25v-25.697c0-27.409,22.3-49.711,49.711-49.711c27.409,0,49.709,22.3,49.709,49.711v25.697
				c7.993,1.673,14,8.759,14,17.25v56.919h0.002C213.711,219.225,205.819,227.118,196.085,227.118z"
                    />
                  </svg>
                </div>
                <div className="account-nav_i_i18n-private-data text-dimension">
                  Private Data
                </div>
              </Link>
            </li>
            <li className="account-nav_item">
              <Link to="/security">
                <div className="account-nav_i_security-icon-cover">
                  <svg
                    viewBox="0 0 300 300"
                    height="24px"
                    width="24px"
                    fill="rgb(149, 149, 149)"
                    className="account-nav_i_sic_security-icon"
                  >
                    <path d="M150,225.105c39.749,0,58.545-40.546,67.35-75.105H150V225.105z" />
                    <path d="M82.681,149.992H150v-74.43l-74.527,31.717C76.179,115.404,78.057,131.876,82.681,149.992z" />
                    <path
                      d="M149.997,0C67.158,0,0.003,67.161,0.003,149.997S67.158,300,149.997,300s150-67.163,150-150.003S232.837,0,149.997,0z
                            M240.454,102.62c-0.236,5.636-6.774,138.046-90.454,138.046c-83.682,0-90.22-132.408-90.456-138.046l-0.226-5.379l90.68-38.593
                           l90.685,38.593L240.454,102.62z"
                    />
                  </svg>
                </div>
                <div className="account-nav_i_i18n-security text-dimension">
                  Security
                </div>
              </Link>
            </li>
            <li className="account-nav_item">
              <Link to="/entriesactions">
                <div className="account-nav_i_loupe-icon-cover">
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 310.42 310.42"
                    fill="rgb(149, 149, 149)"
                    className="account-nav_i_lic_loupe-icon"
                  >
                    <path
                      d="M273.587,214.965c49.11-49.111,49.109-129.021,0-178.132c-49.111-49.111-129.021-49.111-178.131,0
                         C53.792,78.497,47.482,140.462,76.51,188.85c0,0,2.085,3.496-0.731,6.312c-16.064,16.064-64.262,64.263-64.262,64.263
                         c-12.791,12.79-15.837,30.675-4.494,42.02l1.953,1.951c11.344,11.345,29.23,8.301,42.02-4.49c0,0,48.096-48.097,64.129-64.128
                         c2.95-2.951,6.447-0.866,6.447-0.866C169.958,262.938,231.923,256.629,273.587,214.965z M118.712,191.71
                         c-36.288-36.288-36.287-95.332,0-131.62c36.288-36.287,95.332-36.288,131.619,0c36.288,36.287,36.288,95.332,0,131.62
                         C214.043,227.997,154.999,227.997,118.712,191.71z"
                    />
                    <path
                      d="M184.908,82.43c-38.02,0-68.841,37.92-68.841,44.115c0,6.012,30.82,44.114,68.841,44.114
                           c38.02,0,68.841-37.93,68.841-44.114C253.749,120.371,222.929,82.43,184.908,82.43z M184.908,157.941
                           c-17.341,0-31.397-14.058-31.397-31.397s14.057-31.397,31.397-31.397c17.34,0,31.396,14.057,31.396,31.397
                           S202.248,157.941,184.908,157.941z"
                    />
                    <circle cx="184.908" cy="126.545" r="15.994" />
                  </svg>
                </div>
                <div className="account-nav_i_i18n-entries-actions text-dimension">
                  Entries &amp; Actions
                </div>
              </Link>
            </li>
            <li className="account-nav_item">
              <Link to="/activity">
                <div className="account-nav_i_post-comment-icon-cover">
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 511.626 511.626"
                    fill="rgb(149, 149, 149)"
                    className="account-nav_i_pcic_post-comment-icon"
                  >
                    <path
                      d="M301.927,327.605c30.926-13.038,55.34-30.785,73.23-53.248c17.888-22.458,26.833-46.915,26.833-73.372
                         c0-26.458-8.945-50.917-26.84-73.376c-17.888-22.459-42.298-40.208-73.228-53.249c-30.93-13.039-64.571-19.556-100.928-19.556
                         c-36.354,0-69.995,6.521-100.927,19.556c-30.929,13.04-55.34,30.789-73.229,53.249C8.947,150.072,0,174.527,0,200.986
                         c0,22.648,6.767,43.975,20.28,63.96c13.512,19.981,32.071,36.829,55.671,50.531c-1.902,4.572-3.853,8.754-5.852,12.566
                         c-2,3.806-4.377,7.467-7.139,10.991c-2.76,3.525-4.899,6.283-6.423,8.275c-1.523,1.998-3.997,4.812-7.425,8.422
                         c-3.427,3.617-5.617,5.996-6.567,7.135c0-0.191-0.381,0.24-1.143,1.287c-0.763,1.047-1.191,1.52-1.285,1.431
                         c-0.096-0.103-0.477,0.373-1.143,1.42c-0.666,1.048-1,1.571-1,1.571l-0.715,1.423c-0.282,0.575-0.476,1.137-0.57,1.712
                         c-0.096,0.567-0.144,1.19-0.144,1.854s0.094,1.28,0.288,1.854c0.381,2.471,1.475,4.466,3.283,5.996
                         c1.807,1.52,3.756,2.279,5.852,2.279h0.857c9.515-1.332,17.701-2.854,24.552-4.569c29.312-7.61,55.771-19.797,79.372-36.545
                         c17.129,3.046,33.879,4.568,50.247,4.568C237.353,347.16,270.998,340.645,301.927,327.605z"
                    />
                    <path
                      d="M491.354,338.166c13.518-19.889,20.272-41.247,20.272-64.09c0-23.414-7.146-45.316-21.416-65.68
                         c-14.277-20.362-33.694-37.305-58.245-50.819c4.374,14.274,6.563,28.739,6.563,43.398c0,25.503-6.368,49.676-19.129,72.519
                         c-12.752,22.836-31.025,43.01-54.816,60.524c-22.08,15.988-47.205,28.261-75.377,36.829
                         c-28.164,8.562-57.573,12.848-88.218,12.848c-5.708,0-14.084-0.377-25.122-1.137c38.256,25.119,83.177,37.685,134.756,37.685
                         c16.371,0,33.119-1.526,50.251-4.571c23.6,16.755,50.06,28.931,79.37,36.549c6.852,1.718,15.037,3.237,24.554,4.568
                         c2.283,0.191,4.381-0.476,6.283-1.999c1.903-1.522,3.142-3.61,3.71-6.272c-0.089-1.143,0-1.77,0.287-1.861
                         c0.281-0.09,0.233-0.712-0.144-1.852c-0.376-1.144-0.568-1.715-0.568-1.715l-0.712-1.424c-0.198-0.376-0.52-0.903-0.999-1.567
                         c-0.476-0.66-0.855-1.143-1.143-1.427c-0.28-0.284-0.705-0.763-1.28-1.424c-0.568-0.66-0.951-1.092-1.143-1.283
                         c-0.951-1.143-3.139-3.521-6.564-7.139c-3.429-3.613-5.899-6.42-7.422-8.418c-1.523-1.999-3.665-4.757-6.424-8.282
                         c-2.758-3.518-5.14-7.183-7.139-10.991c-1.998-3.806-3.949-7.995-5.852-12.56C459.289,374.859,477.843,358.062,491.354,338.166z"
                    />
                  </svg>
                </div>
                <div className="account-nav_i_i18n-activity text-dimension">
                  Activity
                </div>
              </Link>
            </li>
            <li className="account-nav_item">
              <Link to="/messages">
                <div className="account-nav_i_letters-icon-cover">
                  <svg
                    height="24px"
                    width="24px"
                    viewBox="0 -88 448 448"
                    fill="rgb(149, 149, 149)"
                    className="account-nav_i_lic_letters-icon"
                  >
                    <path d="m133.96875 80h180.0625l61.335938-32h-302.734376zm0 0" />
                    <path d="m362.039062 32 61.335938-32h-302.75l61.335938 32zm0 0" />
                    <path d="m448 176v-170.800781l-51.367188 26.800781h11.488282c.792968.015625 1.578125.144531 2.335937.390625.152344.050781.285157.113281.429688.167969.144531.058594.371093.175781.554687.265625.183594.085937.480469.175781.710938.3125.230468.136719.296875.246093.457031.359375.160156.113281.414063.320312.613281.496094.082032.070312.175782.128906.257813.199218.078125.074219.144531.113282.207031.175782.246094.277343.472656.566406.679688.871093.144531.195313.296874.371094.425781.578125.128906.207032.269531.511719.398437.800782.128906.285156.167969.40625.25.621093.117188.261719.21875.527344.300782.800781v.074219.359375c.136718.5.21875 1.011719.257812 1.527344v136zm0 0" />
                    <path d="m400 224v-170.800781l-51.367188 26.800781h11.480469c.800781.015625 1.597657.152344 2.359375.398438.144532.050781.28125.113281.414063.167968.136719.058594.359375.167969.546875.257813.246094.089843.484375.199219.71875.320312.167968.09375.296875.246094.457031.359375.160156.113282.414063.320313.613281.496094.082032.070312.175782.128906.257813.199219.078125.074219.144531.113281.207031.175781.246094.277344.472656.566406.679688.871094.144531.195312.296874.371094.425781.578125.128906.207031.269531.511719.398437.800781.128906.285156.167969.40625.25.621094.117188.261718.21875.53125.300782.800781v.074219.359375c.132812.496093.21875 1.007812.257812 1.519531v136zm0 0" />
                    <path d="m96 32h51.367188l-51.367188-26.800781zm0 0" />
                    <path d="m352 232v-130.800781l-113.695312 59.320312 113.695312 101.601563zm0 0" />
                    <path d="m223.144531 168.433594-43.441406 22.664062c-2.320313 1.203125-5.085937 1.203125-7.40625 0l-43.441406-22.664062-115.894531 103.566406h326.078124zm0 0" />
                    <path d="m176 174.976562 151.367188-78.976562h-302.734376zm0 0" />
                    <path d="m0 262.121094 113.695312-101.601563-113.695312-59.320312zm0 0" />
                    <path d="m48 80h51.367188l-51.367188-26.800781zm0 0" />
                  </svg>
                </div>
                <div className="account-nav_i_i18n-messages text-dimension">
                  Messages
                </div>
              </Link>
            </li>
            <li className="account-nav_item">
              <Link to="/notifications">
                <div className="account-nav_i_notify-icon-cover">
                  <svg
                    viewBox="0 0 24 24"
                    height="24px"
                    width="24px"
                    fill="rgb(149, 149, 149)"
                    className="account-nav_i_nic_notify-icon"
                  >
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                  </svg>
                </div>
                <div className="account-nav_i_i18n-notifications text-dimension">
                  Notifications
                </div>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="account-body">
          <div className="public-data">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
            aspernatur iure. Incidunt, commodi consequatur tenetur natus veniam
            impedit doloribus maxime dolorem laudantium itaque molestiae vel
            rerum quaerat deserunt sint dicta! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Maxime, aspernatur iure. Incidunt,
            commodi consequatur tenetur natus veniam impedit doloribus maxime
            dolorem laudantium itaque molestiae vel rerum quaerat deserunt sint
            dicta! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Maxime, aspernatur iure. Incidunt, commodi consequatur tenetur natus
            veniam impedit doloribus maxime dolorem laudantium itaque molestiae
            vel rerum quaerat deserunt sint dicta! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Maxime, aspernatur iure. Incidunt,
            commodi consequatur tenetur natus veniam impedit doloribus maxime
            dolorem laudantium itaque molestiae vel rerum quaerat deserunt sint
            dicta! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Maxime, aspernatur iure. Incidunt, commodi consequatur tenetur natus
            veniam impedit doloribus maxime dolorem laudantium itaque molestiae
            vel rerum quaerat deserunt sint dicta! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Maxime, aspernatur iure. Incidunt,
            commodi consequatur tenetur natus veniam impedit doloribus maxime
            dolorem laudantium itaque molestiae vel rerum quaerat deserunt sint
            dicta! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Maxime, aspernatur iure. Incidunt, commodi consequatur tenetur natus
            veniam impedit doloribus maxime dolorem laudantium itaque molestiae
            vel rerum quaerat deserunt sint dicta! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Maxime, aspernatur iure. Incidunt,
            commodi consequatur tenetur natus veniam impedit doloribus maxime
            dolorem laudantium itaque molestiae vel rerum quaerat deserunt sint
            dicta! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Maxime, aspernatur iure. Incidunt, commodi consequatur tenetur natus
            veniam impedit doloribus maxime dolorem laudantium itaque molestiae
            vel rerum quaerat deserunt sint dicta!
          </div>
        </div>
      </div>
    );
  }
}
