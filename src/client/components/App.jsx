import React from 'react';
import PropTypes, { element } from 'prop-types';
import { formMetaData } from './tableMetaData';
import { Button } from 'react-bootstrap';

import '../styles/App.scss';
import ReactJsonDynamicForms from 'react-json-dynamic-forms'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { elements: [], metaData: {} };
    fetch(`/api/schema/files`, {
      crossDomain: true,
    })
      .then(response => response.json())
      .then(data => {
        const meta = formMetaData(data[0]);
        console.log(meta);
        this.setState({ elements: meta.fields, metaData: meta.metaData });
      });
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this)

  }
  onChange(elements) {
    console.log(elements)
    this.setState({ elements: elements })
  }
  async onSave() {
  let body = {}
  _.each(this.state.elements, element => {
    body[element.id] = element.value;
  });
  const rawResponse = await fetch('/api/files/insert', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  const content = await rawResponse.json();
  console.log(content);
}
render() {
  return (<div className='container'>
    <ReactJsonDynamicForms
      elements={this.state.elements}
      onChange={this.onChange}
      metaData={this.state.metaData}
      className='reactform'
      customComponents={{}}
    />
    <Button className="save" onClick={()=>this.onSave()}>
      Save
      </Button>
  </div>)
}
}

App.propTypes = {
  number: PropTypes.number,
  add: PropTypes.func,
  sub: PropTypes.func,
  change: PropTypes.func,
};
