import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";
import "./Doctor.scss";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils/constant";
import { withRouter } from "react-router";
class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProp, sprevState, snapshot) {
    if (prevProp.topDoctors !== this.props.topDoctors) {
      this.setState({
        arrDoctors: this.props.topDoctors,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDoctor();
  }
  handelViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  render() {
    let { arrDoctors } = this.state;
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    //console.log("check data doctor from redux", this.state.arrDoctors);
    let { language } = this.props;

    return (
      <div className="section-doctor">
        <div className="section-header">
          <h1>Bác sĩ nổi bậc</h1>
          <button>Tìm kiếm</button>
        </div>

        <div className="doctor-content">
          <Slider {...settings}>
            {arrDoctors &&
              arrDoctors.length > 0 &&
              arrDoctors.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                let nameVi = `${item.positionData.valueVi} ${item.firstName} ${item.lastName}`;
                let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`;
                return (
                  <div
                    className="customize"
                    key={index}
                    onClick={() => this.handelViewDetailDoctor(item)}
                  >
                    <div className="img-customize">
                      <div
                        className="circle-img"
                        style={{
                          backgroundImage: `url(${imageBase64})`,
                          backgroundRepeat: "none",
                          backgroundSize: "cover",
                        }}
                      ></div>
                    </div>
                    <p>{language === LANGUAGES.VI ? nameVi : nameEn}</p>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topDoctors: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
