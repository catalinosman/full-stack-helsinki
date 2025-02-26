// ex 4.3
const dummy = (blogs) => {
  return 1;
};

// ex 4.4
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

// ex 4.5
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const favorite = blogs.reduce(
    (fav, blog) => (blog.likes > fav.likes ? blog : fav),
    blogs[0]
  );

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

// ex 4.6
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null; // If there are no blogs, return null
  }

  // Create a dictionary to count blogs per author
  const authorBlogCount = blogs.reduce((count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + 1; // Increment the blog count for the author
    return count;
  }, {});

  // Find the author with the maximum number of blogs
  let maxBlogsAuthor = { author: "", blogs: 0 };
  for (const author in authorBlogCount) {
    if (authorBlogCount[author] > maxBlogsAuthor.blogs) {
      maxBlogsAuthor = { author: author, blogs: authorBlogCount[author] };
    }
  }

  return maxBlogsAuthor;
};

// ex 4.7
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null; // If there are no blogs, return null
  }

  // Create a dictionary to count the total likes per author
  const authorLikesCount = blogs.reduce((count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + blog.likes; // Increment the total likes for the author
    return count;
  }, {});

  // Find the author with the maximum number of likes
  let maxLikesAuthor = { author: "", likes: 0 };
  for (const author in authorLikesCount) {
    if (authorLikesCount[author] > maxLikesAuthor.likes) {
      maxLikesAuthor = { author: author, likes: authorLikesCount[author] };
    }
  }

  return maxLikesAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
