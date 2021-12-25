import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";
import "./Speciality.scss";
class Speciality extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div className="section-specialty">
        <div className="section-header">
          <h1>Chuyên khoa phổ biến</h1>
          <button>Xem thêm</button>
        </div>

        <div className="specialty-content">
          <Slider {...settings}>
            <div className="customize">
              <div className="img-customize"></div>
              <p>Cơ xương khớp 1</p>
            </div>
            <div className="customize">
              <div className="img-customize"></div>
              <p>Bệnh viện Chợ Rẫy</p>
            </div>
            <div className="customize">
              <div className="img-customize"></div>
              <p>Phòng khám Bệnh viện Đại học Y Dược 1</p>
            </div>
            <div className="customize">
              <div className="img-customize"></div>
              <p>Bệnh viện K</p>
            </div>
            <div className="customize">
              <div className="img-customize"></div>
              <p>Bệnh viện Bạch Mai</p>
            </div>
            <div className="customize">
              <div className="img-customize"></div>
              <p>Cơ xương khớp 1</p>
            </div>
          </Slider>
        </div>
      </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Speciality);
