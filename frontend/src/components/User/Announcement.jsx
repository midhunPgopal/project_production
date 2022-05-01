import {useEffect, useState} from 'react'
import styled from 'styled-components'
import { mobile } from '../../responsive';
import axios from 'axios';

const Container = styled.div`
    height: 2.6vw;
    background-color: teal;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1vw;
    font weight: 500;
    ${mobile({ fontSize: '2vw', height: '3.5vw' })}
`

const Announcement = () => {

  const [announcement, setAnnouncement] = useState()

  const getAnnouncement = async () => {
    try {
      const res = await axios.get('/api/announcement')
      setAnnouncement(res.data.dt)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAnnouncement()
  }, [])  

  return (
    <Container>{announcement ? announcement[0].announcement : null }</Container>
  )
}

export default Announcement