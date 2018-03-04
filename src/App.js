import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header/Header';
import { APITarget } from './components/APITarget/APITarget';
import { APIServices } from './components/APIServices/APIServices';
import { RequestPlaceholders } from './components/RequestPlaceholders/RequestPlaceholders';
import { Debug } from './components/Debug/Debug';
import { Actions } from './components/Actions/Actions';
import { N4RecordScan } from './util/N4RecordScan';
import { Responses } from './components/Responses/Responses';
//import beautify from 'xml-beautifier';

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
      requestOptions: [],
      responseAlerts: []
    };
    this.setEnvironment = this.setEnvironment.bind(this);
    this.setChangedAPI = this.setChangedAPI.bind(this);
    this.setInitialAPI = this.setInitialAPI.bind(this);
    this.toggleDebug = this.toggleDebug.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.interpolateRequest = this.interpolateRequest.bind(this);
    this.processResponse = this.processResponse.bind(this);
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

	processResponse(myResponseObject) {
		//Not used for now. The callback in sendRequest doesn't like the THIS below :( 
	  this.setState({
		responseAlerts: this.state.responseAlerts.push(myResponseObject)
	  });
	  console.log('Processing final response. '+ myResponseObject.success + ' ' + myResponseObject.text);
	}

	sendRequest() {
	  N4RecordScan.submit(this.interpolateRequest(), this.state.server, this.state.endpoint)
	   .then(response => {
		   console.log('About to call processResponse');
		   console.log(response);
			let tempArray = this.state.responseAlerts;
			tempArray.push(response);
			this.setState({
				responseAlerts: tempArray
			});
			console.log('ResponseAlerts array length: ' + this.state.responseAlerts.length);
	   })
	}

  interpolateRequest() {
    let requestToSend = this.state.apiRequest;

    for (var i = 0; i < this.state.apiPlaceholders.length; i++) {
      let inputField = 'placeholder' + i;
      console.log(inputField);

      let newValue = document.getElementById(inputField).value;
      //Do this 3 times to catch up to 3 replacements. i.e. Chassis which is in Record Scan twice
      requestToSend = requestToSend.replace('#' + this.state.apiPlaceholders[i] + '#', newValue);
      requestToSend = requestToSend.replace('#' + this.state.apiPlaceholders[i] + '#', newValue);
      requestToSend = requestToSend.replace('#' + this.state.apiPlaceholders[i] + '#', newValue);
      console.log('Replacing #' + this.state.apiPlaceholders[i] + '# with ' + newValue);

    }
    console.log(requestToSend);

    return requestToSend;
  }

  setInitialAPI(selection, endpoint, request, requestOptions, placeholders) {
    this.setState({
      selectedAPI: selection,
      endpoint: endpoint,
      apiRequest: request,
      requestOptions: requestOptions,
      apiPlaceholders: placeholders
    });
    document.querySelector('#RequestArea').style.display = 'block';
    document.querySelector('#SubmitButton').style.display = 'block';
  }

  setChangedAPI(newOptionIndex) {
    console.log(this.state.requestOptions);
    console.log(newOptionIndex);

    let newRequest = this.state.requestOptions[newOptionIndex].request;

    this.setState({
      apiRequest: newRequest,
      apiPlaceholders: this.state.requestOptions[newOptionIndex].inputs
    });
  }

  setEnvironment(selection, server) {
    this.setState({
      selectedEnvironment: selection,
      server: server
    });
    document.querySelector('#APIServices').style.display = 'block';
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
            <div id="APIServices" style={{ display: 'none' }}>
              <APIServices onUpdateAPI={this.setInitialAPI} /> <br />
            </div>
            <Actions onToggleDebug={this.toggleDebug} /> <br />
            <div id="Debug" style={{ display: 'none' }}>
              <Debug urlServer={this.state.server} urlEndpoint={this.state.endpoint} selectedEnvironment={this.state.selectedEnvironment} selectedAPI={this.state.selectedAPI} placeholders={this.state.apiPlaceholders} />
            </div>
          </div>
          <div className="three" id="RequestArea" style={{ display: 'none' }}>
            <RequestPlaceholders onResponse={this.processResponse} onSendRequest={this.sendRequest} onChangeAPI={this.setChangedAPI} requestOptions={this.state.requestOptions} urlServer={this.state.server} urlEndpoint={this.state.endpoint} selectedAPI={this.state.selectedAPI} apiPlaceholders={this.state.apiPlaceholders} /> <br />
            <Responses responses={this.state.responseAlerts} />
          </div>
        </div>
        <br /><br /><br />
      </div>
    );
  }
}

export default App;
