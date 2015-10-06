'use strict';
import React from 'react';
import Router from 'react-router';
import LoginModal from './loginmodal';
import LoginButton from './loginbutton';

import HomeStore from '../stores/homeStore';
import UserProfile from '../stores/userProfileStore';
import ModalStore from '../stores/modalStore';
import UserActions from '../actions/UserActionCreators';


class Nav extends React.Component {
  constructor() {
    super();
    this.changeNavState = this.changeNavState.bind(this);
    this.changeHeaderState = this.changeHeaderState.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.state = {
      bigheader:true,
      header:'hideSmallHeader',
      activeNav:null
    }
  }
  componentDidMount() {
    HomeStore.addChangeListener(this.changeHeaderState);
    HomeStore.addNavActiveListener(this.changeNavState);
  }
  componentWillUnmount() {
    HomeStore.removeChangeListener(this.changeHeaderState);
    HomeStore.removeNavActiveListener(this.changeNavState);
  }
  changeHeaderState(){
    this.setState({header: HomeStore.getHeaderState()});
  }
  changeNavState(){
    this.setState({activeNav: HomeStore.getNavState()});
  }
  render() {
    return (
      <div>
        <div className ='bigheader' >
          <div>
            <LoginButton className="loginButton"/>
            <div className="navButtonGroup">
              <Router.Link to="home"><button className="navButton2 fa fa-home"> Home</button></Router.Link>
              <Router.Link to="who"><button className="navButton2 fa fa-arrows"> Control Panel</button></Router.Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Nav;
