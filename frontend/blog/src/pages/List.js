import 'bootstrap/dist/css/bootstrap.min.css'
import { selectNotice } from '../api/NoticeWrite';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function List() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
      // 컴포넌트가 마운트될 때 데이터를 가져오려면 이곳에서 호출합니다.
      async function fetchData() {
        try {
          const data = await selectNotice();
          setNotices(data);
        } catch (error) {
          console.error('Error fetching notice data:', error);
        }
      }
  
      fetchData();
    }, []);
    
    const navigate = useNavigate();
    const navigateToView = (id) => {
      navigate(`/view/${id}`);
    };

    return (
        <div>
            <div className="d-xxl-flex justify-content-center justify-content-xxl-center align-items-xxl-center list-group" style={{marginLeft: '326px', marginRight: '350px', maxHeight: '1000px', display: 'flex'}}>
            <ul>
                {notices.map((notice) => (
                    <li key={notice.id}>
                        <div className="d-xxl-flex justify-content-center justify-content-xxl-center align-items-xxl-center list-group" onClick={() => navigateToView(notice.id)} style={{marginLeft: '326px', marginRight: '350px', maxHeight: '1000px'}}><div className="list-group-item list-group-item-action flex-column align-items-start" style={{height: '100px', marginBottom: '2px', width: '1230px'}}>
                            <div className="d-flex w-100 justify-content-between"  >
                            <h5 className="mb-1">{notice.subject}</h5>
                            </div>
                            <p className="mb-1">{notice.content}</p>
                        </div></div>
                    </li>
                ))}
            </ul>
            </div>
        </div>
        ); 
}

export default List;

