import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./TableManageUser.scss";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageuser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllUserRedux();
  }
  componentDidUpdate(prevProps, sprevState, snapshot) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        usersRedux: this.props.users,
      });
    }
  }
  handleDeleteUser = (user) => {
    //console.log("chon then user", user);
    this.props.deleteUser(user.id);
  };
  handleEditUser = (user) => {
    //console.log("user edit", user);
    this.props.handleEditUserFromParent(user);
  };
  render() {
    let listUsers = this.state.usersRedux;
    return (
      <React.Fragment>
        <div className="users-container">
          <div className="title text-center">Manage users with admin</div>
          <div className="table-users mt-4">
            <table className="table table-striped table-dark" id="customers">
              <thead>
                <tr>
                  <th scope="col">Stt</th>
                  <th scope="col">Email</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Adress</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {listUsers &&
                  listUsers.length > 0 &&
                  listUsers.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                          <button>
                            <i
                              className="fas fa-pencil-alt"
                              onClick={() => this.handleEditUser(item)}
                            ></i>
                          </button>
                          <button onClick={() => this.handleDeleteUser(item)}>
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUser: (userId) => dispatch(actions.deleteUser(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageuser);
