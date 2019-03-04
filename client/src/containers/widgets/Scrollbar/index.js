import React from "react";
import OverlayScrollbars from "overlayscrollbars";
import "overlayscrollbars/css/OverlayScrollbars.css";

export default class OverlayScrollbarsReactComponent extends React.Component {
  constructor(props) {
    super(props);
    this.osTargetRef = React.createRef();
  }

  componentDidMount() {
    this.osInstance = OverlayScrollbars(this.osTargetRef.current, this.props.options || {}, this.props.extensions);
  }

  componentWillUnmount() {
    if (this.osInstance && this.osInstance.destroy) this.osInstance.destroy();
  }

  render() {
    return (
      <div {...this.props} ref={this.osTargetRef}>
        {this.props.children}
      </div>
    );
  }
}