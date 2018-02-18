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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEnvironment: null,
      selectedAPI: null
    };
    this.setEnvironment = this.setEnvironment.bind(this);
    this.setAPI = this.setAPI.bind(this);
  }

  setAPI(selection) {
    this.setState({
      selectedAPI: selection
    });
    document.querySelector('#RequestArea').style.display = 'block';
  }

  setEnvironment(selection) {
    this.setState({
      selectedEnvironment: selection
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
            <div id="APIServices" style={{display:'none'}}>
              <APIServices onUpdateAPI={this.setAPI} /> <br />
            </div>
            <Debug selectedEnvironment={this.state.selectedEnvironment} selectedAPI={this.state.selectedAPI}/>
          </div>
          <div className="three" id="RequestArea" style={{display:'none'}}>
            <RequestPlaceholders selectedAPI={this.state.selectedAPI}/> <br />
            <ConstructedRequest selectedAPI={this.state.selectedAPI}/>
          </div>
        </div>
        <br /><br /><br />
        <Button color="primary">primary</Button>{' '}
        <Button color="secondary">secondary</Button>{' '}
        <Button color="success">success</Button>{' '}
        <Button color="info">info</Button>{' '}
        <Button color="warning">warning</Button>{' '}
        <Button color="danger">danger</Button>{' '}
        <Button color="link">link</Button>
      </div>
    );
  }
}

export default App;
