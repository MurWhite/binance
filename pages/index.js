import React from "react";
import { connect } from "react-redux";
import { serverFetchList } from "../store/home/actions";
import List from "../components/home/list";
import WsControl from "../components/home/ws-control";
import { initListWs, closeListWs } from "../store/home/actions";

class Index extends React.Component {
  static async getInitialProps({ reduxStore, req }) {
    const isServer = !!req;
    reduxStore.dispatch(await serverFetchList(isServer));
    return {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    initListWs(dispatch);
  }

  componentWillUnmount() {
    closeListWs();
  }

  render() {
    return (
      <div>
        <WsControl />
        <List />
      </div>
    );
  }
}

export default connect()(Index);
