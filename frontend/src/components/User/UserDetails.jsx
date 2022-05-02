import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { mobile } from '../../responsive'
import { logOut } from '../../redux/userRedux'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { confirm } from 'react-confirm-box'
import dateFormat from 'dateformat'
import Tooltip from '@mui/material/Tooltip';

const Button = styled.button`
margin: 1.2vw;
padding: 1vw;
border: none;
background-color: teal;
color: white;
cursor: pointer;
font-size: 1.4vw;
&:hover {
  background-color: #26e090fe;
}
`
const Form = styled.form`
    margin-left: 3.5vw;
`
const Input = styled.input`
    width: 25vw;
    margin: 1vw;
    padding: 1vw;
    font-size: 1.3vw;
`
const Error = styled.span`
    font-size: 1.2vw;
    padding: 0.8vw;
    color: #f16969;
`
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const ButtonContainer = styled.div`
    margin: 1.2vw;
`
const ButtonSubmit = styled.button`
  width: 10%;
  border: none;
  background-color: #dc3d92fe;
  color: white;
  cursor: pointer;
  font-size: 1.4vw;
`
const ButtonClose = styled.button`
  width: 10%;
  border: none;
  margin-left: 1.2vw;
  font-size: 1.4vw;
  background-color: #f43b3bfe;
  color: white;
  cursor: pointer;
`
const TopBar = styled.div`
    margin: 1.2vw;
    display: flex;
    justify-content: space-around;
`
const Content = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2vw;
    padding: 1vw;
`
const ImageContainer = styled.div`
    margin: 3.5vw;
    padding: 1vw;
`
const Image = styled.img`
    width: 20vw;
    height: 20vw;
    object-fit: cover;
`
const Name = styled.span`
font-size: 1.4vw;
margin: 1vw;
`
const Details = styled.div`
    flex: 1;
    display: flex;
    flex-direction:  column;
`
const Gender = styled.span`
    font-size: 1.4vw;
    margin: 1vw;
`
const Proffession = styled.span`
    font-size: 1.4vw;
    margin: 1vw;
`
const Dob = styled.span`
    font-size: 1.4vw;
    margin: 1vw;
`
const Email = styled.div`
font-size: 1.4vw;
margin: 1vw;
`
const Mobile = styled.span`
font-size: 1.4vw;
margin: 1vw;
`
const Address = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`
const Wallet = styled.span`
font-size: 1.4vw;
margin: 1vw;
`
const FullAddress = styled.span`
font-size: 1.4vw;
margin: 1vw;
`
const Pincode = styled.div`
font-size: 1.4vw;
margin: 1vw;
`
const Landmark = styled.span`
font-size: 1.4vw;
margin: 1vw;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    border: 0.1px solid lightgrey;
`
const Icons = styled.div`
    display : flex;
    flex-direction: row;
    height: 4vw;
    justify-content: center;
    align-items: center;
`
const Referal = styled.div`
font-size: 1.5vw;
margin: 1vw;
`

toast.configure()
function UserDetails() {

    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.currentUser)
    const { register, handleSubmit, formState: { errors } } = useForm()

    let userId = null
    let header = null

    if (user) {
        userId = user.user._id
        header = user.accessToken
    }
    const [flag, setFlag] = useState(false)
    const [check, setCheck] = useState(false)
    const [data, setData] = useState(false)
    const [detailsFlag, setDetailsFlag] = useState(false)
    const [credentialsFlag, setCredentialsFlag] = useState(false)
    const [address, setAddress] = useState()
    const [userData, setUserData] = useState()
    const [userCredentials, setUserCredentials] = useState()
    const [username, setUsername] = useState()
    const [referal, setReferal] = useState()

    const notify = (msg) => toast.success(msg, {
        position: "top-center", autoClose: 500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    })
    const notifyError = (msg) => toast.error(msg, {
        position: "top-center", autoClose: 500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    })

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/userDetails/' + userId, { headers: { header } })
            const [userDetail] = res.data.dt
            setUserData(userDetail)
            if (res.data.dt.length > 0) {
                setCheck(true)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getUserCredentials = async () => {
        try {
            const res = await axios.get('/api/users/find/' + userId, { headers: { header } })
            setUserCredentials(res.data.dt)
            setUsername(res.data.dt.username)
        } catch (error) {
            console.log(error);
        }
    }
    const getReferalCode = async () => {
        try {
            const res = await axios.get('/api/referal/find/' + username)
            setReferal(res.data.dt)
        } catch (error) {
            console.log(error);
        }
    }
    const getAddress = async () => {
        try {
            const res = await axios.get('/api/address/' + userId, { headers: { header } })
            setAddress(res.data.dt)
        } catch (error) {
            console.log(error);
        }
    }
    const addUserDetails = async (data) => {
        const formData = new FormData()
        formData.append('image', data.picture[0])
        formData.append('userId', userId)
        formData.append('gender', data.gender)
        formData.append('proffession', data.proffession)
        formData.append('dob', data.dob)
        try {
            const res = await axios.post('/api/userdetails/', formData, { headers: { header, userId } })
            setFlag(false)
            getUserDetails()
            notify(res.data.msg)
        } catch (error) {
            console.log(error)
            error.response.data.msg && notifyError(error.response.data.msg)
            error.response.data.status && dispatch(logOut()) && notifyError(error.response.data.msg)
        }
    }
    const addAddress = async (data) => {
        try {
            const payload = { ...data, userId }
            const res = await axios.post('/api/address/', payload, { headers: { header, userId } })
            setData(false)
            notify(res.data.msg)
            getAddress()
        } catch (error) {
            console.log(error)
            error.response.data.msg && notifyError(error.response.data.msg)
            error.response.data.status && dispatch(logOut()) && notifyError(error.response.data.msg)
        }
    }
    const deleteAddress = async (id) => {
        try {
            const result = await confirm('Do you want to delete this address?')
            if (result) {
                const res = await axios.delete('/api/address/' + id, { headers: { header, userId } })
                notify(res.data.msg)
                getAddress()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const updateCredentials = async (data) => {
        try {
            const result = await confirm('Do you really want to change credentials?')
            if (result) {
                const res = await axios.put('/api/users/' + userId, data, { headers: { header } })
                getUserCredentials()
                notify(res.data.msg)
                setCredentialsFlag(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const updateDetails = async (data) => {
        const formData = new FormData()
        formData.append('img', data.picture[0])
        formData.append('userId', userId)
        formData.append('gender', data.gender)
        formData.append('proffession', data.proffession)
        formData.append('dob', data.dob)
        try {
            const res = await axios.put('/api/userdetails/' + userId, formData, { headers: { header } })
            getUserDetails()
            notify(res.data.msg)
            setDetailsFlag(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserDetails()
        getUserCredentials()
        getAddress()
    }, [])
    useEffect(() => {
        getReferalCode()
    }, [username])
    return (
        <>
            <TopBar>
                {check ?
                    <>
                        <Button onClick={() => setDetailsFlag(true)}>Update User Details</Button>
                        <Button onClick={() => setCredentialsFlag(true)}>Update User Credentials</Button>
                    </> :
                    <Button onClick={() => setFlag(true)}>Add User Details</Button>
                }
                <Button onClick={() => setData(true)}>Add Address</Button>
            </TopBar>
            {flag &&
                <Form onSubmit={handleSubmit(addUserDetails)}>
                    <InputContainer>
                        <Input id="gender" type='text' placeholder='Gender if you wish to save' {...register('gender')} />
                        <Input id="proffession" type='text' placeholder='Your proffession' {...register('proffession', { required: true })} />
                        <Error>
                            {errors.proffession && errors.proffession.type === "required" && <span>This is required</span>}
                        </Error>
                        <Input id="dob" type='date' placeholder='Your date of birth' {...register('dob', { required: true })} />
                        <Error>
                            {errors.dob && errors.dob.type === "required" && <span>This is required</span>}
                        </Error>
                        <Input id="picture" type='file' {...register('picture', { required: true })} />
                        <Error>
                            {errors.picture && errors.picture.type === "required" && <span>This is required</span>}
                        </Error>
                    </InputContainer>
                    <ButtonContainer>
                        <ButtonSubmit type='submit'>Add</ButtonSubmit>
                        <ButtonClose onClick={() => setFlag(false)}>Close</ButtonClose>
                    </ButtonContainer>
                </Form>
            }
            {data &&
                <Form onSubmit={handleSubmit(addAddress)}>
                    <InputContainer>
                        <Input id="fullAddress" type='text' placeholder='Full address' {...register('fullAddress', { required: true })} />
                        <Error>
                            {errors.fullAddress && errors.fullAddress.type === "required" && <span>This is required</span>}
                        </Error>
                        <Input id="pincode" type='number' placeholder='pincode code' {...register('pincode', { required: true, minLength: 6, maxLength: 6 })} />
                        <Error>
                            {errors.pincode && errors.pincode.type === "required" && <span>This is required</span>}
                            {errors.pincode && errors.pincode.type === "maxLength" && <span>Max length exceeded</span>}
                            {errors.pincode && errors.pincode.type === "minLength" && <span>Min length of 6 required</span>}
                        </Error>
                        <Input id="landmark" type='text' placeholder='Landmark(optional)' {...register('landmark')} />
                    </InputContainer>
                    <ButtonContainer>
                        <ButtonSubmit type='submit'>Add</ButtonSubmit>
                        <ButtonClose onClick={() => setData(false)}>Close</ButtonClose>
                    </ButtonContainer>
                </Form>
            }
            {credentialsFlag &&
                <Form onSubmit={handleSubmit(updateCredentials)}>
                    <InputContainer>
                        <Input id="name" type='text' placeholder='Your name' {...register('name', { required: true, value: userCredentials.name })} />
                        <Error>
                            {errors.address && errors.address.type === "required" && <span>This is required</span>}
                        </Error>
                        <Input id="mobile" type='number' placeholder='mobile number' {...register('mobile', { required: true, minLength: 10, maxLength: 10, value: userCredentials.mobile })} />
                        <Error>
                            {errors.pincode && errors.pincode.type === "required" && <span>This is required</span>}
                            {errors.pincode && errors.pincode.type === "maxLength" && <span>Max length exceeded</span>}
                            {errors.pincode && errors.pincode.type === "minLength" && <span>Min length of 10 required</span>}
                        </Error>
                        <Input id="email" placeholder='Email' {...register('email', {
                            required: true,
                            value: userCredentials.email,
                            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })} />
                        <Error>
                            {errors.email && errors.email.type === "required" && <span>This is required</span>}
                            {errors.email && errors.email.type === "pattern" && <span>Invalid email</span>}
                        </Error>
                    </InputContainer>
                    <ButtonContainer>
                        <ButtonSubmit type='submit'>Update</ButtonSubmit>
                        <ButtonClose onClick={() => setCredentialsFlag(false)}>Close</ButtonClose>
                    </ButtonContainer>
                </Form>
            }
            {detailsFlag &&
                <Form onSubmit={handleSubmit(updateDetails)}>
                    <InputContainer>
                        <Input id="gender" type='text' placeholder='Your gender' {...register('gender', { required: true, value: userData.gender })} />
                        <Error>
                            {errors.address && errors.address.type === "required" && <span>This is required</span>}
                        </Error>
                        <Input id="proffession" type='text' placeholder='Your proffession' {...register('proffession', { required: true, value: userData.proffession })} />
                        <Error>
                            {errors.proffession && errors.proffession.type === "required" && <span>This is required</span>}
                        </Error>
                        <Input id="dob" type='date' placeholder='Your date of birth' {...register('dob', { required: true, value: userData.dob.slice(0, 10) })} />
                        <Error>
                            {errors.dob && errors.dob.type === "required" && <span>This is required</span>}
                        </Error>
                        <Input id="picture" type='file' {...register('picture')} />
                    </InputContainer>
                    <ButtonContainer>
                        <ButtonSubmit type='submit'>Update</ButtonSubmit>
                        <ButtonClose onClick={() => setDetailsFlag(false)}>Close</ButtonClose>
                    </ButtonContainer>
                </Form>
            }
            <Content>
                <ImageContainer>
                    <Image src={userData && userData.image} />
                </ImageContainer>
                <Details>
                    <Name>Name : {userCredentials && userCredentials.name} </Name>
                    <Gender>Gender : {userData && userData.gender}</Gender>
                    <Proffession>Profession : {userData && userData.proffession}</Proffession>
                    <Dob>DOB : {userData && dateFormat(userData.dob, "mmmm dS, yyyy")}</Dob>
                    <Email>Email : {userCredentials && userCredentials.email}</Email>
                    <Mobile>Mobile : {userCredentials && userCredentials.mobile}</Mobile>
                    <Wallet>Wallet Money : {userCredentials && userCredentials.wallet}</Wallet>
                    <Referal>Referal code : <b>{referal && referal.referalCode}</b></Referal>
                </Details>
                <Address>
                    {address?.map(data => (
                        <Container key={data._id}>
                            <FullAddress>Address : {data.fullAddress}</FullAddress>
                            <Pincode>Pincode : {data.pincode}</Pincode>
                            <Landmark>Landmark : {data.landmark}</Landmark>
                            <Icons>
                                <Link to={`/editaddress/${data._id}`}>
                                    <Tooltip title='Edit address'>
                                        <EditIcon
                                            style={{ margin: '1vw', fontSize: '2vw' }}
                                        />
                                    </Tooltip>
                                </Link>
                                <Tooltip title='Delete'>
                                    <DeleteForeverOutlinedIcon
                                        onClick={() => deleteAddress(data._id)}
                                        style={{ margin: '1vw', fontSize: '2vw', cursor: 'pointer' }}
                                    />
                                </Tooltip>
                            </Icons>
                        </Container>
                    ))}
                </Address>
            </Content>
        </>
    )
}

export default UserDetails