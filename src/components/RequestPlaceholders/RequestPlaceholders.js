import './RequestPlaceholders.css';
import React from 'react';
import { Container, Row, Col, InputGroup, Input, InputGroupAddon, Button, ButtonGroup } from 'reactstrap';

export class RequestPlaceholders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            apiOptionSelected: 0
        };
        this.renderPlaceholders = this.renderPlaceholders.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    onRadioBtnClick(selection) {
        this.setState({
            apiOptionSelected: selection
        });
        this.props.onChangeAPI(selection);

    }

    renderPlaceholders() {

        let requestPlaceholders = [];

        //start with the options buttons for this request... if there are options!
        if(this.props.requestOptions.length > 1) {

            let requestOptionButtonArray = []
            //Construct the radio buttons to select the options
            for(let w = 0; w < this.props.requestOptions.length; w++) {
                requestOptionButtonArray.push(
                    <Button key={w} id={'radio' + w} color="info" onClick={() => this.onRadioBtnClick(w)} outline active={this.state.apiOptionSelected === w}>
                        {this.props.requestOptions[w].type}
                    </Button>
                );
            }

            requestPlaceholders.push(
                <Row key='A'>
                    <Col className='headerOptions'>
                        <ButtonGroup>
                        {requestOptionButtonArray}
                        </ButtonGroup>
                        <br />
                    </Col>
                </Row>
            );
        }


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

    onSubmitBtnClick() {
        this.props.onSendRequest();
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
                <br />
                <Button onClick={() => this.onSubmitBtnClick()} id="SubmitButton" style={{display:'none'}} color="success" size="sm" block>Submit</Button>
            </div>
        );
    }
}