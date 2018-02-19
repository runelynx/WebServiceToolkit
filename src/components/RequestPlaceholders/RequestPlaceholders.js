import './RequestPlaceholders.css';
import React from 'react';
import { Container, Row, Col, InputGroup, Input, InputGroupAddon } from 'reactstrap';

export class RequestPlaceholders extends React.Component {

    render() {
        return (
            <div>
                <h2 className="subtitle">
                    {this.props.selectedAPI} Placeholders
                </h2>

                <Container>
                    <Row>
                        <Col xs="6">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Stage</InputGroupAddon>
                            <Input />
                        </InputGroup>
                        </Col>
                        <Col xs="6">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Lane</InputGroupAddon>
                            <Input />
                        </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Clerk Console</InputGroupAddon>
                            <Input />
                        </InputGroup>
                        </Col>
                        <Col xs="6">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">License Plate</InputGroupAddon>
                            <Input />
                        </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Container</InputGroupAddon>
                            <Input />
                        </InputGroup>
                        </Col>
                        <Col xs="6">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">Chassis</InputGroupAddon>
                            <Input />
                        </InputGroup>
                        </Col>
                    </Row>
                </Container>

            </div>
        );
    }
}