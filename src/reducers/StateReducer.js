export const initialSettings = {
  length: 12,
  addUpperCase: true,
  addSpecialCase: true,
  addNumbers: true,
};

export const initialState = {
  profile: null,
  password: { pass: "", passwordFor: "", important: false },
  history: [],
  settings: initialSettings,
};

export function StateReducer(state, { type, payload }) {
  switch (type) {
    case "setPassword":
      const { name, val } = payload;

      return { ...state, password: { ...state.password, [name]: val } };
    case "setProfile":
      return { ...state, profile: payload };
    case "setSettings":
      const { target, value } = payload;
      return { ...state, settings: { ...state.settings, [target]: value } };
    case "setHistory":
      // console.log(payload, state.history);
      const set_history = [...payload, ...state.history];

      return { ...state, history: set_history };
    case "logout":
      return { ...state, history: [], profile: initialState.profile };
    default:
      console.log("No such actions", type);
      return { ...state };
  }
}
