import { TasksCollection } from "../api/tasks";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import React from "react";
import { Task } from "./Task";
import {Meteor} from "meteor/meteor";

export const Tasks = ({userId}) => {
    // const isLoading = useSubscribe("tasks");
    // const tasks = useFind(() => TasksCollection.find({"user._id":userId}));

    const {tasks, isLoading} = useTracker(() => {
        const handler = Meteor.subscribe("tasks");
        if(Meteor.user() && handler.ready()){
            const tasksData = TasksCollection.find().fetch();
            return {tasks:tasksData};
        }
        return {tasks: [], isLoading: !handler.ready()};
    })
    if(isLoading){
        return <p>Loading Tasks...</p>;
    }
    return (
        <ul>
            {
                tasks.map(task => <Task task={ task }></Task>)
            }
        </ul>
    )
}