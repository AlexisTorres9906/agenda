import { Provider } from "react-redux";
import { AppRoute } from "./routers/AppRoute";
import { persistor, store } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react'
import { useEffect } from "react";



function App() {
  useEffect(() => {
  try{
    window.screen.orientation.lock('portrait').then(
      () => {
        console.log('success');
      }
    ).catch(
      () => {
        return null
      }
    )
  }catch(e){
  }

  }, [])
  
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
      <AppRoute />
      </PersistGate>
    </Provider>
  );
}

export default App;
