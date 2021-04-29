import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import  { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
// import  { useState } from 'react';
import { NativeSelect } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
// import AddIcon from '@material-ui/icons/AddIcon';
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
// import "./types.css";
// import EditIcon from '@material-ui/icons/Edit';

var object  = {}
const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor : "white",
    padding:"1em",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize:"1.1em",
    fontFamily:"Dosis"
  },
  input2 :{
    height:"10px"
  },
  iconPlus:{
    margin: "auto",
    textAlign:"center"
    // float:"right",
  },
  button: {
    margin: theme.spacing(1),
    fontFamily: 'Roboto Slab'
  },
  deleteButton: {
    backgroundColor:"#c94c4c"
  },
  editButton: {
    backgroundColor:"#c94c4c"
  }
});



var id = 0;
var rowsToKeep = [];
var rowsToBeDeleted = [];

class InterventionsStep extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      interventionsList : [
        //   {
        //       id:"",
        //       type:"" ,
        //       status:"",
        //       reaction:"",
        //       notes:"" 
        // }
      ],
      typeId:0,
      openModal1:false,
      openModal2:false,
      TypeObj : {},
      type:"",
      status :"",  
      name :"" , 
      date :"" , 
      notes:"" ,
      key:1
          }
        }
        
    getTypeByID = async(row) => {
        console.log("dkkdkdkdkdkdkdkdkdk:    " , row);
        this.setState({TypeObj : row});       
        
    }
        
    handleopenModal1 = () => {
      this.setState({openModal1 : true})
    };
  
     handleClose = () => {
      this.setState({openModal1 : false})
    };
    handleopenModal2 = () => {
      this.setState({openModal2 : true})
    };
    getData = async()=>{
      
    }
  
     handleCloseModal2 = () => {
      this.setState({openModal2 : false})
    };

 
    handleDelete= async(id)=>{
      this.setState({
        interventionsList: this.state.interventionsList.filter(row => row.id !== id)
       }) 
    }
   async componentDidMount(){
     if(this.props.interventionsListHome.length > 0 && this.props.interventionsListHome.length ){
       this.setState({interventionsList : this.props.interventionsListHome, key:this.props.interventionsListHome.length+1})
     }
      // this.getData()

    }
    handleUpdate = ()=>{

      var details = {
        id:this.state.TypeObj.id,
        name: this.state.name,
        date: this.state.status,
        notes: this.state.notes,
      }

      if(!details.name){
        details.name = this.state.TypeObj.name
      }
      if(!details.date){
        details.date = this.state.TypeObj.date
      }
      if(!details.notes){
        details.notes = this.state.TypeObj.notes
      }
        const items = this.state.interventionsList.map(
          item => item.id === this.state.TypeObj.id ? details : item
        );
      
        this.setState({interventionsList : items});
    }

    componentDidUpdate(){
        console.log("hhhhhhh")
        this.rendering();
        this.props.getinterventionsList(this.state.interventionsList)

    }

    rendering = () =>{
        return(
          <div className="container gridDataContent mt-5"> 
          <div className="row">
            <div className="col-auto px-2 py-2 text-center rounded  header">
                <span className="">Other Interventions List</span>
            </div>
            <div className="col-10 overflow-hidden ">
                <div className="row justify-content-lg-start">

                </div>
            </div>
          </div>
            <div className = "row gridDataHeader align-items-center" style={{ height: 400, width: '100%' }}>
               <DataGrid className="datagrid bg-light  rounded MuiDataGrid-cellCenter" style={{textAlign:"center"}} rows={this.state.interventionsList} columns={[
                 { field: 'id', headerName: 'id', width: 70 },
              { field: 'name', headerName: 'Name', width: 200 },
              { field: 'date', headerName: 'Date', width: 200 },
              { field: 'notes', headerName: 'Notes', width: 400 },
            
              { 
                field: 'Actions',
                headerName: 'Actions',
                width: 250,
                renderCell: (params) => (
                  <strong>
                    {/* {params.value.getFullYear()} */}
                    <Button
                      variant="contained"
                      color="default"
                      size="small"
                      className={this.props.classes.button}
                      startIcon={<EditIcon />}
                     
                      style={{ marginLeft: 16 }}
                      onClick={()=>{
                        this.handleopenModal1();
                        console.log("lsssssssssssssssssssssssssssssssssssss")
                        this.getTypeByID(params.row);
                        // this.getData()
                      }
                        
                      }
                    >
                       Edit
                      
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={this.props.classes.button , this.props.classes.deleteButton}
                      startIcon={<EditIcon />}
                      style={{ marginLeft: 16 }}
                      onClick={async ()=>{
                         console.log("delete function: " , params.row.id);
                        this.handleDelete(params.row.id);
                      }}
                    >
                      delete
                    </Button>
                  </strong>
                ),
              }]} pageSize={5}
                checkboxSelection  onRowSelected={async (row) => {
                  
                   
                  console.log("yes" , this.state.typeId);
                  }} getRowId ={(row) =>{
                      
                  }}
                  onRowClick = {(row)=>{
                      console.log("yyyys" , row);
                      id = row.row.id;
                      this.setState({typeId : row.row.id});
                  }} />
            </div> 
              <div className="row mt-4">
                      <Fab color="primary" aria-label="add" className ={this.props.classes.iconPlus} onClick = {()=>{
                          this.handleopenModal2()
                        }} >
                          <AddIcon  />
                        </Fab> 
                      </div>
                    </div>
        
        )
    }
    handleAdding = () =>{
      var details = {
        id:this.state.key,
        name: this.state.name,
        date : this.state.date,
        notes : this.state.notes,
      }
      
      this.setState({})
      console.log("detilaas : " , details)
      var joined = this.state.interventionsList.concat(details);
      this.setState({ interventionsList: joined });
      this.setState({key : this.state.key+1});
    }


    render() { 
      const { classes } = this.props;
                    
            return (
                <div className="hero">
                    {this.rendering()}

            <Modal
            open={this.state.openModal1}
            onClose={this.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
            <Container component="main" maxWidth="xs">
                {/* <CssBaseline /> */}
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <EditIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Edit
                    </Typography>
                    <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                        InputProps={{ classes: { input: this.props.classes.input2 } }}
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            // label="Name"
                            name="name" 
                            type="text"
                            autoComplete="Name"
                            placeholder={this.state.TypeObj.name}
                            onChange = {(event) =>{
                            // console.log("kkkk;   ", this.state.TypeObj.type)
                            this.setState({name : event.target.value});
                            }}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                        InputProps={{ classes: { input: this.props.classes.input2 } }}
                            variant="outlined"
                            required
                            fullWidth
                            id="date"
                            // label="Name"
                            name="date" 
                            type="date"
                            autoComplete="status"
                            placeholder={this.state.TypeObj.date}
                            onChange = {(event) =>{
                            // console.log("kkkk;   ", this.state.TypeObj.name)
                            this.setState({date : event.target.value});
                            }}
                        />
                        </Grid>
                        
                        <Grid item xs={12}>
                        <TextField
                        InputProps={{ classes: { input: this.props.classes.input2 } }}
                            variant="outlined"
                            required
                            fullWidth
                            id="notes"
                            // label="Name"
                            name="notes" 
                            type="text"
                            autoComplete="Notes"
                            placeholder={this.state.TypeObj.notes}
                            onChange = {(event) =>{
                            // console.log("kkkk;   ", this.state.TypeObj.notes)
                            this.setState({notes : event.target.value});
                            }}
                        />
                        </Grid>           
                    </Grid>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>{
                        this.handleUpdate();
                        this.getData();
                        // console.log("user: " , obj);
                        // handleSignup()
                        }}
                    >
                        Edit
                    </Button>
                    
                    </form>

                </div>
                {/* <Box mt={5}>
                    <Copyright />
                </Box> */}
            
                </Container>
            </Modal>


            <Modal
            key="1"
            open={this.state.openModal2}
            onClose={this.handleCloseModal2}
            aria-labelledby="simple-modal-title1"
            aria-describedby="simple-modal-description2"
            >
            <Container component="main" maxWidth="xs">
                {/* <CssBaseline /> */}
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <AddBoxIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Add
                    </Typography>
                    <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                        InputProps={{ classes: { input: this.props.classes.input2 } }}
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name" 
                            type="text"
                            autoComplete="name"
                            // placeholder={this.state.TypeObj.name}
                            onChange = {(event) =>{
                                console.log("ttttttttttt :    " , event.target.value)
                            this.setState({name : event.target.value});
                            }}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                        InputProps={{ classes: { input: this.props.classes.input2 } }}
                            variant="outlined"
                            required
                            fullWidth
                            id="date"
                            // label="date"
                            name="date" 
                            type="date"
                            autoComplete="date"
                            // placeholder={this.state.TypeObj.name}
                            onChange = {(event) =>{
                            this.setState({date : event.target.value});
                            }}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                        InputProps={{ classes: { input: this.props.classes.input2 } }}
                            variant="outlined"
                            required
                            fullWidth
                            name="notes"
                            label="Notes"
                            type="text"
                            id="notes"
                            autoComplete="notes"
                            // placeholder={this.state.TypeObj.description}
                            onChange = {(event) =>{
                            // console.log('hhhhhhhhhhhhhhhhhh' , event.target.value)
                            this.setState({notes : event.target.value});
                            }}
                            
                        />
                        </Grid>
                    
                    </Grid>
                    <Button
                        type="button"
                        variant="contained"
                        fullWidth
                        color="primary"
                        className={classes.submit}
                        onClick={()=>{
                        this.handleAdding();
                        this.getData();
                        // console.log("user: " , obj);
                        // handleSignup()
                        }}
                    >
                        Add
                    </Button>
                    
                    </form>
                </div>
                {/* <Box mt={5}>
                    <Copyright />
                </Box> */}
                </Container>
            </Modal>
                </div>
            
            );
    }
}
 
export default withStyles(useStyles)(InterventionsStep); 