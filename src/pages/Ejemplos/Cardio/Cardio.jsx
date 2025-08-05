import { Button } from "../../Components/Button";
import { Card, CardContent } from "../../Components/Card";
import { Badge } from "../../Components/Badge";
import {
  HeartPulse,
  ArrowRight,
  Play,
  Zap,
  Clock,
  Flame,
  Gauge,
  Timer,
  Activity,
  Footprints,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PlanesComponent from "../../Home/Components/Planes";

export default function Cardio() {
  const navigate = useNavigate();

  const cardioBenefits = [
    {
      icon: HeartPulse,
      title: "Salud Cardiovascular",
      description: "Mejora la función cardíaca y circulación sanguínea.",
    },
    {
      icon: Flame,
      title: "Quema Calórica",
      description: "Efectivo para perder grasa y mantener peso saludable.",
    },
    {
      icon: Gauge,
      title: "Mejora de Resistencia",
      description: "Aumenta tu capacidad aeróbica y rendimiento físico.",
    },
    {
      icon: Activity,
      title: "Reducción de Estrés",
      description: "Libera endorfinas que mejoran el estado de ánimo.",
    },
    {
      icon: Footprints,
      title: "Versatilidad",
      description: "Puedes hacerlo en cualquier lugar con o sin equipos.",
    },
    {
      icon: Timer,
      title: "Eficiencia Temporal",
      description: "Algunos métodos dan resultados en sesiones cortas.",
    },
  ];

  const cardioTypes = [
    {
      icon: Zap,
      title: "HIIT (High Intensity Interval Training)",
      description:
        "Alterna periodos cortos de ejercicio intenso con recuperaciones breves. Quema más calorías en menos tiempo y produce efecto afterburn.",
      examples: [
        "30 segundos sprint + 30 segundos caminar (repetir 10 veces)",
        "20 segundos burpees + 10 segundos descanso (8 rondas)",
      ],
    },
    {
      icon: Zap,
      title: "Tabata",
      description:
        "Formato específico de HIIT: 20 segundos de trabajo máximo + 10 segundos descanso, repetido 8 veces (4 minutos total). Extremadamente intenso.",
      examples: [
        "Sentadillas con salto (20s) + descanso (10s)",
        "Mountain climbers (20s) + descanso (10s)",
      ],
    },
    {
      icon: Gauge,
      title: "Cardio en Estado Estable (LISS)",
      description:
        "Ejercicio aeróbico a intensidad constante y moderada (60-70% frecuencia cardíaca máxima). Ideal para principiantes y recuperación activa.",
      examples: [
        "Caminata rápida 45-60 minutos",
        "Ciclismo constante 30-45 minutos",
      ],
    },
    {
      icon: Flame,
      title: "Circuitos Metabólicos",
      description:
        "Combina ejercicios cardiovasculares y de fuerza en secuencia con poco descanso. Eleva el metabolismo por horas post-entrenamiento.",
      examples: [
        "10 saltos + 10 push ups + 10 abdominales (5 rondas)",
        "30 segundos kettlebell swings + 30 segundos jumping jacks (8 rondas)",
      ],
    },
  ];

  const equipmentOptions = [
    {
      title: "Sin Equipos",
      description:
        "Ejercicios que solo requieren tu peso corporal, ideales para hacer en casa o al aire libre.",
      exercises: [
        "Burpees",
        "Jumping jacks",
        "Mountain climbers",
        "Saltos de tijera",
        "Correr en el lugar",
      ],
    },
    {
      title: "Con Pesas",
      description:
        "Combinación de cardio y fuerza para mayor intensidad y quema calórica.",
      exercises: [
        "Thrusters con mancuernas",
        "Kettlebell swings",
        "Saltos con pesas rusas",
        "Step ups con peso",
        "Remo con salto",
      ],
    },
    {
      title: "Máquinas Cardio",
      description:
        "Equipos especializados para entrenamiento cardiovascular en gimnasio.",
      exercises: [
        "Cinta de correr (intervalos)",
        "Elíptica (resistencia variable)",
        "Escaladora (StairMaster)",
        "Bicicleta estática (spinning)",
        "Remo máquina (HIIT)",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black mb-6"
          >
            Entrenamiento Cardiovascular
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Potencia tu Corazón{" "}
            <span className="block text-gray-300">
              y Quema Grasa Eficientemente
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Descubre todos los tipos de entrenamiento cardiovascular, desde HIIT
            intenso hasta cardio estable, con o sin equipos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() =>
                window.open(
                  "https://wa.me/5638686467?text=Hola,%20quiero%20una%20rutina%20de%20cardio%20personalizada",
                  "_blank"
                )
              }
              className="border border-white text-black hover:bg-white hover:text-black text-lg px-8 py-6"
            >
              <Play className="mr-2 h-5 w-5" />
              Comenzar Ahora
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  "https://wa.me/5638686467?text=Hola,%20quiero%20asesoría%20sobre%20entrenamiento%20cardiovascular",
                  "_blank"
                )
              }
              size="lg"
              className="border-white bf text-white hover:bg-white hover:text-black text-lg px-8 py-6 bg-transparent"
            >
              Hablar con un Entrenador
            </Button>
          </div>
        </div>
      </section>

      {/* Cardio Advantages Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black mb-4">
            Beneficios del Entrenamiento Cardiovascular
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Mejora tu salud, condición física y composición corporal con los
            métodos adecuados.
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="text-lg text-gray-700 mb-6">
                El cardio no es solo correr en la cinta. Existen múltiples
                métodos que varían en intensidad, duración y equipamiento,
                permitiendo adaptarse a cualquier nivel de condición física y
                objetivo específico.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Desde los explosivos intervalos HIIT hasta el constante cardio
                LISS, cada tipo ofrece ventajas únicas. Puedes combinarlos para
                maximizar resultados y evitar estancamientos.
              </p>
              <Button
                variant="outline"
                className="bg-transparent text-black hover:bg-gray-100"
                onClick={() => {
                  navigate("/entrenamientos");
                  window.scrollTo(0, 0);
                }}
              >
                Explorar Otros Entrenamientos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <img
                src="/cardio-training.jpg"
                alt="Entrenamiento Cardiovascular"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Beneficios Clave
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Por qué el cardio es esencial en cualquier programa de fitness
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cardioBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-black transition-all duration-300 group"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cardio Types Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Tipos de Entrenamiento Cardiovascular
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Diversos métodos para distintos objetivos y niveles
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {cardioTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-black transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mr-4">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">{type.title}</h3>
                    </div>
                    <p className="text-gray-700 mb-4">{type.description}</p>
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Ejemplos:</h4>
                      <ul className="space-y-2">
                        {type.examples.map((example, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-2 h-2 bg-black rounded-full mr-2 mt-2"></span>
                            <span className="text-sm">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Equipment Options Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Opciones con y sin Equipos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Elige según tus recursos y preferencias
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {equipmentOptions.map((option, index) => (
              <Card
                key={index}
                className="border-2 hover:border-black transition-all duration-300"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">{option.title}</h3>
                  <p className="text-gray-700 mb-4">{option.description}</p>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Ejercicios comunes:</h4>
                    <ul className="space-y-2">
                      {option.exercises.map((exercise, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-2 h-2 bg-black rounded-full mr-2 mt-2"></span>
                          <span className="text-sm">{exercise}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black mb-4">
            Programas Especializados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Selecciona el plan cardiovascular que mejor se adapte a tus
            objetivos
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-black transition-all duration-300">
              <CardContent className="p-6">
                <Zap className="h-12 w-12 text-black mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Quema Grasa HIIT</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Programa intensivo de 4 semanas con intervalos de alta
                  intensidad para máxima quema calórica.
                </p>
                <ul className="text-left text-sm space-y-2 mb-4">
                  <li>• Sesiones de 20-30 minutos</li>
                  <li>• 4-5 días por semana</li>
                  <li>• Combinación de ejercicios</li>
                </ul>
                <Button
                  className="w-full mt-4"
                  onClick={() => {
                    navigate("/planes/hiit");
                    window.scrollTo(0, 0);
                  }}
                >
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-black transition-all duration-300">
              <CardContent className="p-6">
                <Gauge className="h-12 w-12 text-black mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Resistencia Cardio</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Programa de 8 semanas para mejorar capacidad aeróbica y
                  resistencia cardiovascular.
                </p>
                <ul className="text-left text-sm space-y-2 mb-4">
                  <li>• Sesiones de 30-60 minutos</li>
                  <li>• 3-5 días por semana</li>
                  <li>• Progresión controlada</li>
                </ul>
                <Button
                  className="w-full mt-4"
                  onClick={() => {
                    navigate("/planes/resistencia");
                    window.scrollTo(0, 0);
                  }}
                >
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-black transition-all duration-300">
              <CardContent className="p-6">
                <Flame className="h-12 w-12 text-black mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Metabólico Completo</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Combinación de HIIT, Tabata y circuitos para acelerar el
                  metabolismo.
                </p>
                <ul className="text-left text-sm space-y-2 mb-4">
                  <li>• Variedad de métodos</li>
                  <li>• 5 días por semana</li>
                  <li>• Entrenamientos cortos e intensos</li>
                </ul>
                <Button
                  className="w-full mt-4"
                  onClick={() => {
                    navigate("/planes/metabolico");
                    window.scrollTo(0, 0);
                  }}
                >
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <PlanesComponent type="cardio" />
    </div>
  );
}
