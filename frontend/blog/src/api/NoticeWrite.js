import axios from 'axios'

export const insertNotice = async (params) => {
    return new Promise((resolve, reject)=>{
        axios.post('/api/notice/management', params)
        .then((res)=>{
            return resolve(res);
        })
        .catch((err)=>{
            return reject(err);
        })
    });
}

export const selectNotice = async (params) => {
    try {
      const response = await axios.get('/api/notice', {
        params: params 
      });
      return response.data; 
    } catch (error) {
      throw error; 
    }
  };

  export const selectNoticeDetail = async (id) => { 
    try {
      const response = await axios.get(`/api/notice/${id}`); 
      return response.data; 
    } catch (error) {
      throw error; 
    }
  };


  export const updateNotice = async (id,updateData) => {
    return new Promise((resolve,reject)=>{
      axios.put(`/api/notice/management/${id}`,updateData)
      .then((res)=>{
        return resolve(res);
      })
      .catch((err)=>{
        return reject(err);
      })
    });
  }

  export const deleteNotice = async (id) => {
      return new Promise((resolve,reject)=>{
          axios.delete(`/api/notice/management/${id}`)
          .then((res)=>{
            return resolve(res);
          })
          .catch((err)=>{
            return reject(err);
          })
      });
  }
  
