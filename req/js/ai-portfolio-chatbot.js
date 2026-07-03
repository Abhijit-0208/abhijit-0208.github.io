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
      if (!this.chatMessages.querySelector('.chat-message')){
        this.botMessage("👋 Hi! I'm Abhijit's Portfolio Assistant. I only answer questions about his portfolio, projects, experience and contact info.");
        this.showQuickSuggestions();
      }
    },

    showQuickSuggestions(){
      const suggestions = ['About Me','Skills','Experience','Projects','Resume','GitHub','LinkedIn','Contact / Hire'];
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
      // direct keyword answers
      if (/resume|cv/.test(t)){
        const url = DATA.resumeUrl || '#';
        const html = `<p>You can download the resume here:</p><p><a class="btn btn-primary" href="${url}" download>Download Resume</a></p>`;
        return this.botMessage(html);
      }
      if (/github/.test(t)){
        const html = `GitHub: <a href="${DATA.githubUrl}" target="_blank" rel="noopener">${DATA.githubUrl}</a>`;
        return this.botMessage(html);
      }
      if (/linkedin/.test(t)){
        const html = `LinkedIn: <a href="${DATA.linkedinUrl}" target="_blank" rel="noopener">${DATA.linkedinUrl}</a>`;
        return this.botMessage(html);
      }
      if (/(contact|hire|work with|get in touch)/.test(t)){
        return this.startContactFlow();
      }
      if (/(about|who are you|about me)/.test(t)){
        return this.botMessage(`<p>${escapeHtml(DATA.about || 'No about info provided.')}</p>`);
      }
      if (/(skill|skills|technologies)/.test(t)){
        const list = (DATA.skills||[]).map(s=>`<li>${escapeHtml(s)}</li>`).join('');
        return this.botMessage(`<p><strong>Key skills:</strong></p><ul>${list}</ul>`);
      }
      if (/(experience|work|role|company)/.test(t)){
        const ex = DATA.experience || [];
        if (!ex.length) return this.botMessage('No experience data available.');
        const html = ex.map(e=>`<p><strong>${escapeHtml(e.role)}</strong> — ${escapeHtml(e.company)} (${escapeHtml(e.period)})<br>${escapeHtml(e.summary)}</p>`).join('');
        return this.botMessage(html);
      }
      if (/(project|projects)/.test(t)){
        const ps = DATA.projects || [];
        if (!ps.length) return this.botMessage('No projects listed.');
        const html = ps.map(p=>`<p><strong>${escapeHtml(p.name)}</strong>: ${escapeHtml(p.description)} ${p.link?`<br><a href="${p.link}" target="_blank">View project</a>`:''}</p>`).join('');
        return this.botMessage(html);
      }

      // If message asks specifically about resume, GitHub, LinkedIn handled above.

      // If question seems portfolio related but not matched, try keyword matching for topics
      const topics = ['about','skills','experience','projects','resume','github','linkedin','contact'];
      for (const topic of topics){ if (t.includes(topic)) return this.respondTo(topic); }

      // Otherwise default politely
      return this.botMessage("Sorry — I only answer questions about Abhijit's portfolio, projects, experience and contact information. Try one of the suggested questions.");
    },

    startContactFlow(){
      this.contactFlow = { step: 0, data: {} };
      const html = `
        <p>I'd be happy to connect. Please provide the following details.</p>
        <div class="contact-form">
          <label>Name</label><input id="cf-name" placeholder="Your name" />
          <label>Email</label><input id="cf-email" placeholder="you@company.com" />
          <label>Company <small>(optional)</small></label><input id="cf-company" placeholder="Company name" />
          <label>Project requirements</label><textarea id="cf-req" placeholder="Describe your project"></textarea>
          <div style="margin-top:8px;"><button id="cf-send" class="btn btn-primary">Review & Continue</button></div>
        </div>`;
      this.botMessage(html);
      // attach handler
      setTimeout(()=>{
        const btn = qs('#cf-send');
        if (btn) btn.addEventListener('click', ()=>this.finishContactForm());
      }, 50);
    },

    finishContactForm(){
      const name = qs('#cf-name')?.value?.trim();
      const email = qs('#cf-email')?.value?.trim();
      const company = qs('#cf-company')?.value?.trim();
      const req = qs('#cf-req')?.value?.trim();
      if (!name || !email || !req) return alert('Please provide name, email and project requirements.');
      this.contactFlow = { step: 1, data: { name, email, company, requirements: req } };
      const summary = `
        <p><strong>Summary</strong></p>
        <p>Name: ${escapeHtml(name)}<br>Email: ${escapeHtml(email)}<br>Company: ${escapeHtml(company||'-')}<br>Requirements: ${escapeHtml(req)}</p>
        <p><button id="cf-submit" class="btn btn-success">Send Message</button></p>`;
      this.botMessage(summary);
      setTimeout(()=>{ const sb = qs('#cf-submit'); if (sb) sb.addEventListener('click', ()=>this.sendContact()) }, 50);
    },

    sendContact(){
      if (!this.contactFlow || !this.contactFlow.data) return;
      console.log('Contact request from portfolio chatbot:', this.contactFlow.data);
      this.botMessage('Thanks — your message was logged locally (check console). I will follow up by email if contact details are valid.');
      this.contactFlow = null;
    },

    handleContactFlowInput(msg){
      // form-driven flow handled in form fields, so ignore plain messages
      this.botMessage('Please use the contact form fields shown to submit details.');
    },

    scrollToBottom(){ if (this.chatMessages) this.chatMessages.scrollTop = this.chatMessages.scrollHeight; }
  };

  function escapeHtml(s){ if (!s && s!==0) return ''; return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]; }); }

  // initialize when DOM ready
  document.addEventListener('DOMContentLoaded', ()=>{ setTimeout(()=>Chat.init(), 100); });

})();
