import { Metadata } from 'next';
import Image from 'next/image';
import Text from '@/src/presentation/components/atoms/Text';
import Button from '@/src/presentation/components/atoms/Button';
import Icon from '@/src/presentation/components/atoms/Icon';
import StatCounter from '@/src/presentation/components/molecules/StatCounter';
import portfolioConfig from '@/src/data/content/portfolio-config.json';
import { getImagePath } from '@/src/presentation/utils/utils';

export const metadata: Metadata = {
  title: 'About - Huda Khan Portfolio',
  description: 'Learn about Huda Khan, Senior Brand Designer with 4+ years of experience creating impactful digital experiences that drive business results.',
};

export default function AboutPage() {
  const { personal } = portfolioConfig;

  const skills = [
    { name: 'Brand Identity Design', level: 95 },
    { name: 'UI/UX Design', level: 90 },
    { name: 'Packaging Design', level: 88 },
    { name: 'Motion Graphics', level: 85 },
    { name: 'Design Systems', level: 92 },
    { name: 'User Research', level: 80 },
  ];

  const experience = [
    {
      year: '2024',
      title: 'Senior Brand Designer',
      company: 'Bazaar Technologies',
      description: 'Leading design initiatives across multiple product lines, contributing to 300M PKR revenue milestone.'
    },
    {
      year: '2023',
      title: 'Brand Designer II',
      company: 'Bazaar Technologies',
      description: 'Promoted to lead the Easy Khata app design that achieved 3M+ downloads and #1 trending status.'
    },
    {
      year: '2021',
      title: 'Brand Designer I',
      company: 'Bazaar Technologies',
      description: 'Started my journey in tech, designing for Pakistan\'s leading B2B e-commerce platform.'
    },
  ];

  const achievements = [
    {
      icon: 'trending-up' as const,
      title: 'Viral App Success',
      description: 'Led design for Easy Khata app - 3M+ downloads, #1 trending on Google Play'
    },
    {
      icon: 'zap' as const,
      title: 'Revenue Impact',
      description: 'Design initiatives contributed to 300M PKR revenue milestone for company'
    },
    {
      icon: 'users' as const,
      title: 'User Impact',
      description: 'Created experiences that positively impacted 100K+ active users'
    },
    {
      icon: 'award' as const,
      title: 'Industry Recognition',
      description: '4+ years of consistent design excellence in competitive market'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <Text
                variant="overline"
                color="accent"
                className="mb-4"
              >
                About Me
              </Text>
              <Text
                variant="h1"
                weight="bold"
                className="mb-6 leading-tight"
              >
                Creating Impact Through
                <span className="text-gradient block">Thoughtful Design</span>
              </Text>
              <Text
                variant="body"
                color="secondary"
                className="text-xl leading-relaxed mb-8"
              >
                {personal.bio} I believe that great design goes beyond aesthetics – 
                it solves real problems and creates meaningful connections between brands and people.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  href="/contact"
                  icon={<Icon name="mail" size={20} />}
                >
                  Let's Work Together
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

            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-dynamic-accent/20 to-dynamic-accent-secondary/20 p-4">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src={getImagePath("/huda-khan-profile.jpg")}
                    alt={personal.name}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-dynamic-accent to-dynamic-accent-secondary rounded-full opacity-20 animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-purple-500/30 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-dynamic-background-secondary">
        <div className="container-custom">
          <Text
            variant="h2"
            weight="bold"
            className="text-center mb-16"
          >
            Impact by Numbers
          </Text>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter
              value="3M+"
              label="App Downloads"
              icon="trending-up"
              delay={0}
            />
            <StatCounter
              value="300M"
              label="PKR Revenue"
              icon="zap"
              delay={200}
            />
            <StatCounter
              value="4+"
              label="Years Experience"
              icon="award"
              delay={400}
            />
            <StatCounter
              value="100K+"
              label="Users Impacted"
              icon="users"
              delay={600}
            />
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Text
              variant="h2"
              weight="bold"
              className="text-center mb-16"
            >
              My Journey
            </Text>
            <div className="space-y-8">
              {experience.map((item, index) => (
                <div key={index} className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-20 text-right">
                    <Text variant="h4" weight="bold" color="gradient">
                      {item.year}
                    </Text>
                  </div>
                  <div className="flex-shrink-0 w-px h-16 bg-purple-500 mt-2" />
                  <div className="flex-1 card">
                    <Text variant="h5" weight="semibold" className="mb-2">
                      {item.title}
                    </Text>
                    <Text variant="body" color="accent" className="mb-3">
                      {item.company}
                    </Text>
                    <Text variant="body" color="secondary">
                      {item.description}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding bg-dynamic-background-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Skills */}
            <div>
              <Text
                variant="h2"
                weight="bold"
                className="mb-8"
              >
                Core Skills
              </Text>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <Text variant="body" weight="medium">
                        {skill.name}
                      </Text>
                      <Text variant="caption" color="accent">
                        {skill.level}%
                      </Text>
                    </div>
                    <div className="w-full bg-dynamic-background-tertiary rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-dynamic-accent to-dynamic-accent-secondary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <Text
                variant="h2"
                weight="bold"
                className="mb-8"
              >
                Key Achievements
              </Text>
              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-dynamic-accent to-dynamic-accent-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={achievement.icon} size={24} color="white" />
                    </div>
                    <div>
                      <Text variant="body" weight="semibold" className="mb-2">
                        {achievement.title}
                      </Text>
                      <Text variant="body" color="secondary">
                        {achievement.description}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
            Ready to Create Together?
          </Text>
          <Text
            variant="body"
            color="secondary"
            className="mb-8 max-w-2xl mx-auto"
          >
            I'm always excited to work on new challenges and help businesses 
            achieve their goals through thoughtful design.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              href="/contact"
              icon={<Icon name="mail" size={20} />}
            >
              Start a Project
            </Button>
            <Button
              variant="secondary"
              href="/projects"
              icon={<Icon name="eye" size={20} />}
            >
              View My Work
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}