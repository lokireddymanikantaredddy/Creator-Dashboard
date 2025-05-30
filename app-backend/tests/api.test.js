const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let authToken = '';

const testUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
};

async function runTests() {
    try {
        console.log('🏃 Starting API tests...\n');

        // 1. Test Registration
        console.log('1️⃣ Testing Registration...');
        const registerResponse = await axios.post(`${API_URL}/auth/register`, testUser);
        console.log('✅ Registration successful');
        console.log('Response:', JSON.stringify(registerResponse.data, null, 2), '\n');

        // 2. Test Login
        console.log('2️⃣ Testing Login...');
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
            email: testUser.email,
            password: testUser.password
        });
        authToken = loginResponse.data.token;
        console.log('✅ Login successful');
        console.log('Response:', JSON.stringify(loginResponse.data, null, 2), '\n');

        // 3. Test Protected Route (Get Profile)
        console.log('3️⃣ Testing Protected Route (Get Profile)...');
        const profileResponse = await axios.get(`${API_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log('✅ Profile fetch successful');
        console.log('Response:', JSON.stringify(profileResponse.data, null, 2), '\n');

        // 4. Test Content Creation (requires creator role)
        console.log('4️⃣ Testing Content Creation...');
        const contentResponse = await axios.post(
            `${API_URL}/content`,
            {
                title: 'Test Content',
                description: 'This is a test content',
                content: 'Test content body'
            },
            {
                headers: { Authorization: `Bearer ${authToken}` }
            }
        );
        console.log('✅ Content creation successful');
        console.log('Response:', JSON.stringify(contentResponse.data, null, 2), '\n');

        console.log('🎉 All tests completed successfully!');
    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
        process.exit(1);
    }
}

// Run the tests
runTests(); 