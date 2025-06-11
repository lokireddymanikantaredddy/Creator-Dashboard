export const gitLessons = [
  {
    id: 1,
    title: 'Git Basics',
    content: 'Git is a distributed version control system that helps track changes in source code during software development.',
    code: `# Initialize a new Git repository
git init

# Check repository status
git status

# Add files to staging area
git add filename.txt    # Add specific file
git add .              # Add all files

# Commit changes
git commit -m "Initial commit"

# View commit history
git log
git log --oneline     # Compact view`,
    quiz: {
      question: 'What command initializes a new Git repository?',
      options: [
        'git init',
        'git start',
        'git create',
        'git new'
      ],
      answer: 'git init'
    }
  },
  {
    id: 2,
    title: 'Branching and Merging',
    content: 'Git branches allow you to develop features isolated from each other. Merging combines the work from different branches.',
    code: `# Create and switch to a new branch
git branch feature-branch
git checkout feature-branch
# or in one command:
git checkout -b feature-branch

# List all branches
git branch
git branch -a  # Show remote branches too

# Switch between branches
git checkout main

# Merge a branch
git checkout main
git merge feature-branch

# Delete a branch
git branch -d feature-branch   # Safe delete
git branch -D feature-branch   # Force delete`,
    quiz: {
      question: 'What command creates and switches to a new branch in one step?',
      options: [
        'git checkout -b branch-name',
        'git branch new branch-name',
        'git create branch-name',
        'git switch -new branch-name'
      ],
      answer: 'git checkout -b branch-name'
    }
  },
  {
    id: 3,
    title: 'Remote Repositories',
    content: 'Remote repositories allow collaboration with other developers and serve as a backup for your code.',
    code: `# Add a remote repository
git remote add origin https://github.com/username/repo.git

# View remote repositories
git remote -v

# Push changes to remote
git push origin main

# Pull changes from remote
git pull origin main

# Clone a repository
git clone https://github.com/username/repo.git

# Fetch updates from remote
git fetch origin

# Show remote branches
git branch -r`,
    quiz: {
      question: 'What command is used to download changes from a remote repository?',
      options: [
        'git pull',
        'git fetch',
        'git clone',
        'git download'
      ],
      answer: 'git pull'
    }
  },
  {
    id: 4,
    title: 'Advanced Git Operations',
    content: 'Git provides advanced features for managing commits, tracking changes, and resolving conflicts.',
    code: `# Stash changes
git stash
git stash pop
git stash list

# Interactive rebase
git rebase -i HEAD~3

# Cherry-pick commits
git cherry-pick commit-hash

# Reset commits
git reset --soft HEAD~1  # Preserve changes
git reset --hard HEAD~1  # Discard changes

# View file changes
git diff filename
git diff branch1..branch2

# Resolve merge conflicts
# After seeing conflict markers in files:
git add resolved-file
git commit -m "Resolved merge conflict"`,
    quiz: {
      question: 'What command temporarily saves uncommitted changes?',
      options: [
        'git stash',
        'git save',
        'git store',
        'git temp'
      ],
      answer: 'git stash'
    }
  },
  {
    id: 5,
    title: 'Git Best Practices',
    content: 'Following Git best practices helps maintain a clean and efficient workflow in team environments.',
    code: `# Write good commit messages
git commit -m "feat: add user authentication system

- Add login form
- Implement JWT tokens
- Add password hashing"

# Create and apply tags
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0

# Use .gitignore
echo "node_modules/" >> .gitignore
echo "*.log" >> .gitignore
git add .gitignore

# Git workflow example
git checkout -b feature
git add .
git commit -m "feat: add new feature"
git checkout main
git pull origin main
git merge feature
git push origin main

# Git aliases in config
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.st status`,
    quiz: {
      question: 'What file is used to specify which files Git should ignore?',
      options: [
        '.gitignore',
        '.ignore',
        '.gitconfig',
        '.gitexclude'
      ],
      answer: '.gitignore'
    }
  }
]; 