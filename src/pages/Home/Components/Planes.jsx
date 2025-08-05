import { Button } from "../../Components/Button";
import { Card, CardContent } from "../../Components/Card";
import { Badge } from "../../Components/Badge";
import {
  Activity,
  ArrowRight,
  Dumbbell,
  Home,
  Heart,
  CheckCircle,
  DollarSign,
  Users,
  Flame,
  Shield,
  Move,
  Scale,
  Clock,
  Target,
  Utensils,
  Ruler,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PlanesComponent({ type }) {
  const navigate = useNavigate();

  // Planes para entrenamiento funcional
  const functionalPlans = [
    {
      name: "Plan Funcional Básico",
      price: "500",
      duration: "5 semanas",
      description: "Rutina completa de entrenamiento funcional",
      features: [
        "Programa de 5 semanas progresivo",
        "Videos demostrativos de cada ejercicio",
        "Guía de técnica y ejecución",
        "Variaciones para todos los niveles",
        "Soporte vía WhatsApp",
      ],
      icon: Activity,
    },
    {
      name: "Plan Funcional Premium",
      price: "850",
      duration: "5 semanas",
      description: "Entrenamiento + Movilidad + Prevención de Lesiones",
      features: [
        "Todo lo del Plan Básico",
        "Rutina de movilidad articular",
        "Ejercicios correctivos",
        "Sesión de evaluación inicial",
        "Ajustes semanales personalizados",
      ],
      icon: Shield,
      badge: "¡Más Popular!",
      badgeColor: "bg-green-500",
    },
    {
      name: "Plan Transformación Total",
      price: "1200",
      duration: "5 semanas",
      description: "Entrenamiento + Nutrición + Seguimiento Avanzado",
      features: [
        "Todo lo del Plan Premium",
        "Plan de alimentación básico",
        "Guía de suplementación",
        "3 sesiones de coaching 1 a 1",
        "Análisis de progreso semanal",
      ],
      icon: Heart,
      badge: "¡Resultados Garantizados!",
      badgeColor: "bg-purple-500",
    },
  ];

  // Planes para entrenamiento en casa
  const homePlans = [
    {
      name: "Plan Casa Básico",
      price: "450",
      duration: "5 semanas",
      description: "Rutinas sin equipo para hacer en casa",
      features: [
        "Programa de 5 semanas progresivo",
        "Videos demostrativos HD",
        "Rutinas de 20-40 minutos",
        "Adaptable a espacios pequeños",
        "Guía de calentamiento y estiramiento",
      ],
      icon: Home,
    },
    {
      name: "Plan Casa Avanzado",
      price: "750",
      duration: "5 semanas",
      description: "Entrenamiento en casa con equipo mínimo",
      features: [
        "Todo lo del Plan Básico",
        "Rutinas con bandas de resistencia",
        "Guía para entrenar con objetos domésticos",
        "Plan de movilidad diaria",
        "Sesión de evaluación virtual",
      ],
      icon: Dumbbell,
      badge: "¡Recomendado!",
      badgeColor: "bg-blue-500",
    },
    {
      name: "Plan Casa Completo",
      price: "1100",
      duration: "5 semanas",
      description: "Entrenamiento + Nutrición para casa",
      features: [
        "Todo lo del Plan Avanzado",
        "Plan de alimentación para preparar en casa",
        "Guía de suplementos básicos",
        "Recetas fáciles y rápidas",
        "Lista de compras saludable",
      ],
      icon: Utensils,
    },
  ];

  // Planes para entrenamiento en gimnasio
  const gymPlans = [
    {
      name: "Plan Gimnasio Básico",
      price: "600",
      duration: "5 semanas",
      description: "Rutinas para equipos de gimnasio",
      features: [
        "Programa de 5 semanas progresivo",
        "Guía de uso de máquinas",
        "Rutinas divididas por grupos musculares",
        "Técnicas de seguridad en el gimnasio",
        "Soporte para dudas de equipos",
      ],
      icon: Dumbbell,
    },
    {
      name: "Plan Gimnasio Avanzado",
      price: "950",
      duration: "5 semanas",
      description: "Entrenamiento personalizado para gimnasio",
      features: [
        "Todo lo del Plan Básico",
        "Rutinas según tu gimnasio disponible",
        "Técnicas avanzadas de levantamiento",
        "Plan de movilidad específica",
        "Ajustes semanales personalizados",
      ],
      icon: Target,
      badge: "¡Más Vendido!",
      badgeColor: "bg-red-500",
    },
    {
      name: "Plan Gimnasio Premium",
      price: "1300",
      duration: "5 semanas",
      description: "Entrenamiento + Nutrición para gimnasio",
      features: [
        "Todo lo del Plan Avanzado",
        "Plan de alimentación para ganancia muscular",
        "Guía de suplementación deportiva",
        "3 sesiones de coaching virtual",
        "Análisis de composición corporal",
      ],
      icon: Ruler,
    },
  ];

  // Seleccionar los planes según el tipo
  const getPlansByType = () => {
    switch (type) {
      case "funcional":
        return {
          plans: functionalPlans,
          title: "Entrenamiento Funcional",
          description: "Planes diseñados para mejorar tu movimiento diario",
          ctaTitle: "Transforma Tu Movimiento",
          ctaDescription:
            "Comienza a experimentar los beneficios del entrenamiento funcional hoy mismo",
        };
      case "casa":
        return {
          plans: homePlans,
          title: "Entrenamiento en Casa",
          description: "Planes adaptados para entrenar en tu hogar",
          ctaTitle: "Transforma Tu Casa en Tu Gimnasio",
          ctaDescription: "Logra tus objetivos sin salir de casa",
        };
      case "gimnasio":
        return {
          plans: gymPlans,
          title: "Entrenamiento en Gimnasio",
          description: "Planes para aprovechar al máximo tu gimnasio",
          ctaTitle: "Maximiza Tu Potencial",
          ctaDescription:
            "Aprovecha los equipos profesionales para acelerar tus resultados",
        };
      default:
        return {
          plans: functionalPlans,
          title: "Nuestros Planes",
          description: "Elige el que mejor se adapte a tus objetivos",
          ctaTitle: "Comienza Tu Transformación",
          ctaDescription: "Selecciona tu plan ideal y empieza hoy mismo",
        };
    }
  };

  const { plans, title, description, ctaTitle, ctaDescription } =
    getPlansByType();

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Nuestros Planes de {title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-black transition-colors duration-300 relative"
                >
                  {plan.badge && (
                    <Badge
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-sm ${plan.badgeColor} text-white`}
                    >
                      {plan.badge}
                    </Badge>
                  )}
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <DollarSign className="h-8 w-8 text-black" />
                      <span className="text-4xl font-bold text-black">
                        {plan.price}
                      </span>
                      <span className="text-xl text-gray-600">MXN</span>
                    </div>
                    <p className="text-gray-700 mb-8">
                      Duración: {plan.duration}
                    </p>
                    <div className="space-y-3 text-left mb-8">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      size="lg"
                      className="w-full bg-black text-white hover:bg-gray-800 text-lg py-3"
                      onClick={() =>
                        window.open(
                          `https://wa.me/5638686467?text=Hola,%20quiero%20comprar%20el%20${encodeURIComponent(
                            plan.name
                          )}%20(${title})`,
                          "_blank"
                        )
                      }
                    >
                      Adquirir Plan
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            ¿Listo Para {ctaTitle}?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="border border-white text-black hover:bg-white hover:text-black text-lg px-8 py-6"
              onClick={() =>
                window.open(
                  `https://wa.me/5638686467?text=Hola,%20quiero%20asesoría%20para%20elegir%20mi%20plan%20de%20${type}`,
                  "_blank"
                )
              }
            >
              Hablar con un Entrenador
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className=" text-white bg-black hover:bg-white hover:text-black text-lg px-8 py-6 t"
              onClick={() => {
                navigate("/planes");
                window.scrollTo(0, 0);
              }}
            >
              Ver Todos los Planes
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
