# Folder Structure for Developers

## External API Developers

Code that "does" things (functions, calls, editing etc) lives in controllers.

- Any openAI calls happen in `./src/controllers/openAI`
- Any spotify calls happen in `./src/controllers/spotify`

In those folders, do whatever you want without fear of your code being messed with
