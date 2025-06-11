require('dotenv').config();

console.log('\n🔍 Checking environment variables...\n');

const requiredVars = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 5001,
    MONGODB_URI: process.env.MONGODB_URI ? '✅ Set' : '❌ Missing',
    JWT_SECRET: process.env.JWT_SECRET ? '✅ Set' : '❌ Missing',
    JWT_EXPIRE: process.env.JWT_EXPIRE || '24h'
};

console.table(requiredVars);

if (!process.env.JWT_SECRET) {
    console.error('\n❌ JWT_SECRET is missing! This is required for authentication.');
    console.log('Please add JWT_SECRET to your .env file');
    process.exit(1);
}

if (!process.env.MONGODB_URI) {
    console.error('\n❌ MONGODB_URI is missing! This is required for database connection.');
    console.log('Please add MONGODB_URI to your .env file');
    process.exit(1);
}

console.log('\n✅ All required environment variables are set!\n'); 