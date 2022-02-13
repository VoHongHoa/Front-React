import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";
import "./Speciality.scss";
import { withRouter } from "react-router";
class Speciality extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrSpecialty: [],
    };
  }
  handelViewDetailSpecialty = (specialty) => {
    this.props.history.push(`/detail-specialty/${specialty.id}"`);
  };
  async componentDidMount() {
    this.props.fetchAllSpecialty();
  }
  componentDidUpdate(prevProp, sprevState, snapshot) {
    if (prevProp.allSpecialty !== this.props.allSpecialty) {
      // console.log(this.props.arrSpecialty);
      let arrSpecialty = this.props.allSpecialty;
      if (arrSpecialty && arrSpecialty.length > 0) {
        this.setState({
          arrSpecialty: arrSpecialty,
        });
      } else {
        this.setState({
          arrSpecialty: [],
        });
      }
    }
  }
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    let { arrSpecialty } = this.state;
    //console.log("check chuyen khoa", arrSpecialty);
    return (
      <div className="section-specialty">
        <div className="section-header">
          <h1>Chuyên khoa phổ biến</h1>
          <button>Xem thêm</button>
        </div>

        <div className="specialty-content">
          <Slider {...settings}>
            {arrSpecialty &&
              arrSpecialty.length > 0 &&
              arrSpecialty.map((item) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                return (
                  <div
                    className="customize"
                    onClick={() => this.handelViewDetailSpecialty(item)}
                  >
                    <div
                      className="img-customize"
                      style={{
                        backgroundImage: `url(${imageBase64})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <p>{item.name}</p>
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
    lang: state.app.language,
    allSpecialty: state.admin.allSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Speciality)
);
