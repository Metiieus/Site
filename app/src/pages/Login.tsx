import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, loginGoogle, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(
        err.code === 'auth/invalid-credential'
          ? 'Email ou senha incorretos'
          : err.code === 'auth/user-not-found'
          ? 'Usuário não encontrado'
          : 'Erro ao fazer login. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      await loginGoogle();
      navigate('/');
    } catch (err: any) {
      setError('Erro ao fazer login com Google. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="M² Verse"
            className="h-20 mx-auto mb-4"
          />
          <h1 className="font-display text-3xl text-white">Bem-vindo de volta!</h1>
          <p className="text-[#777777] mt-2">Entre para continuar comprando</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#252525] rounded-2xl p-8 border border-white/5">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#777777]" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-10 bg-[#1c1c1c] border-white/10 text-white placeholder:text-[#777777]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#777777]" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 bg-[#1c1c1c] border-white/10 text-white placeholder:text-[#777777]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777777] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#777777]">
                <input type="checkbox" className="rounded bg-[#1c1c1c] border-white/10" />
                Lembrar-me
              </label>
              <Link to="/forgot-password" className="text-[#f2fe6f] hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#f2fe6f] text-black hover:bg-[#e5f160] font-semibold py-6"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#252525] text-[#777777]">Ou continue com</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              variant="outline"
              className="w-full mt-4 border-white/20 text-white hover:bg-white/10"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Google
            </Button>
          </div>
        </div>

        <p className="text-center mt-6 text-[#777777]">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-[#f2fe6f] hover:underline font-semibold">
            Criar conta
          </Link>
        </p>

        <p className="text-center mt-4">
          <Link to="/" className="text-[#777777] hover:text-white text-sm">
            ← Voltar para a loja
          </Link>
        </p>
      </div>
    </div>
  );
}
