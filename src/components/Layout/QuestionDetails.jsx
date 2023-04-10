import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig/firebase";
import { doc, getDoc } from "firebase/firestore";

import Card from "../UI/Card";
import styles from "./QuestionDetails.module.css";

function QuestionDetails(props) {
  // declaring the ID using params
  const params = useParams();
  const [question, setQuestion] = useState([]);

  // redering quiz to be taken using the ID
  const getQuizId = params.quizSection;

  // This effect fetches quiz data from firebase on every reload
  useEffect(() => {
    const docRef = doc(db, "quiz", getQuizId);

    getDoc(docRef).then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setQuestion(data);
      }
    });
  }, []);

  const quiz = question.questions;

  // const quiz = question.questions;
  // const slicedQuiz = { ...quiz };

  // const mappedQuiz = Object.values(slicedQuiz);
  // console.log(mappedQuiz[0]);
  // const mappedQuizCopy = Object.fromEntries(Object.entries(slicedQuiz));
  // const mappedQuizCopyValues = Object.values(mappedQuizCopy);
  // // console.log(mappedQuizCopyValues[0]);

  // console.log(mappedQuiz?.answer);
  return (
    <Card>
      <div className={styles.counter}>
        <div className={styles["time-counter"]}>
          <p> {question.time}secs</p>
        </div>

        <div className={styles["score-counter"]}>
          <p>
            {question.marks}
            <span> marks</span>
          </p>
        </div>
        <div>
          <ul>
            {mappedQuizCopyValues?.map((item, index) => {
              return <li key={index}>{item[index]}</li>;
            })}
          </ul>
        </div>
      </div>
      {/* {mappedQuizCopyValues.map((item) => {
        <div className={styles["question-container"]}>
          <h3> {item.question}</h3>
          <ul>
            <li>
              <button> {item.option1} yea</button>
            </li>
            <li>
              <button> {item.option2} </button>
            </li>
            <li>
              <button> {item.option} </button>
            </li>
            <li>
              <button> {item.option4} </button>
            </li>
          </ul>
        </div>;
      })} */}
    </Card>
  );
}

export default QuestionDetails;

{
  /* <div className={styles.counter}>
  <div className={styles["time-counter"]}>
    <p> {selector.time}secs</p>
  </div>

  <div className={styles["score-counter"]}>
    <p>
      {selector.marks}
      <span> marks</span>
    </p>
  </div>
</div>
<div className={styles["question-container"]}>
  <h3> Questions</h3>
  <ul>
    <li>
      <button> answer 1 </button>
    </li>
    <li>
      <button> answer 2 </button>
    </li>
    <li>
      <button> answer 3 </button>
    </li>
    <li>
      <button> answer 4 </button>
    </li>
  </ul>
</div> */
}
