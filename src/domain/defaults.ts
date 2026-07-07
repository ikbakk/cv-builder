import type { ResumeData } from './types';

export const defaultResumeData: ResumeData = {
  profile: {
    name: 'Muhammad Iqbal Firdaus',
    headline: 'Frontend Engineer | Mobile Engineer',
    location: 'Mataram, Indonesia',
    email: 'ikbakfir@gmail.com',
    phone: '+62 87815509168',
    portfolio: 'https://ikbakk.vercel.app',
    github: 'https://github.com/ikbakk',
    linkedin: 'https://linkedin.com/in/ikbakk',
  },
  summary:
    'Frontend Engineer with over 2 years of professional experience developing and maintaining production-ready web and mobile applications across tourism, government, analytics, automotive, restaurant, IoT, and digital media industries. Specialized in React, Next.js, Astro, and Flutter, with practical experience working within Backend-for-Frontend (BFF) architectures, integrating REST APIs, and implementing technical SEO strategies. Passionate about building performant, maintainable, and user-focused applications while collaborating with distributed teams throughout the software development lifecycle.',
  experiences: [
    {
      title: 'Freelance Frontend Engineer',
      company: 'Remote',
      period: 'Mar 2024 – Present',
      tech: 'React • Next.js • Astro • SolidJS • TypeScript • Tailwind CSS',
      intro:
        'Delivered modern frontend solutions for businesses across tourism, analytics, automotive, restaurant, and government sectors.',
      bullets: [
        'Delivered and maintained production-ready frontend applications for multiple client projects, implementing new features, resolving production issues, and improving existing codebases.',
        'Refactored and maintained frontend applications utilizing Backend-for-Frontend (BFF) architectures to simplify communication with backend services and improve maintainability.',
        'Translated Figma designs into responsive production-ready interfaces using React, Next.js, SolidJS, and Astro while maintaining consistency across desktop and mobile devices.',
        'Developed high-performance static websites using Astro with Schema.org structured data, XML sitemaps, robots.txt, canonical URLs, Open Graph metadata, responsive image optimization, and Google Search Console integration.',
        'Developed frontend interfaces for an internal government document management platform by integrating existing PDF digital signing services through REST APIs.',
        'Customized and optimized WordPress websites using Elementor, improving responsiveness, usability, visual consistency, and website performance.',
        'Collaborated directly with clients to understand requirements, deliver production-ready features, troubleshoot issues, and maintain existing web applications.',
      ],
    },
    {
      title: 'Freelance IoT Dashboard Developer',
      company: 'Remote',
      period: 'Aug 2024 – Mar 2025',
      tech: 'React • MQTT • Firebase • React Query • Recharts',
      intro:
        'Developed real-time monitoring dashboards for IoT systems, transforming operational data into interactive web applications.',
      bullets: [
        'Developed real-time IoT monitoring dashboards using React, MQTT, and Firebase for monitoring connected devices and operational metrics.',
        'Implemented asynchronous data fetching and client-side caching using React Query to improve dashboard responsiveness and data consistency.',
        'Built interactive dashboards and operational data visualizations using Recharts to help users interpret telemetry and operational data.',
        'Collaborated with backend and IoT teams to integrate MQTT-based data streams into responsive frontend applications.',
      ],
    },
    {
      title: 'Freelance Mobile Developer',
      company: 'Remote',
      period: 'Mar 2025 – Present',
      tech: 'Flutter • React Native • REST API • Sanity CMS',
      intro:
        'Maintained and enhanced cross-platform mobile applications by delivering new features, integrating backend services, and improving maintainability.',
      bullets: [
        'Maintained and enhanced a Flutter-based short-form drama streaming platform by implementing new features, integrating REST APIs, supporting multilingual localization, and resolving production issues.',
        'Migrated a subscription-based ebook application from React Native to Flutter while preserving existing functionality and improving long-term maintainability.',
        'Developed mobile user interfaces integrated with Sanity CMS to support dynamic content management.',
        'Collaborated with designers to transform Figma designs into responsive production-ready mobile applications for Android and iOS.',
      ],
    },
    {
      title: 'Full-Stack Engineering Apprentice',
      company: 'Generasi Gigih 3.0',
      period: 'Jul 2023 – Dec 2023',
      tech: 'React • Express.js • MongoDB • REST API',
      intro:
        'Completed a six-month intensive software engineering program focused on collaborative full-stack application development using modern JavaScript technologies.',
      bullets: [
        'Developed a Spotify-inspired music streaming web application using React, Express.js, MongoDB, and Spotify APIs.',
        'Led development of a Waste Management web application utilizing REST APIs and MongoDB for efficient data management.',
        'Collaborated with cross-functional team members using GitHub Projects and Git workflows throughout the software development lifecycle.',
        'Applied software engineering best practices including version control, collaborative development, and structured project delivery.',
      ],
    },
  ],
  skills: [
    { category: 'Languages', skills: 'TypeScript • JavaScript • Dart' },
    {
      category: 'Frontend',
      skills: 'React • Next.js • Astro • SolidJS • Tailwind CSS • HTML5 • CSS3',
    },
    { category: 'Mobile', skills: 'Flutter • React Native' },
    {
      category: 'Backend & API',
      skills: 'Node.js • NestJS • Express.js • REST API • Backend-for-Frontend (BFF)',
    },
    {
      category: 'Databases',
      skills: 'PostgreSQL • MongoDB • Firebase • Supabase',
    },
    {
      category: 'DevOps',
      skills: 'Docker • Docker Compose • Git • GitHub • Vercel • Netlify',
    },
    {
      category: 'Tools',
      skills:
        'MQTT • React Query • Recharts • WordPress • Elementor • Figma • Postman • Pi Coding Agent • Linux',
    },
  ],
  education: {
    degree: 'Bachelor of Electrical Engineering',
    institution: 'Universitas Mataram',
    location: 'Mataram, Indonesia',
    period: '2017 – 2024',
  },
  additional: [
    'Experience collaborating with remote clients and distributed development teams.',
    'Strong understanding of responsive web development, frontend architecture, and technical SEO.',
    'Comfortable integrating REST APIs and third-party services into production applications.',
    'Open to relocation and visa sponsorship opportunities.',
  ],
};
