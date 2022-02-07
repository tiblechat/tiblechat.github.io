
import React, { Component } from "react";
import Mainpage from "./Mainpage";
import Proposals from "./Proposals";
import Admin from "./Admin";
import NewProposal from "./NewProposal";
import DisplayProposal from "./DisplayProposal";

class MainpageSelector extends Component {




    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(linkNumber,propNumber) {
        //e.preventDefault();
       // console.log(linkNumber);
        this.props.onPageChangedClicked(linkNumber,propNumber);
    }
   

    componentDidMount = async () => {

    };


    render() {


        if (this.props.curPage === 0) {
           
            return (
                <Mainpage proposals = {this.props.proposals} connectStatus = {this.props.connectStatus} winningId = {this.props.winningId} currentStep  ={this.props.currentStep} />
            );

        }
        else if (this.props.curPage === 1) {
            return (
                <Proposals proposals = {this.props.proposals} onPageChangedClicked={this.handleClick} />
            );

        }
        else if (this.props.curPage === 2) {
            return (
                //<Admin whitelist={["0x97e7f9f6987D3b06E702642459F7C4097914Ea87", "0x1279a8132C775edE3e738cc2A753fFe47d009353"]} />
                <Admin  currentStep  ={this.props.currentStep} onNextStepButton = {this.props.onNextStep} onWhitelistButton = {this.props.onWhitelist} whitelist={this.props.whitelist} />
            );

        }
        else if (this.props.curPage === 3) {
            return (
                <NewProposal onRegisterProposal = {this.props.onRegisterProposal}/>
            );

        }
        else if (this.props.curPage === 4) {
            return (
                <DisplayProposal onVote = {this.props.onVote} proposals = {this.props.proposals} proposalId = {this.props.curProposal} />
            );

        }





    }
}

export default MainpageSelector;
