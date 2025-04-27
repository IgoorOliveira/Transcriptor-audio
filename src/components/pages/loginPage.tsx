import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="stars-container absolute inset-0 bg-gradient-to-b from-blue-900 to-indigo-950">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-70"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out`
            }}
          />
        ))}
        <div className="absolute w-full h-full bg-blue-900 opacity-20 animate-pulse" />
      </div>
    </div>
  );
};

export default function LoginPage() {
  const { signIn, signingIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
    } catch {
      setError("Credenciais inválidas. Tente novamente.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen relative bg-blue-900 overflow-hidden">
      <AnimatedBackground />
      
      <div className={`relative z-10 w-full max-w-md transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="backdrop-blur-lg bg-white bg-opacity-20 p-8 rounded-xl shadow-2xl border border-white border-opacity-30">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 drop-shadow-md">Bem-vindo</h1>
            <p className="text-gray-600 font-medium drop-shadow-md">Entre com suas credenciais</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500 bg-opacity-40 border border-red-500 text-gray-600 p-3 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 drop-shadow-md">E-mail</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-white bg-opacity-25 border border-blue-300 border-opacity-40 rounded-lg text-gray-600 placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all font-medium"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 drop-shadow-md">Senha</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-white bg-opacity-25 border border-blue-300 border-opacity-40 rounded-lg text-gray-600 placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all font-medium"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={signingIn}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all transform hover:translate-y-px focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 shadow-lg"
            >
              {signingIn ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </span>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 font-medium">
              Não tem conta?{" "}
              <Link to="/register" className="text-blue-200 hover:text-gray-600 font-bold hover:underline transition-all">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}