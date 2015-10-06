import keyMirror from 'keymirror';

const constants = {
    ActionTypes: keyMirror({
      CLOSE_LOGIN_MODAL:null,
      LOGIN:null,
      LOGOUT:null,
      NAVACTIVE:null
  })
};

export default constants;
