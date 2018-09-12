import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Typography, Paper } from '../node_modules/@material-ui/core';

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const Header = (props) => (
    <div>
        <Paper square elevation={5} style={{padding : 10 , backgroundColor: '#000000'}}>
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            >
            <Grid item>
                <Grid container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    >
                    <Link href="/" prefetch>
                        <Button color="inherit" variant='outlined' style={{backgroundColor : '#299ea7', color : 'white' }}>Home</Button>
                    </Link>
                    <Link href="/about" prefetch>
                        <Button color="inherit" variant='outlined' style={{backgroundColor : '#299ea7', color : 'white' }}>About</Button>
                    </Link>
                    {/* <Link href="/admin/adminHome" prefetch>
                        <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>Admin Home</Button>
                    </Link> */}
                </Grid>
            </Grid>
            <Grid item>
                <Grid container
                    direction="row"
                    justify="flex-end"
                    alignItems="center">
                    {isEmpty(props.user) ? (
                        <Grid item>
                            <Typography variant="body2">
                                Hello, Guest!
                            </Typography>
                        </Grid>
                        ):(
                        <Grid item>
                            <Typography variant="body2">
                                Hello, {props.user.userName}!
                            </Typography>
                        </Grid>
                        )
                    }
                    {isEmpty(props.user) ? (
                        <Grid item>
                            <Link href="/login" prefetch>
                                <Button color="inherit" variant='outlined' style={{backgroundColor : '#299ea7', color : 'white' }}>Login/Logout</Button>
                            </Link>
                        </Grid>
                        ):(
                        <Grid item>
                            <Link href="/userAccount" prefetch>
                                <Button color="inherit" variant='outlined' style={{backgroundColor : '#299ea7', color : 'white' }}>{props.user.userName}</Button>
                            </Link>
                        </Grid>
                        )
                    }
                </Grid>
            </Grid>
        </Grid>
        </Paper>
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
