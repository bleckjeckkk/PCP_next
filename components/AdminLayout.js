import Header from './Header'
import AdminSidebar from './AdminSidebar'

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
    <Grid container
          direction="column"
          justify="space-between"
          alignItems="stretch"
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
            <div style={{ padding : 20 }}>
              {props.children}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
)

export default AdminLayout