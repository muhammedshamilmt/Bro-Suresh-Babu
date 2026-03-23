import { Link } from "react-router-dom";

export default function GraceCommunity() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#061430] via-[#050A14] to-[#241702] flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-4xl font-bold mb-4">Grace Community</h1>
      <p className="text-white/60 text-lg mb-8 text-center max-w-xl">
        A community rooted in grace, growing together in faith.
      </p>
      <Link to="/landing" className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
