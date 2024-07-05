import { BrowserRouter } from 'react-router-dom'

import RootRoute from './routes/RootRoute'

const App = () => {
  return (
    <BrowserRouter>
      <RootRoute />
    </BrowserRouter>
  )
}

export default App
