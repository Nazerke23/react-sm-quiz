import Button from "./Button";

function Question({ question, dispatch }) {
  return (
    <div className="question">
      <h2>{question.title}</h2>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            onClick={() =>
              //DO NOT EVER NEVER FORGOT TO PUT CALL BACK FUNCTION HERE
              dispatch({
                type: "getAnswer",
                payload: { answer: option },
              })
            }
            key={index}
            className="btn btn-option"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
