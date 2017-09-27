import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Logo from '../images/logo.png';
import '../styles/Headers.css';
import '../styles/Shelf.css';

class Shelf extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ShelfName: props.match.params.name,
      data: {}
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3001/shelf/${this.state.ShelfName}`)
      .then(response => {
        this.setState({
          data: response.data
        });
      });
  }

  // Shelf Header
  renderShelfHeader() {
    return (
      <div>
        <nav className="shelf-header">
          <div className="shelf-logo-div">
            <Link to="/">
              <img className="shelf-logo" src={Logo} alt="" />
            </Link>
          </div>
          <div className="shelf-title-div">
            <h1>Shelf {this.state.ShelfName}</h1>
          </div>
        </nav>
      </div>
    );
  }

  // Bin Buttons
  renderBinButtons() {
    let binArray = [];
    for (var i = 0; i <= 4; i++) {
      binArray.push(
        <div key={i} className="render-bins">
          <Link to={`/shelf/${this.state.ShelfName}/${i + 1}`}>
            <div className="bin-button">
              <p>+ Add inventory to bin</p>
            </div>
          </Link>
        </div>
      );
    }
    return binArray;
  }

  render() {
    return (
      <div>
        <div>{this.renderShelfHeader()}</div>
        <div>{this.renderBinButtons()}</div>
      </div>
    );
  }
}

export default Shelf;
