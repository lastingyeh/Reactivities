### .Net Core with React 

SERVER

1. .Net Core 3.1.5
2. Sqlite with Entity framework
3. CQRS + Mediator
4. SignalR
5. React with Mobx as state management
6. Semantic-ui-react

### Server EF commands

- migrations database

      $ dotnet ef migrations add [comment] -p [located-proj] -s [started-proj] 

- drop database

      $ dotnet ef database drop -p [located-proj] -s [started-proj]

- dotnet tool update

      $ dotnet tool update --global dotnet-ef

- path

  * mac: 

      ~/.microsoft/usersecrets/<guid>/secrets.json

  * win:          
      
      %APPDATA%\Microsoft\UserSecrets\<guid>\secrets.json

### user-secrets

- init

      $ dotnet user-secrets init -p API/

- set

      $ dotnet user-secrets set "TokenKey" "your-own-secretkey" -p API/

- list 

      $ dotnet user-secrets list -p API/

### Client commands

- create project

      $ npx create-react-app client-app --use-npm --typescript

### Git Branch notes

- create git branch dev

      $ git branch dev

- list local branch (the same env)

      $ git branch

- list all branch (include remote)

      $ git ls-remote origin

- fetch remote branch codes

      $ git fetch origin dev

- checkout to master

      $ git checkout master

- merge to master

      $ git merge origin/dev



### References

[Complete guide to building an app with .Net Core and React](https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/)
