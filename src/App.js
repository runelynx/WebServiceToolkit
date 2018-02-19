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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEnvironment: null,
      selectedAPI: null,
      apiPlaceholders: [],
      showDebug: false
    };
    this.setEnvironment = this.setEnvironment.bind(this);
    this.setAPI = this.setAPI.bind(this);
    this.setPlaceholders = this.setPlaceholders.bind(this);
    this.toggleDebug = this.toggleDebug.bind(this);
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

  setAPI(selection) {
    this.setState({
      selectedAPI: selection
    });
    document.querySelector('#RequestArea').style.display = 'block';
    document.querySelector('#SubmitButton').style.display = 'block';
  }

  setEnvironment(selection) {
    this.setState({
      selectedEnvironment: selection
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
              <APIServices onUpdateAPI={this.setAPI} onUpdatePlaceholders={this.setPlaceholders}/> <br />
            </div>
            <Actions onToggleDebug={this.toggleDebug}/> <br />
            <div id="Debug" style={{display:'none'}}>
              <Debug selectedEnvironment={this.state.selectedEnvironment} selectedAPI={this.state.selectedAPI} placeholders={this.state.apiPlaceholders}/>
            </div>
          </div>
          <div className="three" id="RequestArea" style={{display:'none'}}>
            <RequestPlaceholders selectedAPI={this.state.selectedAPI} apiPlaceholders={this.state.apiPlaceholders}/> <br />
            <ConstructedRequest selectedAPI={this.state.selectedAPI}/>
          </div>
        </div>
        <br /><br /><br />
      </div>
    );
  }
}

export default App;
