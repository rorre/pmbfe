import { Match, User } from "../../types";
import { useAtom } from "jotai";
import { meAtom } from "../../atoms";

interface FriendsTabProps {
  friends: Match[];
  users: Exclude<User, "password">[];
}

function FriendsTab({ friends, users }: FriendsTabProps) {
  const [currentUser] = useAtom(meAtom);

  return (
    <div className="flex flex-col gap-4">
      {friends.map((friend) => {
        const otherUsername =
          friend.firstUsername === currentUser?.username
            ? friend.secondUsername
            : friend.firstUsername;
        const otherUser = users.find((user) => user.username == otherUsername);

        return (
          <div className="rounded-xl p-4 bg-white flex flex-col gap-2">
            <strong className="font-bold text-xl">{otherUser?.name}</strong>
            <p>
              LINE: {otherUser?.line} | Instagram: {otherUser?.instagram} |
              WhatsApp: {otherUser?.whatsapp}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default FriendsTab;
