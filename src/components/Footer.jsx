const Footer = () => {
  return (
    <footer className="mt-12 bg-[#101923] px-6 py-5 text-gray-400">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-gray-300">MOVIESTORE</h2>

            <p className="mt-2 text-xs leading-5">
              © 2026 MovieStore. All rights reserved.
            </p>
          </div>

          {/* MovieStore */}
          <div>
            <h3 className="mb-2 font-semibold text-white">MOVIESTORE</h3>

            <div className="space-y-1 text-sm">
              <p>About MovieStore</p>
              <p>Browse Movies</p>
              <p>New Releases</p>
              <p>Popular Movies</p>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-2 font-semibold text-white">LEGAL</h3>

            <div className="space-y-1 text-sm">
              <p>Privacy</p>
              <p>Accessibility</p>
              <p>Cookies</p>
              <p>Terms</p>
            </div>
          </div>

          {/* More */}
          <div>
            <h3 className="mb-2 font-semibold text-white">MORE</h3>

            <div className="space-y-1 text-sm">
              <p>Watchlist</p>
              <p>My Account</p>
              <p>Support</p>
              <p>Contact Us</p>
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-gray-700 pt-3 text-xs">
          <p>This website is a movie UI project inspired by Steam.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
