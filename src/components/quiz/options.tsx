import React, { useEffect, useContext } from 'react';
import type { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { AppCtx } from './../../context/fetch_URL';
import { storeOptions, storeQuestionsOptions } from './../../features/quiz/quizSlice';
import Error from './../message/error';

function Options() {

    const quiz = useSelector((state: RootState) => state.quiz);
    const dispatch = useDispatch();

    const url: string | undefined = useContext(AppCtx)?.url;
    const message = quiz.message;

    const questionId = quiz.questionAmount > 0 ? quiz.questions[quiz.currentQuestion].question_id : -1;

    useEffect(() => {       
        fetch(url + `/quiz/options/${questionId}`, {
            method: "get",
            mode: 'cors',
        })
            .then(res => res.json())
            .then(res => {
                dispatch(storeOptions(res.options));
            })
            .catch(err => console.log(err))
    }, [quiz.questions, quiz.currentQuestion]);

    function handleOption(event: any): void {
        const optionId = event.target.name;

        dispatch(storeQuestionsOptions({
            question: quiz.questions[quiz.currentQuestion].question_id,
            option: optionId
        }))
    }

    console.log(quiz.questionsOptions);

    return (
        <div>
            {quiz.options.map((option) => {
                return <button name={option.option_id} key={option.option_id} onClick={handleOption}>
                    {option.option_text}
                </button>
            })}
            <Error message={ message }/>
        </div>
        );
}

export default Options;