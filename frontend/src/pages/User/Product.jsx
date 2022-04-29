import styled from 'styled-components'
import Announcement from '../../components/User/Announcement'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import Newsletter from '../../components/User/Newsletter'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { mobile } from '../../responsive'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import axios from 'axios'
import dateFormat from 'dateformat'
import { logOut } from '../../redux/userRedux'
import { addCart } from '../../redux/cartRedux'
import { useForm } from 'react-hook-form'


const Container = styled.div``
const Wrapper = styled.div`
    margin: 1.2vw 1.2vw;
    padding: 3vw;
    display: flex;
`
const ImageContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    margin-left: 1.5vw;
    width: 70%;
    height: 40vw;
    object-fit: cover;
`
const InfoContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0px 1.5px;
`
const Title = styled.h1`
    font-weight: 200;
    font-size: 3vw;
`
const Description = styled.p`
    margin: 1.2vw 0vw;
    font-size: 1.5vw;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 2.5vw;
`
const FilterContainer = styled.div`
    width: 50%;
    margin: 1.3vw 0vw;
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 1.2vw;
    font-weight: 200;
`
const FilterSize = styled.select`
    margin-left: 1vw;
    padding: 0.5vw;
    height: 3vw;
    width: 6vw;
    font-size: 1.4vw;
`
const FilterSizeOption = styled.option`
    font-size: 1.4vw;
`
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`
const Button = styled.button`
    padding: 1vw;
    border: 1px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    font-size: 1.4vw;
    &:hover {
        background-color: teal;
        color: white;
    }
`
const Amount = styled.span`
    width: 1.7vw;
    height: 1.7vw;
    font-size: 1.4vw;
    border-radius: 1vw;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 0.5vw;
`
const InputContainer = styled.div`
    flex: 1;
`
const Form = styled.form`
    display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
const Input = styled.input`
  width: 25vw;
  margin: 1vw;
  padding: 1vw;
  `
const Error = styled.span`
  font-size: 1.5vw;
  padding: 0.5vw;
  color: #f16969;
  `
const ButtonContainer = styled.div`
    flex: 1;
    margin: 1.2vw;
    display: flex;
    justify-content: flex-start;
`
const ButtonSubmit = styled.button`
  width: 10%;
  border: none;
  background-color: #dc3d92fe;
  color: white;
  cursor: pointer;
  font-size: 1.4vw;
  `
const ButtonClose = styled.button`
  width: 10%;
  border: none;
  margin-left: 1.2vw;
  background-color: #f43b3bfe;
  color: white;
  cursor: pointer;
  font-size: 1.4vw;
`
const ReviewWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0vw 1.8vw 0vw 1.8vw;
    padding: 1vw;
`
const ButtonReview = styled.button`
    width: 10%;
    padding: 1vw;
    border: none;
    background-color: #94150cf0;
    color : white;
    cursor: pointer;
    font-size: 1.4vw;
    &:hover {
        background-color: white;
        color: #f53022f0;
        border: 0.1px solid #f53022f0;
    }
    `
const Review = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1.2vw 0vw 0vw 0vw;
    font-size: 1.4vw;
`
const UserName = styled.span`
    margin-right: 1.8vw;
`
const Rating = styled.span`
    margin-right: 1.8vw;
`
const Details = styled.span`
    margin-right: 1.8vw;
    font-size: 1.3vw;
`
toast.configure()
const Product = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const user = useSelector((state) => state.user.currentUser)
    let userId = null
    let header = null
    let userName = null

    if (user) {
        userId = user.user._id
        userName = user.user.name
        header = user.accessToken
    }

    const id = location.pathname.split('/')[2]

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [chapter, setChapter] = useState(1)
    const [price, setPrice] = useState()
    const [review, setReview] = useState()
    const [flag, setFlag] = useState(false)
    const [offer, setoffer] = useState()
    const [discount, setDiscount] = useState()
    const [final, setFinal] = useState()

    const notify = (msg) => toast.success(msg, {
        position: "top-center", autoClose: 500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    })

    const handleQuantity = (type) => {
        if (type === 'dec') {
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }
    const handleClick = async (product) => {
        try {
            const amount = price * quantity
            let total = 0
            if (discount) {
                total = amount - (amount * discount)
            } else {
                total = amount
            }
            const productId = product._id
            const data = { userId, productId, product, quantity, chapter, total }
            const res = await axios.post('/api/cart/', data, { headers: { header, userId } })
            dispatch(addCart(1))
            notify(res.data.msg)
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }

    const getProduct = async () => {
        try {
            const res = await axios.get('/api/products/find/' + id)
            setProduct(res.data.dt)
            setPrice(res.data.dt.price)
            const [offerArray] = res.data.dt.offers
            if (offerArray !== '') {
                setoffer(res.data.dt.offers)
            }
        } catch (error) {
            console.log(error)
            error.response.data.status && dispatch(logOut())
        }
    }
    const getReview = async () => {
        try {
            const res = await axios.get('/api/review/' + product._id)
            setReview(res.data.dt)
        } catch (error) {
            console.log(error)
        }
    }
    const addReview = async (data) => {
        const payload = { productId: product._id, name: userName, rating: data.rating, details: data.details }
        try {
            const res = await axios.post('/api/review', payload, { headers: { header, userId } })
            setFlag(false)
            getReview()
            notify(res.data.msg)
        } catch (error) {
            console.log(error)
        }
    }

    const getOffer = async () => {
        try {
            const res = await axios.get('/api/banner/get/' + offer)
            setDiscount(res.data.dt.discount)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProduct()
    }, [])
    useEffect(() => {
        getReview()
    }, [product])
    useEffect(() => {
        getOffer()
        setFinal(price - (price * discount))
    }, [offer])
    useEffect(() => {
        setFinal(price - (price * discount))
    }, [discount])

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <ImageContainer>
                    <Image src={product.img} />
                </ImageContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Description>{product.description}</Description>
                    <Description>Author : <b>{product.author}</b></Description>
                    <Description>Category : <b>{product.categories?.map(category => category + ' ,')}</b></Description>
                    <Description>Published by <b>{product.publisher}</b> on {dateFormat(product.publishedAt, "mmmm dS, yyyy")}</Description>
                    {!offer &&
                        <Price>₹ {product.price}</Price>
                    }
                    {offer &&
                        <>
                            <Price style={{ textDecoration: 'line-through' }}>₹ {price}</Price>
                            <Price style={{ color: 'green' }}>₹ {final}</Price>
                        </>
                    }
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Chapter</FilterTitle>
                            <FilterSize onChange={(e) => setChapter(e.target.value)}>
                                {product.chapters?.map(chapter => (
                                    <FilterSizeOption>{chapter}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    {user &&
                        <AddContainer>
                            <AmountContainer>
                                <RemoveIcon onClick={() => handleQuantity('dec')} style={{fontSize: '1.4vw', cursor: 'pointer'}} />
                                <Amount>{quantity}</Amount>
                                <AddIcon onClick={() => handleQuantity('inc')} style={{fontSize: '1.4vw', cursor: 'pointer'}} />
                            </AmountContainer>
                            <Button onClick={() => handleClick(product)} >Add to Cart</Button>
                        </AddContainer>
                    }
                </InfoContainer>
            </Wrapper>
            {user &&
                <ButtonContainer style={{ padding: '1vw' }}>
                    <ButtonReview onClick={() => setFlag(true)}>Add review</ButtonReview>
                </ButtonContainer>
            }
            {flag &&
                <Form onSubmit={handleSubmit(addReview)} style={{ marginLeft: '1vw' }}>
                    <InputContainer>
                        <Input id="rating" type='number' step="0.01" placeholder='Your rating out of 10' {...register('rating', { required: true })} />
                        <Error>
                            {errors.rating && errors.rating.type === "required" && <span>This is required</span>}
                        </Error>
                        <Input id="details" type='text' placeholder='About the book' {...register('details', { minLength: 10 })} />
                        <Error>
                            {errors.details && errors.details.type === "minLength" && <span>Min length of 10 letters required</span>}
                        </Error>
                    </InputContainer>
                    <ButtonContainer>
                        <ButtonSubmit type='submit' >Add Review</ButtonSubmit>
                        <ButtonClose onClick={() => setFlag(false)}>Close</ButtonClose>
                    </ButtonContainer>
                </Form>
            }
            <ReviewWrapper>
                {review?.map(item => (
                    <Review>
                        <>
                            <UserName><b>Name</b> : {item.name}</UserName>
                            <Rating><b>Rating </b> : {item.rating} / 10</Rating>
                            <Details><b>Review</b> : {item.details}</Details>
                        </>
                    </Review>
                ))}
            </ReviewWrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Product