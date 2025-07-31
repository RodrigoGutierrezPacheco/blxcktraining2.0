import { Star, Users, Clock } from "lucide-react";

export default function Features() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-black mb-6">
              Nuestra Filosofía
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Eficiencia Comprobada
                  </h3>
                  <p className="text-gray-600">
                    Programas diseñados para maximizar resultados en el menor
                    tiempo posible.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Enfoque Individual
                  </h3>
                  <p className="text-gray-600">
                    Cada plan se adapta a tus características físicas y
                    objetivos específicos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Calidad Garantizada
                  </h3>
                  <p className="text-gray-600">
                    Metodología desarrollada por profesionales con años de
                    experiencia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                  alt="Entrenamiento funcional"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=250"
                  alt="Entrenamiento en casa"
                  className="w-full h-60 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=250"
                  alt="Entrenamiento en gimnasio"
                  className="w-full h-60 object-cover rounded-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                  alt="Entrenamiento al aire libre"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
