import React from 'react';
import { ButtonGroup, Button, Tooltip } from 'reactstrap';

export class Actions extends React.Component {
    constructor(props) {
        super(props);

        this.onToggleBtnClick = this.onToggleBtnClick.bind(this);
        this.state = {
            tooltipOpen: false
        };
    }

    onToggleBtnClick() {
        this.props.onToggleDebug();
    }

    render() {
        return (
            <div>
                <Button onClick={() => this.onToggleBtnClick()} id="DebugButton" size="sm" color="info" outline>Debug</Button>{' '}
            </div>
        );
    }
}