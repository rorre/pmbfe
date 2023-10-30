import { useEffect, useState } from "react";
import FormRow from "../auth/FormRow";
import { useResource } from "../../hooks";
import { User } from "../../types";
import { post } from "../../fetcher";

function SearchTab() {
  const [query, setQuery] = useState("");
  const [effectiveQuery, setEffectiveQuery] = useState("");
  const [state, searchResults] = useResource<Pick<User, "name" | "username">[]>(
    `users/find/${effectiveQuery}`
  );

  useEffect(() => {
    const getData = setTimeout(() => {
      setEffectiveQuery(query);
    }, 2000);

    return () => clearTimeout(getData);
  }, [query]);

  const matchUser = async (username: string) => {
    await post("match/" + username + "/match");
  };

  return (
    <div className="flex flex-col gap-4">
      <FormRow
        placeholder="Search user"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />

      {effectiveQuery === "" ? (
        <></>
      ) : state == "loading" ? (
        <span>Loading...</span>
      ) : state == "error" ? (
        <span>Something goes wrong</span>
      ) : (
        searchResults?.map((result) => (
          <div className="rounded-xl p-4 bg-white flex flex-row justify-between items-center">
            <strong className="font-bold text-xl">{result.name}</strong>
            <button
              className="rounded-lg bg-primary text-white font-bold px-4 py-2"
              onClick={() => matchUser(result.username)}
            >
              Add
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default SearchTab;
