import { useEffect } from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import ViewPoll from "./ViewPoll";
import Leaderboard from "./Leaderboard";
import NewPoll from "./NewPoll";
import NotFound from "./NotFound";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <div>
      {props.loading === true ? null : (
        <Routes>
          <Route
            path="/"
            exact
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/leaderboard"
            exact
            element={
              <PrivateRoute>
                <Leaderboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            exact
            element={
              <PrivateRoute>
                <NewPoll />
              </PrivateRoute>
            }
          />
          <Route
            path="/questions/:id"
            element={
              <PrivateRoute>
                <ViewPoll />
              </PrivateRoute>
            }
          />
          <Route path="/login" exact element={<Login />} />
          <Route path="/404" exact element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  loading: users && Object.keys(users).length === 0,
});

export default connect(mapStateToProps)(App);
