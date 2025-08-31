import React, { useState, useEffect } from "react";
import { getUserFriends } from '../lib/api';

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const data = await getUserFriends();

        if (Array.isArray(data)) {
          setFriends(data);
        } else {
          setFriends([]);
          console.error("Unexpected data format:", data);
        }
      } catch (err) {
        setError("Failed to load friends.");
        console.error("Error fetching friends:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) return <p className="text-white">Loading friends...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-bold mb-4 text-center">Friends</h1>
      {friends.length === 0 ? (
        <p className="text-center semi-bold">No friends yet.</p>
      ) : (
        <ul className="space-y-4">
          {friends.map((friend) => (
            <li
              key={friend._id}
              className="flex items-center space-x-4 bg-gray-800 p-3 rounded-lg"
            >
              <img
                src={friend.profilePic || "/default-avatar.png"}
                alt={friend.fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{friend.fullName}</p>
                <p className="text-sm text-gray-400">
                  Speaks {friend.nativeLanguage}, learning {friend.learningLanguage}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsPage;