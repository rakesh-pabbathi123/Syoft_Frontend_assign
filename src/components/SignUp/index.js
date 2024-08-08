import React, { Component } from "react";
import "./index.css";
import withNavigate from "../withNavigate";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_firstname: "",
      user_email: "",
      user_password: "",
      user_phone: "",
      error: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { user_firstname, user_email, user_password, user_phone } = this.state;

    if (!user_firstname || !user_email || !user_password || !user_phone) {
      this.setState({ error: "Please fill out all fields" });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(user_email)) {
      this.setState({ error: "Please enter a valid email address" });
      return;
    }

    const payload = {
      user_firstname,
      user_email,
      user_password,
      user_phone,
      user_lastname: "StaticLastName",  // Static data
      user_city: "StaticCity",          // Static data
      user_zipcode: "123456",           // Static data
    };

    try {
      const response = await fetch(
        "https://syoft.dev/Api/user_registeration/api/user_registeration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (response.ok) {
        this.props.navigate("/login");
      } else {
        this.setState({
          error: data.msg || "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      this.setState({ error: "Failed to register. Please try again later." });
    }
  };

  render() {
    const { user_firstname, user_email, user_password, user_phone, error } = this.state;
    return (
      <div className="signup-container">
        <div className="signup-left">
          <div className="welcome-message">
            <h1>Developed by:Rakesh</h1>
            <h2>Welcome!</h2>
            <p>Sign up to get started.</p>
          </div>
        </div>
        <div className="signup-right">
          <h2 className="color">Sign Up</h2>
          {error && <p className="errorMsg">{error}</p>}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="user_firstname"
                value={user_firstname}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="user_email"
                value={user_email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="user_password"
                value={user_password}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="user_phone"
                value={user_phone}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input type="checkbox" required /> I agree to the Terms and Privacy Policy
            </div>
            <button type="submit">Create Free Account</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withNavigate(SignUp);
