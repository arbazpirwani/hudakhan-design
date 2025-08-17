import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import Icon from '@/components/atoms/Icon';
import projectsData from '@/content/projects.json';
import { Project } from '@/types';
import { getImagePath } from '@/lib/utils';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return projectsData.projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projectsData.projects.find((p) => p.id === params.id);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Huda Khan Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: getImagePath(project.images.hero),
          width: 800,
          height: 600,
          alt: project.title,
        },
      ],
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projectsData.projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  const currentIndex = projectsData.projects.findIndex((p) => p.id === params.id);
  const nextProject = projectsData.projects[currentIndex + 1] || projectsData.projects[0];
  const prevProject = projectsData.projects[currentIndex - 1] || projectsData.projects[projectsData.projects.length - 1];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src={getImagePath(project.images.hero)}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>

        <div className="container-custom relative z-10 pt-20">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link href="/projects" className="text-purple-400 hover:text-purple-300 transition-colors">
                ← Back to Projects
              </Link>
            </nav>

            {/* Project Info */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                  {project.category}
                </span>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full">
                  {project.client}
                </span>
                <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full">
                  {project.year}
                </span>
              </div>

              <Text variant="h1" weight="bold" className="leading-tight">
                {project.title}
              </Text>

              <Text variant="body" color="secondary" className="text-xl max-w-3xl">
                {project.description}
              </Text>

              {project.metrics && (
                <div className="flex flex-wrap gap-6 pt-4">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <Text variant="h4" weight="bold" color="gradient">
                        {value}
                      </Text>
                      <Text variant="caption" color="secondary" className="uppercase">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Text>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge */}
              {project.challenge && (
                <div>
                  <Text variant="h3" weight="semibold" className="mb-6">
                    The Challenge
                  </Text>
                  <Text variant="body" color="secondary" className="leading-relaxed">
                    {project.challenge}
                  </Text>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div>
                  <Text variant="h3" weight="semibold" className="mb-6">
                    The Solution
                  </Text>
                  <Text variant="body" color="secondary" className="leading-relaxed">
                    {project.solution}
                  </Text>
                </div>
              )}

              {/* Impact */}
              {project.impact && (
                <div>
                  <Text variant="h3" weight="semibold" className="mb-6">
                    The Impact
                  </Text>
                  <Text variant="body" color="secondary" className="leading-relaxed">
                    {project.impact}
                  </Text>
                </div>
              )}

              {/* Gallery */}
              <div>
                <Text variant="h3" weight="semibold" className="mb-8">
                  Project Gallery
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.images.gallery.map((image, index) => (
                    <div key={index} className="aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={getImagePath(image)}
                        alt={`${project.title} - Image ${index + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Info */}
              <div className="card">
                <Text variant="h5" weight="semibold" className="mb-6">
                  Project Details
                </Text>
                <div className="space-y-4">
                  <div>
                    <Text variant="caption" color="secondary" className="uppercase mb-1">
                      Client
                    </Text>
                    <Text variant="body">{project.client}</Text>
                  </div>
                  <div>
                    <Text variant="caption" color="secondary" className="uppercase mb-1">
                      Year
                    </Text>
                    <Text variant="body">{project.year}</Text>
                  </div>
                  <div>
                    <Text variant="caption" color="secondary" className="uppercase mb-1">
                      Category
                    </Text>
                    <Text variant="body">{project.category}</Text>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              {project.technologies && (
                <div className="card">
                  <Text variant="h5" weight="semibold" className="mb-6">
                    Technologies Used
                  </Text>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonial */}
              {project.testimonial && (
                <div className="card">
                  <Text variant="h5" weight="semibold" className="mb-6">
                    Client Testimonial
                  </Text>
                  <blockquote className="space-y-4">
                    <Text variant="body" color="secondary" className="italic">
                      "{project.testimonial.quote}"
                    </Text>
                    <footer>
                      <Text variant="body" weight="medium">
                        {project.testimonial.author}
                      </Text>
                      <Text variant="caption" color="secondary">
                        {project.testimonial.position}
                      </Text>
                    </footer>
                  </blockquote>
                </div>
              )}

              {/* CTA */}
              <div className="card">
                <Text variant="h5" weight="semibold" className="mb-4">
                  Like this project?
                </Text>
                <Text variant="body" color="secondary" className="mb-6">
                  Let's discuss how I can help bring your vision to life.
                </Text>
                <Button
                  variant="primary"
                  href="/contact"
                  className="w-full"
                  icon={<Icon name="mail" size={20} />}
                >
                  Start a Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Navigation */}
      <section className="section-padding bg-gray-950">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Previous Project */}
            <Link
              href={`/projects/${prevProject.id}`}
              className="group card hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <Icon name="arrow-right" size={20} className="rotate-180" />
                <Text variant="caption" color="secondary" className="uppercase">
                  Previous Project
                </Text>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <Image
                  src={getImagePath(prevProject.images.thumbnail)}
                  alt={prevProject.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <Text variant="h5" weight="semibold" className="group-hover:text-gradient transition-colors">
                {prevProject.title}
              </Text>
              <Text variant="caption" color="secondary">
                {prevProject.category}
              </Text>
            </Link>

            {/* Next Project */}
            <Link
              href={`/projects/${nextProject.id}`}
              className="group card hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center justify-end gap-4 mb-4">
                <Text variant="caption" color="secondary" className="uppercase">
                  Next Project
                </Text>
                <Icon name="arrow-right" size={20} />
              </div>
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <Image
                  src={getImagePath(nextProject.images.thumbnail)}
                  alt={nextProject.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <Text variant="h5" weight="semibold" className="group-hover:text-gradient transition-colors">
                {nextProject.title}
              </Text>
              <Text variant="caption" color="secondary">
                {nextProject.category}
              </Text>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}