
import Button from '@material-ui/core/Button';

import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';

import React from 'react';
import clsx from 'clsx';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import "./Navbar.css";
import CardMedia from '@material-ui/core/CardMedia';
// import Navbar from './Navbar';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      
    }),
    backgroundColor: "#648695",
    // padding: "0.4em",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
   
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  loginLogoutButton : {
    backgroundColor: "transparent",
    border: "1px solid #fff",
    transitions:"all 0.4s",
    color: '#fff',
    '&:hover': {
      backgroundColor: '#9fb8c3',
    
  },
  },
  cardStyle:{
    width:"90%",
    height:"auto",
    borderRadius:"1em",
    padding:"1em"
    // display:"flex",
    // backgroundColor:"yellow"
  },
  media: {
    height: 50,
    margin:"1em",
    padding:"3em 2em"
  },
  cardContentHeight:{
    height: 60,
  },
  button:{  

  },
  learnMoreBtn:{
    padding:"0.5em 2em",
    backgroundColor:"transparent",
    border:"2px solid #9fb8c3",
    boxShadow:"2px 2px 9px #bcb4b4",
    '&:hover': {
      backgroundColor: '#9fb8c3',
  },
  },
  GridSpacing:{
    // padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(4),
    },
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(1),
    },
  }
  
    
}));

const DashBoardComp = ({name , appBarList ,role , dropDownFunctions ,isLogin , MainFunctions}) => {
  const history = useHistory();
  const [spacing, setSpacing] = React.useState(2);
  const [logged, setlogged] = React.useState(isLogin);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  


  useEffect(()=>{
    console.log("‘hello’" , name , appBarList , role , dropDownFunctions ,isLogin , MainFunctions);
    // setTimeout( ()=>{ alert(‘hello’); }, 2000);
 });
 
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  

  const handleDrawerClose = () => {
    setOpen(false);
  };
  

  return (
    <div className={classes.root}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {/* <img className="mt-5" src="images/img1.svg" /> */}
        <div className={classes.drawerHeader} />
        <Typography className="row">
        <Grid container justify="center" className="ml-2 " spacing = {4}>
          {MainFunctions.map(value => (
        <Grid key={value} item xs={12} sm={4} md={3} >
        <Card className={classes.cardStyle}>
        {/* <Card > */}
         <CardMedia
          className={classes.media}
          style={{padding:"3em"}}
          image="images/img1.svg"
          title="Contemplative Reptile"
        />
        <CardContent className={classes.cardContentHeight}>
          <Typography color="" className="text-center text-secondary" gutterBottom>
            {value.text}
          </Typography>
        </CardContent>
        <CardActions className="row justify-content-center ">
          <Button className={classes.learnMoreBtn} size="small" 
          onClick={()=>{
            if(value.role === "doctor" && value.text === "New Doctor Appointement"){
              history.push("/appointement");
            }
            if(value.role==="patient" && value.text ==="New patient Registration"){
              history.push("/");
            }
            // if(value.role==="doctor" && value.text ==="New Doctor Appointement"){
            //   history.push("/");
            // }
            // if(value.role==="doctor" && value.text ==="New Doctor Appointement"){
            //   history.push("/");
            // }
            // if(value.role==="doctor" && value.text ==="New Doctor Appointement"){
            //   history.push("/");
            // }
            // if(value.role==="doctor" && value.text ==="New Doctor Appointement"){
            //   history.push("/");
            // }
            // if(value.role==="doctor" && value.text ==="New Doctor Appointement"){
            //   history.push("/");
            // }
          }}>Learn More</Button>
        </CardActions>
      </Card>
            </Grid>
          ))}
        </Grid>

        </Typography>
      
      </main>
    </div>
  );
}
export default DashBoardComp