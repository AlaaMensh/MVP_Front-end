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

class Disease extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      diseaseList : [],
      typeId:0,
      openModal1:false,
      openModal2:false,
      TypeObj : {},
      name:"",
      code:"",
      abbreviation:""  

          }
        }
        
       
        getTypeByID = async(id) => {
          console.log("dkkdkdkdkdkdkdkdkdk:    ")
     
          var details = {
            id:id
          }
          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }          
          fetch(`http://localhost:3000/allergy/getById`, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
          }).then((resp)=>{
            console.log("Getting: " , resp.data);
            this.setState({
              TypeObj:resp.data.json()
            })
          }).catch(()=>{
            console.log("errror")
          })
        }
        getDiseaseListTypesList = (diseaseList) =>{
        for(var type in diseaseList){
            console.log("type: ", type.name);
        }
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
  
     handleCloseModal2 = () => {
      this.setState({openModal2 : false})
    };
    getData = async()=>{
      // await axios.get(' http://localhost:2400/disease').then(async resp => {
      await axios.get('http://localhost:3000/disease/getDisease').then(async resp => {
        // return resp.data;
         this.setState({
            diseaseList : resp.data
        })
        console.log("resp.data: " , resp.data);
      
      })
      
    }
  
     handleCloseModal2 = () => {
      this.setState({openModal2 : false})
    };
    refreshAfterDeletion = (id)=>{
     this.setState({
      allergyList: this.state.allergyList.filter(row => row.id !== id)
     })
    }
 
    handleDelete= async(id)=>{
      var details = {
        id:id
      }
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }      
      fetch('http://localhost:3000/disease/deleteDisease', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then(()=>{
        console.log("it is deleted");
      }).catch(()=>{
        console.log("errror")
      })
         
    }
   async componentDidMount(){
      this.getData()
    }
  
    handleUpdate = ()=>{
      var obj = {
        id:this.state.TypeObj.id,
        name: this.state.name,
        code: this.state.code,
        abbreviation : this.state.abbreviation,
      }
      if(!obj.name){
        obj.name = this.state.TypeObj.name
      }
      if(!obj.code){
        obj.code = this.state.TypeObj.code
      }
      if(!obj.abbreviation){
        obj.abbreviation = this.state.TypeObj.abbreviation
      }

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      fetch('http://localhost:3000/disease/updateDisease', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then(()=>{
        console.log("it is inserted");
      }).catch(()=>{
        console.log("errror")
      })
         this.getData()
    }

    componentDidUpdate(){
      console.log("hhhhhhh")
      this.rendering();
  }

    rendering = () =>{
        return(
            <div className="container gridDataContent mt-5"> 
            <div className="row">
              <div className="col-2 text-center py-3 rounded px-4 header">
                  <span className="">Ellergy Types</span>
              </div>
              <div className="col-10 overflow-hidden ">
                  <div className="row justify-content-lg-start">
  
                  </div>
              </div>
            </div>
              <div className = "row gridDataHeader align-items-center" style={{ height: 400, width: '100%' }}>
                 <DataGrid className="datagrid bg-light  rounded MuiDataGrid-cellCenter" style={{textAlign:"center"}} rows={this.state.allergyList} columns={[
                   { field: 'name', headerName: 'Name', width: 200 },
                { field: 'code', headerName: 'Code', width: 100 },
                { field: 'abbreviation', headerName: 'Abbreviation', width: 500 },
                // { field: <button>Hi</button>, headerNam
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
                        this.getTypeByID(params.row.id);
                        this.getData()
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
                       this.refreshAfterDeletion(params.row.id);
                     }}
                   >
                     delete
                   </Button>
                 </strong>
               ),
             }]} pageSize={5}
               checkboxSelection  onRowSelected={async (row) => {
                 // this.handleDelete(row.data.id);
                 // document.getElementById("hide").hidden = true;
                  
                 console.log("yes" , this.state.typeId);
                 }} getRowId ={(row) =>{
                     // console.log("id: " , row.id);
                 }}
                 onRowClick = {(row)=>{
                     console.log("yyyys" , row);
                     id = row.row.id;
                     // this.settypeID(row.row.id);
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
      var obj = {
        name: this.state.name,
        code: this.state.code,
        abbreviation : this.state.abbreviation,
      }

      console.log("detilaas : " , details)

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      console.log("formging:     " , formBody)
      
      fetch('http://localhost:3000/allergy/addAllergy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then(()=>{
        console.log("it is inserted");
      }).catch(()=>{
        console.log("errror")
      })
      this.getData();
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
                  this.setState({name : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="code"
                // label="description"
                type="text"
                id="code"
                autoComplete="current-password"
                placeholder={this.state.TypeObj.code}
                onChange = {(event) =>{
                  // console.log('hhhhhhhhhhhhhhhhhh' , event.target.value)
                  this.setState({code : event.target.value});
                }}
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="abbreviation"
                // label="description"
                type="text"
                id="abbreviation"
                autoComplete="current-password"
                placeholder={this.state.TypeObj.code}
                onChange = {(event) =>{
                  // console.log('hhhhhhhhhhhhhhhhhh' , event.target.value)
                  this.setState({abbreviation : event.target.value});
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
      {}
    </Container>
</Modal>

<Fab color="primary" aria-label="add" >
  <AddIcon  onClick = {()=>{
  this.handleopenModal2()
}}/>
</Fab>
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
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name" 
                type="text"
                autoComplete="Name"
                // placeholder={this.state.TypeObj.name}
                onChange = {(event) =>{
                  this.setState({name : event.target.value});
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="code"
                label="code"
                type="text"
                id="code"
                autoComplete="current-password"
                // placeholder={this.state.TypeObj.description}
                onChange = {(event) =>{
                  // console.log('hhhhhhhhhhhhhhhhhh' , event.target.value)
                  this.setState({code : event.target.value});
                }}
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="abbreviation"
                label="abbreviation"
                type="text"
                id="abbreviation"
                autoComplete="current-password"
                // placeholder={this.state.TypeObj.description}
                onChange = {(event) =>{
                  // console.log('hhhhhhhhhhhhhhhhhh' , event.target.value)
                  this.setState({abbreviation : event.target.value});
                }}
                
              />
            </Grid> 
           
          </Grid>
          <Button
            type="button"
            variant="contained"
            color="primary"
            fullWidth
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
  
export default withStyles(useStyles)(Disease); 