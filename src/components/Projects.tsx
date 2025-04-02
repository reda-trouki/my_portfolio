import { useEffect } from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";
import { gql, useQuery } from "@apollo/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Language from "@/interfaces/Language";
import Repository from "@/interfaces/Repository";
import { Badge } from "./ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProgress,
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const GET_REPOS = gql`
  query GetRepos {
    user(login: "reda-trouki") {
      repositories(
        first: 100
        privacy: PUBLIC
        isFork: false
        ownerAffiliations: [OWNER]
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        nodes {
          id
          name
          description
          url
          homepageUrl
          stargazerCount
          forkCount
          openGraphImageUrl
          primaryLanguage {
            name
            color
          }
          languages(first: 100) {
            nodes {
              name
              color
            }
          }
          repositoryTopics(first: 100) {
            nodes {
              topic {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const Projects = () => {
  const projectsRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(projectsRef, { once: true });
  const { loading, error, data } = useQuery(GET_REPOS);

  useEffect(() => {
    if (data) {
      console.log("Projects data:", data.user.repositories.nodes);
    }
  }, [data]);

  useEffect(() => {
    if (isInView && projectsRef.current) {
      // Animate section title and description
      gsap
        .timeline()
        .from(".section-title", {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
        .from(
          ".section-description",
          {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          carouselRef.current,
          {
            scale: 0.95,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5"
        );

      // Create hover effect for project cards
      const projectCards = gsap.utils.toArray(".project-card");
      projectCards.forEach((card: any) => {
        const tl = gsap.timeline({ paused: true });
        tl.to(card, {
          y: -10,
          duration: 0.3,
          ease: "power2.out",
          boxShadow: "0 10px 30px -15px rgba(139, 92, 246, 0.3)",
        });

        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
      });
    }
  }, [isInView, data]);

  if (error) {
    return (
      <section className="py-20 text-center text-red-500">
        Error loading projects. Please try again later.
      </section>
    );
  }

  // Filter out the special username repository
  const allProjects = (data?.user?.repositories?.nodes || []).filter(
    (project: Repository) => project.name.toLowerCase() !== "reda-trouki"
  );

  return (
    <section
      id="projects"
      className="py-20 relative min-h-screen flex flex-col justify-center"
      ref={projectsRef}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-purple-500/5 to-black/0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">
            Featured Projects
          </h2>
          <p className="section-description text-white/60 max-w-2xl mx-auto text-lg">
            Explore my latest works and contributions to the development
            community.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-white/5 rounded-xl h-96 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative px-4 sm:px-8 md:px-12" ref={carouselRef}>
            <Carousel
              opts={{
                align: "start",
                loop: false,
                skipSnaps: false,
                containScroll: "trimSnaps",
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {allProjects.map((project: Repository) => (
                  <CarouselItem
                    key={project.id}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <Card
                      key={project.id}
                      className="project-card clickable relative bg-gray-900/80 border-none rounded-xl overflow-hidden transform-gpu"
                    >
                      {/* Gradient Border */}
                      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />

                      <CardContent className="p-0 h-full flex flex-col">
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={project.openGraphImageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-semibold text-white mb-2 hover:text-purple-400 transition-colors">
                            {project.name}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
                            {project.description}
                          </p>

                          {/* Languages */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.languages.nodes
                              .slice(0, 3)
                              .map((lang: Language) => (
                                <Badge
                                  key={lang.name}
                                  className="text-xs"
                                  style={{
                                    backgroundColor: `${lang.color}20`,
                                    color: lang.color,
                                  }}
                                >
                                  {lang.name}
                                </Badge>
                              ))}
                          </div>

                          {/* Topics */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.repositoryTopics.nodes.map(
                              ({ topic }, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 hover:bg-white/20 transition-colors backdrop-blur-sm"
                                >
                                  {topic.name}
                                </span>
                              )
                            )}
                          </div>

                          {/* Stats and Links */}
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex gap-4 text-gray-400 text-sm">
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4" />{" "}
                                {project.stargazerCount}
                              </span>
                              <span className="flex items-center gap-1">
                                <GitFork className="w-4 h-4" />{" "}
                                {project.forkCount}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              {project.url && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  asChild
                                  className="hover:bg-gray-800 hover:text-blue-400 cursor-none "
                                >
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Github className="w-5 h-5" />
                                  </a>
                                </Button>
                              )}
                              {project.homepageUrl && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  asChild
                                  className="hover:bg-gray-800 hover:text-blue-400 cursor:none"
                                >
                                  <a
                                    href={project.homepageUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{opacity: 1, transform: "none", cursor: "none"}}
                                  >
                                    <ExternalLink className="w-5 h-5" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 size-12 rounded-full bg-black/20 backdrop-blur-sm border-none hover:bg-black/40 transition-all duration-300 group" />
              <CarouselNext className="absolute -right-12 md:-right-16 top-1/2 -translate-y-1/2 size-12 rounded-full bg-black/20 backdrop-blur-sm border-none hover:bg-black/40 transition-all duration-300 group" />
              <CarouselProgress className="absolute -bottom-10 left-1/2 transform -translate-x-1/2" />
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
