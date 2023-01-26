import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA.js";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function saveQuestionAnswer(authedUser, qid, answer) {
  return _saveQuestionAnswer({ authedUser, qid, answer });
}

export function authenticate(username, password) {
  return new Promise((resolve, reject) => {
    _getUsers().then((users) => {
      let user = undefined;
      if (users) {
        user = Object.values(users).find(
          (user) => user.id === username && user.password === password
        );
      }
      if (user !== undefined) {
        resolve(true);
      } else {
        reject("The username or password is incorrect");
      }
    });
  });
}
