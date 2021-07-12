import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import LibraryAddRoundedIcon from "@material-ui/icons/LibraryAddRounded";
import ViewListRoundedIcon from "@material-ui/icons/ViewListRounded";
import TopBar from "../topBar/TopBar";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom"; // version 5.2.0

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  link: {
    textDecoration: "none",
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },

  drawer: {
    width: drawerWidth,
    backgroundColor: "rgb(251, 251, 255)",
    color: "#343a40",
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function SideBar({ Page, currentId, setCurrentId }) {
  const history = useHistory();

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <TopBar open={open} setOpen={setOpen} />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Typography className={classes.title} variant="h6" noWrap>
            Courses
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( */}
          <ListItem
            button
            key={"Add Course"}
            onClick={() => {
              setCurrentId(null);
              history.push("/Add");
              // location.replace('/Add');
            }}
            style={{ color: "#343a40", textDecoration: "inherit" }}
          >
            
            <ListItemIcon>
            <Link to={`#`}  style={{ color: "#343a40", textDecoration: "inherit" }}> <LibraryAddRoundedIcon /></Link>
            </ListItemIcon>
            

            <Link to={`#`}  style={{ color: "#343a40", textDecoration: "inherit" }}>
            <ListItemText primary={"Add Course"} />
            </Link>
          </ListItem>
          {/* ))} */}
        </List>
        <Divider />
        <List>
          <ListItem button key={"View Course"}>
            <Link to={`/`}  style={{ color: "#343a40", textDecoration: "inherit" }}>
              <ListItemIcon>
                {" "}
                <ViewListRoundedIcon />
              </ListItemIcon>
            </Link>
            <Link
              to={`/`}
              style={{ color: "#343a40", textDecoration: "inherit" }}
            >
              {" "}
              <ListItemText primary={"View Course"} />{" "}
            </Link>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          <Page
            currentId={currentId}
            setCurrentId={setCurrentId}
            open={open}
            className={
              //   clsx(classes.page, {[classes.pageShift]: open,})
              open === true ? classes.pageShift : classes.page
            }
          />
        </Typography>
      </main>
    </>
  );
}

// export default topBar
