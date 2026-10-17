"use client";

import { useEffect, useId, useRef, useState } from "react";
import LogoMarquee from "./logo-marquee";
import ScrollMotion from "./scroll-motion";
import {
  ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight,
  Check, ChevronDown, Globe2, Layers3, Menu, Plus, Search, X,
  CircleCheck, MapPin, Linkedin, Phone,
} from "lucide-react";

const asset = (name: string) => `/brand/optimized/${name.replace(/\.[^.]+$/,".webp")}`;

const solutions = [
  { id: "sap", number: "01", title: "A smarter way\nto run your business.", category: "SAP SOLUTIONS", short: "Connect your processes. See the bigger picture.", logo: "sap4hana.png", className: "sap-card", heading: "Your whole business.\nOn the same page.", description: "Bring finance, operations, people and customers together with SAP. We help you choose the right platform, shape it around your business, and make the move with confidence.", products: ["GROW with SAP", "RISE with SAP", "SAP Business One", "SAP Business ByDesign", "SAP SuccessFactors", "SAP Business Data Cloud"], source: "https://www.techpac.lk/sap/", contact: "SAP & enterprise transformation" },
  { id: "ezuite", number: "02", title: "Big ambitions.\nAgile cloud ERP.", category: "eZUITE ERP", short: "Made for the way growing businesses move.", logo: "ezuite.png", className: "ezuite-card", heading: "Less disconnected.\nMore in control.", description: "A flexible, Azure-based ERP for manufacturing, distribution and retail. eZuite brings the tools your business needs into one connected platform, from inventory and procurement to finance, sales and CRM.", products: ["Inventory & procurement", "Finance & accounts", "Manufacturing", "Sales & CRM", "Payroll & people", "Mobile & analytics"], source: "https://www.techpac.lk/products/e-zuite/", contact: "eZuite cloud ERP" },
  { id: "infrastructure", number: "03", title: "Always ready.\nAlways on.", category: "DIGITAL INFRASTRUCTURE", short: "A stronger foundation for everything you do.", logo: "vertiv-authorized-business-partner.png", className: "vertiv-card", heading: "Behind every ambition,\na resilient foundation.", description: "Keep your critical systems powered, cooled and protected with Vertiv. From a single SmartCabinet to a complete server room, we design for your space, your needs and your next stage of growth.", products: ["Vertiv SmartCabinet", "Vertiv SmartRow", "Data centres & server rooms", "Power & cooling", "Infrastructure monitoring", "Maintenance contracts"], source: "https://www.techpac.lk/products/digital-infrastructure/", contact: "Vertiv & digital infrastructure" },
  { id: "applications", number: "04", title: "Give great ideas\nthe right tools.", category: "BUSINESS APPLICATIONS", short: "Create, collaborate and connect with confidence.", logo: "adobe.png", className: "apps-card", heading: "The right tools.\nA world of possibility.", description: "From creative work to customer relationships, equip your team with world-class applications. We make licensing straightforward and help you get more from the software you depend on.", products: ["Adobe", "Salesforce", "TeamViewer", "Arcserve", "Siemens", "Qualtrics", "Proaxia", "Interact Suite"], source: "https://www.techpac.lk/products/applications/", contact: "Business applications & licensing" },
  { id: "cloud", number: "05", title: "Room to grow.\nFreedom to move.", category: "CLOUD SOLUTIONS", short: "From your first move to what comes next.", logo: "aws.png", className: "cloud-card", heading: "Your next chapter.\nWithout the limits.", description: "Build a cloud journey around your business. We bring together assessment, migration and ongoing management through a portfolio that includes AWS, Huawei Cloud, Cloud Kinetics and Orel Cloud.", products: ["Cloud assessment", "Migration planning", "AWS", "Huawei Cloud", "Cloud Kinetics", "Orel Cloud", "Managed services"], source: "https://www.techpac.lk/products/cloud-solutions/", contact: "Cloud migration & managed services" },
  { id: "security", number: "06", title: "Connected.\nProtected. Prepared.", category: "SYSTEM INTEGRATION", short: "Make every layer work better, together.", logo: "p16.png", className: "security-card", heading: "Confidence.\nBuilt into every layer.", description: "Connect and protect the systems your business relies on. Our infrastructure, security and professional services bring compute, networks, surveillance and access control into a more dependable whole.", products: ["Compute & networking", "Cybersecurity", "Data & network security", "CCTV & access control", "Building systems", "IT consultancy & support"], source: "https://www.techpac.lk/products/system-integration/", contact: "System integration & security" },
];

const stories = [
  { name: "Acorn Travels", sector: "TRAVEL & HOSPITALITY", logo: "acorn.png", title: "Nine companies.\nOne connected journey.", text: "A unified SAP Business ByDesign platform, connecting nine companies and more than 25 supplier and banking integrations.", stat: "09", statLabel: "companies connected", product: "SAP Business ByDesign", source: "https://www.techpac.lk/success-stories/redefining-travel/", tone: "story-blue", number: "01" },
  { name: "Teejay Lanka", sector: "APPAREL & TEXTILES", logo: "teejay.png", title: "Two countries.\nOne people platform.", text: "SAP SuccessFactors connected employee data, time and attendance, performance and goals across operations in Sri Lanka and India.", stat: "02", statLabel: "countries, connected", product: "SAP SuccessFactors", source: "https://www.techpac.lk/success-stories/strategic-hr/", tone: "story-green", number: "02" },
  { name: "United Motors", sector: "AUTOMOTIVE", logo: "um.png", title: "A new gear for\nbusiness performance.", text: "A tailored automotive solution powered by SAP HANA, simplifying processes and bringing company-wide insight into real time.", stat: "360°", statLabel: "business visibility", product: "SAP Business Suite on HANA", source: "https://www.techpac.lk/success-stories/achieving-business-agility/", tone: "story-pale", number: "03" },
];

const quotes = [
  { quote: "Tech Pacific worked closely with our teams to understand both our business and technology requirements.", name: "Mangala Wickramasinghe", role: "Chief Information Officer, DIMO", logo: "dimo-logo.png", initial: "MW", source: "https://www.techpac.lk/about/" },
  { quote: "Tech Pacific’s deep expertise and proactive approach made this transformation seamless, strategic, and sustainable.", name: "Shivantha Perera", role: "Group Head of IT, Maliban Manufactories", logo: "maliban-logo.png", initial: "SP", source: "https://www.techpac.lk/about/" },
  { quote: "Their high standards in professionalism, quality, consistent on-time delivery, and willingness to negotiate renewals are the reason behind Alliance Finance selecting Tech Pacific time and again.", name: "Samuel Sathiyadaran", role: "IT Consultant, Alliance Finance", logo: "alliance-finance-logo.jpg", initial: "SS", source: "https://www.techpac.lk/about/" },
];

const faqs = [
  { question: "Where should our digital transformation begin?", answer: "Start with your business priorities: the processes that slow you down, the information you need, and the growth you are planning for. Our team can help assess those needs and shape a practical path across ERP, applications, cloud and infrastructure." },
  { question: "Which ERP is right for our business?", answer: "That depends on your scale, industry, processes and plans. Our portfolio includes GROW with SAP, RISE with SAP, SAP Business One, SAP Business ByDesign and eZuite. We work with you to understand the requirements before recommending a platform." },
  { question: "Can you work with our existing systems?", answer: "We offer integrations, migrations and upgrades alongside new implementations. Tell us about your current systems and the outcomes you want, and we can assess the most suitable way to connect and modernise them." },
  { question: "What happens after we go live?", answer: "Our relationship continues beyond implementation. Depending on the solution, we provide technical support, maintenance contracts, training and managed services. The scope and service arrangements are agreed around your needs." },
  { question: "Do you support businesses outside Sri Lanka?", answer: "Yes. Our published projects include delivery across Sri Lanka and India, and infrastructure work in the Maldives. Speak with us about your locations and scope so we can confirm the delivery approach for your project." },
];

function Arrow({ diagonal = true, size = 18 }: { diagonal?: boolean; size?: number }) {
  return diagonal ? <ArrowUpRight size={size} strokeWidth={1.6} aria-hidden="true" /> : <ArrowRight size={size} strokeWidth={1.6} aria-hidden="true" />;
}

function Wordmark({ kind }: { kind: string }) {
  if (kind === "sap") return <span className="sap-wordmark"><img src={asset("sap4hana.png")} alt="SAP Cloud ERP" width="1920" height="283" /></span>;
  if (kind === "vertiv") return <span className="vertiv-wordmark"><img src={asset("vertiv-authorized-business-partner.png")} alt="Vertiv Authorized Business Partner" width="1600" height="588" /></span>;
  if (kind === "ezuite") return <img className="ezuite-wordmark" src={asset("ezuite.png")} alt="eZuite" width="116" height="38" />;
  return null;
}

function ContactForm({ interest }: { interest: string }) {
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const field = formRef.current?.elements.namedItem("solution") as HTMLSelectElement | null;
    if (field && interest) field.value = interest;
  }, [interest]);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Hello Tech Pacific,\n\nI'd like to discuss ${data.get("solution")}.\n\nName: ${data.get("name")}\nCompany: ${data.get("company")}\nEmail: ${data.get("email")}\n\n${data.get("message")}\n\nThank you.`;
    const href = `mailto:info@techpac.lk?subject=${encodeURIComponent(`Website enquiry: ${data.get("solution")}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setStatus("Your enquiry is ready in your email app. Review it and send it to our team. You can also reach us at info@techpac.lk.");
  }

  return <form ref={formRef} onSubmit={submit} className="contact-form">
    <div className="form-row">
      <label>Your name <span>*</span><input name="name" placeholder="First and last name" autoComplete="name" required maxLength={120} /></label>
      <label>Work email <span>*</span><input name="email" type="email" placeholder="you@company.com" autoComplete="email" required maxLength={200} /></label>
    </div>
    <div className="form-row">
      <label>Company <span>*</span><input name="company" placeholder="Your organisation" autoComplete="organization" required maxLength={180} /></label>
      <label>What can we help with?<select name="solution" defaultValue="Let’s find the right solution">
        <option>Let’s find the right solution</option>
        {solutions.map(s => <option key={s.id}>{s.contact}</option>)}
      </select></label>
    </div>
    <label>A little about your plans<textarea name="message" placeholder="Your next big idea, your everyday challenge. We’re listening." rows={3} maxLength={3000} /></label>
    <div className="form-bottom"><p>This opens an email draft to our team.</p><button className="button blue-button" type="submit">Let’s start a conversation <Arrow /></button></div>
    {status && <p className="form-status" role="status"><CircleCheck size={19} />{status}</p>}
  </form>;
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSolution, setActiveSolution] = useState(0);
  const [storyOffset, setStoryOffset] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [interest, setInterest] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const productsButton = useRef<HTMLButtonElement>(null);
  const exploreButton = useRef<HTMLButtonElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const detailTitle = useRef<HTMLHeadingElement>(null);
  const menuId = useId();
  const productsId = useId();
  const searchId = useId();
  const current = solutions[activeSolution];
  const quote = quotes[quoteIndex];

  useEffect(() => {
    if (!menuOpen && !productsOpen && !searchOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (searchOpen) {
        setSearchOpen(false);
        (window.matchMedia("(max-width: 1100px)").matches ? menuButton : exploreButton).current?.focus();
      } else if (productsOpen) {
        setProductsOpen(false);
        productsButton.current?.focus();
      } else {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    function onOutsideClick(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setProductsOpen(false);
        setSearchOpen(false);
        setMenuOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutsideClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, [menuOpen, productsOpen, searchOpen]);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  function closeNavigation() {
    setMenuOpen(false);
    setProductsOpen(false);
    setSearchOpen(false);
  }

  const productLabels = ["SAP", "eZuite - ERP", "Digital Infrastructure", "Applications", "Cloud Solutions", "System Integration"];
  const searchItems = [
    ...solutions.map((solution, index) => ({label:productLabels[index],href:"#solution-detail",keywords:solution.products.join(" "),index})),
    {label:"About Tech Pacific",href:"#about",keywords:"company history team partner",index:-1},
    {label:"Success Stories",href:"#stories",keywords:"Acorn Teejay United Motors customers case studies",index:-1},
    {label:"Contact Us",href:"#contact",keywords:"demo enquiry email phone address",index:-1},
    {label:"Blog",href:"https://www.techpac.lk/blog/",keywords:"articles news insights",index:-1},
  ].filter(item => `${item.label} ${item.keywords}`.toLowerCase().includes(searchQuery.trim().toLowerCase()));

  function exploreSolution(index: number) {
    setActiveSolution(index);
    requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "center" });
      detailTitle.current?.focus({ preventScroll: true });
    });
  }

  function startEnquiry(value: string) { setInterest(value); }

  return <>
    <ScrollMotion />
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="site-shell">
      <header ref={headerRef} className="header wrap">
        <a href="#" className="brand" aria-label="Tech Pacific home"><img src="/brand/techpac-official.png" alt="Tech Pacific" width="200" height="115" /></a>
        <nav aria-label="Main navigation" className={`nav ${menuOpen ? "nav-open" : ""}`} id={menuId}>
          <a href="#solution-detail" onClick={() => {setActiveSolution(0);closeNavigation();}}>SAP</a>
          <div className="nav-products">
            <button ref={productsButton} className="nav-disclosure" aria-expanded={productsOpen} aria-controls={productsId} onClick={() => {setProductsOpen(v=>!v);setSearchOpen(false);}}>Products <ChevronDown size={13} aria-hidden="true" /></button>
            <div id={productsId} className="products-dropdown" hidden={!productsOpen}>
              <span className="dropdown-caption">OUR PRODUCT PORTFOLIO</span>
              {solutions.map((solution,index)=><a key={solution.id} href="#solution-detail" onClick={() => {setActiveSolution(index);closeNavigation();}}><span>{productLabels[index]}</span><Arrow size={14} /></a>)}
            </div>
          </div>
          {[ ["About", "#about"], ["Success Stories", "#stories"], ["Contact Us", "#contact"] ].map(([label,href]) => <a key={href} href={href} onClick={closeNavigation}>{label}</a>)}
          <a href="https://www.techpac.lk/blog/" target="_blank" rel="noreferrer" onClick={closeNavigation}>Blog</a>
          <button ref={exploreButton} className="nav-disclosure explore-toggle" aria-expanded={searchOpen} aria-controls={searchId} onClick={() => {setSearchOpen(v=>!v);setProductsOpen(false);setMenuOpen(false);}}>Explore <Search size={16} aria-hidden="true" /></button>
          <a className="mobile-contact" href="#contact" onClick={() => {startEnquiry("Let’s find the right solution");closeNavigation();}}>Request a Demo <Arrow /></a>
        </nav>
        <a className="header-cta button blue-button" href="#contact" onClick={() => {startEnquiry("Let’s find the right solution");closeNavigation();}}>Request a Demo <Arrow size={17} /></a>
        <button ref={menuButton} className="menu-toggle" onClick={() => {setMenuOpen(v=>!v);setProductsOpen(false);setSearchOpen(false);}} aria-expanded={menuOpen} aria-controls={menuId} aria-label={menuOpen ? "Close navigation" : "Open navigation"}>{menuOpen ? <X /> : <Menu />}</button>
        <div id={searchId} className="site-search" role="search" aria-label="Explore Tech Pacific" hidden={!searchOpen}>
          <div className="search-field"><Search size={18} aria-hidden="true" /><input ref={searchInput} type="search" aria-label="Search Tech Pacific" placeholder="Find a product, service or story…" value={searchQuery} onChange={event=>setSearchQuery(event.target.value)} /><button aria-label="Close search" onClick={() => {setSearchOpen(false);(window.matchMedia("(max-width: 1100px)").matches ? menuButton : exploreButton).current?.focus();}}><X size={19} /></button></div>
          <span className="dropdown-caption" aria-live="polite">{searchQuery ? `${searchItems.length} ${searchItems.length===1?"RESULT":"RESULTS"}` : "EXPLORE TECH PACIFIC"}</span>
          <div className="search-results">{searchItems.map(item=><a key={item.label} href={item.href} target={item.href.startsWith("https:")?"_blank":undefined} rel={item.href.startsWith("https:")?"noreferrer":undefined} onClick={() => {if(item.index>=0)setActiveSolution(item.index);closeNavigation();}}>{item.label}<Arrow size={15} /></a>)}{searchItems.length===0&&<p>No matches yet. Try “SAP”, “cloud” or “contact”.</p>}</div>
        </div>
      </header>

      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-eyebrow"><span><i className="status-dot" /> YOUR NEXT CHAPTER, CONNECTED.</span><span className="hero-location"><Globe2 size={14} /> COLOMBO, SRI LANKA · SINCE 2008</span></div>
          <h1 id="hero-title">Making technology<br /><span className="hero-second">work for <span className="green-text">you.</span><span className="hero-spark" aria-hidden="true">✳</span></span></h1>
          <div className="hero-intro">
            <div className="hero-signature"><span className="tiny-cross" aria-hidden="true">+</span><p>Global capability.<br />Local accountability.</p></div>
            <div className="hero-description"><p>Big ideas need the right technology.<br className="desktop-break" /> We bring the systems, expertise and people<br className="desktop-break" /> together to move your business forward.</p><a href="#solutions" className="text-link">Find your next move <ArrowDownRight size={18} /></a></div>
          </div>
          <div className="hero-art">
            <img className="hero-image" src="/images/connected-flow.webp" srcSet="/images/connected-flow-768.webp 768w, /images/connected-flow-1280.webp 1280w, /images/connected-flow.webp 2000w" sizes="(max-width: 700px) calc(100vw - 54px), (max-width: 960px) calc(100vw - 80px), (max-width: 1200px) calc(100vw - 112px), (max-width: 1440px) calc(100vw - 144px), 1280px" alt="Sculptural blue metal and green glass ribbons flowing together, inspired by the Tech Pacific identity" width="2000" height="770" fetchPriority="high" decoding="async" />
            <span className="art-label"><span className="art-plus">+</span> BETTER, TOGETHER.</span>
            <a className="hero-scroll" href="#solutions" aria-label="Explore our solutions"><ArrowDown size={21} /></a>
            <div className="hero-art-caption"><span>Complexity, simplified.</span><span>Possibility, unlocked.</span></div>
          </div>
        </section>

        <LogoMarquee />

        <section className="solutions-section wrap section-space" id="solutions" aria-labelledby="solutions-heading">
          <div className="section-heading"><div><span className="eyebrow blue-text">01 / WHAT WE MAKE POSSIBLE</span><h2 id="solutions-heading">One partner.<br />Every possibility.</h2></div><div className="section-heading-note"><p>From the software that runs your business<br className="desktop-break" /> to the infrastructure that keeps it moving.<br className="desktop-break" /> Everything works better, connected.</p><span className="mini-label">SIX CAPABILITIES. ONE CLEAR DIRECTION.</span></div></div>
          <div className="solution-grid">
            {solutions.map((s,index)=><button key={s.id} className={`solution-card ${s.className} ${index===activeSolution ? "solution-selected" : ""}`} onClick={()=>exploreSolution(index)} aria-expanded={index===activeSolution} aria-controls="solution-detail">
              <div className="card-top"><span className="mini-label">{s.category}</span><span className="card-index">/{s.number}</span></div>
              <h3>{s.title.split("\n").map((l,i)=><span key={l}>{l}{i===0&&<br />}</span>)}</h3>
              <div className="solution-brand" aria-hidden="true">
                {s.id==="sap" ? <Wordmark kind="sap" /> : s.id==="ezuite" ? <Wordmark kind="ezuite" /> : s.id==="infrastructure" ? <Wordmark kind="vertiv" /> : s.id==="applications" ? <div className="apps-marks"><img src={asset("adobe.png")} alt="" width="65" height="25" /><img src={asset("salesforce.png")} alt="" width="65" height="30" /><img src={asset("team-viewer.png")} alt="" width="65" height="25" /></div> : s.id==="cloud" ? <div className="cloud-marks"><img src={asset("aws.png")} alt="" width="58" height="34" /><img src={asset("huawei.png")} alt="" width="62" height="34" /></div> : <div className="security-marks"><img src={asset("p16.png")} alt="" width="105" height="22" /><img src={asset("p17.png")} alt="" width="105" height="22" /></div>}
              </div>
              <div className="card-bottom"><span>{s.short}</span><span className="circle-arrow"><Arrow size={20} /></span></div>
            </button>)}
          </div>

          <div ref={detailRef} id="solution-detail" className="solution-detail" aria-label="Selected solution details">
            <div className="detail-copy" key={current.id}>
              <span className="eyebrow blue-text">A CLOSER LOOK / {current.category}</span>
              <h3 ref={detailTitle} tabIndex={-1}>{current.heading.split("\n").map((line,i)=><span key={line}>{line}{i===0&&<br />}</span>)}</h3>
              <p>{current.description}</p>
              <a href="#contact" className="text-link" onClick={()=>startEnquiry(current.contact)}>Let’s explore {current.id==="sap"?"SAP":current.id==="ezuite"?"eZuite":"the possibilities"} <Arrow /></a>
            </div>
            <div className="detail-products" key={`${current.id}-products`}>
              <div className="detail-product-header"><Layers3 size={20} strokeWidth={1.3} /><span>Designed to work together.</span><span className="small-dot" /></div>
              <ul>{current.products.map(p=><li key={p}><Check size={14} strokeWidth={1.5} />{p}</li>)}</ul>
              <a href={current.source} target="_blank" rel="noreferrer" className="detail-source">Explore the full portfolio <Arrow size={15} /></a>
            </div>
          </div>
        </section>

        <section id="about" className="about-section wrap section-space" aria-labelledby="about-heading">
          <div className="about-heading"><span className="eyebrow blue-text">02 / A PARTNER IN YOUR PROGRESS</span><h2 id="about-heading">Technology changes.<br />Our commitment doesn’t.</h2></div>
          <div className="about-layout">
            <div className="infrastructure-image"><img src="/images/infrastructure.webp" srcSet="/images/infrastructure-640.webp 640w, /images/infrastructure-960.webp 960w, /images/infrastructure.webp 1536w" sizes="(max-width: 700px) calc(100vw - 54px), (max-width: 1440px) 50vw, 650px" width="1536" height="1024" alt="Precisely engineered server infrastructure with blue and green status lights" loading="lazy" decoding="async" /><div className="image-corner-mark" aria-hidden="true">↗</div><span className="image-caption">A STRONGER FOUNDATION FOR WHAT’S NEXT.</span></div>
            <div className="about-copy"><span className="small-heading">GLOBAL THINKING. LOCAL UNDERSTANDING.</span><p className="about-lead">We make the complex<br className="desktop-break" /> feel possible.</p><p>Since 2008, we’ve evolved alongside the businesses we serve. From enterprise applications to critical infrastructure, our role is to understand your world — then bring the right technology into it.</p><p>You get global platforms, specialist expertise and a team close enough to care. From the first conversation to the next chapter.</p><a href="#contact" className="button outline-button">Get to know your next partner <Arrow /></a></div>
          </div>
          <div className="company-stats"><div><span>2008</span><p>Our journey began.<br />Our curiosity never stopped.</p></div><div><span>06</span><p>Connected capabilities.<br />Built around your business.</p></div><div><span>01</span><p>Accountable partner.<br />With you for the long run.</p></div></div>
        </section>

        <section id="approach" className="approach-section section-space" aria-labelledby="approach-heading">
          <div className="wrap"><div className="section-heading"><div><span className="eyebrow blue-text">03 / HOW WE MOVE FORWARD</span><h2 id="approach-heading">Start with you.<br />Build what’s next.</h2></div><p className="approach-intro">Good technology starts with better questions.<br />We listen first. Then connect the dots.</p></div>
            <div className="journey-line" aria-hidden="true"><svg viewBox="0 0 1200 150" preserveAspectRatio="none"><path d="M-30 95C120 170 154 15 300 63S445 180 570 88 753-25 889 63s233 89 341-20" /></svg></div>
            <div className="approach-steps">
              {[ ["01","Understand.","Your business comes first.","We get to know your processes, people and ambitions before we talk about platforms."], ["02","Connect.","The right fit. The bigger picture.","We shape the solution and bring the right technology and specialists together."], ["03","Transform.","A clear path from plan to progress.","We work with your teams through implementation, integration, training and go-live."], ["04","Keep moving.","A partnership beyond the project.","With support, maintenance and ongoing expertise, we help you prepare for what comes next."] ].map(([n,title,sub,desc])=><div key={n} className="approach-step"><span className="step-number">{n}</span><h3>{title}</h3><strong>{sub}</strong><p>{desc}</p></div>)}
            </div>
          </div>
        </section>

        <section id="stories" className="stories-section wrap section-space" aria-labelledby="stories-heading">
          <div className="section-heading"><div><span className="eyebrow blue-text">04 / PROGRESS, IN PRACTICE</span><h2 id="stories-heading">Real businesses.<br />New possibilities.</h2></div><div className="story-controls"><span className="mini-label">MEET THE BUSINESSES MOVING FORWARD</span><div className="carousel-arrows"><button onClick={()=>setStoryOffset(i=>(i+stories.length-1)%stories.length)} aria-label="Previous client stories"><ArrowLeft size={19} /></button><button className="filled" onClick={()=>setStoryOffset(i=>(i+1)%stories.length)} aria-label="Next client stories"><ArrowRight size={19} /></button></div></div></div>
          <div className="story-grid" aria-live="polite">{stories.map((_,i)=>stories[(i+storyOffset)%stories.length]).map(s=><article key={s.name} className={`story-card ${s.tone}`}><div className="story-top"><span className="mini-label">{s.sector}</span><Arrow size={19} /></div><div className="story-logo"><img src={asset(s.logo)} alt={s.name} width="150" height="60" loading="lazy" /></div><h3>{s.title.split("\n").map((l,i)=><span key={l}>{l}{i===0&&<br />}</span>)}</h3><p>{s.text}</p><div className="story-footer"><span>{s.product}</span><a href={s.source} target="_blank" rel="noreferrer" aria-label={`Read the ${s.name} case study`}><Arrow size={20} /></a></div></article>)}</div>
        </section>

        <section className="testimonial-section wrap section-space" aria-label="What our clients say">
          <div className="testimonial-label"><span className="eyebrow blue-text">THE PEOPLE BEHIND THE PROGRESS</span><span className="quote-mark" aria-hidden="true">“</span><img src={asset(quote.logo)} alt={quote.role.split(", ").slice(-1)[0]} width="130" height="65" loading="lazy" /></div>
          <div className="testimonial-body" aria-live="polite"><blockquote key={quote.name}><p>“{quote.quote}”</p><footer><span className="avatar" aria-hidden="true">{quote.initial}</span><div><cite>{quote.name}</cite><span>{quote.role}</span></div></footer></blockquote><div className="quote-navigation"><span>{String(quoteIndex+1).padStart(2,"0")} <span>/ 03</span></span><div className="carousel-arrows"><button onClick={()=>setQuoteIndex(i=>(i+quotes.length-1)%quotes.length)} aria-label="Previous testimonial"><ArrowLeft size={18} /></button><button className="filled" onClick={()=>setQuoteIndex(i=>(i+1)%quotes.length)} aria-label="Next testimonial"><ArrowRight size={18} /></button></div></div></div>
        </section>

        <section className="faq-section section-space" aria-labelledby="faq-heading"><div className="wrap faq-layout"><div className="faq-intro"><span className="eyebrow">05 / GOOD QUESTIONS. CLEAR ANSWERS.</span><h2 id="faq-heading">Let’s make<br />things clearer.</h2><div className="orbital-art" aria-hidden="true"><span className="orbit-one"/><span className="orbit-two"/><span className="orbit-three"/><span className="orbit-core"><Plus size={32} strokeWidth={1} /></span><span className="orbit-dot" /></div><p>Every business is different.<br />Let’s talk about yours.</p><a className="text-link" href="#contact">Ask us a question <Arrow /></a></div><div className="faq-list">{faqs.map((faq,i)=><div className={`faq-item ${openFaq===i?"faq-open":""}`} key={faq.question}><h3><button aria-expanded={openFaq===i} aria-controls={`faq-answer-${i}`} id={`faq-question-${i}`} onClick={()=>setOpenFaq(v=>v===i?null:i)}><span>{faq.question}</span><span className="faq-icon">{openFaq===i?<X size={18} />:<Plus size={18} />}</span></button></h3><div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} hidden={openFaq!==i}><p>{faq.answer}</p></div></div>)}</div></div></section>

        <section id="contact" className="contact-section wrap section-space" aria-labelledby="contact-heading"><div className="section-heading"><div><span className="eyebrow blue-text">06 / YOUR NEXT MOVE</span><h2 id="contact-heading">What’s next<br />for your business<span className="green-text">?</span></h2></div><p className="contact-intro">A new challenge. A bigger ambition.<br />A better way of doing things.<br /><strong>Let’s find it, together.</strong></p></div><div className="contact-layout"><div className="contact-details"><div className="map-art"><svg viewBox="0 0 420 240" aria-hidden="true"><path d="M-20 205 130 61 235 147 405-20M-20 102 172 248M83-20 230 240M210-20 118 120 434 155M-10 30 140 30 283 240M285-10 181 70 432 232M280 56 431 56"/><path className="map-water" d="M0 187c91-36 93 31 180 22S313 110 420 139v101H0Z"/></svg><span className="map-pin"><MapPin size={25} fill="currentColor"/><span>COLOMBO 04</span></span></div><div className="contact-address"><p>No. 4, Castle Lane<br />Colombo 04, Sri Lanka</p><a href="https://www.google.com/maps/search/?api=1&query=Tech+Pacific+4+Castle+Lane+Colombo+04" target="_blank" rel="noreferrer" aria-label="Find Tech Pacific on Google Maps"><Arrow /></a></div><a href="mailto:info@techpac.lk" className="contact-email">info@techpac.lk <Arrow size={20} /></a><a href="tel:+94117771177" className="contact-phone">+94 117 771 177</a></div><ContactForm interest={interest} /></div></section>
      </main>

      <footer className="footer wrap"><div className="footer-top"><a href="#" className="footer-brand" aria-label="Tech Pacific home"><img src="/brand/techpac-official.png" width="200" height="115" alt="Tech Pacific" /></a><p>Global capability.<br /><span>Local accountability.</span></p><a href="#" className="back-top">BACK TO TOP <ArrowUpRight size={18} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Tech Pacific Solutions (Pvt) Ltd.</span><div className="footer-links"><a href="https://www.techpac.lk/privacy-policy/" target="_blank" rel="noreferrer">Privacy</a><a href="https://www.techpac.lk/terms-and-conditions/" target="_blank" rel="noreferrer">Terms</a><a href="https://www.linkedin.com/company/tech-pacific-solutions/" target="_blank" rel="noreferrer" aria-label="Tech Pacific on LinkedIn"><Linkedin size={16} /></a><a href="https://wa.me/94714798798" target="_blank" rel="noreferrer" aria-label="Chat with Tech Pacific on WhatsApp"><Phone size={16} /></a></div></div></footer>
    </div>
  </>;
}
