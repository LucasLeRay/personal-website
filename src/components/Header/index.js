import React from "react"
import { Link } from "gatsby"
import { Container } from "./Header.module.css"

function Header() {
  return (
    <div className={Container}>
      <Link to="/">Home</Link>
      <Link to="/blog">Blog</Link>
      <a href="mailto:contact@lucas-le-ray.com" rel="noopener noreferrer">
        Contact
      </a>
    </div>
  )
}

export default Header
