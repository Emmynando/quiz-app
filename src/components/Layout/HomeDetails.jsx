import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebaseConfig/firebase";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import styles from "./HomeDetails.module.css";
import Card from "../UI/Card";
import QuestionDetails from "../Layout/QuestionDetails";

function HomeDetails() {
  // use state effect for fetching quiz state
  const [quizState, setQuizState] = useState([]);

  // firebase database configuration
  const quizCollection = collection(db, "quiz");

  // This effect fetches quiz data from firebase on every reload
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = await getDocs(quizCollection);
        // creating variable for mapping data which is passed to the use state hook
        const filteredData = data.docs.map((docs) => ({
          ...docs.data(),
          id: docs.id,
        }));
        setQuizState(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuizData();
  }, []);

  const quizStateLength =
    quizState.length >= 1
      ? "Select any from the quizes below"
      : "No avaialable Quiz at the moment";

  // function for deleting data from firebase
  async function deleteQuiz(id) {
    try {
      const quizDoc = doc(db, "quiz", id);
      const data = await getDocs(quizCollection);
      const docSnap = await getDoc(quizDoc);
      if (docSnap.exists()) {
        // declaring registered password
        const { password } = docSnap.data();
        const auth = prompt("Input Password? ");
        // prompting user for password
        if (auth === password) {
          // deleting quiz
          await deleteDoc(quizDoc);
          alert("quiz successfully deleted");
        } else {
          // alert for if password do not match
          alert("Password do not match");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card>
      <div className={styles["home-container"]}>
        <h2>Ready for a Quiz?</h2>
        <h4> {quizStateLength}</h4>
      </div>
      <div className={styles["list-container"]}>
        {quizState.map((quiz) => (
          <div className={styles["quiz-item"]} key={quiz.id}>
            <Link to={`/${quiz.id}`}>
              <h5> {quiz.title}</h5>
              <p>{quiz.description}</p>
            </Link>
            <div>
              <button>
                <Link to={`/${quiz.id}`}>Edit</Link>
              </button>
              <button onClick={() => deleteQuiz(quiz.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default HomeDetails;
