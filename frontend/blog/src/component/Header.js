import '../assets/bootstrap/css/bootstrap.min.css'
import '../assets/css/Hero-Clean-images.css'
import '../assets/css/animate.min.css'
import '../assets/css/Forum---Thread-listing-forum.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


//import { loginUser } from '../api/Users';
//import { setRefreshToken } from '../storage/Cookie';
import { useCookies } from 'react-cookie'

function Header() {

    const navigate = useNavigate();
    const navigateToSign = () => {
        navigate("/sign");
      };
    const navigateToWelcome = () => {
    navigate("/welcome");
    };
    const navigateToLogin = () => {
        navigate("/login");
        };
    const navigateToLogout = () => {
        navigate("/logout");
        };
    const navigateToWrite = () => {
        navigate("/write");
        };
    const navigateToList = () => {
        navigate("/list");
        };
    const dispatch = useDispatch();
    // eslint는 문법검사
    // eslint-disable-next-line
    const [ cookies, setCookie ] = useCookies(['Authorization']);

    const [isMobile, setIsMobile] = useState(false);
    const [hoverAnimationList, setHoverAnimationList] = useState([]);

    useEffect(() => {
        const getWidth = () => {
            return window.innerWidth;
        };
    
        setIsMobile(getWidth() < 768);
    
        const elements = document.querySelectorAll('[data-bss-hover-animate]');
        setHoverAnimationList(elements);
    
        elements.forEach((element) => {
            element.addEventListener('mouseenter', () => {
            element.classList.add('animated', element.dataset.bssHoverAnimate);
            });
            element.addEventListener('mouseleave', () => {
            element.classList.remove('animated', element.dataset.bssHoverAnimate);
            });
        });
    }, []);

    return (
        <header>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
            <title>Artism, astism</title>

            <div className="d-xl-flex justify-content-xl-center" style={{height: '200px', paddingBottom: '0px', display: 'flex'}}>
            <div className="row" style={{width: '300px', height: '150px'}}>
                <div className="col-xl-12 offset-xl-0" style={{marginRight: '-1px'}}>
                <div className="row" style={{width: '300px', height: '150px'}}>
                    <div className="col" style={{margin: 'auto'}}><button className="btn btn-primary" data-bss-hover-animate="pulse" onClick={ navigateToWelcome } type="button" style={{width: '300px', height: '80px', margin: '-27px', background: 'white', color: 'black', fontSize: '46px', borderColor: 'var(--bs-btn-disabled-color)'}}>Artism</button></div>
                </div>
                </div>
            </div>
            <div className="row" style={{width: '500px', height: '150px', paddingRight: '0px'}}>
                <div className="col-xl-12" style={{margin: 'auto'}}>
                <div className="btn-toolbar d-xl-flex justify-content-xl-center">
                    <div className="btn-group" role="group"><button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" onClick={ navigateToWrite } style={{color: 'black', background: 'var(--bs-btn-disabled-color)', borderStyle: 'none'}}>WRITE</button><button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{color: 'black', background: 'var(--bs-btn-disabled-color)', borderStyle: 'none'}}>WIKI</button></div>
                    <div className="btn-group" role="group"><button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{color: 'black', background: 'var(--bs-btn-disabled-color)', borderStyle: 'none'}}>SHOW</button><button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" onClick={ navigateToList } style={{color: 'black', background: 'var(--bs-btn-disabled-color)', borderStyle: 'none'}}>OPINION</button></div>
                </div>
                </div>
                
            </div>
            <div className="row d-flex d-xl-flex justify-content-xl-end" style={{width: '300px', height: '150px'}}>
                <div className="col" style={{margin: 'auto', paddingBottom: '76px', marginTop: '36px', marginBottom: '-64px'}}>
                <div className="btn-toolbar d-xl-flex justify-content-xl-center">
                    <div className="btn-group" role="group" />
                </div>
                <div className="row" style={{paddingTop: '0px', marginBottom: '7px', marginTop: '56px', paddingRight: '202px', marginRight: '-13px'}}>
                    <div className="col" style={{position: 'sticky', display: 'block', marginLeft: '78px', paddingBottom: '0px', marginTop: '-38px', paddingLeft: '0px', paddingTop: '2px'}}><button className="btn btn-primary d-xxl-flex justify-content-xxl-end btn-Oscuro" type="button" onClick={ navigateToLogin } data-bs-toggle="modal" data-bs-target="#modal" style={{background: 'var(--bs-btn-disabled-color)', color: 'black', borderStyle: 'none', paddingRight: '15px', paddingTop: '3px', marginRight: '-1px', marginLeft: '1px'}}>Login</button></div>
                    <div className="col" style={{position: 'sticky', display: 'block', marginLeft: '78px', paddingBottom: '0px', marginTop: '-38px', paddingLeft: '0px', paddingTop: '2px'}}><button className="btn btn-primary d-xxl-flex justify-content-xxl-end btn-Oscuro" type="button" onClick={ navigateToLogout } data-bs-toggle="modal" data-bs-target="#modal" style={{background: 'var(--bs-btn-disabled-color)', color: 'black', borderStyle: 'none', paddingRight: '15px', paddingTop: '3px', marginRight: '-1px', marginLeft: '1px'}}>Logout</button></div>
                </div><button className="btn btn-primary" type="button" onClick={ navigateToSign } style={{color: 'black', background: 'var(--bs-btn-disabled-color)', borderStyle: 'none', marginBottom: '27px', paddingTop: '0px', marginTop: '-47px', marginRight: '10px', marginLeft: '18px'}}>Sign</button>
                </div>
            </div>
            </div>
        </header>
        ); 
}

export default Header;