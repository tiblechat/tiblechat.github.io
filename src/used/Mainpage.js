
import React, { Component } from "react";

// display current status
// if (props.votestallied)
//  display winning proposal and nb votes
// else

class Mainpage extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount = async () => {

    };


    render() {
        var proposalTxt = '';
        var proposalVoteCount = 0;
        var IsCounted = false;

        var statusTxt = "";// = "Current status: ";

        if (this.props.connectStatus != 1)
        {
            statusTxt += "Not connected";
        }
        else
        {
        if (this.props.currentStep === 0)
        {
            statusTxt += "whitelisting";
        }
        else if (this.props.currentStep === 1)
        {
            statusTxt += 'Start proposal registration';
        }
        else if (this.props.currentStep === 2)
        {
            statusTxt += 'End proposal registration';
        }
        else if (this.props.currentStep === 3)
        {
            statusTxt += 'Start voting';
        }
        else if (this.props.currentStep === 4)
        {
            statusTxt += 'End voting';
        }
        // else if (this.props.currentStep === 5)
        // {
        //     statusTxt = 'Count votes';
           
        // }
        else if (this.props.currentStep === 5)
        {
            statusTxt += 'Votes counted';
            // console.log(this.props.proposals);
            // console.log(this.props.winningId);
            // proposalTxt = this.props.proposals[this.props.winningId].description;
            // proposalVoteCount = this.props.proposals[this.props.winningId].voteCount;
            // DBG
            proposalTxt = this.props.proposals[0].description;
            proposalVoteCount = this.props.proposals[0].voteCount;
            IsCounted = true;
        }
    }

        if (IsCounted) return (
            <div class="card text-white bg-success text-center">
                <div class="card-body">
                <div class="card-header">
   Winning proposal
  </div>
                    <p class="card-text">{proposalTxt}</p>
                    {/* <p class="card-text">{proposalVoteCount}</p> */}
                </div>
            </div>
        );
        else
        return (
            <div class="card text-white bg-primary text-center">
                <div class="card-body">
                <div class="card-header">
   Status
  </div>
                    <p class="card-text">{statusTxt}</p>
                </div>
            </div>
        );;
    }
}

export default Mainpage;
