import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Label, Select, Button, Textarea} from '@buffetjs/core'
import Row from "../Row";

class RawInputForm extends Component {
  dataFormats = [{label: 'csv', value: 'text/csv'}];

  state = {
    rawText: '',
    dataFormat: 'text/csv'
  };

  textChanged = async rawText => {
    this.setState({rawText});
  };

  changeDataFormat = dataFormat => {
    this.setState({dataFormat});
  };

  analyze = () => {
    const { dataFormat, rawText } = this.state;
    this.props.onRequestAnalysis({
      source: "raw",
      type: this.state.dataFormat,
      options: { rawText }
    });
  };

  render() {
    return (
      <div className={'col-12'}>
        <Row className={'row'}>
          <Label
            message={'Data Format'}
            htmlFor={'dataFormats'}
          />
          <Select
            name={'dataFormats'}
            options={this.dataFormats}
            value={this.state.dataFormat}
            onChange={({target: {value}}) => this.changeDataFormat(value)}
          />
        </Row>
        <Row className={'row'}>
          <Textarea
            name={'rawTextarea'}
            className={'col-12'}
            textStyle={{
              fontFamily: 'monospace'
            }}
            value={this.state.rawText}
            onChange={({target: {value}}) => {
              this.textChanged(value)
            }}
          />
        </Row>
        <Row className={'row'}>
          <Button
            label={'Analyze'}
            onClick={() => this.analyze()}
          />
        </Row>
      </div>
    )
  }
}

RawInputForm.propTypes = {
  onRequestAnalysis: PropTypes.func.isRequired,
  loadingAnalysis: PropTypes.bool.isRequired
};

export default RawInputForm