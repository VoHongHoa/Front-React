import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  createUser,
  getAllUsers,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import "./UserManage.scss";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getALlUsersFromreact();
  }
  getALlUsersFromreact = async () => {
    let respone = await getAllUsers("ALL");
    if (respone && respone.errCode === 0) {
      this.setState({
        arrUsers: respone.users,
      });
    }
  };
  handelAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  handelEditUser = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await createUser(data);
      console.log(response);
      if (response && response.message.errCode !== 0) {
        alert(response.message.errMessage);
      } else {
        await this.getALlUsersFromreact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };
  doEditUser = async (user) => {
    // console.log("click save user", user);
    try {
      let response = await editUserService(user);
      console.log(response);
      if (response && response.errCode === 0) {
        await this.getALlUsersFromreact();
        this.setState({
          isOpenModalEditUser: false,
        });
      } else {
        alert(response.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleDeleteuser = async (user) => {
    //console.log("delete", user);
    try {
      let response = await deleteUserService(user.id);
      if (response && response.message.errCode === 0) {
        await this.getALlUsersFromreact();
      } else {
        alert(response.message.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    //console.log("check render ", this.state);
    let listUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}

        <div className="title text-center">Manage users with admin</div>
        <div className="mx-3">
          <button
            className="btn btn-primary px-1"
            onClick={() => this.handelAddNewUser()}
          >
            <i className="fas fa-plus px-1"></i>Add new User
          </button>
        </div>
        <div className="table-users mt-4 mx-3">
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
                listUsers.map((item, index) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                          <div>
                            <button onClick={() => this.handelEditUser(item)}>
                              <i className="fas fa-pencil-alt "></i>
                            </button>
                            <button onClick={() => this.handleDeleteuser(item)}>
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
