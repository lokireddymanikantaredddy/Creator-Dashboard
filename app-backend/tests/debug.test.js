require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function debugTest() {
    try {
        console.log('🔍 Starting debug test...\n');

        // 1. Check environment variables
        console.log('Environment Variables:');
        console.log('PORT:', process.env.PORT);
        console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');
        console.log('JWT_EXPIRE:', process.env.JWT_EXPIRE);
        console.log('JWT_COOKIE_EXPIRE:', process.env.JWT_COOKIE_EXPIRE);
        console.log('MONGO_URI:', process.env.MONGO_URI ? '✅ Set' : '❌ Missing');
        console.log();

        // 2. Test MongoDB Connection
        console.log('Testing MongoDB Connection...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected\n');

        // 3. Check for existing user
        console.log('Checking for test user...');
        const user = await User.findOne({ email: 'test@example.com' });
        if (user) {
            console.log('✅ Test user found');
            console.log('User details:', {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            });
        } else {
            console.log('❌ Test user not found');
        }

        // 4. Close connection
        await mongoose.connection.close();
        console.log('\n✅ Debug test completed');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Debug test failed:', error);
        process.exit(1);
    }
}

// Run the debug test
debugTest(); 