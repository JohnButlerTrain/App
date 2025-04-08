# Basics
- Below are some highlights from the basics we covered in setting up your Vite React App

# Terminal
## Terminal
- Terminal is the command line interface for interacting with your computer
- In the terminal
## GitBash
- You use GitBash to interact with your terminal
  - We use this terminal because you are on windows, if you are interested in learning more google `difference between mad and windows terminals`
  - What is Bash? google `bourne again shell` 
## simple commands
- a terminal command is a program that you run, probably with some custom inputs
  - `cd documents` runs the "change directory" program with the input "documents" and navigates your terminal into that directory if available
- `cd` change directory
- `ls` list current directory contents
- `cd ..` go back one directory
- `cd ../..` go back two directories, etc.,
- `cd ~/documents/code/app` change directory to an explicit path
- `mkdir new-directory` run the "make directory" program with the input "new-directory"
  - same as right click, new folder named "new-directory"

# Your Computer
## your directories
- `~` represents your "root" or home directory
- `~/documents/code` - this is the directory on your computer where initialized the `app` project
- `~/documents/code/app` - this is the directory for your project

## Node and Node Package Manager (NPM)
- To get started, we installed Node for windows online and added it to your terminal `$PATH` with an `export` command
  - This is how we updated your terminal to tell it to look for additional possible programs to run in the new place where we installed node
- new programs
  - `node` ex: `node --version`
  - `npm`
- Running your app
  - `npm run dev` from within your correct directory, like `~/documents/code/app`
- `git` - more below
  - `git status`
  - `git log`
  - `git add *` add all changes from within current and nested directories
    - in the terminal `*` is a wild card, it matches anything as an input
  - `git commit -m "commit message"` - commit your changes
- `npm` Node Package Manager, used to add dependencies
  - `npm install @mui/material` - example for adding the material ui package
  - installing updates your `package.json` and `package-lock.json` files and then puts all the code for the package into `node_modules`
  - When you commit and push your changes in the future, by default your `.gitignore` file ignores `node_modules` so whoever clones your changes onto their computer has to run `npm install` to install all the correct dependencies to run your app locally

### Git
- git is a version control program
- github is a company that provides cloud access to save and share your git repositories for collaboration and cloud saves
- `git init` initializes a git repository in a directory, but default ANYTHING in that directory is visible to your git repo, unless it is excluded via `.gitignore`
- For your general purposes, you can use the Visual Studio Code git side panel for basic staging and committing changes, just remember it's just a visual interface for terminal commands
- Important ~ Once you've committed changes, consider them PERMANENTLY in your commit history. There is not really a concept of "undoing" a previous commit.
  - But I committed a change with mistakes in it? You fix those changes and commit the fix!
  - But I committed a password .... Uh oh. If you pushed these changes to Github, change your password or disable those accounts etc., ...
  - But I really want to fully delete something I accidentally committed
    - Consider your git commits a chain. Every new commit is a link. If you want to "delete" a link, you can, by fully resetting the "head" of your chain of commits to one commit before that head, and hard-resetting to that point. This will permanently delete all commit history after your current commit. Then you have to go in and apply and changes since then
      - This isn't too bad for small local projects, or a single mistake commit you want to drop
      - This is not really an option for a large collaborative project where you want to drop a commit way back in the chain.

### Github
- Github is where you can "push" your git repository and changes too for cloud saving and for collaboration.
- I am a collaborator on your project, we can both go to Github to see the current state, explore history, etc.,
- If you make local changes to your project and commit them, and push that commit, then we can both see them on github and I can pull the changes down to my machine to run them too.

### Vite / React
- React is a toolkit for web developers to build websites with javascript.
- Vite is the "build tool" which takes the React code and turns it into something the browser can read
- Node is the server which runs your React app and let's you access it

### local development
- So you forgot everything we covered
- open up Git Bash and navigate to your app directory
- run `npm run dev`
- open the local host link to see your app
- make changes in Visual Studio Code, see the changes in your browser
- `I have a Vite React app with @mui/material ui elements, help me implement a component to display information from this form...`


## Basic React Patterns
- Components are boxes of useful logic, visual elements, and or OTHER nested components that compose your React App.
- This is code that will later get transformed by Vite into something your browser can read (your browser does not read your App.jsx and similar files directly)

## Trouble Shooting
- You will see troubleshooting information in your terminal or in your browser console (right click, inspect, click the console tab, and look for red alerts)
- You can also add `console.log(...)` statements in your component's "code" section (not the return section) to print messages to your browser console