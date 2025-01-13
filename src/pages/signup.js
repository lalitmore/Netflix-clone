import React, {useState, useContext, use} from "react";
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
import { HeaderContainer } from "../containers/header";
import { FooterContainer } from "../containers/footer";
import { Form } from "../components"
import * as ROUTES from '../constants/routes';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";

export default function Signup(){
    const history = useNavigate();
    const { firebase } = useContext(FirebaseContext);

    const [firstName, setFirstName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = firstName === '' || password === '' || emailAddress === '';
    const handleSignup = async (event) => {
        event.preventDefault();

        const auth = getAuth(firebase);
        
                //firebase work here!
                try{

                    const result = await createUserWithEmailAndPassword(auth, emailAddress, password)
                    console.log('Result in signup: ', result);
                    await updateProfile(result.user, {
                        displayName: firstName,
                        photoURL: `${Math.floor(Math.random() * 5) + 1}`,
                    });
                    console.log('im here');
                    history(ROUTES.BROWSE);
                    console.log('im here after');
                }catch(error)  {
                    setFirstName('');
                    setEmailAddress('');
                    setPassword('');
                    setError(error.message);
                }


    }


    return(
    <>
        <HeaderContainer>
       
        <Form>
            <Form.Title>Sign Up</Form.Title>
            {error && <Form.Error>{error}</Form.Error>}

            <Form.Base onSubmit = {handleSignup} method = "POST">
                <Form.Input
                    placeholder = "First Name"
                    value = {firstName}
                    onChange = {({target}) => setFirstName(target.value)}
                />
                <Form.Input
                    placeholder = "Email address"
                    value = {emailAddress}
                    onChange = {({target}) => setEmailAddress(target.value)}
                />
                <Form.Input
                    type = "password"
                    placeholder = "Password"
                    value = {password}
                    autoComplete = "off"
                    onChange = {({target}) => setPassword(target.value)}
                />
                <Form.Submit disabled = {isInvalid} type="submit">
                    Sign Up
                </Form.Submit>

                <Form.Text>
                    Already a user? <Form.Link to = "/signin">Sign in now.</Form.Link>
                </Form.Text>
                <Form.TextSmall>
                    This page is protected by Google reCAPTCHA to ensure you're not a bot.
                </Form.TextSmall>
            </Form.Base>
        </Form>
        </HeaderContainer>
        <FooterContainer />
    </>
    );
}