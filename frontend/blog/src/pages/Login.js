import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { SET_TOKEN } from '../store/Auth';
import { SET_USER_INFO } from '../store/UserInfo';
import { loginApi, checkApi } from '../api/Login';
import { useCookies } from 'react-cookie'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // eslint는 문법검사
    // eslint-disable-next-line
    const [ cookies, setCookie ] = useCookies(['Authorization']);

    // useForm 사용을 위한 선언
    const { register, formState: { errors }, handleSubmit } = useForm();

    // submit 이후 동작할 코드
    // 백으로 유저 정보 전달
    const onValid = async ({ email, password }) => {
        await loginApi({ email, password })
        .then((res) => {
            if (res.status === 200) {
                setCookie('Authorization', 'Bearer ' + res.data.token)
                dispatch(SET_TOKEN(res.data.token))
                console.log(res.data.token)
                // const userInfo = {
                //     email: res.data.email,
                //     id: res.data.id,
                //     name: res.data.name,
                //     roles: res.data.roles
                // }
                const data = res.data
                delete data.token;
                const userInfo = { ...data }
                dispatch(SET_USER_INFO(userInfo))
                return navigate('/welcome')
            }
            console.log(res);
        })
        .catch((err)=>{
            console.log("로그인 실패입니다: ", err);
        })
    };

    return (
        <>
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
                    <div className="mb-3"><label className="form-label" htmlFor="password" style={{color: 'white'}}>Password</label><input className="form-control" type="password" id="password" name="password" {...register('password')} rows={6} style={{paddingBottom: '0px', paddingTop: '0px', height: '38px'}} /></div>
                    <div className="mb-3"><button className="btn btn-primary" type="submit" style={{background: 'black', borderStyle: 'none'}}>Login</button></div>
                    
                </form>
                </div>
            </div>
            </div>
        </div>
        </section>
    </div>
</div>

        </>
    );
}

export default Login;