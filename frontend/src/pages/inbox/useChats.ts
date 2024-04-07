import { useQuery } from "react-query";
import fetchData from "../../api/fetchData";
import { Chat } from "../../types";

const getChats = async () => {
  return await fetchData("chats");
};

const useChats = () => useQuery<Chat[]>("chats", getChats);

export default useChats;
