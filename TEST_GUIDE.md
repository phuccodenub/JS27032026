# Hướng dẫn Test Import Users

## Bước 1: Chuẩn bị Database
Chạy script để tạo role USER trong database:
```bash
node setup-database.js
```

Kết quả mong đợi:
```
✓ Đã kết nối database
✓ Đã tạo role USER
✓ Đã tạo role ADMIN
=== DATABASE ĐÃ SẴN SÀNG ===
```

## Bước 2: Khởi động Server
```bash
npm start
```

Server sẽ chạy tại: http://localhost:3000

## Bước 3: Test Import Users

### Cách 1: Sử dụng Script Test
```bash
npm install form-data node-fetch
node test-import.js
```

### Cách 2: Sử dụng Postman
1. Mở Postman
2. Tạo request mới:
   - Method: POST
   - URL: http://localhost:3000/api/v1/import/users
3. Chọn tab "Body"
4. Chọn "form-data"
5. Thêm key "file" với type "File"
6. Chọn file "sample_users.xlsx"
7. Click "Send"

### Cách 3: Sử dụng cURL
```bash
curl -X POST http://localhost:3000/api/v1/import/users \
  -F "file=@sample_users.xlsx"
```

## Bước 4: Kiểm tra Email trên Mailtrap
1. Đăng nhập https://mailtrap.io
2. Vào inbox "My Sandbox"
3. Xem các email đã nhận với:
   - Subject: "Thông tin tài khoản mới"
   - Body: Username và Password (16 ký tự random)

## Bước 5: Chụp Screenshot
Chụp ảnh các email trong Mailtrap inbox để chứng minh tính năng hoạt động.

## Kết quả mong đợi

### Response từ API:
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
    },
    {
      "row": 3,
      "username": "user2",
      "email": "user2@example.com",
      "password": "xY9zW8vU7tS6rQ5p",
      "status": "success",
      "message": "User đã được tạo và email đã được gửi"
    },
    {
      "row": 4,
      "username": "user3",
      "email": "user3@example.com",
      "password": "mN4oP3qR2sT1uV0w",
      "status": "success",
      "message": "User đã được tạo và email đã được gửi"
    }
  ]
}
```

### Email trên Mailtrap:
```
From: admin@hehehe.com
To: user1@example.com
Subject: Thông tin tài khoản mới

Tài khoản của bạn đã được tạo.
Username: user1
Password: aB3dE5fG7hI9jK1l
Vui lòng đổi mật khẩu sau khi đăng nhập lần đầu.
```

## Troubleshooting

### Lỗi: Role USER không tồn tại
- Chạy lại: `node setup-database.js`

### Lỗi: Username/Email đã tồn tại
- Xóa users cũ trong database hoặc dùng username/email khác

### Lỗi: Không gửi được email
- Kiểm tra Mailtrap credentials trong `utils/senMailHandler.js`
- Đảm bảo có kết nối internet

### Lỗi: Cannot connect to MongoDB
- Đảm bảo MongoDB đang chạy
- Kiểm tra connection string trong `app.js`
