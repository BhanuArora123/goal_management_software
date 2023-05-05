import React, { useState } from "react"
import { TasksCollection } from "../api/tasks";
import { Meteor } from "meteor/meteor";

export const TaskForm = ({userData}) => {
    const [text, setText] = useState("");

    const submitHandler = async (event) => {
        try {
            event?.preventDefault();

            if (!text || text === "" || !userData) {
                return;
            }
            console.log(text);

            Meteor.call("tasks.insert",text);

            setText("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="task-form" onSubmit={ submitHandler }>
            <input
                type="text"
                placeholder="Type to add new tasks"
                onChange={ (e) => setText(e.target.value) }
                value={ text }
            />

            <button type="submit">Add Task</button>
        </form>
    )
}