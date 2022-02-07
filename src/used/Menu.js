import React from "react";
import { Link } from "react-router-dom";

//import "./styles.css";
class Menu extends React.Component {
    //state = { active: !this.props.open || true };


    constructor(props) {
        super(props);
        // When defining custom methods on our React component classes, we must perform the
        // binding pattern inside constructor() so that this references our component.
        // this is defined in react functions like render, componentDidMount, etc... but if we want to access it from a custom method, this is needed
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(linkNumber) {
        //e.preventDefault();
        console.log(linkNumber);
        this.props.onLinkClicked(linkNumber,-1);
    }





    render = () => {
        // const { open } = this.props;
        // const active = !open;

        return (
            // <div id="wrapper" className="toggled">
            // <div>
            //     {/* <div id="sidebar-wrapper"> */}
            //     <div>
            //         {/* <ul className="sidebar-nav"> */}
            //         <ul>
            //             {/* <li className="sidebar-brand"> */}
            //             <li>
            //                 {" "}
            //                 <a href="#" onClick={() => this.handleClick(0)}> Home </a>{" "}
            //             </li>
            //             <li>
            //                 {" "}
            //                 <a href="#" onClick={() => this.handleClick(1)}>Proposals</a>{" "}
            //             </li>
            //             <li>
            //                 {" "}
            //                 <a href="#" onClick={() => this.handleClick(2)}>Admin</a>{" "}
            //             </li>

            //         </ul>
            //     </div>
            // </div>
           
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Menu</span>
                </a>
                <ul class="nav nav-pills nav-fill flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                   
     
                <li class="nav-item">
                        <a href="#"  onClick={() => this.handleClick(0)} class="nav-link px-0 align-middle text-white">
                            <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Home</span></a>
                    </li>
                    <li class="nav-item">
                        <a href="#" onClick={() => this.handleClick(1)} class="nav-link px-0 align-middle text-white">
                            <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Proposals</span></a>
                    </li>
                    <li class="nav-item">
                        <a href="#" onClick={() => this.handleClick(2)} class="nav-link px-0 align-middle text-white">
                            <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Admin</span></a>
                    </li>

                </ul>
               
               
            </div>
        
        );
    };
}

export default Menu;
