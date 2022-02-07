
import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import { Button, ListGroup, Form, Table, Container, Row, Col } from 'react-bootstrap';
import "./Proposals.css";


class Proposals extends Component {

    constructor(props) {
        super(props);

        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleClickText = this.handleClickText.bind(this);
    }

    handleClickButton() {

       
        this.props.onPageChangedClicked(3,-1);
    }

    handleClickText(index) {
       
        this.props.onPageChangedClicked(4,index);
    }

    componentDidMount = async () => {

    };

    // {people.map((person, index) => (
    //     <p key={index}>{person.name}</p>
    //   ))}
    render() {
        var listDisplayed;
        if (typeof this.props.proposals !== 'undefined') {


            listDisplayed = (this.props.proposals.map((propo, index) =>
            (
                // <p key={index}>{person.name}</p>
                <li key={index} class="list-group-item">

                    <div class="card" onClick={() => this.handleClickText(index)}>
                        <div class="card-body">
                            {/* <h4 class="card-title">TODO</h4> */}
                            <p class="card-text">{propo.description}</p>
                            <a href="#" class="card-link">Go to proposal</a>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <p class="card-text">{"Vote count: "+propo.voteCount}</p>
                        </div>
                    </div>


                </li>
            )
            ))
        } else {
            listDisplayed = <h1>TODO</h1>;
        }


        var isProposal = false;
        if (this.props.proposals.length > 0)
        {
            isProposal = true;
        }


        var col2;
        
        if (isProposal)
        {
            col2 =                      <div class="col-sm-9"> <div style={{ display: 'flex', justifyContent: 'center' }}>

            <div class="w-100">
                <ul class="list-group">

                    {listDisplayed}


              




                </ul>
            </div>

        </div></div>;
        }

        return (
            <div className="Proposals">

                <div class="container">
                    <div class="row">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <h1 class="px-0 align-middle text-white">Proposals</h1>
                        </div>
                    </div>
                  
                    <div class="row">
                        <div class="col-sm-3">
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div class="container p-5 my-5">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button onClick={() => this.handleClickButton()} text-white bg-primary>New proposal</Button>
                                    </div>
                                </div>
                            </div></div>
   
                  
                
{col2}

                {/* <Container>
                    <Row>
                        <Col>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <br></br>
                                <Card style={{ width: '20rem' }}>

                                    <Card.Body>

                                        <Button onClick={() => this.handleClickButton()} variant="dark" > Add new </Button>


                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        <Col>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>


                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <textarea onClick={() => this.handleClickText()}
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="5"> salut ca va
                                        </textarea>
                                        </ListGroup.Item>
                                    <ListGroup.Item>Proposition 2</ListGroup.Item>
                                    <ListGroup.Item>Proposition 3</ListGroup.Item>
                                </ListGroup>

                            </div>
                        </Col>

                    </Row>
                </Container> */}
            </div>
            </div>
            </div>

        );
    }
}

export default Proposals;
