import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { formatDate } from "../utils/helpers";

const QuestionCard = ({ question, users, id }) => {
  if (question === null) {
    return <Navigate to="/404" />;
  }

  return (
    <Link to={`questions/${id}`}>
      <div className="border rounded border-grey-400 p-4">
        <img
          className="h-24 w-24 mx-auto"
          src={users[question.author].avatarURL}
          alt={`Avatar of ${question.author}`}
        />
        <p className="text-xl font-medium mt-2">{question.author}</p>
        <p className="text-sm text-gray-400 mt-1">
          {formatDate(question.timestamp)}
        </p>
        <button className="border w-full rounded border-green-600 text-green-600 mt-4">
          Show
        </button>
      </div>
    </Link>
  );
};

const mapStateToProps = ({ questions, users }, { id }) => {
  const question = questions[id];
  return {
    users,
    question: question ? question : null,
  };
};

export default connect(mapStateToProps)(QuestionCard);
