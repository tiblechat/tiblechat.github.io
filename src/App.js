
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./used/getWeb3";
import NavbarUnused from "./unused/Navbar";
//import "./App.css";

class App extends Component {
  //state = { whitelist: [], web3: null, accounts: null, contract: null,testum:0 };


  constructor(props) {
    super(props);
    this.state =  { whitelist: [], web3: null, accounts: null, contract: null,testum:0 };
    this.runInit=this.runInit.bind(this);
    this.accountChanged=this.accountChanged.bind(this);
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

    
      const networkId = await web3.eth.net.getId();
      console.log("network id is: "+networkId);
      const deployedNetwork = VotingContract.networks[networkId];
      const instance = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runInit);

      // detect Metamask account change
      // note: not sure this is a good pattern to do it in that component...
      // window.ethereum.on('accountsChanged', function (newaccounts) 
      // {
      //   console.log('accountsChanges',newaccounts);
      //   this.setState({accounts: newaccounts });
      // });
      window.ethereum.on('accountsChanged', (accounts) => {
        this.accountChanged(accounts);
      });

      window.ethereum.on('chainChanged', (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        console.log("chain id is: "+chainId);
        //const networkId2 = await web3.eth.net.getId();
        //console.log("network id is: "+networkId2);
        window.location.reload();
      });


    } 
    catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  accountChanged(newaccounts)
  {
    console.log('accountsChanges',newaccounts);
    this.setState({accounts: newaccounts });
  }

  runInit = async() => {
    const { accounts, contract } = this.state;
  
    // récupérer la liste des comptes autorisés
    const whitelist = await contract.methods.getAdresses().call();
    console.log("from contract "+whitelist);
    // Mettre à jour le state 
    this.setState({ whitelist: whitelist });
    this.setState({ testum: 5 });
    //const { wl } = this.state.whitelist;
    console.log("from state 1 "+this.state.whitelist);
    console.log("accounts "+this.state.accounts);
  };

  whitelist = async () => {
    const { accounts, contract } = this.state;
    const address = this.address.value;

    const isowner = await contract.methods.isOwner().call({ from: accounts[0] });

    if (isowner) {
      try {
        // Interaction avec le smart contract pour ajouter un compte 
        await contract.methods.register(address).send({ from: accounts[0] });
        // Récupérer la liste des comptes autorisés
        this.runInit();
      }
      catch (error) {
        console.log("ca marche pas");
      }
    }
    else {
      console.log("not auhorized to this action")
    }
  }


  startRegistration = async () => {
    const { accounts, contract } = this.state;
   
    const isowner = await contract.methods.isOwner().call({ from: accounts[0] });

    if (isowner) {
      try {
        // Interaction avec le smart contract pour ajouter un compte 
        await contract.methods.startProposalsRegistration().send({ from: accounts[0] });
    
      }
      catch (error) {
        console.log("ca marche pas");
      }
    }
    else {
      console.log("not auhorized to this action")
    }
  }


  render() {
   // const { wl } = this.state.whitelist;
   // console.log("from state 2 "+wl);
  // const { toto } = this.state.testum;
  // console.log("from state 2 "+toto);
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
    <div className="App">
        <NavbarUnused account={this.state.accounts[0]} />
         <div>
       <h2 className="text-center">Système d'une liste blanche</h2>
       <hr></hr>
       <br></br>
     </div>
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
                     this.state.whitelist !== null &&this.state.whitelist.map((a) => <tr><td>{a}</td></tr>)
                   }
                 </tbody>
               </Table>
             </ListGroup.Item>
           </ListGroup>
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
           <Button onClick={this.whitelist} variant="dark" > Autoriser </Button>

           <Button onClick={this.startRegistration} variant="dark" > Start proposal registration </Button>
         </Card.Body>
       </Card>
        </div>
         <br></br>
    </div>
    );
  }
}

export default App;
