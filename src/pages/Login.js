// @ts-nockeck
// Загружаем глобальные переменные
import * as CONFIG from '../config';

import axios from 'axios';
// import AppleLogin from 'react-apple-login';
import { GoogleOAuthProvider, GoogleLogin as GoogleLoginButton } from '@react-oauth/google';
import { FacebookProvider, LoginButton as FacebookLoginButton } from 'react-facebook';

const Login = () => {
    // Функция логина в ВК
    const vkontakte = () => {
        //eslint-disable-next-line no-undef
        VK.Auth.login(() => {
            VK.Auth.getLoginStatus((session) => {
                console.log(session);
            });
        }, 4194304);
    }

    // Функция отправки токена на бэкенд
    async function handleSuccess(response: any) {
        try {
            var result = await axios.post(CONFIG.API_HOST, {
                userId: response.authResponse.userID,
                accessToken: response.authResponse.accessToken
            })
            console.log(result.data); 
        } catch (error) {
            console.log(error);     
        }
    }

    function handleError(error: any) {
        console.log(error);
    }   

    // Экран авторизации
    return (
        <div className="login">
            <h1 className="loginTitle">Choose a Login Method</h1>
            <div className="wrapper">
                <div className="left">
                    <GoogleOAuthProvider clientId={CONFIG.REACT_APP_GOOGLE_CLIENT_ID}>
                        <GoogleLoginButton
                            className="loginButton google"
                            onError={handleError}
                            onSuccess={handleSuccess}
                        >
                            Авторизоваться через Google
                        </GoogleLoginButton>
                    </GoogleOAuthProvider>
                    <FacebookProvider appId={CONFIG.REACT_APP_FACEBOOK_CLIENT_ID}>
                        <FacebookLoginButton
                            className="loginButton facebook"
                            scope="email"
                            onError={handleError}
                            onSuccess={handleSuccess}
                        >
                            Авторизоваться через Facebook
                        </FacebookLoginButton>
                    </FacebookProvider>
                    <div className="loginButton vkontakte" onClick={vkontakte}>
                        VKontakte
                    </div>
                </div>
                <div className="center">
                    <div className="line"/>
                    <div className="or">ИЛИ</div>
                </div>
                <div className="right">
                    <input type="text" placeholder="Username" />
                    <input type="text" placeholder="Password" />
                    <button className="submit">Войти</button>
                </div>
            </div>
        </div>
    );
};

export default Login;

/*
                    <AppleLogin
                        clientId="1234556"
                        redirectURI="YOUR_REDIRECT_URL"
                        usePopup={true}
                        callback={handleSuccess} // Catch the response
                        scope="email"
                        responseMode="query"
                        render={renderProps => (
                            <button onClick={renderProps.onClick} className="apple" >
                                    Continue with Apple
                            </button>
                        )}
                    />
                    */
