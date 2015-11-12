'use strict';
import React from 'react';
import HomeAction from '../actions/homeActionCreators'
import HomeStore from '../stores/homeStore';
import UserStore from '../stores/userProfileStore';

class Home extends React.Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount(){
    HomeAction.SetNavActive('home');
  }

  render() {
    return (
      <div className="homepage">

      <h1>DATA WILL DISPLAY HERE</h1>

      </div>
    );
  }
}

export default Home;