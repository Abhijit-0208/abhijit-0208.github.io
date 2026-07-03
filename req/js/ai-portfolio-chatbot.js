/*
  Client-only AI Portfolio Assistant
  - Uses local `window.portfolioData`
  - No backend, no external API
  - Modular and self-contained
*/
(function(){
  if (!window || !document) return;

  const DATA = window.portfolioData || {};

  function qs(sel, root=document){ return root.querySelector(sel); }
  function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

  function createEl(tag, opts={}, html=''){
    const el = document.createElement(tag);
    Object.entries(opts).forEach(([k,v])=>{ if (k === 'class') el.className = v; else if (k==='id') el.id = v; else el.setAttribute(k,v); });
    if (html) el.innerHTML = html;
    return el;
  }

  const Chat = {
    init(){
      this.chatBtn = qs('#chatBtn');
      this.chatPopup = qs('#chatPopup');
      this.sendBtn = qs('#sendMessage');
      this.userInput = qs('#userMessage');
      this.chatMessages = qs('#chatMessages');
      this.closeBtn = qs('#closeChat');

      if (!this.chatBtn || !this.chatPopup) return console.warn('Chat UI not found');

      this.contactFlow = null; // holds contact form state

      this.bind();
      this.addWelcomeIfEmpty();
      this.chatBtn.style.display = '';
    },

    bind(){
      this.chatBtn.addEventListener('click', ()=>this.toggle());
      if (this.closeBtn) this.closeBtn.addEventListener('click', ()=>this.close());
      if (this.sendBtn) this.sendBtn.addEventListener('click', ()=>this.onSend());
      if (this.userInput) this.userInput.addEventListener('keypress', (e)=>{ if (e.key === 'Enter') this.onSend(); });

      document.addEventListener('click', (e)=>{
        if (e.target.classList && e.target.classList.contains('suggestion-chip')){
          const text = e.target.getAttribute('data-text') || e.target.textContent;
          if (this.userInput) this.userInput.value = text;
          this.onSend();
        }
      });
    },

    toggle(){
      const active = this.chatPopup.classList.toggle('active');
      this.chatBtn.classList.toggle('active');
      if (active) this.showSuggestions();
    },

    close(){
      this.chatPopup.classList.remove('active');
      this.chatBtn.classList.remove('active');
    },

    addWelcomeIfEmpty(){
      if (!this.chatMessages) return;
      // If the page already includes a welcome block or any chat message, don't inject a duplicate welcome.
      if (this.chatMessages.querySelector('.welcome-message') || this.chatMessages.querySelector('.chat-message') || this.chatMessages.children.length > 0){
        // ensure persistent suggestions exist if missing
        if (!this.chatMessages.querySelector('.quick-suggestions.persistent')) this.showQuickSuggestions();
        return;
      }

      this.botMessage("👋 Hi! I'm Abhijit's Portfolio Assistant. I only answer questions about his portfolio, projects, experience and contact info.");
      this.showQuickSuggestions();
    },

    showQuickSuggestions(){
      const suggestions = [
        'Tell me about yourself',
        'What are your skills?',
        'Show your projects',
        'Explain <project-name> project',
        'Tell me about your CI/CD pipeline',
        'Show your <project-name> project',
        'Can I download your resume?',
        'How can I contact you?'
      ];
      const wrapper = createEl('div',{class:'quick-suggestions persistent'});
      suggestions.forEach(s=>{
        const b = createEl('button',{class:'suggestion-chip', type:'button', 'data-text': s}, s);
        wrapper.appendChild(b);
      });
      this.chatMessages.appendChild(wrapper);
      this.scrollToBottom();
    },

    showSuggestions(){
      // ensure persistent suggestions exist
      if (!this.chatMessages.querySelector('.quick-suggestions.persistent')) this.showQuickSuggestions();
    },

    onSend(){
      const raw = this.userInput?.value?.trim();
      if (!raw) return;
      const msg = raw;
      this.addUserMessage(msg);
      this.userInput.value = '';
      // If contact flow in progress, handle it specially
      if (this.contactFlow) return this.handleContactFlowInput(msg);

      this.showTyping();
      setTimeout(()=>{
        this.hideTyping();
        this.respondTo(msg);
      }, 600 + Math.random()*600);
    },

    addUserMessage(text){
      const d = createEl('div',{class:'chat-message user'});
      d.innerHTML = `<div class="message-content">${escapeHtml(text)}</div>`;
      this.chatMessages.appendChild(d);
      this.scrollToBottom();
    },

    botMessage(html){
      const d = createEl('div',{class:'chat-message bot'});
      d.innerHTML = `<div class="bot-avatar"></div><div class="message-content">${html}</div>`;
      this.chatMessages.appendChild(d);
      this.scrollToBottom();
    },

    showTyping(){
      if (this._typing) return;
      this._typing = createEl('div',{class:'chat-typing'}, `<div class="bot-avatar"></div><div class="message-content typing">Typing<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></div>`);
      this.chatMessages.appendChild(this._typing);
      this.scrollToBottom();
    },
    hideTyping(){ if (this._typing){ this._typing.remove(); this._typing = null; } },

    respondTo(text){
      const t = text.toLowerCase();

      // Normalize common synonyms to topics
      const topicMap = {
        about: ['about','who are you','tell me about yourself','about me'],
        skills: ['skill','skills','technologies','tech stack','what technologies do you know','what are your skills'],
        projects: ['project','projects','show your projects','show your <project-name> project','explain <project-name> project','show your <project-name> project'],
        resume: ['resume','cv','download resume','can i download your resume','download my resume'],
        github: ['github'],
        linkedin: ['linkedin'],
        contact: ['contact','hire','i want to hire you','contact you','let\'s work together','freelance','job opportunity','project','how can i contact you']
      };

      function matchTopic(text){
        for (const [topic, phrases] of Object.entries(topicMap)){
          for (const p of phrases){
            if (p.includes('<project-name>')){
              // user asked about a specific project — treat as 'projects' topic
              if (/project/i.test(text)) return topic;
              continue;
            }
            const pattern = p.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
            const re = new RegExp(pattern,'i');
            if (re.test(text)) return topic;
          }
        }
        return null;
      }

      const topic = matchTopic(text);
      if (topic === 'resume'){
        const url = DATA.resumeUrl || '#';
        const html = `<p>You can download the resume here:</p><p><a class="btn btn-primary" href="${url}" target="_blank" rel="noopener">Open / Download Resume</a></p>`;
        return this.botMessage(html);
      }
      if (topic === 'github'){
        const html = `GitHub: <a href="${DATA.githubUrl}" target="_blank" rel="noopener">${DATA.githubUrl}</a>`;
        return this.botMessage(html);
      }
      if (topic === 'linkedin'){
        const html = `LinkedIn: <a href="${DATA.linkedinUrl}" target="_blank" rel="noopener">${DATA.linkedinUrl}</a>`;
        return this.botMessage(html);
      }
      if (topic === 'contact'){
        return this.startContactFlow();
      }
      if (topic === 'about'){
        return this.botMessage(`<p>${escapeHtml(DATA.about || 'No about info provided.')}</p>`);
      }
      if (topic === 'skills'){
        const list = (DATA.skills||[]).map(s=>`<li>${escapeHtml(s)}</li>`).join('');
        return this.botMessage(`<p><strong>Key skills:</strong></p><ul>${list}</ul>`);
      }
      if (topic === 'projects'){
        const ps = DATA.projects || [];
        if (!ps.length) return this.botMessage('No projects listed.');
        const html = ps.map(p=>`<p><strong>${escapeHtml(p.name)}</strong>: ${escapeHtml(p.description)} ${p.link?`<br><a href="${p.link}" target="_blank">View project</a>`:''}</p>`).join('');
        return this.botMessage(html);
      }

      return this.botMessage("Sorry — I only answer questions about Abhijit's portfolio, projects, experience and contact information. Try one of the suggested questions.");
    },

    startContactFlow(){
      this.contactFlow = { step: 0, data: {} };
      this.botMessage("Great! I'd love to hear about your project.");
      this.botMessage('What is your name?');
    },

    // validate simple email
    isValidEmail(email){
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    handleContactFlowInput(msg){
      const step = this.contactFlow?.step ?? 0;
      const trimmed = msg?.trim();
      if (step === 0){
        // collect name
        this.contactFlow.data.name = trimmed;
        this.contactFlow.step = 1;
        this.botMessage('Thanks. What is your email address?');
        return;
      }
      if (step === 1){
        if (!this.isValidEmail(trimmed)){
          this.botMessage('That email looks invalid. Please provide a valid email address.');
          return;
        }
        this.contactFlow.data.email = trimmed;
        this.contactFlow.step = 2;
        this.botMessage('Company (optional) — or type "skip" to skip.');
        return;
      }
      if (step === 2){
        if (trimmed.toLowerCase() === 'skip'){
          this.contactFlow.data.company = '';
        } else {
          this.contactFlow.data.company = trimmed;
        }
        this.contactFlow.step = 3;
        this.botMessage('Please describe your project requirements.');
        return;
      }
      if (step === 3){
        this.contactFlow.data.requirements = trimmed;
        this.contactFlow.step = 4;
        // show summary and send button
        const d = this.contactFlow.data;
        const html = `\n          <p><strong>Thank you! Here's your information:</strong></p>\n          <p>Name: ${escapeHtml(d.name)}<br>Email: ${escapeHtml(d.email)}<br>Company: ${escapeHtml(d.company||'-')}<br>Project: ${escapeHtml(d.requirements)}</p>\n          <p><button id="cf-submit" class="btn btn-success">Send Message</button></p>`;
        this.botMessage(html);
        setTimeout(()=>{ const sb = qs('#cf-submit'); if (sb) sb.addEventListener('click', ()=>this.sendContact(this.contactFlow.data)); }, 50);
        return;
      }
    },

    // modular send function - currently logs to console, can be swapped for real implementation
    sendContact(data){
      console.log('Portfolio chatbot - sendContact called with:', data);
      this.botMessage('Thanks — your message was logged locally (check console). I will follow up by email if contact details are valid.');
      this.contactFlow = null;
    },

    scrollToBottom(){ if (this.chatMessages) this.chatMessages.scrollTop = this.chatMessages.scrollHeight; }
  };

  function escapeHtml(s){ if (!s && s!==0) return ''; return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]; }); }

  // initialize when DOM ready
  document.addEventListener('DOMContentLoaded', ()=>{ setTimeout(()=>Chat.init(), 100); });

})();
