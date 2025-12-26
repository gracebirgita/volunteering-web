import { Link } from '@inertiajs/react';

export default function Landing() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">VolunteerHub</span>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" href="/login">Sign In</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/register">Register</Link>
            </li>
          </ul>
        </div>
      </nav>

      <h1>This is landing page (guest & no login yet)</h1>
    </>
  );
}