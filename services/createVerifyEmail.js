const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
    
    const mail = {
        to: email,
        subject: "Verification registration",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Push Me</a>`
    };
    return mail;
};

module.exports = createVerifyEmail;