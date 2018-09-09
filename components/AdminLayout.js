import Header from './Header'
import AdminSidebar from './AdminSidebar'

import Head from 'next/head'

import { 
  Typography,
   Grid 
} from '@material-ui/core';

const layoutStyle = {
  margin: 20,
  padding: 20,
}

const AdminLayout = (props) => (
  <div style={{ padding : 10 }}>
  
    <Head>
      <title>PCP Admin {props.page ? `| ${props.page}` : ''}</title>
    </Head>
    <Grid container
          direction="column"
          justify="space-between"
          alignItems="stretch"
          spacing={16}
    >
      <Grid item xs={12}>
        <Typography variant="display2">
            Price Checker Program
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container
              direction = "row"
              justify = "space-between"
              alignItems = "flex-start"
        >
          <Grid item xs = {3}>
            <AdminSidebar />
          </Grid>
          <Grid item xs = {9}>
            <div style={{ paddingLeft : 10 }}>
              {props.children}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
)

export default AdminLayout