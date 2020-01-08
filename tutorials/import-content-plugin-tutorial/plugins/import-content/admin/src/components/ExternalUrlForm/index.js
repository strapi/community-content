import React, { Component } from "react";
import PropTypes from "prop-types";
import Row from "../Row";
import { Label, InputText } from "@buffetjs/core";
import { LoadingIndicator } from "strapi-helper-plugin";

class ExternalUrlForm extends Component {
  state = {
    url: ""
  };

  preAnalyzeImportFile = async url => {
    this.setState({ url }, () => {
      this.props.onRequestAnalysis({ source: "url", options: { url } });
    });
  };

  render() {
    const { url } = this.state;
    const { loadingAnalysis } = this.props;
    return (
      <Row>
        <Label message={"Import URL"} htmlFor={"urlInput"} />
        <InputText
          name={"urlInput"}
          placeholder={"https://www.nasa.gov/rss/dyn/educationnews.rss"}
          type={"url"}
          value={url}
          onChange={({ target: { value } }) => {
            this.preAnalyzeImportFile(value);
          }}
        />
        <Row>{loadingAnalysis && <LoadingIndicator />}</Row>
      </Row>
    );
  }
}

ExternalUrlForm.propTypes = {
  onRequestAnalysis: PropTypes.func.isRequired,
  loadingAnalysis: PropTypes.bool.isRequired
};

export default ExternalUrlForm;
