import '../assets/bootstrap/css/bootstrap.min.css'
import '../assets/css/Hero-Clean-images.css'
import '../assets/css/animate.min.css'
import '../assets/css/Forum---Thread-listing-forum.css'
import 'bootstrap/dist/css/bootstrap.min.css'
//import $ from "jquery";
import '../assets/summernote/summernote-lite.min.css'
//import '../assets/summernote/lang/summernote-ko-KR.js'

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { HiLockClosed } from 'react-icons/hi'
import { ErrorMessage } from '@hookform/error-message';

//import { loginUser } from '../api/Users';
//import { setRefreshToken } from '../storage/Cookie';
import { SET_TOKEN } from '../store/Auth';
import { SET_USER_INFO } from '../store/UserInfo';
import { insertNotice, selectNoticeDetail, selectNoticeDetailUpdate, updateNotice } from '../api/NoticeWrite';
import { useCookies } from 'react-cookie'

function Update(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // eslint는 문법검사
    // eslint-disable-next-line
    const [ cookies, setCookie ] = useCookies(['Authorization']);
    const [notice, setNotice] = useState({}); // notice를 객체로 변경
    const { id } = useParams();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 데이터를 가져오려면 이곳에서 호출합니다.
        async function fetchData() {
            try {
                // 공지사항 세부 정보를 가져오는 API 호출
                const data = await selectNoticeDetail(id);
                setNotice(data); // 데이터를 notice 상태 변수에 설정
            } catch (error) {
                console.error('Error fetching notice data:', error);
            }
        }
        fetchData();
      }, [id]);

    // useForm 사용을 위한 선언
    const { register, formState: { errors }, handleSubmit } = useForm();

    // submit 이후 동작할 코드
    // 백으로 유저 정보 전달
    const onValid = async ({subject,content}) =>{
      await updateNotice(id,{subject,content})
      .then((res) => {
          if (res.status === 200) {
              alert('업데이트 성공')
              return navigate('/list')
          }
      })
      .catch((err)=>{
          alert("권한이 없습니다.",err);
          console.error(err);
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
                  <input type="text" className="form-control" placeholder="제목을 입력하세요" name="subject" defaultValue={notice.subject} id="subject" {...register('subject')} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-2 control-label">Content</label>
                <div className="form-group-in">
                  <textarea name="content" id="summernote" defaultValue={notice.content} {...register('content')}/>
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

export default Update