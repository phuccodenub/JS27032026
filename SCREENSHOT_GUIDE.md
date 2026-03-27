# Hướng dẫn chụp ảnh Email từ Mailtrap

## Yêu cầu: Chụp ảnh email trên Mailtrap

Sau khi import users thành công, bạn cần chụp ảnh email nhận được trên Mailtrap để chứng minh tính năng hoạt động.

## Các bước thực hiện

### 1. Cấu hình Mailtrap
- Đăng nhập vào https://mailtrap.io
- Lấy SMTP credentials và cập nhật vào `utils/senMailHandler.js`

### 2. Import Users
- Sử dụng Postman để gửi request POST đến `/api/v1/import/users`
- Attach file `sample_users.xlsx`
- Nhận response thành công

### 3. Kiểm tra Email trên Mailtrap
- Vào Mailtrap inbox
- Bạn sẽ thấy các email mới với:
  - **From**: admin@hehehe.com
  - **To**: Email của user (ví dụ: user1@example.com)
  - **Subject**: Thông tin tài khoản mới
  - **Body**: 
    ```
    Tài khoản của bạn đã được tạo.
    Username: user1
    Password: [16 ký tự random]
    Vui lòng đổi mật khẩu sau khi đăng nhập lần đầu.
    ```

### 4. Chụp ảnh
Chụp các ảnh sau:

#### Ảnh 1: Danh sách email trong inbox
- Hiển thị nhiều email đã nhận
- Thấy rõ subject "Thông tin tài khoản mới"
- Thấy rõ địa chỉ email người nhận

#### Ảnh 2: Nội dung email chi tiết
- Click vào một email
- Chụp ảnh hiển thị:
  - From: admin@hehehe.com
  - To: user email
  - Subject: Thông tin tài khoản mới
  - Body: Username và Password (16 ký tự random)

#### Ảnh 3: HTML view của email
- Click tab "HTML" trong Mailtrap
- Chụp ảnh hiển thị nội dung HTML với các thẻ `<br>`

### 5. Lưu ảnh
- Lưu ảnh với tên rõ ràng:
  - `mailtrap_inbox.png`
  - `mailtrap_email_detail.png`
  - `mailtrap_email_html.png`

## Ví dụ nội dung email cần chụp

```
From: admin@hehehe.com
To: user1@example.com
Subject: Thông tin tài khoản mới

Tài khoản của bạn đã được tạo.
Username: user1
Password: aB3dE5fG7hI9jK1l
Vui lòng đổi mật khẩu sau khi đăng nhập lần đầu.
```

## Lưu ý
- Password sẽ khác nhau cho mỗi user (random 16 ký tự)
- Đảm bảo ảnh chụp rõ ràng, đầy đủ thông tin
- Có thể chụp nhiều email để chứng minh import nhiều users cùng lúc

## Checklist
- [ ] Đã cấu hình Mailtrap credentials
- [ ] Đã import users thành công
- [ ] Đã nhận email trên Mailtrap
- [ ] Đã chụp ảnh inbox
- [ ] Đã chụp ảnh chi tiết email
- [ ] Đã chụp ảnh HTML view
- [ ] Password hiển thị đúng 16 ký tự random
