import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '../imports/api/links';
import { TasksCollection } from '../imports/api/tasks';
import {Accounts} from "meteor/accounts-base";
import "../imports/api/taskMethods";
import "../imports/api/taskPublications";

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if (await LinksCollection.find().countAsync() === 0) {
    await insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app',
    });

    await insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    await insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    await insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }

  const user = Accounts.findUserByUsername("bhanu12345");

  if((await TasksCollection.find().countAsync()) === 0){
    [
      "Task 1",
      "Task 2",
      "Task 3",
      "Task 4"
    ]
    .forEach(async task => {
      await TasksCollection.insertAsync({
        text:task,
        user
      });
    });
  }

  // seed dummy user 
  const userName = "bhanu12345";
  const password = "password";
  if(!Accounts.findUserByUsername(userName)){
    Accounts.createUser({
      username:userName,
      password:password
    });
  }

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("links", function () {
    return LinksCollection.find();
  });

  // TasksCollection.allow({
  //   insert:(userId, doc) => {
  //     return true;
  //   },
  //   update:(userId, doc, fieldNames, modifier) => {
  //     return true;
  //   },
  //   remove:(userId, doc) => {
  //     return true;
  //   }
  // })
});
