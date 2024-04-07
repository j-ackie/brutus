import { useQuery } from "react-query";
import fetchData from "../../api/fetchData";
import { Listing } from "../../types";

const getFeed = async () => {
  return await fetchData("listings");
};

const useFeed = () => useQuery<Listing[]>("feed", getFeed);

export default useFeed;
