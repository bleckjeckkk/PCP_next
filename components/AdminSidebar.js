import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

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
                    <Link href="/admin/adminHome" prefetch>
                        <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>
                            Administrator Page
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/admin/messages" prefetch>
                        <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>
                            Messages
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/admin/supermarkets" prefetch>
                        <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>
                            Manage Supermarkets
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/admin/products" prefetch>
                        <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>
                            Manage Products
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/admin/users" prefetch>
                        <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>
                            Manage Users
                        </Button>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/login" prefetch>
                        <Button color="inherit" variant='outlined' style={{backgroundColor : '#999999', color : 'white' }}>
                            Logout
                        </Button>
                    </Link>
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