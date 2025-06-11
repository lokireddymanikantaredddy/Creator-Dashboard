export const htmlLessons = [
  {
    id: 1,
    title: 'HTML Introduction',
    content: 'HTML is the standard markup language for creating Web pages. HTML describes the structure of a Web page and consists of a series of elements that tell the browser how to display the content.',
    code: `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Welcome to HTML</h1>
    <p>This is my first paragraph.</p>
</body>
</html>`,
    quiz: {
      question: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'High Tech Modern Language',
        'Hyper Transfer Markup Language',
        'Home Tool Markup Language'
      ],
      answer: 'Hyper Text Markup Language'
    }
  },
  {
    id: 2,
    title: 'HTML Elements',
    content: 'HTML elements are represented by tags. Tags are enclosed in angle brackets < >. Most elements have both opening and closing tags.',
    code: `<h1>This is a heading</h1>
<p>This is a paragraph.</p>
<a href="https://www.example.com">This is a link</a>
<img src="image.jpg" alt="An example image">`,
    quiz: {
      question: 'Which of these is a self-closing tag?',
      options: ['<p>', '<div>', '<img>', '<span>'],
      answer: '<img>'
    }
  },
  {
    id: 3,
    title: 'HTML Attributes',
    content: 'HTML attributes provide additional information about HTML elements. They are always specified in the start tag and usually come in name/value pairs.',
    code: `<a href="https://www.example.com">Visit Example.com</a>
<img src="cat.jpg" alt="A cute cat" width="300" height="200">
<p class="important">This is an important paragraph.</p>`,
    quiz: {
      question: 'What is the correct syntax for an HTML attribute?',
      options: [
        'name="value"',
        'value:name',
        'name=>value',
        'value-name'
      ],
      answer: 'name="value"'
    }
  },
  {
    id: 4,
    title: 'HTML Forms',
    content: 'HTML forms are used to collect user input. The form element defines a form that contains form elements like input fields, checkboxes, radio buttons, submit buttons, etc.',
    code: `<form action="/submit" method="post">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username">
    
    <label for="password">Password:</label>
    <input type="password" id="password" name="password">
    
    <input type="submit" value="Submit">
</form>`,
    quiz: {
      question: 'Which attribute specifies where to send form data when submitted?',
      options: ['method', 'action', 'submit', 'target'],
      answer: 'action'
    }
  },
  {
    id: 5,
    title: 'HTML Tables',
    content: 'HTML tables allow you to arrange data in rows and columns. They are created using the <table> tag, along with <tr> for rows, <th> for headers, and <td> for data cells.',
    code: `<table border="1">
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
    </tr>
    <tr>
        <td>Row 1, Cell 1</td>
        <td>Row 1, Cell 2</td>
    </tr>
    <tr>
        <td>Row 2, Cell 1</td>
        <td>Row 2, Cell 2</td>
    </tr>
</table>`,
    quiz: {
      question: 'Which tag is used for table rows?',
      options: ['<td>', '<th>', '<tr>', '<table>'],
      answer: '<tr>'
    }
  }
]; 