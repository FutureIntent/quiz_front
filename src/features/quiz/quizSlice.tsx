import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Quiz {
    message: String,
    tests: any[],
    user_name: string,
    selected_test: number
}

const initialState: Quiz = {
    message: '',
    tests: [],
    user_name: '',
    selected_test: -1
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
        }
    }
})

export const { storeQuiz,storeName, storeTest, storeMessage } = quizSlice.actions

export default quizSlice.reducer