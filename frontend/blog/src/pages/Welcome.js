import '../assets/bootstrap/css/bootstrap.min.css'
import '../assets/css/Hero-Clean-images.css'
import '../assets/css/animate.min.css'
import '../assets/css/Forum---Thread-listing-forum.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery';
import Modal from '../component/Modal';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { HiLockClosed } from 'react-icons/hi'
import { ErrorMessage } from '@hookform/error-message';

//import { loginUser } from '../api/Users';
//import { setRefreshToken } from '../storage/Cookie';
import { SET_TOKEN } from '../store/Auth';
import { SET_USER_INFO } from '../store/UserInfo';
import { loginApi, checkApi } from '../api/Login';
import { useCookies } from 'react-cookie'


function Welcome() {
    

    const navigate = useNavigate();

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    
    
    return (
        <div>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
            <title>Artism, astism</title>
            <div style={{height: '643px', filter: 'brightness(111%) grayscale(1%)', background: 'url("img/pxfuel.jpg") center / contain no-repeat, #ffffff', display: 'block'}}><button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{position: 'fixed', display: 'flex', color: 'black', width: '450px', height: '300px', background: 'url("img/Basquiat.jpg") center no-repeat, var(--bs-btn-disabled-color)', textAlign: 'left', paddingLeft: '131px', borderStyle: 'none', borderRightStyle: 'none', marginRight: '546px', marginLeft: '313px', paddingBottom: '0px', marginBottom: '47px', paddingTop: '0px', marginTop: '-26px'}}><br /><strong><span style={{backgroundColor: 'rgb(221, 221, 221)'}}>Jean-Michel Basquiat</span></strong><br /><br /></button><button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{position: 'fixed', display: 'flex', color: 'black', width: '450px', height: '300px', background: 'url("img/Bastida.jpg") center / cover no-repeat, var(--bs-btn-disabled-color)', textAlign: 'left', borderStyle: 'none', borderRightStyle: 'none', paddingTop: '0px', paddingRight: '0px', marginTop: '313px', paddingLeft: '0px', marginRight: '2px', marginLeft: '1152px', marginBottom: '-11px', paddingBottom: '20px', filter: 'grayscale(48%)'}}><br /><span style={{color: 'rgb(55, 58, 60)'}}>Joaquín Sorolla y Bastida</span><br /><br /></button><button className="btn btn-primary" data-bss-hover-animate="pulse" type="button" style={{position: 'fixed', display: 'flex', color: 'var(--bs-btn-disabled-color)', width: '450px', height: '300px', background: 'url("img/Gogh.jpg"), var(--bs-btn-disabled-color)', textAlign: 'left', borderStyle: 'none', borderRightStyle: 'none', paddingBottom: '0px', paddingTop: '0px', paddingLeft: '0px', marginBottom: '29px', marginTop: '222px', filter: 'grayscale(71%)', fontSize: '65px', fontStyle: 'italic', paddingRight: '0px', marginRight: '10px', marginLeft: '599px'}}><br /><span style={{color: 'rgb(77, 81, 86)'}}>&nbsp;Vincent Willem van Gogh</span><br /><br /></button><button className="btn btn-primary" data-bss-hover-animate="bounce" type="button" style={{position: 'fixed', display: 'flex', color: 'var(--bs-btn-disabled-color)', width: '1300px', height: '140px', background: 'black', textAlign: 'left', paddingLeft: '2px', borderStyle: 'none', borderRightStyle: 'none', marginBottom: '47px', paddingTop: '0px', paddingBottom: '0px', marginTop: '24px', marginLeft: '573px', marginRight: '4px', filter: 'blur(2px)'}}><span style={{width: '1200px', height: '136px', textAlign: 'left', marginLeft: '85px', fontSize: '31px', marginBottom: '60px', fontStyle: 'italic', paddingTop: '0px', paddingBottom: '0px', marginRight: '0px', marginTop: '16px', filter: 'blur(0px)'}}>Great things are done by a series of small things brought together.<br />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Vincent Van Gogh.</span></button><button className="btn btn-primary" type="button" style={{position: 'fixed', display: 'flex', color: 'var(--bs-btn-disabled-color)', width: '1100px', height: '130px', background: 'black', textAlign: 'left', borderStyle: 'none', borderRightStyle: 'none', marginBottom: '47px', paddingTop: '0px', paddingBottom: '0px', filter: 'blur(1px)', marginRight: '2px', paddingRight: '0px', paddingLeft: '108px', marginTop: '140px', marginLeft: '547px'}}><span style={{width: '1200px', height: '136px', textAlign: 'left', fontSize: '31px', marginBottom: '60px', fontStyle: 'italic', paddingTop: '0px', paddingBottom: '0px', marginRight: '0px', marginTop: '16px', paddingRight: '0px', paddingLeft: '0px', marginLeft: '-5px'}}>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Everybody must have a fantasy.<br />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Andy Warhol.</span></button></div>
        </div>
        ); 
}

export default Welcome;