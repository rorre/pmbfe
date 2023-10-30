import { useAtom } from "jotai";
import { post } from "../../fetcher";
import { useForm } from "../../hooks";
import FormRow from "../auth/FormRow";
import { meAtom } from "../../atoms";

function EditBox() {
  const [currentUser, setCurrentUser] = useAtom(meAtom);
  const { formData, register } = useForm({
    name: currentUser?.name ?? "",
    username: currentUser?.username ?? "",
    line: currentUser?.line ?? "",
    instagram: currentUser?.instagram ?? "",
    whatsapp: currentUser?.whatsapp ?? "",
  });

  const onRegisterClick = async () => {
    await post("users/update", { json: formData });
    setCurrentUser({
      ...currentUser,
      ...formData,
    });
  };

  return (
    <div className="rounded-xl p-4 bg-white flex flex-col gap-4">
      <h2 className="text-xl font-bold">Update</h2>

      <FormRow type="text" placeholder="Name" {...register("name")} />
      <FormRow type="text" placeholder="Line" {...register("line")} />
      <FormRow type="text" placeholder="Instagram" {...register("instagram")} />
      <FormRow type="text" placeholder="WhatsApp" {...register("whatsapp")} />

      <button
        className="rounded-xl bg-primary text-white font-bold py-2"
        onClick={onRegisterClick}
      >
        Update
      </button>
    </div>
  );
}

export default EditBox;
