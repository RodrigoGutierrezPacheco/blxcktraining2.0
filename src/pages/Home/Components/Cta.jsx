import { Button } from "../../Components/Button";
import { ArrowRight } from "lucide-react";

export default function Cta() {
  return (
    <section className="py-20 px-4 bg-black text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          Transforma Tu Cuerpo
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Descubre nuestro sistema de entrenamiento profesional diseñado para
          obtener resultados visibles.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6"
          >
            Empieza Ahora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 bg-transparent"
          >
            Conoce los Programas
          </Button>
        </div>

        <div className="text-sm text-gray-400">
          Entrenamientos profesionales • Seguimiento continuo • Adaptado a ti
        </div>
      </div>
    </section>
  );
}
