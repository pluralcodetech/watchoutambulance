const userDataReducer = (state = {loggedIn: false, data: null}, action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.payload;
    default:
      return state;
  }
};

export default userDataReducer;
