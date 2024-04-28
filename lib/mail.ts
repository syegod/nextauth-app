import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {

    //TODO: change the  for production
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
}