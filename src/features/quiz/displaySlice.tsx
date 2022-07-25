import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Display {
    menu: boolean,
    quiz: boolean,
    finish: boolean
}

const initialState: Display = {
    menu: true,
    quiz: false,
    finish: false
}

export const displaySlice = createSlice({
    name: 'display',
    initialState,
    reducers: {
        displayMenu: (state, action: PayloadAction<boolean>) => {
            state.menu = action.payload;
        },
        displayQuiz: (state, action: PayloadAction<boolean>) => {
            state.quiz = action.payload;
        },
        displayFinish: (state, action: PayloadAction<boolean>) => {
            state.finish = action.payload;
        }
    }
});

export const { displayMenu, displayQuiz, displayFinish } = displaySlice.actions;

export default displaySlice.reducer;


