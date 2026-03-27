const ExcelJS = require('exceljs');
const path = require('path');

async function createSampleExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users');

    // Thêm header
    worksheet.columns = [
        { header: 'username', key: 'username', width: 20 },
        { header: 'email', key: 'email', width: 30 }
    ];

    // Thêm dữ liệu mẫu
    worksheet.addRow({ username: 'user1', email: 'user1@example.com' });
    worksheet.addRow({ username: 'user2', email: 'user2@example.com' });
    worksheet.addRow({ username: 'user3', email: 'user3@example.com' });

    // Lưu file
    const filePath = path.join(__dirname, 'sample_users.xlsx');
    await workbook.xlsx.writeFile(filePath);
    console.log('File Excel mẫu đã được tạo: sample_users.xlsx');
}

createSampleExcel().catch(console.error);
