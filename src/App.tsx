import { Provider } from "react-redux";
import { AppRoute } from "./routers/AppRoute";
import { persistor, store } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react'

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
