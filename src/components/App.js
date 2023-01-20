import { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import ViewPoll from "./ViewPoll";
import Leaderboard from "./Leaderboard";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <div>
      {props.loading === true ? null : (
        <div>
          <Navbar currentPage={"home"} />
          {/* <Dashboard /> */}
          {/* <ViewPoll id={"6ni6ok3ym7mf1p33lnez"} /> */}
          <Leaderboard />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
