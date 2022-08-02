import React, { useEffect, useContext } from 'react'
import type { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { storeName, storeQuiz, storeTest, storeMessage } from './../../features/quiz/quizSlice';
import { AppCtx } from './../../context/fetch_URL';
import Error from './../message/error';
import { displayMenu, displayQuiz } from '../../features/quiz/displaySlice';
import styles from './../../styles/menu.module.scss';

function Menu() {

    interface Body {
        quiz_id: number,
        name: string
    }

    const quiz = useSelector((state: RootState) => state.quiz);
    const dispatch = useDispatch();

    const url: string | undefined = useContext(AppCtx)?.url;
    const message: string = quiz.message;
    const body: Body = {
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
            .then(async res => {
                const status = res.ok;
                const response = await res.json();
                dispatch(storeMessage(response.message));

                if (status) {
                    dispatch(displayMenu(false));
                    dispatch(displayQuiz(true));
                }
               
            })
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
        <div id="menu" className={ styles.menuContainer }>
            <h1 className={ styles.menuHeader }>
                Technical Task
            </h1>
            <form onSubmit={handleSubmit} className={styles.menuForm}>
                <input className={styles.menuTextField} type="text" placeholder="Enter your name" value={quiz.user_name} name="user_name" id="user_name" onChange={handleUserInput} />
                <select className={ styles.menuSelectBox } name="user_quiz" id="user_quiz" onChange={handleUserInput} defaultValue="-1">
                  <option disabled hidden value="-1">
                        Choose test
                  </option>
                  {quiz.tests.map((test) => {
                    return <option value={test.quiz_id} key={test.quiz_id} id={ test.quiz_id }>
                        { test.quiz_name }
                    </option>
                })}
                </select>
                <Error message={message} />
                <button className={ styles.menuButton } type='submit'>Start</button>
          </form>           
        </div>
        );
}

export default Menu;