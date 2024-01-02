import "./App.css";
import Header from "./layout/Header";
import About from "./layout/About";
import PG from "./PG";
import LoginComp from "./LoginComp";

import { useReducer } from "react";
import { initialState, StateReducer } from "./reducers/StateReducer.js";

function App() {
  const [state, dispatch] = useReducer(StateReducer, initialState);
  return (
    <>
      <LoginComp state={state} dispatch={dispatch} />
      <Header />
      <PG state={state} dispatch={dispatch} />
      <About />
    </>
  );
}

export default App;
