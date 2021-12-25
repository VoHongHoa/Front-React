import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES } from "../../utils";
import { FormattedMessage } from "react-intl";

class Header extends Component {
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    const { processLogout, userInfo } = this.props;
    let language = this.props.lang;
    console.log("check userInfor from Redux", userInfo);
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>

        <div className="btn btn-logout">
          <span className="welcome">
            <FormattedMessage id="homeheader.welcome" />
            {userInfo && userInfo.firstName ? userInfo.firstName : ""} !
          </span>
          <div className="languages">
            <span
              className={
                language === LANGUAGES.VI ? "language-vi-actice" : "language-vi"
              }
              onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
            >
              VN
            </span>
            <span
              className={
                language === LANGUAGES.EN ? "language-en-actice" : "language-en"
              }
              onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
            >
              EN
            </span>
          </div>
          <i
            className="fas fa-sign-out-alt"
            title="Log out"
            onClick={processLogout}
          ></i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);