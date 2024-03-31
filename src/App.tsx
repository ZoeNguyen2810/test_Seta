import React, { FC } from 'react';
import logo from './logo.svg';
import './App.css';
import { useRoutes } from 'react-router';
import { PostInfo } from './component/PostInfo';
import PostForm from './component/addPost/AddPost';
const App: React.FC = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <PostInfo />

    },
    {
      path: "/add-post",
      element : <PostForm />
    }
  ])
  return routes
}

export default App;
