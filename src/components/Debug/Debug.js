import './Debug.css';
import React from 'react';
import { Badge } from 'reactstrap';

export class Debug extends React.Component {

    render() {
        return (
            <div>
                <h2 className="subtitle">
                    Debug Info
                </h2>
                <p>
                    <Badge color="info">
                        Target Env
                    </Badge>
                    {' ' + this.props.selectedEnvironment}
                    <br />
                    <Badge color="info">
                        Target API
                    </Badge>
                    {' ' + this.props.selectedAPI}
                </p>
            </div>
        );
    }
}