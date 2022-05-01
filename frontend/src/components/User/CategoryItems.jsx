import styled from 'styled-components'
import { mobile } from '../../responsive'
import { Link } from 'react-router-dom'

const Container = styled.div`
    margin: 0.1vw;
    height: 20vw;
    width: 25vw;
    position: relative;
    ${mobile({ height: '30vw', width: '40vw' })}
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Title = styled.h1`
    color: white;
    font-size: 2.3vw;
    margin-bottom: 1vw;
    text-transform: capitalize;
    ${mobile({ fontSize: '3vw' })}
`
const Button = styled.button`
    border: none;
    padding: 1vw;
    background-color: white;
    color: gray;
    cursor: pointer;
    font-size: 1vw;
    font-weight: 600;
    ${mobile({ fontSize: '2vw' })}
`
const CategoryItems = ({ item }) => {
    return (
        <Container>
            <Image src={item.img} />
            <Info>
                <Title >{item.category}</Title>
                <Link to={`/products/cat/${item.category}`}>
                    <Button>Shop Now</Button>
                </Link> 
            </Info>
        </Container>
    )
}

export default CategoryItems