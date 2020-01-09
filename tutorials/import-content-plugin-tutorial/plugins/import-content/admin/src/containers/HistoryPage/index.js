/* * * HistoryPage * */
import React, { Component } from "react";
import {
  HeaderNav,
  LoadingIndicator,
  PluginHeader,
  request
} from "strapi-helper-plugin";
import pluginId from "../../pluginId";
import Row from "../../components/Row";
import Block from "../../components/Block";
import HistoryTable from "../../components/HistoryTable";

const getUrl = to =>
  to ? `/plugins/${pluginId}/${to}` : `/plugins/${pluginId}`;

class HistoryPage extends Component {

  state = {
    loading: true,
    importConfigs: []
  };

  deleteImport = async id => {
    this.setState({ loading: true }, async () => {
      try {
        await request(`/import-content/${id}`, { method: "DELETE" });

        this.setState(prevState => ({
          ...prevState,
          importConfigs: prevState.importConfigs.filter(imp => imp.id !== id),
          loading: false
        }));

        strapi.notification.success(`Deleted`);
      } catch (e) {
        this.setState({ loading: false }, () => {
          strapi.notification.error(`${e}`);
          strapi.notification.error(`Delete Failed`);
        });
      }
    });
  };

  undoImport = async id => {
    this.setState({ loading: true }, async () => {
      await request(`/import-content/${id}/undo`, { method: "POST" });
      this.setState({ loading: false }, () => {
        strapi.notification.info(`Undo Started`);
      });
    });
  };

  componentDidMount() {
    this.getConfigs().then(res => {
      this.setState({ importConfigs: res, loading: false });
    });
    setTimeout(() => {
      this.fetchInterval = setInterval(() => this.importConfigs(), 4000);
    }, 200);
  };

  componentWillUnmount() {
    if (this.fetchInterval) {
      clearInterval(this.fetchInterval);
    }
  };

  importConfigs() {
    if (!this.state.loading) {
      this.getConfigs().then(res => {
        this.setState({ importConfigs: res });
      });
    }
  };

  getConfigs = async () => {
    try {
      const response = await request("/import-content", { method: "GET" });
      return response;
    } catch (e) {
      strapi.notification.error(`${e}`);
      return [];
    }
  };

  render() {
    return (
      <div className={"container-fluid"} style={{ padding: "18px 30px" }}>
        <PluginHeader
          title={"Import Content"}
          description={"Import CSV and RSS-Feed into your Content Types"}
        />
        <HeaderNav
          links={[
            {
              name: "Import Data",
              to: getUrl("")
            },
            {
              name: "Import History",
              to: getUrl("history")
            }
          ]}
          style={{ marginTop: "4.4rem" }}
        />
        <div className="row">
          <Block
            title="General"
            description="Manage the Initiated Imports"
            style={{ marginBottom: 12 }}
          >
            {this.state.loading && <LoadingIndicator />}{" "}
            {!this.state.loading && this.state.importConfigs && (
              <Row className={"row"}>
                <HistoryTable
                  undoImport={this.undoImport}
                  deleteImport={this.deleteImport}
                  configs={this.state.importConfigs}
                />
              </Row>
            )}
          </Block>
        </div>
      </div>
    );
  }
}

export default HistoryPage;