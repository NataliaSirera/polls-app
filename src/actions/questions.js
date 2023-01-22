import { saveQuestionAnswer } from "../utils/api";
import { addAnswerUser } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_ANSWER_QUESTION = "ADD_ANSWER_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function addAnswerQuestion(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
}

export function handleAddAnswer(authedUser, qid, answer) {
  return (dispatch) => {
    return saveQuestionAnswer(authedUser, qid, answer).then(() => {
      dispatch(addAnswerQuestion(authedUser, qid, answer));
      dispatch(addAnswerUser(authedUser, qid, answer));
    });
  };
}
