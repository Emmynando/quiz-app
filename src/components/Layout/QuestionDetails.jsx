import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postQuizData } from "../../store/quiz-action";
import { getDatabase } from "firebase/database";
import Card from "../UI/Card";
import styles from "./QuestionDetails.module.css";

function QuestionDetails() {
  const database = getDatabase();
  console.log(database);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(quizData(selector));
  // }, [dispatch]);

  return (
    <Card>
      <div className={styles.counter}>
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
      {/* {selector.map((item) => (
        <div className={styles["question-container"]}>
          <h3> {item.question}</h3>
          <ul>
            <li>
              <button> {item.items.option1} </button>
            </li>
            <li>
              <button> {item.items.option2} </button>
            </li>
            <li>
              <button> {item.items.option3} </button>
            </li>
            <li>
              <button> {item.items.option4} </button>
            </li>
          </ul>
        </div>
      ))} */}
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
