import '../assets/bootstrap/css/bootstrap.min.css'
import '../assets/css/Hero-Clean-images.css'
import '../assets/css/animate.min.css'
import '../assets/css/Forum---Thread-listing-forum.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//import $ from "jquery";
import '../assets/summernote/summernote-lite.min.css'
//import '../assets/summernote/lang/summernote-ko-KR.js'

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
import { insertNotice } from '../api/NoticeWrite';
import { useCookies } from 'react-cookie'

function Write(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // eslint는 문법검사
    // eslint-disable-next-line
    const [ cookies, setCookie ] = useCookies(['Authorization']);

    // useForm 사용을 위한 선언
    const { register, formState: { errors }, handleSubmit } = useForm();

    // submit 이후 동작할 코드
    // 백으로 유저 정보 전달
    const onValid = async ({ subject, content }) => {
        await insertNotice({ subject, content })
        .then((res) => {
            if (res.status === 200) {
                const data = res.data

                alert('글쓰기 성공');
                return navigate('/')
            }
            console.log(res);
        })
        .catch((err)=>{
            alert('권한이 없습니다.')
        })
    };

    return(
        <div>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
  <title>미술</title>

  <div className="d-xl-flex justify-content-xl-center" style={{height: '643px', filter: 'brightness(111%) grayscale(1%)', background: '#ffffff', display: 'flex'}}>
    <form onSubmit={ handleSubmit(onValid) }>
      <main className="main">
        <div className="write">
          <div className="row">
            <div className="row-in">
              <div className="form-group">
                <label className="col-md-2 control-label">Title</label>
                <div className="form-group-half">
                  <input type="text" className="form-control" placeholder="제목을 입력하세요" name="subject" id="subject" {...register('subject')} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-2 control-label">Content</label>
                <div className="form-group-in">
                  <textarea name="content" id="summernote" {...register('content')}/>
                </div>
                <div id="summernote" />
              </div>
              <div className="form-group">
                <div className="form-group-submit">
                  <button type="submit" className="btn btn-primary1" id="submitButton">write</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </form>
    </div>
</div>

    );
}

export default Write