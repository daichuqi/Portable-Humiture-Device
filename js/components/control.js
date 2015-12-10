'use strict';
import React from 'react';
import HomeAction from '../actions/homeActionCreators'

class Control extends React.Component {
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
        <div className='buttonFirstRow'>
          <div className='controlButton upButton fa fa-arrow-circle-up'></div>
        </div>
        <div className='buttonSecondRow'>
          <div className='controlButton leftButton fa fa-arrow-circle-left'></div>
          <div className='controlButton downButton fa fa-arrow-circle-down'></div>
          <div className='controlButton rightButton fa fa-arrow-circle-right'></div>
        </div>
      </div>
    )
  }
}

export default Control;
