import styled from "styled-components"
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import PinterestIcon from '@mui/icons-material/Pinterest'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg'
import EmailIcon from '@mui/icons-material/Email'
import { mobile } from "../../responsive"

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #91cfad;
    
    ${mobile({ flexDirection: 'column' })}
`
const Left = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-left: 40px;
`
const Logo = styled.h1`

`
const Description = styled.p`
    margin: 20px 0px;
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`
const Title = styled.h3`
    margin-bottom: 30px;
`
const Right = styled.div`
    padding: 10px;
    margin-right: 40px;
`
const ContactItem = styled.div`
 margin-bottom: 20px;
 display: flex;
 align-items: center;
`
const Payment = styled.img`
    width: 50%;
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>Reader Club©</Logo>
                <Description>Manage your application</Description>
                <SocialContainer>
                    <SocialIcon color='3B5999'>
                        <FacebookRoundedIcon />
                    </SocialIcon>
                    <SocialIcon color='E4405F'>
                        <InstagramIcon />
                    </SocialIcon>
                    <SocialIcon color='55ACEE'>
                        <TwitterIcon />
                    </SocialIcon>
                    <SocialIcon color='E60023'>
                        <PinterestIcon />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <LocationOnIcon style={{ marginRight: '10px' }} />Crossroads, Kochi
                </ContactItem>
                <ContactItem>
                    <PermPhoneMsgIcon style={{ marginRight: '10px' }} />+91 9778147103
                </ContactItem>
                <ContactItem>
                    <EmailIcon style={{ marginRight: '10px' }} />midhunpgopal369@gmail.com
                </ContactItem>
                <Payment src='https://i.ibb.co/Qfvn4z6/payment.png' />
            </Right>
        </Container>
    )
}

export default Footer