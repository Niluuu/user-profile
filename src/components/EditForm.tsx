import { useState, ChangeEvent, FormEvent } from "react";
import { User } from "./UserProfile";

interface EditProfileFormProps {
  user: User;
  onSave: (data: Partial<User>) => void;
  onCancel: () => void;
}

const EditProfileForm = ({ user, onSave, onCancel }: EditProfileFormProps) => {
  const [formData, setFormData] = useState(user);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-md w-full"
      >
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 h-32"
            placeholder="Bio"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
