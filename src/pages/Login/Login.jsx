import { useState } from "react"
import { Eye, EyeOff, LogInIcon } from "lucide-react" // Renamed LogIn to LogInIcon to avoid conflict
import { Button } from "../Components/Button"
import { Card, CardContent } from "../Components/Card"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("") // To display success or error messages

  const handleLogin = (e) => {
    e.preventDefault() // Prevent default form submission

    if (!username || !password) {
      setMessage("Por favor, ingresa tu usuario y contraseña.")
      return
    }

    try {
      // Store username and password in localStorage
      // Note: In a real application, you would send these credentials to a server
      // and store a token (JWT) securely, not raw password.
      localStorage.setItem("userBlck", JSON.stringify({ username, password }))
      setMessage("¡Inicio de sesión exitoso! Datos guardados en localStorage.")
      // Optionally, redirect the user or clear the form
      setUsername("")
      setPassword("")
    } catch (error) {
      setMessage("Error al guardar los datos. Inténtalo de nuevo.")
      console.error("Error saving to localStorage:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-black">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">Iniciar Sesión</h2>
            <p className="text-gray-600">Accede a tu cuenta de BLXCK Training</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
                placeholder="Tu nombre de usuario"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors pr-10"
                  placeholder="Tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-black focus:outline-none"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {message && (
              <p className={`text-center text-sm ${message.includes("exitoso") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}

            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 text-lg py-3">
              <LogInIcon className="mr-2 h-5 w-5" />
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <a href="#" className="text-black hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
            <p className="mt-2 text-gray-600">
              ¿No tienes cuenta?{" "}
              <a href="#" className="text-black hover:underline font-medium">
                Regístrate aquí
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
