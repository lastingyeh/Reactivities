### .Net Core with React 

1. .Net Core 3.1.5
2. Sqlite with Entity framework
3. CQRS + Mediator
4. SignalR
5. React with Mobx as state management

### Server EF commands

- migrations database

      $ dotnet ef migrations add [comment] -p [located-proj] -s [started-proj] 

- drop database

      $ dotnet ef database drop -p [located-proj] -s [started-proj]

- dotnet tool update

      $ dotnet tool update --global dotnet-ef

### Client commands

- create project

      $ npx create-react-app client-app --use-npm --typescript

### References

[Complete guide to building an app with .Net Core and React](https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/)
