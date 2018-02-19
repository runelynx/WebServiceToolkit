import './Header.css';
import React from 'react';
import { Button } from 'reactstrap';

export class Header extends React.Component {

    render() {
        return (
            <div>
                <h1 className="maintitletext">
                    <i className="fas fa-cog fa-spin"></i>
                    {' '}Pier 400 Web Service Toolkit
                </h1>
            </div>
        );
    }
}