import { Metadata } from 'next';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import ContactForm from '@/components/organisms/ContactForm';
import SocialLink from '@/components/molecules/SocialLink';
import portfolioConfig from '@/content/portfolio-config.json';

export const metadata: Metadata = {
  title: 'Contact - Huda Khan Portfolio',
  description: 'Let\'s collaborate on your next design project. Get in touch to discuss brand identity, UI/UX design, packaging, and more.',
};

export default function ContactPage() {
  const { personal, social } = portfolioConfig;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Text
              variant="overline"
              color="accent"
              className="mb-4"
            >
              Contact
            </Text>
            <Text
              variant="h1"
              weight="bold"
              className="mb-6 leading-tight"
            >
              Let's Create Something
              <span className="text-gradient block">Amazing Together</span>
            </Text>
            <Text
              variant="body"
              color="secondary"
              className="text-xl leading-relaxed max-w-3xl mx-auto"
            >
              Ready to bring your vision to life? I'm here to help you create 
              impactful designs that drive real results for your business.
            </Text>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding bg-dynamic-background-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name="mail" size={32} color="rgb(255, 255, 255)" />
              </div>
              <Text variant="h5" weight="semibold" className="mb-3">
                Email Me
              </Text>
              <Text variant="body" color="secondary" className="mb-6">
                For project inquiries and collaborations
              </Text>
              <Button
                variant="secondary"
                href={`mailto:${personal.email}`}
                external
                className="w-full"
              >
                {personal.email}
              </Button>
            </div>

            {/* WhatsApp */}
            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name="phone" size={32} color="rgb(255, 255, 255)" />
              </div>
              <Text variant="h5" weight="semibold" className="mb-3">
                WhatsApp
              </Text>
              <Text variant="body" color="secondary" className="mb-6">
                For quick questions and urgent projects
              </Text>
              <Button
                variant="secondary"
                href={social.whatsapp}
                external
                className="w-full"
              >
                {personal.phone}
              </Button>
            </div>

            {/* LinkedIn */}
            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name="linkedin" size={32} color="rgb(255, 255, 255)" />
              </div>
              <Text variant="h5" weight="semibold" className="mb-3">
                LinkedIn
              </Text>
              <Text variant="body" color="secondary" className="mb-6">
                Let's connect professionally
              </Text>
              <Button
                variant="secondary"
                href={social.linkedin}
                external
                className="w-full"
              >
                Connect
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Availability */}
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <Text variant="h5" weight="semibold">
                    Currently Available
                  </Text>
                </div>
                <Text variant="body" color="secondary" className="mb-4">
                  I'm accepting new projects and collaborations for Q4 2024 and Q1 2025.
                </Text>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Text variant="caption" color="secondary">Response Time:</Text>
                    <Text variant="caption">Within 24 hours</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text variant="caption" color="secondary">Project Start:</Text>
                    <Text variant="caption">2-4 weeks</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text variant="caption" color="secondary">Time Zone:</Text>
                    <Text variant="caption">PKT (UTC+5)</Text>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="card">
                <Text variant="h5" weight="semibold" className="mb-6">
                  What I Can Help With
                </Text>
                <div className="space-y-3">
                  {portfolioConfig.services.map((service) => (
                    <div key={service.id} className="flex items-center gap-3">
                      <Icon name={service.icon as any} size={20} color="rgb(147, 51, 234)" />
                      <Text variant="body">{service.title}</Text>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="card">
                <Text variant="h5" weight="semibold" className="mb-6">
                  Frequently Asked
                </Text>
                <div className="space-y-4">
                  <div>
                    <Text variant="body" weight="medium" className="mb-2">
                      What's your typical project timeline?
                    </Text>
                    <Text variant="caption" color="secondary">
                      Most projects take 2-8 weeks depending on scope and complexity.
                    </Text>
                  </div>
                  <div>
                    <Text variant="body" weight="medium" className="mb-2">
                      Do you work with international clients?
                    </Text>
                    <Text variant="caption" color="secondary">
                      Yes! I work with clients globally and am flexible with time zones.
                    </Text>
                  </div>
                  <div>
                    <Text variant="body" weight="medium" className="mb-2">
                      Can you handle rush projects?
                    </Text>
                    <Text variant="caption" color="secondary">
                      Yes, for urgent projects with additional rush fees.
                    </Text>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="card">
                <Text variant="h5" weight="semibold" className="mb-6">
                  Follow My Work
                </Text>
                <div className="flex gap-4">
                  <SocialLink
                    href={social.linkedin}
                    icon="linkedin"
                    label="LinkedIn"
                    size="lg"
                    variant="filled"
                  />
                  <SocialLink
                    href={social.behance}
                    icon="external-link"
                    label="Behance"
                    size="lg"
                    variant="filled"
                  />
                  <SocialLink
                    href={social.email}
                    icon="mail"
                    label="Email"
                    size="lg"
                    variant="filled"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-purple-900/20 to-pink-500/20">
        <div className="container-custom text-center">
          <Text
            variant="h2"
            weight="bold"
            className="mb-6"
          >
            Not Ready to Start Yet?
          </Text>
          <Text
            variant="body"
            color="secondary"
            className="mb-8 max-w-2xl mx-auto"
          >
            That's perfectly fine! Feel free to explore my work, download my resume, 
            or connect with me on social media to stay updated.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              href="/projects"
              icon={<Icon name="eye" size={20} />}
            >
              View My Work
            </Button>
            <Button
              variant="secondary"
              href={personal.resume}
              external
              icon={<Icon name="download" size={20} />}
            >
              Download Resume
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}