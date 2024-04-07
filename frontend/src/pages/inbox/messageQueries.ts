type Chat = {
  chatid: number
  user1: string,
  user2: string,
  pfp: string,
  have: boolean
}


function chatsQuery() : Chat[] {
  const mockData = [
    {
      chatid: 1,
      user1: "joe",
      user2: "bob",
      pfp: 'https://m.media-amazon.com/images/I/71k6sXMGGvL._AC_UF1000,1000_QL80_.jpg',
      have: true
    },
    {
      chatid: 1,
      user1: "joe",
      user2: "bob",
      pfp: 'https://m.media-amazon.com/images/I/71k6sXMGGvL._AC_UF1000,1000_QL80_.jpg',
      have: false
    },
    {
      chatid: 1,
      user1: "joe",
      user2: "bob",
      pfp: 'https://m.media-amazon.com/images/I/71k6sXMGGvL._AC_UF1000,1000_QL80_.jpg',
      have: true
    },
    {
      chatid: 1,
      user1: "joe",
      user2: "bob",
      pfp: 'https://m.media-amazon.com/images/I/71k6sXMGGvL._AC_UF1000,1000_QL80_.jpg',
      have: false
    },
    {
      chatid: 1,
      user1: "joe",
      user2: "bob",
      pfp: 'https://m.media-amazon.com/images/I/71k6sXMGGvL._AC_UF1000,1000_QL80_.jpg',
      have: false
    },
    {
      chatid: 1,
      user1: "joe",
      user2: "bob",
      pfp: 'https://m.media-amazon.com/images/I/71k6sXMGGvL._AC_UF1000,1000_QL80_.jpg',
      have: false
    },
    {
      chatid: 1,
      user1: "joe",
      user2: "bob",
      pfp: 'https://m.media-amazon.com/images/I/71k6sXMGGvL._AC_UF1000,1000_QL80_.jpg',
      have: false
    },
    {
      chatid: 1,
      user1: "joe",
      user2: "bob",
      pfp: 'https://m.media-amazon.com/images/I/71k6sXMGGvL._AC_UF1000,1000_QL80_.jpg',
      have: false
    },
  ]

  return mockData
}

export { chatsQuery, Chat }