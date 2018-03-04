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

    onSelectDropdownClick(selectedAPI, endpoint) {

        let requestPlaceholders = [];

        if (selectedAPI === 'Record Scan') {
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

        } else if (selectedAPI === 'Create Appointment') {
            requestPlaceholders = [{
                type: 'Deliver Import',
                inputs: ['Stage', 'Lane', 'Clerk Console', 'License Plate', 'Weight', 'RFID', 'Container', 'Chassis'],
                request: `<gate><record-scan><gate-id>USLAX</gate-id><stage-id>#Stage#</stage-id><lane-id>#Lane#</lane-id>
                    <external-console-id>#Clerk Console#</external-console-id><truck tag-id="#RFID#" license-nbr="#License Plate#"/>
                    <scale-weight unit="lb">#Weight#</scale-weight><equipment><container eqid="#Container#" on-chassis-id="#Chassis#" />
                    <chassis eqid="#Chassis#"></chassis></equipment></record-scan></gate>`
            },
            {
                type: 'Receive Export',
                inputs: ['Date', 'Time', 'Trucker SCAC', 'Booking', 'Line', 'Container', 'Seal', 'Chassis', 'Owner Chassis?'],
                request: `<gate><create-appointment><appointment-date>#Date#</appointment-date>
                <appointment-time>#Time#</appointment-time><gate-id>USLAX</gate-id><driver /><truck trucking-co-id="#Trucker SCAC#" />
                <booking booking-nbr="#Booking#" line="#Line#" /><tran-type>RE</tran-type>
                <container eqid="#Container#" seal-1="#Seal#" /><chassis eqid="#Chassis#" is-owners="#Owner Chassis?#" />
                </create-appointment></gate>`
            }];

        }

        this.props.onUpdateAPI(selectedAPI, endpoint, requestPlaceholders[0].request, requestPlaceholders, requestPlaceholders[0].inputs);        
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
                        <DropdownItem onClick={() => this.onSelectDropdownClick('Create Appointment', '/apex/services/argobasicservice')}>Gate: Create Appt</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            </div>
        );
    }
}