import { connect } from "react-redux";
import QuestionCard from "./QuestionCard";

const Dashboard = ({ questions, authedUser }) => {
  const getUnanswered = (question) =>
    !question.optionOne.votes.includes(authedUser) &&
    !question.optionTwo.votes.includes(authedUser);

  const getAnswered = (question) =>
    question.optionOne.votes.includes(authedUser) ||
    question.optionTwo.votes.includes(authedUser);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mt-8 mb-3">New Questions</h1>
      <ul className="grid grid-cols-3 gap-6 mx-8">
        {questions.filter(getUnanswered).map((question) => (
          <li key={question.id}>
            <QuestionCard id={question.id} />
          </li>
        ))}
      </ul>
      <h1 className="text-3xl font-bold mt-8 mb-3">Done</h1>
      <ul className="grid grid-cols-3 gap-6 mx-8">
        {questions.filter(getAnswered).map((question) => (
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
