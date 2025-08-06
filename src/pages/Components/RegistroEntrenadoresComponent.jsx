import { Button } from "./Button";
import { Users } from "lucide-react";

export default function RegistroEntrenadores() {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="bg-black text-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">¿Eres entrenador?</h3>
              <p className="text-gray-300">
                Únete a nuestro equipo y ofrece tus servicios a una comunidad
                apasionada por el fitness.
              </p>
            </div>
            <Button
              size="lg"
              className="border border-white text-black hover:bg-white hover:text-black px-8 py-4"
              onClick={() => (window.location.href = "/registro/entrenadores")}
            >
              <Users className="mr-2 h-5 w-5" />
              Regístrate como Entrenador
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
