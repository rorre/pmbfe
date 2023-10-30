import LoginBox from "../components/auth/LoginBox";
import RegisterBox from "../components/auth/RegisterBox";

function AuthPage() {
  return (
    <div className="mx-auto max-w-xl flex flex-col gap-4 py-16">
      <LoginBox />
      <RegisterBox />
    </div>
  );
}

export default AuthPage;
