import { connect } from "react-redux";

const QuestionCard = ({ question, users }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hour}:${minutes} | ${day}/${month}/${year}`;
  };

  if (question === null) {
    // TODO redirect to 404
    return <p>This question doesn't exist</p>;
  }

  return (
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
