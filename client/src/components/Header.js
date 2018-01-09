import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Payments from "./Payments";

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            style={{ paddingLeft: "15px" }}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul id="nav-mobile" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        // Don't know if logged in or out
        return;
      case false:
        // Logged out
        return (
          <li>
            <a href="/auth/google">Log in</a>
          </li>
        );
      default:
        // Logged in
        return [
          <li key="paymentsButton">
            <Payments />
          </li>,
          <li key="creditsAmount" style={{ padding: "0 15px" }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="logoutButton">
            <a href="/api/logout">Log out</a>
          </li>
        ];
    }
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
