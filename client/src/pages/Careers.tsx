import { useState, useEffect } from 'react';
import { Shield, Briefcase, MapPin, Clock, Loader2 } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  status: 'active' | 'inactive';
  postedDate: string;
}

export default function Careers() {
  const [openings, setOpenings] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobOpenings();
  }, []);

  const fetchJobOpenings = async () => {
    try {
      // Fetch active job openings from backend
      const response = await api.getJobOpenings();
      setOpenings(response.filter((job: JobOpening) => job.status === 'active'));
    } catch (error) {
      console.warn('Failed to fetch job openings, using empty state');
      setOpenings([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800/50 backdrop-blur-xl bg-gray-900/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">EchoFort</span>
            </div>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-white">Back to Home</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-blue-500/10 rounded-2xl mb-6">
            <Briefcase className="w-16 h-16 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Join the <span className="text-blue-400">EchoFort</span> Team
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Help us protect millions of Indians from scams and cyber fraud
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20 mb-16">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Our Mission</h2>
          <p className="text-gray-300 text-center text-lg">
            At EchoFort, we're building India's first AI-powered, self-evolving scam protection platform. 
            We believe everyone deserves to feel safe in the digital world. Join us in making that vision a reality.
          </p>
        </div>

        {/* Open Positions */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Current <span className="text-blue-400">Openings</span>
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
              <span className="ml-3 text-gray-400">Loading job openings...</span>
            </div>
          ) : openings.length > 0 ? (
            <div className="space-y-4">
              {openings.map((job) => (
                <div key={job.id} className="bg-gray-800/40 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                      <p className="text-gray-400 mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1 text-gray-500">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1 text-gray-500">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                          {job.experience}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Link href="/contact">
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/40 backdrop-blur-xl rounded-xl p-12 border border-gray-700/50 text-center">
              <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Open Positions</h3>
              <p className="text-gray-400 mb-6">
                We don't have any open positions at the moment, but we're always looking for talented people.
              </p>
              <Link href="/contact">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  Send Your Resume
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-16 bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Don't see a perfect fit?
          </h3>
          <p className="text-gray-300 mb-6">
            We're always looking for talented people. Send us your resume and tell us how you can contribute to our mission.
          </p>
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

