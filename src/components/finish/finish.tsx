import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { AppCtx } from '../../context/fetch_URL';
import { storeMessage, storeResult, TestBody } from './../../features/quiz/quizSlice';
import Message from './../message/error';
import Loading from './loading';
import styles from './../../styles/finish.module.scss';



function Finish() {

    const [loading, setLoading] = useState<boolean> (true);

    const quiz = useSelector((state: RootState) => state.quiz);
    const dispatch = useDispatch();

    const url: string | undefined = useContext(AppCtx)?.url;

    const testBody: TestBody = {
        name: quiz.user_name,
        test_id: quiz.selected_test,
        questions_options: quiz.questionsOptions
    };

    const numOFCorrectAnswers: number = useMemo(() => countCorrectAnswers(quiz.questionAmount, quiz.result), [quiz.result]);

    useEffect(() => {
        fetch(url + "/quiz/submitTest", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testBody)
        })
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                dispatch(storeMessage(res.message));
                dispatch(storeResult(res.score));
            })
            .catch(err => console.log(err))
    }, []);

    function countCorrectAnswers(questionAmount: number, testResultInPercent: number): number {
        const result: number = Math.round(questionAmount / 100 * testResultInPercent);

        return result;
    }

    return (
        <div className={ styles.finishContainer }>{loading
            ? <Loading />
            : <div className={ styles.finishWrapper }>
                <h2 className={styles.finishHeader}>Thanks, {quiz.user_name}!</h2>
                <p className={ styles.finishText }>You responded correctly to {numOFCorrectAnswers} out of {quiz.questionAmount} questions.</p>
                <Message message={quiz.message} />
              </div>
        }           
        </div>
    );
}

export default Finish;