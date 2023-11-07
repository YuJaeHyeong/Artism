import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteNotice, selectNoticeDetail } from '../api/NoticeWrite';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function View() {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const navigateToUpdate = (id) => {
        navigate(`/update/${id}`);
    };
    const [notice, setNotice] = useState({}); // notice를 객체로 변경

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

    const onValid = async () =>{
        await deleteNotice(id)
        .then((res) => {
            if (res.status === 200) {
                alert('삭제 성공')
                return navigate('/list')
            }
        })
        .catch((err)=>{
            alert("권한이 없습니다.");
        })
    };

    return (
        <div className="d-xxl-flex justify-content-xxl-center" style={{ height: '643px', filter: 'brightness(111%) grayscale(1%)', background: '#ffffff', display: 'block' }}>
            <div style={{ height: '643px', maxWidth: 'none', background: '#46a3e600', width: '1100px' }}>
                <section className="py-4 py-xl-5">
                    <div className="container">
                        <div className="row d-flex justify-content-center" style={{ height: '500px' }}>
                            <div className="col-md-6 col-lg-5 col-xl-4" style={{ width: 'auto', maxWidth: 'none' }}>
                                <div>
                                    <form className="p-3 p-xl-4" style={{ width: '800px', height: '500px' }}>
                                        <div className="mb-3">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="writerName"
                                                value={notice.writerName}
                                                readOnly 
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="subject"
                                                value={notice.subject}
                                                readOnly
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="createTime"
                                                value={notice.createdDate}
                                                readOnly
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <textarea
                                                className="form-control"
                                                type="text"
                                                name="content"
                                                rows={6}
                                                style={{ minHeight: '399px', maxHeight: '399px' }}
                                                value={notice.content}
                                                readOnly
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div style={{height: '100px'}}></div>
                                <div style={{ height: '40px', textAlign: 'right' }}>
                                    <button className="btn btn-primary" type="button" onClick={ () => navigateToUpdate(notice.id) } style={{ background: 'rgba(0,0,0,0)', borderStyle: 'none', color: 'black' }}>수정</button>
                                    <button className="btn btn-primary" type="button" onClick={ onValid } style={{ background: 'rgba(0,0,0,0)', borderStyle: 'none', color: 'black' }}>삭제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default View;
