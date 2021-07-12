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
import { useHistory, useLocation } from "react-router-dom"; // version 5.2.0
import Post from "../Posts/Post/Post";
const Form = ({ currentId, setCurrentId, open }) => {
  const history = useHistory();
  const location = useLocation();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  useEffect(() => {
    if (location.pathname === "/Add" || currentId===null) {
      clear();
      // console.log("Fuck You");
    }
  }, [location.pathname]);

  const dispatch = useDispatch();
  const classes = useStyles();

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const [alert, setAlert] = React.useState(false);
  const [alert2, setAlert2] = React.useState(true);
  const [alertText, setAlertText] = React.useState("");
  const [i, setI] = React.useState(4);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (alert === false) {
      if (currentId === null) {
        dispatch(createPost(postData));
        history.push("/");
        clear();
      } else {
        dispatch(updatePost(currentId, postData));        
      }
    }    
  };

  return (
    <>
      <div className={open === true ? classes.pageShift : classes.page}>
        <div className={classes.root}>
          <Grid container spacing={3}>
            {currentId !== null ? (
              <Grid item xs={12} sm={7}>
                {/* <Paper className={classes.paper}> */}
                  <Post post={post} edit={true} />
                {/* </Paper> */}
              </Grid>
            ) : (
              ""
            )}
            {
              currentId===null ?(
                <Grid item xs={12} sm={3} >                
              </Grid>
              ):``
              
            }

            <Grid item xs={12} sm={currentId ? 5 : 6}>
              <Paper className={classes.paper}>
                <form
                  autoComplete="off"
                  method="post"
                  className={`${classes.root} ${classes.form}`}
                  onSubmit={handleSubmit}
                >
                  <Typography variant="h6">
                    {currentId ? `Editing "${post.title}"` : "Add Course"}
                  </Typography>
                  <Typography variant="h6">
                    {alertText !== "" ? (
                      <Alert variant="outlined" severity="warning">
                        {alertText}
                      </Alert>
                    ) : (
                      ``
                    )}
                    {/* <Collapse in={alert2}></Collapse> */}
                  </Typography>
                  <TextField
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    required
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
                    required
                    fullWidth
                    value={postData.title}
                    onChange={(e) =>
                      setPostData({ ...postData, title: e.target.value })
                    }
                    required
                  />
                  <TextField
                    name="message"
                    variant="outlined"
                    label="Course Details"
                    required
                    fullWidth
                    multiline
                    rows={4}
                    value={postData.message}
                    onChange={(e) =>
                      setPostData({ ...postData, message: e.target.value })
                    }
                    required
                  />
                  <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags (coma separated)"
                    required
                    fullWidth
                    value={postData.tags}
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        tags: e.target.value.split(","),
                      })
                    }
                    required
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
                      required
                      onDone={(data) => {
                        // console.log(data);
                        if (data.type === "image/jpeg") {
                          setPostData({
                            ...postData,
                            selectedFile: data.base64,
                          });
                          setAlert(false);
                        } else setAlert(true);
                      }}
                      required
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
                  {currentId !== null ? (
                    ``
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={clear}
                      fullWidth
                    >
                      Clear
                    </Button>
                  )}
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
