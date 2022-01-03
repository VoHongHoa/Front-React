import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../HomePage/HomeHeader";
import { postVefifyBookAppontment } from "../../services/userService";
import "./VerifyEmail.scss";
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: "",
    };
  }
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      const urlSearch = new URLSearchParams(this.props.location.search);
      let token = urlSearch.get("token");
      let doctorID = urlSearch.get("doctorID");
      let res = await postVefifyBookAppontment({
        token: token,
        doctorID: doctorID,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: false,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }

    // console.log(token, doctorID);
    // if (this.props.match && this.props.match.params) {
    //   //let id = this.props.match.params.id;
    //   this.setState({});
    // }
  }
  async componentDidUpdate(prevProp, sprevState, snapshot) {
    if (prevProp.language !== this.props.language) {
    }
  }
  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <div className="verify-email-container">
        <HomeHeader isShowbanner={false} />

        {statusVerify === false ? (
          <div>Loading data...</div>
        ) : (
          <div className="verify-email-content">
            {+errCode !== 0 ? (
              <div className="verify-email-failed">
                <div className="verify-email-failed-img mt-3"></div>
                <span className="verify-email-failed-text">
                  Xác nhận không thành công. Vui lòng thử lại!
                </span>
              </div>
            ) : (
              <div className="verify-email-sussced">
                <div className="verify-email-sussced-img"></div>
                <span className="verify-email-sussced-text">
                  Xác nhận lịch hẹn thành công
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
