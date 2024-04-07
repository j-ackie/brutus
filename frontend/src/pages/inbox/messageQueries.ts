type ChatType = {
  chatid: number;
  user1: string;
  user2: string;
  pfp: string;
  have: boolean;
};

type MessageType = {
  id: number;
  name: string;
  message: string;
};

function chatsQuery(): ChatType[] {
  const mockData = [
    {
      chatid: 1,
      user1: "joe",
      user2: "bob",
      pfp: "https://m.media-amazon.com/images/I/71k6sXMGGvL._AC_UF1000,1000_QL80_.jpg",
      have: true,
    },
    {
      chatid: 1,
      user1: "joe",
      user2: "bob",
      pfp: "https://m.media-amazon.com/images/I/71k6sXMGGvL._AC_UF1000,1000_QL80_.jpg",
      have: false,
    },
    {
      chatid: 1,
      user1: "joe",
      user2: "bob",
      pfp: "https://m.media-amazon.com/images/I/71k6sXMGGvL._AC_UF1000,1000_QL80_.jpg",
      have: true,
    },
    {
      chatid: 1,
      user1: "joe",
      user2: "bob",
      pfp: "https://m.media-amazon.com/images/I/71k6sXMGGvL._AC_UF1000,1000_QL80_.jpg",
      have: false,
    },
    {
      chatid: 1,
      user1: "joe",
      user2: "bob",
      pfp: "https://m.media-amazon.com/images/I/71k6sXMGGvL._AC_UF1000,1000_QL80_.jpg",
      have: false,
    },
    {
      chatid: 1,
      user1: "joe",
      user2: "bob",
      pfp: "https://m.media-amazon.com/images/I/71k6sXMGGvL._AC_UF1000,1000_QL80_.jpg",
      have: false,
    },
    {
      chatid: 1,
      user1: "joe",
      user2: "bob",
      pfp: "https://m.media-amazon.com/images/I/71k6sXMGGvL._AC_UF1000,1000_QL80_.jpg",
      have: false,
    },
    {
      chatid: 1,
      user1: "joe",
      user2: "bob",
      pfp: "https://m.media-amazon.com/images/I/71k6sXMGGvL._AC_UF1000,1000_QL80_.jpg",
      have: false,
    },
  ];

  return mockData;
}

function getMessagesFromChatId(id: number): MessageType[] {
  const mockData = [
    {
      id: 1,
      name: "john",
      message: "lkjasdflkjhasdlfkjhasdlkfjhalksdjfhlaksdjfh",
    },
    {
      id: 2,
      name: "joe",
      message: "melm",
    },
    {
      id: 3,
      name: "john",
      message: "qwert",
    },
    {
      id: 4,
      name: "joe",
      message: "i want him to leave me on an egg hunt or something",
    },
    {
      id: 5,
      name: "john",
      message: "it is joever",
    },
  ];

  return mockData;
}

export { chatsQuery, getMessagesFromChatId, ChatType, MessageType };
