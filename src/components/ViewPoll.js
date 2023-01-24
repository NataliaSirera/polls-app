import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/helpers";
import { handleAddAnswer } from "../actions/questions";
import Navbar from "./Navbar";

const ViewPoll = ({ dispatch, questions, authedUserAvatarURL, authedUser }) => {
  const { id } = useParams();

  if (questions[id] === undefined) {
    // TODO redirect to 404
    return <p>This question doesn't exist</p>;
  }

  let question = questions[id];
  question.userVote1 = question.optionOne.votes.includes(authedUser);
  question.userVote2 = question.optionTwo.votes.includes(authedUser);
  question.hasVoted = question.userVote1 || question.userVote2;
  question.votes1 = question.optionOne.votes.length;
  question.votes2 = question.optionTwo.votes.length;
  question.votesTotal = question.votes1 + question.votes2;
  question.votes1percentage = Math.round(
    (question.votes1 / question.votesTotal) * 100,
    0
  );
  question.votes2percentage = Math.round(
    (question.votes2 / question.votesTotal) * 100,
    0
  );

  const handleVote = (e, id) => {
    e.preventDefault();
    dispatch(handleAddAnswer(authedUser, id, e.target.value));
  };

  return (
    <div>
      <Navbar currentPage={"home"} />
      <div className="text-center px-8">
        <h1 className="text-3xl font-bold mt-8 mb-2">
          Poll by {question.author}
        </h1>
        <p className="text-sm text-gray-400 mb-4">
          {formatDate(question.timestamp)}
        </p>
        <img
          className="h-24 w-24 mx-auto"
          src={authedUserAvatarURL}
          alt={`Avatar of ${question.author}`}
        />
        <p className="text-2xl my-4 font-medium">Would you rather ... ? </p>
        <div className="grid grid-cols-2 gap-8 mx-auto max-w-screen-xl">
          <div className="border rounded relative">
            <button
              className={`font-medium text-lg py-2 px-8 w-full ${
                question.hasVoted
                  ? "bg-green-500"
                  : "bg-green-300 hover:bg-green-500"
              }`}
              disabled={question.hasVoted}
              onClick={(e) => handleVote(e, question.id)}
              value="optionOne"
            >
              {question.optionOne.text}
            </button>
            {question.hasVoted && (
              <div>
                <p className="pt-2">
                  <span className="text-4xl">{question.votes1percentage}</span>
                  <span className="text-2xl">%</span>
                </p>
                <p className="pb-2 px-24">
                  {`(${question.votes1})`}
                  {question.userVote1 && (
                    <span className="text-xs text-white bg-green-800 rounded-full absolute px-2 py-1 right-2 bottom-2">
                      you voted
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
          <div className="border rounded relative">
            <button
              className={`font-medium text-lg py-2 px-8 w-full ${
                question.hasVoted
                  ? "bg-green-500"
                  : "bg-green-300 hover:bg-green-500"
              }`}
              disabled={question.hasVoted}
              onClick={(e) => handleVote(e, question.id)}
              value="optionTwo"
            >
              {question.optionTwo.text}
            </button>
            {question.hasVoted && (
              <div>
                <p className="pt-2">
                  <span className="text-4xl">{question.votes2percentage}</span>
                  <span className="text-2xl">%</span>
                </p>
                <p className="pb-2 px-24">
                  {`(${question.votes2})`}
                  {question.userVote2 && (
                    <span className="text-xs text-white bg-green-800 rounded-full absolute px-2 py-1 right-2 bottom-2">
                      you voted
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }) => {
  return {
    authedUser,
    authedUserAvatarURL: users[authedUser]?.avatarURL,
    questions,
  };
};

export default connect(mapStateToProps)(ViewPoll);
