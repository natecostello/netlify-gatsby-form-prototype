import * as React from "react";
import { Link } from "gatsby";
export default function Home() {
  return (
    <div>
      <p>Hello world!</p>
      <Link to="/form">Form Page</Link>
    </div>
  );
}
