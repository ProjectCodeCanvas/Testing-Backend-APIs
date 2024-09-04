import mongoose from 'mongoose';
import { UserModel } from '../Models/UserModel.js';
import SnippetModel from '../Models/SnippetModel.js'; // Ensure the path is correct
import axios from 'axios';

const baseURL = "http://localhost:4000/api"

const createUsers = async () => {
  const users = [
    { Name: 'Alice', Email: 'alice578@example.com', Password: 'Password1!', isPrimeUser: true },
    { Name: 'Bob', Email: 'bob587@example.com', Password: 'Password2!' },
    { Name: 'Charlie', Email: 'charli587e@example.com', Password: 'Password3!', isPrimeUser: true },
    { Name: 'Dave', Email: 'dave587@example.com', Password: 'Password4!' },
    { Name: 'Eve', Email: 'eve587@example.com', Password: 'Password5!', isPrimeUser: true },
  ];

  // Insert users into the database
  let createdUsers = await UserModel.insertMany(users);
  return createdUsers;
};

const createSampleSnippets = async () => {
  const users = await createUsers(); 
  const snippets = [
    {
      title: 'Responsive Navbar',
      description: 'A responsive navbar using HTML and CSS.',
      language: 'html',
      category: 'navbar',
      contributedBy: users[0]._id, // Using actual user ID
      views: 120,
      likes: [users[1]._id], // Using actual user IDs
      publicity: 'public',
    },
    {
      title: 'Simple Button',
      description: 'A simple button using CSS.',
      language: 'css',
      category: 'button',
      contributedBy: users[1]._id,
      views: 900,
      likes: [],
      publicity: 'public',
    },
    {
      title: 'React Menubar',
      description: 'A dynamic menubar component in React.',
      language: 'react',
      category: 'menubar',
      contributedBy: users[2]._id,
      views: 300,
      likes: [users[0]._id],
      publicity: 'public',
    },
    {
      title: 'Node Sidebar',
      description: 'A collapsible sidebar built with Node.js.',
      language: 'node',
      category: 'sidebar',
      contributedBy: users[3]._id,
      views: 50,
      likes: [],
      publicity: 'private',
    },
    {
      title: 'CSS Card Design',
      description: 'A card component designed with CSS.',
      language: 'css',
      category: 'card',
      contributedBy: users[4]._id,
      views: 200,
      likes: [users[1]._id, users[2]._id],
      publicity: 'public',
    },
    {
      title: 'Advanced React Button',
      description: 'A customizable button component in React.',
      language: 'react',
      category: 'button',
      contributedBy: users[0]._id,
      views: 150,
      likes: [users[3]._id],
      publicity: 'public',
    },
    {
      title: 'Node Navbar',
      description: 'A server-side rendered navbar with Node.js.',
      language: 'node',
      category: 'navbar',
      contributedBy: users[1]._id,
      views: 10,
      likes: [],
      publicity: 'private',
    },
    {
      title: 'HTML Menubar Example',
      description: 'An HTML example of a menubar.',
      language: 'html',
      category: 'menubar',
      contributedBy: users[2]._id,
      views: 60,
      likes: [],
      publicity: 'public',
    },
    {
      title: 'CSS Sidebar',
      description: 'A simple sidebar styled with CSS.',
      language: 'css',
      category: 'sidebar',
      contributedBy: users[3]._id,
      views: 500,
      likes: [users[0]._id, users[1]._id, users[2]._id],
      publicity: 'public',
    },
    {
      title: 'React Navbar Component',
      description: 'A reusable navbar component built in React.',
      language: 'react',
      category: 'navbar',
      contributedBy: users[4]._id,
      views: 0,
      likes: [],
      publicity: 'public',
    },
    {
      title: 'HTML Button Styles',
      description: 'Various button styles using HTML and CSS.',
      language: 'html',
      category: 'button',
      contributedBy: users[0]._id,
      views: 700,
      likes: [users[3]._id],
      publicity: 'public',
    },
    {
      title: 'Node Card',
      description: 'A card component with server-side logic in Node.js.',
      language: 'node',
      category: 'card',
      contributedBy: users[1]._id,
      views: 120,
      likes: [],
      publicity: 'private',
    },
    {
      title: 'React Sidebar Navigation',
      description: 'A sidebar navigation component in React.',
      language: 'react',
      category: 'sidebar',
      contributedBy: users[2]._id,
      views: 320,
      likes: [users[0]._id, users[1]._id],
      publicity: 'public',
    },
    {
      title: 'HTML Card Layout',
      description: 'A card layout using HTML and CSS for design.',
      language: 'html',
      category: 'card',
      contributedBy: users[3]._id,
      views: 400,
      likes: [],
      publicity: 'public',
    },
    {
      title: 'CSS Menubar',
      description: 'A menubar styled with CSS.',
      language: 'css',
      category: 'menubar',
      contributedBy: users[4]._id,
      views: 1000,
      likes: [users[0]._id, users[1]._id, users[2]._id, users[3]._id],
      publicity: 'public',
    },
  ];

  // Insert snippets into the database
  await SnippetModel.insertMany(snippets);
};

export default createSampleSnippets;
