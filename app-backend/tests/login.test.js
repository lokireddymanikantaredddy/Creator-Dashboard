require('dotenv').config();
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let authToken = '';

const testUser = {
    email: 'test@example.com',
    password: 'password123'
};

async function testLogin() {
    try {
        console.log('🏃 Testing Login...\n');

        // 1. Attempt Login
        console.log('1️⃣ Attempting login with credentials:', {
            email: testUser.email,
            password: '***********'
        });

        const loginResponse = await axios.post(`${API_URL}/auth/login`, testUser);
        authToken = loginResponse.data.token;
        console.log('✅ Login successful');
        console.log('Response:', JSON.stringify(loginResponse.data, null, 2), '\n');

        // 2. Test Protected Route
        console.log('2️⃣ Testing Protected Route...');
        console.log('Using token:', authToken ? '✅ Token received' : '❌ No token');
        
        const profileResponse = await axios.get(`${API_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log('✅ Profile fetch successful');
        console.log('Response:', JSON.stringify(profileResponse.data, null, 2), '\n');

        console.log('🎉 All tests completed successfully!');
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
testLogin(); 