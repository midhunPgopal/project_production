import styled from 'styled-components'
import AdminFooter from '../../components/Admin/AdminFooter'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import { mobile } from '../../responsive'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import dateFormat from 'dateformat'
import { useSelector } from 'react-redux'
import { confirm } from 'react-confirm-box'
import { toast } from 'react-toastify'


const Container = styled.div``
const Wrapper = styled.div`
    margin: 20px 20px;
    padding: 50px;
    display: flex;
    ${mobile({ padding: '10px', flexDirection: 'column' })}
`
const ImageContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    margin-left: 40px;
    width: 70%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: '40vh' })}
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: '10px' })}
`
const Title = styled.h1`
    font-weight: 200;
    font-size: 45px;
`
const Description = styled.p`
    margin: 20px 0px;
    font-size: 25px;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`
const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    flex-direction: row;
    ${mobile({ width: '100%' })}
`
const Filter = styled.div`
    display: flex;
    align-items: center;
    margin: 10px;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`
const FilterSizeOption = styled.option``
const ReviewWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 20px 50px 20px 50px;
    padding: 10px;
`
const ButtonDelete = styled.button`
    width: 35%;
    padding: 10px;
    border: none;
    background-color: #94150cf0;
    color : white;
    cursor: pointer;
    border-radius: 20px;
    
    &:hover {
        background-color: #f53022f0;
    }
    `
const Review = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0px 0px 0px;
`
const UserName = styled.span`
    margin-right: 15px;
`
const Rating = styled.span`
margin-right: 15px;
`
const Details = styled.span`
margin-right: 15px;
`
toast.configure()
const AdminProduct = () => {

    const location = useLocation()
    const id = location.pathname.split('/')[2]

    const admin = useSelector(state => state.admin)
    const header = admin.currentAdmin.accessToken

    const [product, setProduct] = useState({})
    const [review, setReview] = useState()

    const notify = (msg) => toast.success(msg, {
        position: "top-center", autoClose: 500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
    })

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get('/api/products/find/' + id)
                setProduct(res.data.dt)
            } catch (error) {
                console.log(error)
            }
        }
        getProduct()
    }, [id])
    const getReview = async () => {
        try {
            const res = await axios.get('/api/review/' + product._id)
            setReview(res.data.dt)
        } catch (error) {
            console.log(error)
        }
    }
    const reviewDelete = async (id) => {
        const result = await confirm("Are you sure want to delete?");
        if (result) {
            try {
                const res = await axios.delete('/api/review/' + id, { headers: { header } })
                notify(res.data.msg)
                getReview()
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        getReview()
    }, [product])

    return (
        <Container>
            <AdminNavbar />
            <Wrapper>
                <ImageContainer>
                    <Image src={product.img} />
                </ImageContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Description>{product.description}</Description>
                    <Description>Author : <b>{product.author}</b></Description>
                    <Description>Published by <b>{product.publisher}</b> on <b>{dateFormat(product.publishedAt, "mmmm dS, yyyy")}</b></Description>
                    <Price>₹ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Chapter</FilterTitle>
                            <FilterSize >
                                {product.chapters?.map(chapter => (
                                    <FilterSizeOption>{chapter}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                        <Filter>
                            <FilterTitle>Category</FilterTitle>
                            <FilterSize >
                                {product.categories?.map(category => (
                                    <FilterSizeOption>{category}</FilterSizeOption>
                                ))}
                            </FilterSize>
                        </Filter>
                        <Filter>
                            <FilterTitle>Offers</FilterTitle>
                            <FilterSize >
                                <FilterSizeOption>{product.offer}</FilterSizeOption>
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                </InfoContainer>
            </Wrapper>
            <ReviewWrapper>
                {review.map(item => (
                    <Review>
                        <>
                            <UserName><b>Name</b> : {item.name}</UserName>
                            <Rating><b>Rating </b> : {item.rating} / 10</Rating>
                            <Details><b>Review</b> : {item.details}</Details>
                            <ButtonDelete onClick={() => reviewDelete(item._id)}>Remove</ButtonDelete>
                        </>
                    </Review>
                ))}
            </ReviewWrapper>
            <AdminFooter />
        </Container>
    )
}

export default AdminProduct