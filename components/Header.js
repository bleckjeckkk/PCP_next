import Link from 'next/link'
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
            <Grid>
                <Link href="/">
                    <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>Home</Button>
                </Link>
                <Link href="/about">
                    <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>About</Button>
                </Link>
                <Link href="/admin/adminHome">
                    <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>Admin Home</Button>
                </Link>
            </Grid>
            <Grid>
                <Link href="/login">
                    <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>Login/Logout</Button>
                </Link>
            </Grid>
        </Grid>
    </div>
)

const divStyle = {
    all : {
      height : 38,
      backgroundColor : '#000000',
      padding : 10,
    },
  };
  
export default Header