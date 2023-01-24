import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";
import Navbar from "./Navbar";

const NewPoll = ({ dispatch, authedUser }) => {
  const navigate = useNavigate();

  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");

  const handleFirstOption = (e) => {
    const text = e.target.value;
    setFirstOption(text);
  };

  const handleSecondOption = (e) => {
    const text = e.target.value;
    setSecondOption(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      handleAddQuestion({
        optionOneText: firstOption,
        optionTwoText: secondOption,
        author: authedUser,
      })
    );
    navigate("/");
  };

  return (
    <div>
      <Navbar currentPage={"new"} />
      <div className="text-center px-8 max-w-screen-md mx-auto">
        <h1 className="text-3xl font-bold mt-8">New Poll</h1>
        <h2 className="text-xl font-medium mt-6 mb-4">Would you rather...?</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-lg">First Option</label>
            <div>
              <input
                value={firstOption}
                onChange={handleFirstOption}
                type="text"
                name="firstOption"
                id="firstOption"
                placeholder="Option One"
                className="px-3 py-2 bg-white border border-gray-300 shadow-sm w-full rounded placeholder-gray-400"
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="block mb-2 text-lg">Second Option</label>
            <div className="mt-1">
              <input
                value={secondOption}
                onChange={handleSecondOption}
                type="text"
                name="secondOption"
                id="secondOption"
                placeholder="Option Two"
                className="px-3 py-2 bg-white border border-gray-300 shadow-sm w-full rounded placeholder-gray-400"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={firstOption === "" || secondOption === ""}
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

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(NewPoll);
