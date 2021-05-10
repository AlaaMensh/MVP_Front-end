import React, { Component } from 'react';
import userType from '../usersDB.json';
import Modal from '@material-ui/core/Modal';
import ModalComp from "../typesGenerator/modalGenerator";
import axios from 'axios';
import DataTableComp from "../typesGenerator/dataTable";
// import "./dataTable.css";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class UserCrud extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      columns:[] ,
      openModal:false,
      ModalAddtionInputs : [] ,
      ModalUpdateInputs: [] ,
      data:[],
      temp:[],
      typeObj : {},
      type:"",
      formType:"add",
      addingUserObject : {},
      updateUserObject :{}
     }
  }

  handleClose = () => {
    this.setState({openModal : false})
  };
  handleopenModal = () => {
    this.setState({openModal : true})
  };
  setUpdatedObj = (id)=>{
    var obj =  this.state.data.find(row => row.id === id)
    // console.log("obj: " , obj);
    this.setState({typeObj : obj});
  }

  handleUpdate = async()=>{

    var details = {
      // id:this.state.typeObj.id,
      // firstName: this.state.firstName,
      // lastName: this.state.lastName,
      // phone: this.state.phone,
      // address: this.state.address,
      // degree: this.state.degree,
      // date : this.state.date,
    }

    for(var property in  this.state.updateUserObject){
      
      details[property] = this.state[property] || this.state.typeObj[property]; 
    }


    console.log("details on update : " ,  details)
    details["id"] = this.state.typeObj.id


    
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

          // console.log("formBody: ",formBody)
          // await fetch(`${userType[this.state.type].updateUser}`, {
          //   method: 'PUT',
          //   headers: {
          //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          //   },
          //   body: formBody
          // }).then(()=>{
          //   console.log("it is inserted");
          // }).catch(()=>{
          //   console.log("errror")
          // })
          //    this.getData(this.state.type)
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
    // formBody = formBody.join("&");
    
    fetch(`${userType[this.state.type].deleteUser}`, {
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

    this.setState({
      data: this.state.data.filter(row => row.id !== id)
     })
      
  }
  handleAdding = async()=>{
   
    var details = {
      // name: this.state.name,
      // description : this.state.description,
    }
    for(var p in this.state.addingUserObject ){ // for Addition Form Inputs
      details[p] = this.state[p]
    } 
    console.log("details on update : " ,  details)
    console.log("detilaas : " , details)

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    // console.log("formging:     " , formBody)
    
await fetch(`${userType[this.state.type].addUser}`, {
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
    this.getData(this.state.type);
  }
  getData = async(type)=>{
    // await axios.get(' http://localhost:2400/allergy').then(async resp => {
    await axios.get(`${userType[type].getAll}`).then(async resp => {
      // return resp.data;
       this.setState({  
          data : resp.data,
          temp : resp.data
      })
      console.log("resp.data: " , resp.data);
    
    })
    
  }

  async componentDidMount(){
    var type = this.props.match.params.type;

    this.setState({type});
    var temp = [];
    
    for(var p in userType[type].columnsTable ){ // for Adding actions Buttons to DataTable
      if(p === "actions"){
        userType[type].columnsTable[p]["cell"] =  (row) =>{ return(
        <div className = "row">
          <div className="col-auto">
            <button  className="btn btn-primary"
              onClick={async () => {  
                // console.log("rooooow : " , row)
                  // cnsole.log("id:  " , row)
                  await this.setUpdatedObj(row.id);
                  this.setState({formType :"edit"})
                  this.handleopenModal()
                }}>Update</button>
          </div>
        <div className="col-auto">
        <button  className="btn btn-danger"
              onClick={() => {
                  this.handleDelete(row.id)
                }}>Delete
        </button>
        </div>
        
        </div>
        )
        }
        temp.push(userType[type].columnsTable[p])
      }
      else{

        temp.push(userType[type].columnsTable[p])
      }
    }
    this.setState({columns : temp})
    temp = []

////////////////////////////////// / * ForAddition *////////////////////////////
var details = {}
    for(var p in userType[type].modalAdditionForms ){ // for Addition Form Inputs
      temp.push(userType[type].modalAdditionForms[p])
      console.log("here: " ,userType[type].modalAdditionForms[p]["name"] )
  
      details[userType[type].modalAdditionForms[p]["name"]] = ""
    } 
    this.setState({
      ModalAddtionInputs : temp,
      addingUserObject : details
    })
    console.log("details for Addition: " , details)
    
    

    
////////////////////////////////// / * ForUpdate *////////////////////////////
    temp = [];
     details = {}
    for(var p in userType[type].modalUpdateForms ){  // for Update Form Inputs
      temp.push(userType[type].modalUpdateForms[p])
      details[userType[type].modalUpdateForms[p]["name"]] = ""
    } 
    this.setState({
      ModalUpdateInputs : temp,
      updateUserObject : details
    })
    console.log("details for updating: " , details)


////////////////////////////////// / * setNew State With user attributes *////////////////////////////
    var newState = this.state;
    for(var property in userType[type].state ){ // to put user attributes in Component's state
      newState[property] = "" 
    }
    
    await this.getData(type);
  }

  handleChange = (evt) =>{
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value
    });
  }
  render() { 
    const tableData = {
      columns:this.state.columns,
      data :this.state.data
    };
 
    return (
      <div className="container " style={{height :"100%",display:"flex"}}>
        {console.log("updateObject: " , this.state.updateUserObject)}
        {console.log("additionObject: " , this.addingUserObject)}
        <div className="row  align-items-center"  style={{margin:"auto"}}>
          <Fab className="col-auto" color="primary" aria-label="add"  onClick = {()=>{
                   this.setState({formType :"add"})
                  this.handleopenModal();
                }}>
                  <AddIcon />
            </Fab> 
        <DataTableComp   data = {this.state.data}
                  columns = {this.state.columns}
                  tableData = {tableData}
                  title= "Allergy"
         />
      </div>
        
      {/* {console.log("formType : "  ,this.state.formType ,"modalAddition inputs" , this.state.ModalAddtionInputs)} */}
     {
      this.state.formType === "add" && this.state.ModalAddtionInputs &&this.state.ModalAddtionInputs.length > 0 ?(
        <ModalComp show={this.state.openModal}
        onHide={this.handleClose}
        ModalInputs={this.state.ModalAddtionInputs}
        updatedTypeObj = {this.state.typeObj}
        handleChange = {this.handleChange}
        handleUpdate = {this.handleUpdate}
        handleAdding={this.handleAdding}
        formType = {this.state.formType}
       />
       ):(
        <ModalComp show={this.state.openModal}
        onHide={this.handleClose}
        ModalInputs={this.state.ModalUpdateInputs}
        updatedTypeObj = {this.state.typeObj}
        handleChange = {this.handleChange}
        handleUpdate = {this.handleUpdate}
        handleAdding={this.handleAdding}
        formType = {this.state.formType}
       />
       )
     }
      </div>
    );
  }
}
 
export default UserCrud;