import styled from "styled-components"
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import PinterestIcon from '@mui/icons-material/Pinterest'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg'
import EmailIcon from '@mui/icons-material/Email'
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #91cfad;
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1.5vw;
    margin-left: 1vw;
`
const Logo = styled.h1`
    font-size: 3.5vw;
`
const Description = styled.p`
    margin: 1vw;
    font-size: 1.4vw;
    margin-bottom: 1vw;
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    width: 3vw;
    height: 3vw;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1vw;
`
const Center = styled.div`
    flex: 1;
    padding: 1.5vw;
`
const Title = styled.h3`
    margin-bottom: 1vw;
    font-size: 2.5vw;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    font-size: 1.4vw;
`
const ListItem = styled.div`
    width: 50%;
    margin-bottom: 1vw;
`
const Right = styled.div`
    padding: 1vw;
    flex: 1;
    margin-right: 1vw;
`
const ContactItem = styled.div`
    margin-bottom: 1vw;
    display: flex;
    align-items: center;
    font-size: 1.4vw;
`
const Payment = styled.img`
    width: 15vw;
    margin: 1vw;
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>Reader Club©</Logo>
                <Description>Best online portal for the ones who loves to read</Description>
                <SocialContainer>
                    <SocialIcon color='3B5999'>
                        <FacebookRoundedIcon style={{fontSize: '1.4vw' }}/>
                    </SocialIcon>
                    <SocialIcon color='E4405F'>
                        <InstagramIcon style={{fontSize: '1.4vw' }} />
                    </SocialIcon>
                    <SocialIcon color='55ACEE'>
                        <TwitterIcon style={{fontSize: '1.4vw' }} />
                    </SocialIcon>
                    <SocialIcon color='E60023'>
                        <PinterestIcon style={{fontSize: '1.4vw' }} />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem><Link to='/' style={{ textDecoration: 'none' }}>Home</Link></ListItem>
                    <ListItem><Link to='/cart' style={{ textDecoration: 'none' }}>Cart</Link></ListItem>
                    <ListItem><Link to='/orders' style={{ textDecoration: 'none' }}>Order tracking</Link></ListItem>
                    <ListItem><Link to='/account' style={{ textDecoration: 'none' }}>My Account</Link></ListItem>
                    <ListItem><Link to='/wishlist' style={{ textDecoration: 'none' }}>Wishlist</Link></ListItem>
                    <ListItem><Link to='/terms' style={{ textDecoration: 'none' }}>Terms of Use</Link></ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <LocationOnIcon style={{ marginRight: '1vw',fontSize: '1.4vw' }} />Crossroads, Kochi
                </ContactItem>
                <ContactItem>
                    <PermPhoneMsgIcon style={{ marginRight: '1vw',fontSize: '1.4vw' }} />+91 9778147103
                </ContactItem>
                <ContactItem>
                    <EmailIcon style={{marginRight: '1vw',fontSize: '1.4vw' }} />midhunpgopal369@gmail.com
                </ContactItem>
                <Payment src='https://i.ibb.co/Qfvn4z6/payment.png' />
            </Right>
        </Container>
    )
}

export default Footer