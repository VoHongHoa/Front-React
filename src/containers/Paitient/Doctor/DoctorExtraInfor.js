import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/constant";
import { getExtraInforDoctorById } from "../../../services/userService";
import NumberFormat from "react-number-format";
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }
  async componentDidMount() {
    if (this.props.doctorID) {
      let res = await getExtraInforDoctorById(this.props.doctorID);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }

      //console.log("check", data);
    }
  }
  async componentDidUpdate(prevProp, sprevState, snapshot) {
    if (prevProp.language !== this.props.language) {
    }
    if (this.props.doctorID !== prevProp.doctorID) {
      let res = await getExtraInforDoctorById(this.props.doctorID);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }

      //console.log("check", data);
    }
  }
  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };
  formatNumber = (number) => {
    let { language } = this.props;
    if (language === LANGUAGES.VI) {
      return (
        <NumberFormat
          value={number}
          displayType={"text"}
          thousandSeparator={true}
          suffix={" VND"}
        />
      );
    }
    if (language === LANGUAGES.EN) {
      return (
        <NumberFormat
          value={number}
          displayType={"text"}
          thousandSeparator={true}
          suffix={" $"}
        />
      );
    }
  };
  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;
    //console.log(extraInfor);
    return (
      <div className="doctor-extra-infor-container">
        <div className="up">
          <h4>Địa chỉ khám</h4>
          {extraInfor && extraInfor.nameClinic && (
            <div className="detai-address">{extraInfor.nameClinic}</div>
          )}
          {extraInfor && extraInfor.addressClinic && (
            <div className="address">{extraInfor.addressClinic}</div>
          )}
        </div>

        <div className="down mt-2">
          {isShowDetailInfor === false && (
            <div className="show-content">
              {extraInfor &&
                extraInfor.priceData &&
                extraInfor.priceData.valueVi && (
                  <span className="price">
                    Giá khám:{" "}
                    {language === LANGUAGES.VI
                      ? this.formatNumber(extraInfor.priceData.valueVi)
                      : this.formatNumber(extraInfor.priceData.valueEn)}
                  </span>
                )}
              <div className="show-detail">
                <span onClick={() => this.showHideDetailInfor(true)}>
                  xem chi tiết
                </span>
              </div>
            </div>
          )}
          {isShowDetailInfor === true && (
            <>
              <div className="hide-content">
                <div className="price">
                  <span className="price-title">Giá khám</span>
                  {extraInfor &&
                    extraInfor.priceData &&
                    extraInfor.priceData.valueVi && (
                      <span className="price-value">
                        {language === LANGUAGES.VI
                          ? this.formatNumber(extraInfor.priceData.valueVi)
                          : this.formatNumber(extraInfor.priceData.valueEn)}
                      </span>
                    )}
                </div>
                {extraInfor && extraInfor.note && (
                  <div className="note">
                    {extraInfor.note}
                    {/* Được ưu tiên khám trước khi đật khám qua BookingCare. Giá khám
                  cho người nước ngoài là 30 USD */}
                  </div>
                )}
                {extraInfor &&
                  extraInfor.paymentData &&
                  extraInfor.paymentData.valueVi && (
                    <div className="payment">
                      Phòng khám có thanh toán bằng hình thức:{" "}
                      {language === LANGUAGES.VI
                        ? extraInfor.paymentData.valueVi
                        : extraInfor.paymentData.valueEn}
                    </div>
                  )}
              </div>
              <div className="hide-detail-btn mt-2">
                <span onClick={() => this.showHideDetailInfor(false)}>
                  Ẩn bảng giá
                </span>
              </div>
            </>
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
