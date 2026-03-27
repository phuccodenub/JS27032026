# Hướng dẫn cấu hình Mailtrap

## Bước 1: Đăng ký tài khoản Mailtrap
1. Truy cập https://mailtrap.io
2. Đăng ký tài khoản miễn phí
3. Xác nhận email

## Bước 2: Lấy thông tin SMTP
1. Đăng nhập vào Mailtrap
2. Vào mục "Email Testing" > "Inboxes"
3. Chọn inbox của bạn (hoặc tạo inbox mới)
4. Chọn tab "SMTP Settings"
5. Chọn "Nodemailer" trong dropdown
6. Copy thông tin:
   - Host: sandbox.smtp.mailtrap.io
   - Port: 2525 (hoặc 25, 465, 587)
   - Username: (ví dụ: 1a2b3c4d5e6f7g)
   - Password: (ví dụ: 9h8i7j6k5l4m3n)

## Bước 3: Cập nhật file senMailHandler.js
Mở file `utils/senMailHandler.js` và cập nhật:

```javascript
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,  // Hoặc port bạn chọn
    secure: false,
    auth: {
        user: "your_username_here",  // Thay bằng username từ Mailtrap
        pass: "your_password_here",  // Thay bằng password từ Mailtrap
    },
});
```

## Bước 4: Test gửi email
1. Chạy server: `npm start`
2. Import users từ file Excel
3. Kiểm tra inbox trong Mailtrap để xem email

## Ví dụ email nhận được
```
Subject: Thông tin tài khoản mới

Tài khoản của bạn đã được tạo.
Username: user1
Password: aB3dE5fG7hI9jK1l
Vui lòng đổi mật khẩu sau khi đăng nhập lần đầu.
```

## Screenshot
Sau khi import thành công, bạn sẽ thấy email trong Mailtrap inbox như sau:
- From: admin@hehehe.com
- To: user email
- Subject: Thông tin tài khoản mới
- Body: Chứa username và password
