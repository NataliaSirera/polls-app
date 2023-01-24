import { useEffect } from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import ViewPoll from "./ViewPoll";
import Leaderboard from "./Leaderboard";
import NewPoll from "./NewPoll";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <div>
      {props.loading === true ? null : (
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/add" element={<NewPoll />} />
          <Route path="/questions/:id" element={<ViewPoll />} />
        </Routes>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
