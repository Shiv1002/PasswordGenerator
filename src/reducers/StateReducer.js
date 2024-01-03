export const initialSettings = {
  length: 12,
  addUpperCase: true,
  addSpecialCase: true,
  addNumbers: true,
};

export const initialState = {
  profile: null,
  history: [],
  settings: initialSettings,
};

export function StateReducer(state, { type, payload }) {
  switch (type) {
    case "setProfile":
      return { ...state, profile: payload };
    case "setSettings":
      const { target, value } = payload;
      return { ...state, settings: { ...state.settings, [target]: value } };
    case "setHistory":
      return { ...state, history: [...payload, ...state.history] };
    case "reset":
      return { ...initialState };
    default:
      console.log("No such actions");
      return { ...state };
  }
}
