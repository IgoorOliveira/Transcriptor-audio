import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../lib/api";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="particles-container absolute inset-0 bg-gradient-to-b from-green-900 to-emerald-950">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-70"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animation: `float ${Math.random() * 6 + 4}s infinite ease-in-out`
            }}
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`circle-${i}`}
            className="absolute rounded-full bg-emerald-400 opacity-20"
            style={{
              width: Math.random() * 200 + 50 + "px",
              height: Math.random() * 200 + 50 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animation: `pulse ${Math.random() * 8 + 5}s infinite ease-in-out alternate`,
              transform: "scale(0.8)"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/users", { name, email, password });
      navigate("/login", { replace: true });
    } catch (err) {
      setError(
        (err instanceof Error ? err.message : String(err)) || "Erro ao cadastrar usuário. Verifique se o e-mail já está em uso ou se os dados estão corretos."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen relative bg-green-900 overflow-hidden">
      <AnimatedBackground />
      
      <div className={`relative z-10 w-full max-w-md transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="backdrop-blur-lg bg-white bg-opacity-10 p-8 rounded-xl shadow-2xl border border-white border-opacity-20">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-text-gray-800 mb-2">Crie sua conta</h1>
            <p className="text-green-300">Preencha os dados para começar</p>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-gray-800 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Nome</label>
              <input
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-white bg-opacity-10 border border-green-300 border-opacity-30 rounded-lg text-gray-800 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-white bg-opacity-10 border border-green-300 border-opacity-30 rounded-lg text-gray-800 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Senha</label>
              <input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-white bg-opacity-10 border border-green-300 border-opacity-30 rounded-lg text-gray-800 placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                minLength={6}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-600 text-white hover:bg-green-700 rounded-lg font-medium transition-all transform hover:translate-y-px focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 shadow-lg mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Cadastrando...
                </span>
              ) : (
                "Cadastrar"
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Já tem conta?{" "}
              <Link to="/login" className="text-green-300 hover:text-gray-600 font-medium hover:underline transition-all">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-10px) translateX(5px); opacity: 0.7; }
          50% { transform: translateY(-5px) translateX(10px); opacity: 0.5; }
          75% { transform: translateY(10px) translateX(5px); opacity: 0.6; }
        }
        
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.2; }
          100% { transform: scale(1.2); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}