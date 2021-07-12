import React, { Component, useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import { getPosts } from "./actions/posts";
import useStyles from "./styles";
import TopBar from "./components/topBar/TopBar";
import SideBar from "./components/sideBar/SideBar";
import clsx from "clsx";

import ReactDOM, {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
const App = () => {
  const theme = useTheme();

  const classes = useStyles();

  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Router className={classes.root}>
      <Grow in>
        <Container>
          {/* <Grid container justify="space-between" spacing={3}> */}
          <Switch>
            <Route exact path="/Add">
              <SideBar
                Page={Form}
                currentId={currentId}
                setCurrentId={setCurrentId}
                
              />
            </Route>
            <Route exact path="/">
              <SideBar
                Page={Posts}
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </Route>
            <Route exact path="/search/:searchId">
              <SideBar
                Page={Posts}
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </Route>
            <Route exact path="/Edit">
              <SideBar
                Page={Form}
                currentId={currentId}
                setCurrentId={setCurrentId}
               
              />
            </Route>
            <Route></Route>
          </Switch>
          {/* </Grid> */}
        </Container>
      </Grow>
    </Router>
  );
};

export default App;
