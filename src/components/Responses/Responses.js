import React from 'react';
import { Alert } from 'reactstrap';

export class Responses extends React.Component {
	
    constructor(props) {
        super(props);
        this.renderResponses = this.renderResponses.bind(this);
    }
	
	renderResponses() {
		let alertArray = []
		
		if(this.props.responses.length > 0) {
			for(var t=this.props.responses.length-1; t >= 0 ; t--) {
				let headerText = (this.props.responses[t].success ? 'Success' : 'Failure');
				let color = '';
				// Only show color on the alert for the latest one. All others are gray. 
				if (t === this.props.responses.length-1) {
						color = (this.props.responses[t].success ? "success" : "danger");
				} else {
					color = "secondary";
				}

				alertArray.push(
					        <Alert color={color}>
									   <h4 className="alert-heading"><i className="fas fa-angle-double-right"></i>{ ' ' + headerText}</h4>
									   <p>{this.props.responses[t].text}</p>
							</Alert> 
				);
			}
			
		}
		return alertArray;
		
	}

    render() {
        return (
		<div>
			{this.renderResponses()}
			</div>
        );
    }
}