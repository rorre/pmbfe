import EditBox from "../components/profile/EditBox";
import { authenticatedOnly } from "../guard";

function EditPage() {
  return (
    <div className="mx-auto max-w-xl flex flex-col gap-4 py-16">
      <EditBox />
    </div>
  );
}

const AuthenticatedEditPage = authenticatedOnly(EditPage);
export default AuthenticatedEditPage;
