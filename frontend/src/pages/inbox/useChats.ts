import { useQuery, useMutation, useQueryClient } from "react-query";

import { fetchData } from "../../api/fetchData";
import { Chat } from "../../types";

const getChats = async (): Promise<Chat[]> => {
  return await fetchData("chats");
};

const useChats = () => useQuery({ queryKey: "chats", queryFn: getChats });

const postChat = async (listingId: number) => {
  const token = getCookie("token");
  if (token) {
    await fetch(`${process.env.REACT_APP_API_URL}/start_chat`, {
      body: JSON.stringify({ listing_id: listingId }),
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } else {
    await fetch(`${process.env.REACT_APP_API_URL}/start_chat`, {
      body: JSON.stringify({ listing_id: listingId }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export function usePostChat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postChat,
    onSuccess: () => queryClient.invalidateQueries("chats"),
  });
}

export { useChats };

function getCookie(name: string): string | null {
  // Split document.cookie on semicolons into an array of all the cookies
  const cookieArray = document.cookie.split(";");

  // Iterate through the array elements
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    // Strip leading whitespace from the cookie, necessary for matching names
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    // If this cookie's name matches the requested name, return its value
    if (cookie.indexOf(name + "=") === 0) {
      return cookie.substring(name.length + 1, cookie.length);
    }
  }
  // Return null if the cookie with given name is not found
  return null;
}
