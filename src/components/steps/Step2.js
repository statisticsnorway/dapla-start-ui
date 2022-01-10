import { Form } from 'semantic-ui-react'
import { useWizardActions, useWizardContext } from '../../context/AppContext'
import { useEffect, useState } from 'react'

const addItem = value => ({
  key: value,
  text: value,
  value: value
})

const convertOptions = array => {
  array.map(value => ({
    key: value,
    text: value,
    value: value
  }))
}

function Step2 () {
  const { wizard } = useWizardContext()
  const { setWizard } = useWizardActions()

  const [developersOptions, setDevelopersOptions] = useState(wizard.developers.length !== 0 ? convertOptions(wizard.developers) : [])

  useEffect(() => {
    if (wizard.developers.length !== 0) {
      setDevelopersOptions(convertOptions(wizard.developers))
    }
  }, [])

  return (
    <>
      <Form size='large'>
        <Form.Dropdown
          search
          multiple
          required
          selection
          allowAdditions
          placeholder="Utviklere"
          noResultsMessage={null}
          value={wizard.developers}
          options={developersOptions}
          onAddItem={(e, { value }) => setDevelopersOptions([addItem(value), ...developersOptions])}
          onChange={(e, { value }) => {
            setWizard({ type: 'setDevelopers', payload: value })
          }}
        />
      </Form>
    </>
  )
}

export default Step2
