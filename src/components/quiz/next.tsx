import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { displayFinish, displayQuiz } from '../../features/quiz/displaySlice';
import { incrementCurrentQuestion, setHideQuestion } from '../../features/quiz/quizSlice';
import styles from './../../styles/quiz/next.module.scss';
import buttonStyle from './../../styles/button/button.module.scss';

function Next() {

    const quiz = useSelector((state: RootState) => state.quiz);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(quiz.questionsOptions).length === quiz.currentQuestion + 1) {
            dispatch(setHideQuestion(false));
        } else {
            dispatch(setHideQuestion(true));
        }
    }, [quiz.currentQuestion, quiz.questionsOptions]);

    function handleNext(): void {
        if (quiz.currentQuestion < quiz.questionAmount - 1) {
            dispatch(incrementCurrentQuestion());
        } else {
            dispatch(displayQuiz(false));
            dispatch(displayFinish(true));
        }
    }

    return (
        <div className={ styles.quizNextContainer }>
            <button className={ buttonStyle.defaultButton } name="next" onClick={handleNext} disabled={quiz.hideQuestion}>
                {quiz.currentQuestion < quiz.questionAmount-1 ? "Next" : "Finish"}
            </button>
        </div>
    );
}
export default Next;
