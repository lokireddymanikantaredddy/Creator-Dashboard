export const mongodbLessons = [
  {
    id: 1,
    title: 'MongoDB Introduction',
    content: 'MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. It provides high performance, high availability, and easy scalability.',
    code: `// MongoDB Shell Commands
// Show all databases
show dbs

// Create/Switch to a database
use myDatabase

// Show collections
show collections

// Create a collection and insert a document
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  createdAt: new Date()
})`,
    quiz: {
      question: 'What type of database is MongoDB?',
      options: [
        'NoSQL',
        'SQL',
        'Graph Database',
        'Key-Value Store'
      ],
      answer: 'NoSQL'
    }
  },
  {
    id: 2,
    title: 'CRUD Operations',
    content: 'MongoDB provides various methods to Create, Read, Update, and Delete documents. These operations form the foundation of database manipulation.',
    code: `// Create - Insert documents
db.users.insertOne({ name: "Alice" })
db.users.insertMany([
  { name: "Bob" },
  { name: "Charlie" }
])

// Read - Query documents
db.users.find({ age: { $gt: 25 } })
db.users.findOne({ email: "alice@example.com" })

// Update - Modify documents
db.users.updateOne(
  { name: "Alice" },
  { $set: { age: 26 } }
)
db.users.updateMany(
  { age: { $lt: 18 } },
  { $set: { status: "minor" } }
)

// Delete - Remove documents
db.users.deleteOne({ name: "Alice" })
db.users.deleteMany({ status: "inactive" })`,
    quiz: {
      question: 'Which method is used to insert multiple documents at once?',
      options: [
        'insertMany()',
        'insertMultiple()',
        'createMany()',
        'addMany()'
      ],
      answer: 'insertMany()'
    }
  },
  {
    id: 3,
    title: 'Queries and Filters',
    content: 'MongoDB provides powerful query operators and filters to find documents that match specific conditions.',
    code: `// Comparison operators
db.products.find({
  price: { $gt: 100 },    // Greater than
  stock: { $gte: 10 },    // Greater than or equal
  rating: { $lt: 4 },     // Less than
  views: { $lte: 1000 }   // Less than or equal
})

// Logical operators
db.users.find({
  $and: [
    { age: { $gte: 18 } },
    { status: "active" }
  ]
})

// Array operators
db.posts.find({
  tags: { $in: ["mongodb", "database"] }
})

// Regular expressions
db.products.find({
  name: { $regex: /^iPhone/, $options: 'i' }
})`,
    quiz: {
      question: 'Which operator is used to match values in an array?',
      options: ['$in', '$contains', '$has', '$array'],
      answer: '$in'
    }
  },
  {
    id: 4,
    title: 'Aggregation Framework',
    content: 'The aggregation framework allows you to process data records and return computed results. It\'s powerful for data analysis and reporting.',
    code: `// Basic aggregation pipeline
db.orders.aggregate([
  // Match stage - filter documents
  { $match: { status: "completed" } },
  
  // Group stage - group and calculate
  { $group: {
    _id: "$customerId",
    totalSpent: { $sum: "$amount" },
    orderCount: { $sum: 1 }
  }},
  
  // Sort stage - order results
  { $sort: { totalSpent: -1 } },
  
  // Project stage - shape output
  { $project: {
    customer: "$_id",
    totalSpent: 1,
    orderCount: 1,
    averageOrder: { 
      $divide: ["$totalSpent", "$orderCount"] 
    }
  }}
])`,
    quiz: {
      question: 'What is the purpose of the $group stage in aggregation?',
      options: [
        'Group documents and calculate values',
        'Filter documents',
        'Sort documents',
        'Join collections'
      ],
      answer: 'Group documents and calculate values'
    }
  },
  {
    id: 5,
    title: 'Indexing and Performance',
    content: 'Indexes support efficient execution of queries in MongoDB. They improve read operations but can impact write performance.',
    code: `// Create single field index
db.users.createIndex({ email: 1 })

// Create compound index
db.products.createIndex({ 
  category: 1, 
  price: -1 
})

// Create unique index
db.users.createIndex(
  { username: 1 },
  { unique: true }
)

// Text index for full-text search
db.articles.createIndex({
  title: "text",
  content: "text"
})

// View index information
db.collection.getIndexes()

// Explain query execution
db.users.find({ email: "test@example.com" })
  .explain("executionStats")`,
    quiz: {
      question: 'What is the purpose of creating an index in MongoDB?',
      options: [
        'Improve query performance',
        'Reduce database size',
        'Enable data backup',
        'Create data relationships'
      ],
      answer: 'Improve query performance'
    }
  }
]; 