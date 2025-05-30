require('dotenv').config();
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

const testUser = {
    username: 'testuser3',
    email: 'test3@example.com',
    password: 'password123'
};

async function testRegistration() {
    try {
        console.log('🏃 Testing Registration...\n');

        console.log('1️⃣ Attempting registration with:', {
            username: testUser.username,
            email: testUser.email,
            password: '***********'
        });

        const response = await axios.post(`${API_URL}/auth/register`, testUser);
        console.log('✅ Registration successful');
        console.log('Response:', JSON.stringify(response.data, null, 2));

        // Try logging in with the new user
        console.log('\n2️⃣ Testing login with new user...');
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
            email: testUser.email,
            password: testUser.password
        });
        console.log('✅ Login successful');
        console.log('Login Response:', JSON.stringify(loginResponse.data, null, 2));

        console.log('\n🎉 All tests completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Test failed');
        if (error.response) {
            console.error('Response error:', {
                status: error.response.status,
                data: error.response.data
            });
        } else if (error.request) {
            console.error('Request error:', error.message);
        } else {
            console.error('Error:', error.message);
        }
        process.exit(1);
    }
}

// Run the test
testRegistration(); 