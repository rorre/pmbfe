import { useAtom } from "jotai";
import { meAtom } from "./atoms";
import { useEffect } from "react";
import { useNavigate } from "./router";

export function authenticatedOnly<P extends object>(
  Component: React.ComponentType<P>
) {
  return (props: P) => {
    const [currentUser] = useAtom(meAtom);
    const navigate = useNavigate();

    useEffect(() => {
      if (currentUser == null) navigate("/");
    }, [currentUser, navigate]);

    return <Component {...props} />;
  };
}
