import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { db } from "../../firebaseConfig/firebase";
import { addDoc, collection } from "firebase/firestore";

import Card from "../UI/Card";
import styles from "./FormDetails.module.css";

function FormDetails() {
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  // using formhook to handle state
  const { register, handleSubmit, control, formState } = useForm({
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

  // variable for handling error in react-form
  const { errors } = formState;
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
      setShowDialog(true);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Card>
      <h2 className={styles.title}> Create Quiz</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submitHandler)} noValidate>
          <div className={styles["form-details"]}>
            <label htmlFor="password">Create Password</label>
            <input
              type="password"
              placeholder="minimum 8 characters"
              minLength={8}
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "minimum of 8 characters",
                },
              })}
              onChange={submitHandler}
            />
            <p className={styles.error}>
              {showDialog && errors.password?.message}
            </p>
            <label htmlFor="title">Question Title</label>
            <input
              type="text"
              placeholder="Title"
              maxLength={52}
              {...register("title", {
                required: "Title is required",
              })}
              onChange={submitHandler}
            />
            <p className={styles.error}>{errors.title?.message}</p>
            <label htmlFor="description">
              Input Question description below
            </label>
            <input
              type="text"
              placeholder="Description"
              maxLength={80}
              {...register("description", {
                required: "Description is required",
              })}
              onChange={submitHandler}
            />
            <p className={styles.error}>{errors.description?.message}</p>
            <label htmlFor="description">Input Point Grading system</label>
            <input
              type="number"
              placeholder="Marks per Question"
              maxLength={2}
              {...register("marks", {
                valueAsNumber: true,
                message: "marks must be a number or not more than 2 figures",
              })}
              onChange={submitHandler}
            />
            <p className={styles.error}>
              {showDialog && errors.marks?.message}
            </p>
            <label htmlFor="time">Input Time limit(in seconds)</label>
            <input
              type="number"
              placeholder="Time in seconds"
              maxLength={2}
              {...register("time", {
                valueAsNumber: true,
                message: "Time is required or not more than 60seconds",
              })}
              onChange={submitHandler}
            />
            <p className={styles.error}>{showDialog && errors.time?.message}</p>
          </div>
          <div className={styles["form-container"]}>
            {fields.map((field, index) => {
              return (
                <div className={styles["form-block"]} key={field.id}>
                  <input
                    type="text"
                    placeholder="Your question"
                    maxLength={150}
                    {...register(`questions.${index}.question`, {
                      required: "Question is required",
                    })}
                    onChange={submitHandler}
                  />
                  <p className={styles.error}>
                    {showDialog && errors.questions?.message}
                  </p>
                  <input
                    type="text"
                    placeholder="Option 1"
                    maxLength={52}
                    {...register(`questions.${index}.option1`, {
                      required: true,
                    })}
                  />
                  {/* <p className={styles.error}>{errors.option1?.message}</p> */}
                  <input
                    type="text"
                    placeholder="Option 2"
                    maxLength={52}
                    {...register(`questions.${index}.option2`, {
                      required: true,
                    })}
                  />
                  <input
                    type="text"
                    placeholder="Option 3"
                    maxLength={52}
                    {...register(`questions.${index}.option3`, {
                      required: true,
                    })}
                  />
                  <input
                    className={styles.answer}
                    type="text"
                    placeholder="answer"
                    maxLength={52}
                    {...register(`questions.${index}.answer`, {
                      required: true,
                    })}
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
