import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TestPage from "../app/private/[uid]/admin/home/page";

const PathNav = () => {
  return (
    <>
      <div className="font-merriweather mt-7 flex flex-row">
        <div>Chapter</div>
        <div className="px-2">&gt;</div>
        <div className="text-dark-teal">Tufts University</div>
      </div>
    </>
  );
};
export default PathNav;

// // const Navigation = () => {
// //   return (
// //     <Router>
// //       <nav>
// //         <ul>
// //           <li>
// //             <Link to="/">Home</Link>
// //           </li>
// //           <li>
// //             <Link to="/about">About</Link>
// //           </li>
// //           <li>
// //             <Link to="/contact">Contact</Link>
// //           </li>
// //         </ul>
// //       </nav>

// //       {/* Define your routes and corresponding components */}
// //       <Routes>
// //         <Route path="/" element={<HomePage />} />
// //         <Route path="/about" element={<AboutPage />} />
// //         <Route path="/contact" element={<ContactPage />} />
// //       </Routes>
// //     </Router>
// //   );
// // };
