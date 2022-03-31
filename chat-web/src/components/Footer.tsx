const Footer = () =>{
    return (
        <div className="footerWrapper">
        <div className="footer">
            <div className="footerContentContainer">
                <h3 className="footerContentTitle">Team</h3>
                <div>
                    <p> Scrum master : Domantė Žukauskaitė</p>
                    <p> Product owner : Rokas Mankevičius</p>
                    <p>  Developer : Paulius Skliaudys</p>
                    <p> Developer : Greta Gabrėnaitė</p>
                    <p> Developer : Pauline Požėraitė</p>

                </div>
            </div>

            <div className="footerContentContainer">
            <h3 className="footerContentTitle">About</h3>
            <p className="footerAbout">
            Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.
            </p>
            <p className="footerAbout">
                Young team willing to make best chat platform that has ever been. Innovation and you !
            </p>
            </div>
            <div className="footerContentContainer">
            <h3 className="footerContentTitle">Useful links</h3>
            <div>
                <div>
                     <a className="footerLink" href="https://github.com/zu-do/prog-sist-inzin-projektas" target="_blank">
                    Github
                </a>
                </div>
               <div> <a className="footerLink" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank">
                    Google search algorithm
                </a></div>
               
            </div>
            </div>
           
        </div>
        <div>© MankeHoldings</div>
        </div>
    )
}

export default Footer;