import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig/firebase";
import { doc, getDoc } from "firebase/firestore";
import ScoreBoard from "./ScoreBoard";

import Card from "../UI/Card";
import styles from "./QuestionDetails.module.css";

function QuestionDetails(props) {
  // declaring the ID using params
  const params = useParams();

  // state management for question array
  const [question, setQuestion] = useState([]);

  // state management for showing score
  const [showScore, setShowScore] = useState(false);

  // state management for timer
  const [timer, setTimer] = useState(0);

  // state management for marks
  const [isMarks, setIsMarks] = useState(0);
  const [count, setCount] = useState(0);

  let index = 0;
  // redering quiz to be taken using the ID
  // const getQuizId = params.quizSection;
  const questionId = params.quizSection;
  const currentQuestion = `${questionId}/${index}`;

  // This effect fetches quiz data from firebase on every reload
  useEffect(() => {
    const docRef = doc(db, "quiz", questionId);

    getDoc(docRef).then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        // converting time to number
        const dataTime = Number(data.time);
        // convertTing marks to number
        const dataMarks = Number(data.marks);
        setIsMarks(dataMarks);
        setQuestion(data);
        setTimer(dataTime);
      }
    });
  }, []);

  // use effect for countdown timer

  useEffect(() => {
    const timeout = setInterval(() => {
      return setTimer((timer) => timer - 1);
    }, 1000);

    // displayimg score when timer runs out
    if (timer < 0) {
      setShowScore(true);
    }

    // stops timer from running when timer runs runs out
    if (timer < 0) {
      clearInterval(timeout);
    }

    return () => clearInterval(timeout);
  }, [timer]);

  // extracting the questions for map
  const quiz = question?.questions ?? [];

  let initialQuizScore = 0;
  // function for verifying Answer
  function answerHandler(e, correctAnswer) {
    const selectedOption = e.target.textContent.toLowerCase();

    // restarting timer
    const restartTime = Number(question.time);

    // conparing selected answer to correct answer
    if (correctAnswer.toLowerCase().trim() === selectedOption.trim()) {
      alert("Correct");
      setCount(count + isMarks);
      setTimer(restartTime);
    } else {
      alert("wrong");
      setShowScore(true);
    }
  }

  return (
    <Card>
      {showScore && <ScoreBoard score={count} />}
      <div className={styles.counter}>
        <div className={styles["time-counter"]}>
          <p> {timer}secs</p>
        </div>

        <div className={styles["score-counter"]}>
          <p>
            {count}
            <span> marks</span>
          </p>
        </div>
      </div>
      {quiz.map((item) => (
        <div className={styles["question-container"]} key={item.question}>
          <h3> {item.question}</h3>
          <ul>
            <li>
              <button
                onClick={(e) => answerHandler(e, item?.answer)}
                name={item?.option1}
              >
                {" "}
                {item?.option1}
              </button>
            </li>
            <li>
              <button
                onClick={(e) => answerHandler(e, item?.answer)}
                name={item?.option2}
              >
                {" "}
                {item?.option2}{" "}
              </button>
            </li>
            <li>
              <button
                onClick={(e) => answerHandler(e, item?.answer)}
                name={item?.option3}
              >
                {" "}
                {item?.option3}{" "}
              </button>
            </li>
          </ul>
        </div>
      ))}
    </Card>
  );
}

export default QuestionDetails;
