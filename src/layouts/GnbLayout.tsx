import { Link, NavLink, Outlet } from "react-router";
import { useUserStore } from "../store/useUserStore";

export default function GnbLayout() {
  const currentUser = useUserStore((state) => state.currentUser);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  return (
    <div className="GnbLayout">
      <header className="gnb">
        <Link to="/">MAMF</Link>
        <nav>
          <NavLink to="/report">Report</NavLink>
          <NavLink to="/agent">Agent</NavLink>
        </nav>
        <nav>
          {currentUser ? (
            <>
              <span>{currentUser?.name}</span>
              <a
                tabIndex={0}
                onClick={() => {
                  setCurrentUser(null);
                }}
              >
                로그아웃
              </a>
            </>
          ) : (
            <NavLink to="/login">로그인</NavLink>
          )}
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
