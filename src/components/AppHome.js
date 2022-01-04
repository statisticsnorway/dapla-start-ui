import { Grid, Header, Icon, Image, Segment } from 'semantic-ui-react'
import { TEST_IDS, UI } from '../enums'
import { LanguageContext } from '../context/AppContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

function  AppHome () {
  const { language } = useContext(LanguageContext)

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>

          </Grid.Column>
          <Grid.Column width={10}>

          </Grid.Column>
          <Grid.Column width={3}>

          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={3}>

          </Grid.Column>
          <Grid.Column width={10}>

          </Grid.Column>
          <Grid.Column width={3}>

          </Grid.Column>
        </Grid.Row>
      </Grid>

    </>
  )
}

export default AppHome
