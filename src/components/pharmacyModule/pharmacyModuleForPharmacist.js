import React, { Component } from 'react';
import pharmacyModule from "../pharmacyModuleDB.json";
import DataTableComp from "../typesGenerator/dataTable";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ModalForView from './modalForView';

const data = {
  "drugs": {
      "44": [
          {
              "PID": 44,
              "notes": "null",
              "created_date": "2021-05-25T19:59:50.000Z",
              "genricName": "mm",
              "PD_id": 57,
              "Quantity": "1",
              "Duration": "7",
              "refailCount": 1
          },
          {
              "PID": 44,
              "notes": "null",
              "created_date": "2021-05-25T19:59:50.000Z",
              "genricName": "vx",
              "PD_id": 58,
              "Quantity": "1",
              "Duration": "7",
              "refailCount": 1
          },
          {
              "PID": 44,
              "notes": "null",
              "created_date": "2021-05-25T19:59:50.000Z",
              "genricName": "ccv",
              "PD_id": 59,
              "Quantity": "1",
              "Duration": "7",
              "refailCount": 1
          }
      ],
      "45": [
          {
              "PID": 45,
              "notes": "null",
              "created_date": "2021-05-25T19:59:50.000Z",
              "genricName": "mm",
              "PD_id": 57,
              "Quantity": "1",
              "Duration": "7",
              "refailCount": 1
          },
          {
              "PID": 45,
              "notes": "null",
              "created_date": "2021-05-25T19:59:50.000Z",
              "genricName": "vx",
              "PD_id": 58,
              "Quantity": "1",
              "Duration": "7",
              "refailCount": 1
          },
          {
              "PID": 45,
              "notes": "null",
              "created_date": "2021-05-25T19:59:50.000Z",
              "genricName": "ccv",
              "PD_id": 59,
              "Quantity": "1",
              "Duration": "7",
              "refailCount": 1
          }
      ]
  },
  "prescriptions": [
      {
          "id": 44,
          "created_date": "2021-05-25T19:59:50.000Z",
          "notes": "null"
      },
      {
          "id": 45,
          "created_date": "2021-05-25T19:59:50.000Z",
          "notes": "null"
      }
  ]
}
const row = [
    {created_date : "one" , patientName :"one" , notes:"one" },
    {created_date : "one" , patientName :"one" , notes:"one" },
    {created_date : "one" , patientName :"one" , notes:"one" },
]
const drugs = [
    {drugName : "one" , quantity :"one" , duration:"one",refialCount:"" },
    {drugName : "one" , quantity :"one" , duration:"one",refialCount:"" },
]
class PharmacyModuleForPharmacist extends Component { // this Component to View All The Not Accepted Orders in our System
    constructor(props) {
        super(props);
        this.state = { 
            type:"",
            columns:[],
            drugs_columns:[{
              "name" :"Genric Name",
              "selector" : "genricName",
              "sortable":true
            },
            {
              "name" :"Quantity",
              "selector" : "Quantity",
              "sortable":true
            },
            {
              "name" :"Duration",
              "selector" : "Duration",
              "sortable":true
            },
            {
              "name" :"Refail Count",
              "selector" : "refailCount",
              "sortable":true
            },
            {
              "name" :"actions",
              "selector" : "actions",
              "sortable":true
            },
            {
              "name" :"input",
              "selector" : "input",
              "sortable":true
            },
          ],
            prescriptionDrugs:[] ,// this will be viewed in DataTable Component
            openModal:false,
            drugQuantity:"", // remove it if you don't use
            prescriptions:""
         }
    }

    getDrugsForPresctiption = (presciptionID) =>{
      var temp =[];
      for(var p of data.drugs[presciptionID]){
          temp.push(p);
      }
      this.setState({prescriptionDrugs : temp});
       temp =[];
    }

    async componentDidMount(){
        this.setState({type: "pharmacyModule"});
        var type = "pharmacyModule";
          // **for Pharmacist to get PatientData with code***
        await this.getDataForPatientPrescriptions(type);
        await this.handleDataTableColumnsForPharmacist(type)
        this.handleDaTaTableModel()
    }

    handleClose = () => {
      this.setState({openModal : false})
    };

    handleopenModal = () => {
      this.setState({openModal : true})
    };



    handleAccept = async (id,value) =>{
      
      console.log("Accepted IDS:  " , this.state.acceptedIds , " value: " , value )
  //     var details = {
  //       id : id,  
  //       labFDId : localStorage.getItem("labId"),
  //     }

      
  //     console.log("detilaas : " , details)

  //     var formBody = [];
  //     for (var property in details) {
  //       var encodedKey = encodeURIComponent(property);
  //       var encodedValue = encodeURIComponent(details[property]);
  //       formBody.push(encodedKey + "=" + encodedValue);
  //     }
  //     formBody = formBody.join("&");
  //     console.log("formging:     " , formBody)
  //     console.log("formging:     " , JSON.stringify(details))
      
  // await fetch(`${pharmacyModule[this.state.type].acceptOrder}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  //       },
  //       body: formBody
  //     }).then((resp)=>{
  //       console.log("Getting: " , resp);
  //       resp.json().then((data)=>{
  //         console.log("ddddddddddddddddd;  " , data[0])
  //         this.setState({
  //           TypeObj:data[0]
  //         })
  //         // object = data
  //       })
  //     }).catch(()=>{
  //       console.log("errror")
  //     })
   
    }   

    getDataForPatientPrescriptions = async(type)=>{  // *****Change it with end point get last 10 prescription
    var details = {     
        ptCode : this.props.history.location.state,
    }
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
        ///*********** */ change it with patient Code
    fetch(`${pharmacyModule["pharmacyModule"].getLastTenPrescription}/41`, { 
        method: 'GET',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },

    }).then((resp)=>{
        resp.json().then((data)=>{
        console.log("All Incomming Data;  " , data)
        this.setState({ 
          prescriptions: data.prescriptions
        })
        })
    }).catch(()=>{
        console.log("errror")
    })
    
    }

    handleDataTableColumnsForPharmacist = (type) => {       
        var temp = []
        for(var p in pharmacyModule[type].columnsTable ){
          if(p === "actions"){
            pharmacyModule[type].columnsTable[p]["cell"] =  (row) =>{ return(
            <div className = "row">
              <div className="col-auto">
                <button  className="btn btn-primary"
                  onClick={() => {  
                      console.log("id:  " , row)
                      this.getDrugsForPresctiption(row.id);
                      this.handleopenModal()
                    }}>Show prescription</button>
                    {/* <SessionCode  buttonValue={"Accept"}/> */}
              </div>
            
            </div>
            )
            }
            temp.push(pharmacyModule[type].columnsTable[p])
          }
          else{
            temp.push(pharmacyModule[type].columnsTable[p])
          }
        }
        this.setState({columns : temp})
        temp = []
        var newState = this.state;
        for(var property in pharmacyModule[type].state ){
          newState[property] = "" 
        }
        this.setState({newState})
    
        // if the page Will Contain modal
        
        // for(var p in columns[type].modalForms ){
        //   // console.log("p : " , columns[type].modalForms[p]);
        //   temp.push(columns[type].modalForms[p])
        // } 
        // // console.log("temp : "  , temp)
        // this.setState({ModalInputs : temp})
    

    }

    handleDaTaTableModel = () => { // handle DataTable for Modals
      var temp =[] ;
      for(var pp of this.state.drugs_columns ){
        var p = pp.name;
        if(p === "actions"){
          pp["cell"] =  (row) =>{ return(
          <div className = "row">
            <div className="col-auto">
              <button  className="btn btn-primary" style={{cursor : "pointer"}}
                onClick={() => {  
                    console.log("id:  " , row)
                    if(document.getElementById(row.PD_id).value){
                      this.handleAccept(row.PD_id , document.getElementById(row.PD_id).value)
                      // console.log("documentByID:  " , document.getElementById(row.PD_id))
                    }
                    else{
                      alert("you should enter quantity")
                    }
                  }}>dispense</button>
            </div>
          
          </div>
          )
          }
          temp.push(pp[p])
        }
        else{
          temp.push(pp[p])
        }
        if(p === "input"){
          
          pp["cell"] =  (row) =>{
            return(
          <div className = "row">
            <div className="col-auto">
                  <input max="20" min="1" id={row.PD_id}  className="form-control" type="number" onChange={(e)=>{
                    this.setState({drugQuantity: e.target.value})
                  }} />
                  {/* <SessionCode  buttonValue={"Accept"}/> */}
            </div>
          
          </div>
          )
          }
          temp.push(pp[p])
        }
        else{
          temp.push(pp[p])
        }
     
      }
    }
    renderModalBody = () =>{
      return (
            <DataTableComp  data = {this.state.prescriptionDrugs} //change it to Drugs
        columns = {this.state.drugs_columns }
        title=""
        />
      )
    }
  
    render() { 
        return (     
         
        <Container fluid>
            
            <Row className= "py-3">
                <Col>
                    <h3>All patient Drugs</h3>
                    <div>simple blah blah this the page and what it dose you know stuff...</div>
                </Col>
            </Row>
            <Row className= "py-3" >
                <Col sm={10}></Col>
                    <Col sm={2}><Button variant="success"  onClick = {()=>{
                   this.props.history.push({
                       pathname:`${this.props.history.location.pathname}/prescription`,
                       state:{}
                   })
                    }}>Add New</Button>{' '}</Col>
            </Row>

            <Row className= "py-3">
               <Col>
                <DataTableComp  data = {data.prescriptions} //change it to Drugs
                  columns = {this.state.columns}
                  title=""
                  />
               </Col> 
           
         </Row>
            {
              this.state.prescriptionDrugs && (
                <ModalForView show={this.state.openModal} onHide={this.handleClose} body={this.renderModalBody()}  />
                // <Modal show={this.state.openModal} onHide={this.handleClose}>
                // <Modal.Header closeButton>
                //   <Modal.Title>{this.props.formType} Form</Modal.Title>
                //   </Modal.Header>
                //   <Modal.Body>
                // <DataTableComp  data = {this.state.prescriptionDrugs} //change it to Drugs
                //     columns = {this.state.drugs_columns }
                //     title=""
                //     />
                // </Modal.Body>
              
  
  
                // </Modal>
              
              )
            }
             
         
         </Container>
         


         );
    }
}
 
export default PharmacyModuleForPharmacist;