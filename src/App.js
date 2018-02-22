import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap';
import { Header } from './components/Header/Header';
import { APITarget } from './components/APITarget/APITarget';
import { APIServices } from './components/APIServices/APIServices';
import { RequestPlaceholders } from './components/RequestPlaceholders/RequestPlaceholders';
import { ConstructedRequest } from './components/ConstructedRequest/ConstructedRequest';
import { Debug } from './components/Debug/Debug';
import { Actions } from './components/Actions/Actions';
import { N4RecordScan } from './util/N4RecordScan';
import beautify from 'xml-beautifier';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEnvironment: null,
      selectedAPI: null,
      apiPlaceholders: [],
      showDebug: false,
      apiRequest: '',
      server: '',
      endpoint: '',
      requestOptions: []
    };
    this.setEnvironment = this.setEnvironment.bind(this);
    this.setAPI = this.setAPI.bind(this);
    this.setAPIRequest = this.setAPIRequest.bind(this);
    this.setPlaceholders = this.setPlaceholders.bind(this);
    this.toggleDebug = this.toggleDebug.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.interpolateRequest = this.interpolateRequest.bind(this);
    this.setRequestOptions = this.setRequestOptions.bind(this);
  }

  toggleDebug() {
    if (!this.state.showDebug) {
      document.querySelector('#Debug').style.display = 'block';
    } else {
      document.querySelector('#Debug').style.display = 'none';
    }

    this.setState({
      showDebug: !this.state.showDebug
    });
  }

  sendRequest() {
    N4RecordScan.submit(this.interpolateRequest(), this.state.server, this.state.endpoint);
  }

  interpolateRequest() {
    let requestToSend = this.state.apiRequest;

    for (var i=0; i < this.state.apiPlaceholders.length; i++) {
      let inputField = 'placeholder' + i;
      console.log(inputField);
      
      let newValue = document.getElementById(inputField).value;
      //Do this 3 times to catch up to 3 replacements. i.e. Chassis which is in Record Scan twice
      requestToSend = requestToSend.replace('#'+ this.state.apiPlaceholders[i] +'#', newValue);
      requestToSend = requestToSend.replace('#'+ this.state.apiPlaceholders[i] +'#', newValue);
      requestToSend = requestToSend.replace('#'+ this.state.apiPlaceholders[i] +'#', newValue);
      console.log('Replacing ' + '#'+ this.state.apiPlaceholders[i] +'#' + ' with ' +  newValue);
      
    }
    console.log(requestToSend);
    
    return requestToSend;
  }

  setRequestOptions(requestOptions){
    this.setState({
      requestOptions: requestOptions
    });
  }

  setAPIRequest(request) {
    this.setState({
      apiRequest: request
    });
    
    //document.getElementById('ConstructedRequest').value = beautify(request);
  }

  setAPI(selection, endpoint) {
    this.setState({
      selectedAPI: selection,
      endpoint: endpoint
    });
    document.querySelector('#RequestArea').style.display = 'block';
    document.querySelector('#SubmitButton').style.display = 'block';
  }

  setEnvironment(selection, server) {
    this.setState({
      selectedEnvironment: selection,
      server: server
    });
    document.querySelector('#APIServices').style.display = 'block';
  }

  setPlaceholders(placeholders) {
    this.setState({
      apiPlaceholders: placeholders
    });
  }

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <div className="one">
            <Header />
          </div>
          <div className="two">
            <APITarget onUpdateEnvironment={this.setEnvironment} /> <br />
            <div id="APIServices" style={{display:'none'}}>
              <APIServices onUpdateRequestOptions={this.setRequestOptions} onUpdateAPI={this.setAPI} onUpdatePlaceholders={this.setPlaceholders} onUpdateRequest={this.setAPIRequest}/> <br />
            </div>
            <Actions onToggleDebug={this.toggleDebug}/> <br />
            <div id="Debug" style={{display:'none'}}>
              <Debug urlServer={this.state.server} urlEndpoint={this.state.endpoint} selectedEnvironment={this.state.selectedEnvironment} selectedAPI={this.state.selectedAPI} placeholders={this.state.apiPlaceholders}/>
            </div>
          </div>
          <div className="three" id="RequestArea" style={{display:'none'}}>
            <RequestPlaceholders onSendRequest={this.sendRequest} requestOptions={this.state.requestOptions} urlServer={this.state.server} urlEndpoint={this.state.endpoint} selectedAPI={this.state.selectedAPI} apiPlaceholders={this.state.apiPlaceholders}/> <br />
          </div>
        </div>
        <br /><br /><br />
      </div>
    );
  }
}

export default App;
