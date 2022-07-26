import React, { useContext, useEffect } from 'react';
import type { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { AppCtx } from '../../context/fetch_URL';
import { storeQuestionAmount, storeMessage, storeQuestions } from '../../features/quiz/quizSlice';
import styles from './../../styles/quiz/question.module.scss';

function Question() {

    const quiz = useSelector((state: RootState) => state.quiz);
    const dispatch = useDispatch();

    const url: string | undefined = useContext(AppCtx)?.url;

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
                dispatch(storeQuestionAmount(res.questions.length));
            })
            .catch(err => console.log(err))
    }, [quiz.currentQuestion]);

    return (
        <h2 className={ styles.quizQuestionHeader }>
            {question}
        </h2>
        );
}

export default Question;