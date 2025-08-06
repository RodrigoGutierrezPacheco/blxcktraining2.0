import * as React from "react"
import { User, ShieldCheck, Users } from 'lucide-react'


export function RegistrationSteps({ currentStep }) {
  const steps = [
    {
      id: 1,
      icon: User,
      title: "Paso 1",
      description: "Ingresa tus datos básicos para crear tu cuenta",
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: "Paso 2",
      description: "Sube tus certificaciones (Título, Cédula profesional, etc.)",
    },
    {
      id: 3,
      icon: Users,
      title: "Paso 3",
      description: "¡Listo! Crea rutinas personalizadas para tus clientes",
    },
  ]

  return (
    <div className="mb-6 w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-stretch relative">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-1 flex-col items-center relative z-10 py-4 md:py-0">
              {/* Step Icon and Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 shadow-md transition-colors duration-300
                  ${currentStep >= step.id ? "bg-black text-white" : "bg-gray-200 text-gray-600"}
                `}
              >
                <step.icon className="h-5 w-5" />
              </div>
              {/* Step Title and Description */}
              <div className="text-center flex-1 flex flex-col justify-center">
                <p
                  className={`text-sm font-semibold transition-colors duration-300 ${
                    currentStep >= step.id ? "text-black" : "text-gray-600"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 max-w-[120px] mx-auto mt-1">
                  {step.description}
                </p>
              </div>
            </div>
            {/* Line between steps */}
            {index < steps.length - 1 && (
              <>
                {/* Horizontal line for medium and larger screens */}
                <div className="hidden md:block flex-1 h-0.5 bg-gray-300 mx-2 self-center"></div>
                {/* Vertical line for small screens */}
                <div className="md:hidden w-0.5 h-8 bg-gray-300 mx-auto"></div>
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
