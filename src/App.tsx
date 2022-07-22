import React, { useEffect } from 'react';
import Menu from './components/menu'
import { AppCtxProvider } from './context/fetch_URL'

function App() {

    return (
    <AppCtxProvider>
       <div>
          <Menu />
       </div >
    </AppCtxProvider>
  );
}

export default App;
