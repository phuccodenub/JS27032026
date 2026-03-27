const mongoose = require('mongoose');
const roleModel = require('./schemas/roles');

async function setupDatabase() {
    try {
        // Kết nối database
        await mongoose.connect('mongodb+srv://nguyenphuc29092004_db_user:123456@cluster0.eqxaamj.mongodb.net/NNPTUD-C6?retryWrites=true&w=majority&appName=Cluster0');
        console.log('✓ Đã kết nối database');

        // Kiểm tra role USER đã tồn tại chưa
        let userRole = await roleModel.findOne({ name: 'USER' });
        
        if (!userRole) {
            // Tạo role USER
            userRole = new roleModel({
                name: 'USER',
                description: 'Normal user role'
            });
            await userRole.save();
            console.log('✓ Đã tạo role USER');
        } else {
            console.log('✓ Role USER đã tồn tại');
        }

        // Kiểm tra role ADMIN
        let adminRole = await roleModel.findOne({ name: 'ADMIN' });
        if (!adminRole) {
            adminRole = new roleModel({
                name: 'ADMIN',
                description: 'Administrator role'
            });
            await adminRole.save();
            console.log('✓ Đã tạo role ADMIN');
        } else {
            console.log('✓ Role ADMIN đã tồn tại');
        }

        console.log('\n=== DATABASE ĐÃ SẴN SÀNG ===');
        
        await mongoose.disconnect();
        
    } catch (error) {
        console.error('Lỗi:', error.message);
        process.exit(1);
    }
}

setupDatabase();
