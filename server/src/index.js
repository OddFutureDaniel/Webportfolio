const { AppDataSource } = require('./data-source.js');  // CommonJS import
const { User } = require('./entity/User.js');  // CommonJS import for User entity

AppDataSource.initialize().then(async () => {
  console.log("Inserting a new user into the database...");

  // Create new user object (you can dynamically assign properties in JS)
  const user = new User();
  user.firstName = "Timber";
  user.lastName = "Saw";
  user.age = 25;

  // Save user to the database
  await AppDataSource.manager.save(user);
  console.log("Saved a new user with id: " + user.id);

  // Load users from the database
  console.log("Loading users from the database...");
  const users = await AppDataSource.manager.find(User);
  console.log("Loaded users: ", users);

  console.log("Here you can setup and run express / fastify / any other framework.");
}).catch((error) => console.log(error));