import React, { useContext, useEffect } from 'react';
import type { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { AppCtx } from '../context/fetch_URL';
import { storeAmount, storeMessage, storeQuestions } from '../features/quiz/quizSlice';
import Error from './error';

function Question() {

    const quiz = useSelector((state: RootState) => state.quiz);
    const dispatch = useDispatch();

    const url: string | undefined = useContext(AppCtx)?.url;
    const message = quiz.message;

    const question: string = quiz.questionAmount > 0 ? quiz.questions[quiz.currentQuestion].question_text : '';

    useEffect(() => {
        fetch(url + `/quiz/questions/${quiz.selected_test}`, {
            method: "get",
            mode: 'cors',
        })
            .then(res => res.json())
            .then(res => {
                dispatch(storeMessage(res.message));
                dispatch(storeQuestions(res.questions));
                dispatch(storeAmount(res.questions.length));
            })
            .catch(err => console.log(err))
    }, [quiz.currentQuestion]);

    return (
        <h2>
            {question}
        </h2>
        );
}

export default Question;