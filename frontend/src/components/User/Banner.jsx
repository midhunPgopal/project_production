import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    position: relative;
    overflow: hidden;
`
const Arrow = styled.div`
    width: 4vw;
    height: 4vw;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${(props) => props.direction === 'left' && '1vw'};
    right: ${(props) => props.direction === 'right' && '1vw'};
    cursor: pointer;
    opacity: 0.3;   
    z-index: 2; 
    &:hover {
        opacity: 0.7;
    }
`
const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${props => props.slideIndex * -100}vw);
`
const Slide = styled.div`
    width: 100vw;
    height: 40vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: ${props => props.bg};
`
const ImgContainer = styled.div`
    height: 100%;
    flex: 2;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const InfoContainer = styled.div`
    height: 80%;
    padding: 4vw;
    flex: 1;
`
const Title = styled.h1`
    font-size: 4vw;
`
const Desc = styled.p`
    margin: 4vw 0px;
    font-size: 1.4vw;
    font-weight: 500;
    letter-spacing: 0.18vw;
`
const Offer = styled.p`
    margin: 4vw 0px;
    font-size: 1.6vw;
    font-weight: 600;
`
const Button = styled.button`
    padding: 0.6vw;
    font-size: 1.3vw;
    background-color: transparent;
    cursor: pointer;
    border: 0.1px solid black;
    box-shadow: 0.3vw 0.3vw ;
    &:hover {
        box-shadow: none;
    }
`

const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0)
    const [banner, setBanner] = useState()

    const handleClick = (direction) => {
        if (direction === 'left') {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        } else if (direction === 'right') {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }
    const getBanner = async () => {
        try {
            const res = await axios.get('/api/banner')
            setBanner(res.data.dt)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getBanner()
    }, [])

    return (
        <Container>
            <Arrow direction='left' onClick={() => handleClick('left')}>
                <ArrowLeftRoundedIcon style={{fontSize: '4vw'}} />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {banner?.map((item) => (
                    <Slide bg={item.bg}>
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.description}</Desc>
                            <Offer>{item.offerDescription}</Offer>
                            <Link to={`/products/offer/${item.offerCode}`}>
                                <Button>BUY NOW</Button>
                            </Link>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction='right' onClick={() => handleClick('right')}>
                <ArrowRightRoundedIcon style={{fontSize: '4vw'}} />
            </Arrow>
        </Container>
    )
}

export default Slider