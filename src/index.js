import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/app'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import createStore from './app/store/createStore'
import history from './app/utils/history'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const store = createStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Router history={history}>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>
)
