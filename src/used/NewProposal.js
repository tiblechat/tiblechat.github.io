
import React, { Component } from "react";


class NewProposal extends Component {

    constructor(props) {
        super(props);

        this.state = { value: '', hasError: false };


        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = async () => {

    };

    // test error boundaries
    // https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
    componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }


    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleClick(event) {
        try {
            this.props.onRegisterProposal(this.state.value);
        }
        catch (error)
        {
            console.log("ERROR IN REGISTERING A PROPOSAL 2");
        }

    }



    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
        else {
            return (
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">New proposal</h4>
                        <div class="form-group">
                            {/* <label for="exampleFormControlTextarea1">Title</label> */}
                            {/* <textarea class="form-control" id="exampleFormControlTextarea1" rows="1"></textarea> */}

                            {/* <label for="exampleFormControlTextarea2">Proposal</label> */}
                            {/* <textarea  ref={(input) => { this.proposalContent = input }} class="form-control" id="exampleFormControlTextarea2" rows="10"></textarea> */}
                            <textarea value={this.state.value} onChange={this.handleChange} class="form-control" id="exampleFormControlTextarea2" rows="10"></textarea>
                        </div>
                        <button onClick={() => this.handleClick()} type="button" class="btn btn-primary">Save proposal</button>
                    </div>
                </div>
            );
        }
    }
}


export default NewProposal;


