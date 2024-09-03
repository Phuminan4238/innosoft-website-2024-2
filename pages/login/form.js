"use client";

import { submit } from "../../app/login/action";

export default function Form() {
  return (
    <form action={submit}>
      <div>
        Email <input type="text" name="email" />
      </div>
      <div>
        Password <input type="text" name="password" />
      </div>
      <button>Submit</button>
    </form>
  );
}
