import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../context/firebase";
import { HeaderContainer } from "../containers/header";
import { FooterContainer } from "../containers/footer";
import { Form } from "../components";
import * as ROUTES from "../constants/routes";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Signin() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const isInvalid = password === "" || emailAddress === "";

  const handleSignIn = async (event) => {
    event.preventDefault();

    const auth = getAuth(firebase);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, emailAddress, password);
      console.log("User Credential:", userCredential);

      // Navigate to the browse page
      navigate(ROUTES.BROWSE);
    } catch (error) {
      console.error("Error during sign-in:", error);
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign In</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}

          <Form.Base onSubmit={handleSignIn} method="POST">
            <Form.Input
              placeholder="Email address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <Form.Input
              type="password"
              autoComplete="off"
              placeholder="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Submit disabled={isInvalid} type="submit">
              Sign In
            </Form.Submit>
          </Form.Base>

          <Form.Text>
            New to Netflix? <Form.Link to="/signup">Sign up now.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
          </Form.TextSmall>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}


{/*import React, {useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
import { HeaderContainer } from "../containers/header";
import { FooterContainer } from "../containers/footer";
import { Form } from "../components"
import * as ROUTES from '../constants/routes';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Signin(){
    const history =  useNavigate();
    const { firebase } = useContext(FirebaseContext);
    
    const [emailAddress, setEmailAddress] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState('');

    const isInvalid = password === '' || emailAddress === '';
    const  handleSignIn = async (event) => {
        event.preventDefault();

        const auth = getAuth(firebase);
        console.log('auth: ', auth);
        //firebase work here!
        try{
            //.getAuth()
            console.log('signinwithemailandpass: ', signInWithEmailAndPassword(auth, emailAddress, password));
            await signInWithEmailAndPassword(auth, emailAddress, password)
            console.log('after signin...: ', history(ROUTES.BROWSE));
            history(ROUTES.BROWSE);
            console.log('after');
        }catch(error)  {
            setEmailAddress('');
            setPassword('');
            setError(error.message);
        }
            
    };

    // check form input elements are valid email & password
    return(
        <>
            <HeaderContainer>
                <Form>
                    <Form.Title>Sign In</Form.Title>
                    {error && <Form.Error>{error}</Form.Error>}

                    <Form.Base onSubmit={handleSignIn} method = "POST">
                        <Form.Input
                            placeholder = "Email address"
                            value = {emailAddress}
                            onChange={({target}) => setEmailAddress(target.value)}
                        />
                        <Form.Input
                            type = "password"
                            autoComplete = "off"
                            placeholder = "Password"
                            value = {password}
                            onChange={({target}) => setPassword(target.value)}
                        />
                        <Form.Submit disabled = {isInvalid} type="submit">
                            Sign In
                        </Form.Submit>
                    </Form.Base>
                    
                    <Form.Text>
                        New to Netflix?<Form.Link to="/signup">Sign up now.</Form.Link>
                    </Form.Text>
                    <Form.TextSmall>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot.
                    </Form.TextSmall>
                </Form>
            </HeaderContainer>
            <FooterContainer />
        </>
    );
}*/}