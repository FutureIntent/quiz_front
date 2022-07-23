import React, { useEffect, useContext } from 'react'
import type { RootState } from '../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { storeName, storeQuiz, storeTest, storeMessage } from './../features/quiz/quizSlice'
import { AppCtx } from './../context/fetch_URL'
import Error from './error'

function Menu() {

    interface body {
        quiz_id: number,
        name: string
    }

    const quiz = useSelector((state: RootState) => state.quiz);
    const dispatch = useDispatch();

    const url: string | undefined = useContext(AppCtx)?.url;
    const error: String = quiz.message;
    const body: body = {
        quiz_id: quiz.selected_test,
        name: quiz.user_name      
        }


        useEffect(() => {
            fetch(url + "/quiz/tests", {
                method: "get",
                mode: 'cors',
            })
                .then(res => res.json())
                .then(res => dispatch(storeQuiz(res)))
                .catch(err => console.log(err))
        }, []);

    function handleSubmit(event: any): void {
        fetch(url + "/quiz/getName", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => dispatch(storeMessage(res.message)))
            .catch(err => console.log(err))

        event.preventDefault();
    }

    function handleUserInput(event: any): void {
        const input_name = event.target.name;
        const input_value = event.target.value;

        if (input_name === "user_name") dispatch(storeName(input_value));
        if (input_name === "user_quiz") dispatch(storeTest(input_value));
    }

    return (
        <div>
            <p>
                Technical Task
            </p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter your name" value={quiz.user_name} name="user_name" id="user_name" onChange={handleUserInput} />
                <select name="user_quiz" id="user_quiz" onChange={handleUserInput} defaultValue="-1">
                  <option disabled hidden value="-1">
                        Choose test
                  </option>
                  {quiz.tests.map((test) => {
                    return <option value={test.quiz_id} key={test.quiz_id} id={ test.quiz_id }>
                        { test.quiz_name }
                    </option>
                })}
                </select>
                <Error error={ error }/>
                <button type='submit'>Start</button>
          </form>           
        </div>
        );
}

export default Menu;