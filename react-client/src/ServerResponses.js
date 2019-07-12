import React from "react";
import Spinner from "./Spinner";
import "./styles.css";

export default class ServerResponses extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.props.clientMainCallback(true);
  }

  getNoDataMessage() {
    if (this.props.listOfResponses && this.props.listOfResponses.length <= 0) {
      return <Spinner message="No Data ! Wating for Server ..." />;
    }
  }

  render() {
    const divItems = this.props.listOfResponses.map((item, index) => (
      <li key={index + item.productId}>
        <ul>
          <li>Action Type : {item.actionType}</li>
          <li>Device Name : {item.deviceName}</li>
          <li>Manufacturer : {item.manufacturer}</li>
          <li>Product Id : {item.productId}</li>
          <li>Vendor Id : {item.vendorId}</li>
          <br />
        </ul>
      </li>
    ));

    return (
      <div>
        {this.getNoDataMessage()}
        <div className="scrollingLimit">
          <ul>{divItems}</ul>
        </div>
      </div>
    );
  }
}
