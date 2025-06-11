export const courseContent = {
  react: {
    beginner: {
      title: 'React.js Fundamentals',
      description: 'Learn the basics of React.js and start building interactive UIs',
      modules: [
        {
          id: 1,
          title: 'Introduction to React',
          lessons: [
            {
              id: 'react-intro-1',
              title: 'What is React?',
              content: `
                React is a JavaScript library for building user interfaces. It lets you create reusable UI components
                that manage their own state and render efficiently.
                
                Key Concepts:
                - Component-Based Architecture
                - Virtual DOM
                - Declarative UI
                - Unidirectional Data Flow
              `,
              code: `
                // Your first React component
                function Welcome() {
                  return <h1>Hello, React!</h1>;
                }
              `,
              quiz: {
                question: 'What is the main purpose of React.js?',
                options: [
                  'Building user interfaces',
                  'Database management',
                  'Server configuration',
                  'Network requests'
                ],
                answer: 0
              }
            },
            {
              id: 'react-intro-2',
              title: 'Setting Up React Environment',
              content: `
                Learn how to set up a new React project using Create React App and configure your development environment.
                
                Steps covered:
                - Installing Node.js and npm
                - Creating a new React project
                - Understanding project structure
                - Running the development server
              `,
              code: `
                // Create a new React project
                npx create-react-app my-app
                cd my-app
                npm start
              `,
              quiz: {
                question: 'Which command creates a new React application?',
                options: [
                  'npx create-react-app my-app',
                  'npm create-react my-app',
                  'react new my-app',
                  'npm new-react-app my-app'
                ],
                answer: 0
              }
            }
          ],
          project: {
            title: 'Build a Profile Card Component',
            description: 'Create a reusable profile card component that displays user information',
            requirements: [
              'Create a ProfileCard component',
              'Accept props for name, image, and description',
              'Style the component using CSS',
              'Add hover effects'
            ],
            starterCode: `
              function ProfileCard({ name, image, description }) {
                return (
                  // Your code here
                );
              }
            `
          }
        },
        {
          id: 2,
          title: 'Components and Props',
          lessons: [
            {
              id: 'react-components-1',
              title: 'Understanding Components',
              content: `
                Components are the building blocks of React applications. They let you split the UI into independent,
                reusable pieces.
                
                Types of Components:
                - Functional Components
                - Class Components
                - Pure Components
              `,
              code: `
                // Functional component
                function Greeting({ name }) {
                  return <h1>Hello, {name}!</h1>;
                }

                // Class component
                class Welcome extends React.Component {
                  render() {
                    return <h1>Hello, {this.props.name}</h1>;
                  }
                }
              `,
              quiz: {
                question: 'Which is the more modern way to create React components?',
                options: [
                  'Functional Components',
                  'Class Components',
                  'Both are equally modern',
                  'Neither'
                ],
                answer: 0
              }
            }
          ],
          project: {
            title: 'Build a Comment System',
            description: 'Create a comment system with nested components',
            requirements: [
              'Create Comment and CommentList components',
              'Implement nested comments',
              'Add reply functionality',
              'Style the components'
            ],
            starterCode: `
              function Comment({ author, content, replies }) {
                return (
                  // Your code here
                );
              }
            `
          }
        }
      ]
    },
    intermediate: {
      title: 'React.js Advanced Concepts',
      // Add intermediate content structure
    },
    advanced: {
      title: 'React.js Mastery',
      // Add advanced content structure
    }
  },
  // Add other technologies following the same structure
  javascript: {
    beginner: {
      title: 'JavaScript Fundamentals',
      description: 'Master the basics of JavaScript programming',
      modules: [
        {
          id: 1,
          title: 'Introduction to JavaScript',
          lessons: [
            {
              id: 'js-intro-1',
              title: 'What is JavaScript?',
              content: `
                JavaScript is a high-level, interpreted programming language that makes modern web applications possible.
                
                Key Concepts:
                - Variables and Data Types
                - Functions and Scope
                - Objects and Arrays
                - Control Flow
              `,
              code: `
                // Your first JavaScript code
                let message = "Hello, JavaScript!";
                console.log(message);
              `,
              quiz: {
                question: 'Which of these is a valid JavaScript variable declaration?',
                options: [
                  'let myVar = 10;',
                  'variable myVar = 10;',
                  'var: myVar = 10;',
                  'const: myVar = 10;'
                ],
                answer: 0
              }
            }
          ],
          project: {
            title: 'Build a Calculator',
            description: 'Create a simple calculator with basic arithmetic operations',
            requirements: [
              'Implement addition, subtraction, multiplication, and division',
              'Create a user interface with buttons',
              'Handle user input and display results',
              'Add error handling'
            ],
            starterCode: `
              function calculate(num1, operator, num2) {
                // Your code here
              }
            `
          }
        }
      ]
    }
  }
}; 