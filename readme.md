- To run service in Development Mode use following command. 
    "npm run dev"

- To run Integration Testing use following command
    "npm run test"

- src folder contains all service related code files

- env folder contains the critical information such as DB connection String, JWT token    SECRET_KEY and PORT on which server should run.

- package.json contains all npm package dependencies.

- package-lock.json keeps track of all npm packages versions.

- .gitignore contains folders and files names, that no need to push to github
    Usually "node_modules" and ".env" files present in this one.

- Dockerfile file contains docker image of Patient Service.

- docker-compose.yml file contains scripts to run docker image on any platform.
