import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Handle HMR
if (import.meta.hot) {
  import.meta.hot.accept('./App.jsx', (newModule) => {
    if (newModule) {
      const NewApp = newModule.default
      root.render(
        <React.StrictMode>
          <NewApp />
        </React.StrictMode>
      )
    }
  })
}