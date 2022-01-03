import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { createNewClinic } from "../../../services/userService";
import { toast } from "react-toastify";
import "./ClinicManage.scss";
const mdParser = new MarkdownIt();
class ClinicManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      contentMarkdown: "",
      imageBase64: "",
      contentHTML: "",
    };
  }
  componentDidMount() {}
  async componentDidUpdate(prevProp, sprevState, snapshot) {
    if (prevProp.language !== this.props.language) {
    }
  }
  handeOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnchangeImage = async (event) => {
    let filedata = event.target.files;
    let file = filedata[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      //console.log(base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        priviewImgURL: objectUrl,
        imageBase64: base64,
      });
    }
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handelSaveNewClinic = async () => {
    console.log("check state", this.state);
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Thêm thành công");
      this.setState({
        name: "",
        imageBase64: "",
        contentMarkdown: "",
        address: "",
        contentHTML: "",
        priviewImgURL: "",
      });
    } else {
      toast.error(res.errMessage);
    }
  };
  render() {
    return (
      <div className="clinic-manage-container container">
        <div className="clinic-manage-title title">Quản lý phòng khám</div>
        <div className="add-new-clinic row mb-3">
          <div className="col-6 form-group">
            <label>Tên phòng khám</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handeOnchangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Ảnh phòng khám</label>
            <input
              className="form-control"
              type="file"
              onChange={(event) => this.handleOnchangeImage(event)}
            />
          </div>
          <div className="col-12 form-group mt-3">
            <label>Địa chỉ phòng khám</label>
            <input
              className="form-control"
              type="text"
              value={this.state.address}
              onChange={(event) => this.handeOnchangeInput(event, "address")}
            />
          </div>
        </div>
        <div className="markdown-manage-clinic row">
          <div className="col-12">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>
        </div>
        <div className="col-12 mt-3">
          <button
            className="btn btn-primary"
            onClick={() => this.handelSaveNewClinic()}
          >
            Lưu
          </button>
        </div>
        <div className="all-clinic"> </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);
