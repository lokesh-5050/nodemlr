const nodemailer = require("nodemailer");
const googleApis = require("googleapis");

const REDIRECT_URI = `https://developers.google.com/oauthplayground`;
const CLIENT_ID = "1042047693006-mmlgg73hs4o5dj33vqafen0co0iq7cvq.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN = "1//04JZ28lVr0nT3CgYIARAAGAQSNwF-L9IrQuEu_hNaEIyTPUhXwo3zLHhFUQf6ZoMXb6kuJVfi9TIoEotVIHQw0yYGU-BtHcyi1gg";

const authClient = new googleApis.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
authClient.setCredentials({refresh_token: REFRESH_TOKEN});


async function mailer(){
    try{
        const ACCESS_TOKEN = await authClient.getAccessToken();

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "zking2842@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: ACCESS_TOKEN
            }
        })

        const details = {
            from: "Zeus King <zking2842@gmail.com>",
            to: "sonalimali697@gmail.com",
            subject: "Nodemailer testing",
            text: "Hey lokesh! zeus here",
            html: "<h2>or kesi hai</h2>"
        }

        const result =  await transport.sendMail(details);
        return result;

    }
    catch(err){
        return err;
    }
}

mailer().then(res => {
    console.log("sent mail !", res);
})