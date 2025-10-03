import logo from '../../assets/light_logo.png'
import { Github, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="py-6 bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src={logo} 
            alt="StackTrack logo" 
            className="h-16 w-auto"
          />
        </div>

        {/* Middle: Socials Links */}
        <div>       
          {/* Social Icons */}
          <div className="flex items-center space-x-4 ml-4">
            <a href="#" aria-label="GitHub" className="hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Right: Copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} StackTrack. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
