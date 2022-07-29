import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { TestBody } from './../../features/quiz/quizSlice';



function Finish() {

    const quiz = useSelector((state: RootState) => state.quiz);
    const dispatch = useDispatch();

    const testBody: TestBody = {
        name: quiz.user_name,
        test_id: quiz.selected_test,
        questions_options: quiz.questionsOptions
    };

    const numOFCorrectAnswers: number = useMemo(() => countCorrectAnswers(quiz.questionAmount, quiz.result), [quiz.result]);

    useEffect(() => {
        console.log(testBody);
    }, []);

    function countCorrectAnswers(questionAmount: number, testResultInPercent: number): number {
        const result: number = Math.round(questionAmount / 100 * testResultInPercent);

        return result;
    }

    return (
        <div>
            <h2>Thanks, {quiz.user_name}</h2>
            <p>You responded correctly to {numOFCorrectAnswers} out of {quiz.questionAmount} questions.</p>
        </div>
    );
}

export default Finish;