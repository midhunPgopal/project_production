import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginStart, loginSuccess, loginFailure } from '../../redux/userRedux'
import { useForm } from 'react-hook-form'
import ErrorNotice from '../../error/ErrorNotice'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

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
    flex: 1;
    margin: 1vw 0;
    padding: 1vw;
    font-size: 1.4vw;
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

    &:hover {
        color: teal;
        background-color: white;
        border: 0.1px solid teal;
    }
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
    font-size: 1.2vw;
`
const Label = styled.label`
    font-weight: bolder;
    color: #1517165b;
    font-size: 1.2vw;
`
const Timer = styled.h1`
    color: green;
    font-size: 1.4vw;
    font-weight: 300;
    align-iems: center;
`
toast.configure()
const OtpLogin = () => {
    
    const dispatch = useDispatch()
    
    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const [number, setNumber] = useState()
    const [err, setErr] = useState()
    const [errOtp, setErrOtp] = useState()
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(60)

    const notify = () => toast.success('Now you can order', {
        position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    })

    const onSubmit = async (data) => {
        try {
            setErr()
            const response = await axios.post('/api/auth/otplogin', data)
            setNumber(response.data.mobile)
        } catch (error) {
            error.response.data.msg && setErr(error.response.data.msg)
        }
    }
    const onSubmitOtp = async (data) => {
        const loginOtp = async (dispatch, data) => {
            dispatch(loginStart())
            try {
                const res = await axios.post('/api/auth/otpverify', data)
                notify()
                dispatch(loginSuccess(res.data))
            } catch (error) {
                dispatch(loginFailure())
                error.response.data.msg && setErrOtp(error.response.data.msg)
            }
        }
        loginOtp(dispatch, data)
    }
    const resendOTP = async () => {
        try {
            setErr()
            const response = await axios.post('/api/auth/otplogin', { mobile: number })
            setNumber(response.data.mobile)
            setSeconds(60)
        } catch (error) {
            error.response.data.msg && setErr(error.response.data.msg)
        }
    }

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1)
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59)
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        }
    })

    return (
        <Container>
            <Wrapper>
                <Extra>
                    <Link to='/login' style={{ textDecoration: 'none' }}>
                        Password Login
                    </Link>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        Home
                    </Link>
                </Extra>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Title>Registered mobile number</Title>
                    <Label>mobile number</Label>
                    <Input id="mobile" type='number' placeholder='Registered mobile number' {...register('mobile', { required: true, maxLength: 10, minLength: 10 })} />
                    <Error>
                        {errors.mobile && errors.mobile.type === "required" && <span>This is required</span>}
                        {errors.mobile && errors.mobile.type === "maxLength" && <span>Mobile number shoould be 10 digits</span>}
                        {errors.mobile && errors.mobile.type === "minLength" && <span>Mobile number shoould be 10 digits</span>}
                        {err && <ErrorNotice message={err} />}
                    </Error>
                    {!number &&
                        <Bottom>
                            <Button type='submit'>ENTER</Button>
                        </Bottom>
                    }
                    </Form>
                    {number &&
                        <>
                            <Form onSubmit={handleSubmit(onSubmitOtp)}>
                                <Title>Enter OTP</Title>
                                <Label>OTP</Label>
                                <Input id="otp" type='number' placeholder='OTP' {...register('otp', { required: true, maxLength: 4, minLength: 4 })} />
                                <Error>
                                    {errors.otp && errors.otp.type === "required" && <span>This is required</span>}
                                    {errors.otp && errors.otp.type === "maxLength" && <span>Max length exceeded</span>}
                                    {errors.otp && errors.otp.type === "minLength" && <span>Min length of 3 required</span>}
                                    {errOtp && <ErrorNotice message={errOtp} />}
                                </Error>
                                <Bottom>
                                    <Button type='submit'>SUBMIT</Button>
                                </Bottom>
                            </Form>
                            <Bottom>
                            <Timer>
                                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                            </Timer>
                            {seconds > 0 ?
                                <Button onClick={resendOTP} disabled>Resend OTP</Button> :
                                <Button onClick={resendOTP} >Resend OTP</Button>
                            }
                            </Bottom>
                        </>
                    }
            </Wrapper>
        </Container>
    )
}

export default OtpLogin