export const bootstrapLessons = [
  {
    id: 1,
    title: 'Bootstrap Basics',
    content: 'Bootstrap is a popular CSS framework that provides pre-styled components and a responsive grid system for building modern websites.',
    code: `<!-- Bootstrap Setup -->
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <!-- Basic Grid System -->
  <div class="container">
    <div class="row">
      <div class="col-md-6">Column 1</div>
      <div class="col-md-6">Column 2</div>
    </div>
  </div>

  <!-- Basic Typography -->
  <h1 class="display-4">Large Header</h1>
  <p class="lead">Lead paragraph</p>
  <p>Regular paragraph</p>

  <!-- Basic Button -->
  <button class="btn btn-primary">Primary Button</button>
  <button class="btn btn-secondary">Secondary Button</button>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`,
    quiz: {
      question: 'What is the main container class in Bootstrap?',
      options: [
        'container',
        'wrapper',
        'main',
        'content'
      ],
      answer: 'container'
    }
  },
  {
    id: 2,
    title: 'Components',
    content: 'Bootstrap provides a wide range of pre-styled components that can be easily customized.',
    code: `<!-- Navigation -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Logo</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<!-- Card Component -->
<div class="card" style="width: 18rem;">
  <img src="image.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Card content</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

<!-- Alert Component -->
<div class="alert alert-primary" role="alert">
  This is a primary alert!
</div>`,
    quiz: {
      question: 'Which class is used to create a basic card in Bootstrap?',
      options: [
        'card',
        'box',
        'container',
        'panel'
      ],
      answer: 'card'
    }
  },
  {
    id: 3,
    title: 'Forms and Input',
    content: 'Bootstrap provides styled form controls and validation states for creating user-friendly forms.',
    code: `<!-- Basic Form -->
<form class="needs-validation" novalidate>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" required>
    <div class="invalid-feedback">
      Please provide a valid email.
    </div>
  </div>
  
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" required>
  </div>

  <!-- Checkbox -->
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="remember">
    <label class="form-check-label" for="remember">Remember me</label>
  </div>

  <!-- Select -->
  <div class="mb-3">
    <label class="form-label">Country</label>
    <select class="form-select">
      <option selected>Choose...</option>
      <option value="1">USA</option>
      <option value="2">Canada</option>
    </select>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>`,
    quiz: {
      question: 'What class is used for form inputs in Bootstrap?',
      options: [
        'form-control',
        'input-control',
        'form-input',
        'bootstrap-input'
      ],
      answer: 'form-control'
    }
  },
  {
    id: 4,
    title: 'Utilities and Helpers',
    content: 'Bootstrap includes utility classes for spacing, colors, display, flexbox, and more.',
    code: `<!-- Spacing Utilities -->
<div class="m-3">Margin all sides</div>
<div class="p-3">Padding all sides</div>
<div class="mt-3">Margin top</div>
<div class="pb-3">Padding bottom</div>

<!-- Color Utilities -->
<p class="text-primary">Primary text</p>
<p class="text-danger">Danger text</p>
<div class="bg-success text-white">Success background</div>

<!-- Display Utilities -->
<div class="d-none d-md-block">Hidden on small screens</div>
<div class="d-flex justify-content-between">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Border Utilities -->
<div class="border border-primary rounded">
  Bordered element
</div>

<!-- Text Utilities -->
<p class="text-center">Centered text</p>
<p class="text-uppercase">Uppercase text</p>`,
    quiz: {
      question: 'Which utility class is used for margin in Bootstrap?',
      options: [
        'm-*',
        'margin-*',
        'space-*',
        'gap-*'
      ],
      answer: 'm-*'
    }
  },
  {
    id: 5,
    title: 'Responsive Design',
    content: 'Bootstrap\'s grid system and responsive utilities help create mobile-friendly layouts.',
    code: `<!-- Responsive Grid -->
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">
      <!-- Responsive column -->
    </div>
  </div>
</div>

<!-- Responsive Images -->
<img src="image.jpg" class="img-fluid" alt="Responsive image">

<!-- Responsive Tables -->
<div class="table-responsive">
  <table class="table">
    <!-- Table content -->
  </table>
</div>

<!-- Responsive Navigation -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Brand</a>
    <button class="navbar-toggler" type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <!-- Nav content -->
    </div>
  </div>
</nav>

<!-- Responsive Utilities -->
<div class="d-none d-md-block">
  <!-- Visible only on medium and larger screens -->
</div>
<div class="d-md-none">
  <!-- Visible only on small screens -->
</div>`,
    quiz: {
      question: 'Which class makes images responsive in Bootstrap?',
      options: [
        'img-fluid',
        'responsive-img',
        'img-responsive',
        'fluid-image'
      ],
      answer: 'img-fluid'
    }
  }
]; 