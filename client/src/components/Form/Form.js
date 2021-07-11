import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom"; // version 5.2.0
import Post from "../Posts/Post/Post";
const Form = ({ currentId, setCurrentId, open }) => {
  const history = useHistory();

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : history.push('/Add')
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  const [alert, setAlert] = React.useState(false);
  const [alert2, setAlert2] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");
  const [i, setI] = React.useState(4);
  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const [key, value] of Object.entries(postData)) {
      if (value !== "") {
        setI(i - 1);
      } else {
        setAlertText(`${key} value is needed`);
      }
    }
    if (i === 0) {
      // console.log(i);
      setAlert2(false);
      if (alert === false) {
        if (currentId === 0) {
          dispatch(createPost(postData));
          history.push("/");
          clear();
        } else {
          dispatch(updatePost(currentId, postData));
          clear();
        }
      }
    } else {
      setAlert2(true);
    }

    console.log(alert2);
    
  };

  return (
    <>
      <div      
        
        className={   open === true ? classes.pageShift : classes.page
        }
      >
      <div className={classes.root}>
      <Grid container spacing={3}>
        {currentId!==0 || currentId? (
          <Grid item xs={7}>
        <Paper className={classes.paper}>
          <Post post={post} edit={true}/></Paper>
          </Grid>
        ):('')}
        

        <Grid item xs={currentId!==0 || currentId? 5:4} >
          <Paper className={classes.paper}>
            <form
              autoComplete="off"
              noValidate
              className={`${classes.root} ${classes.form}`}
              onSubmit={handleSubmit}
            >
              <Typography variant="h6">
                {currentId ? `Editing "${post.title}"` : "Add Course"}
              </Typography>
              <Typography variant="h6">
                <Collapse in={alert2}>
                  <Alert variant="outlined" severity="warning">
                    {alertText}
                  </Alert>
                </Collapse>
              </Typography>
              <TextField
                name="creator"
                variant="outlined"
                label="Creator"
                fullWidth
                value={postData.creator}
                onChange={(e) =>
                  setPostData({ ...postData, creator: e.target.value })
                }
              />
              <TextField
                name="title"
                variant="outlined"
                label="Course Title"
                fullWidth
                value={postData.title}
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
              />
              <TextField
                name="message"
                variant="outlined"
                label="Course Details"
                fullWidth
                multiline
                rows={4}
                value={postData.message}
                onChange={(e) =>
                  setPostData({ ...postData, message: e.target.value })
                }
              />
              <TextField
                name="tags"
                variant="outlined"
                label="Tags (coma separated)"
                fullWidth
                value={postData.tags}
                onChange={(e) =>
                  setPostData({ ...postData, tags: e.target.value.split(",") })
                }
              />
              <div className={classes.fileInput}>
                <Collapse in={alert}>
                  <Alert
                    action={
                      ""
                      // <IconButton
                      //   aria-label="close"
                      //   color="inherit"
                      //   size="small"
                      //   onClick={() => {
                      //     setAlert(false);
                      //   }}
                      // >
                      //   <CloseIcon fontSize="inherit" />
                      // </IconButton>
                    }
                    variant="outlined"
                    severity="warning"
                  >
                    Wrong File Type! File type Must be JPEG
                  </Alert>
                </Collapse>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={(data) => {
                    // console.log(data);
                    if (data.type === "image/jpeg") {
                      setPostData({ ...postData, selectedFile: data.base64 });
                      setAlert(false);
                    } else setAlert(true);
                  }}
                />
              </div>
              <Button
                className={classes.buttonSubmit}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={clear}
                fullWidth
              >
                Clear
              </Button>
            </form>
          </Paper>
        </Grid>
        </Grid>
        </div>
        
      </div>
    </>
  );
};

export default Form;
