
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Mainpage from './Mainpage';
import Menu from './Menu';
import NavbarSimple from './NavbarSimple';
import MainpageSelector from "./MainpageSelector";
import VotingContract from "../contracts/Voting.json";
import getWeb3Click from "./getWeb3";

import "./votingappstyle.css";
class Main extends Component {

    constructor(props) {
        super(props);
        // current page in session state
        var page = parseInt(localStorage.getItem('currentpage'));
        console.log("page courante = " + page);
        if (page < 0)
            page = 0;
        if (page > 4)
            page = 4;
        if ((page === null) || (isNaN(page))) {
            page = 0;
        }
        var proposal = parseInt(localStorage.getItem('currentproposal'));
        if ((proposal === null) ||(isNaN(proposal))) 
        {
            proposal = 0;
        }

        var connectstatus = parseInt(localStorage.getItem('connectstatus'));
        if ((connectstatus != 1)&& (connectstatus != 2)) {
            connectstatus = 0;
        }


        //console.log(proposal);
        this.state = {
            currentpage: page,
            currentAccount: "",
            currentAmount: "",
            currentBlockchain: "",
            connectStatus: connectstatus,
            thewhitelist: [],
            theproposals: [],
            theweb3: null,
            theaccounts: null,
            thecontract: null,
            currentStep: 0,
            currentProposal: proposal,
            winningId: -1
        };

        console.log("CONSTRUCTOR");

        this.runInit = this.runInit.bind(this);

        this.accountChanged = this.accountChanged.bind(this);
        this.loadWeb3 = this.loadWeb3.bind(this);





    }

    reload() {
        window.location.reload();


    }

    componentDidMount = async () => {
        // automatic connect only if no previous error
        console.log("connect status: " + this.state.connectStatus);
        //if (this.state.connectStatus === 0)
            this.loadWeb3();

        // // getter
        // var page = localStorage.getItem('currentpage');
        // if (page != null)
        // {
        //     console.log("********************* "+page);
        //     this.setState({ currentpage:page});
        // }
        // else
        // {
        //     console.log("+++++++++++++++++++++++++ "+page);
        // }


    };

    loadWeb3 = async () => {

        console.log("running loadweb3");

        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3Click();
            console.log(web3);

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            if ((web3.currentProvider != null) && (web3.eth.net != null)) {
                const networkId = await web3.eth.net.getId();

                const deployedNetwork = VotingContract.networks[networkId];

                if (deployedNetwork != null) {
                    const instance = new web3.eth.Contract(
                        VotingContract.abi,
                        deployedNetwork && deployedNetwork.address,
                    );

                    const bal = await web3.eth.getBalance(accounts[0]);
                    var chainname = "undefined";
                    if (networkId === 1)
                        chainname = "mainnet";
                    if (networkId === 5777)
                        chainname = "ganache";
                    if (networkId === 42)
                        chainname = "kovan";
                    // TODO: others if necessayry (if deployed)
                    var balEther = web3.utils.fromWei(bal, 'ether');

                    // contract should be dployed here

                    this.setState({
                        currentAccount: accounts[0].toString(), currentAmount: balEther.toString(),
                        currentBlockchain: chainname,
                        connectStatus: 1, theweb3: web3, theaccounts: accounts, thecontract: instance
                    }, this.runInit);

                    console.log("contract found");
                }
            }
            else {
                this.setState({
                    currentAccount: accounts[0].toString(), currentAmount: balEther.toString(),
                    currentBlockchain: chainname,
                    connectStatus: 2, theweb3: web3, theaccounts: accounts, thecontract: null
                });
                console.log("contract not found");
            }


            window.ethereum.on('accountsChanged', (accounts) => {
                this.accountChanged(accounts);
            });

            window.ethereum.on('chainChanged', (chainId) => {
                // Handle the new chain.
                // Correctly handling chain changes can be complicated.
                // We recommend reloading the page unless you have good reason not to.

                this.reload();
            });


        }
        catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            // this.setState({
            //     currentAccount: null, currentAmount:"0",
            //     currentBlockchain: "",
            //     connectStatus: 2, theweb3: null, theaccounts: null, thecontract: null
            // });
            // invalid network status
            localStorage.setItem('connectstatus', "0");
            this.reload();

            //this.reload();
        }
    };



    async accountChanged(newaccounts) {
        console.log('accountsChanges', newaccounts);
        //this.setState({ accounts: newaccounts });
        await this.loadWeb3();
    }




    runInit = async () => {

        console.log("RUNNING INIT");
        const contract = this.state.thecontract;

        if (contract != null) {
            // récupérer la liste des comptes autorisés
            const whitelist = await contract.methods.getAdresses().call();

            // Mettre à jour le state 

            const status = await contract.methods.getStatus().call();




            // proposals
            const props = await contract.methods.getProposals().call();
            // Mettre à jour le state 
            var theWinningId = 0;
            var stepInt = parseInt(status, 10);
            if (stepInt === 5)
                theWinningId = await contract.methods.GetWinningProposalId().call();

            this.setState({ currentStep: stepInt, theproposals: props, winningId: theWinningId, thewhitelist: whitelist });



        }
    };

    //function registerProposal(string memory proposalDescription) public 


    registerProposalTransaction = async (proposalDescription) => {
        const contract = this.state.thecontract;
        const account = this.state.theaccounts[0];



        try {

            console.log(proposalDescription);

            console.log("startProposalsRegistration");
            await contract.methods.registerProposal(proposalDescription).send({ from: account });

            await this.runInit();

            this.setState({ currentpage: 1 });
            // setter
            localStorage.setItem('currentpage', 1);

        }
        catch (error) {
            console.log("ERROR IN REGISTERING A PROPOSAL");
            // rpc error for example
            // reload everything 
            // console.log('before reload');
            this.reload();
            // console.log('after reload');
            //await this.runInit();
            // this.handleConnect();
            // this.setState({currentpage: 0});
            // console.log('after calling methods');


        }

        // another syntax



        //         await this.runInit();

        //         this.setState({currentpage: 1});


        // contract.methods.registerProposal(proposalDescription).send({ from: account }).on("receipt", (receipt) => {

        //     // Transaction succeeded
        //     // this.runInit();
        //     // this.setState({currentpage: 1});
        // }).catch(function (e) {
        //     // Transaction rejected or failed
        //     console.log("ERROR IN REGISTERING A PROPOSAL");
        //     console.log(e);
        // });


    }



    nextStepTransaction = async () => {
        const contract = this.state.thecontract;
        const account = this.state.theaccounts[0];

        const isowner = await contract.methods.isOwner().call({ from: account });

        var nextStep = this.state.currentStep + 1;

        if (isowner) {
            try {
                console.log("ownership ok, try to change status");
                console.log(nextStep);
                if (nextStep === 1) {
                    console.log("startProposalsRegistration");
                    await contract.methods.startProposalsRegistration().send({ from: account });
                }
                else if (nextStep === 2) {
                    await contract.methods.endProposalsRegistration().send({ from: account });

                }
                else if (nextStep === 3) {
                    await contract.methods.startVotingSession().send({ from: account });

                }
                else if (nextStep === 4) {
                    await contract.methods.endVotingSession().send({ from: account });

                }
                else if (nextStep === 5) {
                    await contract.methods.CountVotes().send({ from: account });


                }
                await this.runInit();

            }
            catch (error) {

                // rpc error for example
                // reload everything 
                this.reload();
            }
        }
        else {

            console.log("not auhorized to this action");
        }

    }
    //function Vote(uint proposalId) public
    VoteTransaction = async (proposalId) => {
        const contract = this.state.thecontract;
        const account = this.state.theaccounts[0];



        try {


            await contract.methods.Vote(proposalId).send({ from: account });

            await this.runInit();

        }
        catch (error) {

            // rpc error for example
            // reload everything 
            this.reload();
        }


    }



    whitelist = async (addressFromForm) => {
        const contract = this.state.thecontract;
        const account = this.state.theaccounts[0];
        const address = addressFromForm.value;

        const isowner = await contract.methods.isOwner().call({ from: account });

        if (isowner) {
            try {
                // Interaction avec le smart contract pour ajouter un compte 
                await contract.methods.register(address).send({ from: account });
                // Récupérer la liste des comptes autorisés
                this.runInit();
            }
            catch (error) {
                // rpc error for example
                // reload everything 
                this.reload();
            }
        }
        else {
            console.log("not auhorized to this action")
        }
    }


    handleLinkClicked = (linkNumber, proposalNumber) => {
        this.setState({
            currentpage: linkNumber,
            currentProposal: proposalNumber
        });
        localStorage.setItem('currentpage', linkNumber);
        localStorage.setItem('currentproposal', proposalNumber);
    };


    handleConnect = async () => {

        await this.loadWeb3();

    };

    render() {



        return (
            <Router>
                <div className="App">
                    <div class="container-fluid">
                        <div class="row flex-nowrap">
                            <div class="col bg-color1"><NavbarSimple
                                connectStatus={this.state.connectStatus}
                                account={this.state.currentAccount}
                                blockchain={this.state.currentBlockchain}
                                amount={this.state.currentAmount}
                                onConnect={this.handleConnect}></NavbarSimple></div>
                        </div>

                        <div class="row flex-nowrap">
                            {/* <div class="col-sm-3 bg-color2">  */}
                            <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                                <Menu onLinkClicked={this.handleLinkClicked}></Menu>
                            </div>
                            <div class="col-sm-9 bg-color3">
                                <div class="container p-5 my-5">
                                    <MainpageSelector onRegisterProposal={this.registerProposalTransaction} currentStep={this.state.currentStep} onNextStep={this.nextStepTransaction} onWhitelist={this.whitelist}
                                        whitelist={this.state.thewhitelist} onPageChangedClicked={this.handleLinkClicked} proposals={this.state.theproposals}
                                        curPage={this.state.currentpage}
                                        curProposal={this.state.currentProposal}
                                        onVote={this.VoteTransaction}
                                        connectStatus={this.state.connectStatus}
                                        winningId={this.state.winningId}
                                    >
                                    </MainpageSelector>
                                </div>
                            </div>
                        </div>



                        {/* <NavbarSimple></NavbarSimple>
                    <Menu onLinkClicked={this.handleLinkClicked}></Menu>
                    <MainpageSelector onPageChangedClicked={this.handleLinkClicked} curPage = {this.state.currentpage}></MainpageSelector> */}
                    </div>
                </div>
            </Router >
        );
    }
}

export default Main;
