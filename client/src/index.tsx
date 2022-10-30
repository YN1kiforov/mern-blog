import App from "./App";
import './index.css';
import ReactDOM from 'react-dom/client';
import { store } from "./redux/store";
import { Provider } from 'react-redux'
import React from 'react'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<App />
	</Provider>

);
