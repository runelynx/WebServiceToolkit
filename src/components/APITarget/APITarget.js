import './APITarget.css';
import React from 'react';
import { ButtonGroup, Button, Tooltip } from 'reactstrap';

export class APITarget extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.onSelectBtnClick = this.onSelectBtnClick.bind(this);
        this.state = {
          tooltipOpen: false,
          selected: ''
        };
      }

      onSelectBtnClick(selection, server) {
        this.props.onUpdateEnvironment(selection, server);
        this.setState({
            selected: selection
        });
        
      }
    
      toggle() {
        this.setState({
          tooltipOpen: !this.state.tooltipOpen
        });
      }

    render() {
        return (
            <div>
                <h2 className="subtitle">
                    Choose an Environment
                </h2>
                <ButtonGroup>
                    <Button onClick={() => this.onSelectBtnClick('Dev', 'http://SCRB4APUSLSA901:9080')} outline active={this.state.selected === "Dev"}color="danger" >N4Dev</Button>{' '}
                    <Button onClick={() => this.onSelectBtnClick('Test', 'http://SCRB4APUSLSA801:9080')} outline active={this.state.selected === "Test"} color="warning" >N4Test</Button>{' '}
                    <Button onClick={() => this.onSelectBtnClick('UAT', 'http://SCRB4APUSLSA701:10080')} outline active={this.state.selected === "UAT"} color="primary" >N4UAT</Button>{' '}
                    <Button onClick={() => this.onSelectBtnClick('Prod', 'http://SCRB4APUSLSA001:10080')} outline active={this.state.selected === "Prod"} color="success" id='N4ProdButton'>
                       N4Prod
                    </Button>
                </ButtonGroup>

                    <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="N4ProdButton" toggle={this.toggle}>
                         Sending API calls to Production is restricted
                    </Tooltip>
            </div>
        );
    }
}