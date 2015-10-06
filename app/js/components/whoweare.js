'use strict';
import React from 'react';
import HomeAction from '../actions/homeActionCreators'

class Whoweare extends React.Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount(){
    HomeAction.SetNavActive('who');
  }
  render() {
    return (
      <div className='page section'>
      <h1>control Panel</h1>
      </div>
    )
  }
}

export default Whoweare;
