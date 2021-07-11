import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";


const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  return !posts.length ? (
    <>
      <Grid item xs={12} sm={6}></Grid>{" "}
      <Grid item xs={12} sm={1}>
        {" "}
        <CircularProgress />{" "}
      </Grid>
      <Grid item xs={12} sm={5}></Grid>{" "}
    </>
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      
      <Grid item xs={12} sm={10}>
        {" "}
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={4} md={4}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
      
    </Grid>
  );
};

export default Posts;
