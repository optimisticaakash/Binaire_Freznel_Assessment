import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1b2838] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">You are not signed in.</h1>
          <Link
            to="/login"
            className="mt-4 inline-block text-[#66c0f4] hover:text-white"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition min-h-screen bg-[#1b2838] text-white">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <div className="bg-[#16202d] p-8">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2a475e] text-3xl">
              👤
            </div>

            <div>
              <h1 className="text-2xl font-semibold">My Profile</h1>
              <p className="mt-2 text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-700 pt-6">
            <p className="text-sm text-gray-400">Email</p>
            <p className="mt-1">{user.email}</p>

            <p className="mt-5 text-sm text-gray-400">Account ID</p>
            <p className="mt-1 break-all text-sm">{user.uid}</p>
          </div>

          <Link
            to="/"
            className="mt-8 inline-block bg-[#2a475e] px-5 py-2 text-[#66c0f4] hover:bg-[#3a5f7d]"
          >
            Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
