import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Button, Container, Divider, Form, Grid, Header, Icon } from 'semantic-ui-react'

import { LanguageContext, useWizardActions, useWizardContext } from '../../context/AppContext'
import { STEPS, UI, WIZARD } from '../../enums'

const addItemToOptions = item => ({
  key: item,
  text: item,
  value: item
})

const convertOptions = optionsArray => optionsArray.map(option => ({
  key: option,
  text: option,
  value: option
}))

const formHeader = text => <Header size="small" content={text.title} subheader={text.description} />

function Step2 () {
  const { wizard } = useWizardContext()
  const { setWizard } = useWizardActions()

  const { language } = useContext(LanguageContext)

  const [consumersOptions, setConsumersOptions] = useState(wizard.consumers)
  const [developersOptions, setDevelopersOptions] = useState(wizard.developers)
  const [dataProtectionOfficersOptions, setDataProtectionOfficersOptions] = useState(wizard.dataProtectionOfficers)

  useEffect(() => {
    setConsumersOptions(convertOptions(wizard.consumers))
    setDevelopersOptions(convertOptions(wizard.developers))
    setDataProtectionOfficersOptions(convertOptions(wizard.dataProtectionOfficers))
  }, [wizard])

  return (
    <Grid>
      <Grid.Column width={3} />
      <Grid.Column width={10}>
        <Header dividing size="huge" icon={STEPS.team.icon} content={STEPS.team.header} />
        <Divider hidden />
        <Form size="big">
          <Form.Input
            value={wizard.teamName}
            label={formHeader(WIZARD.teamName)}
            placeholder={WIZARD.teamName.title}
            onChange={(e, { value }) =>
              setWizard({ type: 'setTeamName', payload: value })
            }
          />
          <Form.Input
            value={wizard.manager}
            label={formHeader(WIZARD.manager)}
            placeholder={WIZARD.manager.title}
            onChange={(e, { value }) =>
              setWizard({ type: 'setManager', payload: value })
            }
          />
          <Divider hidden />
          <Form.Dropdown
            search
            multiple
            selection
            allowAdditions
            noResultsMessage={null}
            label={formHeader(WIZARD.dpo)}
            placeholder={WIZARD.dpo.title}
            value={wizard.dataProtectionOfficers}
            additionLabel={`${UI.ADD[language]} `}
            options={dataProtectionOfficersOptions}
            onChange={(e, { value }) =>
              setWizard({ type: 'setDataProtectionOfficers', payload: value })
            }
            onAddItem={(e, { value }) =>
              setDataProtectionOfficersOptions([addItemToOptions(value), ...dataProtectionOfficersOptions])
            }
          />
          <Divider hidden />
          <Form.Dropdown
            search
            multiple
            selection
            allowAdditions
            noResultsMessage={null}
            value={wizard.developers}
            options={developersOptions}
            label={formHeader(WIZARD.developer)}
            placeholder={WIZARD.developer.title}
            additionLabel={`${UI.ADD[language]} `}
            onChange={(e, { value }) =>
              setWizard({ type: 'setDevelopers', payload: value })
            }
            onAddItem={(e, { value }) =>
              setDevelopersOptions([addItemToOptions(value), ...developersOptions])
            }
          />
          <Divider hidden />
          <Form.Dropdown
            search
            multiple
            selection
            allowAdditions
            noResultsMessage={null}
            value={wizard.consumers}
            options={consumersOptions}
            label={formHeader(WIZARD.consumer)}
            placeholder={WIZARD.consumer.title}
            additionLabel={`${UI.ADD[language]} `}
            onChange={(e, { value }) =>
              setWizard({ type: 'setConsumers', payload: value })
            }
            onAddItem={(e, { value }) =>
              setConsumersOptions([addItemToOptions(value), ...consumersOptions])
            }
          />
        </Form>
        <Divider hidden />
        <Container fluid textAlign="right">
          <Button animated primary size="huge" as={Link} to="/3">
            <Button.Content visible>{UI.NEXT[language]}</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Container>
      </Grid.Column>
      <Grid.Column width={3} />
    </Grid>
  )
}

export default Step2
