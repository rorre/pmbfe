import { useForm } from "../../hooks";
import FormRow from "./FormRow";
import { get, post } from "../../fetcher";
import { useNavigate } from "../../router";
import { useAtom } from "jotai";
import { authTokenAtom, meAtom } from "../../atoms";
import { User } from "../../types";

function LoginBox() {
  const navigate = useNavigate();
  const { formData, register } = useForm({
    username: "",
    password: "",
  });
  const [, setAuthToken] = useAtom(authTokenAtom);
  const [, setCurrentUser] = useAtom(meAtom);

  const onLoginClicked = async () => {
    const response = await post<string>("auth/login", { json: formData });
    setAuthToken(response.data);
    const userResponse = await get<User>("users/me");
    setCurrentUser(userResponse.data);
    navigate("/");
  };

  return (
    <div className="rounded-xl border-primary border-2 p-4 bg-white flex flex-col gap-4">
      <h2 className="text-xl font-bold">Login</h2>

      <FormRow type="text" placeholder="Username" {...register("username")} />
      <FormRow
        type="password"
        placeholder="Password"
        {...register("password")}
      />

      <button
        className="rounded-xl bg-primary text-white font-bold py-2"
        onClick={onLoginClicked}
      >
        Log in
      </button>
    </div>
  );
}

export default LoginBox;
