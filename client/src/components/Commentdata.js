const comments = [
  {
    id: 1,
    author: "Alice",
    text: "This is the first comment.",

    replies: [
      {
        id: 2,
        author: "Bob",
        text: "This is a reply to the first comment.",
        replies: [
          {
            id: 3,
            author: "Charlie",
            text: "This is a reply to the first reply.",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    author: "Dave",
    text: "This is the second comment.",
    replies: [],
  },
];
export default comments;
