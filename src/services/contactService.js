                                                                                                                                                                            
const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/contact`;

export const submitContactForm = async (formData) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    return await res.json();
  } catch (error) {
    console.error("Contact form error:", error);
    return { error: "Server error. Please try again later." };
  }
};
