import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";

const ViewPoll = ({ question, users, authedUser }) => {
  if (question === null) {
    // TODO redirect to 404
    return <p>This question doesn't exist</p>;
  }

  const userVote1 = question.optionOne.votes.includes(authedUser);
  const userVote2 = question.optionTwo.votes.includes(authedUser);

  const votes1 = question.optionOne.votes.length;
  const votes2 = question.optionTwo.votes.length;
  const votesTotal = votes1 + votes2;
  const votes1percentage = Math.round((votes1 / votesTotal) * 100, 0);
  const votes2percentage = Math.round((votes2 / votesTotal) * 100, 0);

  return (
    <div className="text-center px-8">
      <h1 className="text-3xl font-bold mt-8 mb-2">
        Poll by {question.author}
      </h1>
      <p className="text-sm text-gray-400 mb-4">
        {formatDate(question.timestamp)}
      </p>
      <img
        className="h-24 w-24 mx-auto"
        src={users[question.author].avatarURL}
        alt={`Avatar of ${question.author}`}
      />
      <p className="text-2xl my-4 font-medium">Would you rather ... ? </p>
      <div className="grid grid-cols-2 gap-8 mx-auto max-w-screen-xl">
        <div className="border rounded relative">
          <p className="font-medium text-lg py-2 px-8 bg-green-500">
            {question.optionOne.text}
          </p>
          <p className="pt-2">
            <span className="text-4xl">{votes1percentage}</span>
            <span className="text-2xl">%</span>
          </p>
          <p className="pb-2 px-24">
            {`(${votes1})`}
            {userVote1 && (
              <span className="text-xs text-white bg-green-800 rounded-full absolute px-2 py-1 right-2 bottom-2">
                you voted
              </span>
            )}
          </p>
        </div>
        <div className="border rounded relative">
          <p className="font-medium text-lg py-2 px-8 bg-green-500">
            {question.optionTwo.text}
          </p>
          <p className="pt-2">
            <span className="text-4xl">{votes2percentage}</span>
            <span className="text-2xl">%</span>
          </p>
          <p className="pb-2 px-24">
            {`(${votes2})`}
            {userVote2 && (
              <span className="text-xs text-white bg-green-800 rounded-full absolute px-2 py-1 right-2 bottom-2">
                you voted
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }, { id }) => {
  const question = questions[id];
  return {
    users,
    authedUser,
    question: question ? question : null,
  };
};

export default connect(mapStateToProps)(ViewPoll);
