import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
function Navbar() {
  return (
    <>
      <nav>
        <h1>
          {" "}
          <Link to="/">Quiz App</Link>
        </h1>
        <Link to="/create-quiz" className={styles.nav}>
          {" "}
          Create Quiz
        </Link>
      </nav>
    </>
  );
}

export default Navbar;
