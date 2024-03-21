import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <div className="flex items-center justify-between">
      <button
        disabled={pending}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
        type="submit"
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

// PostItem component
const PostItem = ({ post }) => {
  return (
    <div className="bg-emerald-50 border border-gray-200 p-4 my-6 rounded-lg">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};
// PostForm component
const PostForm = ({ addPost }) => {
  const [data, formAction] = useFormState(async (prev, formData) => {
    const formDataObj = Object.fromEntries(formData);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    addPost(formDataObj);
    return prev;
  }, "Helle useFormState");

  return (
    <>
      <form
        action={formAction}
        className="bg-white border border-gray-200 rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="border border-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            id="title"
            type="text"
            placeholder="Enter title"
            name="title"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="body"
          >
            Body
          </label>
          <textarea
            className=" appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            id="body"
            rows="5"
            placeholder="Enter body"
            name="body"
          ></textarea>
        </div>
        <SubmitButton />
      </form>
    </>
  );
};

// Posts component
export default function Posts() {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  return (
    <>
      <PostForm addPost={addPost} />
      {posts.map((post, index) => (
        <PostItem key={index} post={post} />
      ))}
    </>
  );
}
