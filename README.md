### Using Nodemon with the VS Code Debugger

Over the years, I've used Nodemon lightly, preferring to just use the VS Code built-in debugger.  During that time, the Code team made it easier to use both.  This project is a simple proof-of-concept as to how you can use the VS Code debugger with Nodemon.

### Setup:
1. Clone this repo
1. `npm install` in the root directory
1. Add content to the `server/.env` file like this:
    ```.env
    PORT=3408

    SESSION_SECRET="a chicken, cow, and pig walked into a bar and just like that--kebabs were invented!"
    ```
1. Start debugging by either pressing `F5` (optionally with the `Fn` key) or by going to the debug menu item on the left and pressing the play button

You can stick breakpoints in anywhere you want and also open the browser to the `localhost:{process.env.PORT}` to see what it does.