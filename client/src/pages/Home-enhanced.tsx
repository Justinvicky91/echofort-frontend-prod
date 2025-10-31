import { motion } from "framer-motion";
import { Shield, Phone, Users, Scale, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

export default function Home() {
  const features = [
    {
      icon: Phone,
      title: "Call Screening",
      description: "Real-time scam detection with 99.9% accuracy",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Family Protection",
      description: "Protect up to 5 family members with GPS tracking",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Scale,
      title: "Legal Action",
      description: "File complaints in 2 minutes with AI assistance",
      gradient: "from-yellow-500 to-amber-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <motion.div
        className="container mx-auto px-4 py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <motion.h1
            className="text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            Stop Scams Before They Start
          </motion.h1>
          <motion.p
            className="text-2xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            AI-Powered Protection for Your Family
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started Free
            </Button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
