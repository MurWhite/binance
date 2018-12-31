import React, { Component } from "react";
import { connect } from "react-redux";
import { initListWs, closeListWs } from "../../store/home/actions";
import { wsStatus } from "../../store/network/ws";

class WsControl extends Component {
  toggleWs = () => {
    const { dispatch, ws } = this.props;
    if (ws.status === wsStatus.CONNECTED) {
      closeListWs(dispatch);
    } else {
      initListWs(dispatch);
    }
    this.setState({ hovering: false });
  };

  render() {
    const { ws } = this.props;
    return (
      <div>
        <span>click to toggle websocket</span>
        <button onClick={this.toggleWs}>{ws.status}</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { ws } = state.home;
  return { ws };
}

export default connect(mapStateToProps)(WsControl);
