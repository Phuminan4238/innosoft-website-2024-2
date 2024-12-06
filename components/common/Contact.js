import React, { useState } from "react";
import Modal from "../common/Modal"; // Adjust the path if necessary

const ContactForm = ({ isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
    service: "",
  });

  // Handles input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that service is one of the allowed values
    const allowedServices = [
      "Consult",
      "Data",
      "Design",
      "Development",
      "rCloud",
      "Training",
    ];
    if (!allowedServices.includes(formData.service)) {
      alert("Invalid service selection. Please choose a valid option.");
      return;
    }

    // Prepare form data to match Strapi model
    const submissionData = {
      data: {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        message: formData.message,
        service: formData.service,
      },
    };

    console.log("Submitting Form Data:", submissionData);

    try {
      const response = await fetch("http://202.44.12.87:1337/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const responseData = await response.json();

      console.log("Response Status:", response.status);
      console.log("Response Data:", responseData);

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          message: "",
          service: "",
        });
        setIsOpen(false);
      } else {
        alert(
          `Error ${response.status}: ${
            responseData.error.message || "Unknown error"
          }`
        );
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="service" className="block text-sm font-medium mb-2">
              Service
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            >
              <option value="">Select a service</option>
              <option value="rCloud">rCloud</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
              <option value="Training">Training</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label
                htmlFor="firstname"
                className="block text-sm font-medium mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white rounded-lg py-2 px-4"
          >
            Send Message
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ContactForm;
