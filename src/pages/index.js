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
      description="Dr. Fatih Nayebi is a Data & AI leader, Founder & CEO of OODARIS AI, VP of Data & AI at ALDO Group, and Assistant Professor at McGill University"
    >
      {/* Hero Section */}
      <Hero
        title="Dr. Fatih Nayebi"
        subtitle="Data & AI Leader"
        description="Transforming the future of business and technology through practical enterprise AI leadership. Founder & CEO of OODARIS AI, VP of Data & AI at ALDO Group, and Assistant Professor at McGill University."
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
            content="Assistant Professor at McGill University, teaching graduate courses in artificial intelligence, machine learning, and data science."
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
            title="Optimizing Applications, Websites, and Services for Discoverability and Usability by AI Agents"
            subtitle="Published on LinkedIn • February 11, 2025"
            content="A practical framework for making digital products discoverable and usable by AI agents in the agentic era."
            image="/images/blog1-placeholder.jpg"
            imageAlt="AI discoverability"
            href="https://www.linkedin.com/pulse/optimizing-applications-websites-services-usability-ai-nayebi-ph-d--ks13e"
            linkText="Read Article"
          />
          <Card
            title="Assortment Planning and Optimization with AI"
            subtitle="Published on LinkedIn • November 6, 2024"
            content="An applied playbook for demand forecasting, cannibalization-aware optimization, and scalable assortment decisions."
            image="/images/blog2-placeholder.jpg"
            imageAlt="Assortment planning and optimization"
            href="https://www.linkedin.com/pulse/assortment-planning-optimization-ai-fatih-nayebi-ph-d--jeyoc"
            linkText="Read Article"
          />
          <Card
            title="Decision Making in the Digital Age: Navigating Complexity with Data and AI"
            subtitle="Published on LinkedIn • June 5, 2024"
            content="A decision-intelligence perspective on using data and AI to navigate uncertainty and improve enterprise outcomes."
            image="/images/blog3-placeholder.jpg"
            imageAlt="Decision intelligence"
            href="https://www.linkedin.com/pulse/decision-making-digital-age-navigating-complexity-ai-nayebi-ph-d--ustae"
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
