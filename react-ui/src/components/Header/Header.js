import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="container">
          <div className="row">
            <div className="order-1 col-4 d-flex justify-content-start">
              <div className="user">
                <p className="user__name">{this.props.user.name}</p>
                <p className="user__screen-name">@{this.props.user.screenName}</p>
              </div>
            </div>
            <div className="order-0 order-md-1 col-2 col-md-4 d-flex justify-content-end justify-content-md-center align-items-center">
              <i className="twitter-icon fab fa-twitter"></i>
            </div>
            <div className="order-1 col-6 col-md-4 d-flex justify-content-end align-items-center">
              <Form className="form">
                <Input className="form__input" placeholder="Search Timeline" />
                <Button className="form__button"><i className="form__search-icon fas fa-search"></i></Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;