import React, { useEffect } from 'react';
import Menu from './components/menu/menu';
import Quiz from './components/quiz/quiz';
import Finish from './components/finish/finish';
import { AppCtxProvider } from './context/fetch_URL';
import type { RootState } from './app/store'
import { useSelector } from 'react-redux'
import styles from './App.module.scss';

function App() {

    let display = useSelector((state: RootState) => state.display);

    return (
        <AppCtxProvider>
            <div className={ styles.mainContainer }>
                {display.menu && <Menu />}
                {display.quiz && <Quiz />}
                {display.finish && <Finish />}
            </div >
    </AppCtxProvider>
  );
}

export default App;
