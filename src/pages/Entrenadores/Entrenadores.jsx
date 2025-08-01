import { useState } from "react";
import { Button } from "../Components/Button";
import { Card, CardContent } from "../Components/Card";
import { Badge } from "../Components/Badge";
import { Users, Award, Calendar } from "lucide-react";
import TrainerModal from "../Components/Modals/TrainerModal";

export default function Entrenadores() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const trainers = [
    {
      id: 1,
      name: "Juan Pérez",
      specialty: "Entrenador Funcional & HIIT",
      experience: "8 años",
      clients: "200+",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      bio: "Juan es un apasionado del movimiento y la salud. Con una década de experiencia, se especializa en transformar cuerpos y mentes a través de entrenamientos funcionales y de alta intensidad. Su enfoque es holístico, combinando el ejercicio con hábitos saludables para resultados duraderos.",
      specialtiesList: [
        "Entrenamiento Funcional",
        "HIIT (High-Intensity Interval Training)",
        "Pérdida de Grasa",
        "Ganancia Muscular",
        "Rehabilitación Post-Lesión",
      ],
      philosophy:
        "Creo que el cuerpo humano es capaz de cosas increíbles. Mi filosofía es empoderar a mis clientes para que descubran su verdadero potencial, superando límites y construyendo una base sólida para una vida activa y plena.",
      email: "juan.perez@blxcktraining.com",
      phone: "+1 (555) 100-2000",
    },
    {
      id: 2,
      name: "Ana García",
      specialty: "Yoga & Movilidad",
      experience: "10 años",
      clients: "150+",
      image:
        "https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      bio: "Ana es una experta en yoga y movilidad, dedicada a ayudar a sus clientes a mejorar su flexibilidad, equilibrio y bienestar general. Su enfoque suave pero efectivo es ideal para quienes buscan una conexión más profunda con su cuerpo y mente.",
      specialtiesList: [
        "Yoga Vinyasa",
        "Movilidad Articular",
        "Reducción de Estrés",
        "Fortalecimiento del Core",
        "Meditación Guiada",
      ],
      philosophy:
        "El movimiento es medicina. Mi objetivo es guiar a mis alumnos a través de prácticas que no solo fortalezcan su cuerpo, sino que también calmen su mente y les permitan vivir con mayor libertad y sin dolor.",
      email: "ana.garcia@blxcktraining.com",
      phone: "+1 (555) 100-2001",
    },
    {
      id: 3,
      name: "Luis Ramírez",
      specialty: "Fuerza & Acondicionamiento",
      experience: "7 años",
      clients: "180+",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      bio: "Luis es un especialista en fuerza y acondicionamiento, con un historial probado en ayudar a atletas y entusiastas del fitness a alcanzar sus picos de rendimiento. Su metodología se basa en la ciencia del deporte y la programación inteligente.",
      specialtiesList: [
        "Entrenamiento de Fuerza",
        "Acondicionamiento Deportivo",
        "Levantamiento Olímpico",
        "Nutrición Deportiva",
        "Prevención de Lesiones",
      ],
      philosophy:
        "La fuerza no es solo física, es mental. Mi misión es construir atletas resilientes, tanto en el gimnasio como en la vida, a través de un entrenamiento inteligente y una mentalidad inquebrantable.",
      email: "luis.ramirez@blxcktraining.com",
      phone: "+1 (555) 100-2002",
    },
    {
      id: 4,
      name: "Sofía Castro",
      specialty: "Entrenamiento Personalizado & Nutrición",
      experience: "9 años",
      clients: "220+",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
      bio: "Sofía es una entrenadora personal y nutricionista certificada, que ofrece un enfoque integral para la salud y el bienestar. Ella cree que la verdadera transformación viene de nutrir tanto el cuerpo como la mente.",
      specialtiesList: [
        "Planes de Nutrición Personalizados",
        "Entrenamiento para Pérdida de Peso",
        "Coaching de Hábitos Saludables",
        "Entrenamiento para Embarazo y Postparto",
        "Bienestar Integral",
      ],
      philosophy:
        "Tu cuerpo es tu templo. Mi enfoque es ayudarte a construir una relación saludable y sostenible con la comida y el ejercicio, para que te sientas fuerte, energizado y feliz en tu propia piel.",
      email: "sofia.castro@blxcktraining.com",
      phone: "+1 (555) 100-2003",
    },
  ];

  const openModal = (trainer) => {
    setSelectedTrainer(trainer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTrainer(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black mb-6"
          >
            Nuestro Equipo
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Conoce a Nuestros
            <span className="block text-gray-300">Entrenadores Expertos</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Profesionales apasionados y certificados, listos para guiarte en
            cada paso de tu transformación.
          </p>
          <Button
            size="lg"
            onClick={() =>
              window.open(
                "https://wa.me/2202341592?text=Hola!%20quisiera%20mi%20entrenamiento%20de%20prueba%20por%202%20semanas",
                "_blank"
              )
            }
            className="border-2 border-white text-black hover:bg-gray-100 text-lg px-8 py-6"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Agendar Entrenamiento de prueba
          </Button>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Nuestros Entrenadores
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Haz clic en cada entrenador para conocer más sobre su experiencia
              y especialidades.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainers.map((trainer) => (
              <Card
                key={trainer.id}
                className="border-2 hover:border-black transition-colors duration-300 cursor-pointer"
                onClick={() => {
                  openModal(trainer);
                }}
              >
                <CardContent className="p-6 text-center">
                  <img
                    src={trainer.image || "/placeholder.svg"}
                    alt={trainer.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-2 border-gray-200"
                  />
                  <h3 className="text-xl font-bold text-black mb-2">
                    {trainer.name}
                  </h3>
                  <p className="text-gray-700 mb-4">{trainer.specialty}</p>
                  <div className="flex items-center justify-center gap-2 text-gray-600 text-sm mb-2">
                    <Award className="h-4 w-4" />
                    <span>{trainer.experience} de experiencia</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                    <Users className="h-4 w-4" />
                    <span>{trainer.clients} clientes</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-6 w-full bg-transparent"
                  >
                    Ver Perfil
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            ¿Listo Para Entrenar con los Mejores?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Nuestros entrenadores están listos para ayudarte a alcanzar tus
            metas. ¡Agenda tu primera sesión hoy!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Sesión
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 bg-transparent"
            >
              Ver Testimonios
            </Button>
          </div>

          <div className="text-sm text-gray-400">
            Entrenadores certificados • Planes personalizados • Resultados
            garantizados
          </div>
        </div>
      </section>

      {/* Trainer Modal */}
      <TrainerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        trainer={selectedTrainer}
      />
    </div>
  );
}
