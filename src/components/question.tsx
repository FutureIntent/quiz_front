import React from 'react';
import type { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';

function Question() {

    const quiz = useSelector((state: RootState) => state.quiz);
    const dispatch = useDispatch();

    const question = quiz.questionAmount > 0 ? quiz.questions[quiz.currentQuestion].question_text : '';

    return (
        <h2>
            { question }
        </h2>
        );
}

export default Question;