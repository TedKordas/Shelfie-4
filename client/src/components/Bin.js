import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Logo from '../images/logo.png';
import '../styles/Headers.css';
import '../styles/Bin.css';

class Bin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ShelfName: props.match.params.name,
      BinName: props.match.params.bin,
      ItemName: '',
      ItemPrice: '',
      data: {},
      disable: true,
      editModeOff: true
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:3001/shelf/${this.state.ShelfName}/${this.state
          .BinName}`
      )
      .then(response => {
        this.setState({
          data: response.data[0]
        });
      });
  }

  // #####################
  // CLASS METHOD HANDLERS

  handleNameChange(event) {
    this.setState({
      ItemName: event.target.value
    });
  }

  handlePriceChange(event) {
    this.setState({
      ItemPrice: event.target.value
    });
  }

  handleAddItem() {
    axios
      .post(
        `http://localhost:3001/item/${this.state.ShelfName}/${this.state
          .BinName}`,
        {
          item_name: this.state.ItemName,
          item_price: this.state.ItemPrice
        }
      )
      .then(response => {
        this.setState({
          ItemName: '',
          ItemPrice: ''
        });
      });
  }

  handleEditItem(event) {
    this.setState({
      editModeOff: false,
      disable: false,
      ItemName: this.state.data.name,
      ItemPrice: this.state.data.price
    });
  }

  handleSaveItem(event) {
    this.setState({
      editModeOff: true,
      disable: true
    });
    axios
      .put(
        `http://localhost:3001/shelf/${this.state.ShelfName}/${this.state
          .BinName}`,
        {
          item_name: this.state.ItemName,
          item_price: this.state.ItemPrice
        }
      )
      .then(response => {
        axios
          .get(
            `http://localhost:3001/shelf/${this.state.ShelfName}/${this.state
              .BinName}`
          )
          .then(response => {
            this.setState({
              data: response.data[0]
            });
          });
      });
  }

  handleDeleteItem(event) {
    axios
      .delete(
        `http://localhost:3001/shelf/${this.state.ShelfName}/${this.state
          .BinName}`
      )
      .then(response => {});
  }

  // #####################

  // Bin Header
  renderBinHeader() {
    return (
      <div>
        <nav className="bin-header">
          <div className="bin-logo-div">
            <Link to="/">
              <img className="bin-logo" src={Logo} alt="" />
            </Link>
          </div>
          <div className="bin-shelf-title-div">
            <Link to={'/shelf/' + this.props.match.params.name}>
              <h1>Shelf {this.state.ShelfName}</h1>
            </Link>
          </div>
          <div className="bin-title-div">
            <h1>Bin {this.state.BinName}</h1>
          </div>
        </nav>
      </div>
    );
  }

  // Disable Text If Data
  renderDisableInput() {
    if (this.state.disable) {
      return (
        <div className="input-field-parent">
          <div className="name-form">
            <label className="label">Name</label>
            <input
              className="input"
              type="text"
              disabled="disabled"
              value={this.state.data.name}
              onChange={event => this.handleNameChange(event)}
            />
          </div>
          <div className="price-form">
            <label className="label">Price</label>
            <input
              className="input"
              type="text"
              disabled="disabled"
              value={this.state.data.price}
              onChange={event => this.handlePriceChange(event)}
            />
          </div>
        </div>
      );
    }
    return (
      <div className="input-field-parent">
        <div className="name-form">
          <label className="label">Name</label>
          <input
            className="input"
            type="text"
            onChange={event => this.handleNameChange(event)}
          />
        </div>
        <div className="price-form">
          <label className="label">Price</label>
          <input
            className="input"
            type="text"
            onChange={event => this.handlePriceChange(event)}
          />
        </div>
      </div>
    );
  }

  // Switch To Edit Buttons If Data
  renderEditMode() {
    if (this.state.editModeOff) {
      return (
        <div className="edit-button-parent">
          <div
            className="edit-button"
            onClick={event => this.handleEditItem(event)}
          >
            <h1>Edit</h1>
          </div>

          <Link to="/shelf/A">
            <div
              className="delete-button"
              onClick={event => this.handleDeleteItem(event)}
            >
              <h1>Delete</h1>
            </div>
          </Link>
        </div>
      );
    }
    return (
      <div className="edit-button-parent">
        <div
          className="save-button"
          onClick={event => this.handleSaveItem(event)}
        >
          <h1>Save</h1>
        </div>

        <Link to="/shelf/A">
          <div className="delete-button">
            <h1>Delete</h1>
          </div>
        </Link>
      </div>
    );
  }

  // Input Fields w/ Conditional Edit Button Rendering
  renderInputFields() {
    if (this.state.data) {
      return (
        <div>
          {this.renderDisableInput()}
          {this.renderEditMode()}
        </div>
      );
    }
    return (
      <div className="input-field-parent">
        <div className="name-form">
          <label className="label">Name</label>
          <input
            className="input"
            type="text"
            value={this.state.ItemName}
            onChange={event => this.handleNameChange(event)}
          />
        </div>
        <div className="price-form">
          <label className="label">Price</label>
          <input
            className="input"
            type="text"
            value={this.state.ItemPrice}
            onChange={event => this.handlePriceChange(event)}
          />
        </div>
        <div>
          <div className="add-button">
            <Link to={`/shelf/${this.state.ShelfName}`}>
              <h1 onClick={event => this.handleAddItem(event)}>
                + Add to Inventory
              </h1>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div> {this.renderBinHeader()}</div>
        <div>{this.renderInputFields()}</div>
      </div>
    );
  }
}

export default Bin;
