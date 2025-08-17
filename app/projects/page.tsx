import { Metadata } from 'next';
import Text from '@/components/atoms/Text';
import ProjectTile from '@/components/molecules/ProjectTile';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import projectsData from '@/content/projects.json';

export const metadata: Metadata = {
  title: 'Projects - Huda Khan Portfolio',
  description: 'Explore my portfolio of impactful design work including the viral Easy Khata app, premium FMCG packaging, and B2B platform designs.',
};

export default function ProjectsPage() {
  const { projects } = projectsData;
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

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
              Portfolio
            </Text>
            <Text
              variant="h1"
              weight="bold"
              className="mb-6 leading-tight"
            >
              My <span className="text-gradient">Design Journey</span>
            </Text>
            <Text
              variant="body"
              color="secondary"
              className="text-xl leading-relaxed max-w-3xl mx-auto mb-8"
            >
              Explore projects that combine strategic thinking with beautiful design, 
              each solving real problems and delivering measurable impact for businesses and users.
            </Text>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              <div className="text-center">
                <Text variant="h3" weight="bold" color="gradient">
                  6
                </Text>
                <Text variant="caption" color="secondary" className="uppercase">
                  Projects
                </Text>
              </div>
              <div className="text-center">
                <Text variant="h3" weight="bold" color="gradient">
                  3M+
                </Text>
                <Text variant="caption" color="secondary" className="uppercase">
                  Downloads
                </Text>
              </div>
              <div className="text-center">
                <Text variant="h3" weight="bold" color="gradient">
                  300M
                </Text>
                <Text variant="caption" color="secondary" className="uppercase">
                  PKR Revenue
                </Text>
              </div>
              <div className="text-center">
                <Text variant="h3" weight="bold" color="gradient">
                  4+
                </Text>
                <Text variant="caption" color="secondary" className="uppercase">
                  Years
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-gray-950">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Text
                variant="h2"
                weight="bold"
                className="mb-4"
              >
                Featured Projects
              </Text>
              <Text
                variant="body"
                color="secondary"
              >
                My most impactful work that drove real business results
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectTile 
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="mb-12">
              <Text
                variant="h2"
                weight="bold"
                className="mb-4"
              >
                More Projects
              </Text>
              <Text
                variant="body"
                color="secondary"
              >
                Additional work showcasing diverse design capabilities
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProjects.map((project, index) => (
                <ProjectTile 
                  key={project.id}
                  project={project}
                  index={index + featuredProjects.length}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <div className="container-custom text-center">
          <Text
            variant="h2"
            weight="bold"
            className="mb-6"
          >
            Ready to Start Your
            <span className="text-gradient block">Next Project?</span>
          </Text>
          <Text
            variant="body"
            color="secondary"
            className="mb-8 max-w-2xl mx-auto"
          >
            Let's collaborate to create something amazing that drives real results for your business.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              href="/contact"
              magnetic
              icon={<Icon name="mail" size={20} />}
            >
              Start a Project
            </Button>
            <Button
              variant="secondary"
              href="/about"
              icon={<Icon name="users" size={20} />}
            >
              Learn About Me
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}