import { Button } from "../../Components/Button";
import { Card, CardContent } from "../../Components/Card";
import { Badge } from "../../Components/Badge";
import {
  Activity,
  Target,
  Heart,
  Shield,
  ArrowRight,
  Dumbbell,
  Home,
  Users,
  Clock,
  Flame,
  Move,
  Scale,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Play from "../../Components/Play";
import PlanesComponent from "../../Home/Components/Planes";

export default function Funcional() {
  const navigate = useNavigate();

  const functionalBenefits = [
    {
      icon: Activity,
      title: "Mejora el Rendimiento Diario",
      description:
        "Prepara tu cuerpo para las exigencias de la vida cotidiana.",
    },
    {
      icon: Shield,
      title: "Prevención de Lesiones",
      description: "Fortalece músculos estabilizadores y mejora la postura.",
    },
    {
      icon: Move,
      title: "Aumenta la Movilidad y Flexibilidad",
      description: "Mejora el rango de movimiento en tus articulaciones.",
    },
    {
      icon: Scale,
      title: "Equilibrio y Coordinación",
      description: "Desarrolla una mejor conciencia corporal y control.",
    },
    {
      icon: Dumbbell,
      title: "Fuerza y Resistencia Integral",
      description: "Construye una base sólida de fuerza funcional.",
    },
    {
      icon: Flame,
      title: "Quema de Calorías Efectiva",
      description:
        "Entrenamientos dinámicos que activan múltiples grupos musculares.",
    },
  ];

  const functionalPrinciples = [
    {
      icon: Move,
      title: "Movimientos Multiarticulares",
      description:
        "Ejercicios que involucran varias articulaciones y grupos musculares a la vez, imitando movimientos naturales como sentadillas, empujes y tirones.",
    },
    {
      icon: Target,
      title: "Estabilidad del Core",
      description:
        "Un enfoque central en fortalecer los músculos abdominales y de la espalda baja para mejorar la transferencia de fuerza y prevenir lesiones.",
    },
    {
      icon: Users,
      title: "Patrones de Movimiento Naturales",
      description:
        "Se basa en cómo el cuerpo se mueve naturalmente en la vida diaria y en el deporte, en lugar de aislar músculos.",
    },
    {
      icon: Clock,
      title: "Progresión y Adaptación",
      description:
        "Los entrenamientos se ajustan y progresan a medida que tu cuerpo se adapta, asegurando un desafío continuo y resultados sostenibles.",
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
            Entrenamiento Funcional
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Movimiento con{" "}
            <span className="block text-gray-300">Propósito</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Descubre cómo el entrenamiento funcional puede transformar tu
            cuerpo, mejorar tu rendimiento diario y prevenir lesiones,
            preparándote para cualquier desafío.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() =>
                window.open(
                  "https://wa.me/5638686467?text=Hola,%20quiero%20un%20plan%20de%20entrenamiento%20funcional",
                  "_blank"
                )
              }
              className="border boder-white text-black hover:bg-white hover:text-black text-lg px-8 py-6"
            >
              <Play className="mr-2 h-5 w-5" />
              Comenzar Ahora
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  "https://wa.me/5638686467?text=Hola,%20quiero%20un%20plan%20de%20entrenamiento%20funcional",
                  "_blank"
                )
              }
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 bg-transparent"
            >
              Hablar con un Experto
            </Button>
          </div>
        </div>
      </section>

      {/* What is Functional Training Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black mb-4">
            ¿Qué es el Entrenamiento Funcional?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            El entrenamiento funcional se enfoca en movimientos que imitan las
            actividades de la vida diaria y los deportes, fortaleciendo tu
            cuerpo de manera integral para mejorar tu rendimiento y prevenir
            lesiones.
          </p>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="text-lg text-gray-700 mb-6">
                A diferencia del entrenamiento tradicional que aísla músculos,
                el entrenamiento funcional trabaja cadenas musculares completas,
                mejorando la coordinación, el equilibrio, la fuerza y la
                flexibilidad de forma simultánea. Es un enfoque holístico que
                busca optimizar la forma en que tu cuerpo se mueve en el mundo
                real.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Desde levantar objetos pesados hasta correr, saltar o
                simplemente mantener una buena postura, el entrenamiento
                funcional te prepara para ser más eficiente y resistente en cada
                aspecto de tu vida.
              </p>
              <Button
                variant="outline"
                className="bg-transparent text-black hover:bg-gray-100"
                onClick={() => navigate("/entrenamientos")}
              >
                Explorar Otros Entrenamientos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Entrenamiento Funcional"
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
              Beneficios Clave del Entrenamiento Funcional
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre cómo este enfoque integral puede transformar tu bienestar
              físico.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {functionalBenefits.map((benefit, index) => {
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

      {/* Key Principles Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Principios Fundamentales
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conoce los pilares sobre los que se construye cada rutina
              funcional.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {functionalPrinciples.map((principle, index) => {
              const IconComponent = principle.icon;
              return (
                <div key={index} className="flex gap-6 items-start">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-gray-700">{principle.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who is it for Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black mb-4">
            ¿Para Quién es el Entrenamiento Funcional?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Este tipo de entrenamiento es versátil y beneficioso para una amplia
            gama de personas.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-black transition-all duration-300">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-black mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">
                  Atletas y Deportistas
                </h3>
                <p className="text-gray-600 text-sm">
                  Mejora el rendimiento específico de tu deporte, la agilidad y
                  la potencia.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-black transition-all duration-300">
              <CardContent className="p-6">
                <Home className="h-12 w-12 text-black mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Personas Activas</h3>
                <p className="text-gray-600 text-sm">
                  Optimiza tu capacidad para las actividades diarias y hobbies.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-black transition-all duration-300">
              <CardContent className="p-6">
                <Heart className="h-12 w-12 text-black mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">
                  Rehabilitación y Prevención
                </h3>
                <p className="text-gray-600 text-sm">
                  Ideal para recuperarse de lesiones y fortalecer el cuerpo para
                  evitar futuras.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <PlanesComponent type="funcional" />
    </div>
  );
}
