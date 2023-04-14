import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig/firebase";
import { doc, getDoc } from "firebase/firestore";

import Card from "../UI/Card";
import styles from "./QuestionDetails.module.css";

function QuestionDetails(props) {
  // declaring the ID using params
  const params = useParams();

  const [quizIndex, setQuizIndex] = useState(0);

  // state management for question array
  const [question, setQuestion] = useState([]);

  // state management for timer
  const [timer, setTimer] = useState(0);

  // state management for marks
  const [isMarks, setIsMarks] = useState(0);

  // redering quiz to be taken using the ID
  const getQuizId = params.quizSection;

  // This effect fetches quiz data from firebase on every reload
  useEffect(() => {
    const docRef = doc(db, "quiz", getQuizId);

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

    if (timer === 0) {
      clearInterval(timeout);
    }

    return () => clearInterval(timeout);
  }, [timer]);

  // extracting the questions for map
  const quiz = question?.questions ?? [];
  const quizAnswer = quiz.filter((item) => item?.answer);
  // console.log(quizAnswer);

  let intialQuizScore = 0;
  // function for verifying Answer
  function answerHandler(e) {
    const selectedOption = e.target.textContent.toLowerCase();
    const quizElement = quizAnswer.map((element) =>
      element["answer"].toLowerCase()
    );

    // converting object to string since selected option is a string
    const jsonQuizElement = JSON.parse(quizElement);
    console.log(typeof jsonQuizElement);
    console.log(typeof selectedOption);

    if (jsonQuizElement.includes(selectedOption)) {
      alert("Correct");
    } else {
      alert("wrong");
    }
  }

  return (
    <Card>
      <div className={styles.counter}>
        <div className={styles["time-counter"]}>
          <p> {timer}secs</p>
        </div>

        <div className={styles["score-counter"]}>
          <p>
            {intialQuizScore}
            <span> marks</span>
          </p>
        </div>
      </div>
      {quiz.map((item) => (
        <div className={styles["question-container"]} key={item.question}>
          <h3> {item.question}</h3>
          <ul>
            <li>
              <button onClick={answerHandler} name={item?.option1}>
                {" "}
                {item?.option1}
              </button>
            </li>
            <li>
              <button onClick={answerHandler} name={item?.option2}>
                {" "}
                {item?.option2}{" "}
              </button>
            </li>
            <li>
              <button onClick={answerHandler} name={item?.option3}>
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
