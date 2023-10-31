import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  useLocation,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Layout from "./Components/Layout";
import "./App.css";
import Home from "./pages/Home";
import Content from "./pages/Content";
import CreateContent from "./pages/CreateContent";
import EditContent from "./pages/EditContent";
import Search from "./pages/Search";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":id" element={<Content />} />
        <Route path="/create" element={<CreateContent />} />
        <Route path="/edit/:id" element={<EditContent />} />
        <Route path="search" element={<Search />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  );
}

export default App;
