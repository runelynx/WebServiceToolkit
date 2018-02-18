import './ConstructedRequest.css';
import React from 'react';
import { Input } from 'reactstrap';

export class ConstructedRequest extends React.Component {

    render() {
        return (
            <div>
                <h2 className="subtitle">
                    Constructed {this.props.selectedAPI} Request
                </h2>
                <Input type="textarea" rows="10" name="text" id="exampleText"/>
            </div>
        );
    }
}