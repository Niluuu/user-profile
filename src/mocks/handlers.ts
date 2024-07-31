import { http, HttpResponse } from "msw";

const user = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  bio: "Software developer",
  profilePicture: "https://example.com/profile.jpg",
};

export const handlers = [
  http.get("/user", () => {
    return HttpResponse.json(user);
  }),

  http.put("/user", async ({ request }) => {
    const updates = await request.json();
    Object.assign(user, updates);
    return HttpResponse.json(user);
  }),
];