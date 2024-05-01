export const initialSettings = {
  length: 12,
  addUpperCase: true,
  addSpecialCase: true,
  addNumbers: true,
};

export const initialState = {
  profile: null,
  password: { pass: "", passwordFor: "", important: false },
  history: JSON.parse(localStorage.getItem("pg-history")) || [],
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
      const n_history = [...payload, ...state.history];
      console.log(n_history);
      localStorage.setItem("pg-history", JSON.stringify(n_history));
      console.log(localStorage.getItem("pg-history"));
      return { ...state, history: [...payload, ...state.history] };
    case "logout":
      return { ...state, history: [], profile: initialState.profile };
    default:
      console.log("No such actions", type);
      return { ...state };
  }
}
