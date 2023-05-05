import React from "react";
import { TasksCollection } from "../api/tasks";
import {Meteor} from "meteor/meteor";

export const Task = ({ task }) => {
    const toggleCheckbox = () => {
        Meteor.call("tasks.setIsChecked",task._id,!task.isChecked);
    }
    const deleteTask = () => {
        Meteor.call("tasks.remove",task._id);
    }
    return (
        <li key={task._id}>
            <input type="checkbox" checked={ !!task.isChecked } onChange={toggleCheckbox} />
            { task.text }
            <button onClick={deleteTask}>&nbsp;&times;</button>
        </li>
    );
}