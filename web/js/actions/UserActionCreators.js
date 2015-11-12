// handles user/profile info
'use strict';
import Dispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/constants';
import Utils from '../utils/appUtils';

let ActionType = Constants.ActionTypes;


export default ({

  loginUser (user,cb) {
    Utils.postJSON('/login', user)
    .then((response) => {
      Dispatcher.dispatch({
        type: ActionType.LOGIN,
        message: 'Login successful',
        response: response
      });
      cb();
      console.log('logged in successfuly');
    })
    .catch((err) => {
      console.error('login failed: ', err);
    });
  },

  logoutUser () {
    Dispatcher.dispatch({
      type: ActionType.LOGOUT,
      message: 'Logout successful',
    });
  }

});
