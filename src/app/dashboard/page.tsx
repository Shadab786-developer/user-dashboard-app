"use client";
import { useEffect, useState } from "react";
import { Post } from "@/index.ts";

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [filteredData, setFilteredData] = useState<Post[]>([]);

  useEffect(() => {
    getData()
      .then((data) => {
        setPosts(data);
        setFilteredData(data);
      })
      .catch((err) => setError("Failed to load data"));
  }, []);

  useEffect(() => {
    const results = posts.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toString().includes(searchTerm)
    );
    setFilteredData(results);
  }, [searchTerm, posts]);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or ID"
          className="w-full p-2 border rounded text-2xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-black">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-[20px]">ID</th>
              <th className="px-6 py-3 text-left text-[20px]">Title</th>
              <th className="px-6 py-3 text-left text-[20px]">Body</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 text-[20px]">{item.id}</td>
                <td className="px-6 py-4 text-[20px]">{item.title}</td>
                <td className="px-6 py-4 text-[20px]">{item.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
