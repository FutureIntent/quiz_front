import React, { useEffect, useContext, useRef } from 'react';
import type { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { AppCtx } from './../../context/fetch_URL';
import { storeOptions, storeQuestionsOptions } from './../../features/quiz/quizSlice';
import styles from './../../styles/quiz/options.module.scss';
import optionButton from './../../styles/button/optionButton.module.scss';

function Options() {

    const quiz = useSelector((state: RootState) => state.quiz);
    const dispatch = useDispatch();

    const url: string | undefined = useContext(AppCtx)?.url;
    const message = quiz.message;

    const questionId = quiz.questionAmount > 0 ? quiz.questions[quiz.currentQuestion].question_id : -1;

    let prevOptionId = useRef(null);

    useEffect(() => {       
        fetch(url + `/quiz/options/${questionId}`, {
            method: "get",
            mode: 'cors',
        })
            .then(res => res.json())
            .then(res => {
                prevOptionId.current = null;
                dispatch(storeOptions(res.options));
            })
            .catch(err => console.log(err))
    }, [quiz.questions, quiz.currentQuestion]);

    function handleOption(event: any): void {
        const optionId = event.target.name;

        dispatch(storeQuestionsOptions({
            question: quiz.questions[quiz.currentQuestion].question_id,
            option: optionId
        }));

        if (prevOptionId.current) {
            const button: HTMLElement = document.getElementById(`option_${prevOptionId.current}`)!;
            button.className = optionButton.optionButton;
        }

        prevOptionId.current = optionId;

        const button: HTMLElement = document.getElementById(`option_${optionId}`)!;
        button.className = optionButton.optionButtonPressed;
    }

    return (
        <div className={ styles.quizOptionsContainer }>
            {quiz.options.map((option) => {
                return <button id={`option_${option.option_id}`} className={ optionButton.optionButton } name={option.option_id} key={option.option_id} onClick={handleOption}>
                    {option.option_text}
                </button>
            })}
        </div>
        );
}

export default Options;