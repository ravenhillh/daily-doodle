// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addNewPost = async (formData: any) => {
  const response = await fetch("/.netlify/functions/addNewPost", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to upload post");
  }

  return response.json();
};
