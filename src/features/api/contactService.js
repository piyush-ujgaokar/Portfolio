/**
 * Contact Service - Layer 1 API Handler
 * Handles form validation and message dispatching.
 */

export const submitContactMessage = async (formData) => {
  // Simulate network dispatch delay for realistic UI feedback
  await new Promise((resolve) => setTimeout(resolve, 850));

  if (!formData.name || !formData.email || !formData.message) {
    throw new Error("Please complete all required fields.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    throw new Error("Please provide a valid email address.");
  }

  // Ready to link to EmailJS, Formspree, or Piyush's custom backend!
  return {
    success: true,
    message: "Thank you! Your message has been transmitted successfully. Piyush will get back to you shortly.",
    timestamp: new Date().toISOString(),
  };
};
