import { useContext, useRef, useState } from 'react'
import { Ref, Segment } from 'semantic-ui-react'
import { AppHome, AppMenu, AppSettings } from './components'
import { LanguageContext } from './context/AppContext'
import { Route, Routes } from 'react-router-dom'

function App () {
  const appRefArea = useRef()
  const { language } = useContext(LanguageContext)
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <>
      <AppMenu setSettingsOpen={setSettingsOpen} context={appRefArea} />
      <Ref innerRef={appRefArea}>
        <Segment basic style={{ paddingBottom: '5rem', marginTop: 0 }}>
          <AppHome />
          <Routes>
          </Routes>
        </Segment>
      </Ref>
      <AppSettings open={settingsOpen} setOpen={setSettingsOpen} />
    </>
  )
}

export default App
