import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AgentChat from "../components/AgentChat";

// Agent interface
interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
  backgroundColor: string;
  featuredImage?: string;
  benefits?: string[];
}

// Agent category interface
interface AgentCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  agents: Agent[];
}

// Agent categories data - All with enhanced design
export const AGENT_CATEGORIES: AgentCategory[] = [
  {
    id: "ideation",
    title: "Ideation & Innovation",
    description: "AI assistants for creative thinking, problem solving, and innovative idea generation",
    icon: "💡",
    agents: [
      {
        id: "creative-director",
        name: "CreativeForce",
        role: "Creative Director",
        description: "Guides brainstorming sessions and helps develop creative concepts for products and marketing campaigns",
        avatar: "https://i.imgur.com/OD8oDw4.png",
        backgroundColor: "#fff8e1",
        featuredImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2970&auto=format&fit=crop",
        benefits: [
          "Accelerate creative brainstorming by 3x",
          "Generate unique concepts based on brand guidelines",
          "Structure ideation workshops methodically"
        ]
      },
      {
        id: "design-thinker",
        name: "DesignMind",
        role: "Design Thinking Facilitator",
        description: "Facilitates design thinking workshops and user-centered innovation using structured methodologies",
        avatar: "https://i.imgur.com/6TUoqLr.png",
        backgroundColor: "#f1f8e9",
        featuredImage: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2970&auto=format&fit=crop",
        benefits: [
          "Guide teams through design thinking process",
          "Generate user personas and journey maps",
          "Develop prototyping strategies"
        ]
      },
      {
        id: "strategic-planner",
        name: "StrategyGuru",
        role: "Strategic Planning Expert",
        description: "Assists in developing strategic plans and business growth initiatives aligned with market trends",
        avatar: "https://i.imgur.com/gGzJWFO.png",
        backgroundColor: "#e0f7fa",
        featuredImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2970&auto=format&fit=crop",
        benefits: [
          "Create comprehensive growth strategies",
          "Analyze competitive landscape",
          "Identify new market opportunities"
        ]
      }
    ]
  },
  {
    id: "hr",
    title: "Human Resources",
    description: "AI assistants for recruitment, employee management, and HR operations",
    icon: "👥",
    agents: [
      {
        id: "recruiter",
        name: "TalentScout",
        role: "Recruitment Specialist",
        description: "Helps with candidate screening, interview scheduling, and recruitment processes to find ideal talent",
        avatar: "https://i.imgur.com/7YkMjGN.png",
        backgroundColor: "#e3f2fd",
        featuredImage: "https://images.unsplash.com/photo-1573496546038-82f9c39f6365?q=80&w=2969&auto=format&fit=crop",
        benefits: [
          "Reduce hiring time by 40%",
          "Improve candidate quality through AI screening",
          "Streamline interview scheduling"
        ]
      },
      {
        id: "hr-advisor",
        name: "HR Advisor",
        role: "HR Policies Expert",
        description: "Provides guidance on employee policies, benefits, and workplace regulations for compliance and satisfaction",
        avatar: "https://i.imgur.com/JXgA9K5.png",
        backgroundColor: "#e8f5e9",
        featuredImage: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=2970&auto=format&fit=crop",
        benefits: [
          "Ensure policy compliance",
          "Optimize employee benefits packages",
          "Resolve workplace conflicts efficiently"
        ]
      },
      {
        id: "onboarding",
        name: "OnboardPro",
        role: "Onboarding Specialist",
        description: "Guides new employees through the onboarding process with personalized assistance and training plans",
        avatar: "https://i.imgur.com/8SgwV7z.png",
        backgroundColor: "#fff8e1",
        featuredImage: "https://images.unsplash.com/photo-1530099486328-e021101a494a?q=80&w=2547&auto=format&fit=crop",
        benefits: [
          "Reduce new hire ramp-up time by 35%",
          "Create personalized onboarding experiences",
          "Automate documentation and training schedules"
        ]
      }
    ]
  },
  {
    id: "legal",
    title: "Legal Affairs",
    description: "AI assistants for legal documentation, compliance, and advisory services",
    icon: "⚖️",
    agents: [
      {
        id: "contract-analyst",
        name: "ContractSense",
        role: "Contract Analyst",
        description: "Reviews and analyzes contracts, highlighting important clauses and potential issues for better risk management",
        avatar: "https://i.imgur.com/q9U6XEh.png",
        backgroundColor: "#f3e5f5",
        featuredImage: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=2574&auto=format&fit=crop",
        benefits: [
          "Reduce contract review time by 70%",
          "Identify potential legal risks automatically",
          "Ensure compliance with regulations"
        ]
      },
      {
        id: "compliance-advisor",
        name: "ComplianceGuard",
        role: "Compliance Specialist",
        description: "Ensures business operations comply with local and international regulations to avoid penalties",
        avatar: "https://i.imgur.com/bV1RyCj.png",
        backgroundColor: "#e1f5fe",
        featuredImage: "https://images.unsplash.com/photo-1607545379929-6c1fdb1b8031?q=80&w=2574&auto=format&fit=crop",
        benefits: [
          "Stay updated with changing regulations",
          "Proactively identify compliance gaps",
          "Generate compliance reports automatically"
        ]
      },
      {
        id: "legal-researcher",
        name: "LexResearch",
        role: "Legal Researcher",
        description: "Conducts research on legal precedents and provides relevant case studies to support legal arguments",
        avatar: "https://i.imgur.com/NXpQGe0.png",
        backgroundColor: "#fce4ec",
        featuredImage: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?q=80&w=2583&auto=format&fit=crop",
        benefits: [
          "Accelerate legal research by 5x",
          "Find relevant case precedents faster",
          "Generate comprehensive legal briefings"
        ]
      }
    ]
  },
  {
    id: "operations",
    title: "Operations Management",
    description: "AI assistants for streamlining operations, logistics, and supply chain management",
    icon: "⚙️",
    agents: [
      {
        id: "inventory-manager",
        name: "InventoryIQ",
        role: "Inventory Manager",
        description: "Optimizes inventory levels and provides insights on stock management to reduce costs and prevent stockouts",
        avatar: "https://i.imgur.com/D4VNkV2.png",
        backgroundColor: "#e8eaf6",
        featuredImage: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2935&auto=format&fit=crop",
        benefits: [
          "Reduce inventory costs by 25%",
          "Optimize reorder points automatically",
          "Forecast demand with 95% accuracy"
        ]
      },
      {
        id: "logistics-planner",
        name: "LogisticsPro",
        role: "Logistics Specialist",
        description: "Plans and optimizes logistics operations and delivery schedules to enhance efficiency and customer satisfaction",
        avatar: "https://i.imgur.com/JR0SGqm.png",
        backgroundColor: "#f1f8e9",
        featuredImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2970&auto=format&fit=crop",
        benefits: [
          "Reduce delivery times by 30%",
          "Optimize route planning",
          "Lower transportation costs"
        ]
      },
      {
        id: "process-optimizer",
        name: "ProcessOptimizer",
        role: "Process Improvement Specialist",
        description: "Analyzes business processes and suggests efficiency improvements to increase productivity and reduce waste",
        avatar: "https://i.imgur.com/4LqEoXH.png",
        backgroundColor: "#e0f7fa",
        featuredImage: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=2970&auto=format&fit=crop",
        benefits: [
          "Identify process bottlenecks automatically",
          "Increase operational efficiency by 40%",
          "Automate repetitive tasks"
        ]
      }
    ]
  },
  {
    id: "rd",
    title: "Research & Development",
    description: "AI assistants for innovation, product development, and research initiatives",
    icon: "🔬",
    agents: [
      {
        id: "market-researcher",
        name: "MarketLens",
        role: "Market Research Specialist",
        description: "Analyzes market trends and consumer behavior for product development to uncover new opportunities",
        avatar: "https://i.imgur.com/OXdrmOZ.png",
        backgroundColor: "#f9fbe7",
        featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2970&auto=format&fit=crop",
        benefits: [
          "Identify emerging market trends",
          "Analyze competitor strategies",
          "Generate actionable consumer insights"
        ]
      },
      {
        id: "innovation-coach",
        name: "InnovationMind",
        role: "Innovation Coach",
        description: "Facilitates brainstorming sessions and guides innovation processes to develop breakthrough solutions",
        avatar: "https://i.imgur.com/dQlvrKx.png",
        backgroundColor: "#ede7f6",
        featuredImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2969&auto=format&fit=crop",
        benefits: [
          "Generate 3x more innovative ideas",
          "Structure effective innovation workshops",
          "Validate concepts quickly"
        ]
      },
      {
        id: "product-developer",
        name: "ProductForge",
        role: "Product Development Assistant",
        description: "Helps in creating product specifications and development roadmaps aligned with market needs",
        avatar: "https://i.imgur.com/ypgQiH5.png",
        backgroundColor: "#ffebee",
        featuredImage: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=2970&auto=format&fit=crop",
        benefits: [
          "Reduce product development cycle by 40%",
          "Create detailed specifications",
          "Manage development milestones"
        ]
      }
    ]
  },
  {
    id: "risk",
    title: "Risk Management",
    description: "AI assistants for risk assessment, security protocols, and crisis management",
    icon: "🛡️",
    agents: [
      {
        id: "risk-assessor",
        name: "RiskRadar",
        role: "Risk Assessment Specialist",
        description: "Identifies potential business risks and suggests mitigation strategies to protect your organization",
        avatar: "https://i.imgur.com/wqtGR3f.png",
        backgroundColor: "#e8eaf6",
        featuredImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2970&auto=format&fit=crop",
        benefits: [
          "Proactively identify business threats",
          "Calculate risk exposure accurately",
          "Create comprehensive risk reports"
        ]
      },
      {
        id: "security-advisor",
        name: "SecureSentry",
        role: "Security Advisor",
        description: "Provides guidance on security best practices and threat prevention for digital and physical assets",
        avatar: "https://i.imgur.com/HduzCqH.png",
        backgroundColor: "#ffecb3",
        featuredImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2970&auto=format&fit=crop",
        benefits: [
          "Develop robust security protocols",
          "Monitor security compliance",
          "Respond to threats in real-time"
        ]
      },
      {
        id: "crisis-manager",
        name: "CrisisCommand",
        role: "Crisis Management Expert",
        description: "Assists in developing crisis response plans and emergency procedures to handle unexpected situations",
        avatar: "https://i.imgur.com/R4XgUdC.png",
        backgroundColor: "#e0f2f1",
        featuredImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2970&auto=format&fit=crop",
        benefits: [
          "Create comprehensive crisis playbooks",
          "Coordinate emergency response teams",
          "Minimize business disruption"
        ]
      }
    ]
  },
  {
    id: "tech",
    title: "Technical Infrastructure",
    description: "AI assistants for IT support, system maintenance, and technical troubleshooting",
    icon: "💻",
    agents: [
      {
        id: "it-support",
        name: "TechSupport",
        role: "IT Support Specialist",
        description: "Provides solutions for common IT issues and technical troubleshooting to minimize downtime",
        avatar: "https://i.imgur.com/gONZrGy.png",
        backgroundColor: "#e1f5fe",
        featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2970&auto=format&fit=crop",
        benefits: [
          "Resolve technical issues 60% faster",
          "Provide 24/7 IT support",
          "Reduce system downtime"
        ]
      },
      {
        id: "system-architect",
        name: "ArchitectAI",
        role: "System Architecture Specialist",
        description: "Assists in designing robust and scalable technical infrastructures for future-proof operations",
        avatar: "https://i.imgur.com/pXGfmCV.png",
        backgroundColor: "#f3e5f5",
        featuredImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2934&auto=format&fit=crop",
        benefits: [
          "Design scalable tech infrastructures",
          "Optimize system performance",
          "Reduce technical debt"
        ]
      },
      {
        id: "security-engineer",
        name: "CyberShield",
        role: "Cybersecurity Specialist",
        description: "Identifies potential security vulnerabilities and recommends protective measures for your digital assets",
        avatar: "https://i.imgur.com/UqON6Kx.png",
        backgroundColor: "#e8f5e9",
        featuredImage: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=2912&auto=format&fit=crop",
        benefits: [
          "Detect security threats in real-time",
          "Conduct vulnerability assessments",
          "Implement multi-layered security"
        ]
      }
    ]
  }
];

// Featured Agent Carousel for any category
const FeaturedAgentCarousel: React.FC<{ agents: Agent[]; categoryId: string }> = ({ agents, categoryId }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % agents.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [agents.length]);
  
  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
  };
  
  return (
    <div style={{ 
      position: "relative", 
      marginBottom: "80px",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
    }}>
      <div style={{ 
        position: "relative", 
        height: "500px",
        overflow: "hidden" 
      }}>
        {agents.map((agent, index) => (
          <div
            key={agent.id}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: activeIndex === index ? 1 : 0,
              transition: "opacity 1s ease-in-out",
              display: "flex",
              alignItems: "center"
            }}
          >
            <div 
              style={{ 
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${agent.featuredImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.5)",
                zIndex: 1
              }}
            />
            <div style={{ 
              position: "relative",
              zIndex: 2,
              padding: "60px",
              width: "100%",
              maxWidth: "600px",
              color: "white"
            }}>
              <div style={{ 
                display: "inline-block",
                backgroundColor: agent.backgroundColor,
                padding: "8px 16px",
                borderRadius: "20px",
                marginBottom: "16px",
                color: "#333"
              }}>
                {agent.role}
              </div>
              <h2 style={{ 
                fontSize: "42px", 
                fontWeight: 700, 
                marginBottom: "20px",
                letterSpacing: "-0.5px"
              }}>
                {agent.name}
              </h2>
              <p style={{ 
                fontSize: "18px", 
                lineHeight: 1.6, 
                marginBottom: "30px",
                opacity: 0.9
              }}>
                {agent.description}
              </p>
              {agent.benefits && (
                <div style={{ marginBottom: "30px" }}>
                  {agent.benefits.map((benefit, i) => (
                    <div key={i} style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      marginBottom: "10px" 
                    }}>
                      <div style={{ 
                        minWidth: "24px", 
                        height: "24px", 
                        backgroundColor: agent.backgroundColor, 
                        borderRadius: "50%", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        marginRight: "12px",
                        color: "#333"
                      }}>
                        ✓
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              )}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/agent-conversation/${agent.id}`);
                }}
                style={{
                  background: agent.backgroundColor,
                  color: "#333",
                  border: "none",
                  borderRadius: "30px",
                  padding: "14px 30px",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center"
                }}
              >
                <span style={{ marginRight: "10px" }}>Chat with {agent.name}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div style={{
              position: "absolute",
              bottom: "30px",
              right: "60px",
              zIndex: 2,
              width: "90px",
              height: "90px",
              borderRadius: "16px",
              overflow: "hidden",
              border: "4px solid rgba(255, 255, 255, 0.3)",
            }}>
              <img 
                src={agent.avatar} 
                alt={agent.name} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Indicators */}
      <div style={{ 
        position: "absolute", 
        bottom: "30px", 
        left: "60px", 
        display: "flex", 
        gap: "10px",
        zIndex: 3
      }}>
        {agents.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: activeIndex === index ? "white" : "rgba(255, 255, 255, 0.5)",
              border: "none",
              cursor: "pointer",
              padding: 0
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Enhanced Agent Card Component
const AgentCard: React.FC<{ agent: Agent; highlight?: boolean }> = ({ agent, highlight = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div
      style={{
        backgroundColor: agent.backgroundColor,
        borderRadius: "16px",
        padding: "28px",
        boxShadow: isHovered 
          ? "0 12px 35px rgba(0, 0, 0, 0.15)" 
          : highlight 
            ? "0 8px 25px rgba(0, 0, 0, 0.1)"
            : "0 4px 6px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: highlight ? `2px solid ${agent.backgroundColor}` : "none",
        position: "relative",
        overflow: "hidden"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/agent-conversation/${agent.id}`)}
    >
      {highlight && (
        <div style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          backgroundColor: "#0a75c9",
          color: "white",
          padding: "4px 10px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: 500,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          zIndex: 1
        }}>
          Featured
        </div>
      )}
      <div>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          marginBottom: "20px" 
        }}>
          <div style={{ 
            width: "70px", 
            height: "70px", 
            borderRadius: "16px", 
            overflow: "hidden",
            marginRight: "20px",
            border: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
          }}>
            <img 
              src={agent.avatar} 
              alt={agent.name} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
          </div>
          <div>
            <h3 style={{ 
              margin: "0 0 6px 0", 
              fontSize: "22px", 
              fontWeight: 600,
              color: "#333" 
            }}>
              {agent.name}
            </h3>
            <p style={{ 
              margin: "0", 
              fontSize: "14px", 
              color: "#555",
              fontWeight: 500,
              display: "inline-block",
              padding: "4px 10px",
              backgroundColor: "rgba(0,0,0,0.05)",
              borderRadius: "12px"
            }}>
              {agent.role}
            </p>
          </div>
        </div>
        <p style={{ 
          margin: "0 0 24px 0", 
          fontSize: "16px", 
          lineHeight: "1.6", 
          color: "#444" 
        }}>
          {agent.description}
        </p>
        {agent.benefits && (
          <div style={{ marginBottom: "20px" }}>
            {agent.benefits.slice(0, 2).map((benefit, i) => (
              <div key={i} style={{ 
                display: "flex", 
                alignItems: "center", 
                marginBottom: "8px",
                fontSize: "14px",
                color: "#555"
              }}>
                <div style={{ 
                  minWidth: "20px", 
                  height: "20px", 
                  backgroundColor: "rgba(0,0,0,0.05)", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginRight: "10px"
                }}>
                  ✓
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/agent-conversation/${agent.id}`);
        }}
        style={{
          background: isHovered ? "#0a75c9" : "rgba(0,0,0,0.07)",
          color: isHovered ? "white" : "#333",
          border: "none",
          borderRadius: "28px",
          padding: "14px 24px",
          fontSize: "15px",
          fontWeight: 500,
          cursor: "pointer",
          transition: "all 0.3s ease",
          width: "100%",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isHovered ? "0 4px 12px rgba(10, 117, 201, 0.3)" : "none",
        }}
      >
        <span style={{ marginRight: "8px" }}>Chat with {agent.name}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={isHovered ? "white" : "#333"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

// Category Section Component with animation - Updated to use carousel for all categories
const CategorySection: React.FC<{ category: AgentCategory; index: number }> = ({ category, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <section 
      id={category.id} 
      ref={sectionRef}
      style={{ 
        marginBottom: "100px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.8s ease, transform 0.8s ease"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
        <div style={{ 
          fontSize: "40px", 
          marginRight: "20px", 
          background: "#f8f9fa", 
          width: "80px", 
          height: "80px", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}>
          {category.icon}
        </div>
        <div>
          <h2 style={{ 
            margin: "0 0 10px 0", 
            fontSize: index === 0 ? "32px" : "28px", 
            fontWeight: index === 0 ? 700 : 600, 
            color: "#333" 
          }}>
            {category.title}
          </h2>
          <p style={{ margin: "0", fontSize: index === 0 ? "18px" : "17px", color: "#555", maxWidth: "800px" }}>
            {category.description}
          </p>
        </div>
      </div>
      
      {/* Show featured carousel for all categories */}
      <FeaturedAgentCarousel agents={category.agents} categoryId={category.id} />
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(3, 1fr)", 
        gap: "30px" 
      }}>
        {category.agents.map((agent, agentIndex) => (
          <AgentCard 
            key={agent.id} 
            agent={agent} 
            highlight={agentIndex === 0} // Highlight the first agent in each category
          />
        ))}
      </div>
    </section>
  );
};

// GargashAgents Page Component
const GargashAgents: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <main style={{ flex: 1, width: "100%", background: "#f8f9fa", marginTop: 0 }}>
      {/* Hero Section */}
      <div style={{ 
        background: "linear-gradient(135deg, #00253e 0%, #1a4c7c 100%)",
        color: "white",
        padding: "120px 0 100px 0",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Background pattern */}
        <div style={{ 
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 8%), radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 8%)",
          backgroundSize: "120% 120%",
          opacity: 0.8,
          zIndex: 1
        }} />
        
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ 
            maxWidth: "900px", 
            margin: "0 auto", 
            padding: "0 20px",
            position: "relative" 
          }}>
            <h1 style={{ 
              fontSize: "52px", 
              fontWeight: 700, 
              marginBottom: "24px",
              letterSpacing: "-0.03em"
            }}>
              Gargash AI Assistants
            </h1>
            <p style={{ 
              fontSize: "20px", 
              lineHeight: 1.6, 
              marginBottom: "40px",
              opacity: 0.9,
              maxWidth: "700px",
              margin: "0 auto 40px auto"
            }}>
              Discover our suite of specialized AI assistants designed to enhance every aspect of Gargash Group's business operations, from innovation to infrastructure.
            </p>
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "40px"
            }}>
              {AGENT_CATEGORIES.map(category => (
                <a 
                  key={category.id}
                  href={`#${category.id}`}
                  style={{ 
                    padding: "12px 24px", 
                    background: "rgba(255,255,255,0.15)", 
                    borderRadius: "50px", 
                    color: "white", 
                    textDecoration: "none",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(5px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span style={{ 
                    display: "inline-block",
                    marginRight: "10px",
                    fontSize: "20px"
                  }}>
                    {category.icon}
                  </span>
                  <span>{category.title}</span>
                </a>
              ))}
            </div>
            
            <div className="scroll-indicator" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: isScrolled ? 0 : 1,
              transition: "opacity 0.3s ease",
              position: "absolute",
              bottom: "-120px",
              left: "50%",
              transform: "translateX(-50%)"
            }}>
              <span style={{ marginBottom: "8px", fontSize: "14px", opacity: 0.8 }}>Scroll to explore</span>
              <div style={{ 
                width: "30px", 
                height: "50px", 
                border: "2px solid rgba(255,255,255,0.5)", 
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                padding: "8px 0"
              }}>
                <div style={{ 
                  width: "8px", 
                  height: "8px", 
                  background: "white", 
                  borderRadius: "50%",
                  animation: "scrollIndicator 1.5s infinite"
                }} />
              </div>
            </div>
            
            <style>
              {`
                @keyframes scrollIndicator {
                  0% { transform: translateY(0); opacity: 1; }
                  75% { transform: translateY(20px); opacity: 0; }
                  100% { transform: translateY(0); opacity: 0; }
                }
              `}
            </style>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 20px" }}>
        {/* Introduction */}
        <div style={{ 
          textAlign: "center", 
          marginBottom: "80px", 
          maxWidth: "800px", 
          margin: "0 auto 80px auto" 
        }}>
          <h2 style={{ 
            fontSize: "36px", 
            fontWeight: 700, 
            marginBottom: "20px", 
            color: "#333",
            position: "relative",
            display: "inline-block"
          }}>
            Enhancing Gargash Group's Operations with AI
            <div style={{
              position: "absolute",
              bottom: "-10px",
              left: "25%",
              width: "50%",
              height: "4px",
              background: "#0a75c9",
              borderRadius: "2px"
            }} />
          </h2>
          <p style={{ 
            fontSize: "18px", 
            lineHeight: 1.7, 
            color: "#555",
            marginTop: "30px"
          }}>
            Our AI assistants are designed to streamline workflows, provide expert guidance, and help your teams work more efficiently. Each assistant specializes in specific business domains to offer tailored support for your unique needs.
          </p>
        </div>
        
        {/* Agent Categories - updated to pass index */}
        {AGENT_CATEGORIES.map((category, index) => (
          <CategorySection 
            key={category.id} 
            category={category} 
            index={index}
          />
        ))}
        
        {/* Bottom CTA */}
        <div style={{ 
          marginTop: "100px", 
          background: "linear-gradient(135deg, #f0f6ff 0%, #e6f2ff 100%)", 
          borderRadius: "24px", 
          padding: "60px", 
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.05)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Background decoration */}
          <div style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(10, 117, 201, 0.1) 0%, rgba(10, 117, 201, 0.05) 50%, transparent 70%)",
            zIndex: 1
          }} />
          <div style={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(10, 117, 201, 0.1) 0%, rgba(10, 117, 201, 0.05) 50%, transparent 70%)",
            zIndex: 1
          }} />
          
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2 style={{ 
              fontSize: "36px", 
              fontWeight: 700, 
              marginBottom: "20px", 
              color: "#333",
              maxWidth: "800px",
              margin: "0 auto 20px auto"
            }}>
              Need a Custom AI Assistant?
            </h2>
            <p style={{ 
              fontSize: "18px", 
              marginBottom: "40px", 
              color: "#555",
              maxWidth: "700px",
              margin: "0 auto 40px auto",
              lineHeight: 1.7
            }}>
              We can develop specialized AI assistants tailored to your specific business needs and workflows, enhancing productivity and decision-making throughout your organization.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
              <Link 
                to="/contact" 
                style={{ 
                  display: "inline-block",
                  background: "#0a75c9", 
                  color: "white", 
                  padding: "16px 32px", 
                  borderRadius: "30px", 
                  textDecoration: "none", 
                  fontWeight: 600,
                  fontSize: "17px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 6px 15px rgba(10, 117, 201, 0.3)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(10, 117, 201, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 15px rgba(10, 117, 201, 0.3)";
                }}
              >
                Contact Our AI Development Team
              </Link>
              <Link 
                to="/conversations" 
                style={{ 
                  display: "inline-block",
                  background: "white", 
                  color: "#0a75c9", 
                  padding: "16px 32px", 
                  borderRadius: "30px", 
                  textDecoration: "none", 
                  fontWeight: 600,
                  fontSize: "17px",
                  border: "1px solid #0a75c9",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)";
                }}
              >
                View My Conversations
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GargashAgents; 