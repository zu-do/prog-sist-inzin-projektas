import React from 'react';
import { BrowserRouter, Link, Outlet } from "react-router-dom";
import "../ExitPage.css";

export default function ExitPage(){

    return (

        <div className='ExitPage'>
            <div className='ExitMain'>
                <section className='Message'>
                <div id="slide">
                YOU HAVE BEEN SUCCESFULLY LOGGED OUT
                    <br></br>
                    <br></br>
                    WE HOPE TO SEE YOU SOON
                    <div id="slide1">
                    <br></br>
                    <Link to="/"><button className="backtToMainButton">MAIN PAGE</button></Link>
                    </div>
                </div>
                    
                </section>
                
            </div>
        </div>
    )
}