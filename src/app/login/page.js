import LoginForm from "../components/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const page = async () => {
  // The 'session' variable is fetched here but not used in this file.
  const session = await getServerSession(authOptions);

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
