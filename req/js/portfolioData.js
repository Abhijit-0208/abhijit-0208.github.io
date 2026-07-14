// Local portfolio data used by the client-only chatbot
(function(){
    window.portfolioData = {
        name: 'Abhijit Dash',
        title: 'Cloud & DevOps Engineer',
        about: "I'm Abhijit Dash, a Cloud & DevOps Engineer focused on building reliable cloud solutions, automation pipelines, and modern infrastructure.",
        experienceYears: '2+',
        experienceSummary: 'I bring hands-on experience in cloud automation, CI/CD, infrastructure as code, and platform reliability.',
        skills: [
            'AWS', 'Terraform', 'Docker', 'Kubernetes', 'Jenkins', 'Git', 'GitHub', 'Linux', 'CI/CD', 'Python'
        ],
        experience: [
            {
                role: 'Cloud & DevOps Engineer',
                company: 'Verisage AI',
                period: '2023 - Present',
                summary: 'Worked on cloud automation, infrastructure as code, and CI/CD pipelines.'
            }
        ],
        projects: [
            {
                name: 'Portfolio Site',
                description: 'A polished personal portfolio built with HTML, CSS, and JavaScript to showcase experience, projects, and professional contact details.',
                link: 'https://abhijit-0208.github.io'
            },
            {
                name: 'AI Portfolio Assistant',
                description: 'A lightweight chatbot experience that answers portfolio-related questions with a professional, responsive virtual assistant interface.',
                link: 'https://abhijit-0208.github.io'
            },
            {
                name: 'Cloud Automation Project',
                description: 'An automation-focused DevOps initiative that streamlined deployment workflows and improved reliability in cloud environments.',
                link: 'https://github.com/abhijit-0208'
            }
        ],
        certifications: [
            'AWS Certified Cloud Practitioner',
            'SimuLearn Cloud & DevOps Certificates'
        ],
        education: 'Bachelor degree in Computer Science and related engineering foundations.',
        location: 'Bengaluru, India',
        availability: 'Yes — I am open to freelance work and professional opportunities.',
        resumeUrl: 'req/files/Abhijit_Dash_Resume.pdf',
        githubUrl: 'https://github.com/abhijit-0208',
        linkedinUrl: 'https://www.linkedin.com/in/abhijit-dash-827561204',
        contactEmail: 'dashabhijit02@gmail.com',
        chatKnowledge: [
            {
                id: 'greeting',
                patterns: ['hi', 'hello', 'good morning', 'good evening', 'hey'],
                keywords: ['hi', 'hello', 'morning', 'evening'],
                response: 'Hello! I’m {{name}}’s virtual assistant. I can help with his experience, skills, projects, certifications, resume, and contact details.'
            },
            {
                id: 'about',
                patterns: ['what is your name', 'what is your name?', 'what\'s your name', 'who are you', 'tell me about yourself', 'what do you do', 'who are you?'],
                keywords: ['name', 'who are you', 'about yourself', 'what do you do'],
                response: 'I’m {{name}}, a {{title}}. I focus on cloud solutions, CI/CD, automation, and platform reliability.'
            },
            {
                id: 'experience',
                patterns: ['how many years of experience do you have', 'what is your experience', 'are you a devops engineer', 'what experience do you have'],
                keywords: ['experience', 'years', 'devops engineer'],
                response: 'I have {{experienceYears}} of hands-on experience in Cloud and DevOps work. {{experienceSummary}}'
            },
            {
                id: 'skills',
                patterns: ['what are your skills', 'what technologies do you know', 'aws', 'terraform', 'docker', 'kubernetes', 'jenkins', 'git', 'github', 'linux', 'ci/cd'],
                keywords: ['skills', 'technologies', 'aws', 'terraform', 'docker', 'kubernetes', 'jenkins', 'linux', 'cicd'],
                response: 'My core strengths include AWS, Terraform, Docker, Kubernetes, Jenkins, Git, GitHub, Linux, CI/CD, and Python.'
            },
            {
                id: 'projects',
                patterns: ['show your projects', 'what projects have you worked on', 'tell me about your best project', 'portfolio project', 'ai project', 'devops project'],
                keywords: ['project', 'projects', 'portfolio', 'devops'],
                response: 'Here are a few examples of my work:'
            },
            {
                id: 'certifications',
                patterns: ['what certifications do you have', 'aws certifications', 'simulearn certificates'],
                keywords: ['certification', 'certifications', 'aws', 'simulearn'],
                response: 'I hold AWS-focused certifications and SimuLearn Cloud & DevOps certificates that support my professional profile.'
            },
            {
                id: 'resume',
                patterns: ['can i download your resume', 'show your resume', 'resume link', 'download resume', 'resume'],
                keywords: ['resume', 'cv', 'download'],
                response: 'You can view or download my resume here:'
            },
            {
                id: 'contact',
                patterns: ['how can i contact you', 'email', 'linkedin', 'github', 'portfolio', 'contact'],
                keywords: ['contact', 'email', 'linkedin', 'github', 'portfolio'],
                response: 'You can reach out through email, LinkedIn, or GitHub:'
            },
            {
                id: 'availability',
                patterns: ['are you available for work', 'freelancing', 'open to opportunities', 'available for work'],
                keywords: ['available', 'freelance', 'opportunities', 'work'],
                response: 'Yes — {{availability}}'
            },
            {
                id: 'education',
                patterns: ['what is your education', 'degree'],
                keywords: ['education', 'degree'],
                response: 'My education background includes a degree in computer science and a strong engineering foundation.'
            },
            {
                id: 'location',
                patterns: ['where are you located', 'where are you based', 'location'],
                keywords: ['location', 'located', 'based'],
                response: 'I am based in {{location}}.'
            },
            {
                id: 'thanks',
                patterns: ['thank you', 'thanks'],
                keywords: ['thank', 'thanks'],
                response: 'You’re very welcome! I’m happy to help.'
            },
            {
                id: 'goodbye',
                patterns: ['bye', 'see you', 'goodbye'],
                keywords: ['bye', 'see you', 'goodbye'],
                response: 'Goodbye! Feel free to come back if you want to learn more about my portfolio.'
            }
        ]
    };
})();
