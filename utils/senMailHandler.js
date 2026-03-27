const nodemailer = require("nodemailer");

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: "1ebd7935984e64",
        pass: "06d5ef81c27909",
    },
});
//http://localhost:3000/api/v1/auth/resetpassword/a87edf6812f235e997c7b751422e6b2f5cd95aa994c55ebeeb931ca67214d645

// Send an email using async/await;
module.exports = {
    sendMail: async function (to, content) {
        // Nếu content là URL (cho reset password)
        if (content.startsWith('http')) {
            const info = await transporter.sendMail({
                from: 'admin@hehehe.com',
                to: to,
                subject: "Reset Password",
                text: "Click vào đây để đổi password", // Plain-text version of the message
                html: "Click vào <a href=" + content + ">đây</a> để đổi password", // HTML version of the message
            });
            return info;
        } else {
            // Nếu content là text thông thường (cho import user)
            const info = await transporter.sendMail({
                from: 'admin@hehehe.com',
                to: to,
                subject: "Thông tin tài khoản mới",
                text: content,
                html: content.replace(/\n/g, '<br>'),
            });
            return info;
        }
    }
}