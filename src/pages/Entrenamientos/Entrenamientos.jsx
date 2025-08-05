import { Button } from "../Components/Button";
import { Card, CardContent } from "../Components/Card";
import { Badge } from "lucide-react";
import {
  Home,
  Dumbbell,
  Target,
  Heart,
  Zap,
  Clock,
  Users,
  CheckCircle,
  Play,
  ArrowRight,
  Activity,
  Flame,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Entrenamientos() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userBlck"));
  const locationTrainings = [
    {
      icon: Home,
      title: "Entrenamientos en Casa",
      description: "Transforma tu hogar en tu gimnasio personal",
      features: [
        "Sin equipos necesarios",
        "Rutinas de 30-90 minutos",
        "Adaptable a cualquier espacio",
        "Perfecto para principiantes",
      ],
      href: "/entrenamiento-casa",
      benefits: "Ideal para quienes buscan comodidad y flexibilidad total",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    },
    {
      icon: Dumbbell,
      title: "Entrenamientos en Gimnasio",
      description: "Maximiza tu potencial con equipos profesionales",
      features: [
        "Uso completo de equipos",
        "Rutinas progresivas",
        "Técnicas avanzadas",
        "Supervisión profesional",
      ],
      href: "/entrenamiento-gimnasio",
      benefits: "Perfecto para objetivos específicos y resultados acelerados",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    },
    {
      icon: Activity,
      title: "Entrenamiento Funcional",
      description:
        "Desarrolla fuerza, movilidad y resistencia para la vida diaria",
      features: [
        "Movimientos multiarticulares",
        "Enfoque en patrones naturales",
        "Mejora de equilibrio y coordinación",
        "Uso de peso corporal y accesorios",
      ],
      href: "/entrenamiento-funcional",
      benefits:
        "Excelente para mejorar el rendimiento físico general y prevenir lesiones",
      image:
        "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    },
    {
      icon: Activity,
      title: "Entrenamiento Cardiovascular",
      description:
        "Desarrolla fuerza, movilidad y resistencia para la vida diaria",
      features: [
        "Movimientos multiarticulares",
        "Enfoque en patrones naturales",
        "Mejora de equilibrio y coordinación",
        "Uso de peso corporal y accesorios",
      ],
      href: "/entrenamiento-funcional",
      benefits:
        "Excelente para mejorar el rendimiento físico general y prevenir lesiones",
      image:
        "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    },
  ];

  const objectiveTrainings = [
    {
      icon: Target,
      title: "Entrenamiento de Fuerza",
      description: "Desarrolla músculo y potencia",
      details:
        "Rutinas diseñadas para aumentar la masa muscular y la fuerza funcional",
      duration: "45-60 min",
      level: "Intermedio-Avanzado",
      color: "bg-red-500",
    },
    {
      icon: Activity,
      title: "Entrenamiento de Resistencia",
      description: "Mejora tu capacidad cardiovascular",
      details: "Ejercicios que fortalecen tu corazón y aumentan tu resistencia",
      duration: "30-45 min",
      level: "Todos los niveles",
      color: "bg-blue-500",
    },
    {
      icon: Heart,
      title: "Entrenamiento para Salud",
      description: "Bienestar integral y calidad de vida",
      details:
        "Rutinas enfocadas en mejorar tu salud general y prevenir lesiones",
      duration: "20-40 min",
      level: "Principiante",
      color: "bg-green-500",
    },
    {
      icon: Flame,
      title: "Quema de Grasa Corporal",
      description: "Elimina grasa y define tu cuerpo",
      details: "Entrenamientos HIIT y metabólicos para máxima quema calórica",
      duration: "25-45 min",
      level: "Intermedio",
      color: "bg-orange-500",
    },
  ];

  //   const sportsTrainings = [
  //     {
  //       sport: "Fútbol",
  //       icon: "⚽",
  //       focus: "Agilidad, resistencia y coordinación",
  //       description:
  //         "Mejora tu rendimiento en el campo con ejercicios específicos",
  //     },
  //     {
  //       sport: "Basketball",
  //       icon: "🏀",
  //       focus: "Salto vertical, velocidad y fuerza explosiva",
  //       description:
  //         "Desarrolla las habilidades físicas clave para dominar la cancha",
  //     },
  //     {
  //       sport: "Tenis",
  //       icon: "🎾",
  //       focus: "Rotación de core, agilidad lateral y resistencia",
  //       description:
  //         "Potencia tu juego con entrenamientos específicos para tenistas",
  //     },
  //     {
  //       sport: "Running",
  //       icon: "🏃",
  //       focus: "Resistencia cardiovascular y fuerza en piernas",
  //       description: "Mejora tu tiempo y resistencia con planes personalizados",
  //     },
  //     {
  //       sport: "Natación",
  //       icon: "🏊",
  //       focus: "Fuerza de core, flexibilidad y técnica",
  //       description:
  //         "Complementa tu entrenamiento acuático con ejercicios terrestres",
  //     },
  //     {
  //       sport: "Ciclismo",
  //       icon: "🚴",
  //       focus: "Potencia en piernas, core y resistencia",
  //       description: "Aumenta tu rendimiento sobre la bicicleta",
  //     },
  //   ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black mb-6"
          >
            Entrenamientos Personalizados
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Encuentra Tu
            <span className="block text-gray-300">Entrenamiento Ideal</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Desde entrenamientos en casa hasta rutinas específicas para
            deportes. Tenemos el programa perfecto para alcanzar tus objetivos,
            sin importar tu nivel o ubicación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => (user ? navigate("/perfil") : navigate("/planes"))}
              className="border border-white text-black hover:bg-white hover:text-black text-lg px-8 py-6"
            >
              <Play className="mr-2 h-5 w-5" />
              Comenzar Ahora
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                navigate("/planes");
                window.scrollTo(0, 0);
              }}
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 bg-transparent"
            >
              Ver Planes
            </Button>
          </div>
        </div>
      </section>

      {/* Location-Based Trainings */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Entrena Donde Prefieras
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Adaptamos nuestros entrenamientos a tu espacio y preferencias
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {locationTrainings.map((training, index) => {
              const IconComponent = training.icon;
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-black transition-all duration-300 group"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={training.image || "/placeholder.svg"}
                        alt={training.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                      <div className="absolute top-4 left-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-black" />
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-3">
                        {training.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {training.description}
                      </p>
                      <div className="space-y-3 mb-6">
                        {training.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <p className="text-sm text-gray-600 italic">
                          {training.benefits}
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          navigate(`${training.href}`);
                          window.scrollTo(0, 0);
                        }}
                        className="w-full bg-black text-white hover:bg-gray-800"
                      >
                        Explorar Entrenamiento
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Objective-Based Trainings */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Entrenamientos por Objetivo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Programas específicos diseñados para alcanzar tus metas fitness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectiveTrainings.map((training, index) => {
              const IconComponent = training.icon;
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-black transition-all duration-300 group cursor-pointer"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${training.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{training.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {training.description}
                    </p>
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      {training.details}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{training.duration}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{training.level}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                    >
                      Ver Rutinas
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sports-Specific Trainings */}
      {/* <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Entrenamientos Deportivos Específicos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mejora tu rendimiento en tu deporte favorito con entrenamientos
              especializados
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sportsTrainings.map((sport, index) => (
              <Card
                key={index}
                className="border-2 hover:border-black transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{sport.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold">{sport.sport}</h3>
                      <p className="text-sm text-gray-500">{sport.focus}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{sport.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Trophy className="h-4 w-4" />
                    <span>Entrenamiento especializado</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-black group-hover:text-white transition-colors bg-transparent"
                  >
                    Ver Programa
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">
                ¿Por Qué Nuestros Entrenamientos Funcionan?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Personalización Total
                    </h3>
                    <p className="text-gray-600">
                      Cada rutina se adapta a tu nivel, objetivos y
                      disponibilidad de tiempo.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Metodología Científica
                    </h3>
                    <p className="text-gray-600">
                      Basados en investigación deportiva y principios de
                      entrenamiento comprobados.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Resultados Medibles
                    </h3>
                    <p className="text-gray-600">
                      Seguimiento de progreso con métricas claras y objetivos
                      alcanzables.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
                  alt="Entrenamiento personalizado"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=250"
                  alt="Resultados medibles"
                  className="w-full h-60 object-cover rounded-lg mt-8"
                />
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=250"
                  alt="Metodología científica"
                  className="w-full h-60 object-cover rounded-lg -mt-8"
                />
                <img
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
                  alt="Variedad de entrenamientos"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            ¿Listo Para Comenzar?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Elige el entrenamiento que mejor se adapte a tus objetivos y
            comienza tu transformación hoy mismo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6"
            >
              Prueba Gratis 7 Días
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 bg-transparent"
            >
              Hablar con un Entrenador
            </Button>
          </div>

          <div className="text-sm text-gray-400">
            Más de 500 personas ya han transformado su vida • Únete a la
            comunidad BLXCK
          </div>
        </div>
      </section>
    </div>
  );
}
