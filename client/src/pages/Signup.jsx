import Header from "../components/Form/Header";
import Signup from "../components/Signup";
import GoogleButton from "../components/Auth/GoogleButton";

export default function SignupPage() {
  return (
    <div
      data-theme="light"
      className="min-h-full h-screen flex items-center justify-center py-12 px-4
      sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        <Header
          heading="Signup to create an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/"
        />
        <Signup />
        <center>
          <GoogleButton />
        </center>
      </div>
    </div>
  );
}
