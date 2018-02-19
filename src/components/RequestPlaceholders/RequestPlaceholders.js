import './RequestPlaceholders.css';
import React from 'react';
import { Container, Row, Col, InputGroup, Input, InputGroupAddon } from 'reactstrap';

export class RequestPlaceholders extends React.Component {
    constructor(props) {
        super(props);
        this.renderPlaceholders = this.renderPlaceholders.bind(this);
    }

    renderPlaceholders() {

        let requestPlaceholders = [];
        let counter = 1;

        for (var i = 0; i < this.props.apiPlaceholders.length; i+2) {

            requestPlaceholders.push(
                <Row>
                    <Col xs="6">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">{this.props.apiPlaceholders[i]}</InputGroupAddon>
                        <Input />
                    </InputGroup>
                    </Col>
                    <Col xs="6">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">{this.props.apiPlaceholders[i+1]}</InputGroupAddon>
                        <Input />
                    </InputGroup>
                    </Col>
                </Row>
            );
        }
        return requestPlaceholders;

    }

    render() {
        return (
            <div>
                <h2 className="subtitle">
                    {this.props.selectedAPI} Placeholders
                </h2>
                <Container>
                    {this.renderPlaceholders}
                </Container>
            </div>
        );
    }
}