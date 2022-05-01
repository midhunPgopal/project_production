import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ErrorNotice from '../../error/ErrorNotice'
import { loginStart, loginSuccess, loginFailure } from '../../redux/userRedux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import VisibilityIcon from '@mui/icons-material/Visibility'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), 
        url('https://wallpapercave.com/wp/wp2036914.jpg') center;
    background-size: cover;
`
const Wrapper = styled.div`
    width: 50vw;
    padding: 1.2vw;
    background-color: white;
`
const Title = styled.h1`
    font-size: 2.5vw;
    font-weight: 300;
    text-align: center;
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`
const Input = styled.input`
    padding: 1vw;
    font-size: 1.4vw;
    width: 100%;
`
const InputGroup = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`
const PasswordInput = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const Bottom = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`
const Button = styled.button`
    width: 20vw;
    border: none;
    padding: 1vw 0.5vw;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 1vw;
    font-size: 1.4vw;
    margin-top: 3vw;

    &:hover {
        color: teal;
        background-color: white;
        border: 0.1px solid teal;
    }
`
const Links = styled.span`
    margin: 0.5vw 0;
    font-size: 1.2vw;
    text-decoration: underline;
    cursor: pointer;
`
const Error = styled.span`
    font-size: 1.1vw;
    padding: 5px;
    color: #f16969;
`
const Extra = styled.div`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    font-size: 1.5vw;
`
const Label = styled.label`
    font-weight: bolder;
    color: #1517165b;
    font-size: 1.2vw;
    display: flex;
    flex-direction: column;
    margin: 0 2vw 0 2vw;
`
toast.configure()
const Login = () => {
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [errUser, setErrUser] = useState()
    const [errPassword, setErrPassword] = useState()
    const [passShow, setPassShow] = useState(false)

    const notify = () => toast.success('Now you can order', {
        position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    })

    const onSubmit = (data) => {
        setErrUser()
        setErrPassword()
        const login = async (dispatch) => {
            dispatch(loginStart())
            try {
                const res = await axios.post('/api/auth/login', data)
                notify()
                dispatch(loginSuccess(res.data))
            } catch (error) {
                error.response.data.user && setErrUser(error.response.data.user)
                error.response.data.password && setErrPassword(error.response.data.password)
                dispatch(loginFailure())
            }
        }
        login(dispatch, { data })
    }

    return (
        <Container>
            <Wrapper>
                <Extra>
                    <Link to='/otplogin' style={{ textDecoration: 'none' }}>
                        OTP Login
                    </Link>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        Home
                    </Link>
                </Extra>
                <Title>Login to your Account</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup>
                        <Label>Username
                            <Input id="username" placeholder='Username' {...register('username', { required: true })} />
                            <Error>
                                {errors.username && errors.username.type === "required" && <span>This is required</span>}
                                {errUser && <ErrorNotice message={errUser} />}
                            </Error>
                        </Label>
                        <Label>Password
                            <PasswordInput>
                                <Input id="password" type={passShow ? 'text' : 'password'} placeholder='Password' {...register('password', { required: true, maxLength: 10, minLength: 4 })} />
                                <VisibilityIcon
                                    style={{ fontSize: '2vw', margin: '1vw', cursor: 'pointer' }}
                                    onClick={() => setPassShow(!passShow)}
                                />
                            </PasswordInput>
                            <Error>
                                {errors.password && errors.password.type === "required" && <span>This is required</span>}
                                {errors.password && errors.password.type === "maxLength" && <span>Max length exceeded</span>}
                                {errors.password && errors.password.type === "minLength" && <span>Min length of 4 required</span>}
                                {errPassword && <ErrorNotice message={errPassword} />}
                            </Error>
                        </Label>
                    </InputGroup>
                    <Bottom>
                        <Button type='submit' >LOGIN</Button>
                        <Link to='/register'>
                            <Links>Create new Account</Links>
                        </Link>
                    </Bottom>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login