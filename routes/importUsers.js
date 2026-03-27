var express = require("express");
var router = express.Router();
let { uploadExcel } = require('../utils/upload');
let path = require('path');
let exceljs = require('exceljs');
let userModel = require('../schemas/users');
let roleModel = require('../schemas/roles');
let userController = require('../controllers/users');
let { sendMail } = require('../utils/senMailHandler');
let crypto = require('crypto');

// Hàm tạo password random 16 ký tự
function generateRandomPassword(length = 16) {
    return crypto.randomBytes(length).toString('base64').slice(0, length);
}

router.post('/users', uploadExcel.single('file'), async function (req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).send({
                message: "File không được để trống"
            });
        }

        // Đọc file Excel
        let workbook = new exceljs.Workbook();
        let pathFile = path.join(__dirname, "../uploads", req.file.filename);
        await workbook.xlsx.readFile(pathFile);
        let worksheet = workbook.worksheets[0];
        
        let result = [];
        
        // Lấy role "user"
        let userRole = await roleModel.findOne({ name: "USER" });
        if (!userRole) {
            return res.status(400).send({
                message: "Role USER không tồn tại trong hệ thống"
            });
        }

        // Duyệt qua từng dòng trong Excel (bỏ qua dòng header)
        for (let row = 2; row <= worksheet.rowCount; row++) {
            let rowErrors = [];
            const cells = worksheet.getRow(row);
            
            let username = cells.getCell(1).value;
            let email = cells.getCell(2).value;
            
            // Validate dữ liệu
            if (!username || username.toString().trim() === '') {
                rowErrors.push('Username không được để trống');
            }
            
            if (!email || email.toString().trim() === '') {
                rowErrors.push('Email không được để trống');
            }
            
            // Kiểm tra username đã tồn tại
            let existingUser = await userController.FindByUsername(username);
            if (existingUser) {
                rowErrors.push('Username đã tồn tại');
            }
            
            // Kiểm tra email đã tồn tại
            let existingEmail = await userController.FindByEmail(email);
            if (existingEmail) {
                rowErrors.push('Email đã tồn tại');
            }
            
            if (rowErrors.length > 0) {
                result.push({
                    row: row,
                    username: username,
                    email: email,
                    status: 'failed',
                    errors: rowErrors
                });
                continue;
            }
            
            try {
                // Tạo password random 16 ký tự
                let randomPassword = generateRandomPassword(16);
                
                // Tạo user mới
                let newUser = userController.CreateAnUser(
                    username,
                    randomPassword,
                    email,
                    userRole._id,
                    '',  // fullName
                    'https://i.sstatic.net/l60Hf.png',  // avatarUrl
                    false,  // status
                    0  // loginCount
                );
                
                await newUser.save();
                
                // Gửi email password cho user
                try {
                    await sendMail(
                        email,
                        `Tài khoản của bạn đã được tạo.\nUsername: ${username}\nPassword: ${randomPassword}\nVui lòng đổi mật khẩu sau khi đăng nhập lần đầu.`
                    );
                    
                    result.push({
                        row: row,
                        username: username,
                        email: email,
                        password: randomPassword,
                        status: 'success',
                        message: 'User đã được tạo và email đã được gửi'
                    });
                } catch (emailError) {
                    result.push({
                        row: row,
                        username: username,
                        email: email,
                        password: randomPassword,
                        status: 'partial_success',
                        message: 'User đã được tạo nhưng gửi email thất bại',
                        emailError: emailError.message
                    });
                }
                
            } catch (error) {
                result.push({
                    row: row,
                    username: username,
                    email: email,
                    status: 'failed',
                    errors: [error.message]
                });
            }
        }
        
        res.send({
            message: 'Import hoàn tất',
            totalRows: worksheet.rowCount - 1,
            results: result
        });
        
    } catch (error) {
        res.status(500).send({
            message: 'Lỗi khi import users',
            error: error.message
        });
    }
});

module.exports = router;
