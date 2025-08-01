import { Card, CardContent } from "../../Components/Card";
import { MapPin, Dumbbell } from "lucide-react";

export default function TrainingOptions() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            Transforma tu Cuerpo, Mejora tu Rendimiento
          </h2>{" "}
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sistemas de entrenamiento basados en ciencia y adaptados a cada
            nivel.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-black transition-colors group cursor-pointer">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Principiantes</h3>
              <p className="text-gray-600 mb-6">
                Programa de iniciación para construir bases sólidas con técnica
                perfecta.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Enfoque en movilidad</li>
                <li>• Rutinas de 20-30 minutos</li>
                <li>• Progresión garantizada</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-black transition-colors group cursor-pointer">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Intermedios</h3>
              <p className="text-gray-600 mb-6">
                Para quienes buscan llevar su físico al siguiente nivel con
                entrenamientos retadores.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Programas de 4-6 semanas</li>
                <li>• Enfoque en hipertrofia</li>
                <li>• Técnicas avanzadas</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-black transition-colors group cursor-pointer">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Avanzados</h3>
              <p className="text-gray-600 mb-6">
                Sistemas de alto rendimiento para atletas y entusiastas del
                fitness.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Periodización avanzada</li>
                <li>• Optimización de resultados</li>
                <li>• Planes competitivos</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
