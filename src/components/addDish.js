import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import axios from 'axios';

export default class AddDish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            sauce: '',
            type: 'veg',
            protein: 'chicken',
            ingredients: ['']
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSauceChange = this.handleSauceChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleProteinChange = this.handleProteinChange.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
        this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
        this.handleEditIngredient = this.handleEditIngredient.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleSauceChange(event) {
        this.setState({
            sauce: event.target.value
        });
    }

    handleTypeChange(event) {
        this.setState({
            type: event.target.value
        });
    }

    handleProteinChange(event) {
        this.setState({
            protein: event.target.value
        });
    }

    handleAddIngredient() {
        this.setState({
            ingredients: this.state.ingredients.concat([''])
        });
    }

    handleRemoveIngredient = (i) => () => {
        this.setState({
            ingredients: this.state.ingredients.filter((s, index) => index!==i)
        })
    }

    handleEditIngredient = (i) => (event) => {
        const newList = this.state.ingredients.map((ingredient, index) => {
            if(index===i) {
                return event.target.value;
            } else {
                return ingredient;
            }
        });
        this.setState({
            ingredients: newList
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        let dish = {
            name: this.state.name,
            sauce: this.state.sauce,
            protein: this.state.protein,
            ingredients: this.state.ingredients,
            isVeg: this.state.type=='veg'
        };
        console.log('Payload');
        console.log(dish);
        axios.post(`http://localhost:3000/v1/dishes`, dish)
          .then(res => {
            console.log(res);
            alert('Dish Saved');
        });
      }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <Grid>
                <Row>
                    <Col md={6}>
                        {'Name: '} <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                    </Col>
                    <Col md={6}>
                        {'Sauce: '} <input type="text" value={this.state.sauce} onChange={this.handleSauceChange} />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <input type="radio" value="veg" onChange={this.handleTypeChange} checked={this.state.type==="veg"} />{'Vegetarian'}
                        <input type="radio" value="nonveg" onChange={this.handleTypeChange} checked={this.state.type==="nonveg"} />{'Non-Vegetarian'}
                    </Col>
                    <Col md={6}>
                        {'Protein: '}
                            <select value={this.state.protein} onChange={this.handleProteinChange}>
                                <option value="chicken">{'Chicken'}</option>
                                <option value="mutton">{'Mutton'}</option>
                                <option value="paneer">{'Paneer'}</option>
                                <option value="dal">{'Dal'}</option>
                                <option value="tofu">{'Tofu'}</option>
                                <option value="veggies">{'Veggie'}</option>
                                <option value="fish">{'Fish'}</option>
                            </select>
                    </Col>
                </Row>
                <Row>
                    <Col md={3} />
                    <Col md={6}>
                        {'Ingredients: '}
                        {
                            this.state.ingredients.map((ingredient, i) => (
                                <div>
                                    <input type="text" value={ingredient} onChange={this.handleEditIngredient(i)} />
                                    <button type="button" onClick={this.handleRemoveIngredient(i)}>{'Remove'}</button>
                                </div>
                            ))
                        }
                        <Row>
                            <button type="button" onClick={this.handleAddIngredient}>{'Add'}</button>
                        </Row>
                    </Col>
                    <Col md={2} />
                </Row>
                <Row>
                    <button type="submit">{'Save'}</button>
                </Row>
            </Grid>
            </form>
        )
    }
}