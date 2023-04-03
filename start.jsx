export default function Start({ onClick }) {
  return (
    <div className="text-center">
      <h2 className="text-5xl text-center my-5 text-[#4D5B9E]">Quizzical</h2>
      <p className="text-xl text-center my-5">Start the quiz</p>
      <button
        className="bg-[#4D5B9E] w-[10vw] h-[5vh] rounded-[12px] hover:rounded-[2.5vh] transition-all text-white my-5"
        onClick={onClick}
      >
        Start Quiz
      </button>
    </div>
  );
}
