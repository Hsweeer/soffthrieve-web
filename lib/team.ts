export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

/** Placeholder team — swap names/photos when ready */
export const teamMembers: TeamMember[] = [
  {
    name: "Marcus Chen",
    role: "Product Lead",
    bio: "Turns founder ideas into scoped products — discovery, roadmaps, and delivery plans that teams can execute.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=750&fit=crop&crop=faces"
  },
  {
    name: "Elena Rodriguez",
    role: "UI/UX Director",
    bio: "Designs interfaces and flows that feel premium — from wireframes to polished design systems and motion.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=750&fit=crop&crop=faces"
  },
  {
    name: "James Mitchell",
    role: "Lead Mobile Engineer",
    bio: "Builds Flutter apps for iOS and Android — realtime features, store releases, and production-grade QA.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=750&fit=crop&crop=faces"
  },
  {
    name: "Priya Sharma",
    role: "Full-Stack Engineer",
    bio: "Ships Next.js platforms, Node.js APIs, admin dashboards, and integrations clients can operate day to day.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=750&fit=crop&crop=faces"
  }
];
