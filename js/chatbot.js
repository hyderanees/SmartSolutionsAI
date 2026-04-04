(() => {
  const chatbot = document.getElementById('chatbot');
  const toggle = document.getElementById('chatbot-toggle');
  const minimize = document.getElementById('chatbot-minimize');
  const messages = document.getElementById('chatbot-messages');
  const quickReplies = document.getElementById('chatbot-quick-replies');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const badge = chatbot.querySelector('.chatbot-badge');

  const BOT_AVATAR = `<svg viewBox="0 0 24 24"><path d="M12 2a4 4 0 0 1 4 4c0 1.1-.4 2.1-1.1 2.9l2.7 4.6a4 4 0 1 1-1.7 1l-2.7-4.6a4 4 0 0 1-2.4 0l-2.7 4.6a4 4 0 1 1-1.7-1l2.7-4.6A4 4 0 0 1 8 6a4 4 0 0 1 4-4z"/></svg>`;
  const USER_AVATAR = `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;

  const knowledge = [
    {
      keys: ['hello', 'hi', 'hey', 'greetings', 'howdy', 'hola', 'good morning', 'good afternoon', 'good evening'],
      reply: "Hello! Welcome to Smart Solutions AI. I'm here to help you explore our AI and cybersecurity services. What would you like to know?",
      chips: ['Our Services', 'AI Solutions', 'Cybersecurity', 'Get a Quote']
    },
    {
      keys: ['service', 'what do you do', 'what do you offer', 'offerings', 'our services', 'what can you do'],
      reply: "We offer a comprehensive suite of services:\n\n<b>AI & Intelligence</b>\n• Machine Learning & Deep Learning\n• Generative AI & LLM Integration\n• Data Science & Predictive Analytics\n\n<b>Cybersecurity</b>\n• Zero Trust Architecture\n• Managed Detection & Response (MDR)\n• Cloud Security & Compliance\n• Identity & Access Management\n\nWhich area interests you most?",
      chips: ['AI Solutions', 'Cybersecurity', 'Cloud Security', 'Contact Us']
    },
    {
      keys: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning', 'ai solution'],
      reply: "Our AI services help enterprises unlock the power of intelligent automation:\n\n• <b>Custom ML Models</b> — Tailored to your data and business goals\n• <b>Generative AI</b> — Enterprise LLMs, RAG pipelines, AI copilots\n• <b>Computer Vision</b> — Object detection, image analysis, video analytics\n• <b>NLP & Conversational AI</b> — Chatbots, sentiment analysis, document processing\n• <b>MLOps</b> — Production deployment, monitoring, and model lifecycle management\n\nWe work with TensorFlow, PyTorch, Hugging Face, LangChain, and OpenAI APIs.",
      chips: ['Generative AI', 'Get a Quote', 'Technologies', 'Case Studies']
    },
    {
      keys: ['generative ai', 'genai', 'llm', 'gpt', 'chatgpt', 'large language model', 'rag'],
      reply: "Our Generative AI practice helps businesses harness LLMs responsibly:\n\n• <b>Custom GPT Solutions</b> — Fine-tuned models for your domain\n• <b>RAG Pipelines</b> — Retrieval-augmented generation for accurate, grounded answers\n• <b>AI Copilots</b> — Embedded assistants for your team's workflows\n• <b>Enterprise Search</b> — Semantic search across your knowledge base\n• <b>Content Generation</b> — Automated reports, summaries, and documentation\n\nAll solutions include responsible AI governance and data security by design.",
      chips: ['AI Solutions', 'Security for AI', 'Contact Us']
    },
    {
      keys: ['cyber', 'security', 'cybersecurity', 'infosec', 'information security', 'threat', 'hack', 'protect'],
      reply: "Our cybersecurity services deliver total resilience:\n\n• <b>Zero Trust Architecture</b> — Identity-first security with continuous verification\n• <b>Managed Detection & Response</b> — 24/7 AI-powered threat monitoring\n• <b>Attack Surface Management</b> — Continuous vulnerability discovery\n• <b>IAM & PAM</b> — Identity governance and privileged access control\n• <b>Compliance</b> — SOC 2, ISO 27001, GDPR, HIPAA, PCI DSS\n• <b>Security for AI</b> — Protect your AI models and data pipelines\n\nOur SOC operates 24/7 with 99.9% threat detection rates.",
      chips: ['Zero Trust', 'Compliance', 'Cloud Security', 'Get a Quote']
    },
    {
      keys: ['zero trust', 'ztna', 'identity', 'access'],
      reply: "Our Zero Trust implementation covers the full spectrum:\n\n• <b>Identity Verification</b> — Multi-factor authentication, SSO, conditional access\n• <b>Micro-segmentation</b> — Limit lateral movement within your network\n• <b>SASE/SSE</b> — Secure access service edge for remote workforces\n• <b>Device Trust</b> — Endpoint posture assessment before granting access\n• <b>Continuous Monitoring</b> — Real-time risk scoring and adaptive policies\n\nWe partner with Zscaler, Palo Alto, and CrowdStrike for best-in-class deployment.",
      chips: ['Cybersecurity', 'Compliance', 'Contact Us']
    },
    {
      keys: ['cloud', 'aws', 'azure', 'gcp', 'cloud security', 'migration'],
      reply: "We secure and optimize your cloud across all major platforms:\n\n• <b>AWS, Azure, GCP</b> — Multi-cloud security architecture\n• <b>Cloud Migration</b> — Secure lift-and-shift with zero downtime\n• <b>CSPM</b> — Cloud Security Posture Management\n• <b>Container Security</b> — Docker & Kubernetes hardening\n• <b>Infrastructure as Code</b> — Terraform, Ansible with security baked in\n\nAll deployments include compliance validation and continuous monitoring.",
      chips: ['Technologies', 'Get a Quote', 'Cybersecurity']
    },
    {
      keys: ['compliance', 'soc 2', 'iso', 'gdpr', 'hipaa', 'pci', 'regulation', 'audit'],
      reply: "We help you achieve and maintain compliance with major frameworks:\n\n• <b>SOC 2 Type I & II</b> — Full audit preparation and remediation\n• <b>ISO 27001</b> — ISMS implementation and certification support\n• <b>GDPR</b> — Data privacy controls and DPO advisory\n• <b>HIPAA</b> — Healthcare data protection and BAA compliance\n• <b>PCI DSS</b> — Payment card security assessments\n• <b>NIST CSF</b> — Cybersecurity framework alignment\n\nOur continuous control monitoring ensures you stay compliant 24/7.",
      chips: ['Cybersecurity', 'Industries', 'Contact Us']
    },
    {
      keys: ['price', 'cost', 'pricing', 'quote', 'budget', 'how much', 'estimate', 'get a quote'],
      reply: "Every project is unique, so we tailor our pricing to your specific needs. Typical engagement ranges:\n\n• <b>Consulting & Assessment</b> — Starting from $10K\n• <b>AI/ML Projects</b> — $25K–$200K+ depending on complexity\n• <b>Managed Security Services</b> — Custom monthly retainer\n• <b>Staff Augmentation</b> — Competitive daily/monthly rates\n\nWant a detailed estimate? I can connect you with our team for a free consultation.",
      chips: ['Contact Us', 'Our Services', 'Book a Call']
    },
    {
      keys: ['contact', 'reach', 'email', 'phone', 'talk', 'call', 'meeting', 'consultation', 'book a call', 'get in touch', 'contact us'],
      reply: "We'd love to hear from you! Here's how to reach us:\n\n📧 <a href='mailto:info@smartsolutionsai.com'>info@smartsolutionsai.com</a>\n📞 <a href='tel:+1234567890'>+1 (234) 567-890</a>\n\nOr scroll down to the <a href='#contact'>contact form</a> to send us a message directly. We typically respond within 24 hours.\n\nWant to schedule a free consultation call?",
      chips: ['Our Services', 'AI Solutions', 'Cybersecurity']
    },
    {
      keys: ['industry', 'industries', 'sector', 'vertical', 'finance', 'healthcare', 'manufacturing', 'who do you work with'],
      reply: "We serve high-stakes industries where AI and security are mission-critical:\n\n🏦 <b>Financial Services</b> — Fraud detection, risk analytics\n🏥 <b>Healthcare</b> — HIPAA-compliant AI, health data protection\n🏭 <b>Manufacturing</b> — Predictive maintenance, OT security\n⚡ <b>Energy & Utilities</b> — Grid security, IoT protection\n🛒 <b>Retail</b> — Personalization, payment security\n🏛️ <b>Government</b> — National security AI, compliance\n📡 <b>Telecom</b> — Network security, 5G protection\n🎓 <b>Education</b> — EdTech AI, student data privacy",
      chips: ['Our Services', 'Case Studies', 'Contact Us']
    },
    {
      keys: ['tech', 'technology', 'stack', 'tool', 'framework', 'platform', 'technologies'],
      reply: "We master a powerful and diverse tech stack:\n\n<b>AI/ML:</b> TensorFlow, PyTorch, Hugging Face, LangChain, OpenAI, Scikit-Learn\n<b>Security:</b> CrowdStrike, Palo Alto, Splunk, Zscaler, CyberArk, Fortinet\n<b>Cloud:</b> AWS, Azure, GCP, Docker, Kubernetes, Terraform\n<b>Dev:</b> React, Node.js, Python, Rust, TypeScript, Go\n<b>Data:</b> PostgreSQL, MongoDB, Redis, Pinecone, MLflow",
      chips: ['AI Solutions', 'Cloud Security', 'Get a Quote']
    },
    {
      keys: ['about', 'who are you', 'company', 'team', 'why choose', 'about us'],
      reply: "Smart Solutions AI sits at the intersection of artificial intelligence and cybersecurity. We are researchers, engineers, and security architects building technology that empowers and protects.\n\n• <b>150+</b> Projects delivered\n• <b>50+</b> Enterprise clients\n• <b>99.9%</b> Threat detection rate\n• <b>24/7</b> SOC monitoring\n• <b>50+</b> Certified experts (CISSP, CEH, AWS, GCP)\n\nWe combine deep AI expertise with enterprise-grade security — a rare combination that our clients value deeply.",
      chips: ['Our Services', 'Industries', 'Contact Us']
    },
    {
      keys: ['process', 'how do you work', 'methodology', 'approach', 'steps'],
      reply: "Our proven 4-step methodology ensures every project succeeds:\n\n<b>1. Discover & Assess</b>\nAnalyze infrastructure, identify gaps, map AI opportunities.\n\n<b>2. Strategy & Architecture</b>\nDesign a blueprint combining AI capabilities with security frameworks.\n\n<b>3. Build & Integrate</b>\nAgile sprints deliver production-ready solutions into your ecosystem.\n\n<b>4. Monitor & Evolve</b>\n24/7 managed services with continuous improvement and threat hunting.",
      chips: ['Get a Quote', 'Technologies', 'Contact Us']
    },
    {
      keys: ['case stud', 'portfolio', 'example', 'success', 'client stor'],
      reply: "Here are some highlights from our portfolio:\n\n• <b>Global Financial Corp</b> — AI-powered SOC reduced incident response time by 80%\n• <b>HealthTech Innovations</b> — Production-ready ML models deployed in weeks\n• <b>AutoMfg Inc</b> — Zero-trust + AI automation across manufacturing\n\nOur clients consistently report faster time-to-value, stronger security posture, and measurable ROI. Want to discuss a project similar to yours?",
      chips: ['Contact Us', 'Our Services', 'Get a Quote']
    },
    {
      keys: ['security for ai', 'ai security', 'model security', 'adversarial', 'owasp'],
      reply: "Protecting AI systems is a critical and emerging need. We offer:\n\n• <b>OWASP Top 10 for LLMs</b> — Full mitigation coverage\n• <b>Adversarial Testing</b> — Red-teaming your AI models\n• <b>Data Pipeline Security</b> — Encryption, access control, lineage tracking\n• <b>Model Governance</b> — Bias detection, explainability, audit trails\n• <b>Responsible AI</b> — Ethical guidelines and regulatory compliance\n\nAs AI adoption accelerates, securing these systems is non-negotiable.",
      chips: ['Cybersecurity', 'AI Solutions', 'Contact Us']
    },
    {
      keys: ['thank', 'thanks', 'thx', 'appreciate'],
      reply: "You're very welcome! If you need anything else, I'm always here. Feel free to reach out anytime — we're excited to help you build something great. 🚀",
      chips: ['Our Services', 'Contact Us']
    },
    {
      keys: ['bye', 'goodbye', 'see you', 'later'],
      reply: "Goodbye! It was great chatting with you. When you're ready to take the next step, we're just a message away. Have a wonderful day!",
      chips: ['Contact Us']
    }
  ];

  const fallbacks = [
    "That's a great question! While I might not have the specific answer, our team would love to help. Would you like to <a href='#contact'>get in touch</a>?",
    "I'd like to make sure you get the best answer. Let me connect you with our experts — <a href='#contact'>reach out here</a> and we'll respond within 24 hours.",
    "Interesting question! This might need a more detailed conversation. Want to <a href='#contact'>schedule a free consultation</a> with our team?",
  ];

  let isOpen = false;
  let hasGreeted = false;

  function toggleChat() {
    isOpen = !isOpen;
    chatbot.classList.toggle('open', isOpen);
    if (isOpen && !hasGreeted) {
      hasGreeted = true;
      badge.classList.add('hidden');
      showTypingThen(() => {
        addMessage('bot', "Hi there! 👋 I'm the Smart Solutions AI assistant. How can I help you today?");
        showQuickReplies(['Our Services', 'AI Solutions', 'Cybersecurity', 'Get a Quote']);
      });
    }
    if (isOpen) input.focus();
  }

  toggle.addEventListener('click', toggleChat);
  minimize.addEventListener('click', toggleChat);

  function addMessage(role, html) {
    const avatar = role === 'bot' ? BOT_AVATAR : USER_AVATAR;
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    div.innerHTML = `
      <div class="chat-msg-avatar">${avatar}</div>
      <div class="chat-msg-bubble">${html.replace(/\n/g, '<br>')}</div>
    `;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.id = 'typing-msg';
    div.innerHTML = `
      <div class="chat-msg-avatar">${BOT_AVATAR}</div>
      <div class="chat-msg-bubble"><div class="typing-indicator"><span></span><span></span><span></span></div></div>
    `;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('typing-msg');
    if (t) t.remove();
  }

  function showTypingThen(callback) {
    showTyping();
    const delay = 600 + Math.random() * 800;
    setTimeout(() => { removeTyping(); callback(); }, delay);
  }

  function showQuickReplies(chips) {
    quickReplies.innerHTML = '';
    chips.forEach(text => {
      const btn = document.createElement('button');
      btn.className = 'quick-reply-btn';
      btn.textContent = text;
      btn.addEventListener('click', () => handleUserInput(text));
      quickReplies.appendChild(btn);
    });
    requestAnimationFrame(() => quickReplies.classList.add('visible'));
  }

  function hideQuickReplies() {
    quickReplies.classList.remove('visible');
    setTimeout(() => { quickReplies.innerHTML = ''; }, 300);
  }

  function findReply(text) {
    const lower = text.toLowerCase().trim();
    let bestMatch = null;
    let bestScore = 0;

    for (const entry of knowledge) {
      for (const key of entry.keys) {
        if (lower === key) return entry;
        if (lower.includes(key) || key.includes(lower)) {
          const score = key.length / Math.max(lower.length, 1);
          if (score > bestScore) {
            bestScore = score;
            bestMatch = entry;
          }
        }
      }
    }

    if (bestMatch && bestScore > 0.2) return bestMatch;

    const words = lower.split(/\s+/);
    for (const entry of knowledge) {
      for (const key of entry.keys) {
        const keyWords = key.split(/\s+/);
        const overlap = words.filter(w => keyWords.some(k => k.includes(w) || w.includes(k)));
        if (overlap.length > 0) {
          const score = overlap.length / words.length;
          if (score > bestScore) {
            bestScore = score;
            bestMatch = entry;
          }
        }
      }
    }

    return bestScore > 0.3 ? bestMatch : null;
  }

  function handleUserInput(text) {
    if (!text.trim()) return;
    hideQuickReplies();
    addMessage('user', text);
    input.value = '';

    showTypingThen(() => {
      const match = findReply(text);
      if (match) {
        addMessage('bot', match.reply);
        if (match.chips) showQuickReplies(match.chips);
      } else {
        const fb = fallbacks[Math.floor(Math.random() * fallbacks.length)];
        addMessage('bot', fb);
        showQuickReplies(['Our Services', 'AI Solutions', 'Cybersecurity', 'Contact Us']);
      }
    });
  }

  sendBtn.addEventListener('click', () => handleUserInput(input.value));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleUserInput(input.value);
  });

  // Auto-open hint after 8 seconds
  setTimeout(() => {
    if (!isOpen) {
      toggle.style.animation = 'chatPulse 2s ease-in-out 3';
    }
  }, 8000);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes chatPulse {
      0%, 100% { box-shadow: 0 6px 28px rgba(0,212,255,0.35); }
      50% { box-shadow: 0 6px 36px rgba(0,212,255,0.6), 0 0 0 8px rgba(0,212,255,0.1); }
    }
  `;
  document.head.appendChild(style);
})();
