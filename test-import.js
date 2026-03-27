const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testImportUsers() {
    try {
        const fetch = (await import('node-fetch')).default;
        
        const form = new FormData();
        const filePath = path.join(__dirname, 'sample_users.xlsx');
        form.append('file', fs.createReadStream(filePath));

        console.log('Đang gửi request import users...');
        
        const response = await fetch('http://localhost:3000/api/v1/import/users', {
            method: 'POST',
            body: form,
            headers: form.getHeaders()
        });

        const result = await response.json();
        
        console.log('\n=== KẾT QUẢ IMPORT ===');
        console.log(JSON.stringify(result, null, 2));
        
        if (result.results) {
            console.log('\n=== CHI TIẾT ===');
            result.results.forEach((item, index) => {
                console.log(`\nUser ${index + 1}:`);
                console.log(`  Username: ${item.username}`);
                console.log(`  Email: ${item.email}`);
                console.log(`  Password: ${item.password || 'N/A'}`);
                console.log(`  Status: ${item.status}`);
                console.log(`  Message: ${item.message || item.errors?.join(', ')}`);
            });
        }
        
    } catch (error) {
        console.error('Lỗi:', error.message);
    }
}

testImportUsers();
