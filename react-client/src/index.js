import React from "react";
import ReactDOM from "react-dom";
import ClientMain from "./ClientMain";
import Spinner from "./Spinner";

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <ClientMain lat={this.state.lat} />;
    }

    return <Spinner message="Loading ... Please approve your location" />;
  }

  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
