const defaultState = {
  email: "",
  token: null
};

export default function userState(state = defaultState, action) {
  switch (action.type) {
    default: return state;
  }
}
