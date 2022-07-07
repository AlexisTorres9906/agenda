import { Provider } from "react-redux";
import { AppRoute } from "./routers/AppRoute";
import { persistor, store } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react'
import { useEffect } from "react";

type ExitFullscreen = typeof document.exitFullscreen
type RequestFullscreen = typeof document.documentElement.requestFullscreen

declare global {
  interface Document {
    webkitExitFullscreen: ExitFullscreen;
    mozCancelFullScreen: ExitFullscreen;
    msExitFullscreen: ExitFullscreen;
  }

  interface HTMLElement {
    webkitRequestFullscreen: RequestFullscreen;
    mozRequestFullScreen: RequestFullscreen;
    msRequestFullscreen: RequestFullscreen;
  }
}


function App() {
  
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
      <AppRoute />
      </PersistGate>
    </Provider>
  );
}

export default App;
