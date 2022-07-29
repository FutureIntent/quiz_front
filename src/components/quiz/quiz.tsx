import React from 'react';
import Question from './question';
import Options from './options';
import Next from './next';
import ProgressBar from './progressBar';

function Quiz() {

    return (
        <div>
            <Question />
            <Options />
            <ProgressBar />
            <Next />
        </div>
    );
}

export default Quiz;