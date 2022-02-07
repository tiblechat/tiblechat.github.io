
import React, { Component } from "react";


class DisplayProposal extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount = async () => {

    };

    handleClick() {
        if (this.props.proposalId >= 0)
        {
            //console.log(this.props);
            this.props.onVote(this.props.proposalId);
        }
       
        //event.preventDefault();
    }



    render() {
        var proposalTxt = '';
        var proposalVoteCount = 0;
        if ((this.props.proposalId >= 0) && (this.props.proposals[this.props.proposalId] != undefined))
        {
            proposalTxt = this.props.proposals[this.props.proposalId].description;
            proposalVoteCount = this.props.proposals[this.props.proposalId].voteCount;
        }
        return (
            <div>
            <div class="card">
                <div class="card-body">
                    {/* <h4 class="card-title">Proposal</h4> */}
                    <p class="card-text">{proposalTxt}</p>
                  
                  
                </div>
            </div>
             <div class="card">
             <div class="card-body">
                 <p class="card-text">{"Vote count: "+proposalVoteCount}</p>
                 {/* <a href="#" class="card-link">Go to proposal</a> */}
                 <button type="button" onClick={() => this.handleClick()} class="btn btn-primary">Vote</button>
             </div>
         </div>

</div>


        );
    }
}

export default DisplayProposal;
