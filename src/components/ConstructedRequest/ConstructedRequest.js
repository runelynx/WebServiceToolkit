import './ConstructedRequest.css';
import React from 'react';
import { Alert } from 'reactstrap';
import beautify from 'xml-beautifier';

export class ConstructedRequest extends React.Component {

    render() {
        return (
            <div>
                <h2 className="subtitle">
                    Constructed {this.props.selectedAPI} Request
                </h2>
                <Alert color="warning" id="ConstructedRequest">
                    {beautify(this.props.apiRequest)}
                </Alert>
            </div>
        );
    }
}