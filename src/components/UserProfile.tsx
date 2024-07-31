import React, { useState } from "react";
import {
  useQuery,
  useMutation,
} from "react-query";
import axios from "axios";
import EditProfileForm from "./EditForm";
import Profile from "./Profile";

export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  profilePicture: string;
}

const fetchUser = async (): Promise<User> => {
  const response = await axios.get("/user");
  return response.data;
};

const updateUser = async (userData: Partial<User>): Promise<User> => {
  const response = await axios.put("/user", userData);
  return response.data;
};

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: user, isLoading, isError } = useQuery<User>("user", fetchUser);

  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      setIsEditing(false);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching user data</div>;
  if (!user) return null;

  return (
    <div>
      {isEditing ? (
        <EditProfileForm
          user={user}
          onSave={mutation.mutate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <Profile user={user} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
};

export default UserProfile;