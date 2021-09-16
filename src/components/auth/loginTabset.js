import React, { Component, Fragment } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Unlock } from "react-feather";
import { withRouter } from "react-router-dom";
import { adminLogin } from "../../apiService";

export class LoginTabset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      activeShow: true,
      startDate: new Date(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // clickActive = (event) => {
  //     document.querySelector(".nav-link").classList.remove('show');
  //     event.target.classList.add('show');
  // }
  handleChange(date) {
    this.setState({
      startDate: date,
    });
    console.log("data", date);
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = async () => {
    // alert("asdfasdf")
    const { email, password } = this.state;
    adminLogin({ email, password })
      .then((response) => {
          alert(response)
        if (response.status === 201) {
          const { token, user } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          this.props.history.push(`${process.env.PUBLIC_URL}/dashboard`);
        } else {
          window.confirm("Your email or password is incorect");
        }
      })
      .catch((err) => {
        window.confirm("Your email or password is incorect");
      });
  };

  routeChange = () => {
    console.log("jdhakjd", this.state.email);
    console.log("jdhakjd", this.state.password);
    // this.props.history.push(`${process.env.PUBLIC_URL}/dashboard`);
  };
  render() {
    return (
      <div>
        <Fragment>
          <Tabs>
            <TabList className="nav nav-tabs tab-coupon">
              <Tab className="nav-link">
                <User />
                Login
              </Tab>
              <Tab className="nav-link">
                <Unlock />
                Register
              </Tab>
            </TabList>

            <TabPanel>
              <div className="form-horizontal">
                <div className="form-group">
                  <input
                    required=""
                    name="email"
                    type="email"
                    className="form-control"
                    onChange={this.onChange}
                    placeholder="Username"
                    id="exampleInputEmail1"
                  />
                </div>
                <div className="form-group">
                  <input
                    required=""
                    name="password"
                    type="password"
                    className="form-control"
                    onChange={this.onChange}
                    placeholder="Password"
                  />
                </div>
                <div className="form-terms">
                  <div className="custom-control custom-checkbox mr-sm-2">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customControlAutosizing"
                    />
                    <label className="d-block">
                      <input
                        className="checkbox_animated"
                        id="chk-ani2"
                        type="checkbox"
                      />
                      Reminder Me{" "}
                      <span className="pull-right">
                        {" "}
                        <a href="#" className="btn btn-default forgot-pass p-0">
                          lost your password
                        </a>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="form-button">
                  <button
                    className="btn btn-primary"
                    onClick={this.login}
                  >
                    Login
                  </button>
                </div>
                <div className="form-footer">
                  <span>Or Login up with social platforms</span>
                  <ul className="social">
                    <li>
                      <a className="fa fa-facebook" href=""></a>
                    </li>
                    <li>
                      <a className="fa fa-twitter" href=""></a>
                    </li>
                    <li>
                      <a className="fa fa-instagram" href=""></a>
                    </li>
                    <li>
                      <a className="fa fa-pinterest" href=""></a>
                    </li>
                  </ul>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <form className="form-horizontal auth-form">
                <div className="form-group">
                  <input
                    required=""
                    name="login[username]"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    id="exampleInputEmail12"
                  />
                </div>
                <div className="form-group">
                  <input
                    required=""
                    name="login[username]"
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    id="exampleInputEmail12"
                  />
                </div>
                <div className="form-group">
                  <input
                    required=""
                    name="login[username]"
                    type="text"
                    className="form-control"
                    placeholder="Country"
                    id="exampleInputEmail12"
                  />
                </div>
                <div className="form-group">
                  <input
                    required=""
                    name="login[username]"
                    type="number"
                    className="form-control"
                    placeholder="CNIC"
                    id="exampleInputEmail12"
                  />
                </div>
                <div className="form-group">
                  <input
                    required=""
                    name="login[password]"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <input
                    required=""
                    name="login[password]"
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="form-terms">
                  <div className="custom-control custom-checkbox mr-sm-2">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customControlAutosizing"
                    />
                    <label className="d-block">
                      <input
                        className="checkbox_animated"
                        id="chk-ani2"
                        type="checkbox"
                      />
                      I agree all statements in{" "}
                      <span>
                        <a href="">Terms &amp; Conditions</a>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="form-button">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={() => this.routeChange()}
                  >
                    Register
                  </button>
                </div>
                <div className="form-footer">
                  <span>Or Sign up with social platforms</span>
                  <ul className="social">
                    <li>
                      <a className="fa fa-facebook" href=""></a>
                    </li>
                    <li>
                      <a className="fa fa-twitter" href=""></a>
                    </li>
                    <li>
                      <a className="fa fa-instagram" href=""></a>
                    </li>
                    <li>
                      <a className="fa fa-pinterest" href=""></a>
                    </li>
                  </ul>
                </div>
              </form>
            </TabPanel>
          </Tabs>
        </Fragment>
      </div>
    );
  }
}

export default withRouter(LoginTabset);
