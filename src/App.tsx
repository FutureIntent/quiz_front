import React from 'react';
import Menu from './components/menu';
import Quiz from './components/quiz';
import { AppCtxProvider } from './context/fetch_URL';

function App() {

    return (
    <AppCtxProvider>
       <div>
                <Menu />
                <Quiz />
       </div >
    </AppCtxProvider>
  );
}

export default App;
