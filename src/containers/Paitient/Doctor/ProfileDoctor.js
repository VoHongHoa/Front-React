import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../utils/constant";
import { getProfileDoctorById } from "../../../services/userService";
import NumberFormat from "react-number-format";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorIDFromparent);
    this.setState({
      dataProfile: data,
    });
  }
  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };
  async componentDidUpdate(prevProp, sprevState, snapshot) {
    if (prevProp.language !== this.props.language) {
    }
    if (prevProp.doctorIDFromparent !== this.props.doctorIDFromparent) {
      let data = await this.getInforDoctor(this.props.doctorIDFromparent);
      this.setState({
        dataProfile: data,
      });
    }
  }
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
    let { dataProfile } = this.state;
    let { language } = this.props;
    let nameVi = "",
      nameEn = "",
      priceVi = "",
      priveEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.firstName} ${dataProfile.lastName}`;
      nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.lastName} ${dataProfile.firstName}`;
    }

    if (
      dataProfile &&
      dataProfile.Doctor_infor &&
      dataProfile.Doctor_infor.priceData
    ) {
      priceVi = this.formatNumber(dataProfile.Doctor_infor.priceData.valueVi);
      priveEn = this.formatNumber(dataProfile.Doctor_infor.priceData.valueEn);
    }
    return (
      <div className="profile-doctor-container row">
        <div className="content-up">
          <div className="content-left col-2">
            <div
              className="avatar"
              style={{
                backgroundImage: `url(${
                  dataProfile && dataProfile.image ? dataProfile.image : ""
                })`,
              }}
            ></div>
          </div>
          <div className="content-right col-10">
            <div className="up">
              {dataProfile && dataProfile.firstName && dataProfile.lastName && (
                <span>{language === LANGUAGES.VI ? nameVi : nameEn}</span>
              )}
            </div>
            <div className="down">
              {dataProfile &&
                dataProfile.Markdown &&
                dataProfile.Markdown.description && (
                  <p>{dataProfile.Markdown.description}</p>
                )}

              {dataProfile &&
                dataProfile.Doctor_infor &&
                dataProfile.Doctor_infor.provinceData &&
                dataProfile.Doctor_infor.provinceData.valueVi && (
                  <div className="location">
                    <p>
                      {" "}
                      <i className="fas fa-map-marker-alt"> </i>
                      {dataProfile.Doctor_infor.provinceData.valueVi}
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className="content-down">
          {dataProfile &&
            dataProfile.Doctor_infor &&
            dataProfile.Doctor_infor.priceData && (
              <div className="price">
                Giá khám: {language === LANGUAGES.VI ? priceVi : priveEn}
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
