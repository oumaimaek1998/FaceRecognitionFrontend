import { Switch, Route } from "react-router-dom";
import FeaturesPage from "../../Pages/FeaturesPage/FeaturesPage";
import "./Main.css";

const Main = () => {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/" component={FeaturesPage} />
      </Switch>
    </div>
  );
};

export default Main;
