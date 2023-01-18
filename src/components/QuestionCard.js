import { connect } from "react-redux";

const QuestionCard = ({ question, users }) => {
  if (question === null) {
    // TODO redirect to 404
    return <p>This question doesn't exist</p>;
  }

  return (
    <div>
      <img
        src={users[question.author].avatarURL}
        alt={`Avatar of ${question.author}`}
      />
      <p>{question.author}</p>
      <p>{question.timestamp}</p>
      <button>Show</button>
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
