import { useReducer } from "react";
import Button from "./Button";
import Question from "./Question";

function reducer(state, { type, payload }) {
  //status
  //--> welcome
  //-->active
  //-->finished
  //-->restart
  switch (type) {
    case "setName":
      return { ...state, name: payload.name };
    case "start":
      return { ...state, status: "active" };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        count:
          state.answer === state.questions[state.index].correctAnswer
            ? state.count + 1
            : state.count,
      };
    case "getAnswer":
      return { ...state, answer: payload.answer };
    case "finish":
      return {
        ...state,
        status: "finished",
        count:
          state.answer === state.questions[state.index].correctAnswer
            ? state.count + 1
            : state.count,
      };
    case "restart":
      return { ...state, ...initialState };
    default:
      return {};
  }
}

const initialState = {
  name: "",
  index: 0,
  count: 0,
  status: "welcome",
  questions: [
    {
      id: 1,
      title: "who is name?",
      options: ["naz", "erke", "hello"],
      correctAnswer: "naz",
    },
    {
      id: 2,
      title: "who is name?",
      options: ["naz2", "erke", "hello"],
      correctAnswer: "naz2",
    },
    {
      id: 3,
      title: "who is name?",
      options: ["naz3", "erke", "hello"],
      correctAnswer: "naz3",
    },
  ],
};

function App() {
  const [{ name, status, questions, index, count }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <main>
      <h1>Quiz App</h1>
      <div className="quiz-box">
        <div className="quiz-content">
          {status === "welcome" && (
            <>
              <label>Enter your name: </label>
              <input
                value={name}
                onChange={(e) =>
                  dispatch({
                    type: "setName",
                    payload: { name: e.target.value },
                  })
                }
                type="text"
                placeholder="Nazerke Kulan"
              />
              <Button onClick={() => dispatch({ type: "start" })}>
                Start Quiz
              </Button>
            </>
          )}
          {status === "active" && (
            <>
              <Question question={questions[index]} dispatch={dispatch} />
              {index === questions.length - 1 ? (
                <Button onClick={() => dispatch({ type: "finish" })}>
                  Finish Quiz
                </Button>
              ) : (
                <Button onClick={() => dispatch({ type: "nextQuestion" })}>
                  Next Question
                </Button>
              )}
            </>
          )}
          {status === "finished" && (
            <>
              <label>Congrats {name}! You completed the quiz! </label>
              <label>
                {count} / {questions.length}
              </label>

              <Button onClick={() => dispatch({ type: "restart" })}>
                Restart Quiz
              </Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
