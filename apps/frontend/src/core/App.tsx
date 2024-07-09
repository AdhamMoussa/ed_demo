import RootProvider from './providers/RootProvider'
import RootRoute from './routes/RootRoute'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'

const App = () => {
  return (
    <RootProvider>
      <RootRoute />
    </RootProvider>
  )
}

export default App
