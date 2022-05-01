import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Announcement from '../../components/User/Announcement'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import { mobile } from '../../responsive'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../../redux/userRedux'
import ErrorNotice from '../../error/ErrorNotice'
import SuccessNotice from '../../success/SuccessNotice'

const Container = styled.div``
const Wrapper = styled.div`
    padding: 1.2vw;
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
    font-size: 3vw;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const TopButton = styled.button`
    padding: 1vw;
    font-weight: 600;
    cursor: pointer;
    font-size: 1.2vw;
    border: 0.1px solid teal;
    background-color: transparent;
    color: teal;
    &:hover {
        background-color: teal;
        color: white;
    }
`
const Content = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1.2vw;
    padding: 1vw;
    ${mobile({ flexDirection: 'column' })}
`
const End = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 1.2vw;
    border: 0.5px solid lightgray;
    border-radius: 1vw;
    padding: 1.2vw;
`
const Middle = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 1.2vw;
    border: 0.5px solid lightgray;
    border-radius: 1vw;
    padding: 1.2vw;
`
const Address = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1.2vw;
    border: 0.5px solid lightgray;
    border-radius: 1vw;
    padding: 1.2vw;
    height: 10vw;
`
const Summary = styled.div`
    flex: 1;
    margin: 1.2vw;
    border: 0.5px solid lightgray;
    border-radius: 1vw;
    padding: 1.2vw;
`
const SummaryTitle = styled.h2`
    font-weight: 220;
    font-size: 2.5vw;
`
const SummaryItem = styled.div`
    margin: 1.3vw 0vw;
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    font-size: 1.4vw;
`
const SummaryItemText = styled.span`
    font-size: 1.4vw;
`
const SummaryItemPrice = styled.span`
    font-size: 1.4vw;
`
const Button = styled.button`
    width: 90%;
    margin: 1vw;
    font-size: 1.4vw;
    padding: 1vw;
    background-color: transperant;
    color: black;
    font-weight: 600;
    cursor: pointer;
    border: 0.1px solid black;
    &:hover {
        background-color: black;
        color: white;
    }
`
const Form = styled.form`
    width: 100%;
    flex: 1;
`
const InputContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    font-size: 1.4vw;
`
const Input = styled.input`
    flex: 1;
    min-width: 4vw;
    margin: 1vw 1vw 0vw 0vw;
    padding: 1vw;
    font-size: 1.4vw;
    border: 0.1px solid black;
`
const InputRadio = styled.input`
    flex: 1;
    width: 1vw;
    height: 1vw;
    margin: 1vw 0vw 1vw 0vw;
    border: 0.1px solid black;
`
const Error = styled.span`
    font-size: 1.1vw;
    padding: 0.5vw;
    color: red;
`
const Success = styled.span`
    font-size: 1.1vw;
    padding: 0.5vw;
    color: green;
`
const Label = styled.label`
    font-weight: bolder;
    color: #1517165b;
    font-size: 1.4vw;
`
const RadioLabel = styled.p`
    font-size: 1.4vw;
`
const FormCoupon = styled.form`
    font-size: 1.4vw;
`
const InputCoupon = styled.input`
    width: 25vw;
    margin: 1vw;
    padding: 1vw;
    font-size: 1.4vw;
    border: 0.1px solid black;
`
const ButtonCheck = styled.button`
    width: 6vw;
    font-size: 1.2vw;
    padding: 0.3vw;
    background-color: teal;
    color: white;
    cursor: pointer;
    border: none;
    &:hover{
        background-color: white;
        color: teal;
        border: 0.5px solid teal;
    }
`
const CouponContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

toast.configure()
const Cart = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const paypal = useRef()

    const { register, handleSubmit } = useForm()

    const user = useSelector(state => state.user.currentUser)
    let userId = null
    let header = null
    if (user) {
        userId = user.user._id
        header = user.accessToken
    }

    const [totalPrice, setTotalPrice] = useState()
    const [grandTotal, setGrandTotal] = useState()
    const [grandTotalUSD, setGrandTotalUSD] = useState()
    const [products, setProducts] = useState()
    const [discount, setDiscount] = useState(0)
    const [maxDiscount, setMaxDiscount] = useState(0)
    const [coupon, setCoupon] = useState()
    const [buttonFlag, setButtonFlag] = useState(true)
    const [errCoupon, setErrCoupon] = useState()
    const [succCoupon, setSuccCoupon] = useState()
    const [address, setAddress] = useState()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState(0)
    const [fullAddress, setFullAddress] = useState('')
    const [pincode, setPincode] = useState(0)
    const [landmark, setLandmark] = useState('')
    const [wallet, setWallet] = useState(0)
    const [money, setMoney] = useState(0)
    const [amount, setAmount] = useState(0)
    const [errWallet, setErrWallet] = useState()
    const [succWallet, setSuccWallet] = useState()
    const [walletFlag, setWalletFlag] = useState(true)
    const [paypalFlag, setPaypalFlag] = useState(false)

    const notify = (msg) => toast.success(msg, {
        position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })
    const notifyError = (msg) => toast.error(msg, {
        position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })

    const getData = async () => {
        try {
            const response = await axios.get(`/api/preorder/` + userId, { headers: { header, userId } })
            let [resData] = response.data.dt
            setTotalPrice(resData.grandTotal)
            setProducts(resData.products)
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const getUserCredentials = async () => {
        try {
            const res = await axios.get('/api/users/find/' + userId, { headers: { header } })
            setName(res.data.dt.name)
            setEmail(res.data.dt.email)
            setMobile(res.data.dt.mobile)
            setWallet(res.data.dt.wallet)
        } catch (error) {
            console.log(error);
        }
    }
    const addAddress = async () => {
        try {
            const payload = { fullAddress, pincode, landmark, userId }

            const res = await axios.post('/api/address/', payload, { headers: { userId } })
            notify(res.data.msg)
        } catch (error) {
            console.log(error)
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
    const onSubmit = async (value) => {
        const deliveryAddress = { name, email, mobile, fullAddress, pincode, landmark }
        const total = grandTotal
        const payment = value.payment
        const payload = { userId, products, total, deliveryAddress, payment }
        const placeOrder = async () => {
            const res = await axios.post('/api/orders/', payload, { headers: { header, userId } })
            if (coupon) {
                await axios.put('/api/coupon/add/' + coupon, { userId })
            }
            await axios.delete('/api/cart/' + userId, { headers: { header, userId } })
            await axios.put('/api/users/wallet/' + userId, amount)
            notify(res.data.msg)
            navigate('/success')
        }
        if (payment === 'Cash on delivery') {
            try {
                placeOrder()
            } catch (error) {
                console.log(error)
                error.response.data.status && dispatch(logOut())
            }
        } else if (payment === 'Razorpay') {
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
            if (!res) {
                alert('Razorpay SDK failed to load. Are you online?')
                return
            }
            try {
                const data = await axios.post('/api/orders/razorpay', payload)
                const options = {
                    key: 'rzp_test_teiWvQe7PwRGVv',
                    currency: data.data.currency,
                    amount: data.data.amount.toString(),
                    order_id: data.data.id,
                    name: 'Order',
                    description: 'Place your order',
                    image: 'https://st2.depositphotos.com/1364916/6359/v/600/depositphotos_63590137-stock-illustration-blue-book-logo-vector.jpg',
                    handler: async () => {
                        placeOrder()
                    },
                    prefill: {
                        name: name,
                        email: email,
                        contact: mobile
                    }
                }
                const paymentObject = new window.Razorpay(options)
                paymentObject.open()
            } catch (error) {
                console.log(error)
            }
        } else if (payment === 'Paypal') {
            setPaypalFlag(true)
            window.paypal.Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Reader Club",
                                amount: {
                                    currency_code: "USD",
                                    value: grandTotalUSD,
                                },

                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    await actions.order.capture();
                    placeOrder()
                },
                onCancel: async (data) => {
                    navigate('/cart');
                    notifyError('Payment Cancelled');
                },

                onError: (err) => {
                    notifyError('Something Wrong');
                    navigate("/cart");
                },
                style: {
                    layout: 'vertical',
                    color: 'gold',
                    shape: 'pill',
                    label: 'pay'
                }
            })
                .render(paypal.current);
        }
    }
    const checkCoupon = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get('/api/coupon/check/' + coupon, { headers: { userId, totalPrice } })
            setMaxDiscount(res.data.dt.maximumOfffer)
            setDiscount(res.data.dt.discount)
            setButtonFlag(false)
            setSuccCoupon('Coupon applied')
        } catch (error) {
            console.log(error)
            error.response.data.coupon && setErrCoupon(error.response.data.coupon)
        }
    }
    const removeCoupon = () => {
        setButtonFlag(true)
        setMaxDiscount(0)
        setDiscount(0)
        setSuccCoupon()

    }
    const checkWallet = async (e) => {
        e.preventDefault()
        if (wallet < money) {
            setErrWallet('Not enough money in wallet')
        } else {
            setGrandTotal(totalPrice - money)
            setAmount(wallet - money)
            setWalletFlag(false)
            setSuccWallet('Wallet money added')
        }
    }
    const removeWallet = () => {
        setWalletFlag(true)
        setAmount(wallet)
        setSuccWallet()
    }
    const choose = (data) => {
        setFullAddress(data.address)
        setPincode(data.pincode)
        setLandmark(data.landmark)
    }

    useEffect(() => {
        getData()
        getAddress()
        getUserCredentials()
    }, [])
    useEffect(() => {
        setGrandTotal(totalPrice)
    }, [totalPrice])
    useEffect(() => {
        const discountValue = totalPrice * discount
        if (discountValue <= maxDiscount) {
            setGrandTotal(totalPrice - (totalPrice * discount))
        } else {
            setGrandTotal(totalPrice - maxDiscount)
        }
    }, [discount, maxDiscount])
    useEffect(() => {
        const USD = Math.round(grandTotal / 72)
        setGrandTotalUSD(USD)
    }, [grandTotal])

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <Title>Payment Page</Title>
                <Top>
                    <Link to='/cart' style={{ textDecoration: 'none' }}><TopButton>Back to your Cart</TopButton></Link>
                </Top>
                <Content>
                    <Summary>
                        <SummaryTitle><b>Final Payment</b></SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>₹ {totalPrice}</SummaryItemPrice>
                        </SummaryItem>
                        <FormCoupon >
                            <CouponContainer>
                                <Label>Coupon code
                                    <InputCoupon type='text' placeholder='Copon code' onChange={(e) => setCoupon(e.target.value)} />
                                </Label>
                                <Error>
                                    {errCoupon && <ErrorNotice message={errCoupon} />}
                                </Error>
                                <Success>
                                    {succCoupon && <SuccessNotice message={succCoupon} />}
                                </Success>
                                {buttonFlag ?
                                    <ButtonCheck onClick={checkCoupon} >Check</ButtonCheck> :
                                    <ButtonCheck style={{ backgroundColor: 'red', padding: 'px' }} onClick={removeCoupon} >Remove Coupon</ButtonCheck>
                                }
                            </CouponContainer>
                        </FormCoupon>
                        <FormCoupon >
                            <CouponContainer>
                                <Label>Wallte money
                                    <InputCoupon type='number' placeholder='amount tobe added' onChange={(e) => setMoney(e.target.value)} />
                                </Label>
                                <Error>
                                    {errWallet && <ErrorNotice message={errWallet} />}
                                </Error>
                                <Success>
                                    {succWallet && <SuccessNotice message={succWallet} />}
                                </Success>
                                {walletFlag ?
                                    <ButtonCheck onClick={checkWallet} >Add</ButtonCheck> :
                                    <ButtonCheck style={{ backgroundColor: 'red', padding: 'px' }} onClick={removeWallet} >Remove wallet Money</ButtonCheck>
                                }
                            </CouponContainer>
                        </FormCoupon>
                        <SummaryItem type='totalPrice'>
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>₹ {grandTotal}</SummaryItemPrice>
                        </SummaryItem>
                    </Summary>
                    <Middle>
                        <SummaryTitle>Saved Address</SummaryTitle>
                        {address?.map(data => (
                            <Address>
                                <SummaryItemText>Address: {data.address}</SummaryItemText>
                                <SummaryItemText>Pincode: {data.pincode}</SummaryItemText>
                                <SummaryItemText>Landmark: {data.landmark}</SummaryItemText>
                                <ButtonCheck onClick={() => choose(data)} >Choose</ButtonCheck>
                            </Address>
                        ))}
                    </Middle>
                    <End>
                        <SummaryTitle>Delivery Address</SummaryTitle>
                        <Input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} required />
                        <Input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                        <Input type='number' placeholder='Mobile' onChange={(e) => setMobile(e.target.value)} value={mobile} />
                        <Input type='text' placeholder='Full address' onChange={(e) => setFullAddress(e.target.value)} value={fullAddress} />
                        <Input type='number' placeholder='Pincode' onChange={(e) => setPincode(e.target.value)} value={pincode} />
                        <Input type='text' placeholder='Landmark (optional)' onChange={(e) => setLandmark(e.target.value)} value={landmark} />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1vw' }}>
                            <ButtonCheck
                                style={{fontSize: '0.8vw'}}
                                onClick={() => addAddress()}
                            >
                                Add this address
                            </ButtonCheck>
                        </div>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <InputContainer>
                                <Label>Payment method</Label>
                                <RadioLabel><InputRadio type="radio" value="Cash on delivery" id="Cash on delivery" {...register("payment")} /> Cash on Delivery</RadioLabel>
                                <RadioLabel><InputRadio type="radio" value="Razorpay" id="Razorpay" {...register("payment")} /> Domestic transaction with razorpay</RadioLabel>
                                <RadioLabel><InputRadio type="radio" value="Paypal" id="Paypal" {...register("payment")} /> International transaction with paypal</RadioLabel>
                                <Button type='submit'>Complete your Order</Button>
                            </InputContainer>
                        </Form>
                        {paypalFlag &&
                            <div>
                                <div ref={paypal}></div>
                            </div>
                        }
                    </End>
                </Content>
            </Wrapper>
            <Footer />
        </Container >
    )
}

export default Cart