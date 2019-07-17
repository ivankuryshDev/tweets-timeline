import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap';

import './Header.css';

class Header extends Component {

  // submit a screen name of the user
  onSubmitSearch = (event) => {
    event.preventDefault();

    // make a request if the input field is not empty
    if (this.inputField.value) {
      this.props.onGetTweetCollection(this.inputField.value, true);
    }
  }

  componentDidUpdate() {
    // clean the input field if the request was successful
    this.inputField.value = '';
  }

  shouldComponentUpdate(nextProps, nextState) {
    // do not erase the input field if an error has happened
    if (nextProps.user.screenName === this.props.user.screenName) { return false }
    else { return true }
  }

  render() {
    return (
      <div className="Header">
        <div className="container">
          <div className="row">
            <div className="order-1 col-5 col-md-4 d-flex justify-content-start">
              <div className="user">
                <p className="user__name">{this.props.user.name}</p>
                <p className="user__screen-name">@{this.props.user.screenName}</p>
              </div>
            </div>
            <div className="order-0 order-md-1 col-2 col-md-4 d-flex justify-content-end justify-content-md-center align-items-center">
              <i className="twitter-icon fab fa-twitter"></i>
              <div className="loader loader--hidden"></div>
            </div>
            <div className="order-1 col-5 col-md-4 d-flex justify-content-end align-items-center">
              <Form className="form" onSubmit={this.onSubmitSearch}>
                <Input className="form__input"
                  placeholder="Search Timeline"
                  innerRef={input => this.inputField = input} />
                <Button type="sybmit" className="form__button">
                  <i className="form__search-icon fas fa-search"></i>
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;