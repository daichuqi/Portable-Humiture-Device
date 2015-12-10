import Dispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/constants';

const ActionType = Constants.ActionTypes;
export default {

  SetNavActive(NavName){
    Dispatcher.dispatch({
      type: ActionType.NAVACTIVE,
      NavName:NavName
    });
  }

}
