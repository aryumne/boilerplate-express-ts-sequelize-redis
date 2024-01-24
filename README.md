## INSTALLATION REQUIREMENTS

1. install node 18.15^
2. run command "npm install"
3. copy .env.example file to a new file named .env in the same directory path
4. adjust environment in .env file
5. Change the script "db:sync" in package.json file to this:
   from (default in development mode) : "ts-node syncDB.ts",
   to (in production mode) : "ts-node build/syncDB.ts",
6. run command "npm run build" if you want to production mode
7. run command "npm run db:sync" to sychronize database.
8. run redis-server if you have installed on your local machine.
