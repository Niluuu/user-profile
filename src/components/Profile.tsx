import { User } from "./UserProfile";

interface ProfileDisplayProps {
  user: User;
  onEdit: () => void;
}

const Profile = ({ user, onEdit }: ProfileDisplayProps) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <img
        src={user?.profilePicture ? user?.profilePicture : "/profile.png"}
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h2 className="text-2xl font-bold text-center mb-2">{user.name}</h2>
      <p className="text-gray-600 text-center mb-2">{user.email}</p>
      <p className="text-gray-700 text-center mb-4">{user.bio}</p>
      <button
        onClick={onEdit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Edit
      </button>
    </div>
  </div>
);



export default Profile
