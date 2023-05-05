import React from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Task } from './Task.jsx';
import { Tasks } from './Tasks.jsx';
import { TaskForm } from './TaskForm.jsx';
import { LoginForm } from './LoginForm.jsx';
import { Meteor } from "meteor/meteor";
import { Accounts} from "meteor/accounts-base";
import {useTracker} from "meteor/react-meteor-data";

export const App = () => {

  const user = useTracker(() => Meteor.user());
  
  return user?(
    <div>
      <h1>Welcome to Meteor!</h1>
      <button onClick={() => Meteor.logout()}>Logout</button>
      <Hello />
      <Info />
      <TaskForm userData={user} />
      <Tasks userId={user._id}/>
    </div>
  ):(
    <LoginForm />
  );
};
