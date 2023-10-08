# The Legacy Project App

Welcome to The Legacy Project's JumboCode team! This is our repository where we will keep our code and track changes.

## Setup

This section will walk you through the steps to set up your laptop for development. Please reach out to us if you're stucked or confused at any point!

### Terminal

Open the command line interface for your Operating System. On Windows, we recommend using [Windows Linux Subsystem](https://learn.microsoft.com/en-us/windows/wsl/install); on Macs, you can proceed with Terminal.

### Version Control

#### Git

We will use [Git](https://git-scm.com/book/en/v2) for version control. After you have opened the terminal, verify that Git is installed on your machine

```sh
# Terminal
# "which" command locates an executable called "git"
which git
```

If `which git` raises an error, then you will need to install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

#### GitHub

We will use Git to interact with [GitHub](https://github.com), a code hosting platform. We will now set up your terminal to work with GitHub.

1. Create a GitHub [account](https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home) if you do not have one.
2. On terminal, set up your identity.

```sh
# Terminal
git config --global user.name <Your GitHub username>
git config --global user.email  <Your GitHub email>
```

3. Create a SSH key to interact with GitHub, following this [guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent). Once you have created your SSH key, go ahead and add it to your GitHub account, as instructed [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

### Application Dependencies

We will need to install [Node.js](https://nodejs.org/en/about) to run JavaScript for development - you can check whether Node.js is installed by typing `which node` on the terminal.

### Editor

We will use [Visual Studio Code](https://code.visualstudio.com/) to write code. After you have opened Visual Studio Code, we will install some productivity extensions:

1. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - A static analysis tool for JavaScript applications,
2. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - A tool to automatically format code,
3. [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) - Syntax highlighting for Prisma schemas,
4. [Tailwind IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - A tool to improve development with TailWind.

### Acquiring the code

In your terminal, navigate to the folder where you want Git to put your `TheLegacyProject2` folder containing the source code. To pull the code, run the following command:

```sh
# Terminal
git clone git@github.com:JumboCode/TheLegacyProject2.git
```

If the command did not error out, you can now navigate to a folder named `TheLegacyProject2`.

### Environment Variables

We will need credentials to connect with external services, such as MongoDB. It is bad security practice to commit these credentials to the codebase. Create a `.env` directly under the root directory; this file does not already exist, but there is a `.env-example` for you to copy over. Finally, talk to us to get the credentials.

### Running The Application

On terminal, type:

1. `npm install` to install all the necessary packages to run the application,
2. `npm dev` to start development server.

If the commands did not error out, then congrats! You've successfully started the server and are ready to make some changes 😁. You can visit `http://localhost:3000/` to view the website.

## Development

This section outlines some guidelines and expectations for development.

### Making Changes

We prefer small and iterative changes, as they will be easier to review. To start developing a new feature, the general development process is as follow:

1. `git checkout main`
2. `git checkout -b <Your GitHub username>/<feature>`
3. Make your changes
4. Once you're happy with your changes:
   1. Make sure that `npm run build` doesn't error out,
   2. `git add <file 1> <file 2> ... <file n>` to stage all the files you want to commit for version control,
   3. `git commit -m "<A message to describe your changes>"`,
5. Go to the [GitHub repository](https://github.com/JumboCode/TheLegacyProject2) to make a Pull Request (PR). After you've made a PR, request for review from someone else.

## Resources / Additional Information

### Git

Git can be especially confusing if this is your first time using it. We recommend that you read through the first 3 chapters of [Git Book](https://git-scm.com/book/en/v2).

### Next.js

You may have noticed that we have 2 different folders with frontend code: `src/pages/` and `src/app/`. The first folder contain code that was developed by the Jumbo Code group last year, which uses Next.js 12. We will mostly work with `src/app` folder, which uses [Next.js 13](https://nextjs.org/docs). Therefore, when you're searching online for documentations, be sure to look at the correct Next.js version for your use case.
