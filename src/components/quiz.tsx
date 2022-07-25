import React, { useEffect, useContext } from 'react';
import { AppCtx } from './../context/fetch_URL';
import type { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { storeQuestions, storeMessage, storeAmount } from './../features/quiz/quizSlice';
import Question from './question';
import Error from './error';

function Quiz() {

    const quiz = useSelector((state: RootState) => state.quiz);
    const dispatch = useDispatch();

    const url: string | undefined = useContext(AppCtx)?.url;
    const message = quiz.message;

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
    }, []);

    return (
        <div>
            <Question />
            <Error message={message} />
        </div>
    );
}

export default Quiz;