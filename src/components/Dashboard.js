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
    <div>
      <h1>New Questions</h1>
      {questions.filter(getUnanswered).map((question) => (
        <li key={question.id}>
          <QuestionCard id={question.id} />
        </li>
      ))}
      <h1>Done</h1>
      {questions.filter(getAnswered).map((question) => (
        <li key={question.id}>
          <QuestionCard id={question.id} />
        </li>
      ))}
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
