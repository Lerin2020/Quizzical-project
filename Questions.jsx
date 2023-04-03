import { useState } from "react";

function Questions({ questions, setQuestions }) {
  const [isShown, toggleShown] = useState(false);
  const [score, incrementScore] = useState(0);
  const [correct, setOptions] = useState([]);
  const [currentArray, setCurrentArray] = useState([]);
  let styles;
  let choseStyles =
    "bg-[#d6dbf5] text-[#293264] hover:bg-[#293264] border-[#d6dbf5]";
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <>
      {questions.map((question, index) => {
        let [currentOptions, setCurrentOptions] = useState(
          shuffle([
            {
              option: question.correctAnswer,
              status: true,
              isChossen: false,
              index: index,
            },
            ...question.incorrectAnswers.map((option) => {
              return {
                option: option,
                status: false,
                isChossen: false,
                index: index,
              };
            }),
          ])
        );
        return (
          question.incorrectAnswers && (
            <div key={index} className="inline-block text-left w-[80%] mt-2">
              <div className="text-xl font-bold text-[#293264] my-2">
                {question.question}
              </div>
              <div>
                {currentOptions.map((answer, index) => (
                  <button
                    key={index}
                    index={index}
                    disabled={isShown}
                    className={`mx-2  text-[#293264] rounded-xl px-2 py-1 my-2 text-sm border-[1px] border-[#293264] hover:bg-[#D6DBF5] hover:border-transparent transition-all active:bg-[#D6DBF5] active:text-[#293264] ${
                      answer.isChossen ? choseStyles : `bg-[white]`
                    }`}
                    style={
                      isShown
                        ? {
                            backgroundColor:
                              answer.status && answer.isChossen
                                ? "#94D7A2"
                                : answer.isChossen && !answer.status
                                ? "#F8BCBC"
                                : answer.status
                                ? "#d6dbf5"
                                : "",
                            color: "#293264",
                            border:
                              !answer.isChossen && !answer.status
                                ? ""
                                : "transparent",
                          }
                        : {}
                    }
                    onClick={(e) => {
                      currentOptions.map((option) => {
                        option.isChossen = false;
                      });
                      let chosen = currentOptions.filter(
                        (optionObj) => optionObj.option == e.target.innerText
                      )[0];
                      chosen.isChossen = true;
                      currentOptions = [...currentOptions];
                      setCurrentOptions([...currentOptions]);
                      setCurrentArray((prev) => [
                        ...prev.filter(
                          (prevObj) =>
                            !(prevObj.index === currentOptions[0].index)
                        ),
                        ...currentOptions,
                      ]);
                    }}
                  >
                    {answer.option}
                  </button>
                ))}
              </div>
              {index != questions.length - 1 && <hr className="mt-2" />}
            </div>
          )
        );
      })}
      <div className="flex items-center justify-between mt-10">
        {isShown && (
          <div className="font-bold text-xl text-[#293264] mr-5">
            You scored {score}/5 correct answers
          </div>
        )}
        <button
          className="bg-[#4D5B9E] w-[10vw] h-[5vh] rounded-[12px] hover:rounded-[2.5vh] transition-all text-white"
          onClick={() => {
            if (isShown) {
              setQuestions(undefined);
              toggleShown(false);
              incrementScore(0);
            } else {
              toggleShown(true);
              currentArray.map((obj) => {
                return obj.status && obj.isChossen
                  ? incrementScore((prev) => prev + 1)
                  : incrementScore((prev) => prev + 0);
              });
            }
          }}
        >
          {isShown ? "Play Again" : "Check Answers"}
        </button>
      </div>
    </>
  );
}

export default Questions;
