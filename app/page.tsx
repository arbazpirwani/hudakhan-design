import HeroSection from "@/src/presentation/components/organisms/HeroSection";
import ParallaxGallery from "@/src/presentation/components/organisms/ParallaxGallery";
import ServiceCard from "@/src/presentation/components/molecules/ServiceCard";
import ProjectTile from "@/src/presentation/components/molecules/ProjectTile";
import Text from "@/src/presentation/components/atoms/Text";
import Button from "@/src/presentation/components/atoms/Button";
import Icon from "@/src/presentation/components/atoms/Icon";
import portfolioConfig from "@/src/data/content/portfolio-config.json";
import projectsData from "@/src/data/content/projects.json";
import { getImagePath } from "@/src/presentation/utils/utils";
export default function Home() {
  const featuredProjects = projectsData.projects.filter(project => project.featured);

  return (
    <>
      {/* Hero Section */}
      <HeroSection personal={portfolioConfig.personal} />

      {/* Parallax Gallery */}
      <ParallaxGallery projects={projectsData.projects} />

      {/* Services Section */}
      <section className="section-padding bg-dynamic-background-secondary/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Text
              variant="overline"
              color="accent"
              className="mb-4"
            >
              Services
            </Text>
            <Text
              variant="h2"
              weight="bold"
              className="mb-6"
            >
              What I Do Best
            </Text>
            <Text
              variant="body"
              color="secondary"
              className="max-w-2xl mx-auto"
            >
              From brand identity to digital experiences, I craft solutions that 
              merge aesthetic excellence with strategic thinking.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {portfolioConfig.services.map((service, index) => (
              <ServiceCard 
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16">
            <div>
              <Text
                variant="overline"
                color="accent"
                className="mb-4"
              >
                Portfolio
              </Text>
              <Text
                variant="h2"
                weight="bold"
                className="mb-6"
              >
                Featured Projects
              </Text>
              <Text
                variant="body"
                color="secondary"
                className="max-w-lg"
              >
                Explore my most impactful work that drove real business results 
                and created meaningful user experiences.
              </Text>
            </div>

            <Button
              variant="secondary"
              href="/projects"
              icon={<Icon name="arrow-right" size={20} />}
              className="mt-6 lg:mt-0"
            >
              View All Projects
            </Button>
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

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <div className="container-custom text-center">
          <Text
            variant="h2"
            weight="bold"
            className="mb-6"
          >
            Ready to Create Something
            <span className="text-gradient block">Amazing Together?</span>
          </Text>
          <Text
            variant="body"
            color="secondary"
            className="mb-8 max-w-2xl mx-auto"
          >
            Let's discuss your project and bring your vision to life with 
            thoughtful design and strategic thinking.
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
              href={getImagePath(portfolioConfig.personal.resume)}
              external
              icon={<Icon name="download" size={20} />}
            >
              Download Resume
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
