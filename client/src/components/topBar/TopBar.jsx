import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
// Auto Compete And Search purpose
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom"; // version 5.2.0
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
const drawerWidth = 240;
const filter = createFilterOptions();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#24292e",
    dispaly: "flex",
    justifyContent: "space-between",
    // position: 'sticky',
    color: "aliceblue",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    dispaly: "flex",
    backgroundColor: "#24292e",
    color: "aliceblue",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    dispaly: "flex",
    flexGrow: 2,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "99%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  listbox: {
    width: "99%",
    paddingBottom: `calc(1em + ${theme.spacing(1)}px)`,
    paddingRight: `calc(1em + ${theme.spacing(1)}px)`,

    dispaly: "flex",
    zIndex: 1,
    position: "absolute",
    listStyle: "none",
    backgroundColor: "#24292e",
    borderRadius: theme.shape.borderRadius,

    overflow: "auto",
    maxHeight: 200,
    border: "none",
    "& li": {
      backgroundColor: "inherit",
      color: "inherit",
      padding: theme.spacing(1, 1, 1, 0),
      margin: theme.spacing(1, 1, 1, 0),
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      borderRadius: theme.shape.borderRadius,
      borderBottomColor: "aliceblue",
    },
    '& li[data-focus="true"]': {
      // backgroundColor: '#4a8df6',
      color: "inherit",
      cursor: "pointer",
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    "& li:active": {
      // backgroundColor: '#2977f5',
      backgroundColor: alpha(theme.palette.common.white, 0.25),

      color: "inherit",
    },
    closeIcon: {
      padding: theme.spacing(0, 0),
      height: "0%",
      position: "relative",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));

export default function TopBar({ open, setOpen, setSearchText, searchText }) {
  const history = useHistory();

  const posts = useSelector((state) => state.posts);
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: posts,
    getOptionLabel: (option) => option.title,
  });
  const classes = useStyles();
  //   const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(null);
  const [toggleOpen, setToggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      title: "",
    });

    setToggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
    });

    handleClose();
  };
  const changeHandler = (option) => {
    // console.log(option);
    if (option !== null || option !== "") {
      setSearchText(option);
      history.push("/search/" + option);
      // setSearchText ("");
    } else {
      history.push("/");
    }
  };

  return (
    <div className={classes.root}>
      <AppBar
        className={
          //   clsx(classes.appBar, {[classes.appBarShift]: open,})
          open === true ? classes.appBarShift : classes.appBar
        }
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          {open === false ? (
            <Typography className={classes.title} variant="h6" noWrap>
              Courses
            </Typography>
          ) : (
            ""
          )}

          <div className={classes.search} {...getRootProps()}>
            <div className={classes.searchIcon}>
              {searchText !== "" ? `` : <SearchIcon />}
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              {...getInputProps()}
              value={searchText}
              onChange={() => {
                if (
                  getInputProps().value != null ||
                  getInputProps().value != ""
                ) {
                  changeHandler(getInputProps().value);
                }
              }}
            />

            {groupedOptions.length > 0 ? (
              <ul className={classes.listbox} {...getListboxProps()}>
                {groupedOptions.map((option, index) => (
                  <li
                    {...getOptionProps({ option, index })}
                    onClick={() => {
                      changeHandler(option.title);
                      // setSearchText(option.title);
                      // history.push('/');
                    }}
                  >
                    {option.title}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {searchText !== "" ? (
            <CloseRoundedIcon
              onClick={() => {
                setSearchText("");
                history.push("/");
              }}
            />
          ) : (
            ``
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

// export default topBar
