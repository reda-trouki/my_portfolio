import Language from "./Language";

interface Repository {
    id: string;
    name: string;
    description: string;
    url: string;
    homepageUrl: string;
    stargazerCount: number;
    forkCount: number;
    openGraphImageUrl: string;
    primaryLanguage: Language;
    languages: {
      nodes: Language[];
    };
    repositoryTopics: {
      nodes: Array<{
        topic: {
          name: string;
        };
      }>;
    };
  }

export default Repository;