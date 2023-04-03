import { useState } from "react";
import axios from "axios";
import Start from "./start";
import Questions from "./Questions";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState(undefined);
  function queryApi() {
    axios
      .get(`https://the-trivia-api.com/api/questions?limit=5`)
      .then((response) => {
        setQuestions(response.data);
      }), {once:true};
  }
  return (
    <div className="w-[100%] my-0 mx-auto flex justify-center h-[100vh] items-center flex-col">
      <svg
        width="297"
        height="235"
        viewBox="0 0 297 235"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-[-15%] right-[20%]"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M143.448 4.90596C184.961 1.77498 231.243 -9.72149 261.306 19.1094C294.581 51.0203 304.282 102.703 291.701 147.081C279.767 189.18 242.745 220.092 200.821 232.476C165.528 242.902 133.567 218.605 99.8993 203.738C63.6625 187.737 15.3588 182.993 3.25932 145.239C-9.35799 105.868 16.7305 64.5881 45.9358 35.3528C71.2672 9.99541 107.727 7.60006 143.448 4.90596Z"
          fill="#DEEBF8"
        />
      </svg>
      <svg
        width="270"
        height="273"
        viewBox="0 0 270 273"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-[-15%] left-[10%]"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M63.4095 213.395C35.1213 182.851 -2.68205 153.782 1.1728 112.307C5.43947 66.401 39.8541 26.6412 82.4192 8.86712C122.797 -7.99371 170.036 1.74417 205.822 26.8506C235.947 47.9859 236.823 88.1244 246.141 123.729C256.17 162.051 282.521 202.811 260.501 235.779C237.539 270.159 188.991 275.432 147.931 270.768C112.318 266.723 87.7506 239.677 63.4095 213.395Z"
          fill="#FFFAD1"
        />
      </svg>
      {!questions && <Start onClick={queryApi} />}
      {questions && (
        <Questions questions={questions} setQuestions={setQuestions} />
      )}
    </div>
  );
}

export default App;
