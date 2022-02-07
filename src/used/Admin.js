
import React, { Component } from "react";

import Card from 'react-bootstrap/Card'
import { Button, ListGroup, Form, Table } from 'react-bootstrap';
import Stepper from 'react-stepper-horizontal';
class Admin extends Component {

    // TODO: move steps outside state if necessary

    constructor() {
        super();
        this.state = {
            steps: [{
                title: 'Start whitelisting',
                // href: 'http://example1.com',
                // onClick: (e) => {
                //     e.preventDefault()
                //     console.log('onClick', 1)
                // }
            }, {
                title: 'Start proposal registration',
                // href: 'http://example2.com',
                // onClick: (e) => {
                //     e.preventDefault()
                //     console.log('onClick', 2)
                // }
            }, {
                title: 'End proposal registration',
                // href: 'http://example3.com',
                // onClick: (e) => {
                //     e.preventDefault()
                //     console.log('onClick', 3)
                // }
            }, {
                title: 'Start voting',
                // href: 'http://example4.com',
                // onClick: (e) => {
                //     e.preventDefault()
                //     console.log('onClick', 4)
                // }
            },
            {
                title: 'End voting',
                // href: 'http://example4.com',
                // onClick: (e) => {
                //     e.preventDefault()
                //     console.log('onClick', 4)
                // }
            },
            {
                title: 'Count votes',
                // href: 'http://example4.com',
                // onClick: (e) => {
                //     e.preventDefault()
                //     console.log('onClick', 4)
                // }
            }
        
        
        ],
            
        };
        this.onClickNext = this.onClickNext.bind(this);
        this.onAuthorize = this.onAuthorize.bind(this);
    }

    onAuthorize() {
     
      this.props.onWhitelistButton(this.address);
    }


    onClickNext() {
       
        this.props.onNextStepButton();

        // if transaction is ok, update state (maybe not the best pattern)

        
    }


    componentDidMount = async () => {

    };


    render() {
        const steps = this.state.steps;
        var currentStep = this.props.currentStep;
        const buttonStyle = { background: '#E0E0E0', width: 200, padding: 16, textAlign: 'center', margin: '0 auto', marginTop: 32 };

  


        return (
            <div className="Admin">
                
               
              
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: '50rem' }}>
                        <Card.Header><strong>Voting status</strong></Card.Header>
                        <Card.Body>
                            {/* <Stepper steps={steps} activeStep={currentStep} disabledSteps={[2]} /> */}
                            <Stepper steps={steps} activeStep={currentStep}/>
                            <div style={buttonStyle} onClick={this.onClickNext}>Next</div>
                        </Card.Body>
                    </Card>
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: '50rem' }}>
                        <Card.Header><strong>Autoriser un nouveau compte</strong></Card.Header>
                        <Card.Body>
                            <Form.Group controlId="formAddress">
                                <Form.Control type="text" id="address"
                                    ref={(input) => { this.address = input }}
                                />
                            </Form.Group>
                            <Button variant="dark" onClick={this.onAuthorize}> Autoriser </Button>


                        </Card.Body>
                    </Card>
                </div>
                <br></br>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: '50rem' }}>
                        <Card.Header><strong>Liste des comptes autorisés</strong></Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>@</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.whitelist !== null && this.props.whitelist.map((a) => <tr><td>{a}</td></tr>)
                                            }
                                        </tbody>
                                    </Table>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Admin;
