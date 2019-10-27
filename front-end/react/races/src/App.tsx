import React from 'react';
import './App.css';
import AppRouter from "./Components/AppRouter";
import { Provider } from 'react-redux';
import {store} from "./Store/configureStore";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
}

export default App;
