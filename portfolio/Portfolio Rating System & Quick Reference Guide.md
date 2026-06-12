---
aliases:
type: Resource
archetype: "[[Knowledge Base]]"
status: Completed
progress: 100%
rating:
resource_type:
author:
date_consumed: 2025-11-18
source:
up:
  - "[[Internal Work Rating System]]"
related:
tags: knowledge/resource
uuid: 20251118153146
created: 2025-11-18T15:32:36+05:00
modified: 2025-11-18T15:36:19+05:00
---


# Portfolio Rating System & Quick Reference Guide (Resource Review)

## Key Takeaways (Summary)



## Concepts Extracted (Dataview Query)

```dataview
LIST
FROM "Knowledge Base/Concepts"
WHERE contains(source, [[Portfolio Rating System & Quick Reference Guide]])
SORT file.name ASC
```

## Deep Dive Notes


## Table of Contents

1. [Mobile Development Ratings](#mobile-development-ratings)
2. [Web Development Ratings](#web-development-ratings)
3. [Client-Type Specific Criteria](#client-type-specific-criteria)
4. [Quick-Reference Scorecard](#quick-reference-scorecard)
---

## MOBILE DEVELOPMENT RATINGS

- ### **TIER 1: FLAGSHIP PROJECTS (9-10/10)**

_Use these for high-stakes proposals and portfolio leads_

#### **Fasal360** - 9.5/10

- **Technical Complexity**: 3/3 - AI integration, agriculture data systems, multi-user roles
- **UI/UX Polish**: 2/2 - Custom agricultural interface, data visualization
- **Architecture**: 2/2 - Clean architecture, scalable backend
- **Features**: 2/2 - AI-powered recommendations, weather API, seed verification
- **Deployment**: 1/1 - Live on both stores + functioning website
- **Key Strength**: AI integration + domain-specific complexity
- **Best For**: Enterprise/startup pitches requiring innovation

#### **Frenzone Live** - 9/10

- **Technical Complexity**: 3/3 - Real-time video streaming, virtual gifting, social features
- **UI/UX Polish**: 2/2 - Polished streaming interface, smooth interactions
- **Architecture**: 2/2 - Socket.io real-time architecture, Node.js backend
- **Features**: 1.5/2 - Live streaming, monetization, content creation tools
- **Deployment**: 1/1 - Live on both stores, proven user base
- **Key Strength**: Real-time features + complex monetization
- **Best For**: Social media, streaming platform, creator economy projects

#### **ProsReady** - 8.5/10

- **Technical Complexity**: 3/3 - Two-sided marketplace, booking system, payment integration
- **UI/UX Polish**: 1.5/2 - Professional but standard service app UI
- **Architecture**: 2/2 - Firebase architecture, dual-app ecosystem
- **Features**: 2/2 - Complete marketplace features, real transactions ($50K+ monthly)
- **Deployment**: 1/1 - Live, generating revenue
- **Key Strength**: Proven revenue generation + marketplace complexity
- **Best For**: Service marketplace, gig economy, booking platform projects

---

### **TIER 2: STRONG PROFESSIONAL WORK (7-8/10)**

#### **Ambit (OurSports)** - 8/10

- **Technical Complexity**: 2.5/3 - Performance tracking, team coordination, analytics
- **UI/UX Polish**: 2/2 - Sports-focused clean design
- **Architecture**: 1.5/2 - Standard patterns, good structure
- **Features**: 2/2 - Complete productivity + sports features
- **Deployment**: 1/1 - Live on both stores
- **Best For**: Fitness, sports, productivity app projects

#### **EuroJobs Search** - 8/10

- **Technical Complexity**: 2.5/3 - Job matching algorithms, dual-sided platform
- **UI/UX Polish**: 1.5/2 - Professional job platform UI
- **Architecture**: 1.5/2 - Firebase backend, clean structure
- **Features**: 2/2 - Profile building, job recommendations, matching
- **Deployment**: 1/1 - Live on both stores
- **Best For**: Job platforms, recruitment, professional networking

#### **Repairoo** - 8/10

- **Technical Complexity**: 2.5/3 - Service bidding system, dual-sided marketplace
- **UI/UX Polish**: 1.5/2 - Clean service platform design
- **Architecture**: 1.5/2 - Firebase, real-time bidding
- **Features**: 2/2 - Bidding, reviews, job management
- **Deployment**: 0.5/1 - Live Android only + website
- **Best For**: Home services, bidding platforms, contractor marketplaces

#### **Tamred** - 7.5/10

- **Technical Complexity**: 2/3 - Business suite functionality
- **UI/UX Polish**: 1.5/2 - Professional business app UI
- **Architecture**: 1.5/2 - Firebase architecture
- **Features**: 1.5/2 - Core business features
- **Deployment**: 1/1 - Live on both stores
- **Best For**: Business management, SaaS, productivity tools

#### **Petty (Pet Care)** - 7.5/10

- **Technical Complexity**: 2/3 - Pet care management, scheduling
- **UI/UX Polish**: 1.5/2 - Pet-friendly design
- **Architecture**: 1.5/2 - Standard Firebase setup
- **Features**: 1.5/2 - Booking, pet profiles, care tracking
- **Deployment**: 1/1 - Live on both stores
- **Best For**: Pet services, veterinary, animal care projects

#### **My Boutique** - 7/10

- **Technical Complexity**: 2/3 - E-commerce features, inventory management
- **UI/UX Polish**: 1.5/2 - Standard e-commerce UI
- **Architecture**: 1.5/2 - Firebase backend
- **Features**: 1.5/2 - Product management, seller tools
- **Deployment**: 0.5/1 - iOS only
- **Best For**: E-commerce, seller platforms, retail management

---

### **TIER 3: SOLID DELIVERY (6-7/10)**

#### **The Challenge (Fitness)** - 7/10

- **Technical Complexity**: 2/3 - Fitness tracking, challenges
- **UI/UX Polish**: 1.5/2 - Clean fitness app design
- **Architecture**: 1/2 - Standard patterns
- **Features**: 1.5/2 - Challenge system, tracking
- **Deployment**: 0.5/1 - iOS only
- **Best For**: Fitness challenges, wellness apps

#### **EuroJobs Pro** - 6.5/10

- **Technical Complexity**: 2/3 - Recruiter-side platform
- **UI/UX Polish**: 1/2 - Functional professional UI
- **Architecture**: 1.5/2 - Firebase backend
- **Features**: 1/2 - Standard recruiter features
- **Deployment**: 0.5/1 - Limited availability
- **Best For**: HR tech, recruitment platforms (paired with EuroJobs Search)

---

### **TIER 4: NOT LIVE - DESIGN/DEVELOPMENT ONLY (Use Cautiously)**

#### **Package Guard** - 6/10 (Not Live)

- **Technical Complexity**: 2/3 - IoT integration, security features
- **UI/UX Polish**: 1.5/2 - Security-focused design
- **Architecture**: 1/2 - Firebase + IoT connections
- **Features**: 1/2 - Device pairing, notifications
- **Deployment**: 0/1 - Not launched by client
- **Use Case**: Only mention for IoT/security projects if explicitly relevant

#### **Werwigo (Social Media)** - 5.5/10 (Not Live)

- **Technical Complexity**: 2/3 - Social features
- **UI/UX Polish**: 1/2 - Standard social UI
- **Architecture**: 1/2 - Node.js backend
- **Features**: 1/2 - Basic social networking
- **Deployment**: 0/1 - Not launched
- **Use Case**: Avoid unless desperate for social media example

#### **EReceipt/EReceipt Web** - 5/10 (Not Live)

- **Technical Complexity**: 1.5/3 - Expense tracking
- **UI/UX Polish**: 1/2 - Functional UI
- **Architecture**: 1/2 - Node.js/Firebase
- **Features**: 1/2 - Receipt scanning, expense tracking
- **Deployment**: 0/1 - Not launched
- **Use Case**: Mention only for fintech/accounting projects

---

## WEB DEVELOPMENT RATINGS

### **TIER 1: ENTERPRISE-GRADE (8-10/10)**

#### **BMEssentia Website** - 8.5/10

- **Technical Stack**: 3/3 - React, modern web stack, medical compliance considerations
- **Responsive Design**: 2/2 - Mobile-first, all breakpoints covered
- **Features**: 2/2 - Educational content, biomedical systems
- **UI Implementation**: 1.5/2 - Professional medical design
- **Deployment**: 1/1 - Live on Netlify
- **Best For**: Healthcare, educational platforms, medical tech

#### **Fasal360 Website** - 8/10

- **Technical Stack**: 2.5/3 - Modern web stack, SEO optimized
- **Responsive Design**: 2/2 - Agriculture-focused responsive design
- **Features**: 2/2 - Landing page, product showcase, AI features explained
- **UI Implementation**: 1.5/2 - Clean agricultural branding
- **Deployment**: 1/1 - Live and functional
- **Best For**: AgTech, SaaS landing pages, product marketing

#### **Repairoo Website** - 7.5/10

- **Technical Stack**: 2.5/3 - Service marketplace web presence
- **Responsive Design**: 1.5/2 - Good mobile experience
- **Features**: 1.5/2 - Service showcase, provider signup
- **UI Implementation**: 1.5/2 - Professional service platform design
- **Deployment**: 1/1 - Live in Dubai market
- **Best For**: Service platforms, local business websites

---

### **TIER 2: PROFESSIONAL CLIENT DELIVERABLES (6-8/10)**

#### **Virtual Try-On (Maryum n Maria)** - 7.5/10

- **Technical Stack**: 2.5/3 - Shopify + AI integration (OpenAI, ByteDance APIs)
- **Responsive Design**: 2/2 - E-commerce responsive design
- **Features**: 2/2 - AR try-on, e-commerce features, payment integration
- **UI Implementation**: 1/2 - Standard Shopify customization
- **Deployment**: 0.5/1 - Live but as Shopify site
- **Best For**: E-commerce + AI, fashion tech, virtual try-on projects

#### **Dr. Luisa Website** - 6.5/10

- **Technical Stack**: 2/3 - React, appointment booking
- **Responsive Design**: 1.5/2 - Medical professional site
- **Features**: 1.5/2 - Booking, doctor info
- **UI Implementation**: 1/2 - Clean medical design
- **Deployment**: 0/1 - Not live
- **Best For**: Healthcare websites, doctor booking systems

#### **Dent Clinic Website** - 6.5/10

- **Technical Stack**: 2/3 - React + Flutter app combo
- **Responsive Design**: 1.5/2 - Dental clinic professional site
- **Features**: 1.5/2 - Appointment booking, services showcase
- **UI Implementation**: 1/2 - Standard dental site
- **Deployment**: 0/1 - Not live
- **Best For**: Healthcare, dental practice websites

---

### **TIER 3: FUNCTIONAL BUT BASIC (5-6/10)**

#### **Havalook** - 6/10

- **Technical Stack**: 2/3 - React, service booking
- **Responsive Design**: 1/2 - Basic responsive
- **Features**: 1.5/2 - Service booking functionality
- **UI Implementation**: 1/2 - Functional design
- **Deployment**: 0/1 - Not live
- **Best For**: Use only if specifically relevant

---

## CLIENT-TYPE SPECIFIC CRITERIA

### **1. SMALL BUSINESS / STARTUPS (Budget: $5K-$15K)**

**Adjusted Scoring Emphasis:**

- **Speed to Market** (30% weight): Did you deliver fast?
- **Cost Efficiency** (25% weight): Single codebase = value proposition
- **Core Features** (25% weight): MVP functionality complete
- **Polish** (20% weight): Professional but not pixel-perfect required

**Best Portfolio Projects:**

- **Lead with**: Fasal360 (3-week turnaround), ProsReady (revenue-generating), My Boutique (seller-focused)
- **Emphasize**: "3-week MVP launches", "one codebase for 3 platforms", "real revenue generation"
- **Avoid**: Over-technical jargon, complex architecture discussions

**Proposal Tone:** Friendly-professional **Key Phrases:**

- "I've launched [X] apps in your industry"
- "From idea to App Store in 3 weeks"
- "Real apps generating real revenue"

---

### **2. ENTERPRISE / CORPORATE (Budget: $20K-$50K+)**

**Adjusted Scoring Emphasis:**

- **Architecture Quality** (30% weight): Scalability, maintainability
- **Security & Compliance** (25% weight): HIPAA, data protection
- **Technical Depth** (25% weight): Complex integrations, performance
- **Documentation** (20% weight): Professional deliverables

**Best Portfolio Projects:**

- **Lead with**: Fasal360 (AI integration), Frenzone (real-time architecture), EuroJobs (dual-platform ecosystem)
- **Emphasize**: Clean architecture, 99.9% crash-free rates, scalability, security
- **Include**: Technical metrics, performance data, architecture decisions

**Proposal Tone:** Technical-direct **Key Phrases:**

- "Clean architecture with [specific pattern]"
- "99.9% crash-free rate across 40+ apps"
- "Scalable backend infrastructure"
- "Experience with [relevant compliance: HIPAA, GDPR]"

---

### **3. TECHNICAL FOUNDERS / DEVELOPER CLIENTS**

**Adjusted Scoring Emphasis:**

- **Code Quality** (35% weight): "Your next dev will thank you"
- **Technical Stack** (25% weight): Modern, maintainable choices
- **Architecture** (25% weight): Patterns, state management, scalability
- **Documentation** (15% weight): Code comments, README, API docs

**Best Portfolio Projects:**

- **Lead with**: Projects with complex state management, API integrations, real-time features
- **Emphasize**: Technology choices, architecture patterns, code quality
- **Mention**: GitHub portfolio (if applicable), technical blog posts, open-source contributions

**Proposal Tone:** Technical-direct (more detailed) **Key Phrases:**

- "Bloc pattern for state management"
- "RESTful APIs with proper error handling"
- "Modular architecture for maintainability"
- "Complete API documentation"

---

### **4. NON-TECHNICAL / URGENCY CLIENTS (Budget: $3K-$10K)**

**Adjusted Scoring Emphasis:**

- **Speed** (40% weight): How fast can you ship?
- **Communication** (30% weight): Clear, simple explanations
- **Visual Results** (20% weight): They need to _see_ progress
- **Simplicity** (10% weight): Don't overwhelm with tech talk

**Best Portfolio Projects:**

- **Lead with**: Live app store links first, Figma designs second
- **Show**: Screenshots, demo videos, "download my app right now" CTAs
- **Emphasize**: Speed, visual results, simplicity

**Proposal Tone:** Speed-oriented, consultative **Key Phrases:**

- "I can have your MVP live in 2-3 weeks"
- "Here's an app I built - download it right now"
- "I'll send you daily progress screenshots"
- "No confusing tech jargon - I explain everything simply"

---

## QUICK-REFERENCE SCORECARD FOR PROPOSAL SELECTION

### **FILTERING SYSTEM: 3-STEP PROCESS**

#### **STEP 1: IDENTIFY CLIENT TYPE** (5 seconds)

```
□ Small Business/Startup → Budget <$15K, needs MVP fast
□ Enterprise/Corporate → Budget >$20K, needs scalability/compliance
□ Technical Founder → Developer-to-developer, cares about code quality
□ Non-Technical/Urgent → Needs hand-holding, wants fast results
```

#### **STEP 2: MATCH PROJECT REQUIREMENTS** (30 seconds)

**Use this decision tree:**

```
Job Requires AI/ML?
├─ YES → Lead with Fasal360 (9.5/10)
└─ NO → Continue to next question

Job Requires Real-Time Features (chat/video/live updates)?
├─ YES → Lead with Frenzone (9/10)
└─ NO → Continue to next question

Job is Two-Sided Marketplace?
├─ YES → Lead with ProsReady (8.5/10) or Repairoo (8/10)
└─ NO → Continue to next question

Job is Healthcare/Medical?
├─ YES → Lead with BMEssentia (web) or mention HIPAA experience
└─ NO → Continue to category match

Job is E-Commerce?
├─ YES → Lead with Canna Caban (if web), My Boutique (if mobile)
└─ NO → Continue to category match

Job is Job Platform/HR Tech?
├─ YES → Lead with EuroJobs Search + EuroJobs Pro (8/10 combo)
└─ NO → Continue to category match

Job is Sports/Fitness?
├─ YES → Lead with Ambit (8/10) or The Challenge (7/10)
└─ NO → Continue to industry match
```

#### **STEP 3: SELECT 4 PORTFOLIO EXAMPLES** (2 minutes)

**FORMULA: 1 Hero + 2 Supporting + 1 Relevant**

**Hero Project (Highest rated, most relevant):**

- Must be 8+ rating
- Must have live links if client is serious
- Must match job requirements closely

**Supporting Projects (7-8 rating):**

- Show breadth of experience
- Different industries but similar tech/features
- Both should have at least Figma links

**Relevant Project (6-8 rating):**

- Exact industry match even if lower rating
- OR unique feature that solves their specific pain point
- Can mention even if not live if highly relevant

---

### **QUICK SELECTION CHEAT SHEET**

**When job mentions:**

|Keyword/Requirement|Lead With|Support With|Mention|
|---|---|---|---|
|**AI/ML/Artificial Intelligence**|Fasal360 (9.5)|Frenzone (9), ProsReady (8.5)|Any relevant|
|**Real-time/Live/Streaming**|Frenzone (9)|Fasal360 (9.5), ProsReady (8.5)|Repairoo (8)|
|**Marketplace/Two-Sided**|ProsReady (8.5)|Repairoo (8), EuroJobs (8)|Frenzone (9)|
|**E-Commerce/Shopping**|Canna Caban|My Boutique (7), Fasal360 (9.5)|Virtual Try-On|
|**Healthcare/Medical**|BMEssentia web (8.5)|ProsReady (8.5), Petty (7.5)|Dr. Luisa, Dent Clinic|
|**Job Platform/HR/Recruitment**|EuroJobs Search (8)|EuroJobs Pro (6.5), ProsReady (8.5)|Any|
|**Social Media/Networking**|Frenzone (9)|Werwigo (5.5 - careful!)|Chat apps|
|**Sports/Fitness/Wellness**|Ambit (8)|The Challenge (7), Petty (7.5)|Trofeo|
|**Home Services/Contractors**|ProsReady (8.5)|Repairoo (8), Havalook (6)|Any|
|**Agriculture/Farming**|Fasal360 (9.5)|None needed|Show domain expertise|
|**Pet Care/Veterinary**|Petty (7.5)|ProsReady (8.5), Repairoo (8)|Any|
|**Business Management/SaaS**|Tamred (7.5)|Ambit (8), Fasal360 (9.5)|Any|
|**Booking/Scheduling**|ProsReady (8.5)|Repairoo (8), Petty (7.5)|EuroJobs (8)|
|**Education/Learning**|BMEssentia (8.5)|EngPath, Lectura|Any|
|**Finance/Expense Tracking**|EReceipt (5 - avoid)|None strong|Use carefully|

---

### **RED FLAGS: PROJECTS TO AVOID**

**Never lead with these unless absolutely necessary:**

|Project|Rating|Why Avoid|When to Mention|
|---|---|---|---|
|Package Guard|6/10|Not live, IoT niche|Only for IoT/security jobs|
|Werwigo|5.5/10|Not live, generic social|Avoid completely|
|EReceipt|5/10|Not live, basic features|Only for expense tracking jobs|
|EReceipt Web|5/10|Not live|Only for web expense tracking|
|Dr. Luisa|6.5/10|Not live|Healthcare if desperate|
|Dent Clinic|6.5/10|Not live|Dental/healthcare if desperate|
|Havalook|6/10|Not live|Home services if desperate|

**Why these are risky:**

- Clients can't download/verify
- May indicate project failure
- Lower perceived credibility
- Better alternatives available

---

## PROPOSAL TEMPLATES BY CLIENT TYPE

### **SMALL BUSINESS/STARTUP TEMPLATE**

**Portfolio Selection:**

1. **Hero**: Fasal360 (3-week turnaround) OR ProsReady (revenue proof)
2. **Support 1**: Repairoo (marketplace similar to their needs)
3. **Support 2**: Ambit or Petty (different industry, shows range)
4. **Relevant**: Industry match if available

**Opening Hook:** Pain point + speed **Format:**

- Figma link first
- App Store links second
- Brief feature list (3-4 bullets max)

---

### **ENTERPRISE/CORPORATE TEMPLATE**

**Portfolio Selection:**

1. **Hero**: Fasal360 (AI complexity) OR Frenzone (real-time architecture)
2. **Support 1**: ProsReady (scalability proof)
3. **Support 2**: EuroJobs (dual-platform ecosystem)
4. **Relevant**: Compliance-heavy project if they mention security

**Opening Hook:** Technical credibility + business outcome **Format:**

- Technical architecture mention
- Performance metrics (99.9% crash-free, 60fps)
- Scalability proof
- Figma + Live links

---

### **TECHNICAL FOUNDER TEMPLATE**

**Portfolio Selection:**

1. **Hero**: Project with most complex state management/architecture
2. **Support 1**: Real-time features project
3. **Support 2**: Clean architecture example
4. **Relevant**: Their tech stack match

**Opening Hook:** Code quality + architecture decisions **Format:**

- State management approach
- Architecture patterns
- Tech stack choices
- GitHub links (if public)

---

### **NON-TECHNICAL/URGENT TEMPLATE**

**Portfolio Selection:**

1. **Hero**: Fastest project delivery (Fasal360 3-week launch)
2. **Support 1**: Live app they can download NOW
3. **Support 2**: Another live app, different industry
4. **Relevant**: Visual/simple project similar to theirs

**Opening Hook:** "Download this app I built" **Format:**

- App Store links FIRST
- Screenshots embedded
- Simple language
- Daily updates promise

---

## USAGE RULES

### **DO:**

✅ Always lead with 8+ rated projects for competitive bids 
✅ Mention delivery speed for projects <4 weeks 
✅ Include live links whenever possible 
✅ Match client sophistication level 
✅ Use different projects for each of 4 examples 
✅ Adjust tone based on client type 
✅ Emphasize revenue generation for business-focused clients 
✅ Mention technical architecture for developer clients

### **DON'T:**

❌ Lead with non-live projects unless extremely relevant 
❌ Use projects rated <6 unless absolutely necessary 
❌ Mention more than 4 projects in initial proposal 
❌ Use same 4 projects for every proposal 
❌ Over-explain technical details to non-technical clients 
❌ Under-explain technical details to developer clients 
❌ Mention project failures or client conflicts 

---

## TRACKING YOUR PROPOSALS

**Create a simple spreadsheet:**

|Date|Job Type|Client Type|Hero Project|Support 1|Support 2|Relevant|Response Rate|
|---|---|---|---|---|---|---|---|
|2025-01-15|AI Chatbot|Startup|Fasal360 (9.5)|Frenzone (9)|ProsReady (8.5)|None|Yes - Interview|
|2025-01-16|Service App|Enterprise|ProsReady (8.5)|Repairoo (8)|Ambit (8)|Havalook (6)|No response|

**Track which combinations work best for:**

- Interview invitations
- Contract wins
- Client types
- Industries

---

## CONFIDENCE SCORING

**Before sending proposal, ask:**

1. **Do I have 3+ projects rated 7+ that match?**
    
    - Yes = High confidence (90%+ quality proposal)
    - No = Medium confidence (reassess strategy)
2. **Can I show at least 2 live store links?**
    
    - Yes = High credibility
    - No = Medium credibility (lead with Figma)
3. **Does my hero project rate 8+?**
    
    - Yes = Competitive bid
    - No = May need to justify lower rate
4. **Have I matched client sophistication level?**
    
    - Yes = Proposal ready
    - No = Revise tone/technical depth

**If all 4 = YES → Send confidently** **If 3 = YES → Send, but be ready to negotiate** **If 2 or fewer = YES → Reconsider bidding or adjust strategy**

---

## FINAL REMINDERS

1. **Quality over quantity**: Better to skip a bid than lead with weak projects
2. **Client type matters more than job type**: Same project, different presentation
3. **Live links are gold**: Always prioritize projects on store
4. **Update this scorecard**: As you complete new projects, reassess ratings
5. **Track what works**: Continuously improve selection based on results

**Last Updated:** November 2025 **Next Review:** After 10 new proposals or first new completed project