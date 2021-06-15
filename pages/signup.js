import React, {useState, useEffect, useRef} from 'react';
import {Form, Button, Message, Segment, TextArea, Divider} from "semantic-ui-react";
import {HeaderMessage, FooterMessage} from "../Common/WelcomeMessages";
import CommonInputs from '../Common/CommonInputs'
import ImageDropDiv from '../Common/ImageDropDiv'

const Signup = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        bio: "",
        facebook: "",
        youtube: "",
        twitter: "",
        telegram: "",
    });

    const {name, email, password, bio} = user

    const handleChange = (e) => {
        const {name, value, files} = e.target
        if (name === 'media') {
            setMedia(files[0])
            setMediaPreview(URL.createObjectURL(files[0]))
            // Added images
        }
        setUser(prev => ({...prev, [name]: value}))
    }
    const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
    const [showSocialLinks, setShowSocialLinks] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    //
    const [username, setUsername] = useState('');
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [userNameAvailable, setUserNameAvailable] = useState(false);
    //
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null);
    const [highlighted, setHighlighted] = useState(false);
    //
    const inputRef = useRef()
    //
    const handleSubmit = e => e.preventDefault()
    //
    useEffect(() => {
        const isUser = Object.values({name, email, password, bio}).every(item => Boolean(item))
        isUser ? setSubmitDisabled(false) : setSubmitDisabled(true)
    }, [user]);

    return (
        <>
            <HeaderMessage/>
            <Form loading={formLoading} error={errorMsg !== null} onSubmit={handleSubmit}>
                <Message error header="Oops!" content={errorMsg} onDismiss={() => setErrorMsg(null)}/>
                <Segment>
                    <ImageDropDiv mediaPreview={mediaPreview}
                                  setMediaPreview={setMediaPreview}
                                  setMedia={setMedia}
                                  inputRef={inputRef}
                                  highlighter={highlighted}
                                  setHighlighted={setHighlighted}
                                  handleChange={handleChange}
                    />
                    <Form.Input required
                                label="Name"
                                placeholder="Name"
                                name="name" value={name}
                                onChange={handleChange}
                                fluid
                                icon="user"
                                iconPosition='left'/>
                    <Form.Input required
                                label="Email"
                                placeholder="email
                                " name="email"
                                value={email}
                                onChange={handleChange}
                                fluid
                                icon="envelope"
                                iconPosition='left'
                                type="email"/>
                    <Form.Input required
                                label="Password"
                                placeholder="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                fluid
                                icon={{
                                    name: 'eye',
                                    circular: true,
                                    link: true,
                                    onClick: () => setShowPassword(!showPassword)
                                }}
                                iconPosition='left'
                                type={showPassword ? `text` : `password`}/> {/*logic show password*/}
                    <Form.Input required
                                label="Name"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={handleChange}
                                fluid
                                icon="user"
                                iconPosition='left'/>
                    <Form.Input loading={usernameLoading}
                                error={!userNameAvailable}
                                required
                                label="Username"
                                placeholder="Username"
                                name="name" value={username}
                                onChange={e => {
                                    setUsername(e.target.value)
                                    if (regexUserName.test(e.target.value)) {
                                        setUserNameAvailable(true)
                                    } else {
                                        setUserNameAvailable(false)
                                    }
                                }}
                                fluid
                                icon={userNameAvailable ? 'check' : 'close'}
                                iconPosition='left'/>
                    <CommonInputs user={user}
                                  handleChange={handleChange}
                                  showSocialLinks={showSocialLinks}
                                  setShowSocialLinks={setShowSocialLinks}
                    />
                    <Divider hidden/>
                    <Button content='Signup'
                            type='submit'
                            color='orange'
                            disabled={submitDisabled || !userNameAvailable}/>

                </Segment>
            </Form>
            <FooterMessage/>
        </>
    )
};

export default Signup;