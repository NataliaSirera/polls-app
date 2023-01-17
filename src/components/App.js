import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
  return (
    <div className="App">
      <h1 className="text-3xl font-bold">Polls App</h1>
    </div>
  );
};

export default connect()(App);
