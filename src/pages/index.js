import React from "react"
import Layout from "../components/layout/Layout"
import Hero from "../components/ui/Hero"
import Section from "../components/ui/Section"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"

const IndexPage = () => {
  return (
    <Layout 
      title="Home"
      description="Dr. Fatih Nayebi is an AI researcher, enterprise AI leader, and Faculty Lecturer at McGill University"
    >
      {/* Hero Section */}
      <Hero
        title="Dr. Fatih Nayebi"
        subtitle="AI Researcher & Enterprise AI Leader"
        description="Transforming the future of business and technology through cutting-edge artificial intelligence research and leadership. Faculty Lecturer at McGill University."
        primaryButtonText="View Research"
        primaryButtonLink="/research"
        secondaryButtonText="Contact Me"
        secondaryButtonLink="/contact"
        image="/images/profile-placeholder.jpg"
        imageAlt="Dr. Fatih Nayebi Portrait"
      />

      {/* Introduction Section */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Bridging Academic Research & Enterprise AI</h2>
          <p className="text-lg text-gray-700 mb-8">
            With expertise in machine learning, natural language processing, and AI leadership, I help organizations 
            leverage artificial intelligence to solve complex business challenges while advancing the field through 
            academic research and teaching.
          </p>
          <div className="flex justify-center gap-4">
            <Button to="/about" variant="primary">
              About Me
            </Button>
            <Button to="/publications" variant="secondary">
              View Publications
            </Button>
          </div>
        </div>
      </Section>

      {/* Areas of Expertise Section */}
      <Section background="sage">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Areas of Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            title="Enterprise AI Leadership"
            content="Leading data science and AI teams to deliver impactful solutions across retail, finance, and technology sectors. Current VP of Data & AI at ALDO Group."
            image="/images/enterprise-placeholder.jpg"
            imageAlt="Enterprise AI Leadership"
          />
          <Card
            title="AI Research"
            content="Conducting research in machine learning, natural language processing, and computer vision with applications in business and industry."
            image="/images/research-placeholder.jpg"
            imageAlt="AI Research"
            link="/research"
            linkText="View Research"
          />
          <Card
            title="Academic Teaching"
            content="Faculty Lecturer at McGill University, teaching graduate courses in artificial intelligence, machine learning, and data science."
            image="/images/teaching-placeholder.jpg"
            imageAlt="Academic Teaching"
            link="/publications"
            linkText="View Courses"
          />
        </div>
      </Section>

      {/* Featured Case Studies Section */}
      <Section>
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Case Studies</h2>
          <Button to="/research" variant="secondary" className="mt-4 md:mt-0">
            View All Case Studies
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card
            title="AI-Driven Retail Transformation"
            subtitle="ALDO Group"
            content="Leading the development of advanced analytics and AI solutions to optimize inventory management, personalize customer experiences, and drive revenue growth."
            image="/images/case1-placeholder.jpg"
            imageAlt="Retail AI Case Study"
            link="/research/retail-ai"
            linkText="Read Case Study"
          />
          <Card
            title="Natural Language Processing for Customer Service"
            subtitle="Research Project"
            content="Developing state-of-the-art NLP models to enhance customer service automation, sentiment analysis, and intelligent routing."
            image="/images/case2-placeholder.jpg"
            imageAlt="NLP Case Study"
            link="/research/nlp-customer-service"
            linkText="Read Case Study"
          />
        </div>
      </Section>

      {/* Latest Blog Posts Section */}
      <Section background="gray">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Latest Blog Posts</h2>
          <Button 
            href="https://gradientdivergence.com" 
            variant="secondary" 
            className="mt-4 md:mt-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Gradient Divergence
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            title="The Future of Enterprise AI"
            subtitle="Published on Gradient Divergence • January 15, 2023"
            content="Exploring how large enterprises are implementing and scaling AI solutions across their organizations."
            image="/images/blog1-placeholder.jpg"
            imageAlt="Blog Post 1"
            href="https://gradientdivergence.com/future-enterprise-ai"
            linkText="Read Article"
          />
          <Card
            title="Responsible AI: Ethics in Machine Learning"
            subtitle="Published on Gradient Divergence • December 5, 2022"
            content="Examining the ethical considerations and frameworks for responsible AI deployment in business."
            image="/images/blog2-placeholder.jpg"
            imageAlt="Blog Post 2"
            href="https://gradientdivergence.com/responsible-ai-ethics"
            linkText="Read Article"
          />
          <Card
            title="Natural Language Processing at Scale"
            subtitle="Published on Gradient Divergence • November 10, 2022"
            content="Technical deep dive into implementing NLP solutions that can scale to meet enterprise demands."
            image="/images/blog3-placeholder.jpg"
            imageAlt="Blog Post 3"
            href="https://gradientdivergence.com/nlp-at-scale"
            linkText="Read Article"
          />
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect</h2>
          <p className="text-lg text-gray-700 mb-8">
            Interested in consulting, speaking engagements, or collaboration on AI research? 
            I'm always open to discussing new opportunities and challenges in the AI space.
          </p>
          <div className="flex justify-center gap-4">
            <Button to="/consulting" variant="primary">
              Consulting & Speaking
            </Button>
            <Button to="/contact" variant="secondary">
              Contact Me
            </Button>
          </div>
        </div>
      </Section>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home | Dr. Fatih Nayebi</title>
