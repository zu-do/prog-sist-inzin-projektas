import React from 'react';
import { Outlet } from 'react-router-dom';
import "../ExitPage.css";

export default function ExitPage(){

    return (

        <div className='ExitPage'>
            <div className='ExitMain'>
                <section className='Message'>
                    YOU HAVE BEEN SUCCESFULLY LOGGED OUT
                    <br></br>
                    <br></br>
                    WE HOPE TO SEE YOU SOON
                </section>
            </div>
        </div>
    )
}