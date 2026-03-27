# Hướng dẫn Import Users từ File Excel

## Mô tả
API này cho phép import nhiều users từ file Excel. Mỗi user sẽ được tạo với:
- Username và Email từ file Excel
- Password random 16 ký tự
- Role mặc định là "USER"
- Email chứa thông tin đăng nhập sẽ được gửi tự động qua Mailtrap

## Endpoint
```
POST /api/v1/import/users
```

## Yêu cầu
- File Excel (.xlsx) với cấu trúc:
  - Dòng 1: Header (username, email)
  - Từ dòng 2 trở đi: Dữ liệu users

## Cấu trúc File Excel
| username | email |
|----------|-------|
| user1    | user1@example.com |
| user2    | user2@example.com |

## Cách sử dụng với Postman

1. Mở Postman
2. Tạo request mới với method POST
3. URL: `http://localhost:3000/api/v1/import/users`
4. Chọn tab "Body"
5. Chọn "form-data"
6. Thêm key "file" với type "File"
7. Chọn file Excel của bạn
8. Click "Send"

## Response
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

## Cấu hình Mailtrap

Cập nhật thông tin Mailtrap trong file `utils/senMailHandler.js`:

```javascript
auth: {
    user: "your_mailtrap_username",
    pass: "your_mailtrap_password",
}
```

## Lưu ý
- Username và Email phải unique (không trùng với users đã có)
- Role "USER" phải tồn tại trong database
- Password sẽ được hash tự động trước khi lưu vào database
- Email sẽ được gửi qua Mailtrap (kiểm tra inbox trong Mailtrap)

## Kiểm tra Email trên Mailtrap
1. Đăng nhập vào https://mailtrap.io
2. Vào inbox của bạn
3. Xem email chứa thông tin đăng nhập của users vừa import
