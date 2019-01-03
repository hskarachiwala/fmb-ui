import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';

export default class ViewAll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vegDishes: [],
      nonVegDishes: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/v1/dishes`)
      .then(res => {
        var allDishes = res.data;
        var vegDishes = allDishes.filter(v=>v.isVeg);
        var nonVegDishes = allDishes.filter(v=>!v.isVeg);
        this.setState({
          vegDishes: vegDishes,
          nonVegDishes: nonVegDishes
        })
    });
  }

  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>{'Vegetarian'}</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.vegDishes.map((dish) =>
                <tr>
                  <td>{dish.name}</td>
                </tr>
              )
            }
          </tbody>
        </Table>
        <Table>
          <thead>
            <tr>
              <th>{'Non-Vegetarian'}</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.nonVegDishes.map((dish) =>
                <tr>
                  <td>{dish.name}</td>
                </tr>
              )
            }
          </tbody>
      </Table>
    </div>
    );
  }
}
