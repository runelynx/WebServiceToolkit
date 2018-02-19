import './APIServices.css';
import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export class APIServices extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onSelectDropdownClick = this.onSelectDropdownClick.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    onSelectDropdownClick(selection) {
        this.props.onUpdateAPI(selection);
        console.log("Debug99");

        let placeholders = [];

        if (selection === 'Record Scan') {
            placeholders = ['Stage', 'Lane', 'Clerk Console', 'License Plate', 'Container', 'Chassis'];
        }
        console.log(placeholders);
        this.props.onUpdatePlaceholders(placeholders);
        
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <div>
                <h2 className="subtitle">
                    API Services
                </h2>

                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle outline caret>
                        Select a Service
                        </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>N4 Basic Services</DropdownItem>
                        <DropdownItem onClick={() => this.onSelectDropdownClick('Record Scan')}>Gate: Record Scan</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            </div>
        );
    }
}