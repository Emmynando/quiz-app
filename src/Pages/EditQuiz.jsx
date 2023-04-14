import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig/firebase";
import {
  collection,
  updateDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import styles from "../components/Layout/FormDetails.module.css";
import Card from "../components/UI/Card";
function EditQuizPage() {
  const params = useParams();

  const [quizState, setQuizState] = useState([]);
  const quizCollection = collection(db, "quiz");

  const editQuizId = params.editQuiz;
  console.log(editQuizId);
  // This effect fetches quiz data from firebase on every reload
  useEffect((id) => {
    const docRef = doc(db, "quiz", editQuizId);
    getDoc(docRef).then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setQuizState(data);
        console.log(data);
        // password = data.password;
        // title.value = data.title;
        // descriptionm = data.description;
        // time = data.time;
        // marks = data.marks;
      }

      // const quizStateArray = doc.data();
      // const { questions } = quizStateArray;
      // console.log(doc.data(), doc.editQuizId);
      // });
      // onSnapshot(docRef, (doc) => {
      //   const quizStateArray = [doc.data(), doc.editQuizId];
      // setQuizState(quizStateArray);
      // console.log(questions);
    });
  }, []);

  const docRef = doc(db, "quiz", editQuizId);
  console.log(docRef);
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      password: "",
      title: "",
      description: "",
      time: "",
      marks: "",
      questions: [
        {
          question: "",
          option1: "",
          option2: "",
          option3: "",
          answer: "",
        },
      ],
    },
  });
  const methods = useForm();
  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control,
  });

  // function for editing data from firebase
  // async function submitHandler(id, formdata) {
  //   try {
  //     const quizDoc = doc(db, "quiz", id);
  //     await updateDoc(quizDoc, {
  //       password: formdata.password,
  //       title: formdata.title,
  //       description: formdata.description,
  //       time: formdata.time,
  //       marks: formdata.marks,
  //       questions: formdata.questions,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  function submitHandler() {}

  return (
    <Card>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={styles["form-details"]}>
          <label htmlFor="password">Create Password</label>
          <input
            type="text"
            placeholder="password"
            minLength={8}
            {...register("password")}
            onChange={submitHandler}
          />
          <label htmlFor="title">Question Title</label>
          <input
            type="text"
            placeholder="Title"
            maxLength={30}
            {...register("title")}
            onChange={submitHandler}
          />
          <label htmlFor="description">Input Question description below</label>
          <input
            type="text"
            placeholder="Description"
            maxLength={30}
            {...register("description")}
            onChange={submitHandler}
          />
          <label htmlFor="description">Input Point Grading system</label>
          <input
            type="text"
            placeholder="Marks per Question"
            maxLength={2}
            {...register("marks")}
            onChange={submitHandler}
          />
          <label htmlFor="time">Input Time limit(in seconds)</label>
          <input
            type="text"
            placeholder="Time in seconds"
            maxLength={2}
            {...register("time")}
            onChange={submitHandler}
          />
        </div>
        {/* <div className={styles["form-container"]}>
            {fields.map((field, index) => {
              return (
                <div className={styles["form-block"]} key={field.id}>
                  <input
                    type="text"
                    placeholder="Your question"
                    maxLength={30}
                    {...register(`questions.${index}.question`)}
                    onChange={submitHandler}
                  />
                  <input
                    type="text"
                    placeholder="Option 1"
                    maxLength={30}
                    {...register(`questions.${index}.option1`)}
                  />
                  <input
                    type="text"
                    placeholder="Option 2"
                    maxLength={30}
                    {...register(`questions.${index}.option2`)}
                  />
                  <input
                    type="text"
                    placeholder="Option 3"
                    maxLength={30}
                    {...register(`questions.${index}.option3`)}
                  />
                  <input
                    className={styles.answer}
                    type="text"
                    placeholder="answer"
                    maxLength={30}
                    {...register(`questions.${index}.answer`)}
                  />
                  {index > 0 && (
                    <button onClick={() => remove(index)}>-</button>
                  )}
                </div>
              );
            })}
          </div> */}
        <button
          type="button"
          onClick={() => append({ question: "", option: "" })}
        >
          More question
        </button>
        <button> Submit </button>
      </form>
    </Card>
  );
}

export default EditQuizPage;
