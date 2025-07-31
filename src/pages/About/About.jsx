import { Button } from "../Components/Button";
import { Card, CardContent } from "../Components/Card";
import { Badge } from "../Components/Badge";
import {
  Target,
  Heart,
  Users,
  Star,
  CheckCircle,
  Play,
  ArrowRight,
  Award,
  Shield,
  Globe,
  TrendingUp,
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Excelencia",
      description:
        "Nos comprometemos a ofrecer entrenamientos de la más alta calidad, basados en ciencia y resultados comprobados.",
    },
    {
      icon: Heart,
      title: "Pasión",
      description:
        "Amamos lo que hacemos. Cada rutina está diseñada con pasión para transformar vidas y crear hábitos saludables.",
    },
    {
      icon: Users,
      title: "Comunidad",
      description:
        "Creemos en el poder de entrenar juntos. Construimos una comunidad que se apoya y celebra cada logro.",
    },
    {
      icon: Shield,
      title: "Integridad",
      description:
        "Transparencia en nuestros métodos, honestidad en nuestras promesas y compromiso real con tu transformación.",
    },
  ];

  const methodology = [
    {
      icon: CheckCircle,
      title: "Enfoque Científico",
      description: "Basado en los últimos estudios de fisiología del ejercicio",
    },
    {
      icon: TrendingUp,
      title: "Progresión Inteligente",
      description: "Sistema de adaptación continua a tu evolución",
    },
    {
      icon: Globe,
      title: "Accesibilidad Global",
      description: "Diseñado para realizarse en cualquier lugar",
    },
    {
      icon: Award,
      title: "Certificaciones",
      description: "Metodología avalada por expertos en fitness",
    },
  ];

  const timeline = [
    {
      year: "2020",
      title: "Fundación",
      description:
        "Desarrollo de la metodología BLXCK basada en ciencia deportiva.",
    },
    {
      year: "2021",
      title: "Validación",
      description:
        "Pruebas exhaustivas y ajustes a nuestro sistema de entrenamiento.",
    },
    {
      year: "2022",
      title: "Lanzamiento Oficial",
      description: "Presentación pública de nuestros programas profesionales.",
    },
    {
      year: "2023",
      title: "Expansión Digital",
      description: "Implementación de plataformas para entrenamiento remoto.",
    },
    {
      year: "2024",
      title: "Innovación Continua",
      description:
        "Incorporación de nuevas tecnologías y técnicas de vanguardia.",
    },
  ];

  const scientificPrinciples = [
    {
      title: "Periodización",
      description: "Estructuración de ciclos para maximizar resultados",
    },
    {
      title: "Sobrecarga Progresiva",
      description: "Adaptación sistemática a cargas de trabajo",
    },
    {
      title: "Especificidad",
      description: "Entrenamientos diseñados para objetivos concretos",
    },
    {
      title: "Individualización",
      description: "Adaptación a características personales",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
                >
                  Nuestra Metodología
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Ciencia en Movimiento
                  <span className="block text-gray-300">Desde 2020</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  BLXCK Training se fundamenta en principios científicos del
                  ejercicio, combinados con pedagogía del movimiento para
                  resultados óptimos.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">
                    Diseñado por expertos en ciencias del deporte
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">
                    Validado por profesionales certificados
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">
                    Actualizado constantemente con las últimas investigaciones
                  </span>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6"
              >
                <Play className="mr-2 h-5 w-5" />
                Ver Demostración
              </Button>
            </div>

            <div className="relative">
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600"
                  alt="Análisis de movimiento"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-white font-semibold text-lg">
                      Método Científico
                    </div>
                    <div className="text-white/80 text-sm">
                      Resultados basados en evidencia
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Principles */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Principios Científicos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fundamentos que garantizan la efectividad de cada entrenamiento
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {scientificPrinciples.map((principle, index) => (
              <Card
                key={index}
                className="border-2 hover:border-black transition-colors"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{principle.title}</h3>
                  <p className="text-gray-600">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">
                Nuestro Enfoque
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Desarrollamos sistemas de entrenamiento que combinan lo mejor de
                la fisiología del ejercicio con pedagogía del movimiento,
                asegurando técnica perfecta y progresión constante.
              </p>
              <div className="space-y-4">
                {methodology.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border-2">
                <h3 className="text-2xl font-bold mb-4">
                  Fases del Entrenamiento
                </h3>
                <ol className="space-y-4 list-decimal list-inside text-gray-600">
                  <li className="font-medium">Evaluación inicial</li>
                  <li>Adaptación neuromuscular</li>
                  <li>Desarrollo de capacidades</li>
                  <li>Optimización del rendimiento</li>
                  <li>Mantenimiento especializado</li>
                </ol>
              </div>

              <div className="bg-black text-white p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Certificaciones</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    • NSCA-CPT (National Strength and Conditioning Association)
                  </li>
                  <li>• ACE (American Council on Exercise)</li>
                  <li>• FMS (Functional Movement Systems)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Pilares Fundamentales
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Los valores que guían cada aspecto de nuestra metodología
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card
                  key={index}
                  className="border-2 hover:border-black transition-colors group text-center"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Nuestra Evolución
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              El desarrollo de una metodología basada en ciencia y resultados
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-lg shadow-sm border-2 hover:border-black transition-colors">
                      <div className="text-2xl font-bold text-black mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-black rounded-full"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              Equipo Científico
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Profesionales dedicados al desarrollo continuo de la metodología
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold text-black mb-6">
                Expertos en Movimiento
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nuestro equipo multidisciplinario incluye fisiólogos del
                ejercicio, especialistas en biomecánica y entrenadores
                certificados con experiencia en alto rendimiento. Juntos
                desarrollamos los sistemas más efectivos y seguros.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-black" />
                  <span className="text-gray-700">
                    Promedio de 10 años de experiencia en el campo
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-black" />
                  <span className="text-gray-700">
                    Formación continua en las últimas técnicas
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-black" />
                  <span className="text-gray-700">
                    Compromiso con la excelencia en el entrenamiento
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
                alt="Análisis biomecánico"
                className="w-full h-64 object-cover rounded-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
                alt="Sesión de evaluación"
                className="w-full h-64 object-cover rounded-lg mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
                alt="Planificación de entrenamiento"
                className="w-full h-64 object-cover rounded-lg -mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
                alt="Revisión de técnica"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Descubre Nuestra Metodología
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experimenta un enfoque profesional del fitness basado en ciencia y
            resultados.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6"
            >
              Solicitar Demostración
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 bg-transparent"
            >
              Ver Programas
            </Button>
          </div>

          <div className="text-sm text-gray-400">
            Metodología certificada • Entrenamiento profesional • Resultados
            comprobables
          </div>
        </div>
      </section>
    </div>
  );
}
