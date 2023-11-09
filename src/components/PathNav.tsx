import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TestPage from "../app/private/[uid]/admin/home/chapter/page";

const PathNav = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/test">Test</Link>
          </li>
          {/* <li>
            <Link to="/"></Link>
          </li> */}
        </ul>
      </nav>
      <Routes>
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
};
export default PathNav;

// const Navigation = () => {
//   return (
//     <Router>
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/contact">Contact</Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Define your routes and corresponding components */}
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//       </Routes>
//     </Router>
//   );
// };
