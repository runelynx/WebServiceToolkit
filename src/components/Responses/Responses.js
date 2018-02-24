import React from 'react';
import { UncontrolledAlert } from 'reactstrap';

export class Responses extends React.Component {

    render() {
        return (
        <UncontrolledAlert color="info">
                   <h4 className="alert-heading">Well done!</h4>
        <p>
          Aww yeah, you successfully read this important alert message. This example text is going
          to run a bit longer so that you can see how spacing within an alert works with this kind
          of content.
        </p>
        </UncontrolledAlert>    
        );
    }
}