import "./App.css";
import Header from "./layout/Header";
import About from "./layout/About";
import PG from "./PG";

function App() {
  return (
    <>
      <div className="Main">
        <Header />
        <PG />
        <About />
      </div>
    </>
  );
}

export default App;
