import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { supabase, isMockMode } from '../lib/supabase';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const subjectOptions = [
    { value: '', label: t('contact.form.subject.placeholder') },
    { value: 'general', label: t('contact.form.subject.options.general') },
    { value: 'support', label: t('contact.form.subject.options.support') },
    { value: 'founding', label: t('contact.form.subject.options.founding') },
    { value: 'partnership', label: t('contact.form.subject.options.partnership') },
    { value: 'press', label: t('contact.form.subject.options.press') },
    { value: 'other', label: t('contact.form.subject.options.other') },
  ];

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.name.required');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.email.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.form.email.invalid');
    }

    if (!formData.subject) {
      newErrors.subject = t('contact.form.subject.required');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.message.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (isMockMode) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const { error } = await supabase!
          .from('contact_submissions')
          .insert([{
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }]);

        if (error) throw error;

        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f]">
      <Nav />
      <main id="main-content" className="pt-24 pb-16 px-6">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12">
            {t('contact.subtitle')}
          </p>

          {submitStatus === 'success' ? (
            <div className="
              bg-[#00d4aa]/10 
              border border-[#00d4aa]/30 
              rounded-xl p-6 text-center
            ">
              <p className="text-[#00d4aa] font-medium">
                {t('contact.form.success')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label={t('contact.form.name.label')}
                placeholder={t('contact.form.name.placeholder')}
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                error={errors.name}
                required
              />

              <Input
                label={t('contact.form.email.label')}
                type="email"
                placeholder={t('contact.form.email.placeholder')}
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                error={errors.email}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.subject.label')} *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="
                    w-full px-4 py-3 rounded-lg border
                    bg-white dark:bg-[#1a1a2e]
                    text-gray-900 dark:text-white
                    border-gray-300 dark:border-[#2a2a4e]
                    focus:outline-none focus:ring-2 focus:ring-[#4F7DF3] focus:border-transparent
                  "
                  required
                >
                  {subjectOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.message.label')} *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder={t('contact.form.message.placeholder')}
                  rows={5}
                  className="
                    w-full px-4 py-3 rounded-lg border resize-none
                    bg-white dark:bg-[#1a1a2e]
                    text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    border-gray-300 dark:border-[#2a2a4e]
                    focus:outline-none focus:ring-2 focus:ring-[#4F7DF3] focus:border-transparent
                  "
                  required
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg">
                  <p className="text-red-600 dark:text-red-400 text-sm">
                    {t('contact.form.error')}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
