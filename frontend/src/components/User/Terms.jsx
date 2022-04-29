import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    margin: 3vw;
    padding: 1.2vw;
    width: 90vw;
    text-align: justify;
    text-justify: inter-word;
    line-height: 2vw;
`
const Title = styled.h1`
    font-size: 2.3vw;
    margin: 1vw 0vw 1vw 0vw;
`
const SubTitle = styled.h2`
    font-size: 1.8vw;
    margin: 1vw 0vw 1vw 0vw;
`
const Content = styled.span`
    font-size: 1.4vw;
`

const Terms = () => {
    return (
        <Container >
            <Title>Terms of Use</Title>
            <Content>You are welcome to Reader Club©. You can avail the services offered here or through its affiliates,
                but prior to that you need to agree to the terms and conditions.
                If you browse our site or visit our shop, you have to accept these conditions.
                Make sure that you have read the terms and conditions properly.
                While availing current or future services that are offered by the site or its affiliates,
                you will abide by these conditions and guidelines that are applicable.
            </Content>
            <SubTitle>The Privacy Policy</SubTitle>
            <Content>
                Make sure that you thorough review the privacy policy that governs the visit to our site. You shall understand our practices properly.
            </Content>
            <SubTitle>Terms and conditions for all purchases</SubTitle>
            <Content>
                The orders are for you to buy products from us. We will accept your offer by issuing a conformation email or by confirming through mobile about the products that you have ordered.
                These acceptances are subject to your assent to the conditions of sale. No other conditions will be applicable in this context
            </Content>
            <SubTitle>Methods of Electronic Communication</SubTitle>
            <Content>As you visit our site or send any emails to use, you actually are communicating electronically. With this communication you give the consent for receiving communication from our end electronically.
                We can post notices to our website or communicate with your directly through mail. You will have to agree that all the notices and any other forms of communications that are provided by us electronically
                completely satisfy any kinds of legal necessities and such communications are in writing terms.
            </Content>
            <SubTitle>Refund Policy</SubTitle>
            <Content>
            If you cancel any order after you have procured but before shipping, we will charge the stocking fee that is applicable for each category of product. If you cancel international books,
             we can charge a restocking fee of 25% of the value of order. The other orders will have the restocking fee of about 10% of the value of order.
             We will make the refund after the deduction is made of the restocking fee that is applicable within 10 working days.
            </Content>
        </Container>
    )
}

export default Terms