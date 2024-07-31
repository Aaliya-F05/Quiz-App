import { useEffect, useState } from "react";
import "../styles/css/quizCard.scss";
import { quiz } from "../services/QuestionBank";

function QuizCard({ level, username, backHome }) {
  let usersDatas = JSON.parse(localStorage.getItem("usersDatas")) || [];
  const [userAnswer, setUserAnswer] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [optionDisabled, setOptionDisabled] = useState(false);
  const [result, setResult] = useState({ score: 0, correct: 0, wrong: 0 });
  const [showScore, setShowScore] = useState(false);
  const [wrong,setWrong] = useState(false);

  const formattedLevel = level.toLowerCase();
  const quizData = quiz.levels[formattedLevel];
  const { choices } = quizData.questions[currentQuestion];

  useEffect(() => {
    console.log(result);
  }, [result]);

  const handleNext = () => {
    if (currentQuestion < quizData.totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(userAnswer[currentQuestion + 1]?.answerNo || "");
      setOptionDisabled(false);
      setWrong(false);
    }
    else {
      setShowScore(true);
      const userExists = usersDatas.findIndex((user) => user.userName === username);
      if (userExists !== -1) {
        if (usersDatas[userExists].score < result.score) {
          usersDatas[userExists].score = result.score;
        }
      }
      else {
        usersDatas.push({
          userName: username,
          score: result.score,
        });
      }
      localStorage.setItem("usersDatas", JSON.stringify(usersDatas));
      console.log(usersDatas)
    }
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setOptionDisabled(true);
    const newUserAnswer = [...userAnswer];
    newUserAnswer[currentQuestion] = { questionNo: currentQuestion, answerNo: answer };
    setUserAnswer(newUserAnswer);
    if (answer === quizData.questions[currentQuestion].correctAnswer) {
      setResult((prev) => ({ ...prev, correct: prev.correct + 1, score: prev.score + quizData.perQuestionScore }));
    }
    else{
      setWrong(true);
    }
  };

  return (
    <div className="quiz-container">

      {
        showScore ?
          <div className="board-main-container">
            <div className="score-board">
              <div className="score-board-message">
                <h2>Congratulations !</h2>
                <h2>You&apos;ve completed {level} Level Quiz</h2>
              </div>
              <div className="score-content">
                <div className="user-content">
                  <img src="https://avatar.iran.liara.run/public/38"></img>
                  <h3>{username}</h3>
                </div>
                <ul>
                  <li>Your Total Score : {result.score}</li>
                  <li>Correct Answers : {result.correct}</li>
                  <li>Wrong Answers : {result.wrong}</li>
                </ul>
              </div>
            </div>
            <button className="back-btn" onClick={backHome} >Back to Home</button>
          </div>
          :
          <div className="card-container">
            <div className="card-header">
              <p className="quiz-number">
                <span className="current-question">{String(currentQuestion + 1).padStart(2, 0)}</span>
                &#47;{String(quizData.totalQuestions).padStart(2,0)}
              </p>
              <p className="level-title">Level :<span> {level}</span></p>
            </div>
            <div className="card-content">
              <p className="question">{quizData.questions[currentQuestion].question}</p>
              <ul className="options">
                {choices.map((choice, index) => (
                  <li
                    key={index}
                    className={
                      selectedAnswer
                        ? choice === selectedAnswer
                          ? choice === quizData.questions[currentQuestion].correctAnswer
                            ? "correct"
                            : "wrong"
                          : ""
                        : ""
                    }
                    onClick={() => !optionDisabled && handleAnswer(choice)}
                    style={{ pointerEvents: optionDisabled ? "none" : "auto" }}
                  >
                    {selectedAnswer
                      ? choice === selectedAnswer
                        ? choice === quizData.questions[currentQuestion].correctAnswer
                          ? "Correct Answer"
                          : "Wrong Answer"
                        : choice
                      : choice}
                  </li>
                ))}
                { wrong ? <p>Correct Answer : { quizData.questions[currentQuestion].correctAnswer}</p> : <></>}
              </ul>
            </div>
            <div className="card-footer">
              <button className="next-btn" onClick={handleNext}>Next</button>
            </div>
          </div>
      }
    </div >
  );
}

export default QuizCard;