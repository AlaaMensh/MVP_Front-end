import React, { Component } from 'react';
import columns from '../typesDB.json';
import ModalComp from "./modalGenerator";
import axios from 'axios';
import DataTableComp from "./dataTable";
import "./dataTable.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class TypesGenerator extends Component {

  // the baisc set up for the state.
  constructor(props) {
    super(props);
    this.state = { 
      columns:[] ,
      openModal:false,
      ModalInputs : [] ,
      data:[],
      temp:[],
      typeObj : {},
      type:"",
      formType:"add"
     }
  }
// modal handeling 

  handleClose = () => {
    this.setState({openModal : false})
  };
  handleopenModal = () => {
    this.setState({openModal : true})
  };
  setUpdatedObj = (id)=>{
    var obj =  this.state.data.find(row => row.id === id)
    console.log("obj: " , obj);
    this.setState({typeObj : obj});
  }

  handleUpdate = async()=>{

          var details = {
            id:this.state.typeObj.id,
          }
          for(var p in columns[this.state.type].state ){ // take attributes in state and put in object to backend
            details[p] = this.state[p] || this.state.typeObj[p]; 
          }
          console.log("/////////////////" , details)

    
          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");

          console.log("formBody: ", formBody)
          await fetch(`${columns[this.state.type].updateType}`, {
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
             this.getData(this.state.type)
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
    
    await fetch(`${columns[this.state.type].deleteType}`, {
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
   
    var details = {}
    for(var p in columns[this.state.type].state ){ // take attributes in state and put in object to backend
      details[p] = this.state[p] || this.state.typeObj[p]; 
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
    
await fetch(`${columns[this.state.type].addType}`, {
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
    await axios.get(`${columns[type].getAll}`).then(async resp => {
      // return resp.data;
       this.setState({  
          data : resp.data,
          temp : resp.data
      })
      console.log("resp.data: " , resp.data);
    
    })
    
  }



  async componentDidMount(){
    var type = "disease";
    this.setState({type});
    
    var temp = []
    for(var p in columns[type].columnsTable ){
      if(p === "actions"){
        console.log("uuuuuuuuuuuuuuuuuuuu" ,p)
        columns[type].columnsTable[p]["cell"] =  (row) =>{ return(
        <div className = "row">
          <div className="col-auto">
            <button  className="btn btn-primary"
              onClick={() => {  
                console.log("rooooow : " , row)
                  console.log("id:  " , row)
                  this.setUpdatedObj(row.id);
                  this.setState({formType :"edit"})
                  this.handleopenModal()
                }}>Update</button>
          </div>
        <div className="col-auto">
        <button  className="btn btn-danger"
              onClick={() => {
                  // console.log("id:  " , row)
                  this.handleDelete(row.id)
                }}>Delete</button>
        </div>
        
        </div>
        )
        }
        temp.push(columns[type].columnsTable[p])
      }
      else{

        temp.push(columns[type].columnsTable[p])
      }
    }
    this.setState({columns : temp})
    temp = []



    for(var p in columns[type].modalForms ){
      // console.log("p : " , columns[type].modalForms[p]);
      temp.push(columns[type].modalForms[p])
    } 
    // console.log("temp : "  , temp)
    this.setState({ModalInputs : temp})

    var newState = this.state;
    for(var property in columns[type].state ){
      // console.log("propertyyyy :  " , property)
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


  <Container>
            <Row py-3>
                <Col>
                    <h3>here is the title</h3>
                    <div>simple blah blah this the page and what it dose you know stuff...</div>
                </Col>
            </Row>

            <Row py-3 >
            <Col sm={10}></Col>
                <Col sm={2}><Button variant="success"  onClick = {()=>{
                   this.setState({formType :"add"})
                  this.handleopenModal();
                }}>Add New</Button>{' '}</Col>
            </Row>
            <Row py-3>

                <Col sm={12} className="py-3">
        <DataTableComp   data = {this.state.data}
                  columns = {this.state.columns}
                  tableData = {tableData}
         />
       </Col>
            </Row>
       
        

     {
       this.state.ModalInputs &&this.state.ModalInputs.length > 0 &&(
        <ModalComp show={this.state.openModal}
        onHide={this.handleClose}
        ModalInputs={this.state.ModalInputs}
        updatedTypeObj = {this.state.typeObj}
        handleChange = {this.handleChange}
        handleUpdate = {this.handleUpdate}
        handleAdding={this.handleAdding}
        formType = {this.state.formType}
       />
       )
     }
 </Container>
    );
  }
}
 
export default TypesGenerator;