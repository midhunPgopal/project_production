import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../../components/User/Announcement'
import Footer from '../../components/User/Footer'
import Navbar from '../../components/User/Navbar'
import Newsletter from '../../components/User/Newsletter'
import Products from '../../components/User/Products'
import { mobile } from '../../responsive'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const Container = styled.div`

`
const Title = styled.h1`
    margin: 1.2vw;
    text-transform: capitalize;
    font-size: 3vw;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100vw;
`
const Filter = styled.div`
    margin: 1.2vw;
    width: 30vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
const FilterText = styled.span`
    font-size: 1.4vw;
    font-weight: 300;
    margin-right: 1.2vw;
`
const Select = styled.select`
    padding: 1vw;
    margin-right: 1.2vw;
    width: 15vw;
    height: 4vw;
    font-size: 1.2vw;
`
const Option = styled.option`
    font-size: 1.4vw;
    text-transform: capitalize;
`
const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1.5vw;
    height: 2vw;
`
const Input = styled.input`
    border: 0.1px solid lightgrey;
    width: 20vw;
    font-size: 1.4vw;
`

const ProductList = () => {

    const location = useLocation()
    const value = location.pathname.split('/')[2]
    let cat = null
    let offer = null

    if (value === 'offer') {
        offer = location.pathname.split('/')[3]
    } else {
        cat = location.pathname.split('/')[3]
    }

    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState('newest')
    const [categories, setCategories] = useState()
    const [search, setSearch] = useState()

    const getCategories = async () => {
        try {
            const res = await axios.get('/api/categories')
            setCategories(res.data.dt)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <Container>
            <Announcement />
            <Navbar />
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products</FilterText>
                    <Select onChange={e => setFilters(e.target.value)}>
                        <Option disabled >Categories</Option>
                        <Option >all</Option>
                        {categories?.map(item => (
                            <Option>{item.category}</Option>
                        ))}
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products</FilterText>
                    <Select onChange={e => setSort(e.target.value)}>
                        <Option value='newest'>Newest</Option>
                        <Option value='oldest'>Oldest</Option>
                        <Option value='asc'>Price (asc)</Option>
                        <Option value='desc'>Price (desc)</Option>
                    </Select>
                </Filter>
                <SearchContainer>
                    <Input placeholder='search' onChange={(e) => setSearch(e.target.value)}/>
                    <SearchRoundedIcon style={{fontSize: '1.4vw'}} />
                </SearchContainer>
            </FilterContainer>
            <Products cat={cat} offer={offer} filters={filters} sort={sort} search={search}/>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList