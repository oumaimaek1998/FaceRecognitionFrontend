import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./Components/Main/Main";

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

export default App;
