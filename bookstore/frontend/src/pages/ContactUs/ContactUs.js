import React, { Component } from 'react';
import styled from 'styled-components'
import { css } from 'styled-components'

import Title from "../../components/Title";

export default class contactUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name:'',
      company:'',
      mail:'',
      number:'',
      message:'',
      formSentMessage:'Your form has been submitted. Thanks for contacting us.'
    };

    // bind context to methods
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Handle form input field changes & update the state
   */
  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      [name]: value
      // comment: {
      //   ...this.state.comment,
      //   [name]: value
      // }
    });
  };

  /**
   * Form submit handler
   */
  onSubmit = e => {
    // prevent default form submission
    e.preventDefault();

    this.setState({
      formSentMessage:"Your form has been submitted. Thanks for contacting us."
    });

    this.resetFields();
  }

  resetFields() {
    this.setState({
      name:'',
      company:'',
      mail:'',
      number:'',
      message:''
    });
  };

  renderMessage = () => {
    return this.state.formSentMessage ? (
      <div className="alert alert-danger">{this.state.formSentMessage}</div>
    ) : null;
  }

  render(){
  return (
    <Container>
                <Title name="Contact" title="Us" />
                <Container wrapper>
                    <CompanyInfo />
                    <ContactForm  />
                    {/* {this.renderMessage()} */}
                </Container>
            </Container>
  );
  }
}


// Container
const Container = styled.div`
    margin-left: auto; 
    margin-right: auto;
    max-width: 1170px;  

    ${props => props.wrapper && css`
        box-shadow: 0 0 20px 0 rgba(184, 22, 31, 0.3);
        > * {
            padding: 1em; 
        }
        
        @media (min-width: 700px) {
            display: grid; 
            grid-template-columns: 1fr 2fr; 
            > * {
                padding: 2em; 
            }
        }
    `}
`;

// CompanyInfo
const WrapperCompanyInfo=styled.div`
    background: #2a2a72;
`; 

const CompanyName = styled.h3`
    margin: 0 0 1rem 0;
    text-align: center;
    color: #fff; 
    @media (min-width: 700px) {
        text-align: left; 
    }
`;

const WrapperList = styled.ul`
    list-style: none;
    margin:0 0 1rem 0;
    padding:0;
    text-align: center;
    color: #fff; 
    @media (min-width: 700px) {
        text-align: left; 
    }
`;


const CompanyInfo = () => (
    <WrapperCompanyInfo>
        <CompanyName>Amazing BookStore</CompanyName>
        <WrapperList>
            <li>Address: HaVaad Haleumi 21</li>
            <li>Phone Number: 025761348</li>
            <li>Email: contactus@bookstore.com</li>
        </WrapperList>
    </WrapperCompanyInfo>
);

// ContactForm
const WrapperGrid = styled.div`
    ${props => props.full && css`
        grid-column: 1 / 3;
    `}
`;

const ContactForm = () => (
    <div>
        <h3>Email Us</h3>
        <Form >
            <WrapperGrid>
                <Label>Name</Label>
                <Input type="text" name="name"  />
            </WrapperGrid>
            <WrapperGrid>
                <Label>Company</Label>
                <Input type="text" name="company"  />
            </WrapperGrid>
            <WrapperGrid>
                <Label>Email Address</Label>
                <Input type="email" name="email"  />
            </WrapperGrid>
            <WrapperGrid>
                <Label>Phone Number</Label>
                <Input type="text" name="phone"  />
            </WrapperGrid>
            <WrapperGrid full>
                <Label>Message</Label>
                <Textarea name="message" rows="5" ></Textarea>
            </WrapperGrid>
            <WrapperGrid full>
                <StyledButton>Submit</StyledButton>
            </WrapperGrid>
        </Form>
    </div>
);

// Form
const Form = styled.form`
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  grid-gap: 20px; 
`; 

// Label
const Label = styled.label`
    display: block; 
`;

// Input
const Input = styled.input`
    border: 1px solid #E6343B; 
    padding: 1em; 
    width: 100%; 
`;

// TextArea
const Textarea = styled.textarea`
    border: 1px solid #E6343B; 
    padding: 1em; 
    width: 100%; 
`;

// StyledButton
const StyledButton = styled.button`
    background: #2a2a72;
    border: 0; 
    color: #fff; 
    padding: 1em; 
    text-transform: uppercase; 
    width: 100%;
    
    &:hover, &:focus {
        background: #B8161F;
        color: #fff; 
        outline: 0; 
        transition: background-color 2s ease-out; 
    }
    
`;