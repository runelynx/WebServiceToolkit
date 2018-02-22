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

    onSelectDropdownClick(selection, endpoint) {
        this.props.onUpdateAPI(selection, endpoint);
        console.log("Debug99");

        let requestPlaceholders = [];

        if (selection === 'Record Scan') {
            requestPlaceholders = [{
                type: 'Container',
                inputs: ['Stage', 'Lane', 'Clerk Console', 'License Plate', 'Weight', 'RFID', 'Container', 'Chassis'],
                request: `<gate><record-scan><gate-id>USLAX</gate-id><stage-id>#Stage#</stage-id><lane-id>#Lane#</lane-id>
                    <external-console-id>#Clerk Console#</external-console-id><truck tag-id="#RFID#" license-nbr="#License Plate#"/>
                    <scale-weight unit="lb">#Weight#</scale-weight><equipment><container eqid="#Container#" on-chassis-id="#Chassis#" />
                    <chassis eqid="#Chassis#"></chassis></equipment></record-scan></gate>`
            },
            {
                type: 'Bare Chassis',
                inputs: ['Stage', 'Lane', 'Clerk Console', 'License Plate', 'Weight', 'RFID', 'Chassis'],
                request: `<gate><record-scan><gate-id>USLAX</gate-id><stage-id>#Stage#</stage-id><lane-id>#Lane#</lane-id>
                    <external-console-id>#Clerk Console#</external-console-id><truck tag-id="#RFID#" license-nbr="#License Plate#"/>
                    <scale-weight unit="lb">#Weight#</scale-weight><equipment><chassis eqid="#Chassis#"></chassis></equipment>
                    </record-scan></gate>`
            },
            {
                type: 'Bobtail',
                inputs: ['Stage', 'Lane', 'Clerk Console', 'License Plate', 'Weight', 'RFID'],
                request: `<gate><record-scan><gate-id>USLAX</gate-id><stage-id>#Stage#</stage-id><lane-id>#Lane#</lane-id>
                    <external-console-id>#Clerk Console#</external-console-id><truck tag-id="#RFID#" license-nbr="#License Plate#"/>
                    <scale-weight unit="lb">#Weight#</scale-weight></record-scan></gate>`
            }];

        }
        
        console.log(requestPlaceholders);
        this.props.onUpdateRequestOptions(requestPlaceholders);
        this.props.onUpdatePlaceholders(requestPlaceholders[0].inputs);
        this.props.onUpdateRequest(requestPlaceholders[0].request);
        
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
                    Select an API
                </h2>

                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle outline caret>
                        Select a Service
                        </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>N4 Basic Services</DropdownItem>
                        <DropdownItem onClick={() => this.onSelectDropdownClick('Record Scan', '/apex/services/argobasicservice')}>Gate: Record Scan</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            </div>
        );
    }
}