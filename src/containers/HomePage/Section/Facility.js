import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";
import "./Facility.scss";
class Facility extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div className="section-facility">
        <div className="section-header">
          <h1>Cơ sở y tế nổi bậc</h1>
          <button>Tìm kiếm</button>
        </div>

        <div className="facility-content">
          <Slider {...settings}>
            <div className="customize">
              <div className="img-customize"></div>
              <p>Cơ xương khớp 1</p>
            </div>
            <div className="customize">
              <div className="img-customize"></div>
              <p>Cơ xương khớp 1</p>
            </div>
            <div className="customize">
              <div className="img-customize"></div>
              <p>Cơ xương khớp 1</p>
            </div>
            <div className="customize">
              <div className="img-customize"></div>
              <p>Cơ xương khớp 1</p>
            </div>
            <div className="customize">
              <div className="img-customize"></div>
              <p>Cơ xương khớp 1</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Facility);
