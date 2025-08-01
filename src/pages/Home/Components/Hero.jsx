import { Play, Star } from "lucide-react";
import { Button } from "../../Components/Button";
import { Badge } from "../../Components/Badge";

export default function Hero() {
  return (
    <section className="relative bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Entrenamientos Online
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                BLXCK
                <span className="block text-gray-300">TRAINING</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Método profesional de entrenamiento funcional adaptado a tus
                objetivos personales.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="border-white border text-white hover:bg-white hover:text-black text-lg px-8 py-6 bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Comenzar Ahora
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 bg-transparent"
              >
                Ver Programas
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-gray-400">Personalizado</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-gray-400">Acceso</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-sm text-gray-400 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  Satisfacción
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=600"
                alt="Entrenador funcional"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Play className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        Programa Inicial
                      </div>
                      <div className="text-white/80 text-sm">
                        Rutina de introducción
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
