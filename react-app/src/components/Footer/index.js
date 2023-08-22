import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div id="footer-component-container">
      <ul id="footer-links">
        <li>Developer: Nathan Baldwin</li>
        <li>nathanrobertbaldwin@gmail.com</li>
        <li>
          <a href="https://github.com/nathanrobertbaldwin" target="_blank">
            My GitHub
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/nathan-baldwin-48959714">
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
}
