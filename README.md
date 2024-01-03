# Bartolomeu Spegiorin Gusella Tecnical Test

## Introduction
The instructions about this test is at backend/README.md


## Installing and Settings
With NodeJS installed and running,
Install concurrently package
```
npm i
```

Then install Backend and Frontend dependencies, seed the DB

```
npm run install
```
Under the hoods I'm using concurrently to run cd front && npm i and cd back && npm i && npm run seed
### And It's done !! You can go to next topic :D

You can install the dependencies by project using
```
npm run install-front
or
npm run install-back
```
## Use
You can access the frontend at http://localhost:3000


Or make some cURL request to http://localhost:3001


## Documentation
As requested the backend was made using **Express** and **Sequelize**.

The frontend is made using the bundler **Vite**, the web library **ReactJs**, CSS Library **Bootstrap** and **SWC** an extensible Rust-based platform for the next generation of fast developer tools.

## Tests

### Using the Frontend

You can test most of the cases using the frontend as mention before running npm start and accessing in the browser http://localhost:3000

### Using Rest Client
In the folder backend/test-request there are some .http files for all request in the backend.
The VS Code Extension Rest Client *(https://github.com/Huachao/vscode-restclient) can make request directly from the .http files

## Considerations

### Backend
- The model Jobs wich has the parameter 'paid' was with a wrong ColumnOptions the option **'default'**, to set the default value to a column, should use the option **'defaultValue'** 

- At endpoint **POST /jobs/:job_id/pay** I wrote a asynchronous code that should perform better, but there was a few times that the update queries was reruning in loop until the db crashes, the possible buggy code is commented and the queries are running synchronous

- Please let me know if there are any specific areas you would like me to elaborate on or if you have any questions.
Thank you for the opportunity, and I look forward to your feedback.

### Frontend

- Used functional components wich has a better performance and simplified sintax
- Used ContextAPI to share the "user ID" information. 
- Context API provides an efficient way to share data across multiple components, eliminating the need for prop drilling in deeply nested structures. This promotes better code organization and maintainability. 
- I hadn't implement other ways to keep data like saving in local storage because would bring more complexity to the project, if you prefer I can implement it.
- Used Bootstrap, that offers a vast collection of pre-designed and customizable UI. Accelerating development time and ensures a consistent visual experience across different devices and browsers.