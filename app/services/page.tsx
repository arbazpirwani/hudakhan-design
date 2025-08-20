import { Metadata } from 'next';
import Text from '@/src/presentation/components/atoms/Text';
import Button from '@/src/presentation/components/atoms/Button';
import Icon from '@/src/presentation/components/atoms/Icon';
import ServiceCard from '@/src/presentation/components/molecules/ServiceCard';
import portfolioConfig from '@/src/data/content/portfolio-config.json';

export const metadata: Metadata = {
  title: 'Services - Huda Khan Portfolio',
  description: 'Professional design services including brand identity, UI/UX design, packaging design, and motion graphics. Let\'s bring your vision to life.',
};

export default function ServicesPage() {
  const { services } = portfolioConfig;

  const processSteps = [
    {
      number: '01',
      title: 'Discovery & Strategy',
      description: 'Understanding your business goals, target audience, and project requirements through detailed consultation.',
      deliverables: ['Project Brief', 'Market Research', 'Strategy Document']
    },
    {
      number: '02',
      title: 'Concept & Design',
      description: 'Creating initial concepts and design directions based on the strategic foundation.',
      deliverables: ['Mood Boards', 'Wireframes', 'Initial Concepts']
    },
    {
      number: '03',
      title: 'Development & Refinement',
      description: 'Developing the chosen concept into polished design solutions with multiple iterations.',
      deliverables: ['Design Mockups', 'Prototypes', 'Revisions']
    },
    {
      number: '04',
      title: 'Delivery & Support',
      description: 'Final delivery with all assets, guidelines, and ongoing support for implementation.',
      deliverables: ['Final Assets', 'Brand Guidelines', 'Implementation Support']
    }
  ];

  const pricing = [
    {
      title: 'Brand Identity',
      price: 'From $2,500',
      duration: '2-4 weeks',
      features: [
        'Logo Design & Variations',
        'Brand Guidelines',
        'Color Palette & Typography',
        'Business Card Design',
        'Basic Stationery'
      ]
    },
    {
      title: 'UI/UX Design',
      price: 'From $3,500',
      duration: '3-6 weeks',
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'UI Design System',
        'Responsive Design',
        'Usability Testing'
      ]
    },
    {
      title: 'Packaging Design',
      price: 'From $1,800',
      duration: '2-3 weeks',
      features: [
        'Package Structure Design',
        'Label & Graphics Design',
        '3D Mockups',
        'Print-Ready Files',
        'Packaging Guidelines'
      ]
    }
  ];

  const tools = [
    'Figma', 'Adobe Creative Suite', 'Sketch', 'Principle', 'After Effects', 
    'Cinema 4D', 'Miro', 'Notion', 'Zeplin', 'Framer'
  ];

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
              Services
            </Text>
            <Text
              variant="h1"
              weight="bold"
              className="mb-6 leading-tight"
            >
              Design Services That
              <span className="text-gradient block">Drive Results</span>
            </Text>
            <Text
              variant="body"
              color="secondary"
              className="text-xl leading-relaxed max-w-3xl mx-auto"
            >
              From brand identity to digital experiences, I help businesses create 
              meaningful connections with their audiences through strategic design.
            </Text>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-dynamic-background-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Text
              variant="h2"
              weight="bold"
              className="mb-6"
            >
              My Design Process
            </Text>
            <Text
              variant="body"
              color="secondary"
              className="max-w-2xl mx-auto"
            >
              A structured approach that ensures every project delivers maximum impact 
              for your business while staying on time and budget.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="card text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-dynamic-accent to-dynamic-accent-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Text variant="h5" weight="bold" color="primary">
                      {step.number}
                    </Text>
                  </div>
                  <Text variant="h5" weight="semibold" className="mb-4">
                    {step.title}
                  </Text>
                  <Text variant="body" color="secondary" className="mb-6">
                    {step.description}
                  </Text>
                  <div className="space-y-2">
                    {step.deliverables.map((deliverable, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-dynamic-text-secondary">
                        <div className="w-1.5 h-1.5 rounded-full bg-dynamic-accent flex-shrink-0" />
                        <span>{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connector line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-8 h-px bg-dynamic-accent/30 transform translate-x-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding bg-dynamic-background-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Text
              variant="h2"
              weight="bold"
              className="mb-6"
            >
              Investment & Pricing
            </Text>
            <Text
              variant="body"
              color="secondary"
              className="max-w-2xl mx-auto"
            >
              Transparent pricing for quality design work. All packages include 
              revisions, consultations, and post-project support.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((package_, index) => (
              <div key={index} className="card relative group hover:scale-105 transition-transform duration-300">
                <Text variant="h4" weight="semibold" className="mb-2">
                  {package_.title}
                </Text>
                <Text variant="h3" weight="bold" color="gradient" className="mb-4">
                  {package_.price}
                </Text>
                <Text variant="caption" color="secondary" className="mb-6">
                  Timeline: {package_.duration}
                </Text>
                
                <div className="space-y-3 mb-8">
                  {package_.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Icon name="heart" size={16} color="rgb(139, 92, 246)" />
                      <Text variant="body" color="secondary">
                        {feature}
                      </Text>
                    </div>
                  ))}
                </div>

                <Button
                  variant="secondary"
                  href="/contact"
                  className="w-full group-hover:bg-dynamic-accent group-hover:text-dynamic-text-primary transition-colors"
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Text variant="body" color="secondary" className="mb-6">
              Need a custom package? Let's discuss your specific requirements.
            </Text>
            <Button
              variant="primary"
              href="/contact"
              icon={<Icon name="mail" size={20} />}
            >
              Request Custom Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Text
              variant="h2"
              weight="bold"
              className="mb-6"
            >
              Tools & Technologies
            </Text>
            <Text
              variant="body"
              color="secondary"
              className="max-w-2xl mx-auto"
            >
              I work with industry-standard tools to ensure the highest quality 
              and seamless collaboration throughout the project.
            </Text>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-dynamic-background-tertiary text-dynamic-text-secondary rounded-full hover:bg-dynamic-accent hover:text-dynamic-text-primary transition-colors duration-300"
              >
                <Text variant="body" weight="medium">
                  {tool}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-dynamic-accent/20 to-dynamic-accent-secondary/20">
        <div className="container-custom text-center">
          <Text
            variant="h2"
            weight="bold"
            className="mb-6"
          >
            Ready to Start Your Project?
          </Text>
          <Text
            variant="body"
            color="secondary"
            className="mb-8 max-w-2xl mx-auto"
          >
            Let's discuss your project requirements and create something amazing together. 
            I'm currently accepting new projects for Q4 2024.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              href="/contact"
              icon={<Icon name="mail" size={20} />}
            >
              Start Your Project
            </Button>
            <Button
              variant="secondary"
              href="/projects"
              icon={<Icon name="eye" size={20} />}
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}