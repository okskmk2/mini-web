import { Link, NavLink, Outlet } from "react-router";

export default function GnbLayout() {
  return (
    <div className="GnbLayout">
      <header className="gnb">
        <Link to="/">MAMF</Link>
        <nav>
          <NavLink to="/report">Report</NavLink>
          <NavLink to="/agent">Agent</NavLink>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
