import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, path } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";
class Homeheader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    //fire redux event: actions
  };
  returnToHome = () => {
    this.props.history.push(path.HOMEPAGE);
  };
  render() {
    let language = this.props.lang;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => this.returnToHome()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.package" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.general-health-check" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="suport">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.help" />
              </div>
              <div className="flag">
                <div
                  className={
                    language === LANGUAGES.VI ? "active-vi" : "language-vi"
                  }
                >
                  <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                    VN
                  </span>
                </div>
                <div
                  className={
                    language === LANGUAGES.EN ? "active-en" : "language-en"
                  }
                >
                  <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                    EN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowbanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title">
                <h2> NỀN TẢNG Y TẾ</h2>
                <h1> CHĂM SÓC SỨC KHỎE TOÀN DIỆN</h1>
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search" />
              </div>
            </div>

            <div className="content-down">
              <div className="options">
                <div className="options-child">
                  <div className="options-child-img">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="options-child-text">Khám chuyên khoa</div>
                </div>
                <div className="options-child">
                  <div className="options-child-img">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="options-child-text">Khám từ xa</div>
                </div>
                <div className="options-child">
                  <div className="options-child-img">
                    <i class="fas fa-stethoscope"></i>
                  </div>
                  <div className="options-child-text">Khám tổng quát</div>
                </div>
                <div className="options-child">
                  <div className="options-child-img">
                    <i class="far fa-calendar"></i>
                  </div>
                  <div className="options-child-text">Khám chuyên khoa</div>
                </div>
                <div className="options-child">
                  <div className="options-child-img">
                    <i class="fas fa-user-secret"></i>
                  </div>
                  <div className="options-child-text">Khám chuyên khoa</div>
                </div>
                <div className="options-child">
                  <div className="options-child-img">
                    <i class="fas fa-smile"></i>
                  </div>
                  <div className="options-child-text">Khám nha khoa</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Homeheader)
);
