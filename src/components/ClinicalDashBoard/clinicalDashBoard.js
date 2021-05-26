import React from 'react';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import { useState } from 'react';
import PatientProblems from "./problems";
import UserInfo from "./userInfo";
import PatientAppointement from './patientAppointements';
import Visit from '../Visit/visit';
import Prescription from "../Prescription/Prescription";
import AllOrders from "../orderGeneration/allOrders";
import Row from 'react-bootstrap/Row'
import "./index.css";
import AddOrderForm from "../orderGeneration/addOrderForm"



const ClinicalDashBoard = ({match}) => {
  const history = useHistory();
  const [ptId, setPtId] = useState(41);

  useEffect(()=>{ 
    console.log("herree dashBoard:" , localStorage.getItem("role"));
    setPtId(match.params.id);
 });
 

  return (
    <div className="container mt-5">
      <div className="row">
      <div className="col-4 col-md-4 col-lg-3 ">
        <div class="wrapper">
          {/* Bootstrap SideBar */}
          <nav id="sidebar">
          <div className="sidebar-header">
              
          </div>

          <ul className="list-unstyled components">
              <li>
      
              {
                parseInt(localStorage.getItem("role")) === 8?
                (
                  <Link to={match.url+`/clinicalDashBoard/${ptId}`} style={{cursor:"pointer"}} >
                  Clinical DashBoard
                  </Link>
                ):(
                  <Link to="#" style={{cursor:"not-allowed"}} >
                  Clinical DashBoard
                  </Link>
                )
              }
              </li>
              <li>
              <Link to={match.url+`/patientAppointement`}>
                        Patient Appointement
              </Link>
              </li>
              <li>
              <Link to={match.url+`/patientOnGoingProblems/${"onGoingProblems"}`}>
                          On Going Problems
              </Link>
              </li>
              <li>
              <Link to={match.url+`/patientAllergyproblems/${"allergy"}`} >
                          Allergy Problems
              </Link>
              </li>
              <li>
              <Link to={match.url+`/allLabOrders/${"lab"}`} >
                          Lab Orders
              </Link>
              </li>
              <li>
              <Link to={match.url+`/allPathologyOrders/${"pathology"}`} >
                          Pathology Orders
              </Link>
              </li>
              <li>
              <Link to={match.url+`/allRadioOrders/${"radio"}`} >
                          radio Orders
              </Link>
              </li>

          
            
          </ul>
      </nav>

        </div>
      </div>
      <div className="col-8 col-md-8 col-lg-9  ">
        <Row>
          <UserInfo id={ptId} />
        </Row>        
      <Switch>  
      <Route exact path={match.path+"/clinicalDashBoard"} >
        <PatientProblems type={"allergy"} id={ptId} />
        <PatientProblems type={"onGoingProblems"} id={ptId}/>
      </Route> 
      <Route exact key={4} path={match.path+"/patientAllergyproblems/:type"}  component={PatientProblems}/> 
      <Route exact key={5} path={match.path+"/patientOnGoingproblems/:type"}  component={PatientProblems}/> 
      <Route exact path={match.path+"/patientAppointement"}  component={PatientAppointement}/> 
      
      
  
      
      <Route exact key={1} path={match.path+"/allLabOrders/:type"}  component={AllOrders}/> 
      <Route exact  path={match.path+"/allLabOrders/:type/addOrder"}  component={AddOrderForm}/> 
      {/* <Route exact  path={match.path+"/allLabOrders/:type/:id/allOrders"}  component={AllOrders}/>  */}

      <Route exact key={11} path={match.path+"/allLabOrders/:type"}  component={AllOrders}/> 

      <Route exact key={2} path={match.path+"/allPathologyOrders/:type"}  component={AllOrders}/> 
      <Route exact key={2} path={match.path+"/allPathologyOrders/:type/addOrder"}  component={AddOrderForm}/> 
      
      <Route exact key={3} path={match.path+"/allRadioOrders/:type"}  component={AllOrders}/> 
      
     
      <Route exact path={match.path+"/patientAppointement/:id/visit"}  component={Visit}/> 
      <Route exact path={match.path+"/patientAppointement/:id/visit/prescription/:visitId"}  component={Prescription}/> 
      <Route exact path={match.path+"/profile"}  component={Prescription}/> 
     
    </Switch>
    
      </div>
    </div>
  </div>

     
  );
}


export default ClinicalDashBoard;

     