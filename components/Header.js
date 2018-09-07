import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const Header = (props) => (
    <div style={divStyle.all}>
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
        >
            <Grid>
                <Link href="/" prefetch>
                    <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>Home</Button>
                </Link>
                <Link href="/about" prefetch>
                    <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>About</Button>
                </Link>
                {/* <Link href="/admin/adminHome" prefetch>
                    <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>Admin Home</Button>
                </Link> */}
            </Grid>
            <Grid>
                {isEmpty(props.user) ? (
                    <Link href="/login" prefetch>
                        <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>Login/Logout</Button>
                    </Link>
                    ):(
                    <Link href="/userAccount" prefetch>
                        <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>{props.user.userName}</Button>
                    </Link>
                    )
                }
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