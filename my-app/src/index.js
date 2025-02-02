import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './pages/App';
import reportWebVitals from './reportWebVitals';
import Nav from './components/common/Navbar';
import Navtab from './components/common/Navbar';
import SignUp from './pages/Signup';
import HomePage from './pages/Homepage';
import Blogpage from './components/blog/Blogpage';
import Viewblog from './components/blog/Viewblog';
import EditBlog from './components/blog/Editpage';
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';
import Footer from './components/common/Footer';
import Post from './components/blog/Post';
import AdminDashboard from './admin/AdminDashboard';
import AdminSingleUserBlogs from './admin/AdminSingleUserBlogs';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Navtab/>}>
       <Route index element={<HomePage/>}/>
       <Route path='/signin' element={<SignIn/>}/>
       <Route path='/signup' element={<SignUp/>} />
       <Route path='/blogs' element={<Blogpage/>}/>
       <Route path='/viewblog' element={<Viewblog/>}/>
       <Route path='/editblog/:id' element={<EditBlog/>}/>
       <Route path='/postpage' element={<Post/>}/>
       <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
       <Route path='/admin/viewuserblogs/:id/:name' element={<AdminSingleUserBlogs/>}/>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
      <Footer/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
