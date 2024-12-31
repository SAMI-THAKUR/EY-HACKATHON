import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete existing data
  await prisma.careerPathSkill.deleteMany();
  await prisma.learningResourceSkill.deleteMany();
  await prisma.jobSkill.deleteMany();
  await prisma.userSkill.deleteMany();
  await prisma.mockInterview.deleteMany();
  await prisma.event.deleteMany();
  await prisma.communityPost.deleteMany();
  await prisma.resume.deleteMany();
  await prisma.learningResource.deleteMany();
  await prisma.careerPath.deleteMany();
  await prisma.job.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.user.deleteMany();

  // Create Skills
  const skill1 = await prisma.skill.create({
    data: {
      name: "JavaScript",
      description: "Programming language",
      category: "Development",
      dependencies: null,
      industryMappings: null,
    },
  });

  const skill2 = await prisma.skill.create({
    data: {
      name: "Node.js",
      description: "JavaScript runtime",
      category: "Backend",
      dependencies: { prerequisite: "JavaScript" },
      industryMappings: null,
    },
  });

  // Create Users with related data
  const users = [
    {
      username: "Kunal",
      email: "kunal@example.com",
      password: "hashedpassword1",
      profileCompleted: true,
      resumes: {
        create: [
          {
            resumeData: { summary: "Experienced Software Developer." },
            metadata: null,
            additionalInfo: null,
          },
        ],
      },
      posts: {
        create: [
          {
            content: "Excited to join the team!",
            tags: ["introduction"],
            comments: null,
          },
        ],
      },
      mockInterviews: {
        create: [
          {
            questions: { q1: "Tell me about yourself." },
            assessment: { score: 8 },
            performanceData: null,
          },
        ],
      },
      userSkills: {
        create: [
          { skill: { connect: { id: skill1.id } } },
          { skill: { connect: { id: skill2.id } } },
        ],
      },
      events: {
        create: [
          {
            title: "Hackathon 2024",
            description: "Annual coding hackathon.",
            location: "Online",
            date: new Date(),
            participants: null,
          },
        ],
      },
      careerPaths: {
        create: [
          {
            title: "Full Stack Developer",
            description: "Path to become a full-stack developer.",
            roles: { role1: "Frontend Developer", role2: "Backend Developer" },
          },
        ],
      },
      learningResources: {
        create: [
          {
            title: "Node.js Course",
            type: "course",
            platform: "Udemy",
            link: "https://udemy.com/nodejs-course",
            tags: ["Node.js", "Backend"],
          },
        ],
      },
    },
    // Repeat similar objects for Sami, Sagar, Poorva, and Vinit
    {
      username: "Sami",
      email: "sami@example.com",
      password: "hashedpassword2",
      profileCompleted: true,
      resumes: {
        create: [
          {
            resumeData: { summary: "Passionate Frontend Developer." },
            metadata: null,
            additionalInfo: null,
          },
        ],
      },
      posts: {
        create: [
          {
            content: "Looking forward to collaborating!",
            tags: ["collaboration"],
            comments: null,
          },
        ],
      },
      mockInterviews: {
        create: [
          {
            questions: { q1: "Explain closures in JavaScript." },
            assessment: { score: 9 },
            performanceData: null,
          },
        ],
      },
      userSkills: {
        create: [{ skill: { connect: { id: skill1.id } } }],
      },
      events: {
        create: [
          {
            title: "Frontend Workshop",
            description: "Workshop on modern frontend technologies.",
            location: "Berlin",
            date: new Date(),
            participants: null,
          },
        ],
      },
      careerPaths: {
        create: [
          {
            title: "UI/UX Designer",
            description: "Path to become a UI/UX designer.",
            roles: { role1: "Junior Designer", role2: "Senior Designer" },
          },
        ],
      },
      learningResources: {
        create: [
          {
            title: "React Course",
            type: "course",
            platform: "Coursera",
            link: "https://coursera.org/react-course",
            tags: ["React", "Frontend"],
          },
        ],
      },
    },
    // Add additional users: Sagar, Poorva, Vinit with similar structure
  ];

  for (const userData of users) {
    await prisma.user.create({
      data: userData,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });