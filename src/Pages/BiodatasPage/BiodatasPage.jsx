import {  useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure"


const BiodatasPage = () => {
    const axiosSecure = useAxiosSecure();
    const {data: biodatas = [], refetch} = useQuery({
        queryKey: ["biodats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/biodatas", {
                headers: {
                    authorization : `Bearer ${localStorage.getItem('access-tokem')}`
                }
            });
            return res.data;
        }
    })

  return (
    <div>
      <div>Total: {biodatas.length}</div>
    </div>
  )
}

export default BiodatasPage
