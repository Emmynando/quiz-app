import { createSlice } from "@reduxjs/toolkit";

const initialQuizState = {
  id: "",
  password: "",
  title: "",
  description: "",
  time: 0,
  marks: 0,
  questions: [],
  changed: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState: initialQuizState,
  reducers: {
    fetchQuiz(state, action) {
      return {
        ...state,
        password: action.payload?.password || "",
        title: action.payload?.title || "",
        time: action.payload?.time || 0,
        marks: action.payload?.marks || 0,
        questions: action.payload?.questions || [],
      };
    },
    addQuiz(state, action) {
      const newItem = action.payload;
      const newQuestion = [
        {
          question: newItem.question || "",
          option1: newItem.option1 || "",
          option2: newItem.option2 || "",
          option3: newItem.option3 || "",
          option4: newItem.option4 || "",
          answer: newItem.answer || "",
        },
      ];
      return {
        ...state,
        id: crypto.randomUUID(),
        password: action.payload?.password || "",
        title: action.payload?.title || "",
        description: action.payload?.description || "",
        time: action.payload?.time || 0,
        marks: action.payload?.marks || 0,
        changed: true,
        questions: [
          {
            question: newItem.question || "",
            option1: newItem.option1 || "",
            option2: newItem.option2 || "",
            option3: newItem.option3 || "",
            option4: newItem.option4 || "",
            answer: newItem.answer || "",
          },
        ],
      };
    },
  },
});

export const quizActions = quizSlice.actions;
export default quizSlice.reducer;
