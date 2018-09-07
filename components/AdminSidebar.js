import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Router from 'next/router'

function logout(){
    const info = {};
    window.sessionStorage.setItem("info", JSON.stringify(info));
    Router.push('/login');
}

const AdminSidebar = () => (
        <Paper style= {{padding : 20}}>
            <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
                spacing = {16}
                >
                <Grid item>
                    <Link href="/admin/adminHome" prefetch replace>
                        <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>
                            Administrator Page
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/admin/messages" prefetch replace>
                        <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>
                            Messages
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/admin/supermarkets" prefetch replace>
                        <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>
                            Manage Supermarkets
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/admin/products" prefetch replace>
                        <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>
                            Manage Products
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/admin/users" prefetch replace>
                        <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>
                            Manage Users
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Button onClick={() => {
                            const info = {};
                            window.sessionStorage.setItem("info", JSON.stringify(info));
                            Router.replace('/');
                            }}
                            color="inherit" 
                            variant='outlined' 
                            style={{backgroundColor : '#999999', color : 'white' }}>
                        Logout
                    </Button>
                </Grid>
            </Grid>
        </Paper>
)

const divStyle = {
    all : {
        padding : 20
    },
  };
  
export default AdminSidebar