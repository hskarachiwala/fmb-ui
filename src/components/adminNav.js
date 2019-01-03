import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import AddDish from './addDish';
import ViewAll from './viewAll';
import SetMenu from './setMenu';

export default class AdminNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: 'add'
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.renderChoice = this.renderChoice.bind(this);
    }

    handleSelect(selectedKey) {
        this.setState({
            active: selectedKey
        });
    }

    renderChoice() {
        switch(this.state.active) {
            case "add":
                return <AddDish />

            case "view":
                return <ViewAll />

            case "set":
                return <SetMenu />

            default:
                return <ViewAll />
        }
    }

    render() {
        return(
            <div>
                <Nav bsStyle="tabs" activeKey={this.state.active} onSelect={this.handleSelect}>
                    <NavItem eventKey="add">
                        {'Add Dish'}
                    </NavItem>
                    <NavItem eventKey="view">
                        {'View All'}
                    </NavItem>
                    <NavItem eventKey="set">
                        {'Set Menu'}
                    </NavItem>
                </Nav>
                {this.renderChoice()}
            </div>
        )
    }
}