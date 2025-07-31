import { Button } from "../Components/Button";
import { Card, CardContent } from "../Components/Card";
import { Badge } from "../Components/Badge";
import {
  Play,
  Dumbbell,
  MapPin,
  Clock,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";
import Hero from "./Components/Hero";
import TrainingOptions from "./Components/TrainingOptions";
import Features from "./Components/Features";
import Cta from "./Components/Cta";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Training Options */}
      <TrainingOptions />

      {/* Features Section */}
      <Features />

      {/* CTA Section */}
      <Cta />
    </div>
  );
}
