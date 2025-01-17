import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
    .then(result => {
        console.log(result.user);
        const userInfo = {
            email: result.user?.email,
            name: result.user?.displayName 
        }
        axiosPublic.post('/users', userInfo)
        .then(res => {
            console.log(res.data);
            navigate('/');
            
        })
    })
  }
  return (
    <div className="mx-auto pb-8">
      <h2 className="text-center py-4">-----------------------OR-----------------------</h2>
      <div>
        <button onClick={handleGoogleSignIn} className="btn flex items-center gap-2 text-center mx-auto">
          <FaGoogle className=""></FaGoogle>
          <span className="">Connect with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
