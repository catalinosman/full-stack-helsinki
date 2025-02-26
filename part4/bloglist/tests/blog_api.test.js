jest.setTimeout(20000);
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {
  describe,
  test,
  expect,
  afterAll,
  beforeEach,
} = require("@jest/globals");

const api = supertest(app);

const initialBlogs = [
  {
    title: "First Blog",
    author: "Example Test",
    url: "http://example.com/first",
    likes: 2,
  },
  {
    title: "Second Blog",
    author: "Test Example",
    url: "http://example.com/second",
    likes: 25,
  },
];

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  await Blog.insertMany(initialBlogs);

  const passwordHash = await bcrypt.hash("password123", 10);
  const user = new User({
    username: "root",
    name: "Superuser",
    passwordHash,
  });
  await user.save();

  // Log in the user and retrieve the token
  const loginResponse = await api
    .post("/api/login")
    .send({ username: "root", password: "password123" });

  token = loginResponse.body.token; // Save the token for use in tests
});

// Exercise 4.9: Test that blog objects have `id` instead of `_id`
describe("Blog API", () => {
  test("blogs have an id property (not _id)", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(response.body.length).toBeGreaterThan(0);

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
      expect(blog._id).toBeUndefined();
    });
  });
  // Exercise 4.10 - POST testing (with async/await)
  test("a new blog can be added", async () => {
    const newBlog = {
      title: "New Blog",
      author: "Test Add",
      name: "BlogName",
      url: "http://example.com/new",
      likes: 72,
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`) // Include the token
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain(newBlog.title);
  });
  // Exercise 4.11: Test for default likes value
  test("likes defaults to 0 if missing", async () => {
    const newBlog = {
      title: "Blog Without Likes",
      author: "Test Likes",
      name: "Test Name",
      url: "http://example.com/without-likes",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`) // Add token here
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  // Exercise 4.12: Test for missing title or url
  test("blog creation fails with status 400 if title is missing", async () => {
    const newBlog = {
      author: "Test Author",
      url: "http://example.com/without-title",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    expect(response.body.error).toBe("Title and URL are required");
  });

  test("blog creation fails with status 400 if url is missing", async () => {
    const newBlog = {
      title: "Blog Without URL",
      author: "Testing Tester",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    expect(response.body.error).toBe("Title and URL are required");
  });

  // Exercise 4.13 Delete Test
  test("a blog can be deleted", async () => {
    const newBlog = {
      title: "Blog to Delete",
      author: "Test Delete",
      url: "http://example.com/to-delete",
      likes: 5,
    };

    const createdBlog = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`) // Add token here
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtStart = await Blog.find({});
    expect(blogsAtStart).toHaveLength(initialBlogs.length + 1);

    await api
      .delete(`/api/blogs/${createdBlog.body.id}`)
      .set("Authorization", `Bearer ${token}`) // Add token here
      .expect(204);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });

  test("deleting a blog returns 404 if blog not found", async () => {
    const nonExistingId = new mongoose.Types.ObjectId();
    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
  });

  test("deleting a blog returns 400 if id is invalid", async () => {
    const invalidId = "12345";
    await api
      .delete(`/api/blogs/${invalidId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });

  // Exercise 4.14 - Updating Test
  test("successfully updates a blog's properties", async () => {
    const blogToUpdate = await Blog.findOne({}); // get an existing blog for updating
    const updatedData = {
      title: "Updated Title",
      url: "http://updated-url.com",
      author: "Updated Author",
    };

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedData)
      .expect(200);

    expect(response.body.title).toBe(updatedData.title);
    expect(response.body.url).toBe(updatedData.url);
    expect(response.body.author).toBe(updatedData.author);
  });

  // Ex 4.16
  describe("creating new users", () => {
    test("fails with proper status code and message if username is taken", async () => {
      const newUser = {
        username: "root",
        name: "Superuser",
        password: "secret",
      };

      console.log(newUser);

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("Username must be unique");
    });

    test("fails if username is too short", async () => {
      const newUser = {
        username: "ro",
        name: "ShortUsername",
        password: "validpassword",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain(
        "Username and password must be at least 3 characters long"
      );
    });

    test("fails if password is too short", async () => {
      const newUser = {
        username: "validusername",
        name: "ShortPassword",
        password: "pw",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain(
        "Username and password must be at least 3 characters long"
      );
    });

    test("fails if username or password is missing", async () => {
      const newUser = {
        name: "MissingUsername",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("Username and password are required");
    });
  });
});

// Ex 4.23
test("adding a blog fails with status 401 if token is missing", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://example.com",
  };

  const response = await api.post("/api/blogs").send(newBlog).expect(401);
  expect(response.body.error).toBe("Token missing or invalid");
});

afterAll(async () => {
  await mongoose.disconnect();
});
