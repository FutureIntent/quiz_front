import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Quiz {
    message: string,
    tests: any[],
    user_name: string,
    selected_test: number,
    questions: any[],
    questionAmount: number,
    currentQuestion: number,
    options: any[],
    questionsOptions: { [key: number]: number },
    hideQuestion: boolean
}

interface QuestionsOptions {
    question: number,
    option: number
}

const initialState: Quiz = {
    message: '',
    tests: [],
    user_name: '',
    selected_test: -1,
    questions: [],
    questionAmount: 0,
    currentQuestion: 0,
    options: [],
    questionsOptions: {},
    hideQuestion: true
}

export const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        storeQuiz: (state, action: PayloadAction<Quiz>) => {
            state.message = action.payload.message;
            state.tests = action.payload.tests;
        },
        storeName: (state, action: PayloadAction<string>) => {
            state.user_name = action.payload;
        },
        storeTest: (state, action: PayloadAction<number>) => {
            state.selected_test = action.payload;
        },
        storeMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
        storeQuestions: (state, action: PayloadAction<any[]>) => {
            state.questions = action.payload;
        },
        storeQuestionAmount: (state, action: PayloadAction<number>) => {
            state.questionAmount = action.payload;
        },
        incrementCurrentQuestion: (state) => {
            state.currentQuestion++;
        },
        storeOptions: (state, action: PayloadAction<any[]>) => {
            state.options = action.payload;
        },
        storeQuestionsOptions: (state, action: PayloadAction<QuestionsOptions>) => {
            state.questionsOptions = { ...state.questionsOptions, [action.payload.question]: action.payload.option }
        },
        setHideQuestion: (state, action: PayloadAction<boolean>) => {
            state.hideQuestion = action.payload;
        }
    }  
})

export const { storeQuiz, storeName, storeTest,
    storeMessage, storeQuestions, storeQuestionAmount,
    incrementCurrentQuestion, storeOptions, storeQuestionsOptions,
    setHideQuestion } = quizSlice.actions

export default quizSlice.reducer