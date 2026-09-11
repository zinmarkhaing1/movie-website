import { BrowserRouter } from 'react-router-dom'
import { QueryProvider } from './providers/QueryProvider'
import AppRouter from './router'

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryProvider>
  )
}

export default App
