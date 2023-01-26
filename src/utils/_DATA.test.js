import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA.js";

describe("_saveQuestion", () => {
  it("returns a formatted question if a question is passed", async () => {
    const question = {
      optionOneText: "optionOneText",
      optionTwoText: "optionTwoText",
      author: "sarahedo",
    };
    const formattedQuestion = await _saveQuestion(question);
    expect(formattedQuestion).toHaveProperty("id");
    expect(formattedQuestion).toHaveProperty("timestamp");
    expect(formattedQuestion.author).toEqual(question.author);
    expect(formattedQuestion.optionOne.text).toEqual(question.optionOneText);
    expect(formattedQuestion.optionOne.votes).toEqual([]);
    expect(formattedQuestion.optionTwo.text).toEqual(question.optionTwoText);
    expect(formattedQuestion.optionTwo.votes).toEqual([]);
  });

  it("verify questions have a new question if a question is passed", async () => {
    const question = {
      optionOneText: "optionOneText",
      optionTwoText: "optionTwoText",
      author: "sarahedo",
    };
    const formattedQuestion = await _saveQuestion(question);
    const questions = await _getQuestions();
    expect(questions[formattedQuestion.id].author).toEqual(question.author);
    expect(questions[formattedQuestion.id].optionOne.text).toEqual(
      question.optionOneText
    );
    expect(questions[formattedQuestion.id].optionTwo.text).toEqual(
      question.optionTwoText
    );
  });

  it("returns an error if an incorrect question is passed", async () => {
    const question = {
      author: "sarahedo",
    };
    await _saveQuestion(question).catch((e) =>
      expect(e).toEqual(
        "Please provide optionOneText, optionTwoText, and author"
      )
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("returns true if an answer is passed", async () => {
    const answer = {
      authedUser: "sarahedo",
      qid: "vthrdm985a262al8qx3do",
      answer: "optionOne",
    };
    const response = await _saveQuestionAnswer(answer);
    expect(response).toBeTruthy();
  });

  it("verify users have a new answer if an answer is passed", async () => {
    const answer = {
      authedUser: "sarahedo",
      qid: "vthrdm985a262al8qx3do",
      answer: "optionOne",
    };
    await _saveQuestionAnswer(answer);
    const users = await _getUsers();
    expect(users[answer.authedUser].answers[answer.qid]).toEqual(answer.answer);
  });

  it("verify questions have a new answer if an answer is passed", async () => {
    const answer = {
      authedUser: "sarahedo",
      qid: "vthrdm985a262al8qx3do",
      answer: "optionOne",
    };
    await _saveQuestionAnswer(answer);
    const questions = await _getQuestions();
    expect(questions[answer.qid][answer.answer].votes).toContain(
      answer.authedUser
    );
  });

  it("returns error if an incorrect answer is passed", async () => {
    const answer = {
      authedUser: "sarahedo",
    };
    await _saveQuestionAnswer(answer).catch((e) =>
      expect(e).toEqual("Please provide authedUser, qid, and answer")
    );
  });
});
