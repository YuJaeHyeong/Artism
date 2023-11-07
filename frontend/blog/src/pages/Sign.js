import '../assets/bootstrap/css/bootstrap.min.css'
import '../assets/css/Hero-Clean-images.css'
import '../assets/css/animate.min.css'
import '../assets/css/Forum---Thread-listing-forum.css'
import 'bootstrap/dist/css/bootstrap.min.css'

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
import { loginApi, checkApi, signApi } from '../api/Login';
import { useCookies } from 'react-cookie'
import { Input } from 'postcss'

function Sign(){

    const navigate = useNavigate();
    const navigateToWelcome = () => {
        navigate("/welcome");
    }
    const dispatch = useDispatch();
    // eslint는 문법검사
    // eslint-disable-next-line
    const [ cookies, setCookie ] = useCookies(['Authorization']);

    // useForm 사용을 위한 선언
    const { register, formState: { errors }, handleSubmit } = useForm();

    // submit 이후 동작할 코드
    // 백으로 유저 정보 전달
    const onValid = async ({ email, name, password }) => {
        await signApi({ email, name, password })
        .then((res) => {
            if (res.status === 200) {
                //setCookie('Authorization', 'Bearer ' + res.data.token)
                //dispatch(SET_TOKEN(res.data.token))
                //console.log(res.data.token)
                // const userInfo = {
                //     email: res.data.email,
                //     id: res.data.id,
                //     name: res.data.name,
                //     roles: res.data.roles
                // }
                alert('회원가입성공');
                const data = res.data
                const userInfo = { ...data }
                dispatch(SET_USER_INFO(userInfo))
                return navigate('/welcome')
            }
            console.log(res);
        })
        .catch((err)=>{
            console.log("회원가입 실패입니다: ", err);
        })
    };
    const check = async () => {
        await checkApi()
        .then((res) => {
            if (res.status === 200) {
                console.log("체크 성공")
            }
            console.log(res);
        })
        .catch((err) => {
            console.log("회원가입 실패입니다: ", err.response.message);
        })
    }
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


    return(
        <div>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
  <div style={{height: '643px', filter: 'brightness(111%) grayscale(1%)', background: 'url("img/pxfuel.jpg") center / contain no-repeat, #ffffff', display: 'block'}}>
    <section className="py-4 py-xl-5">
      <div className="container">
        <div className="row" style={{paddingLeft: '250px'}}>
          <div className="col-md-6 col-xl-4">
            <div>
              <form className="p-3 p-xl-4" onSubmit={ handleSubmit(onValid) } style={{background: 'rgba(0,0,0,0.73)'}}>
                <h4 style={{color: 'white', fontSize: '35px'}}>Artism, artism</h4>
                <p className="text-muted" style={{color: 'white', fontSize: '20px', fontStyle: 'italic'}}>Dilige et fac quod vis</p>
                <div className="mb-3"><label className="form-label" htmlFor="email" style={{color: 'white'}}>Email</label><input className="form-control" type="email" id="email" name="email" {...register('email')} /></div>
                <div className="mb-3"><label className="form-label" htmlFor="name" style={{color: 'white'}}>Name</label><input className="form-control" type="text" id="name" name="name" {...register('name')} /></div>
                <div className="mb-3"><label className="form-label" htmlFor="password" style={{color: 'white'}}>Password</label><input className="form-control" type="password" id="password" name="password" autoComplete="off" {...register('password')} rows={6} style={{paddingBottom: '0px', paddingTop: '0px', height: '38px'}} /></div>
                <div className="mb-3"><button className="btn btn-primary" type="submit" style={{background: 'black', borderStyle: 'none'}}>Sign</button></div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

    );
}

export default Sign