import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, ChevronDown, ChevronUp } from "lucide-react";
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

  type CarouselApi,
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

  // Track carousel position for percentage display
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  // Track expanded descriptions
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: string]: boolean }>({});


  // Update current slide when carousel moves
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    // Call once to set initial position
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

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
      className="py-16 md:py-24 relative min-h-screen flex flex-col justify-center overflow-hidden"
      ref={projectsRef}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-purple-500/10 to-black/0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-3">
            <Badge className="bg-purple-500/10 text-purple-300 border-purple-500/20 backdrop-blur-sm px-4 py-1 text-xs font-medium">
              My Work
            </Badge>
          </div>
          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">
            Featured Projects
          </h2>
          <p className="section-description text-white/70 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Explore my latest works and contributions to the development
            community. Swipe or use the arrows to navigate.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-800/50 rounded-xl h-[420px] relative overflow-hidden border border-white/5"
              >
                <div className="h-48 bg-gray-700/50 mb-4"></div>
                <div className="px-6 space-y-4">
                  <div className="h-6 bg-gray-700/50 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-full"></div>
                  <div className="h-4 bg-gray-700/50 rounded w-5/6"></div>
                  <div className="flex gap-2 pt-2">
                    <div className="h-6 bg-gray-700/50 rounded w-16"></div>
                    <div className="h-6 bg-gray-700/50 rounded w-16"></div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <div className="h-8 bg-gray-700/50 rounded w-20"></div>
                    <div className="h-8 bg-gray-700/50 rounded w-20"></div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative px-4 sm:px-8 md:px-12 max-w-7xl mx-auto" ref={carouselRef}>
            <Carousel
              opts={{
                align: "start",
                loop: false,
                skipSnaps: false,
                containScroll: "trimSnaps",
              }}
              className="w-full"
              setApi={setApi}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {allProjects.map((project: Repository) => (
                  <CarouselItem
                    key={project.id}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <Card
                      key={project.id}
                      className="project-card clickable relative bg-gray-900/80 border border-white/5 hover:border-purple-500/20 rounded-xl overflow-hidden transform-gpu h-full transition-all duration-300"
                    >
                      {/* Gradient Border */}
                      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <CardContent className="p-0 h-full flex flex-col">
                        {/* Image with enhanced overlay */}
                        <div className="relative h-48 overflow-hidden group">
                          <img
                            src={project.openGraphImageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                          {/* Project name overlay for small screens */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 sm:hidden">
                            <h3 className="text-lg font-semibold text-white truncate">
                              {project.name}
                            </h3>
                          </div>
                        </div>

                        {/* Content with improved spacing and typography */}
                        <div className="p-5 sm:p-6 flex-1 flex flex-col">
                          <h3 className="hidden sm:block text-xl font-semibold text-white mb-2 hover:text-purple-400 transition-colors">
                            {project.name}
                          </h3>
                          <div className="mb-4 flex-1">
                            {project.description ? (
                              <div className="relative">
                                <p className={`text-gray-400 text-sm leading-relaxed ${!expandedDescriptions[project.id] ? 'line-clamp-2' : ''}`}>
                                  {project.description}
                                </p>
                                {project.description.length > 100 && (
                                  <button
                                    type="button"
                                    onClick={() => setExpandedDescriptions(prev => ({
                                      ...prev,
                                      [project.id]: !prev[project.id]
                                    }))}
                                    className="text-purple-400 text-xs mt-1 flex items-center hover:text-purple-300 transition-colors"
                                  >
                                    {expandedDescriptions[project.id] ? (
                                      <>
                                        Show less <ChevronUp className="w-3 h-3 ml-1" />
                                      </>
                                    ) : (
                                      <>
                                        Read more <ChevronDown className="w-3 h-3 ml-1" />
                                      </>
                                    )}
                                  </button>
                                )}
                              </div>
                            ) : (
                              <p className="text-gray-400 text-sm leading-relaxed">No description available</p>
                            )}
                          </div>

                          {/* Languages with enhanced badges */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.languages.nodes
                              .slice(0, 3)
                              .map((lang: Language) => (
                                <Badge
                                  key={lang.name}
                                  className="text-xs font-medium px-2.5 py-0.5"
                                  style={{
                                    backgroundColor: `${lang.color}15`,
                                    color: lang.color,
                                    borderColor: `${lang.color}30`,
                                  }}
                                >
                                  {lang.name}
                                </Badge>
                              ))}
                          </div>

                          {/* Topics with improved styling */}
                          <div className="flex flex-wrap gap-2 mb-4 max-h-[60px] overflow-hidden">
                            {project.repositoryTopics.nodes.length > 0 ? (
                              project.repositoryTopics.nodes.slice(0, 3).map(
                                ({ topic }, index) => (
                                  <span
                                    key={index}
                                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 transition-colors"
                                  >
                                    {topic.name}
                                  </span>
                                )
                              )
                            ) : (
                              <span className="text-xs text-gray-500">No topics available</span>
                            )}
                          </div>

                          {/* Stats and Links with improved styling */}
                          <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                            <div className="flex gap-4 text-gray-400 text-sm">
                              <span className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 text-yellow-400" />{" "}
                                {project.stargazerCount}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <GitFork className="w-4 h-4 text-blue-400" />{" "}
                                {project.forkCount}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              {project.url && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  asChild
                                  className="hover:bg-gray-800 hover:text-blue-400 transition-colors duration-300 rounded-full p-2 h-auto clickable"
                                >
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="View GitHub repository"
                                    className="cursor-none"
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
                                  className="hover:bg-gray-800 hover:text-purple-400 transition-colors duration-300 rounded-full p-2 h-auto clickable"
                                >
                                  <a
                                    href={project.homepageUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="View live project"
                                    className="cursor-none"
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
              <CarouselPrevious className="absolute -left-4 sm:-left-8 md:-left-12 top-1/2 -translate-y-1/2 size-10 sm:size-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 hover:bg-black/50 hover:border-purple-500/30 transition-all duration-300 group" />
              <CarouselNext className="absolute -right-4 sm:-right-8 md:-right-12 top-1/2 -translate-y-1/2 size-10 sm:size-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 hover:bg-black/50 hover:border-purple-500/30 transition-all duration-300 group" />
              <div className="mt-8 flex flex-col items-center justify-center">
                {/* Enhanced progress bar */}
                <div className="w-full max-w-md h-2 rounded-full overflow-hidden bg-gray-800 border border-white/5 relative">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${Math.round(((currentSlide + 1) / Math.max(allProjects.length, 1)) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between w-full max-w-md mt-2 text-xs">
                  <span className="text-white/50">Project {currentSlide + 1} of {allProjects.length}</span>
                  <span className="text-purple-400 font-medium">
                    {Math.round(((currentSlide + 1) / Math.max(allProjects.length, 1)) * 100)}% viewed
                  </span>
                </div>
              </div>
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
