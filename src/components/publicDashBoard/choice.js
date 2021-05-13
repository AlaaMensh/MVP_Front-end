import React, { Component } from 'react';
import SessionCode from "../sessionCode";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
class ChoicePage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    renderBody = ()=>{
        return (
            <Card style={{ width: '18rem', height:"auto" }}>
            <Card.Img variant="top" src={window.location.origin + '/images/img1.svg'} />
            <Card.Body className="text-secodary mt-2 mx-auto">
                <Card.Text>
                    Enter the code to get patient Orders
                </Card.Text>
            </Card.Body>
            </Card>
        )
    }
    render() { 
        return (  
            <div className="container">
                <div className="row mt-5">
                    <div className="col-6">
                            <Card style={{ width: '18rem',height:"auto" }} className="bg-light text-secondary" 
                            onClick={()=>{
                                console.log("history: " , this.props);
                                
                                this.props.history.push(`${this.props.location.pathname}/allLabOrders`)
                            }}>
                                <Card.Img variant="top" style={{cursor:"pointer"}} src={window.location.origin + '/images/img1.svg'} />
                                <Card.Body className="text-secondary mt-2 mx-auto">
                                <Card.Text className="text-secondary">
                                  Get all Accepted orders
                                </Card.Text>
                                </Card.Body>
                                </Card>
                    </div>
                    <div className="col-6">

                         
                                    <SessionCode buttonValue = "get patient Orders"
                                        fromComponent={"choice"} 
                                        orderType={this.props.match.params.type}
                                        history = {this.props.history}
                                        body={this.renderBody()}/>
                          
                    </div>
                </div>

            </div>
        );
    }
}
 
export default ChoicePage;