import styled from 'styled-components'
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from '../../responsive'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../redux/userRedux'
import  { previousCart } from '../../redux/cartRedux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirm } from "react-confirm-box"
import axios from 'axios';
import { useEffect } from 'react';


const Container = styled.div`
    height: 6vw;
`
const Wrapper = styled.div`
    padding: 0.9vw 1.9vw 0vw 0.9vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Language = styled.span`
    font-size: 1.1vw;
    cursor: pointer;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const MenuItem = styled.div`
    font-size: 1.3vw;
    cursor: pointer;
    margin-left: 2vw;
`
const Title = styled.div`
    font-size: 1.3vw;
    margin-left: 2vw;
`
const Center = styled.div`
    flex: 1;
    text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;
    font-size: 2.8vw;
`
toast.configure()
const Navbar = () => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.currentUser)
    const cart = useSelector((state) => state.cart.currentCart)
    let userId = null
    let header = null
    if (user) { 
        userId = user.user._id
        header = user.accessToken
    }
    const notify = () => {
        toast('Come back soon', {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        });
    }
    const getCartItems = async () => {
        try {
            const res = await axios.get('/api/cart/find/' + userId, { headers: { userId} })
            const data = res.data.dt.length
            dispatch(previousCart(data))
        } catch (error) {
            console.log(error)
        }
    }
    const handleClick = async () => {
        const logout = (dispatch) => {
            dispatch(logOut())
            notify()
        }
        const result = await confirm("Are you sure?");
        if (result) {
            logout(dispatch)
        }
    }
    useEffect(() => {
        if(user) {
            getCartItems()
        }
    }, [])

    return (
        <div>
            <Container>
                <Wrapper>
                    <Left>
                        <Language>EN</Language>
                    </Left>
                    <Center>
                        <Link to='/' style={{textDecoration: 'none'}} >
                            <Logo>Reader Club©</Logo>
                        </Link>
                    </Center>
                    <Right>
                        {user ? <>
                            <Title >Welcome <b style={{ textTransform: 'uppercase', color: 'teal' }}>{user.user.name}</b></Title>
                            <MenuItem onClick={handleClick}>LOGOUT</MenuItem>
                            <Link to='/cart' style={{textDecoration: 'none'}}>
                                <MenuItem>
                                    <Badge 
                                        badgeContent={cart} 
                                        sx={{ "& .MuiBadge-badge": { fontSize: '1vw', color: 'teal', fontWeight: 'bold' } }}
                                    >
                                        <ShoppingCartOutlinedIcon style={{ fontSize: '2.3vw' }} color="action" />
                                    </Badge>
                                </MenuItem>
                            </Link>
                        </> :
                            <>
                                <Link to='/login' style={{ textDecoration: 'none' }}>
                                    <MenuItem>LOGIN</MenuItem>
                                </Link>
                                <Link to='/register' style={{ textDecoration: 'none' }}>
                                    <MenuItem>REGISTER</MenuItem>
                                </Link>
                            </>}
                    </Right>
                </Wrapper>
            </Container>
        </div>
    )
}

export default Navbar