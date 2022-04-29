import styled from "styled-components"
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Link } from "react-router-dom";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logOut } from "../../redux/userRedux"
import { addCart } from "../../redux/cartRedux";
import { useEffect, useState } from "react";

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
`
const Container = styled.div`
    flex: 1;
    margin: 1vw;
    min-width: 25vw;
    height: 35vw;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &:hover ${Info}{
        opacity: 1;
    }
`
const Circle = styled.div`
    width: 18vw;
    height: 18vw;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 22vw;
    height: 30vw;
`
const Image = styled.img`
    margin: 1vw;
    height: 80%;
    width: 80%;
    z-index: 2;
`
const Title = styled.span`
    font-size: 1.5vw;
    font-weight: 500;
    color: teal;
`
const Price = styled.span`
    font-size: 1.4vw;
    color: teal;
`
const Icon = styled.div`
    width: 3vw;
    height: 3vw;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1vw;
    transition: all 0.1s ease;
    cursor: pointer;
    text-decoration: none;
    &:hover{
        transform: scale(1.5);
    }
`
toast.configure()
const Product = ({ item }) => {

    const dispatch = useDispatch()

    const user = useSelector((state) => state.user.currentUser)

    let userId = null
    let header = null

    if (user) {
        userId = user.user._id
        header = user.accessToken
    }

    const [price, setPrice] = useState()
    const [discount, setDiscount] = useState()
    const [total, setTotal] = useState(0)
    const [productId, setProductId] = useState(0)
    const [product, setProduct] = useState(0)

    const notifySuccess = (msg) => toast.success(msg, {
        position: "top-center", autoClose: 500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    })
    const notifyError = (msg) => toast.error(msg, {
        position: "top-center", autoClose: 500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    })

    const getOffer = async (data) => {
        try {
            const res = await axios.get('/api/banner/get/' + data)
            setDiscount(res.data.dt.discount)
        } catch (error) {
            console.log(error);
        }
    }
    const addToCart = async (products) => {
        setPrice(products.price)
        setProductId(products._id)
        setProduct(products)
        if (products.offers) {
            getOffer(products.offers)
        } else {
            setDiscount(0)
        }
    }
    const addToWishlist = async (product) => {
        const productId = product._id
        const payload = { userId, productId, product }
        try {
            const res = await axios.post('/api/wishlist/', payload, { headers: { header, userId } })
            notifySuccess(res.data.msg)
        } catch (error) {
            console.log(error)
            error.response.data.msg && notifyError(error.response.data.msg)
            error.response.data.status && dispatch(logOut()) && notifyError(error.response.data.msg)
        }
    }
    useEffect(() => {
        const total = () => {
            if (discount === 0) {
                setTotal(price)
                setDiscount()
            } else {
                setTotal(price - (price * discount))
                setDiscount()
            }
        }
        total()
    }, [discount])
    useEffect(() => {
        const cart = async () => {
            const quantity = 1
            const chapter = 1
            try {
                const data = { userId, productId, product, quantity, chapter, total }
                const res = await axios.post('/api/cart', data, { headers: { header, userId } })
                dispatch(addCart(1))
                notifySuccess(res.data.msg)
            } catch (error) {
                console.log(error)
                error.response.data.status && dispatch(logOut()) && notifyError(error.response.data.msg)
            }
        }
        if(total > 0) {
            cart()
            setTotal(0)
        }
    }, [total]) 

    return (
        <Container>
            <Circle />
            <Card>
                <Image src={item.img} />
                <Title>{item.title}</Title>
                <Price>₹<b>{item.price}</b></Price>
            </Card>
            <Info>
                {user &&
                    <Icon>
                        <ShoppingCartRoundedIcon style={{fontSize: '2vw'}} onClick={() => addToCart(item)} />
                    </Icon>}
                <Icon>
                    <Link to={`/product/${item._id}`} style={{textDecoration: 'none'}}>
                        <SearchRoundedIcon style={{fontSize: '2vw'}} />
                    </Link>
                </Icon>
                {user &&
                    <Icon>
                        <FavoriteRoundedIcon style={{fontSize: '2vw'}} onClick={() => addToWishlist(item)} />
                    </Icon>}
            </Info>
        </Container>
    )
}

export default Product