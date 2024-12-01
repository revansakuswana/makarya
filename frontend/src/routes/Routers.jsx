import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import SavedJobs from "../pages/SavedJobs";
import About from "../pages/About";
import Article from "../pages/Article";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ArticleForm from "../components/Article/ArticleForm";
import ArticleItem from "../components/Article/ArticleItem";
import ArticleList from "../components/Article/ArticleList";
import ArticleEdit from "../components/Article/ArticleEdit";
import JobsItem from "../components/Jobs/JobsItem";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import VerifyEmail from "../components/VerifyEmail/VerifyEmail";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id/" element={<JobsItem />} />
      <Route path="/savedjobs" element={<SavedJobs />} />
      <Route path="/articles" element={<Article />} />
      <Route path="/articles/:id/" element={<ArticleItem />} />
      <Route path="/articleslist" element={<ArticleList />} />
      <Route path="/articleslist/:id/" element={<ArticleEdit />} />
      <Route path="/about" element={<About />} />
      <Route path="/users/signin" element={<SignIn />} />
      <Route path="/users/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/api/reset-password/:token" element={<ResetPassword />} />
      <Route path="/api/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/articles/articlesform" element={<ArticleForm />} />
    </Routes>
  );
};

export default Routers;
