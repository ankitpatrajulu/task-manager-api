const sgmail = require('@sendgrid/mail')

sgmail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'stainedredraftssub@gmail.com',
        subject: 'Thanks for Logging in',
        text: `Welcome to the App, ${name}. Let me know how you get along with the app.`
    })
}

const sendExitEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'stainedredraftssub@gmail.com',
        subject: 'We hope to see you again!',
        text: `Thanks ${name} for availing our services. We are saddened to see you go away. Is there anything on our part that we could\'ve done?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendExitEmail
}