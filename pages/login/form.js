"use client";

export default function Form() {
  // Define the submit function inside the same file
  const submit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Add your form submission logic here (e.g., sending data to an API)
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <form onSubmit={submit}>
      <div>
        Email <input type="text" name="email" />
      </div>
      <div>
        Password <input type="text" name="password" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
