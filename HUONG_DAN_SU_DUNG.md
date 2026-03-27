# Hướng dẫn sử dụng tính năng Import Users

## Tổng quan
Tính năng này cho phép import hàng loạt users từ file Excel với các đặc điểm:
- Đọc username và email từ file Excel
- Tự động tạo password random 16 ký tự
- Gán role mặc định là "USER"
- Gửi email thông báo password qua Mailtrap

## Các file đã thêm/sửa đổi

### 1. routes/importUsers.js (MỚI)
File route chính xử lý import users từ Excel:
- Đọc file Excel
- Validate dữ liệu (username, email unique)
- Tạo password random 16 ký tự
- Lưu user vào database
- Gửi email thông báo

### 2. utils/senMailHandler.js (SỬA ĐỔI)
Cập nhật hàm sendMail để hỗ trợ 2 loại email:
- Email reset password (URL)
- Email thông tin tài khoản mới (text)

### 3. app.js (SỬA ĐỔI)
Thêm route mới: `/api/v1/import`

### 4. sample_users.xlsx (MỚI)
File Excel mẫu với cấu trúc:
- Cột 1: username
- Cột 2: email

### 5. createSampleExcel.js (MỚI)
Script tạo file Excel mẫu

## Cách sử dụng

### Bước 1: Cấu hình Mailtrap
1. Đăng ký tài khoản tại https://mailtrap.io
2. Lấy thông tin SMTP (username, password)
3. Cập nhật trong file `utils/senMailHandler.js`:
```javascript
auth: {
    user: "your_mailtrap_username",
    pass: "your_mailtrap_password",
}
```

### Bước 2: Chuẩn bị file Excel
Tạo file Excel với cấu trúc:
```
| username | email              |
|----------|--------------------|
| user1    | user1@example.com  |
| user2    | user2@example.com  |
```

Hoặc sử dụng file mẫu `sample_users.xlsx` đã có sẵn.

### Bước 3: Khởi động server
```bash
npm install
npm start
```

### Bước 4: Import users qua Postman

1. Mở Postman
2. Tạo request mới:
   - Method: POST
   - URL: `http://localhost:3000/api/v1/import/users`
3. Chọn tab "Body"
4. Chọn "form-data"
5. Thêm key "file" với type "File"
6. Chọn file Excel
7. Click "Send"

### Bước 5: Kiểm tra kết quả

Response sẽ trả về:
```json
{
  "message": "Import hoàn tất",
  "totalRows": 3,
  "results": [
    {
      "row": 2,
      "username": "user1",
      "email": "user1@example.com",
      "password": "aB3dE5fG7hI9jK1l",
      "status": "success",
      "message": "User đã được tạo và email đã được gửi"
    }
  ]
}
```

### Bước 6: Kiểm tra email trên Mailtrap
1. Đăng nhập vào Mailtrap
2. Vào inbox
3. Xem email với nội dung:
```
Subject: Thông tin tài khoản mới

Tài khoản của bạn đã được tạo.
Username: user1
Password: aB3dE5fG7hI9jK1l
Vui lòng đổi mật khẩu sau khi đăng nhập lần đầu.
```

## Xử lý lỗi

API sẽ validate và báo lỗi nếu:
- Username đã tồn tại
- Email đã tồn tại
- Username hoặc email để trống
- Role USER không tồn tại trong database

Ví dụ response có lỗi:
```json
{
  "row": 2,
  "username": "user1",
  "email": "user1@example.com",
  "status": "failed",
  "errors": ["Username đã tồn tại"]
}
```

## Lưu ý quan trọng

1. **Role USER**: Đảm bảo role "USER" đã tồn tại trong database trước khi import
2. **Password**: Password được hash tự động bằng bcrypt trước khi lưu
3. **Email**: Chỉ gửi được khi đã cấu hình đúng Mailtrap credentials
4. **Unique**: Username và email phải unique trong toàn bộ hệ thống

## Repository
Code đã được push lên: https://github.com/phuccodenub/JS27032026
Branch: 20260327

## Tài liệu tham khảo
- IMPORT_USERS_README.md: Chi tiết về API
- MAILTRAP_SETUP.md: Hướng dẫn cấu hình Mailtrap
