import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { db } from "../../firebaseConfig/firebase";
import { addDoc, collection } from "firebase/firestore";

import Card from "../UI/Card";
import styles from "./FormDetails.module.css";

function FormDetails() {
  const [updateMovie, setUpdateMovie] = useState({});
  const navigate = useNavigate();
  // using formhook to handle state
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      password: "",
      title: "",
      description: "",
      time: "",
      marks: "",
      questions: [
        { question: "", option1: "", option2: "", option3: "", answer: "" },
      ],
    },
  });
  const methods = useForm();
  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control,
  });
  const quizCollection = collection(db, "quiz");

  // function handler for dispatching formdata to firebase
  async function submitHandler(formdata) {
    // console.log(formdata);
    try {
      await addDoc(quizCollection, {
        password: formdata.password,
        title: formdata.title,
        description: formdata.description,
        time: formdata.time,
        marks: formdata.marks,
        questions: formdata.questions,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Card>
      <h2 className={styles.title}> Create Quiz</h2>
      <FormProvider {...methods}>
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
            <label htmlFor="description">
              Input Question description below
            </label>
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
          <div className={styles["form-container"]}>
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
          </div>
          <button
            type="button"
            onClick={() => append({ question: "", option: "" })}
          >
            More question
          </button>
          <button> Submit </button>
        </form>
      </FormProvider>
    </Card>
  );
}

export default FormDetails;
