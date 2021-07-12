import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";


const Posts = ({ setCurrentId,open }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  return !posts.length ? (
    <Grid item xs={12} sm={12} className={
      //   clsx(classes.page, {[classes.pageShift]: open,})
      open===true? classes.pageShift: classes.page
  }>
    <Grid item xs={6} sm={6}>        
      </Grid>
      <Grid item xs={1} sm={1}>
        {" "}
        <CircularProgress />{" "}
      </Grid>
      <Grid item xs={5} sm={5}>
        
      </Grid>
     
    </Grid>
  ) : (
    <div className={
      //   clsx(classes.page, {[classes.pageShift]: open,})
      open===true? classes.pageShift: classes.page
  }>
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={4}
    >
      
      <Grid item xs={12} sm={10}>
        {" "}
        <Grid container spacing={3}>
          {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={4} md={4}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
      </Grid>
    </Grid>
    </div>
  );
};

export default Posts;
