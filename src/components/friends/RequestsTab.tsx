import { Match, User } from "../../types";
import { useAtom } from "jotai";
import { meAtom } from "../../atoms";
import { post } from "../../fetcher";

interface RequestsTabProps {
  requests: Match[];
  users: Exclude<User, "password">[];
}

function RequestsTab({ requests, users }: RequestsTabProps) {
  const [currentUser] = useAtom(meAtom);

  const acceptUser = async (username: string) => {
    await post("match/" + username + "/match");
  };

  return (
    <div className="flex flex-col gap-4">
      {requests.map((req) => {
        const otherUsername =
          req.firstUsername === currentUser?.username
            ? req.secondUsername
            : req.firstUsername;
        const otherUser = users.find((user) => user.username == otherUsername);

        return (
          <div className="rounded-xl p-4 bg-white flex flex-row justify-between items-center">
            <strong className="font-bold text-xl">{otherUser?.name}</strong>
            <button
              className="rounded-lg bg-primary text-white font-bold px-4 py-2"
              onClick={() => acceptUser(otherUsername)}
            >
              Accept
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default RequestsTab;
