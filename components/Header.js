
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const Header = () => (
    <div style={divStyle.all}>
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
        >
            <Grid item={6}>
                <a href="/">
                    <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>Home</Button>
                </a>
                <a href="/about">
                    <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>About</Button>
                </a>
            </Grid>
            <Grid item={6}>
                <a href="/login">
                    <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>Login/Logout</Button>
                </a>
            </Grid>
        </Grid>
    </div>
)

const divStyle = {
    all : {
      height : 50,
      backgroundColor : '#000000',
      padding : 10,
    },
  };
  
export default Header