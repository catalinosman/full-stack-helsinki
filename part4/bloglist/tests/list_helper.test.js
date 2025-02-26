const { test, describe } = require("@jest/globals");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("favorite blog", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithManyBlogs = [
    {
      _id: "1",
      title: "First Blog",
      author: "John Doe",
      url: "http://example.com/1",
      likes: 3,
      __v: 0,
    },
    {
      _id: "2",
      title: "Second Blog",
      author: "Jane Doe",
      url: "http://example.com/2",
      likes: 10,
      __v: 0,
    },
    {
      _id: "3",
      title: "Third Blog",
      author: "Edsger W. Dijkstra",
      url: "http://example.com/3",
      likes: 12,
      __v: 0,
    },
  ];

  // ex 4.3: dummy function
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
  });

  // ex 4.5: favoriteBlog function
  test("when list has only one blog, it is the favorite", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  // ex 4.5: favoriteBlog function
  test("when list has multiple blogs, return the most liked", () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs);
    assert.deepStrictEqual(result, {
      title: "Third Blog",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });

  // ex 4.5: favoriteBlog function
  test("when list is empty, return null", () => {
    const result = listHelper.favoriteBlog([]);
    assert.strictEqual(result, null);
  });
});

// ex 4.4: totalLikes function
describe("totalLikes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithManyBlogs = [
    {
      _id: "1",
      title: "First Blog",
      author: "John Doe",
      url: "http://example.com/1",
      likes: 3,
      __v: 0,
    },
    {
      _id: "2",
      title: "Second Blog",
      author: "Jane Doe",
      url: "http://example.com/2",
      likes: 10,
      __v: 0,
    },
    {
      _id: "3",
      title: "Third Blog",
      author: "Edsger W. Dijkstra",
      url: "http://example.com/3",
      likes: 12,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("when list has multiple blogs, returns the total sum of likes", () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    assert.strictEqual(result, 25);
  });

  test("when list is empty, returns zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });
});

const listWithBlogs = [
  {
    _id: "1",
    title: "First Blog",
    author: "John Doe",
    url: "http://example.com/1",
    likes: 3,
    __v: 0,
  },
  {
    _id: "2",
    title: "Second Blog",
    author: "Jane Doe",
    url: "http://example.com/2",
    likes: 10,
    __v: 0,
  },
  {
    _id: "3",
    title: "Third Blog",
    author: "John Doe",
    url: "http://example.com/3",
    likes: 12,
    __v: 0,
  },
  {
    _id: "4",
    title: "Fourth Blog",
    author: "Jane Doe",
    url: "http://example.com/4",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5",
    title: "Fifth Blog",
    author: "John Doe",
    url: "http://example.com/5",
    likes: 5,
    __v: 0,
  },
];

describe("mostBlogs", () => {
  // ex 4.6: mostBlogs function
  test("returns author with the most blogs", () => {
    const result = listHelper.mostBlogs(listWithBlogs);
    assert.deepStrictEqual(result, { author: "John Doe", blogs: 3 });
  });

  // ex 4.6: mostBlogs function
  test("returns null for empty list", () => {
    const result = listHelper.mostBlogs([]);
    assert.strictEqual(result, null);
  });
});

describe("mostLikes", () => {
  // ex 4.7: mostLikes function
  test("returns author with the most likes", () => {
    const result = listHelper.mostLikes(listWithBlogs);
    assert.deepStrictEqual(result, { author: "John Doe", likes: 20 });
  });

  // ex 4.7: mostLikes function
  test("returns null for empty list", () => {
    const result = listHelper.mostLikes([]);
    assert.strictEqual(result, null);
  });
});
