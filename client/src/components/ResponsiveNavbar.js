import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SearchBar from "./SearchBar";
import FavoriteLink from "./FavoriteLink";
import SwitchApi from "./SwitchApi";
import Container from "react-bootstrap/Container";
import ReactTooltip from 'react-tooltip';
const routesWithSwitch = [
    "/Home",
    "/World",
    "/Politics",
    "/Business",
    "/Technology",
    "/Sports"
];

const activated = (tabName, pathname) => {
    if((('/'+tabName)===pathname) || ('/'===pathname && tabName==='Home')){
        return 'active';
    } else {
        return '';
    }
};

const diffRight = (props) => {
    if(routesWithSwitch.includes(props.pathname) || props.pathname==="/") {
        return(
            <>
                <Container className={'right-margin-more'} fluid={'false'}>
                    <FavoriteLink favorite={false}/>
                </Container>
                <Container className={'right-margin'} fluid={'false'} style={{color: 'whitesmoke'}}>
                    NYTimes
                </Container>
                <SwitchApi apiMode={props.apiMode} onSwitch={props.onSwitch}/>
                <Container fluid='false' style={{color: 'whitesmoke'}}>
                    Guardian
                </Container>
            </>
        );
    } else if(props.pathname==='/favorites'){
        return(
            <>
                <Container className={'right-margin-more'} fluid={'false'}>
                    <FavoriteLink favorite={true}/>
                </Container>
            </>
        );
    } else {
        return(
            <>
                <Container className={'right-margin-more'} fluid={'false'}>
                    <FavoriteLink favorite={false}/>
                </Container>
            </>
        );
    }
};


function ResponsiveNavbar(props) {
    console.log('navbar render');
    return (
        <Container fluid={'true'} className={'responsive-navbar-container'}>
            <Navbar expand={'sm'} variant={'dark'}>
                <Container fluid={'false'} key={'searchbar'}>
                    <SearchBar apiMode={props.apiMode} onSearch={props.onSearch} searchValue={props.searchValue} onInputSearchBar={props.onInputSearchBar}/>
                </Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav style={{marginRight: 'auto'}}>
                        <Nav.Link className={activated('Home', props.pathname)} onClick={() => { props.onTabClick('Home')}}>
                            Home
                        </Nav.Link>
                        <Nav.Link className={activated('World', props.pathname)} onClick={() => props.onTabClick('World')}>
                            World
                        </Nav.Link>
                        <Nav.Link className={activated('Politics', props.pathname)} onClick={() => props.onTabClick('Politics')}>
                            Politics
                        </Nav.Link>
                        <Nav.Link className={activated('Business', props.pathname)} onClick={() => props.onTabClick('Business')}>
                            Business
                        </Nav.Link>
                        <Nav.Link className={activated('Technology', props.pathname)} onClick={() => props.onTabClick('Technology')}>
                            Technology
                        </Nav.Link>
                        <Nav.Link className={activated('Sports', props.pathname)} onClick={() => props.onTabClick('Sports')}>
                            Sports
                        </Nav.Link>
                    </Nav>
                    {diffRight(props)}
                </Navbar.Collapse>
            </Navbar>
            <ReactTooltip/>
         </Container>
    );


    // if(routesWithSwitch.includes(props.pathname) || props.pathname==="/"){
    //     return(
    //         <Container fluid={'true'} className={'responsive-navbar-container'}>
    //             <Navbar expand={'sm'} variant={'dark'}>
    //                 <SearchBar apiMode={props.apiMode} onSearch={props.onSearch} />
    //                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //                 <Navbar.Collapse id="basic-navbar-nav">
    //                     <Nav style={{marginRight: 'auto'}}>
    //                         <Nav.Link className={activated('Home', props.pathname)} onClick={() => { props.onTabClick('Home')}}>
    //                             Home
    //                         </Nav.Link>
    //                         <Nav.Link className={activated('World', props.pathname)} onClick={() => props.onTabClick('World')}>
    //                             World
    //                         </Nav.Link>
    //                         <Nav.Link className={activated('Politics', props.pathname)} onClick={() => props.onTabClick('Politics')}>
    //                             Politics
    //                         </Nav.Link>
    //                         <Nav.Link className={activated('Business', props.pathname)} onClick={() => props.onTabClick('Business')}>
    //                             Business
    //                         </Nav.Link>
    //                         <Nav.Link className={activated('Technology', props.pathname)} onClick={() => props.onTabClick('Technology')}>
    //                             Technology
    //                         </Nav.Link>
    //                         <Nav.Link className={activated('Sports', props.pathname)} onClick={() => props.onTabClick('Sports')}>
    //                             Sports
    //                         </Nav.Link>
    //                     </Nav>
    //                     {diffRight(props.pathname)}
    //                 </Navbar.Collapse>
    //             </Navbar>
    //             <ReactTooltip/>
    //          </Container>
    //     );
    // } else if(props.pathname==='/favorites') {
    //     return(
    //         <Container fluid={'true'} className={'responsive-navbar-container'}>
    //             <Navbar expand={'sm'} variant={'dark'}>
    //                 <SearchBar apiMode={props.apiMode} onSearch={props.onSearch} />
    //                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //                 <Navbar.Collapse id="basic-navbar-nav">
    //                     <Nav style={{marginRight: 'auto'}}>
    //                         <Nav.Link onClick={() => props.onTabClick('Home')}>Home</Nav.Link>
    //                         <Nav.Link onClick={() => props.onTabClick('World')}>World</Nav.Link>
    //                         <Nav.Link onClick={() => props.onTabClick('Politics')}>Politics</Nav.Link>
    //                         <Nav.Link onClick={() => props.onTabClick('Business')}>Business</Nav.Link>
    //                         <Nav.Link onClick={() => props.onTabClick('Technology')}>Technology</Nav.Link>
    //                         <Nav.Link onClick={() => props.onTabClick('Sports')}>Sports</Nav.Link>
    //                     </Nav>
    //                     {diffRight(props.pathname)}
    //                 </Navbar.Collapse>
    //             </Navbar>
    //             <ReactTooltip/>
    //         </Container>
    //     );
    // } else {
    //     console.log(props.history);
    //     return(
    //         <Container fluid={'true'} className={'responsive-navbar-container'}>
    //             <Navbar expand={'sm'} variant={'dark'}>
    //                 <SearchBar apiMode={props.apiMode} onSearch={props.onSearch} />
    //                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //                 <Navbar.Collapse id="basic-navbar-nav">
    //                     <Nav style={{marginRight: 'auto'}}>
    //                         <Nav.Link onClick={() => props.onTabClick('Home')}>Home</Nav.Link>
    //                         <Nav.Link onClick={() => props.onTabClick('World')}>World</Nav.Link>
    //                         <Nav.Link onClick={() => props.onTabClick('Politics')}>Politics</Nav.Link>
    //                         <Nav.Link onClick={() => props.onTabClick('Business')}>Business</Nav.Link>
    //                         <Nav.Link onClick={() => props.onTabClick('Technology')}>Technology</Nav.Link>
    //                         <Nav.Link onClick={() => props.onTabClick('Sports')}>Sports</Nav.Link>
    //                     </Nav>
    //                     {diffRight(props.pathname)}
    //                 </Navbar.Collapse>
    //             </Navbar>
    //         </Container>
    //     );
    // }
}


export default ResponsiveNavbar;