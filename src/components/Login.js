import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogin } from "../actions/authedUser";

const Login = ({ dispatch }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logError, setLogError] = useState(false);

  const handleUsername = (e) => {
    const text = e.target.value;
    setUsername(text);
  };

  const handlePassword = (e) => {
    const text = e.target.value;
    setPassword(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin(username, password))
      .then(() => navigate("/"))
      .catch(() => setLogError(true));
  };

  return (
    <div className="px-8 flex h-screen max-w-screen-md mx-auto">
      <div className="my-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Employee Polls</h1>
        <h2 className="text-2xl font-medium mb-2 text-center">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-lg">User</label>
            <div>
              <input
                value={username}
                onChange={handleUsername}
                type="text"
                name="username"
                id="username"
                placeholder="User"
                className="px-3 py-2 bg-white border border-gray-300 shadow-sm w-full rounded placeholder-gray-400"
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="block mb-2 text-lg">Password</label>
            <div className="mt-1">
              <input
                value={password}
                onChange={handlePassword}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="px-3 py-2 bg-white border border-gray-300 shadow-sm w-full rounded placeholder-gray-400"
              />
            </div>
          </div>
          {logError && (
            <p className="text-red-700 mt-4">
              The username or password is incorrect. Please try again.
            </p>
          )}
          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={username === "" || password === ""}
              className="px-5 py-2 text-sm font-medium text-white bg-sky-400 hover:bg-sky-500 rounded-md
            disabled:bg-gray-300 hover:disabled:bg-gray-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect()(Login);
