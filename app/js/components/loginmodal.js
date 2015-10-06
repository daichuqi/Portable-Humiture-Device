'use strict';
import React from 'react';
import { Modal } from 'react-bootstrap';

import ModalActions from '../actions/modalActionCreators';
import UserActions from '../actions/UserActionCreators';
var ENTER_KEY_CODE = 13;
class Login extends React.Component {
  constructor(props, context) {
    super(props);
    this.toggleAuth = this.toggleAuth.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  toggleAuth() { this.props.handleToggle('Signup'); }
  handleLogin() {
    let userData = {};
    userData.username = this.refs.username.getDOMNode().value;
    userData.password = this.refs.password.getDOMNode().value;
    if(userData.username && userData.password){
      UserActions.loginUser(userData, () => {
        ModalActions.closeLoginModal();
        this.context.router.transitionTo('news');
      });
    }
  }
  handleKeyDown(event) {
    if(event.keyCode === ENTER_KEY_CODE) {
      this.handleLogin();
    }
  }

  render() {
    return (
        <div className="AuthForm" onKeyDown={this.handleKeyDown}>
          <div className="modalButtonBox3">
            <input type="text" placeholder="Username" ref="username" />
            <input type="password" placeholder="Password" ref="password" />
          </div>
          <hr></hr>
          <div className="modalButtonBox">
            <button className="modalLoginButton" onClick={this.handleLogin} >Login</button>
          </div>
        </div>
      );
  }
}
Login.contextTypes = {
  router: React.PropTypes.func.isRequired
};

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {authType: props.authType};
    this.close = this.close.bind(this);
  }

 close(){
  ModalActions.closeLoginModal()
 }

 toggle(data){
    this.setState({authType:data}, () => {});
  }

  render() {
    return (
      <div>
        <Modal bsSize='small' show={this.props.show} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>LOGIN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Login handleToggle = {this.toggle}/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default LoginModal;


