import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Button } from "@buffetjs/core";
import moment from "moment";
import { LoadingIndicator, PopUpWarning } from "strapi-helper-plugin";

class HistoryTable extends Component {
  state = {
    showDeleteModal: false,
    showUndoModal: false,
    importToDelete: null,
    importToUndo: null
  };

  deleteImport = id => {
    this.setState({ showDeleteModal: true, importToDelete: id });
  };

  undoImport = id => {
    this.setState({ showUndoModal: true, importToUndo: id });
  };

  CustomRow = ({ row }) => {
    const { id, contentType, importedCount, ongoing, updated_at } = row;
    const updatedAt = moment(updated_at);
    let source;
    switch (row.source) {
      case "upload":
        source = row.options.filename;
        break;
      case "url":
        source = row.options.url;
        break;
      default:
        source = "unknown";
    }
    return (
      <tr style={{ paddingTop: 18 }}>
        <td>{source}</td>
        <td>{contentType}</td>
        <td>{updatedAt.format("LLL")}</td>
        <td>{importedCount}</td>
        <td>{ongoing ? <LoadingIndicator /> : <span>Ready</span>} </td>
        <td>
          <div className={"row"}>
            <div
              style={{
                marginRight: 18,
                marginLeft: 18
              }}
              onClick={() => this.undoImport(id)}
            >
              <i className={"fa fa-undo"} role={"button"} />
            </div>
            <div onClick={() => this.deleteImport(id)}>
              <i className={"fa fa-trash"} role={"button"} />
            </div>
          </div>
        </td>
      </tr>
    );
  };

  render() {
    const { configs } = this.props;
    const props = {
      title: "Import History",
      subtitle: "Manage the Initiated Imports"
    };
    const headers = [
      { name: "Source", value: "source" },
      { name: "Content Type", value: "contentType" },
      { name: "Updated At", value: "updatedAt" },
      { name: "Items", value: "items" },
      { name: "Progress State", value: "progress" },
      { name: "Actions", value: "actions" }
    ];
    const items = [...configs];
    const {
      importToDelete,
      importToUndo,
      showDeleteModal,
      showUndoModal
    } = this.state;
    return (
      <div className={"col-md-12"} style={{ paddingTop: 12 }}>
        <PopUpWarning
          isOpen={showDeleteModal}
          toggleModal={() => this.setState({ showDeleteModal: null })}
          content={{
            title: `Please confirm`,
            message: `Are you sure you want to delete this entry?`
          }}
          popUpWarningType="danger"
          onConfirm={async () => {
            importToDelete && (await this.props.deleteImport(importToDelete));
          }}
        />
        <PopUpWarning
          isOpen={showUndoModal}
          toggleModal={() => this.setState({ showUndoModal: null })}
          content={{
            title: `Please confirm`,
            message: `Are you sure you want to undo this entry?`
          }}
          popUpWarningType="danger"
          onConfirm={async () => {
            importToUndo && (await this.props.undoImport(importToUndo));
          }}
        />
        <Table
          {...props}
          headers={headers}
          rows={items}
          customRow={this.CustomRow}
        />
      </div>
    );
  }
}

HistoryTable.propTypes = {
  configs: PropTypes.array.isRequired,
  deleteImport: PropTypes.func,
  undoImport: PropTypes.func
};

export default HistoryTable;
