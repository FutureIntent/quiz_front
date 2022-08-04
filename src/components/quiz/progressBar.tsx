import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import styles from './../../styles/quiz/progressBar.module.scss';

function ProgressBar() {

    const quiz = useSelector((state: RootState) => state.quiz);

    useEffect(() => {

    }, [quiz.currentQuestion, quiz.questionAmount]);

    return (
        <div className={styles.quizProgressBarContainer}>
            <progress className={styles.quizProgressBar} value={quiz.currentQuestion} max={quiz.questionAmount - 1} />
        </div>
        );
}

export default ProgressBar;