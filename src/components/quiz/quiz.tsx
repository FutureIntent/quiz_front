import React from 'react';
import Question from './question';
import Options from './options';
import Next from './next';
import ProgressBar from './progressBar';
import styles from './../../styles/quiz/quiz.module.scss';

function Quiz() {

    return (
        <div className={ styles.quizContainer }>
            <Question />
            <Options />
            <ProgressBar />
            <Next />
        </div>
    );
}

export default Quiz;