import React, { Component } from 'react';
import loginUser from "../loginDB.json";
import FormGenerator from "./formGeneration";
import axios from 'axios';




class Login extends Component { //for Doctor - nurse - pathologist - chemist
    constructor(props) {
        super(props);
        this.state = { 
            formInputs : [],
            type:"",
            addingUserObject : {},


         }
    }
    async componentDidMount(){
        await this.handleDataTableColumns();
    }

    handleDataTableColumns = () => {
        
        var newState = this.state;
        for(var property in loginUser.state ){
            newState[property] = ""; 
        }
        
        
        var temp = []
        for(var p in loginUser.modalAdditionForms ){
          temp.push(loginUser.modalAdditionForms[p])
        } 
        // console.log("temp : "  , temp)
        this.setState({formInputs : temp})

    }


    handleChange = (evt) =>{
        console.log("evnet " , evt.target.value)
        const value = evt.target.value;
        this.setState({
          [evt.target.name]: value
        });
      }

       handleSignup = async()=>{
        var details = {};

      for(var property in loginUser.state ){
        details[property] = this.state[property]; 
        
      }
      // details["password"]= this.state[property].toString();
      // console.log("passwordType:" , typeof(details["password"]));
      
       
       var formBody = [];
       for (var property in details) {
         var encodedKey = encodeURIComponent(property);
         var encodedValue = encodeURIComponent(details[property]);
         formBody.push(encodedKey + "=" + encodedValue);
       }
       formBody = formBody.join("&");
       console.log("formBodu : " , formBody);

      //  axios.post(`${loginUser.addUser}` ,details).then((resp)=>{
      //   console.log("data: " , resp.data);
      //   localStorage.setItem('role', resp.data.role);
      //   localStorage.setItem('userId', resp.data.userId);
      //   localStorage.setItem('labId', resp.data.labId);

      //         if(parseInt(resp.data.role) > 2 ){
      //       this.props.history.push("/publicDashBoard")
      //     }
      //  })
       fetch(`${loginUser.addUser}`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
         },
         body: formBody
       }).then((resp)=>{
        resp.json().then((data)=>{
          console.log("data:  " , data);
          localStorage.setItem('role', data.role);
          localStorage.setItem('userId', data.userId);
      
          if(parseInt(data.role) > 2 ){
            this.props.history.push("/publicDashBoard")
          }
          if(parseInt(data.role) == 1){
            this.props.history.push("/welcomePage");
          }
          if(parseInt(data.role) == 2){
            console.log("heeereeeee")
            axios.post('http://localhost:3000/lab/getLabByUser' ,{
              userId: data.userId
            } ,{
            } ).then(async resp => {
              console.log("resppppppp : " ,resp);
              localStorage.setItem('labId', resp.data.labId);
              this.props.history.push("/publicDashBoard")
           
              // setLabs(resp.data)
              // console.log("resp.data: " , resp.data);
            
            })
          }
        //   if(data.role == "done"){
        //     history.push("/welcomePage");
        //     console.log("heeereeeee")
            
        //   }
      
        })
          // resp.json();
          
        }).catch(()=>{
         console.log("errror")
       })
    //    this.props.history.push("")
     
     }


    render() { 
        return ( 
            <div className="container">
                {console.log("state: " , this.state)}
                {
                this.state.formInputs && this.state.formInputs.length > 0 && (
                <FormGenerator  ModalInputs = {this.state.formInputs}
                handleChange = {this.handleChange}
                handleSubmit= {this.handleSignup}
                buttonTitle = "login"/>
                )
                }
            </div>
         );
    }
}
 
export default Login;