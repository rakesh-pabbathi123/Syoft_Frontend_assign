import React, { Component } from "react";
import "./index.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      error: "",
    };
  }

  componentDidMount() {
    // Fetch user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.setState({ user });
    } else {
      this.setState({ error: "No user data found. Please log in." });
    }
  }

  render() {
    const { user, error } = this.state;

    return (
      <div className="dashboard-container">
          <h1>Developed by:Rakesh</h1>
        <h2 className="dashboard">Dashboard</h2>
        {error && <p className="errorMsg">{error}</p>}
        {user ? (
          <div>
          
            <h2 className="welcome">
              Welcome, <span className="span-user">{user.user_firstname}</span>
            </h2>
            <p>
              Email: <span className="span-user">{user.user_email}</span>
            </p>
            <p>
              Phone: <span className="span-user">{user.user_phone}</span>
            </p>
            <p>
              Last Name: <span className="span-user">{user.user_lastname }</span>
            </p>
            <p>
              City: <span className="span-user">{user.user_city}</span>
            </p>
            <p>
              Zipcode: <span className="span-user">{user.user_zipcode}</span>
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default Dashboard;
