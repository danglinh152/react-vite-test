import { useAuth } from "../provider/authProvider";

const Home = () => {
  const { token } = useAuth();

  return token === undefined || token === null ? (
    <div>login di</div>
  ) : (
    <div>home</div>
  );
};

export default Home;
