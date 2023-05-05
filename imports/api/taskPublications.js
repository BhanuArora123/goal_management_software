import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./tasks";

Meteor.publish("tasks",function () {
    return TasksCollection.find({"user._id":this.userId});
})