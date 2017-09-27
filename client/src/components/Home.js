import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../images/logo.png';
import '../styles/Headers.css';
import '../styles/Home.css';

class Home extends Component {
  constructor() {
    super();

    this.state = {};
  }

  // Home Header
  renderHomeHeader() {
    return (
      <div>
        <nav className="home-header">
          <img className="home-logo" src={Logo} alt="" />
          <h1>SHELFIE</h1>
        </nav>
      </div>
    );
  }

  // Shelf Buttons
  renderShelfButtons() {
    let shelfArray = [];
    for (var i = 0; i <= 3; i++) {
      shelfArray.push(
        <Link
          key={i}
          to={'/shelf/' + String.fromCharCode('A'.charCodeAt() + i)}
        >
          <div className="shelf-button">
            <h3>Shelf {String.fromCharCode('A'.charCodeAt() + i)}</h3>
          </div>
        </Link>
      );
    }
    return shelfArray;
  }

  render() {
    return (
      <div>
        <div>{this.renderHomeHeader()}</div>
        <div className="render-shelves">{this.renderShelfButtons()}</div>
      </div>
    );
  }
}

export default Home;
