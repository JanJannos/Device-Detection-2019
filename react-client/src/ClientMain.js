import React from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import "./ClientMain.css";
import ConnectServer from "./ConnectServer";
import ServerResponses from "./ServerResponses";

class ClientMain extends React.Component {
  constructor(props) {
    super(props);
    this.renderConnectServer = this.renderConnectServer.bind(this);
    this.backReconnect = this.backReconnect.bind(this);
    this.state = {
      connectionEstablished: false,
      serverSentResponse: false,
      serverResponsesList: [],
      ioClient: null
    };
  }

  componentDidMount() {}

  /**
   *  Render Server Connection conditionally
   *  Only if the the connection has not been established
   */
  renderConnectServer() {
    const { connectionEstablished } = this.state;
    if (!connectionEstablished) {
      return <ConnectServer clientMainCallback={this.connectServerCallback} />;
    }
  }

  backReconnect() {
    this.setState({ connectionEstablished: false, serverSentResponse: false });
    const { ioClient } = this.state;
    const { serverResponsesList } = this.state;
    this.setState({ serverResponsesList: [] });
    try {
      ioClient.disconnect();
    } catch (error) {
      alert(error.message);
    }
  }

  /**
   * Render Server responses screen after connection has been established
   */
  renderServerResponses() {
    const { connectionEstablished } = this.state;
    if (connectionEstablished) {
      const { serverResponsesList } = this.state;
      return (
        <div>
          <h1>Server Responses</h1>
          <ServerResponses
            listOfResponses={serverResponsesList}
            clientMainCallback={this.handleServerResponsesCallback}
          />
        </div>
      );
    }
  }

  /**
   * Render the exit button , used when we're already logged in an we want to
   * get out to the main screen
   */
  renderExitButton() {
    const { connectionEstablished } = this.state;
    if (connectionEstablished) {
      return (
        <div>
          <ButtonToolbar>
            <Button
              variant="outline-dark"
              className="exitBtn"
              onClick={this.backReconnect}
            >
              Exit
            </Button>
          </ButtonToolbar>
          ;
        </div>
      );
    }
  }

  handleServerResponsesCallback(todo) {
    // TODO : in the future when we'd need to add more logic
  }

  /**
   * Example Address = "http://localhost"
   * Example Port = 8000
   */
  connectServerCallback = dataFromChild => {
    const info = JSON.parse(dataFromChild);
    if (info.ip && info.port) {
      // Connect with the address & Port given from the user
      this.setState({ connectionEstablished: true });
      const io = require("socket.io-client"),
        address = `${info.ip}:${info.port}`,
        ioClient = io.connect(address);

      // keep IO client in state
      this.setState({ ioClient: ioClient });
      console.log(`Connected to address ${address}`);

      ioClient.on("actiondetails", msg => {
        const { serverResponsesList } = this.state;
        var parsed = JSON.parse(msg);
        var response = new Object();
        response.id = serverResponsesList.length;
        response.actionType = parsed.actionType;
        response.vendorId = parsed.vendorId;
        response.productId = parsed.productId;
        response.deviceName = parsed.deviceName;
        response.manufacturer = parsed.manufacturer;
        const newServerResponsesList = [response, ...serverResponsesList];
        // serverResponsesList.push(response);
        this.setState({ serverResponsesList: newServerResponsesList });
      });
    }
  };

  render() {
    return (
      <div className={`season-display centering Summer`}>
        {this.renderExitButton()}
        {this.renderConnectServer()}
        {this.renderServerResponses()}
      </div>
    );
  }
}

export default ClientMain;
