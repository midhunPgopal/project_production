import styled from "styled-components"
import CategoryItems from "./CategoryItems"
import { mobile } from "../../responsive"
import { useEffect, useState } from "react"
import axios from "axios"

const Container = styled.div`
  padding: 1vw;  
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
const Wrapper = styled.div`
display: inline-flex;
flex-direction: row;
`
const Categories = () => {

  const [category, setCategory] = useState([])

  const getCategory = async () => {
    try {
      const res = await axios.get('/api/categories')
      setCategory(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <Container>
      <Wrapper>
        {category ? category.map(item => (
          <CategoryItems item={item} key={item.id} />
        )) : null }
      </Wrapper>
    </Container>
  )
}

export default Categories