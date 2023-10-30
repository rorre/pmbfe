import FormRow from "./FormRow";
import { useForm } from "../../hooks";
import { post } from "../../fetcher";

function RegisterBox() {
  const { formData, register } = useForm({
    name: "",
    username: "",
    password: "",
    line: "",
    instagram: "",
    whatsapp: "",
  });

  const onRegisterClick = async () => {
    await post("auth/register", { json: formData });
  };

  return (
    <div className="rounded-xl border-primary border-2 p-4 bg-white flex flex-col gap-4">
      <h2 className="text-xl font-bold">Register</h2>

      <FormRow type="text" placeholder="Name" {...register("name")} />
      <FormRow type="text" placeholder="Username" {...register("username")} />
      <FormRow
        type="password"
        placeholder="Password"
        {...register("password")}
      />
      <FormRow type="text" placeholder="Line" {...register("line")} />
      <FormRow type="text" placeholder="Instagram" {...register("instagram")} />
      <FormRow type="text" placeholder="WhatsApp" {...register("whatsapp")} />

      <button
        className="rounded-xl bg-primary text-white font-bold py-2"
        onClick={onRegisterClick}
      >
        Register
      </button>
    </div>
  );
}

export default RegisterBox;
