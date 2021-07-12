import React,{useEffect} from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

// import React from "react";

import { useParams } from "react-router-dom";

const Posts = ({ setCurrentId, open ,searchText,setSearchText}) => {
  let { searchId } = useParams();
  
  const posts = useSelector((state) => state.posts);

  const postData = useSelector((state) =>
  searchId ? [state.posts.find((message) => message.title === searchId)] : posts
  );
  // const [allPosts, setAllPosts] = React.useState(null);
  // useEffect(() => {
  //   if (postData) setSearchText('');
  // }, [postData]);

  // console.log(postData);

  const classes = useStyles();

  return !postData.length ? (
    <Grid
      item
      xs={12}
      sm={12}
      className={
        //   clsx(classes.page, {[classes.pageShift]: open,})
        open === true ? classes.pageShift : classes.page
      }
    >
      <Grid item xs={6} sm={6}></Grid>
      <Grid item xs={1} sm={1}>
        {" "}
        <CircularProgress />{" "}
      </Grid>
      <Grid item xs={5} sm={5}></Grid>
    </Grid>
  ) : (
    <div
      className={
        //   clsx(classes.page, {[classes.pageShift]: open,})
        open === true ? classes.pageShift : classes.page
      }
    >
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12} sm={12}>
          {" "}
          <Grid container spacing={3}>
            {postData.map((post) => (
              <Grid key={post._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
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
