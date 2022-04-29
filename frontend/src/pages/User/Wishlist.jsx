import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Announcement from '../../components/User/Announcement'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import { mobile } from '../../responsive'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../../redux/userRedux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { confirm } from "react-confirm-box"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const Wrapper = styled.div`
    padding: 3vw;
    margin: 1.2vw;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5vw;
`
const TopButton = styled.button`
    padding: 1vw;
    font-size: 1.2vw;
    font-weight: 600;
    cursor: pointer;
    border: 0.1px solid teal;
    background-color: white;
    color: teal;
    &:hover {
        color: white;
        background-color: teal;
    }
`
const MainTitle = styled.h1`
    font-weight: 300;
    text-align: center;
    font-size: 3vw;
`
const Bottom = styled.div`
    padding: 1.2vw;
    display: flex;
    flex-direction: row;
`
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
    margin: 1.5vw;
    width: 20vw;
    height: 25vw;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &:hover ${Info}{
        opacity: 1;
    }
`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1vw;
`
const Image = styled.img`
    margin: 1vw;
    height: 70%;
    width: 70%;
    z-index: 2;
    object-fit: cover;
`
const Title = styled.h1`
    font-size: 1.5vw;
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
    margin: 10px;
    transition: all 0.1s ease;
    cursor: pointer;
    text-decoration: none;
    &:hover{
        transform: scale(1.6);
    }
`

toast.configure()
const Wishlist = () => {

    const dispatch = useDispatch()

    const [resData, setResData] = useState()

    const user = useSelector(state => state.user)
    const userId = user.currentUser.user._id
    const header = user.currentUser.accessToken

    const notifyClear = () => toast.warning('Wishlist cleared', {
        position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })
    const notify = () => toast.success('Product added to cart', {
        position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })
    const notifyDelete = () => toast.warning('Product removed from wishlist', {
        position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined
    })

    const getData = async () => {
        try {
            const response = await axios.get('/api/wishlist/' + userId, { headers: { header, userId } })
            setResData(response.data.dt)
        } catch (error) {
            console.log(error);
            error.response.data.status && dispatch(logOut())
        }
    }
    const emptyWishlist = async () => {
        try {
            const result = await confirm('Are you sure want to clear your Wishlist')
            if (result) {
                await axios.delete('/api/wishlist/' + userId, { headers: { header, userId } })
                getData()
                notifyClear()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = async (id) => {
        try {
            const result = await confirm("Are you sure about this?");
            if (result) {
                await axios.delete('/api/wishlist/find/' + id, { headers: { header, userId } })
                getData()
                notifyDelete()
            }
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const addToCart = async (product) => {
        const total = product.price
        const productId = product._id
        const payload = { userId, productId, product, total }
        const id = product._id
        try {
            await axios.post('/api/cart/', payload, { headers: { header, userId } })
            await axios.delete('/api/wishlist/find/' + id, { headers: { header, userId } })
            getData()
            notify()
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Announcement />
            <Navbar />
            <Wrapper>
                <MainTitle>Your WISHLIST</MainTitle>
                <Top>
                    <Link to='/cart' style={{ textDecoration: 'none' }}><TopButton>Your Cart</TopButton></Link>
                    <TopButton onClick={emptyWishlist}>Empty Wishlist</TopButton>
                </Top>
                <Bottom >
                    {resData?.map(data => (
                        <Container>
                            <Card>
                                <Image src={data.product.img} />
                                <Title>{data.product.title}</Title>
                            </Card>
                            <Info>
                                <Icon>
                                    <AddShoppingCartIcon
                                        style={{ cursor: 'pointer', color: 'teal', fontSize: '1.8vw' }}
                                        onClick={() => addToCart(data.product)}
                                    />
                                </Icon>
                                <Icon>
                                    <DeleteForeverIcon
                                        style={{ cursor: 'pointer', color: 'red', fontSize: '1.8vw' }}
                                        onClick={() => handleDelete(data.productId)}
                                    />
                                </Icon>
                            </Info>
                        </Container>
                    ))}
                </Bottom>
            </Wrapper>
            <Footer />
        </>
    )
}

export default Wishlist