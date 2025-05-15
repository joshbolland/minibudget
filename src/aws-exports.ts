import type { ResourcesConfig } from 'aws-amplify';

const awsExports: ResourcesConfig = {
    Auth: {
        Cognito: {
            userPoolId: 'eu-west-2_GQlOtoOyK', // Replace with your actual User Pool ID
            userPoolClientId: '2v0dgb8au4r1ir0euarl0ntvrs',
            loginWith: {
                oauth: {
                    domain: 'minibudget-auth.auth.eu-west-2.amazoncognito.com',
                    scopes: ['openid', 'email', 'profile'],
                    redirectSignIn: [process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN!],
                    redirectSignOut: [process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT!],
                    responseType: 'code',
                },
                username: false,
                email: true,
                phone: false,
            },
        },
    },
};

export default awsExports;