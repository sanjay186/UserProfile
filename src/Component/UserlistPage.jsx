import React from "react";
import { Link } from 'react-router-dom';
import { Grid,Paper,Avatar,Typography} from '@material-ui/core';


const UserListPage = ({users})=>{
    return(
      <div>
      <Typography variant="h4" align="center" gutterBottom>User List</Typography>
      <Grid container>
        {users.map(user => (
          <Grid key={user.id} xs={12} sm={6} md={4} lg={3} button="true" component={Link} to={`/user/${user.login}`}>
             <Paper elevation={3} style={{ padding: '10px', textAlign: 'center'  ,marginLeft: '10px',marginRight: '10px',marginTop:'10px',marginBottom:'10px'}}>
            <Grid container spacing={2}alignItems="center">
        <Grid item={true}>
          <Avatar  alt={user.login} src={user.avatar_url} />
        </Grid>
        <Grid item={true}>
          <Typography variant="body1">{user.login}</Typography>
        </Grid>
      </Grid>
          
            </Paper> 
          </Grid>
        ))}
      </Grid>
    </div>
    )
}

export default UserListPage;