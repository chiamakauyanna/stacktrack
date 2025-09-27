import React from 'react'

const Footer = () => {
  return (
    <footer className="py-10 text-center bg-gray-900 text-gray-400">
      <p>© {new Date().getFullYear()} StackTrack. All rights reserved.</p>
      <div className="mt-4 space-x-6">
        <a href="#" className="hover:text-white">GitHub</a>
        <a href="#" className="hover:text-white">Docs</a>
        <a href="#" className="hover:text-white">Contact</a>
      </div>
    </footer>
  )
}

export default Footer