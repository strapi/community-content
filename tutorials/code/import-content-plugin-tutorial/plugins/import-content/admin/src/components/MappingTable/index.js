import React, { Component } from "react";
import PropTypes from "prop-types";
import MappingOptions from "./MappingOptions";
import TargetFieldSelect from "./TargetFieldSelect";
import _ from "lodash";
import { Table } from "@buffetjs/core";
import {
  Bool as BoolIcon,
  Json as JsonIcon,
  Text as TextIcon,
  NumberIcon,
  Email as EmailIcon,
  Calendar as DateIcon,
  RichText as XmlIcon
} from "@buffetjs/icons";

class MappingTable extends Component {

  state = { mapping: {} };

  CustomRow = ({ row }) => {

    const { fieldName, count, format, minLength, maxLength, meanLength } = row;

    return (
      <tr style={{ paddingTop: 18 }}>
        <td>{fieldName}</td>
        <td>
          <p>{count}</p>
        </td>
        <td>
          {format === "string" && <TextIcon fill="#fdd835" />}
          {format === "number" && <NumberIcon fill="#fdd835" />}
          {format === "boolean" && <BoolIcon fill="#fdd835" />}
          {format === "object" && <JsonIcon fill="#fdd835" />}
          {format === "email" && <EmailIcon fill="#fdd835" />}
          {format === "date" && <DateIcon fill="#fdd835" />}
          {format === "xml" && <XmlIcon fill="#fdd835" />}
          <p>{format}</p>
        </td>
        <td>
          <span>{minLength}</span>
        </td>
        <td>
          <p>{maxLength}</p>
        </td>
        <td>
          <p>{meanLength}</p>
        </td>
        <td>
          <MappingOptions
            targetModel={this.props.targetModel}
            stat={row}
            onChange={this.changeMappingOptions(row)}
          />
        </td>
        <td>
          {this.props.targetModel && (
            <TargetFieldSelect
              targetModel={this.props.targetModel}
              onChange={targetField => this.setMapping(fieldName, targetField)}
            />
          )}
        </td>
      </tr>
    );
  };
  changeMappingOptions = stat => options => {
    let newState = _.cloneDeep(this.state);
    for (let key in options) {
      _.set(newState, `mapping[${stat.fieldName}][${key}]`, options[key]);
    }
    this.setState(newState, () => this.props.onChange(this.state.mapping));
  };

  setMapping = (source, targetField) => {
    const state = _.set(
      this.state,
      `mapping[${source}]['targetField']`,
      targetField
    );
    this.setState(state, () => this.props.onChange(this.state.mapping));
    console.log(this.state.mapping);
  };

  render() {
    const { analysis } = this.props;
    const props = {
      title: "Field Mapping",
      subtitle:
        "Configure the Relationship between CSV Fields and Content type Fields"
    };
    const headers = [
      { name: "Field", value: "fieldName" },
      { name: "Count", value: "count" },
      { name: "Format", value: "format" },
      { name: "Min Length", value: "minLength" },
      { name: "Max Length", value: "maxLength" },
      { name: "Mean Length", value: "meanLength" },
      { name: "Options", value: "options" },
      { name: "Destination", value: "destination" }
    ];
    const items = [...analysis.fieldStats];
    return (
      <Table
        {...props}
        headers={headers}
        rows={items}
        customRow={this.CustomRow}
      />
    );
  }
}

MappingTable.propTypes = {
  analysis: PropTypes.object.isRequired,
  targetModel: PropTypes.object,
  onChange: PropTypes.func
};

export default MappingTable;
