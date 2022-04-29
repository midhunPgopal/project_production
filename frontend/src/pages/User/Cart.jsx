import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import Announcement from '../../components/User/Announcement'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { mobile } from '../../responsive'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../../redux/userRedux'
import { addCart } from '../../redux/cartRedux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { confirm } from "react-confirm-box"
import Tooltip from '@mui/material/Tooltip'

const Container = styled.div``
const Wrapper = styled.div`
    padding: 1vw;
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
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1vw 1.2vw;
`
const Info = styled.div`
    flex: 3;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
`
const ProductDetails = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    height: 18vw;
`
const Details = styled.div`
    padding: 1.2vw;
    font-size: 1.4vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductSize = styled.span``
const PriceDetails = styled.div`
    flex: 1;
    margin: 1.2vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
`
const ProductAmount = styled.div`
    font-size: 1.5vw;
    margin: 0.5vw;
`
const ProductPrize = styled.div`
    font-size: 1.5vw;
    font-weight: 200;
`
const Hr = styled.div`
    background-color: teal;
    border: none;
    height: 0.1vw;
    margin: 1vw 1vw;
`
const Box = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 0.5px solid lightgray;
    border-radius: 1vw;
    padding: 1.2vw;
`
const Summary = styled.div`
    border: 0.5px solid lightgray;
    border-radius: 1vw;
    padding: 1.2vw;
`
const SummaryTitle = styled.h1`
    font-weight: 220;
    font-size: 2.5vw;
`
const SummaryItem = styled.div`
    margin: 1.3vw 0vw;
    display: flex;
    font-size: 1.5vw;
    justify-content: space-between;
    font-weight: 500;
    font-size: 1.2vw;
`
const SummaryItemText = styled.div``
const SummaryItemPrice = styled.div``
const Button = styled.button`
    width: 100%;
    padding: 1vw;
    font-size: 1.2vw;
    background-color: white;
    color: black;
    font-weight: 600;
    cursor: pointer
    border: 0.1px solid black;
    &:hover {
        background-color: black;
        color: white;
    }
`
const Icons = styled.div`
    display: flex;
    align-items: center;
`
toast.configure()
const Cart = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const userId = user.currentUser.user._id
    const header = user.currentUser.accessToken

    const [resData, setResData] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)
    const [productQuantity, setProductQuantity] = useState()
    const [cartId, setCartId] = useState()
    const [productPrice, setProductPrice] = useState()
    const [shipping, setShipping] = useState(99)


    const notify = (msg) => toast(msg, {
        position: "top-center", autoClose: 1500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })
    const notifyDelete = () => toast.success('Item removed from your cart', {
        position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })

    const getData = async () => {
        try {
            const response = await axios.get(`/api/cart/find/` + userId, { headers: { header, userId } })
            setResData(response.data)
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const handleDelete = async (id) => {
        try {
            const result = await confirm("Are you sure about this?");
            if (result) {
                await axios.delete('/api/cart/find/' + id, { headers: { header, userId } })
                dispatch(addCart(-1))
                notifyDelete()
                getData()
            }
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const updateCart = async () => {
        const total = productQuantity * productPrice
        try {
            await axios.put('/api/cart/quantity/' + cartId, { productQuantity, total }, { headers: { header, userId } })
            getData()
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const handleQuantity = async (id, quantity, price, value) => {
        setCartId(id)
        setProductPrice(price / quantity)
        try {
            if (value === 'dec' && quantity > 1) {
                setProductQuantity(quantity - 1)
            } else if (value === 'dec' && quantity === 1) {
                const result = await confirm("Do you want to remove it?");
                if (result) {
                    await axios.delete('/api/cart/find/' + id, { headers: { header, userId } })
                    dispatch(addCart(-1))
                    notifyDelete()
                    getData()
                }
            } else if (value === 'inc') {
                setProductQuantity(quantity + 1)
            }
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const preOrder = async () => {
        const products = resData
        await axios.post('/api/preorder', { userId, grandTotal, products }, { headers: { header } })
        navigate('/checkout')
        notify()
    }
    const removePreOrders = async () => {
        try {
            await axios.delete('/api/preorder/' + userId, { headers: { header } })
        } catch (error) {
            console.log(error)
        }
    }
    const addToWishlist = async (cart) => {
        const productId = cart.product._id
        const product = cart.product
        const payload = { userId, productId, product }
        try {
            const result = await confirm("Do you want to move this to wishlist?")
            if (result) {
                await axios.post('/api/wishlist/', payload, { headers: { header, userId } })
                await axios.delete('/api/cart/find/' + cart._id, { headers: { header, userId } })
                dispatch(addCart(-1))
                notifyDelete()
                getData()
            }
        } catch (error) {
            console.log(error)
            error.response.data.msg && notify(error.response.data.msg)
            error.response.data.status && dispatch(logOut()) && notify(error.response.data.msg)
        }
    }

    useEffect(() => {
        removePreOrders()
        getData()
    }, [header])
    useEffect(() => {
        updateCart()
    }, [productQuantity])
    useEffect(() => {
        let total = resData?.reduce((acc, data) => acc + data.total, 0)
        setSubTotal(total)
        if (total > 499) {
            setShipping(0)
        }
    }, [resData])
    useEffect(() => {
        setGrandTotal(subTotal + shipping)
    }, [subTotal])

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <Title>Your CART</Title>
                <Top>
                    <Link to='/wishlist' style={{ textDecoration: 'none' }}><TopButton>Your Wishlist</TopButton></Link>
                    <Link to='/products' style={{ textDecoration: 'none' }}><TopButton>Continue Shopping</TopButton></Link>
                </Top>
                <Bottom>
                    <Info>
                        <Hr />
                        {resData ? resData.map(data => (
                            <>
                                <Product key={data._id}>
                                    <ProductDetails>
                                        <Image src={data.product.img} />
                                        <Details>
                                            <ProductName><b>Product : </b>{data.product.title}</ProductName>
                                            <ProductId><b>ID : </b>{data.product._id}</ProductId>
                                            <ProductSize><b>Chapter : </b>{data.chapter}</ProductSize>
                                            <ProductSize><b>Price : </b>{data.product.price}</ProductSize>
                                        </Details>
                                    </ProductDetails>
                                    <PriceDetails>
                                        <ProductAmountContainer>
                                            <RemoveIcon
                                                style={{ cursor: 'pointer', color: 'rgb(103, 88, 219)', fontSize: '1.4vw' }}
                                                onClick={() => handleQuantity(data._id, data.quantity, data.total, 'dec')}
                                            />
                                            <ProductAmount>{data.quantity}</ProductAmount>
                                            <AddIcon
                                                style={{ cursor: 'pointer', color: 'rgba(18, 231, 36, 0.981)', fontSize: '1.4vw' }}
                                                onClick={() => handleQuantity(data._id, data.quantity, data.total, 'inc')}
                                            />
                                        </ProductAmountContainer>
                                        <Icons>
                                            <Tooltip title='Remove'>
                                                <DeleteForeverIcon
                                                    style={{ cursor: 'pointer', margin: '10px', fontSize: '1.8vw' }}
                                                    onClick={() => handleDelete(data._id)}
                                                />
                                            </Tooltip>
                                            <Tooltip title='Move to wihslist'>
                                                <FavoriteRoundedIcon
                                                    style={{ cursor: 'pointer', color: 'red', margin: '10px', fontSize: '1.8vw' }}
                                                    onClick={() => addToWishlist(data)}
                                                />
                                            </Tooltip>
                                        </Icons>
                                        <ProductPrize>₹ {data.total}</ProductPrize>
                                    </PriceDetails>
                                </Product>
                                <Hr />
                            </>
                        )) : null }
                    </Info>
                    <Box>
                        <Summary>
                            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>SubTotal</SummaryItemText>
                                <SummaryItemPrice>₹ {subTotal}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Estimated Shipping</SummaryItemText>
                                <SummaryItemPrice>₹{shipping}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem >
                                <SummaryItemText><b>Total</b></SummaryItemText>
                                <SummaryItemPrice>₹ <b>{grandTotal}</b></SummaryItemPrice>
                            </SummaryItem>
                        </Summary>
                        <Button onClick={preOrder}>Proceed to Checkout</Button>
                    </Box>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart