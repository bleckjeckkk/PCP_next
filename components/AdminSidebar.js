import Link from 'next/link'
import {
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button
} from '@material-ui/core'

import Router from 'next/router'

function logout(){
    var info = {};
    window.sessionStorage.setItem("info", JSON.stringify(info));
    Router.replace('/');
}

const AdminSidebar = () => (
        <Paper style= {{padding : 20}}> 
            <List component="nav">
                <Link href="/admin/adminHome" prefetch replace>
                    <ListItem button>
                        <ListItemText primary="Administrator Page" />
                    </ListItem>
                </Link>
                <Divider />
                <Link href="/admin/messages" prefetch replace>
                    <ListItem button>
                        <ListItemText primary="Messages" />
                    </ListItem>
                </Link>
                <Divider />
                <Link href="/admin/supermarkets" prefetch replace>
                    <ListItem button>
                        <ListItemText primary="Manage Supermarkets" />
                    </ListItem>
                </Link>
                <Divider />
                <Link href="/admin/products" prefetch replace>
                    <ListItem button>
                        <ListItemText primary="Manage Products" />
                    </ListItem>
                </Link>
                <Divider />
                <Link href="/admin/users" prefetch replace>
                    <ListItem button>
                        <ListItemText primary="Manage Users" />
                    </ListItem>
                </Link>
                <Divider />
                <ListItem button onClick={()=>{logout()}}>
                    <ListItemText primary="Log out" />
                </ListItem>
            </List>
        </Paper>
)

const divStyle = {
    all : {
        padding : 20
    },
  };
  
export default AdminSidebar