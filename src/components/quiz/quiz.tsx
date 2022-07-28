import React from 'react';
import Question from './question';
import Options from './options';
import Next from './next';

function Quiz() {

    return (
        <div>
            <Question />
            <Options />
            <Next />
        </div>
    );
}

export default Quiz;