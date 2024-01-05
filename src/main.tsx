import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'

import './index.css'
import App from './App'
import { setupStore } from './store/store'

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
)
