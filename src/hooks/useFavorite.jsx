import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useFavorite = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: favorite = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["favourites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/favourites");
      return res.data;
    },
  });

  return [favorite, refetch, isLoading];
};

export default useFavorite;