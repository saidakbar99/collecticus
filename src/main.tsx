import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import './index.css'
import App from './App'

import { setupStore } from './store/store'
const {store, persistor} = setupStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>,
)
