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

      onSelectBtnClick(selection) {
        this.props.onUpdateEnvironment(selection);
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
                    N4 Environments
                </h2>
                <ButtonGroup>
                    <Button onClick={() => this.onSelectBtnClick('Dev')} outline active={this.state.selected === "Dev"}color="danger" >Dev</Button>{' '}
                    <Button onClick={() => this.onSelectBtnClick('Test')} outline active={this.state.selected === "Test"} color="warning" >Test</Button>{' '}
                    <Button onClick={() => this.onSelectBtnClick('UAT')} outline active={this.state.selected === "UAT"} color="primary" >UAT</Button>{' '}
                    <Button onClick={() => this.onSelectBtnClick('Prod')} outline active={this.state.selected === "Prod"} color="success" id='N4ProdButton'>
                       Prod
                    </Button>
                </ButtonGroup>

                    <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="N4ProdButton" toggle={this.toggle}>
                         Sending API calls to Production is restricted
                    </Tooltip>
            </div>
        );
    }
}