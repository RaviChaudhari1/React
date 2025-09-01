import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";



export default function Github({ username }) {
  const user = useLoaderData()
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`https://api.github.com/users/${username}`);
  //       const data = await res.json();
  //       setUser(data);
  //     } catch (err) {
  //       console.error("Error fetching GitHub user:", err);
  //     }
  //   };
  //   fetchData();
  // }, [username]);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md flex flex-col items-center space-y-4">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-24 h-24 rounded-full border-2 border-gray-300"
      />
      <h2 className="text-xl font-semibold">
        {user.name ? user.name : user.login}
      </h2>
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        View GitHub Profile
      </a>
      <div className="flex space-x-6 mt-2">
        <div className="text-center">
          <p className="font-bold">{user.followers}</p>
          <p className="text-gray-500 text-sm">Followers</p>
        </div>
        <div className="text-center">
          <p className="font-bold">{user.following}</p>
          <p className="text-gray-500 text-sm">Following</p>
        </div>
      </div>
    </div>
  );
};


// for "loader" in Routes

export const fetchGithubData = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`)
    return response.json()
}