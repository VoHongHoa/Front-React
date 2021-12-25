import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import { getAllcodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import TablemanageUser from "./TablemanageUser";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      priviewImgURL: "",

      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phonenumber: "",
      address: "",
      gender: "",
      positionID: "",
      roleID: "",
      avatar: "",

      action: "",
      id: "",
    };
  }
  componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProp, sprevState, snapshot) {
    if (prevProp.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProp.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        positionID:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProp.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        roleID: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
    if (prevProp.users !== this.props.users) {
      let arrRole = this.props.roleRedux;
      let arrPositions = this.props.positionRedux;
      let arrGenders = this.props.genderRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phonenumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        positionID:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        roleID: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        avatar: "",
        priviewImgURL: "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
  }
  handleOnchangeImage = async (event) => {
    let filedata = event.target.files;
    let file = filedata[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      //console.log(base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        priviewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };
  openPriviewImg = () => {
    if (!this.state.priviewImgURL) {
      return;
    }
    this.setState({
      isOpen: true,
    });
  };
  checkValidateInput = () => {
    let isvalid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phonenumber",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      console.log(this.state[arrCheck[i]]);
      if (!this.state[arrCheck[i]]) {
        isvalid = false;
        alert(`Missing parameter: ${arrCheck[i]}`);
        break;
      }
    }
    return isvalid;
  };
  onchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) {
      return;
    }
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        roleID: this.state.roleID,
        positionID: this.state.positionID,
        avatar: this.state.avatar,
      });
    }

    if (action === CRUD_ACTIONS.EDIT) {
      console.log(this.state);
      this.props.editUser({
        id: this.state.id,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        roleID: this.state.roleID,
        positionID: this.state.positionID,
        avatar: this.state.avatar,
      });
    }
  };
  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      id: user.id,
      email: user.email,
      password: "HASHCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      phonenumber: user.phonenumber,
      address: user.address,
      gender: user.gender,
      positionID: user.positionID,
      roleID: user.roleID,
      avatar: "",
      priviewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
    });
  };
  render() {
    let genderArr = this.state.genderArr;
    let language = this.props.lang;
    let isLoadingGender = this.props.isLoadingGender;
    let positionArr = this.state.positionArr;
    let roleArr = this.state.roleArr;

    let {
      email,
      password,
      firstName,
      lastName,
      address,
      phonenumber,
      gender,
      positionID,
      roleID,
    } = this.state;

    return (
      <React.Fragment>
        <div className="user-redux-container">
          <div>
            <div className="title">Add User redux</div>
            <div>{isLoadingGender === true ? "loading gender" : " "}</div>
            <div className="user-redux-body">
              <div className="container">
                <div className="row">
                  <div className="col-12 mt-3">
                    <h1>
                      <FormattedMessage id="manage-user.add" />
                    </h1>
                  </div>
                  <div className="col-3">
                    <label>
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      value={email}
                      onChange={(event) => this.onchangeInput(event, "email")}
                      disabled={
                        this.state.action === CRUD_ACTIONS.EDIT ? true : false
                      }
                    />
                  </div>
                  <div className="col-3">
                    <label>
                      <FormattedMessage id="manage-user.password" />
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      value={password}
                      onChange={(event) =>
                        this.onchangeInput(event, "password")
                      }
                      disabled={
                        this.state.action === CRUD_ACTIONS.EDIT ? true : false
                      }
                    />
                  </div>
                  <div className="col-3">
                    <label>
                      <FormattedMessage id="manage-user.firstName" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={firstName}
                      onChange={(event) =>
                        this.onchangeInput(event, "firstName")
                      }
                    />
                  </div>
                  <div className="col-3">
                    <label>
                      <FormattedMessage id="manage-user.lastName" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={lastName}
                      onChange={(event) =>
                        this.onchangeInput(event, "lastName")
                      }
                    />
                  </div>
                  <div className="col-3">
                    <label>
                      <FormattedMessage id="manage-user.phoneNumber" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={phonenumber}
                      onChange={(event) =>
                        this.onchangeInput(event, "phonenumber")
                      }
                    />
                  </div>
                  <div className="col-9">
                    <label>
                      <FormattedMessage id="manage-user.address" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={address}
                      onChange={(event) => this.onchangeInput(event, "address")}
                    />
                  </div>
                  <div className="col-3">
                    <label for="inputState">
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    <select
                      id="inputState"
                      class="form-control"
                      value={gender}
                      onChange={(event) => this.onchangeInput(event, "gender")}
                    >
                      {genderArr &&
                        genderArr.length > 0 &&
                        genderArr.map((item, index) => {
                          return (
                            <option keyMap={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-3">
                    <label for="inputState">
                      <FormattedMessage id="manage-user.position" />
                    </label>
                    <select
                      id="inputState"
                      class="form-control"
                      value={positionID}
                      onChange={(event) =>
                        this.onchangeInput(event, "positionID")
                      }
                    >
                      {positionArr &&
                        positionArr.length > 0 &&
                        positionArr.map((item, index) => {
                          return (
                            <option keyMap={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-3">
                    <label for="inputState">
                      <FormattedMessage id="manage-user.roleID" />
                    </label>
                    <select
                      id="inputState"
                      class="form-control"
                      value={roleID}
                      onChange={(event) => this.onchangeInput(event, "roleID")}
                    >
                      {roleArr &&
                        roleArr.length > 0 &&
                        roleArr.map((item, index) => {
                          return (
                            <option keyMap={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="col-3">
                    <label for="inputState">
                      <FormattedMessage id="manage-user.img" />
                    </label>
                    <div className="img-container">
                      <input
                        id="previewImg"
                        hidden
                        type="file"
                        onChange={(event) => this.handleOnchangeImage(event)}
                      />
                      <div className="load-img">
                        <label htmlFor="previewImg">Tải Ảnh</label>
                        <i class="fas fa-upload"></i>
                      </div>

                      <div
                        className="preview-image"
                        style={{
                          backgroundImage: `url(${this.state.priviewImgURL})`,
                        }}
                        onClick={() => this.openPriviewImg()}
                      ></div>
                    </div>
                  </div>

                  <div className="col-12 mt-3">
                    <button
                      type="submit"
                      class={
                        this.state.action === CRUD_ACTIONS.EDIT
                          ? "btn btn-warning"
                          : "btn btn-primary"
                      }
                      onClick={() => this.handleSaveUser()}
                    >
                      {this.state.action === CRUD_ACTIONS.EDIT ? (
                        <FormattedMessage id="manage-user.edit" />
                      ) : (
                        <FormattedMessage id="manage-user.save" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {this.state.isOpen === true && (
              <Lightbox
                mainSrc={this.state.priviewImgURL}
                onCloseRequest={() => this.setState({ isOpen: false })}
              />
            )}
          </div>
          <div className="container">
            <TablemanageUser
              handleEditUserFromParent={this.handleEditUserFromParent}
              action={this.state.action}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
    roleRedux: state.admin.roles,
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editUser: (data) => dispatch(actions.editUser(data)),

    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
