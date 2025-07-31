import { Button } from "../Components/Button";
import { Card, CardContent } from "../Components/Card";
import { Badge } from "../Components/Badge";
import {
  CheckCircle,
  DollarSign,
  Calendar,
  Home,
  Dumbbell,
  Utensils,
  Ruler,
  ArrowRight,
  Users,
} from "lucide-react";

export default function Planes() {
  const mainPlanFeatures = [
    "Acceso a todas las rutinas (casa y gimnasio)",
    "Plan de entrenamiento de 5 semanas",
    "Guía de ejercicios detallada",
    "Soporte vía chat 24/7",
    "Actualizaciones de rutinas mensuales",
    "Seguimiento de progreso",
  ];

  const promotionPlans = [
    {
      name: "Plan Transformación Total",
      price: "850",
      duration: "5 semanas",
      description: "Entrenamiento + Plan de Alimentación Personalizado",
      features: [
        "Todo lo del Plan Básico",
        "Plan de alimentación diseñado por nutricionista",
        "Recetas saludables y fáciles",
        "Guía de suplementación (opcional)",
        "Lista de compras inteligente",
      ],
      icon: Utensils,
      badge: "¡Más Popular!",
      badgeColor: "bg-green-500",
    },
    {
      name: "Plan Rendimiento Pro",
      price: "1200",
      duration: "5 semanas",
      description:
        "Entrenamiento + Medidas Antropométricas + Seguimiento Avanzado",
      features: [
        "Todo lo del Plan Básico",
        "Análisis de composición corporal (medidas)",
        "Evaluación de rendimiento físico",
        "Ajustes de rutina basados en datos",
        "Sesión de coaching 1 a 1 (online)",
      ],
      icon: Ruler,
      badge: "¡Resultados Garantizados!",
      badgeColor: "bg-purple-500",
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
            Nuestros Planes
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Elige Tu Camino
            <span className="block text-gray-300">Hacia la Transformación</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Programas diseñados para adaptarse a tus objetivos, presupuesto y
            estilo de vida. Comienza hoy mismo tu viaje con BLXCK Training.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6"
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              Ver Todos los Planes
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 bg-transparent"
            >
              Preguntas Frecuentes
            </Button>
          </div>
        </div>
      </section>

      {/* Main Plan Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Plan Básico de 5 Semanas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tu punto de partida ideal para una vida más activa y saludable.
            </p>
          </div>

          <div className="flex justify-center">
            <Card className="border-2 border-black max-w-2xl w-full">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <DollarSign className="h-10 w-10 text-black" />
                  <span className="text-5xl font-bold text-black">500</span>
                  <span className="text-2xl text-gray-600">MXN</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-700 mb-6">
                  <Calendar className="h-5 w-5" />
                  <span className="text-lg font-semibold">
                    5 Semanas de Entrenamiento
                  </span>
                </div>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  Acceso completo a nuestra biblioteca de rutinas, ya sea que
                  prefieras entrenar en casa o en el gimnasio. Diseñado para
                  todos los niveles.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
                  {mainPlanFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  size="lg"
                  className="w-full bg-black text-white hover:bg-gray-800 text-lg py-3"
                >
                  Comprar Plan Básico
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Promotion Plans Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Paquetes Promocionales
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Maximiza tus resultados con nuestros planes combinados.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {promotionPlans.map((plan, index) => {
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
                    >
                      Adquirir {plan.name}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Our Plans Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              ¿Por Qué Elegir Nuestros Planes?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Beneficios que te ayudarán a alcanzar tus metas de forma efectiva.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-black transition-colors group cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Flexibilidad Total</h3>
                <p className="text-gray-600">
                  Entrena en casa o en el gimnasio, adaptándonos a tu estilo de
                  vida y disponibilidad.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-black transition-colors group cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Dumbbell className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Resultados Comprobados
                </h3>
                <p className="text-gray-600">
                  Miles de clientes satisfechos han logrado sus objetivos con
                  nuestra metodología.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-black transition-colors group cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Soporte Constante</h3>
                <p className="text-gray-600">
                  Nuestro equipo de expertos te acompaña en cada paso de tu
                  transformación.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            ¿Listo Para Iniciar Tu Transformación?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a ti y comienza a construir la
            mejor versión de ti mismo con BLXCK Training.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6"
            >
              Comprar Mi Plan Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 bg-transparent"
            >
              Contactar Asesor
            </Button>
          </div>

          <div className="text-sm text-gray-400">
            Tu salud y bienestar son nuestra prioridad • Únete a la comunidad
            BLXCK
          </div>
        </div>
      </section>
    </div>
  );
}
