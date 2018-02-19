import React from 'react';
import { ButtonGroup, Button, Tooltip } from 'reactstrap';

export class Actions extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmitBtnClick = this.onSubmitBtnClick.bind(this);
        this.state = {
            tooltipOpen: false
        };
    }

    onSubmitBtnClick() {
        //this.props.onUpdateEnvironment(selection);
        //this.setState({
        //    selected: selection
        //});

    }

    render() {
        return (
            <div>
                <h2 className="subtitle">
                    Actions
                </h2>

                <Button onClick={() => this.onSubmitBtnClick()} id="SubmitButton" style={{display:'none'}} color="success" >Submit</Button>{' '}
            </div>
        );
    }
}