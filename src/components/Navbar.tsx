import { useCallback, useEffect } from "react";
import { authTokenAtom, meAtom, urlAtom } from "../atoms";
import { Link } from "../router";
import { useAtom } from "jotai";

function Navbar() {
  const [, setAuthToken] = useAtom(authTokenAtom);
  const [currentUser, setCurrentUser] = useAtom(meAtom);
  const [url, setUrl] = useAtom(urlAtom);

  const askBackendUrl = useCallback(() => {
    const result = prompt("Backend URL");
    setUrl(result ?? url);
  }, [url, setUrl]);

  useEffect(() => {
    if (url === "") askBackendUrl();
  }, [url, askBackendUrl]);

  return (
    <header className="p-6 flex flex-row justify-end items-center text-secondaryText gap-4 drop-shadow-xl border-b">
      <Link to="/" className="hover:text-primary">
        Home
      </Link>

      {currentUser ? (
        <>
          <Link to="/friends" className="hover:text-primary">
            Friends
          </Link>
          <Link to="/edit" className="hover:text-primary">
            Edit Profile
          </Link>
          <a
            className="hover:text-primary hover:cursor-pointer"
            onClick={() => {
              setAuthToken("");
              setCurrentUser(null);
            }}
          >
            Logout
          </a>
          <div>Hello, {currentUser.name}!</div>
        </>
      ) : (
        <Link to="/auth" className="hover:text-primary">
          Authenticate
        </Link>
      )}

      <div className="h-[20 px] border-l border-secondaryText"></div>

      <a
        className="hover:text-primary hover:cursor-pointer"
        onClick={() => askBackendUrl()}
      >
        Change Backend URL
      </a>
    </header>
  );
}

export default Navbar;
