import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowpassword: true,
      errMessage: "",
    };
  }
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
    //console.log(event.target.value)
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
    // console.log(event.target.value)
  };
  handleLogin = async () => {
    //alert("Login")
    this.setState({
      errMessage: "",
    });
    // console.log(this.state.username)
    // console.log(this.state.password)
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      console.log(data);
      if (data && data.errorCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errorCode === 0) {
        //todo
        // console.log('login succeed')
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      // console.log(e);
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
    // await handleLoginApi(this.state.username,this.state.password)
  };
  handleShowHidePassword = () => {
    //alert("click hide")
    this.setState({
      isShowpassword: !this.state.isShowpassword,
    });
  };
  handelKeyPressLogin = (event) => {
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };
  render() {
    //JSX
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-center textLogin">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
                placeholder="Enter your username"
                className="form-control"
                autoFocus
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>

              <div className="custom-password">
                <input
                  type={this.state.isShowpassword ? "password" : "text"}
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                  placeholder="Enter your password"
                  className="form-control"
                  onKeyPress={(event) => this.handelKeyPressLogin(event)}
                />
                <span onClick={() => this.handleShowHidePassword()}>
                  <i
                    class={
                      this.state.isShowpassword
                        ? "fas fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>

            <div className="col-12 btn-div">
              <button onClick={() => this.handleLogin()} className="btn-login">
                Login
              </button>
            </div>

            <div className="col-12">
              <span className="forgot-password">Forgot your password ?</span>
            </div>
            <div className="col-12 text-center">
              <span className="loginwith-span"> Or login with:</span>
            </div>
            <div className="col-12 other-login">
              <i className="fab fa-google-plus google-icon"></i>
              <i className="fab fa-facebook facebook-icon"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    //userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
