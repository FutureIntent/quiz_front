import React, { useEffect, useState, useContext } from 'react'
import type { RootState } from '../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { storeName, storeQuiz, storeTest } from './../features/quiz/quizSlice'
import { AppCtx } from './../context/fetch_URL'

function Menu() {

    const quiz = useSelector((state: RootState) => state.quiz);
    const dispatch = useDispatch();

    const url = useContext(AppCtx)?.url;

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

        console.log("Submitted");
        event.preventDefault();
    }

    function handleUserInput(event: any): void {
        const input_name = event.target.name;
        const input_value = event.target.value;

        if (input_name === "user_name") dispatch(storeName(input_value));
        if (input_name === "user_quiz") dispatch(storeTest(input_value));
    }

    console.log(quiz);

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
                <button type='submit'>Start</button>
          </form>           
        </div>
        );
}

export default Menu;