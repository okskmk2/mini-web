import type React from "react";
import { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [userName, setUserName] = useState<string>("");
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentUser({
      id: crypto.randomUUID(),
      name: userName,
    });
    navigate("/");
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.currentTarget.value);
          }}
        />
        <button type="submit">로그인</button>
      </form>
    </main>
  );
}
