import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure"

const useFavorite = () => {
 const axiosSecure = useAxiosSecure();
 const { user} = useAuth();
 const { refetch, data: favorite = [] } = useQuery({
    queryKey: ['favorite', user?.email],
    queryFn: async() => {
        const res = await axiosSecure.get(`/favorites?email=${user.email}`);
        return res.data;
    }
 })
 return [favorite, refetch]
}

export default useFavorite
