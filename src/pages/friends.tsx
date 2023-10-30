import { useState } from "react";
import { useResource } from "../hooks";
import { MatchData } from "../types";
import FriendsTab from "../components/friends/FriendsTab";
import RequestsTab from "../components/friends/RequestsTab";
import SearchTab from "../components/friends/SearchTab";
import { authenticatedOnly } from "../guard";

function FriendsPage() {
  const [tab, setTab] = useState<"search" | "friends" | "requests">("friends");
  const [state, matchData] = useResource<MatchData>("match");

  return (
    <div className="mx-auto max-w-xl flex flex-col gap-4 py-16">
      <h1 className="text-4xl font-bold text-center">Friends</h1>
      <div className="flex flex-row gap-4 w-full justify-center">
        <button
          className={`${
            tab == "friends"
              ? "bg-primary text-white "
              : "bg-secondaryText text-white hover:bg-primary transition"
          } rounded-xl px-6 py-3`}
          onClick={() => setTab("friends")}
        >
          Friends
        </button>

        <button
          className={`${
            tab == "requests"
              ? "bg-primary text-white "
              : "bg-secondaryText text-white hover:bg-primary transition"
          } rounded-xl px-6 py-3`}
          onClick={() => setTab("requests")}
        >
          Requests
        </button>

        <button
          className={`${
            tab == "search"
              ? "bg-primary text-white"
              : "bg-secondaryText text-white hover:bg-primary transition"
          } rounded-xl px-6 py-3`}
          onClick={() => setTab("search")}
        >
          Search
        </button>
      </div>

      {state == "loading" ? (
        <span>Loading...</span>
      ) : state == "error" ? (
        <span>Something goes wrong</span>
      ) : tab === "friends" ? (
        <FriendsTab
          friends={matchData?.matches.filter((match) => match.mutual) ?? []}
          users={matchData?.users ?? []}
        />
      ) : tab === "requests" ? (
        <RequestsTab
          requests={matchData?.matches.filter((match) => !match.mutual) ?? []}
          users={matchData?.users ?? []}
        />
      ) : (
        <SearchTab />
      )}
    </div>
  );
}

const AuthenticatedFriendsPage = authenticatedOnly(FriendsPage);
export default AuthenticatedFriendsPage;
