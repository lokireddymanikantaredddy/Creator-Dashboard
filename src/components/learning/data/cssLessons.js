export const cssLessons = [
  {
    id: 1,
    title: 'CSS Introduction',
    content: 'CSS (Cascading Style Sheets) is used to style and layout web pages. It can control the color, font, spacing, positioning, and many other aspects of HTML elements.',
    code: `/* Basic CSS syntax */
body {
    background-color: lightblue;
    font-family: Arial, sans-serif;
}

h1 {
    color: navy;
    margin-left: 20px;
}`,
    quiz: {
      question: 'What does CSS stand for?',
      options: [
        'Cascading Style Sheets',
        'Creative Style System',
        'Computer Style Sheets',
        'Colorful Style Sheets'
      ],
      answer: 'Cascading Style Sheets'
    }
  },
  {
    id: 2,
    title: 'CSS Selectors',
    content: 'CSS selectors are used to target specific HTML elements. They can select elements by tag name, class, ID, or other attributes.',
    code: `/* Different types of selectors */
/* Element selector */
p {
    color: red;
}

/* Class selector */
.highlight {
    background-color: yellow;
}

/* ID selector */
#header {
    font-size: 24px;
}

/* Descendant selector */
div p {
    margin: 10px;
}`,
    quiz: {
      question: 'Which selector is used for elements with a specific class?',
      options: ['#', '.', '@', '$'],
      answer: '.'
    }
  },
  {
    id: 3,
    title: 'CSS Box Model',
    content: 'The CSS box model is a fundamental concept that describes how elements are structured. It consists of margin, border, padding, and content.',
    code: `/* Box model example */
.box {
    margin: 10px;
    border: 2px solid black;
    padding: 20px;
    width: 300px;
    height: 200px;
    background-color: white;
}`,
    quiz: {
      question: 'What is the outermost layer of the CSS box model?',
      options: ['Content', 'Padding', 'Border', 'Margin'],
      answer: 'Margin'
    }
  },
  {
    id: 4,
    title: 'CSS Flexbox',
    content: 'Flexbox is a one-dimensional layout method for arranging items in rows or columns. It provides a more efficient way to distribute space and align items.',
    code: `/* Flexbox container */
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Flex items */
.item {
    flex: 1;
    margin: 5px;
    padding: 10px;
    background-color: #f0f0f0;
}`,
    quiz: {
      question: 'Which property makes an element a flex container?',
      options: [
        'display: flex',
        'position: flex',
        'flex: 1',
        'flex-wrap: wrap'
      ],
      answer: 'display: flex'
    }
  },
  {
    id: 5,
    title: 'CSS Grid',
    content: 'CSS Grid is a two-dimensional layout system that can handle both columns and rows. It\'s perfect for creating complex layouts and organizing content.',
    code: `/* Grid container */
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
}

/* Grid items */
.grid-item {
    background-color: #ddd;
    padding: 20px;
    text-align: center;
}`,
    quiz: {
      question: 'What property creates a grid container?',
      options: [
        'display: grid',
        'display: flex',
        'position: grid',
        'grid: true'
      ],
      answer: 'display: grid'
    }
  }
]; 