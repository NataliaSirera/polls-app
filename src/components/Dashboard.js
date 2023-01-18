import { useState } from "react";
import { connect } from "react-redux";
import QuestionCard from "./QuestionCard";

const Dashboard = ({ questions, authedUser }) => {
  const [showDoneQuestions, setShowDoneQuestions] = useState(true);
  const handleToggle = (e) => {
    setShowDoneQuestions(e.target.checked);
  };

  const filterQuestions = (showDoneQuestions, question) => {
    if (showDoneQuestions) {
      return (
        question.optionOne.votes.includes(authedUser) ||
        question.optionTwo.votes.includes(authedUser)
      );
    } else {
      return (
        !question.optionOne.votes.includes(authedUser) &&
        !question.optionTwo.votes.includes(authedUser)
      );
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mt-8 mb-3">Questions</h1>
      <div className="relative inline-flex items-center mb-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            defaultChecked="true"
            onChange={handleToggle}
          />
          <span
            className="ml-3 px-3 py-1 text-xs text-blue-500 border border-blue-500 rounded-l-full font-bold border-2
          peer peer-checked:text-gray-500 peer-checked:border-gray-300 peer-checked:font-normal peer-checked:border peer-checked:border-r-0"
          >
            New questions
          </span>
          <span
            className="px-3 py-1 text-xs text-gray-500 border border-gray-300 rounded-r-full border-l-0
          peer peer-checked:text-green-600 peer-checked:border-green-600 peer-checked:font-bold peer-checked:border-2"
          >
            Done questions
          </span>
        </label>
      </div>
      <ul className="grid grid-cols-3 gap-6 mx-8">
        {questions
          .filter(filterQuestions.bind(this, showDoneQuestions))
          .map((question) => (
            <li key={question.id}>
              <QuestionCard id={question.id} />
            </li>
          ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => ({
  authedUser,
  questions: Object.values(questions).sort(
    (q1, q2) => q2.timestamp - q1.timestamp
  ),
});

export default connect(mapStateToProps)(Dashboard);
