import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./SpecialManage.scss";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt();
class SpecialtyManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      contentMarkdown: "",
      contentHTML: "",
      priviewImgURL: "",
    };
  }
  componentDidMount() {}
  async componentDidUpdate(prevProp, sprevState, snapshot) {
    if (prevProp.language !== this.props.language) {
    }
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
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
  handelSaveNewSpecialty = async () => {
    console.log("check state", this.state);
    let res = await createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success("Thêm thành công");
      this.setState({
        name: "",
        imageBase64: "",
        contentMarkdown: "",
        contentHTML: "",
        priviewImgURL: "",
      });
    } else {
      toast.error(res.errMessage);
    }
  };
  render() {
    return (
      <div className="specialty-manage-container container">
        <div className="specialty-manage-title title">Quản lý chuyên khoa</div>
        <div className="add-new-specialty row mb-3">
          <div className="col-6 form-group">
            <label>Tên chuyên khoa</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handeOnchangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Ảnh chuyên khoa</label>
            <input
              className="form-control"
              type="file"
              onChange={(event) => this.handleOnchangeImage(event)}
            />
          </div>
        </div>
        <div className="markdown-manage-specialty row">
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
            onClick={() => this.handelSaveNewSpecialty()}
          >
            Lưu
          </button>
        </div>
        <div className="all-specialty"> </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);
