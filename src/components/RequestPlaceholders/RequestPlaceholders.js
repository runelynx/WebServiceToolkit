import './RequestPlaceholders.css';
import React from 'react';
import { Container, Row, Col, InputGroup, Input, InputGroupAddon } from 'reactstrap';

export class RequestPlaceholders extends React.Component {
    constructor(props) {
        super(props);
        this.renderPlaceholders = this.renderPlaceholders.bind(this);
    }

    renderPlaceholders() {
        console.log("Debug28");

        let requestPlaceholders = [];

        for (var i = 0; i < this.props.apiPlaceholders.length; i += 2) {
            let j = i+1;

            if (i + 1 !== this.props.apiPlaceholders.length) {
                requestPlaceholders.push(
                    <Row key={i}>
                        <Col xs="6">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">{this.props.apiPlaceholders[i]}</InputGroupAddon>
                                <Input id={'placeholder' + i}/>
                            </InputGroup>
                        </Col>
                        <Col xs="6">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">{this.props.apiPlaceholders[j]}</InputGroupAddon>
                                <Input id={'placeholder' + j}/>
                            </InputGroup>
                        </Col>
                    </Row>
                );
            } else {
                //Handle the last entry for arrays with odd number of entries
                requestPlaceholders.push(
                <Row>
                    <Col xs="6">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">{this.props.apiPlaceholders[i]}</InputGroupAddon>
                            <Input id={'placeholder' + i}/>
                        </InputGroup>
                    </Col>
                    <Col />
                </Row>
                );
            }
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
                    {this.renderPlaceholders()}
                </Container>
            </div>
        );
    }
}