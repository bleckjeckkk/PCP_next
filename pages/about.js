
import Layout from '../components/Layout.js'
import { Grid, Typography } from '@material-ui/core'

export default () => (
    <Layout>
        <Grid container
            direction="column"
            justify="center"
            alignItems="center"
            spacing="16">
            <Grid item xs={12}>
                <Typography variant="display3">
                    About PCP
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="body2" gutterButtom>
                    Did you ever hear the tragedy of Darth Plagueis The Wise? I thought not.
                </Typography>   
                <Typography variant="body2" gutterButtom>
                    It’s not a story the Jedi would tell you. It’s a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life…
                </Typography>   
                <Typography variant="body2" gutterButtom>
                    He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful… the only thing he was afraid of was losing his power, which eventually, of course, he did.
                </Typography>   
                <Typography variant="body2" gutterButtom>
                    Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Ironic. He could save others from death, but not himself.
                </Typography>   
            </Grid>
        </Grid>
    </Layout>
)