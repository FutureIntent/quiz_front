import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

function ProgressBar() {

    const quiz = useSelector((state: RootState) => state.quiz);

    useEffect(() => {

    }, [quiz.currentQuestion, quiz.questionAmount]);

    return (
        <div>
            <input disabled type="range" value={quiz.currentQuestion + 1} min="0" max={quiz.questionAmount} />
        </div>
        );
}

export default ProgressBar;