import styled from 'styled-components'
import { mobile } from '../../responsive'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../redux/adminRedux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirm } from "react-confirm-box"


const Container = styled.div`
    height: 80px;
    width: 100%;
    ${mobile({ height: '50px' })}
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: lightgrey;
    ${mobile({ padding: '10px 0px' })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.span`
    font-size:14px;
    cursor: pointer;
    ${mobile({ display: 'none' })}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: '2', justifyContent: 'center' })}
`

const MenuItem = styled.div`
    font-size: 18px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`
const Title = styled.div`
    font-size: 18px;
    margin-left: 25px;
    ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: '20px' })}
`

toast.configure()
const Navbar = () => {

    const dispatch = useDispatch()
    const admin = useSelector((state) => state.admin.currentAdmin)

    const notify = () => {
        toast('Admin Logged out', {
            position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
        })
    }

    const handleClick = async () => {
        const logout = (dispatch) => {
            dispatch(logOut())
            notify()
        }
        const result = await confirm("Are you sure?")
        if (result) {
            logout(dispatch)
        }
    }

    return (
        <div>
            <Container>
                <Wrapper>
                    <Left>
                        <Language>EN</Language>
                    </Left>
                    <Center>
                        <Link to='/admin' style={{ textDecoration: 'none' }}>
                            <Logo>Reader Club© Admin Panel</Logo>
                        </Link>
                    </Center>
                    <Right>
                        <Title >Welcome <b style={{ textTransform: 'uppercase', color: 'teal' }}>{admin.admin.name}</b></Title>
                        <MenuItem onClick={handleClick}>LOGOUT</MenuItem>
                    </Right>
                </Wrapper>
            </Container>
        </div>
    )
}

export default Navbar