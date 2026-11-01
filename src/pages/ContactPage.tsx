import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  Clock,
  Globe,
  ShieldCheck,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'General Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    note: string;
    contactEmail: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, valid email address, and inquiry message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmitResult({
        success: true,
        note: data.note,
        contactEmail: data.contactEmail || 'singhjagriti200328@gmail.com'
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to submit contact form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Bar */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/80">
            CONNECT WITH THE PLATFORM TEAM
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact QOVYRA Engineering
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Have questions about industrial integration, academic curriculum licensing, or quality tool implementations? Our engineering team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Direct Contact & Information Dossier */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider border-b border-slate-800 pb-3">
              Official Contact Points
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                  Primary Engineering Contact Email:
                </span>
                <a
                  href="mailto:singhjagriti200328@gmail.com"
                  className="text-sm font-bold text-white hover:text-cyan-300 font-mono transition-colors block break-all"
                >
                  singhjagriti200328@gmail.com
                </a>
                <span className="text-[10px] text-slate-500">
                  Monitored 24/7 for technical & academic inquiries.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  Technical Support Hours:
                </span>
                <div className="text-slate-200 font-mono">08:00 - 20:00 UTC (Monday - Saturday)</div>
                <div className="text-[10px] text-slate-500">Global response time typically &lt; 4 hours.</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  Platform Architecture:
                </span>
                <div className="text-slate-200">Cloud Run / Google AI Studio Node</div>
                <div className="text-[10px] text-slate-500 font-mono">Service ID: 8853e3f4</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-300 leading-relaxed font-mono">
              <ShieldCheck className="w-4 h-4 text-cyan-400 mb-1" />
              For high-priority enterprise deployment or academic institution partnership inquiries, direct emails to <span className="text-white font-bold">singhjagriti200328@gmail.com</span> receive expedited review.
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span>Send an Engineering Message</span>
            </h3>

            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-950/50 border border-rose-800 text-xs text-rose-300 flex items-center gap-2 font-mono">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {submitResult ? (
              <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/50 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2.5 text-cyan-400 font-mono font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  <span>Inquiry Validated by QOVYRA Gateway</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
                  <div className="text-slate-200 font-semibold font-mono text-[11px] uppercase text-cyan-300">
                    Backend Notification Status:
                  </div>
                  <p>{submitResult.note}</p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={`mailto:${submitResult.contactEmail}?subject=${encodeURIComponent(
                      formData.subject || 'QOVYRA Inquiry'
                    )}&body=${encodeURIComponent(formData.message)}`}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>Launch Direct Email Client ({submitResult.contactEmail})</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => {
                      setSubmitResult(null);
                      setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        category: 'General Inquiry',
                        message: ''
                      });
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl glass-panel text-slate-300 hover:text-white text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Robert Chen"
                      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. r.chen@engineering.edu"
                      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="General Inquiry">General Quality Engineering Inquiry</option>
                      <option value="Virtual Factory 3D">3D Virtual Factory & Digital Twin</option>
                      <option value="Academic Curriculum">Academic Learning Hub & Exams</option>
                      <option value="Industrial Deployment">Industry 4.0 Pilot Deployment</option>
                      <option value="Report Defect / Bug">Bug or Calibration Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Automotive Cpk Tool Inquiry"
                      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, technical requirements, or question..."
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Direct recipient: singhjagriti200328@gmail.com
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
                  >
                    <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
