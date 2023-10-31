import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <Link to="/">
        <h1>
          Project-Track<span>&gt;</span>
        </h1>
      </Link>
      <Link to="search">Search</Link>
      <Link to="/create">Create Content</Link>
    </header>
  );
}
