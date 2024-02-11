import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Paper, Avatar, Typography } from "@material-ui/core";

const UserDetailsPage = () => {
  const { username } = useParams();
  const [isDataFetched, setIsdatafetched] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [userDetail, setUserDetails] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2, response4] = await Promise.all([
          fetch(`https://api.github.com/users/${username}/following`),
          fetch(`https://api.github.com/users/${username}/followers`),
          fetch(`https://api.github.com/users/${username}`),
        ]);

        const data1 = await response1.json();
        const data2 = await response2.json();
        const data4 = await response4.json();

        setFollowers(data1);
        setFollowing(data2);
        setUserDetails(data4);

        setIsdatafetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div>
      {isDataFetched && (
        <>
          {" "}
          <Typography variant="h4" align="center" sx={{ marginTop: 5 }}>
            User Details
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item={true}>
                    <Avatar
                      alt={userDetail.login}
                      src={userDetail.avatar_url}
                      sx={{ width: 56, height: 56 }}
                    />
                  </Grid>
                  <Grid item={true}>
                    <Typography variant="h5">{userDetail.name}</Typography>
                    <Typography>Login:{userDetail.login}</Typography>
                    <Typography>
                      Twitter handle :{" "}
                      {userDetail.twitter_username === null
                        ? "N/A"
                        : userDetail.twitter_username}
                    </Typography>
                    <Typography>
                      {" "}
                      company :{" "}
                      {userDetail.company === null ? "N/A" : userDetail.company}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="h6" style={{ marginTop: "20px" }}>
                  Profile Details
                </Typography>
                <Typography>Followers: {followers.length}</Typography>
                <Typography>Following: {following.length}</Typography>
                <Typography>Public Repos: {userDetail.public_repos}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default UserDetailsPage;
