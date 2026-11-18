// CapilarFlow - Aplicativo de Cronograma Capilar & Scalp Care
// Personalizado para Cabelo 2C/3A Fio Fino + Raiz Oleosa / Dermatite Seborreica

const STORAGE_KEY = 'capilarflow_app_data_v1';

// Cronogramas de acordo com a porosidade
const SCHEDULE_TEMPLATES = {
  alta: [
    { week: 1, step: 1, type: 'Hidratação', desc: 'Wella Elements Renewing (hidratação pura sem pesar) + Finalize c/ Lowell Bioplastia' },
    { week: 1, step: 2, type: 'Nutrição', desc: 'Wella Oil Reflections Reboost (nutrição luminosa) + 2 gotas de Oil Reflections Light' },
    { week: 1, step: 3, type: 'Hidratação', desc: 'Wella Elements Renewing + Pré-Poo com Óleo Semente de Uva Farmax' },
    
    { week: 2, step: 1, type: 'Hidratação', desc: 'Wella Elements Renewing + Toque de Acidificante K.Pro pós-lavagem' },
    { week: 2, step: 2, type: 'Nutrição', desc: 'Wella Oil Reflections Reboost (pausa de 5 min) + Touca de Cetim à noite' },
    { week: 2, step: 3, type: 'Reconstrução', desc: 'L\'Oréal Absolut Repair Gold Quinoa + Dica: K.Pro pH Balancer antes para selar' },
    
    { week: 3, step: 1, type: 'Hidratação', desc: 'Wella Elements Renewing + Desembaraço suave e secagem com Toalha de Microfibra' },
    { week: 3, step: 2, type: 'Nutrição', desc: 'Wella Oil Reflections Reboost para definição do cacho 2C/3A' },
    { week: 3, step: 3, type: 'Hidratação', desc: 'Wella Elements Renewing + Pré-poo com Óleo de Semente de Uva Farmax' },
    
    { week: 4, step: 1, type: 'Nutrição', desc: 'Nutrição ou Umectação com Óleo de Semente de Uva Farmax + Wella Reboost' },
    { week: 4, step: 2, type: 'Hidratação', desc: 'Wella Elements Renewing para reposição hídrica profunda' },
    { week: 4, step: 3, type: 'Reconstrução', desc: 'L\'Oréal Absolut Repair Gold Quinoa + K.Pro pH Balancer para cutículas blindadas' },
  ],
  media: [
    { week: 1, step: 1, type: 'Hidratação', desc: 'Wella Elements Renewing (reposição hídrica botânica sem pesar)' },
    { week: 1, step: 2, type: 'Nutrição', desc: 'Wella Oil Reflections Reboost + Óleo Light nas pontas' },
    { week: 1, step: 3, type: 'Hidratação', desc: 'Wella Elements Renewing + Leave-in Lowell Bioplastia' },
    
    { week: 2, step: 1, type: 'Hidratação', desc: 'Wella Elements Renewing + Pré-poo protetor Farmax' },
    { week: 2, step: 2, type: 'Hidratação', desc: 'Wella Elements Renewing + Acidificante K.Pro pH Balancer' },
    { week: 2, step: 3, type: 'Nutrição', desc: 'Wella Oil Reflections Reboost (brilho espelhado e emoliência)' },
    
    { week: 3, step: 1, type: 'Hidratação', desc: 'Wella Elements Renewing + Secagem com Toalha de Microfibra' },
    { week: 3, step: 2, type: 'Nutrição', desc: 'Wella Oil Reflections Reboost ou Umectação com Óleo de Uva' },
    { week: 3, step: 3, type: 'Hidratação', desc: 'Wella Elements Renewing + Touca de cetim à noite' },
    
    { week: 4, step: 1, type: 'Hidratação', desc: 'Wella Elements Renewing + Finalização leve com Oil Light' },
    { week: 4, step: 2, type: 'Nutrição', desc: 'Wella Oil Reflections Reboost' },
    { week: 4, step: 3, type: 'Reconstrução', desc: 'L\'Oréal Absolut Repair Gold Quinoa + Acidificante K.Pro (reconstrução mensal)' },
  ],
  baixa: [
    { week: 1, step: 1, type: 'Hidratação', desc: 'Wella Elements Renewing (enxágue morno para abrir cutículas)' },
    { week: 1, step: 2, type: 'Hidratação', desc: 'Wella Elements Renewing (fórmula sem silicone não cria barreira)' },
    { week: 1, step: 3, type: 'Nutrição', desc: 'Wella Oil Reflections Reboost (aplicar apenas 1 moeda pequena nas pontas)' },
    
    { week: 2, step: 1, type: 'Hidratação', desc: 'Wella Elements Renewing + Pré-poo com Óleo de Semente de Uva Farmax' },
    { week: 2, step: 2, type: 'Hidratação', desc: 'Wella Elements Renewing + Acidificante K.Pro pH Balancer (3 min)' },
    { week: 2, step: 3, type: 'Hidratação', desc: 'Wella Elements Renewing + Leave-in Lowell Bioplastia' },
    
    { week: 3, step: 1, type: 'Hidratação', desc: 'Wella Elements Renewing + Toalha de Microfibra suave' },
    { week: 3, step: 2, type: 'Nutrição', desc: 'Wella Oil Reflections Reboost (dose controlada) + Touca de Cetim' },
    { week: 3, step: 3, type: 'Hidratação', desc: 'Wella Elements Renewing para manter a elasticidade' },
    
    { week: 4, step: 1, type: 'Hidratação', desc: 'Wella Elements Renewing' },
    { week: 4, step: 2, type: 'Hidratação', desc: 'Wella Elements Renewing + 1 gota de Oil Reflections Light' },
    { week: 4, step: 3, type: 'Reconstrução', desc: 'L\'Oréal Absolut Repair Gold Quinoa (toque leve, não endurece a fibra)' },
  ]
};

// Kit de produtos adquiridos pelo usuário (Kit Salão Shopee)
const DEFAULT_PRODUCTS = [
  { id: 'p_dercos', name: 'Dercos Anticaspa DS / Cetoconazol 2%', brand: 'Vichy / Medley', category: 'dermatite', notes: 'Aplicar exclusivamente no couro cabeludo, massagear e pausar 3 a 5 min no timer. Usar 2 a 3x na semana.' },
  { id: 'p_farmax_uva', name: 'Óleo Puro de Semente de Uva (Kit 2x 100ml)', brand: 'Farmax 100% Vegetal', category: 'pre-poo', notes: 'Óleo vegetal levíssimo. Aplicar 4 a 6 gotas nas pontas 15-20 min antes do banho como Pré-Poo protetor ou para umectação noturna suave.' },
  { id: 'p_wella_elements', name: 'Máscara Elements Renewing (150ml)', brand: 'Wella Professionals', category: 'hidratação', notes: 'Fórmula limpa sem silicones, sulfatos ou parabenos. Hidratação renovadora e fluida com pantenol, perfeita para o fio fino 2C/3A não pesar.' },
  { id: 'p_wella_reboost', name: 'Máscara Oil Reflections Luminous Reboost (500ml)', brand: 'Wella Professionals', category: 'nutrição', notes: 'Nutrição profunda e luminosidade com óleo de camélia e chá branco. Restaura os lipídios, combate o frizz e devolve brilho espelhado.' },
  { id: 'p_loreal_gold', name: 'Máscara Absolut Repair Gold Quinoa & Protein (500g)', brand: "L'Oréal Professionnel", category: 'reconstrução', notes: 'Reconstrução e reparação profunda com Quinoa Dourada e Proteína Hidrolisada. Recupera danos estruturais mantendo o toque leve e sedoso.' },
  { id: 'p_kpro_acid', name: 'pH Balancer Acidificante Cuticular (pH 2.2 - 2.5)', brand: 'K.Pro Profissional', category: 'acidificante', notes: 'Padrão ouro para selar cutículas e reequilibrar o pH do fio. Usar após o shampoo ou após a máscara por 3 min para brilho vitrificado.' },
  { id: 'p_lowell_bioplastia', name: 'Leave-in Reconstrutor Bioplastia (120ml)', brand: 'Lowell Profissional', category: 'finalizador', notes: 'Leave-in reconstrutor com proteção térmica e ação desembaraçante instantânea. Sela as cutículas, evita frizz e disciplina cachos/ondas sem pesar.' },
  { id: 'p_wella_oil_light', name: 'Óleo Oil Reflections Light (100ml)', brand: 'Wella Professionals', category: 'finalizador', notes: 'Óleo levíssimo premium com toque seco desenvolvido especificamente para cabelos finos. Finaliza com brilho radiante sem deixar o cabelo murcho.' }
];

// Estado da aplicação
let appState = {
  porosity: 'alta', // padrão indicado pelos sintomas de toque áspero e embaraço
  currentStepIndex: 0, // 0 a 11
  history: [],
  products: [...DEFAULT_PRODUCTS],
  lastDermatitisDate: null,
  customNextStep: null, // Cuidado calculado dinamicamente pelo Decisor de Ciclos
};

// Timer de Shampoo Medicamentoso
let timerInterval = null;
let timerSeconds = 180; // 3 minutos

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initTabs();
  initModals();
  initForms();
  initTimer();
  initIngredientAnalyzer();
  initDynamicCycle();
  initPwaSupport();
  renderPorositySelection();
  renderDashboard();
  renderProducts();
  renderRecommendedCatalogue();
  renderHistory();
  lucide.createIcons();
});

let deferredPrompt = null;

function initPwaSupport() {
  // Registrar Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        console.log('Service Worker registrado:', reg.scope);
      }).catch((err) => {
        console.log('Falha ao registrar Service Worker:', err);
      });
    });
  }

  // Capturar evento de instalação nativa do Android/Chrome
  const installBtn = document.getElementById('btnInstallPwa');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) {
      installBtn.classList.remove('hidden');
      installBtn.onclick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          showToast('Aplicativo instalado no celular com sucesso!');
        }
        deferredPrompt = null;
        installBtn.classList.add('hidden');
      };
    }
  });

  window.addEventListener('appinstalled', () => {
    if (installBtn) installBtn.classList.add('hidden');
    showToast('CapilarFlow já está instalado!');
  });
}

// Carregar e Salvar Estado
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      appState = { ...appState, ...parsed };

      // Auto-sincronizar produtos adquiridos (Wella, L'Oréal, Lowell, K.Pro, Farmax) no armário
      if (Array.isArray(appState.products)) {
        DEFAULT_PRODUCTS.forEach(dp => {
          const exists = appState.products.some(p => 
            p.id === dp.id || 
            (p.name && dp.name && p.name.toLowerCase().includes(dp.name.toLowerCase().slice(0, 15)))
          );
          if (!exists) {
            appState.products.unshift(dp);
          }
        });
      }
    }
  } catch (err) {
    console.error('Erro ao ler localStorage', err);
  }
}

// Sincronizar ou restaurar kit de salão adquirido no armário
window.syncShopeePurchases = function() {
  DEFAULT_PRODUCTS.forEach(dp => {
    const idx = appState.products.findIndex(p => 
      p.id === dp.id || 
      (p.name && dp.name && p.name.toLowerCase().includes(dp.name.toLowerCase().slice(0, 15)))
    );
    if (idx >= 0) {
      appState.products[idx] = dp;
    } else {
      appState.products.unshift(dp);
    }
  });
  saveState();
  renderProducts();
  showToast('Kit de salão Shopee sincronizado no seu Armário!');
};

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (err) {
    console.error('Erro ao salvar localStorage', err);
  }
}

// Navegação de Abas
function initTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tab);
      if (target) {
        target.classList.add('active');
      }
      lucide.createIcons();
    });
  });
}

// Render Dashboard
function renderDashboard() {
  const currentSchedule = SCHEDULE_TEMPLATES[appState.porosity] || SCHEDULE_TEMPLATES.alta;
  const currentStep = currentSchedule[appState.currentStepIndex] || currentSchedule[0];

  // Card Hoje
  const badgeNextType = document.getElementById('badgeNextType');
  const badgeScheduleDay = document.getElementById('badgeScheduleDay');
  const nextStepTitle = document.getElementById('nextStepTitle');
  const nextStepDesc = document.getElementById('nextStepDesc');
  const dynamicNotice = document.getElementById('dynamicStepNotice');

  const isDynamic = !!appState.customNextStep;
  const effectiveType = isDynamic ? appState.customNextStep.type : currentStep.type;
  const effectiveDesc = isDynamic ? appState.customNextStep.desc : currentStep.desc;
  const effectiveTitle = isDynamic ? `Próximo Cuidado: ${appState.customNextStep.title || appState.customNextStep.type}` : `Próximo Cuidado: ${currentStep.type}`;

  badgeNextType.textContent = effectiveType;
  nextStepTitle.textContent = effectiveTitle;
  nextStepDesc.textContent = effectiveDesc;

  if (isDynamic) {
    badgeScheduleDay.textContent = `✨ ${appState.customNextStep.cycleName || 'Ciclo Dinâmico'}`;
    if (dynamicNotice) {
      dynamicNotice.classList.remove('hidden');
      const badgeEl = document.getElementById('dynamicStepTitleBadge');
      const descEl = document.getElementById('dynamicStepNoticeDesc');
      if (badgeEl) badgeEl.textContent = appState.customNextStep.cycleName || 'Ciclo Inteligente';
      if (descEl) descEl.textContent = appState.customNextStep.reason || appState.customNextStep.desc;
    }
  } else {
    badgeScheduleDay.textContent = `Semana ${currentStep.week} • Etapa ${currentStep.step}`;
    if (dynamicNotice) {
      dynamicNotice.classList.add('hidden');
    }
  }

  // Cores do badge
  badgeNextType.className = 'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ';
  if (effectiveType === 'Hidratação') {
    badgeNextType.classList.add('bg-sky-500/20', 'text-sky-300', 'border-sky-500/40');
  } else if (effectiveType === 'Nutrição') {
    badgeNextType.classList.add('bg-amber-500/20', 'text-amber-300', 'border-amber-500/40');
  } else if (effectiveType === 'Reconstrução') {
    badgeNextType.classList.add('bg-purple-500/20', 'text-purple-300', 'border-purple-500/40');
  } else if (effectiveType === 'Acidificação') {
    badgeNextType.classList.add('bg-rose-500/20', 'text-rose-300', 'border-rose-500/40');
  } else {
    badgeNextType.classList.add('bg-teal-500/20', 'text-teal-300', 'border-teal-500/40');
  }

  // Estatísticas do topo
  const statLastWash = document.getElementById('statLastWash');
  const statTotalWashes = document.getElementById('statTotalWashes');
  const statLastAntidandruff = document.getElementById('statLastAntidandruff');
  const statCycleProgress = document.getElementById('statCycleProgress');

  statTotalWashes.textContent = `${appState.history.length} registradas`;

  if (appState.history.length > 0) {
    const last = appState.history[0];
    const d = new Date(last.date + 'T' + (last.time || '12:00'));
    statLastWash.textContent = formatDateRel(d);
  } else {
    statLastWash.textContent = 'Nenhum registro';
  }

  if (appState.lastDermatitisDate) {
    const ld = new Date(appState.lastDermatitisDate);
    const diffDays = Math.floor((new Date() - ld) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      statLastAntidandruff.textContent = 'Feito hoje!';
      statLastAntidandruff.className = 'text-sm font-semibold text-teal-300';
    } else if (diffDays === 1) {
      statLastAntidandruff.textContent = 'Ontem';
      statLastAntidandruff.className = 'text-sm font-semibold text-teal-300';
    } else if (diffDays <= 3) {
      statLastAntidandruff.textContent = `Há ${diffDays} dias (Bom)`;
      statLastAntidandruff.className = 'text-sm font-semibold text-emerald-300';
    } else {
      statLastAntidandruff.textContent = `Há ${diffDays} dias (Atenção)`;
      statLastAntidandruff.className = 'text-sm font-semibold text-amber-300';
    }
  } else {
    statLastAntidandruff.textContent = 'Não registrado';
  }

  const progressPercent = Math.round((appState.currentStepIndex / 12) * 100);
  statCycleProgress.textContent = `${progressPercent}% concluído (${appState.currentStepIndex}/12)`;

  // Texto da aba de dermatite
  const dermatitisLastDateText = document.getElementById('dermatitisLastDateText');
  if (appState.lastDermatitisDate) {
    const ld = new Date(appState.lastDermatitisDate);
    dermatitisLastDateText.textContent = `Último uso registrado: ${ld.toLocaleDateString('pt-BR')}`;
  } else {
    dermatitisLastDateText.textContent = 'Último uso registrado: Nenhum ainda';
  }

  // Render Grid de 4 Semanas
  renderWeeksGrid(currentSchedule);
}

function renderWeeksGrid(schedule) {
  const container = document.getElementById('weeksGrid');
  container.innerHTML = '';

  for (let w = 1; w <= 4; w++) {
    const weekSteps = schedule.filter(s => s.week === w);
    
    const weekCard = document.createElement('div');
    weekCard.className = 'p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3';
    
    let stepsHtml = '';
    weekSteps.forEach((step, idx) => {
      const overallIndex = (w - 1) * 3 + idx;
      const isDone = overallIndex < appState.currentStepIndex;
      const isCurrent = overallIndex === appState.currentStepIndex;

      let colorClass = 'bg-sky-50 text-sky-700 border-sky-200';
      let icon = 'droplets';
      if (step.type === 'Nutrição') {
        colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
        icon = 'sparkles';
      } else if (step.type === 'Reconstrução') {
        colorClass = 'bg-purple-50 text-purple-700 border-purple-200';
        icon = 'shield';
      }

      let statusBadge = '';
      if (isDone) {
        statusBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200"><i data-lucide="check" class="w-3 h-3"></i> Concluído</span>`;
      } else if (isCurrent) {
        statusBadge = `<span class="inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-200 animate-pulse"><i data-lucide="arrow-right" class="w-3 h-3"></i> Próximo</span>`;
      } else {
        statusBadge = `<span class="text-[11px] font-medium text-slate-400">Pendente</span>`;
      }

      stepsHtml += `
        <div class="step-item p-3 rounded-lg border bg-white ${isCurrent ? 'ring-2 ring-brand-500 shadow-sm' : 'border-slate-200'} flex flex-col justify-between gap-2" onclick="openLogCareModalWithStep('${step.type}', ${overallIndex})">
          <div class="flex items-center justify-between">
            <span class="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded border ${colorClass}">
              <i data-lucide="${icon}" class="w-3.5 h-3.5"></i> ${step.type}
            </span>
            ${statusBadge}
          </div>
          <p class="text-xs text-slate-600 line-clamp-2">${step.desc}</p>
          <div class="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-100">
            <span>Lavagem ${idx + 1} da sem.</span>
            <span class="text-brand-600 font-medium hover:underline flex items-center gap-0.5">
              Registrar <i data-lucide="chevron-right" class="w-3 h-3"></i>
            </span>
          </div>
        </div>
      `;
    });

    weekCard.innerHTML = `
      <div class="flex items-center justify-between">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <span>Semana ${w}</span>
          ${w === 2 || w === 4 ? '<span class="text-[10px] text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.2 rounded font-normal">Semana de Reconstrução / Acidificação</span>' : ''}
        </h4>
        <span class="text-[11px] text-slate-500">3 tratamentos</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        ${stepsHtml}
      </div>
    `;

    container.appendChild(weekCard);
  }

  lucide.createIcons();
}

// Modais e Ações
function initModals() {
  const modalLog = document.getElementById('modalLogCare');
  const modalProd = document.getElementById('modalAddProduct');
  const modalDyn = document.getElementById('modalDynamicCycle');
  const modalShower = document.getElementById('modalShowerGuide');

  // Fechar modais ao clicar no X ou fora
  document.querySelectorAll('.btnCloseModal').forEach(b => {
    b.addEventListener('click', () => modalLog.classList.add('hidden'));
  });

  document.querySelectorAll('.btnCloseProductModal').forEach(b => {
    b.addEventListener('click', () => modalProd.classList.add('hidden'));
  });

  document.querySelectorAll('.btnCloseDynamicModal').forEach(b => {
    b.addEventListener('click', () => {
      if (modalDyn) modalDyn.classList.add('hidden');
    });
  });

  document.querySelectorAll('.btnCloseShowerModal').forEach(b => {
    b.addEventListener('click', () => {
      if (modalShower) modalShower.classList.add('hidden');
    });
  });

  modalLog.addEventListener('click', (e) => {
    if (e.target === modalLog) modalLog.classList.add('hidden');
  });

  modalProd.addEventListener('click', (e) => {
    if (e.target === modalProd) modalProd.classList.add('hidden');
  });

  if (modalDyn) {
    modalDyn.addEventListener('click', (e) => {
      if (e.target === modalDyn) modalDyn.classList.add('hidden');
    });
  }

  if (modalShower) {
    modalShower.addEventListener('click', (e) => {
      if (e.target === modalShower) modalShower.classList.add('hidden');
    });
  }

  const btnOpenShower = document.getElementById('btnOpenShowerGuide');
  if (btnOpenShower) {
    btnOpenShower.addEventListener('click', () => {
      if (modalShower) {
        modalShower.classList.remove('hidden');
        lucide.createIcons();
      }
    });
  }

  // Botões de abertura
  document.getElementById('btnQuickLog').addEventListener('click', () => openDefaultLogModal());
  document.getElementById('btnMarkDoneNow').addEventListener('click', () => openDefaultLogModal());
  document.getElementById('btnCustomWash').addEventListener('click', () => {
    openLogCareModalWithStep('Lavagem Simples', null);
  });
  document.getElementById('btnOpenAddProductModal').addEventListener('click', () => {
    modalProd.classList.remove('hidden');
    lucide.createIcons();
  });

  const btnOpenDyn = document.getElementById('btnOpenDynamicCycle');
  if (btnOpenDyn) {
    btnOpenDyn.addEventListener('click', () => openDynamicCycleModal());
  }

  const btnReopenDyn = document.getElementById('btnReopenDynamicCycle');
  if (btnReopenDyn) {
    btnReopenDyn.addEventListener('click', () => openDynamicCycleModal());
  }

  const btnClearDyn = document.getElementById('btnClearDynamicStep');
  if (btnClearDyn) {
    btnClearDyn.addEventListener('click', () => {
      appState.customNextStep = null;
      saveState();
      renderDashboard();
      showToast('Voltou ao cronograma linear de 4 semanas.');
    });
  }

  // Botão registro rápido dermatite
  document.getElementById('btnLogDermatitisOnly').addEventListener('click', () => {
    const today = new Date().toISOString();
    appState.lastDermatitisDate = today;
    saveState();
    showToast('Uso de Shampoo Anticaspa registrado!');
    renderDashboard();
  });

  // Limpar histórico
  document.getElementById('btnClearHistory').addEventListener('click', () => {
    if (confirm('Tem certeza que deseja apagar o histórico de lavagens?')) {
      appState.history = [];
      appState.currentStepIndex = 0;
      appState.customNextStep = null;
      saveState();
      renderDashboard();
      renderHistory();
      showToast('Histórico reiniciado.');
    }
  });
}

function openDefaultLogModal() {
  if (appState.customNextStep) {
    const rec = appState.customNextStep;
    openLogCareModalWithStep(
      rec.type,
      null,
      rec.products ? rec.products.join(' + ') : '',
      `Ciclo Dinâmico: ${rec.cycleName || 'Personalizado'} • ${rec.reason || ''}`,
      {
        isPrePoo: !!rec.suggestPrePoo,
        isAcidifier: !!rec.suggestAcidifier
      }
    );
    return;
  }
  const currentSchedule = SCHEDULE_TEMPLATES[appState.porosity] || SCHEDULE_TEMPLATES.alta;
  const currentStep = currentSchedule[appState.currentStepIndex] || currentSchedule[0];
  openLogCareModalWithStep(currentStep.type, appState.currentStepIndex);
}

window.openLogCareModalWithStep = function(type, stepIndex, prefillProducts, prefillNotes, prefillChecks) {
  const modal = document.getElementById('modalLogCare');
  const now = new Date();
  
  // Preencher data e hora atuais
  document.getElementById('inputCareDate').value = now.toISOString().split('T')[0];
  document.getElementById('inputCareTime').value = now.toTimeString().slice(0, 5);

  // Marcar rádio correspondente
  const radios = document.getElementsByName('careType');
  radios.forEach(r => {
    if (r.value.toLowerCase().startsWith(type.toLowerCase().slice(0, 4))) {
      r.checked = true;
    }
  });

  // Guardar o stepIndex que está sendo completado no dataset do formulário
  document.getElementById('formLogCare').dataset.targetStep = (stepIndex !== null && stepIndex !== undefined) ? stepIndex : '';

  // Pré-preenchimentos opcionais (Ciclo Dinâmico)
  if (prefillProducts !== undefined && prefillProducts !== null) {
    document.getElementById('inputProductsUsed').value = prefillProducts;
  }
  if (prefillNotes !== undefined && prefillNotes !== null) {
    document.getElementById('inputCareNotes').value = prefillNotes;
  }
  if (prefillChecks) {
    if (prefillChecks.isPrePoo !== undefined) {
      document.getElementById('checkPrePoo').checked = !!prefillChecks.isPrePoo;
    }
    if (prefillChecks.isAcidifier !== undefined) {
      document.getElementById('checkAcidifier').checked = !!prefillChecks.isAcidifier;
    }
    if (prefillChecks.isDermatitis !== undefined) {
      document.getElementById('checkDermatitisShampoo').checked = !!prefillChecks.isDermatitis;
    }
  }

  modal.classList.remove('hidden');
  lucide.createIcons();
};

window.appendProductToInput = function(prodName) {
  const input = document.getElementById('inputProductsUsed');
  if (!input) return;
  if (!input.value.trim()) {
    input.value = prodName;
  } else if (!input.value.includes(prodName)) {
    input.value += ' + ' + prodName;
  }
  input.focus();
};

// Formulários
function initForms() {
  // Form de Log de Lavagem
  const formLog = document.getElementById('formLogCare');
  formLog.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('inputCareDate').value;
    const time = document.getElementById('inputCareTime').value;
    const careType = document.querySelector('input[name="careType"]:checked').value;
    const isDermatitis = document.getElementById('checkDermatitisShampoo').checked;
    const isPrePoo = document.getElementById('checkPrePoo').checked;
    const isAcidifier = document.getElementById('checkAcidifier').checked;
    const isAccessories = document.getElementById('checkAccessories') ? document.getElementById('checkAccessories').checked : false;
    const products = document.getElementById('inputProductsUsed').value.trim();
    const feeling = document.querySelector('input[name="hairFeeling"]:checked').value;
    const notes = document.getElementById('inputCareNotes').value.trim();
    const targetStep = formLog.dataset.targetStep;

    const logEntry = {
      id: 'log_' + Date.now(),
      date,
      time,
      type: careType,
      isDermatitis,
      isPrePoo,
      isAcidifier,
      isAccessories,
      products: products || 'Produtos habituais',
      feeling,
      notes,
      timestamp: new Date(date + 'T' + time).getTime()
    };

    // Inserir no início do histórico
    appState.history.unshift(logEntry);

    // Se usou shampoo anticaspa, atualizar data
    if (isDermatitis) {
      appState.lastDermatitisDate = new Date(date + 'T' + time).toISOString();
    }

    // Se o cuidado for uma das etapas do cronograma oficial (H, N, R), avançar o passo do ciclo
    if (['Hidratação', 'Nutrição', 'Reconstrução'].includes(careType)) {
      if (targetStep !== '' && parseInt(targetStep) === appState.currentStepIndex) {
        appState.currentStepIndex = (appState.currentStepIndex + 1) % 12;
      } else if (targetStep === '') {
        appState.currentStepIndex = (appState.currentStepIndex + 1) % 12;
      }
    }

    // Se concluiu um cuidado dinâmico, limpar para voltar à esteira normal ou novo cálculo
    if (appState.customNextStep) {
      appState.customNextStep = null;
    }

    saveState();
    document.getElementById('modalLogCare').classList.add('hidden');
    formLog.reset();
    showToast('Cuidado registrado com sucesso!');
    
    renderDashboard();
    renderHistory();
  });

  // Form de Novo Produto
  const formProd = document.getElementById('formAddProduct');
  formProd.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('inputProductName').value.trim();
    const brand = document.getElementById('inputProductBrand').value.trim();
    const category = document.getElementById('inputProductCategory').value;
    const notes = document.getElementById('inputProductNotes').value.trim();

    const newProd = {
      id: 'prod_' + Date.now(),
      name,
      brand: brand || 'Marca genérica',
      category,
      notes: notes || ''
    };

    appState.products.push(newProd);
    saveState();
    document.getElementById('modalAddProduct').classList.add('hidden');
    formProd.reset();
    showToast(`Produto "${name}" cadastrado!`);
    renderProducts();
  });
}

// Render Histórico
function renderHistory() {
  const container = document.getElementById('historyTimeline');
  if (appState.history.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
        <i data-lucide="calendar-plus" class="w-10 h-10 text-slate-300 mx-auto mb-2"></i>
        <h4 class="font-bold text-slate-700">Nenhum cuidado registrado ainda</h4>
        <p class="text-xs text-slate-400 max-w-sm mx-auto mt-1">
          Clique no botão "Registrar Cuidado" quando lavar o cabelo para acompanhar a resposta dos fios e o cronograma.
        </p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = '';
  appState.history.forEach((item, index) => {
    let colorClass = 'bg-sky-50 text-sky-700 border-sky-200';
    if (item.type === 'Nutrição') colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
    if (item.type === 'Reconstrução') colorClass = 'bg-purple-50 text-purple-700 border-purple-200';
    if (item.type === 'Lavagem Simples') colorClass = 'bg-slate-100 text-slate-700 border-slate-200';

    const card = document.createElement('div');
    card.className = 'bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5';
    card.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold px-2.5 py-0.5 rounded-full border ${colorClass}">
            ${item.type}
          </span>
          <span class="text-xs text-slate-500 font-medium">
            ${formatDateDisplay(item.date)} às ${item.time || '12:00'}
          </span>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap">
          ${item.isDermatitis ? '<span class="text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-md">Couro: Anticaspa</span>' : ''}
          ${item.isPrePoo ? '<span class="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">Pré-Poo</span>' : ''}
          ${item.isAcidifier ? '<span class="text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-md">Acidificante</span>' : ''}
          ${item.isAccessories ? '<span class="text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-md">Microfibra/Cetim</span>' : ''}
          <button onclick="deleteHistoryItem('${item.id}')" class="text-slate-300 hover:text-rose-500 p-1 text-xs ml-2" title="Excluir">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div>
          <span class="text-slate-400 block text-[10px] uppercase font-bold">Produtos Usados:</span>
          <p class="text-slate-700 font-medium">${item.products}</p>
        </div>
        <div>
          <span class="text-slate-400 block text-[10px] uppercase font-bold">Sensação do Fio:</span>
          <p class="text-slate-700 font-medium">${item.feeling || 'Não informado'}</p>
        </div>
      </div>

      ${item.notes ? `
        <div class="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          "${item.notes}"
        </div>
      ` : ''}
    `;

    container.appendChild(card);
  });

  lucide.createIcons();
}

window.deleteHistoryItem = function(id) {
  if (confirm('Deseja excluir este registro de cuidado?')) {
    appState.history = appState.history.filter(h => h.id !== id);
    saveState();
    renderDashboard();
    renderHistory();
    showToast('Registro excluído.');
  }
};

// Render Armário de Produtos
function renderProducts(filterCat = 'all') {
  const container = document.getElementById('productsGrid');
  const filtered = filterCat === 'all' 
    ? appState.products 
    : appState.products.filter(p => p.category.toLowerCase() === filterCat.toLowerCase());

  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-8 text-center text-xs text-slate-400">
        Nenhum produto cadastrado nesta categoria.
      </div>
    `;
    return;
  }

  filtered.forEach(p => {
    let catBadge = '';
    switch (p.category) {
      case 'hidratação': catBadge = '<span class="bg-sky-50 text-sky-700 border-sky-200">Hidratação (H)</span>'; break;
      case 'nutrição': catBadge = '<span class="bg-amber-50 text-amber-700 border-amber-200">Nutrição (N)</span>'; break;
      case 'reconstrução': catBadge = '<span class="bg-purple-50 text-purple-700 border-purple-200">Reconstrução (R)</span>'; break;
      case 'dermatite': catBadge = '<span class="bg-teal-50 text-teal-700 border-teal-200">Dermatite / Anticaspa</span>'; break;
      case 'pre-poo': catBadge = '<span class="bg-emerald-50 text-emerald-700 border-emerald-200">Pré-Poo</span>'; break;
      case 'acidificante': catBadge = '<span class="bg-rose-50 text-rose-700 border-rose-200">Acidificante</span>'; break;
      case 'finalizador': catBadge = '<span class="bg-indigo-50 text-indigo-700 border-indigo-200">Finalizador</span>'; break;
      default: catBadge = '<span class="bg-slate-100 text-slate-700 border-slate-200">Geral</span>';
    }

    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-3';
    card.innerHTML = `
      <div>
        <div class="flex items-start justify-between gap-2 mb-1.5">
          <span class="text-[10px] font-bold px-2 py-0.5 rounded border ${catBadge.slice(catBadge.indexOf('class="') + 7, catBadge.indexOf('">'))}">
            ${p.category.toUpperCase()}
          </span>
          <button onclick="deleteProduct('${p.id}')" class="text-slate-300 hover:text-rose-500 p-1" title="Excluir">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
        <h4 class="font-bold text-sm text-slate-900 leading-snug">${p.name}</h4>
        <span class="text-xs text-slate-500 block">${p.brand}</span>
        ${p.notes ? `<p class="text-xs text-slate-600 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-100">${p.notes}</p>` : ''}

        <!-- Busca de Preço / Reposição do produto do Armário -->
        <div class="pt-2 mt-2 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
          <a 
            href="https://www.google.com/search?tbm=shop&q=${encodeURIComponent(p.brand + ' ' + p.name)}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center gap-1 text-[10px] text-slate-600 hover:text-emerald-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md font-medium transition"
            title="Comparar preços atuais"
          >
            <i data-lucide="search" class="w-3 h-3 text-slate-400"></i>
            Comparar Preços
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Atualizar botões de filtro
  document.querySelectorAll('.product-filter-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.product-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.cat);
    };
  });

  lucide.createIcons();
}

window.deleteProduct = function(id) {
  if (confirm('Deseja remover este produto do seu armário?')) {
    appState.products = appState.products.filter(p => p.id !== id);
    saveState();
    renderProducts();
    showToast('Produto removido.');
  }
};

// Porosidade
function renderPorositySelection() {
  const cards = document.querySelectorAll('.porosity-card');
  const currentText = document.getElementById('currentPorosityText');
  const currentTip = document.getElementById('currentPorosityTip');

  cards.forEach(card => {
    const porosity = card.dataset.porosity;
    if (porosity === appState.porosity) {
      card.classList.add('selected');
    } else {
      card.classList.remove('selected');
    }

    card.onclick = () => {
      appState.porosity = porosity;
      saveState();
      renderPorositySelection();
      renderDashboard();
      showToast(`Porosidade ajustada para: ${porosity.toUpperCase()}`);
    };
  });

  if (appState.porosity === 'alta') {
    currentText.textContent = 'Alta Porosidade (Fio afundou no copo)';
    currentTip.textContent = 'O cronograma foca em Acidificação (para fechar cutículas), Reconstruções a cada 15 dias e Nutrição leve para devolver brilho.';
  } else if (appState.porosity === 'media') {
    currentText.textContent = 'Média Porosidade (Fio no meio do copo)';
    currentTip.textContent = 'Cutículas equilibradas. Foco em manter a hidratação e nutrição balanceadas.';
  } else {
    currentText.textContent = 'Baixa Porosidade (Fio boiou na superfície)';
    currentTip.textContent = 'Cutículas muito fechadas. Foco em hidratação fluida e evitar o acúmulo de queratina/óleos pesados.';
  }
}

// Timer para Shampoo Medicamentoso de Dermatite
function initTimer() {
  const display = document.getElementById('timerDisplay');
  const btnStart = document.getElementById('btnStartTimer');
  const btnReset = document.getElementById('btnResetTimer');

  function updateDisplay() {
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  btnStart.addEventListener('click', () => {
    if (timerInterval) {
      // Pausar
      clearInterval(timerInterval);
      timerInterval = null;
      btnStart.innerHTML = '<i data-lucide="play" class="w-4 h-4"></i> Retomar';
      display.classList.remove('pulse-timer');
    } else {
      // Iniciar
      if (timerSeconds <= 0) timerSeconds = 180;
      display.classList.add('pulse-timer');
      btnStart.innerHTML = '<i data-lucide="pause" class="w-4 h-4"></i> Pausar';
      
      timerInterval = setInterval(() => {
        timerSeconds--;
        updateDisplay();

        if (timerSeconds <= 0) {
          clearInterval(timerInterval);
          timerInterval = null;
          display.classList.remove('pulse-timer');
          btnStart.innerHTML = '<i data-lucide="play" class="w-4 h-4"></i> Iniciar';
          alert('⏰ Tempo de ação do shampoo anticaspa concluído! Pode enxaguar bem o couro cabeludo.');
        }
      }, 1000);
    }
    lucide.createIcons();
  });

  btnReset.addEventListener('click', () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    timerSeconds = 180;
    display.classList.remove('pulse-timer');
    btnStart.innerHTML = '<i data-lucide="play" class="w-4 h-4"></i> Iniciar';
    updateDisplay();
    lucide.createIcons();
  });

  updateDisplay();
}

// Helpers
function formatDateDisplay(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function formatDateRel(d) {
  const now = new Date();
  const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Ontem';
  return `${d.toLocaleDateString('pt-BR')}`;
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMessage');
  msgEl.textContent = msg;
  toast.classList.remove('translate-y-24', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-24', 'opacity-0');
  }, 3000);
}

// ================= GUIA DE PRODUTOS & ANALISADOR =================

const RECOMMENDED_MARKET_PRODUCTS = [
  // ================= 1. DERMATITE / COURO CABELUDO =================
  // Baratinho
  {
    id: 'rec_ceto_gen',
    name: 'Shampoo Cetoconazol 2%',
    brand: 'Genérico (Medley / EMS / Neo Química)',
    category: 'dermatite',
    budget: 'baratinho',
    price: '~ R$ 15 - 20',
    why: 'Antifúngico clínico essencial para conter a proliferação da caspa e coceira no couro cabeludo.'
  },
  {
    id: 'rec_clear_men',
    name: 'Shampoo Clear Limpeza Diária 2 em 1',
    brand: 'Clear Anticaspa',
    category: 'dermatite',
    budget: 'baratinho',
    price: '~ R$ 18 - 22',
    why: 'Com Piritionato de Zinco. Boa opção de supermercado para alternar durante a semana.'
  },
  // Custo-Benefício
  {
    id: 'rec_head_clinical',
    name: 'Shampoo Clinical Solutions (Sulfeto de Selênio)',
    brand: 'Head & Shoulders',
    category: 'dermatite',
    budget: 'custo-beneficio',
    price: '~ R$ 38 - 46',
    why: 'Sulfeto de selênio a 1%: alívio muito rápido para crises de descamação e vermelhidão.'
  },
  {
    id: 'rec_pielus_di',
    name: 'Shampoo Pielus DI Anticaspa Intensa',
    brand: 'TheraSkin',
    category: 'dermatite',
    budget: 'custo-beneficio',
    price: '~ R$ 55 - 65',
    why: 'Contém Ciclopirox Olamina e Ácido Salicílico. Limpa profundamente sem arder o couro sensível.'
  },
  {
    id: 'rec_doctar_plus',
    name: 'Shampoo Doctar Plus Anticaspa',
    brand: 'Darrow Dermocosméticos',
    category: 'dermatite',
    budget: 'custo-beneficio',
    price: '~ R$ 56 - 68',
    why: 'Altamente recomendado por dermatologistas para dermatite oleosa. Acalma a coceira na primeira lavagem.'
  },
  // Profissional / Dermocosmético
  {
    id: 'rec_dercos_ds',
    name: 'Dercos Anticaspa DS (Couro Oleoso)',
    brand: 'Vichy Laboratoires',
    category: 'dermatite',
    budget: 'premium',
    price: '~ R$ 90 - 115',
    why: 'Padrão ouro dermatológico. Eficácia comprovada contra o fungo Malassezia com ação antiquebra.'
  },
  {
    id: 'rec_kelual_ds',
    name: 'Kelual DS Shampoo Tratante Redutor',
    brand: 'Ducray Laboratórios',
    category: 'dermatite',
    budget: 'premium',
    price: '~ R$ 85 - 105',
    why: 'Fórmula francesa com Ciclopiroxolamina e Piritionato de Zinco. Muito seguro e duradouro.'
  },

  // ================= 2. PRÉ-POO & PROTEÇÃO DE PONTAS =================
  // Baratinho
  {
    id: 'rec_yamasterol_amarelo',
    name: 'Yamasterol Amarelo (Babosa & D-Pantenol)',
    brand: 'Yamá Cosméticos',
    category: 'pre-poo',
    budget: 'baratinho',
    price: '~ R$ 10 - 14 (900g)',
    why: 'O pré-poo indispensável! Fórmula super fluida, protege as pontas finas sem acumular resíduo.'
  },
  {
    id: 'rec_yamasterol_branco',
    name: 'Yamasterol Branco (Proteína de Soja)',
    brand: 'Yamá Cosméticos',
    category: 'pre-poo',
    budget: 'baratinho',
    price: '~ R$ 10 - 14 (900g)',
    why: 'Alternativa com aminoácidos leves. Excelente para proteger pontas mais fragilizadas.'
  },
  // Custo-Benefício
  {
    id: 'rec_lola_cacho_cond',
    name: 'Condicionador Meu Cacho Minha Vida',
    brand: 'Lola Cosmetics',
    category: 'pre-poo',
    budget: 'custo-beneficio',
    price: '~ R$ 28 - 35',
    why: 'Multifuncional leve com óleo de patauá. Ótimo para envelopar os fios antes do banho.'
  },
  {
    id: 'rec_apse_oleo_pre',
    name: 'Óleo Vegetal Puro de Semente de Uva',
    brand: 'Apse / Farmax 100% Puro',
    category: 'pre-poo',
    budget: 'custo-beneficio',
    price: '~ R$ 20 - 28',
    why: 'Óleo finíssimo. Aplique 4 a 6 gotas apenas nas pontinhas 15 minutos antes de lavar com anticaspa.'
  },

  // ================= 3. SHAMPOOS DIÁRIOS / MANUTENÇÃO =================
  // Baratinho
  {
    id: 'rec_pantene_micelar',
    name: 'Shampoo Pantene Micelar Purifica & Hidrata',
    brand: 'Pantene',
    category: 'shampoo-neutro',
    budget: 'baratinho',
    price: '~ R$ 18 - 22',
    why: 'Shampoo transparente de limpeza suave. Não resseca o comprimento nos dias sem remédio.'
  },
  {
    id: 'rec_dove_plantas',
    name: 'Shampoo Dove Poder das Plantas Purificação',
    brand: 'Dove',
    category: 'shampoo-neutro',
    budget: 'baratinho',
    price: '~ R$ 20 - 25',
    why: '97% de ingredientes de origem natural, com óleo de melaleuca e sem sulfatos fortes.'
  },
  // Custo-Benefício
  {
    id: 'rec_lola_camomila',
    name: 'Shampoo Suave Iluminador Camomila',
    brand: 'Lola Cosmetics',
    category: 'shampoo-neutro',
    budget: 'custo-beneficio',
    price: '~ R$ 28 - 34',
    why: 'Fórmula muito delicada com óleo essencial de limão e camomila. Ótimo para raiz mista.'
  },
  {
    id: 'rec_haskell_alecrim',
    name: 'Shampoo Purificante Alecrim & Menta',
    brand: 'Haskell',
    category: 'shampoo-neutro',
    budget: 'custo-beneficio',
    price: '~ R$ 32 - 40',
    why: 'Ação refrescante e antioleosidade suave para quem lava a cabeça todos os dias.'
  },
  // Profissional
  {
    id: 'rec_wella_aqua_pure',
    name: 'Shampoo Invigo Aqua Pure Purifying',
    brand: 'Wella Professionals',
    category: 'shampoo-neutro',
    budget: 'premium',
    price: '~ R$ 85 - 105',
    why: 'Limpeza profissional purificante com extrato de lótus. Fios soltos e leves o dia todo.'
  },

  // ================= 4. HIDRATAÇÃO (H) =================
  // Baratinho
  {
    id: 'rec_skala_babosa',
    name: 'Skala Expert Babosa (Aloe Vera)',
    brand: 'Skala Cosméticos',
    category: 'hidratação',
    budget: 'baratinho',
    price: '~ R$ 10 - 13 (1kg)',
    why: 'Super fluida e aquosa. Penetra nas cutículas fechadas da baixa porosidade sem pesar.'
  },
  {
    id: 'rec_seda_boom_h',
    name: 'Máscara Seda Boom Hidratação Profunda',
    brand: 'Seda',
    category: 'hidratação',
    budget: 'baratinho',
    price: '~ R$ 16 - 20',
    why: 'Contém D-Pantenol e Babosa. Textura leve em creme fácil de enxaguar.'
  },
  {
    id: 'rec_salonline_babosa',
    name: 'Máscara Tô de Cacho Babosa & Alecrim',
    brand: 'Salon Line',
    category: 'hidratação',
    budget: 'baratinho',
    price: '~ R$ 18 - 24',
    why: 'Efeito desmaia-cabelo com textura aquosa, excelente desembaraço para 2C/3A.'
  },
  // Custo-Benefício
  {
    id: 'rec_ghee_banana',
    name: 'Be(M)dita Ghee Banana & Aloe Vera',
    brand: 'Lola Cosmetics',
    category: 'hidratação',
    budget: 'custo-beneficio',
    price: '~ R$ 35 - 45',
    why: 'Emulsão cremosa-aquosa botânica. Devolve água e maleabilidade sem plastificar o fio fino.'
  },
  {
    id: 'rec_haskell_mandioca',
    name: 'Máscara Mandioca Hidratação & Força',
    brand: 'Haskell',
    category: 'hidratação',
    budget: 'custo-beneficio',
    price: '~ R$ 34 - 42',
    why: 'Clássico para desembaraço e maciez. Fórmula rica em vitaminas que penetra rápido.'
  },
  // Profissional
  {
    id: 'rec_wella_elements',
    name: 'Máscara Elements Renewing (Fórmula Limpa)',
    brand: 'Wella Professionals',
    category: 'hidratação',
    budget: 'premium',
    price: '~ R$ 130 - 150',
    why: 'Fórmula botânica renovadora sem silicones nem sulfatos. Pantenol botânico que hidrata profundamente sem pesar no fio fino 2C/3A.'
  },
  {
    id: 'rec_senscience_inner',
    name: 'Inner Restore Deep Moisturizing Mask',
    brand: 'Senscience',
    category: 'hidratação',
    budget: 'premium',
    price: '~ R$ 130 - 165',
    why: 'Hidratação profunda sem silicone pesado. Transforma o toque áspero em sedosidade.'
  },

  // ================= 5. NUTRIÇÃO LEVE (N) =================
  // Baratinho
  {
    id: 'rec_maria_natureza',
    name: 'Máscara Maria Natureza Óleos Milenares',
    brand: 'Salon Line',
    category: 'nutrição',
    budget: 'baratinho',
    price: '~ R$ 22 - 28',
    why: 'Óleo de argan e semente de uva. Proporciona brilho e alinhamento sem pesar no cacho.'
  },
  {
    id: 'rec_skala_argan',
    name: 'Skala Expert Óleo de Argan do Marrocos',
    brand: 'Skala Cosméticos',
    category: 'nutrição',
    budget: 'baratinho',
    price: '~ R$ 10 - 13 (1kg)',
    why: 'Opção de nutrição acessível e suave. Ideal para quem lava com frequência.'
  },
  // Custo-Benefício
  {
    id: 'rec_danos_booster',
    name: 'Booster Máscara Líquida Danos Vorazes',
    brand: 'Lola Cosmetics',
    category: 'nutrição',
    budget: 'custo-beneficio',
    price: '~ R$ 38 - 48',
    why: 'O melhor produto para o seu cabelo: líquida que vira creme. Dá brilho espelhado sem murchar o fio.'
  },
  {
    id: 'rec_haskell_murumuru',
    name: 'Máscara Manteiga de Murumuru Nutritiva',
    brand: 'Haskell',
    category: 'nutrição',
    budget: 'custo-beneficio',
    price: '~ R$ 36 - 45',
    why: 'Nutrição lipídica intensa. Use apenas uma moeda de 1 real no comprimento para não pesar.'
  },
  // Profissional
  {
    id: 'rec_wella_reboost',
    name: 'Oil Reflections Luminous Reboost Máscara',
    brand: 'Wella Professionals',
    category: 'nutrição',
    budget: 'premium',
    price: '~ R$ 130 - 160 (500ml)',
    why: 'Nutrição luminosa com óleo de camélia e chá branco. Recupera a barreira lipídica e sela o frizz com brilho espelhado.'
  },

  // ================= 6. RECONSTRUÇÃO (R) =================
  // Baratinho
  {
    id: 'rec_haskell_queratina',
    name: 'Carga de Queratina Líquida Concentrada',
    brand: 'Haskell',
    category: 'reconstrução',
    budget: 'baratinho',
    price: '~ R$ 22 - 28',
    why: 'Queratina líquida pura. Borrife no comprimento e pause 10 min (usar apenas 1x ao mês!).'
  },
  {
    id: 'rec_skala_caju',
    name: 'Skala Caju e Murumuru Reconstrução',
    brand: 'Skala Cosméticos',
    category: 'reconstrução',
    budget: 'baratinho',
    price: '~ R$ 10 - 13',
    why: 'Reconstrução bem branda, segura para não enrijecer fios de baixa porosidade.'
  },
  // Custo-Benefício
  {
    id: 'rec_tarja_preta',
    name: 'Máscara Tarja Preta Queratina Vegetal',
    brand: 'Lola Cosmetics',
    category: 'reconstrução',
    budget: 'custo-beneficio',
    price: '~ R$ 35 - 45',
    why: 'Aminoácidos vegetais biodisponíveis. Fortalece o fio sem provocar efeito de rigidez.'
  },
  {
    id: 'rec_amend_cauter',
    name: 'Máscara Cauterização Reconstrutora',
    brand: 'Amend',
    category: 'reconstrução',
    budget: 'custo-beneficio',
    price: '~ R$ 42 - 52',
    why: 'Ação rápida na fibra capilar, recuperando a textura macia das pontas secas.'
  },
  // Profissional
  {
    id: 'rec_loreal_absolut',
    name: 'Absolut Repair Gold Quinoa & Proteína',
    brand: "L'Oréal Professionnel",
    category: 'reconstrução',
    budget: 'premium',
    price: '~ R$ 130 - 155 (500g)',
    why: 'Reconstrução de salão com Quinoa Dourada e proteína hidrolisada. Repara danos profundos mantendo o cacho maleável e toque leve.'
  },
  {
    id: 'rec_lowell_bioplastia',
    name: 'Bioplastia Creme Reconstrutor de Fios',
    brand: 'Lowell Profissional',
    category: 'reconstrução',
    budget: 'premium',
    price: '~ R$ 85 - 110',
    why: 'Reconstrói a massa capilar em apenas 3 minutos, mantendo a maleabilidade do cacho fino.'
  },

  // ================= 7. ACIDIFICANTE (SELADOR DE CUTÍCULAS) =================
  // Baratinho
  {
    id: 'rec_vinagre_maca',
    name: 'Acidificação Caseira com Vinagre de Maçã',
    brand: 'Receita Natural Equilibrada',
    category: 'acidificante',
    budget: 'baratinho',
    price: '~ R$ 10 - 14',
    why: 'Misture 25ml de vinagre de maçã em 200ml de água filtrada. Borrife após o shampoo por 3 min e enxágue.'
  },
  // Custo-Benefício
  {
    id: 'rec_acidificante_lola',
    name: 'Acidificante Densidade pH 3.0',
    brand: 'Lola Cosmetics',
    category: 'acidificante',
    budget: 'custo-beneficio',
    price: '~ R$ 36 - 45',
    why: 'O melhor acidificante nacional! Desembaraça na hora, sela as escamas e dá brilho espelhado.'
  },
  {
    id: 'rec_widi_infusao',
    name: 'Acidificante Infusão 2.0 pH 3.0',
    brand: 'Widi Care',
    category: 'acidificante',
    budget: 'custo-beneficio',
    price: '~ R$ 45 - 55',
    why: 'Com vinagre de maçã e extratos florais. Deixa o fio com toque acetinado imediato.'
  },
  // Profissional
  {
    id: 'rec_kpro_balancer',
    name: 'pH Balancer Acidificante Profissional (pH 2.5)',
    brand: 'K.Pro',
    category: 'acidificante',
    budget: 'premium',
    price: '~ R$ 75 - 90',
    why: 'O acidificante de salão mais premiado do Brasil. Fecha totalmente as cutículas e alinha as ondas.'
  },

  // ================= 8. FINALIZADORES / LEAVE-IN =================
  // Baratinho
  {
    id: 'rec_gelatina_verde',
    name: 'Gelatina Não Sai da Minha Cabeça',
    brand: 'Salon Line',
    category: 'finalizador',
    budget: 'baratinho',
    price: '~ R$ 16 - 20',
    why: 'Fixação perfeita e leve para 2C/3A. Cachos definidos o dia todo sem resíduo esbranquiçado.'
  },
  {
    id: 'rec_seda_geleia',
    name: 'Geleia Modeladora Seda Boom Leve',
    brand: 'Seda',
    category: 'finalizador',
    budget: 'baratinho',
    price: '~ R$ 16 - 22',
    why: 'Modela sem endurecer o cacho, mantendo o movimento natural do fio fino.'
  },
  // Custo-Benefício
  {
    id: 'rec_jelly_lola',
    name: 'Meu Cacho Minha Vida Jelly Gel',
    brand: 'Lola Cosmetics',
    category: 'finalizador',
    budget: 'custo-beneficio',
    price: '~ R$ 28 - 35',
    why: 'Gel hidratante suave com quinoa. Define sem aspecto molhado ou pesado.'
  },
  {
    id: 'rec_haskell_encorpa_spray',
    name: 'Fluido Encorpa Cabelo em Spray',
    brand: 'Haskell',
    category: 'finalizador',
    budget: 'custo-beneficio',
    price: '~ R$ 36 - 44',
    why: 'Com ácido hialurônico e physalis: dá mais corpo e densidade aos fios finos sem pesar.'
  },
  // Profissional
  {
    id: 'rec_oil_light',
    name: 'Oil Reflections Luminous Light (Fio Fino)',
    brand: 'Wella Professionals',
    category: 'finalizador',
    budget: 'premium',
    price: '~ R$ 85 - 110',
    why: 'A versão "Light" foi criada especialmente para fios finos. Brilho luxuoso com toque seco.'
  },
  {
    id: 'rec_moroccanoil_light',
    name: 'Óleo de Tratamento Moroccanoil Light',
    brand: 'Moroccanoil',
    category: 'finalizador',
    budget: 'premium',
    price: '~ R$ 115 - 145',
    why: 'Fórmula refinada mais clara e fluida para cabelos finos que precisam de disciplina e brilho.'
  }
];

let currentBudgetFilter = 'all';
let currentCatFilter = 'all';

function renderRecommendedCatalogue(filterBudget = currentBudgetFilter, filterCat = currentCatFilter) {
  currentBudgetFilter = filterBudget;
  currentCatFilter = filterCat;
  
  const container = document.getElementById('recommendedCatalogue');
  if (!container) return;

  const filtered = RECOMMENDED_MARKET_PRODUCTS.filter(p => {
    const matchBudget = (currentBudgetFilter === 'all' || p.budget === currentBudgetFilter);
    const matchCat = (currentCatFilter === 'all' || p.category === currentCatFilter);
    return matchBudget && matchCat;
  });

  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-8 text-center text-xs text-slate-400">
        Nenhum produto encontrado com este filtro de preço e etapa.
      </div>
    `;
    return;
  }

  filtered.forEach(item => {
    const isAlreadyInShelf = appState.products.some(p => p.name.toLowerCase() === item.name.toLowerCase());

    let budgetTag = '';
    if (item.budget === 'baratinho') budgetTag = '<span class="text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-bold">🟢 Econômico</span>';
    if (item.budget === 'custo-beneficio') budgetTag = '<span class="text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded font-bold">🟡 Custo-Benefício</span>';
    if (item.budget === 'premium') budgetTag = '<span class="text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.2 rounded font-bold">🟣 Profissional</span>';

    const card = document.createElement('div');
    card.className = 'p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between space-y-2.5';
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between text-[10px] font-semibold text-slate-500 mb-1.5">
          <span class="uppercase tracking-wider px-1.5 py-0.5 rounded bg-white border border-slate-200">${item.category}</span>
          ${budgetTag}
        </div>
        <div class="flex items-baseline justify-between gap-1">
          <h4 class="font-bold text-xs text-slate-900 leading-snug">${item.name}</h4>
        </div>
        <div class="text-[11px] text-slate-500 font-medium flex items-center justify-between mt-0.5 mb-1.5">
          <span>${item.brand}</span>
          <span class="font-bold text-emerald-800 bg-emerald-100/60 px-1.5 py-0.2 rounded">${item.price}</span>
        </div>
        <p class="text-[11px] text-slate-600 leading-relaxed">${item.why}</p>

        <!-- Busca de Preço em Tempo Real -->
        <div class="pt-2 mt-2 border-t border-slate-200/60 flex items-center gap-1.5 flex-wrap">
          <a 
            href="https://www.google.com/search?tbm=shop&q=${encodeURIComponent(item.brand + ' ' + item.name)}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center gap-1 text-[10px] text-slate-600 hover:text-emerald-700 bg-white hover:bg-slate-100 border border-slate-200 px-2 py-0.8 rounded-md font-medium transition"
            title="Ver preços em tempo real no Google Shopping"
          >
            <i data-lucide="search" class="w-3 h-3 text-slate-400"></i>
            Google Shopping
          </a>
          <a 
            href="https://lista.mercadolivre.com.br/${encodeURIComponent(item.brand + ' ' + item.name)}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center gap-1 text-[10px] text-slate-600 hover:text-amber-700 bg-white hover:bg-slate-100 border border-slate-200 px-2 py-0.8 rounded-md font-medium transition"
            title="Ver no Mercado Livre"
          >
            <i data-lucide="external-link" class="w-3 h-3 text-amber-500"></i>
            Mercado Livre
          </a>
        </div>
      </div>

      <button 
        onclick="addFromCatalogue('${item.id}')"
        class="w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
          isAlreadyInShelf 
            ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
        }"
        ${isAlreadyInShelf ? 'disabled' : ''}
      >
        <i data-lucide="${isAlreadyInShelf ? 'check' : 'plus'}" class="w-3.5 h-3.5"></i>
        ${isAlreadyInShelf ? 'Já está no armário' : 'Adicionar ao Meu Armário'}
      </button>
    `;

    container.appendChild(card);
  });

  // Atualizar botões de filtro de preço
  document.querySelectorAll('.budget-filter-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.budget-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderRecommendedCatalogue(btn.dataset.budget, currentCatFilter);
    };
  });

  // Atualizar botões de filtro de categoria
  document.querySelectorAll('.cat-filter-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.cat-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderRecommendedCatalogue(currentBudgetFilter, btn.dataset.stepcat);
    };
  });

  lucide.createIcons();
}

window.addFromCatalogue = function(recId) {
  const item = RECOMMENDED_MARKET_PRODUCTS.find(p => p.id === recId);
  if (!item) return;

  const already = appState.products.some(p => p.name.toLowerCase() === item.name.toLowerCase());
  if (already) {
    showToast('Este produto já está cadastrado no seu armário!');
    return;
  }

  appState.products.push({
    id: 'prod_' + Date.now(),
    name: item.name,
    brand: item.brand,
    category: item.category,
    notes: item.why + ` (${item.price})`
  });

  saveState();
  renderProducts();
  renderRecommendedCatalogue();
  showToast(`"${item.name}" adicionado ao seu armário!`);
};

function initIngredientAnalyzer() {
  const btn = document.getElementById('btnAnalyzeIngredients');
  const btnExample = document.getElementById('btnLoadExampleIngredient');
  const input = document.getElementById('inputIngredientCheck');
  const resultBox = document.getElementById('ingredientAnalysisResult');

  if (!btn || !input || !resultBox) return;

  btnExample.addEventListener('click', () => {
    input.value = "Aqua, Cetearyl Alcohol, Aloe Barbadensis Leaf Extract, Panthenol, Glycerin, Vitis Vinifera (Grape) Seed Oil, Behentrimonium Chloride, Citric Acid, Parfum.";
    btn.click();
  });

  btn.addEventListener('click', () => {
    const text = input.value.trim().toLowerCase();
    if (!text) {
      alert('Cole ou digite os ingredientes do produto antes de analisar.');
      return;
    }

    // Dicionários de detecção
    const hydrationWords = ['aloe', 'babosa', 'panthenol', 'pantenol', 'glycerin', 'glicerina', 'hyaluronic', 'extrato', 'extract', 'amido', 'starch', 'musa paradisiaca', 'honey', 'mel'];
    const nutritionWords = ['argan', 'jojoba', 'vitis vinifera', 'semente de uva', 'avocado', 'abacate', 'butter', 'manteiga', 'shea', 'karite', 'murumuru', 'coconut', 'coco', 'ricino', 'castor', 'macadamia', 'oil', 'oleo', 'lipíd'];
    const reconstructionWords = ['keratin', 'queratina', 'amino acid', 'aminoácid', 'collagen', 'colágeno', 'hydrolyzed protein', 'proteína hidrolisada', 'wheat protein', 'cisteina', 'arginina', 'creatina'];
    
    // Alertas de peso / acúmulo para fio fino de baixa porosidade
    const heavyAlerts = [
      { key: 'paraffinum liquidum', name: 'Óleo Mineral / Parafina Líquida', desc: 'Forma filme impermeável pesado. Evite em fios finos de baixa porosidade!' },
      { key: 'petrolatum', name: 'Petrolato / Vaselina', desc: 'Altíssimo acúmulo de resíduos (buildup).' },
      { key: 'shea butter', name: 'Manteiga de Karité pura', desc: 'Pode murchar a curvatura 2C/3A se estiver entre os primeiros ingredientes.' },
      { key: 'hydrolyzed keratin', name: 'Queratina concentrada', desc: 'Cuidado em baixa porosidade: use com moderação (máx 1x no mês) para não enrijecer o fio.' }
    ];

    let hHits = hydrationWords.filter(w => text.includes(w));
    let nHits = nutritionWords.filter(w => text.includes(w));
    let rHits = reconstructionWords.filter(w => text.includes(w));
    let alertsFound = heavyAlerts.filter(a => text.includes(a.key));

    // Determinar classificação
    let classification = 'Produto Neutro / Condicionante';
    let badgeColor = 'bg-slate-100 text-slate-800 border-slate-300';

    if (hHits.length >= nHits.length && hHits.length >= rHits.length && hHits.length > 0) {
      classification = 'Etapa: Hidratação (H) 💧';
      badgeColor = 'bg-sky-50 text-sky-800 border-sky-300';
    } else if (nHits.length >= hHits.length && nHits.length >= rHits.length && nHits.length > 0) {
      classification = 'Etapa: Nutrição (N) ✨';
      badgeColor = 'bg-amber-50 text-amber-800 border-amber-300';
    } else if (rHits.length > 0) {
      classification = 'Etapa: Reconstrução (R) 🛡️';
      badgeColor = 'bg-purple-50 text-purple-800 border-purple-300';
    }

    // Compatibilidade com cabelo 2C/3A fino + baixa porosidade
    let fitText = 'Ótimo para o seu cabelo! Textura fluida e ingredientes amigos de baixa porosidade.';
    let fitColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';

    if (alertsFound.length > 0) {
      fitText = 'Atenção para o Fio Fino: Contém ingredientes com potencial de pesar ou criar acúmulo (buildup). Use com cautela ou diluído.';
      fitColor = 'text-amber-800 bg-amber-50 border-amber-200';
    }

    resultBox.className = 'p-4 rounded-xl border space-y-3 text-xs bg-white border-slate-200';
    resultBox.classList.remove('hidden');

    resultBox.innerHTML = `
      <div class="flex items-center justify-between pb-2 border-b border-slate-100">
        <span class="font-bold text-sm px-2.5 py-1 rounded-lg border ${badgeColor}">
          ${classification}
        </span>
        <span class="text-slate-400 text-[11px] font-medium">Análise Automática</span>
      </div>

      <div class="p-3 rounded-lg border ${fitColor} space-y-1">
        <strong class="block text-xs font-bold">Veredito para Cabelo Fino & Baixa Porosidade:</strong>
        <p class="text-xs leading-relaxed">${fitText}</p>
      </div>

      <div class="space-y-1 text-slate-600">
        <span class="font-bold text-slate-800 block">Ingredientes-chave detectados:</span>
        <ul class="list-disc list-inside space-y-0.5 text-[11px]">
          ${hHits.length ? `<li><strong>Agentes Hidratantes:</strong> ${hHits.join(', ')}</li>` : ''}
          ${nHits.length ? `<li><strong>Óleos / Lipídios:</strong> ${nHits.join(', ')}</li>` : ''}
          ${rHits.length ? `<li><strong>Proteínas / Aminoácidos:</strong> ${rHits.join(', ')}</li>` : ''}
          ${alertsFound.length ? `<li class="text-amber-700"><strong>Pontos de atenção:</strong> ${alertsFound.map(a => a.name).join(', ')} (${alertsFound.map(a => a.desc).join(' ')})</li>` : ''}
        </ul>
      </div>

      <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
        <span class="text-[10px] text-teal-800">Couro Cabeludo: Lembre-se de aplicar apenas do comprimento às pontas!</span>
      </div>
    `;

    lucide.createIcons();
  });
}

// ================= DECISOR DE PRÓXIMO PASSO • CICLOS DINÂMICOS =================
let selectedLastAction = 'Hidratação';
let selectedFeeling = 'normal';
let currentDynamicRecommendation = null;

function initDynamicCycle() {
  const lastActionButtons = document.querySelectorAll('.dyn-btn-last');
  const feelingButtons = document.querySelectorAll('.dyn-btn-feeling');

  lastActionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedLastAction = btn.dataset.value;
      lastActionButtons.forEach(b => b.classList.toggle('active', b.dataset.value === selectedLastAction));
      updateDynamicRecommendation();
    });
  });

  feelingButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedFeeling = btn.dataset.value;
      feelingButtons.forEach(b => b.classList.toggle('active', b.dataset.value === selectedFeeling));
      updateDynamicRecommendation();
    });
  });

  const btnApply = document.getElementById('btnApplyDynamicToDashboard');
  if (btnApply) {
    btnApply.addEventListener('click', () => {
      if (!currentDynamicRecommendation) return;
      appState.customNextStep = { ...currentDynamicRecommendation };
      saveState();
      const modal = document.getElementById('modalDynamicCycle');
      if (modal) modal.classList.add('hidden');
      renderDashboard();
      showToast(`Próximo passo atualizado: ${currentDynamicRecommendation.type} (${currentDynamicRecommendation.cycleName})`);
    });
  }

  const btnLogNow = document.getElementById('btnLogDynamicImmediately');
  if (btnLogNow) {
    btnLogNow.addEventListener('click', () => {
      if (!currentDynamicRecommendation) return;
      const rec = currentDynamicRecommendation;
      const modal = document.getElementById('modalDynamicCycle');
      if (modal) modal.classList.add('hidden');

      // Pré-preencher e abrir modal de registro
      openLogCareModalWithStep(
        rec.type,
        null,
        rec.products ? rec.products.join(' + ') : '',
        `Ciclo Dinâmico: ${rec.cycleName} • ${rec.reason}`,
        {
          isPrePoo: !!rec.suggestPrePoo,
          isAcidifier: !!rec.suggestAcidifier,
          isDermatitis: selectedFeeling === 'dermatite'
        }
      );
    });
  }
}

window.openDynamicCycleModal = function() {
  const modal = document.getElementById('modalDynamicCycle');
  if (!modal) return;

  const hintEl = document.getElementById('lastActionHint');
  if (appState.history && appState.history.length > 0) {
    const last = appState.history[0];
    const d = new Date(last.date + 'T' + (last.time || '12:00'));
    if (hintEl) {
      hintEl.textContent = `Último registro: ${last.type} (${d.toLocaleDateString('pt-BR')})`;
    }
    if (['Hidratação', 'Nutrição', 'Reconstrução', 'Acidificação'].includes(last.type)) {
      selectedLastAction = last.type;
    } else if (last.type === 'Lavagem Simples' && last.isDermatitis) {
      selectedLastAction = 'Anticaspa';
    } else {
      selectedLastAction = 'Hidratação';
    }

    if (last.feeling && ['normal', 'ressecado', 'pesado', 'rigido', 'poroso', 'dermatite'].includes(last.feeling)) {
      selectedFeeling = last.feeling;
    } else {
      selectedFeeling = 'normal';
    }
  } else {
    if (hintEl) hintEl.textContent = 'Nenhuma lavagem registrada ainda';
    selectedLastAction = 'Hidratação';
    selectedFeeling = 'normal';
  }

  // Sincronizar botões ativos
  document.querySelectorAll('.dyn-btn-last').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.value === selectedLastAction);
  });
  document.querySelectorAll('.dyn-btn-feeling').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.value === selectedFeeling);
  });

  updateDynamicRecommendation();
  modal.classList.remove('hidden');
  lucide.createIcons();
};

function updateDynamicRecommendation() {
  const rec = calculateDynamicNextStep(selectedLastAction, selectedFeeling);
  currentDynamicRecommendation = rec;

  const badgeType = document.getElementById('dynResultBadgeType');
  const cycleName = document.getElementById('dynResultCycleName');
  const title = document.getElementById('dynResultTitle');
  const reason = document.getElementById('dynResultReason');
  const productsContainer = document.getElementById('dynResultProducts');
  const scalpTip = document.getElementById('dynResultScalpTipText');

  if (badgeType) badgeType.textContent = rec.type;
  if (cycleName) cycleName.textContent = rec.cycleName;
  if (title) title.textContent = `Próximo Cuidado Recomendado: ${rec.title}`;
  if (reason) reason.textContent = rec.reason;
  if (scalpTip) scalpTip.textContent = rec.scalpTip;

  if (badgeType) {
    badgeType.className = 'px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ';
    if (rec.type === 'Hidratação') {
      badgeType.classList.add('bg-sky-100', 'text-sky-800', 'border-sky-300');
    } else if (rec.type === 'Nutrição') {
      badgeType.classList.add('bg-amber-100', 'text-amber-800', 'border-amber-300');
    } else if (rec.type === 'Reconstrução') {
      badgeType.classList.add('bg-purple-100', 'text-purple-800', 'border-purple-300');
    } else if (rec.type === 'Acidificação') {
      badgeType.classList.add('bg-rose-100', 'text-rose-800', 'border-rose-300');
    } else {
      badgeType.classList.add('bg-teal-100', 'text-teal-800', 'border-teal-300');
    }
  }

  if (productsContainer) {
    productsContainer.innerHTML = '';
    if (rec.products && rec.products.length > 0) {
      rec.products.forEach(p => {
        const span = document.createElement('span');
        span.className = 'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-medium text-[11px] shadow-2xs';
        span.innerHTML = `<i data-lucide="check" class="w-3 h-3 text-emerald-600"></i> ${p}`;
        productsContainer.appendChild(span);
      });
    }
  }

  lucide.createIcons();
}

function calculateDynamicNextStep(lastAction, feeling) {
  let daysSinceReconstruction = 999;
  const lastReconLog = appState.history.find(h => h.type === 'Reconstrução');
  if (lastReconLog) {
    const d = new Date(lastReconLog.date + 'T' + (lastReconLog.time || '12:00'));
    daysSinceReconstruction = Math.floor((new Date() - d) / (1000 * 60 * 60 * 24));
  }

  let daysSinceDermatitis = 999;
  if (appState.lastDermatitisDate) {
    const d = new Date(appState.lastDermatitisDate);
    daysSinceDermatitis = Math.floor((new Date() - d) / (1000 * 60 * 60 * 24));
  }

  const porosity = appState.porosity || 'alta';

  let result = {
    type: 'Hidratação',
    cycleName: 'Ciclo Hidra-Pureza',
    title: 'Hidratação Fluida Botânica',
    desc: 'Reposição hídrica pura com Wella Elements Renewing para manter a elasticidade sem pesar o fio fino.',
    reason: 'A hidratação é o pilar de sustentação do fio fino 2C/3A. Devolve água e maleabilidade sem sobrecarregar com óleos ou proteínas.',
    products: ['Máscara Elements Renewing (Wella)', 'Leave-in Lowell Bioplastia'],
    scalpTip: 'Lave o couro normalmente. Mantenha os produtos de tratamento a 3 dedos da raiz.',
    suggestPrePoo: true,
    suggestAcidifier: false
  };

  // CASO 1: Última ação foi RECONSTRUÇÃO
  if (lastAction === 'Reconstrução') {
    if (feeling === 'pesado') {
      result.type = 'Hidratação';
      result.cycleName = 'Ciclo Maleabilidade & Detox';
      result.title = 'Hidratação Leve com Acidificante';
      result.desc = 'Lave com shampoo equilibrado, aplique Wella Elements nas pontas e finalize com toque de K.Pro pH Balancer.';
      result.reason = 'Após reconstrução proteica, o fio fino nunca deve receber nova carga pesada. A hidratação restaura a água e o acidificante previne rigidez e sela cutículas.';
      result.products = ['Máscara Elements Renewing (Wella)', 'pH Balancer Acidificante (K.Pro)', 'Óleo Oil Reflections Light (Wella)'];
      result.suggestAcidifier = true;
    } else if (feeling === 'rigido' || feeling === 'ressecado') {
      result.type = 'Hidratação';
      result.cycleName = 'Ciclo Suavização & Emoliência Pós-Queratina';
      result.title = 'Hidratação Hídrica Profunda sem Silicones';
      result.desc = 'Wella Elements Renewing com pausa de 5 min na toalha de microfibra + Leave-in Lowell Bioplastia para desembaraço suave.';
      result.reason = 'A sensação de rigidez é um alerta clássico de excesso de queratina/proteína. O remédio imediato é hidratação botânica sem peso para amolecer a fibra.';
      result.products = ['Máscara Elements Renewing (Wella)', 'Leave-in Reconstrutor Bioplastia (Lowell)', 'Touca de Cetim à noite'];
    } else if (feeling === 'poroso') {
      result.type = 'Acidificação';
      result.cycleName = 'Ciclo Selagem Cuticular Pós-Proteína';
      result.title = 'Acidificação Cuticular + Hidratação Rápida';
      result.desc = 'K.Pro pH Balancer por 3 minutos logo após o shampoo, seguido de 2 minutos de Wella Elements para selar o fio.';
      result.reason = 'Mesmo após a proteína da reconstrução, as cutículas precisam de pH ácido (2.2-2.5) para fechar e travar o tratamento dentro do córtex.';
      result.products = ['pH Balancer Acidificante (K.Pro)', 'Máscara Elements Renewing (Wella)', 'Leave-in Lowell Bioplastia'];
      result.suggestAcidifier = true;
    } else {
      result.type = 'Hidratação';
      result.cycleName = 'Ciclo Hidra-Equilíbrio Pós-Reconstrução';
      result.title = 'Hidratação Fluida Restauradora';
      result.desc = 'Wella Elements Renewing para restabelecer a água perdida e equilibrar os aminoácidos depositados pela reconstrução.';
      result.reason = 'Regra de ouro do fio fino: toda reconstrução precisa ser seguida por 1 a 2 hidratações puras para manter o balanço e a elasticidade dos cachos.';
      result.products = ['Máscara Elements Renewing (Wella)', 'Leave-in Lowell Bioplastia'];
    }
  }

  // CASO 2: Última ação foi NUTRIÇÃO / UMECTAÇÃO
  else if (lastAction === 'Nutrição') {
    if (feeling === 'pesado') {
      result.type = 'Hidratação';
      result.cycleName = 'Ciclo Anti-Acúmulo (Anti-Build Up)';
      result.title = 'Hidratação Aquosa Botânica Pura (Sem Óleos)';
      result.desc = 'Lave com shampoo transparente ou Dercos na raiz, máscara Wella Elements apenas no comprimento, sem adicionar óleos pesados.';
      result.reason = 'O fio fino 2C/3A saturou com os óleos da nutrição anterior. Mais lipídios vão desmanchar a curvatura e deixar a raiz murcha. A hidratação sem silicone é ideal.';
      result.products = ['Máscara Elements Renewing (Wella)', 'Leave-in Lowell Bioplastia (dose mínima)'];
      result.suggestAcidifier = false;
    } else if (feeling === 'rigido') {
      result.type = 'Hidratação';
      result.cycleName = 'Ciclo Maleabilidade & Água';
      result.title = 'Hidratação Fluida com Toalha Morna';
      result.desc = 'Wella Elements Renewing com tempo de ação de 5 min para devolver a elasticidade e maciez.';
      result.reason = 'Falta de água (elasticidade) no córtex capilar. A hidratação vai restaurar o alongamento e o toque acetinado das ondas.';
      result.products = ['Máscara Elements Renewing (Wella)', 'Toalha de Microfibra com Botão'];
    } else if (feeling === 'poroso') {
      result.type = 'Acidificação';
      result.cycleName = 'Ciclo Retenção Lipídica & Selagem';
      result.title = 'Acidificação Cuticular K.Pro + Leave-in';
      result.desc = 'Aplique o Acidificante K.Pro (3 min) após enxaguar para estabilizar o pH da fibra e travar os lipídios da nutrição.';
      result.reason = 'Fio poroso perde os óleos da nutrição facilmente. O K.Pro pH Balancer sela as escamas do fio para reter a nutrição e dar brilho espelhado.';
      result.products = ['pH Balancer Acidificante (K.Pro)', 'Óleo Oil Reflections Light (Wella)'];
      result.suggestAcidifier = true;
    } else if (daysSinceReconstruction > 25 && (porosity === 'alta' || feeling === 'ressecado')) {
      result.type = 'Reconstrução';
      result.cycleName = 'Ciclo Reparação Estrutural Segura';
      result.title = 'Reconstrução Gold Quinoa & Proteína';
      result.desc = 'L\'Oréal Absolut Repair Gold Quinoa em quantidade controlada (1 espátula) + Acidificante K.Pro.';
      result.reason = 'Como o fio já recebeu nutrição e está há mais de 25 dias sem queratina, o córtex está preparado para receber a carga proteica sem perigo de rigidez.';
      result.products = ['Máscara Absolut Repair Gold Quinoa (L\'Oréal)', 'pH Balancer Acidificante (K.Pro)', 'Leave-in Lowell Bioplastia'];
    } else {
      result.type = 'Hidratação';
      result.cycleName = 'Ciclo Equilíbrio Hídrico-Lipídico';
      result.title = 'Hidratação Fluida com Finalização Leve';
      result.desc = 'Wella Elements Renewing para repor a água intercalando com os lipídios anteriores, finalizando com 1 gota de Oil Reflections Light.';
      result.reason = 'Alternar Nutrição com Hidratação é a harmonia perfeita para evitar o acúmulo de óleo e manter o cacho 2C/3A solto, leve e definido.';
      result.products = ['Máscara Elements Renewing (Wella)', 'Óleo Oil Reflections Light (Wella)'];
    }
  }

  // CASO 3: Última ação foi HIDRATAÇÃO
  else if (lastAction === 'Hidratação') {
    if (feeling === 'ressecado' || feeling === 'poroso') {
      result.type = 'Nutrição';
      result.cycleName = 'Ciclo Alinhamento Lipídico & Anti-Frizz';
      result.title = 'Nutrição Luminosa com Wella Reboost';
      result.desc = 'Wella Oil Reflections Reboost (dose de 1 moeda pequena) com enxágue 100% abundante + 2 gotas de Óleo Light nas pontas.';
      result.reason = 'Você já repôs água na última lavagem; se o fio continua áspero ou com frizz, falta a barreira lipídica (óleos nobres) para selar essa umidade dentro do fio.';
      result.products = ['Máscara Oil Reflections Reboost (Wella)', 'Óleo de Semente de Uva Farmax (Pré-poo)', 'Óleo Oil Reflections Light (Wella)'];
    } else if (feeling === 'pesado') {
      result.type = 'Acidificação';
      result.cycleName = 'Ciclo Reequilíbrio Cuticular';
      result.title = 'Lavagem Leve + Acidificante K.Pro pH Balancer';
      result.desc = 'Lave com shampoo equilibrado, aplique o K.Pro por 3 minutos e enxágue bem. Use pouquíssimo finalizador.';
      result.reason = 'Sensação de peso após hidratação pura indica cutícula frouxa ou resíduo de finalizador. Acidificar fecha as escamas sem adicionar gordura.';
      result.products = ['pH Balancer Acidificante (K.Pro)', 'Leave-in Lowell Bioplastia'];
      result.suggestAcidifier = true;
    } else if (feeling === 'rigido' || daysSinceReconstruction < 15) {
      result.type = 'Hidratação';
      result.cycleName = 'Ciclo Hidra-Plus Botânica';
      result.title = 'Segunda Sessão de Hidratação Fluida';
      result.desc = 'Repita a Wella Elements Renewing. Fios finos se beneficiam amplamente de 2 hidratações consecutivas para máxima maleabilidade.';
      result.reason = 'O fio ainda está absorvendo a água e precisa de reforço hídrico antes de qualquer nova carga de óleos ou proteínas.';
      result.products = ['Máscara Elements Renewing (Wella)', 'Leave-in Lowell Bioplastia'];
    } else if (daysSinceReconstruction > 25 && (porosity === 'alta' || porosity === 'media')) {
      result.type = 'Reconstrução';
      result.cycleName = 'Ciclo Força Estrutural Mensal';
      result.title = 'Reconstrução com Absolut Repair Gold Quinoa';
      result.desc = 'L\'Oréal Absolut Repair (pausa de 3 a 5 min) para devolver aminoácidos e renovar a estrutura capilar.';
      result.reason = 'Com hidratação recente em dia e intervalo seguro (>25 dias da última reconstrução), o cabelo tem o cenário perfeito para receber aminoácidos sem enrijecer.';
      result.products = ['Máscara Absolut Repair Gold Quinoa (L\'Oréal)', 'pH Balancer Acidificante (K.Pro)'];
    } else {
      result.type = 'Nutrição';
      result.cycleName = 'Ciclo Brilho Espelhado & Definição';
      result.title = 'Nutrição Suave com Wella Reboost';
      result.desc = 'Wella Oil Reflections Reboost nas pontas para dar brilho espelhado e definição duradoura aos cachos 2C/3A.';
      result.reason = 'Com a água em dia, a camada de óleo de camélia do Reboost vai selar o brilho e eliminar o frizz pós-secagem.';
      result.products = ['Máscara Oil Reflections Reboost (Wella)', 'Óleo Oil Reflections Light (Wella)'];
    }
  }

  // CASO 4: Última ação foi ACIDIFICAÇÃO
  else if (lastAction === 'Acidificação') {
    if (feeling === 'ressecado' || feeling === 'normal') {
      result.type = 'Hidratação';
      result.cycleName = 'Ciclo Hidratação com Cutículas Seladas';
      result.title = 'Hidratação Máxima com Wella Elements';
      result.desc = 'Aplique a Wella Elements Renewing nos fios selados pelo acidificante recente para reter a hidratação por muito mais tempo.';
      result.reason = 'Cutículas recém-acidificadas retêm a hidratação de maneira impecável. O cabelo absorve a água e não a perde com facilidade.';
      result.products = ['Máscara Elements Renewing (Wella)', 'Leave-in Lowell Bioplastia', 'Touca de Cetim à noite'];
    } else {
      result.type = 'Nutrição';
      result.cycleName = 'Ciclo Nutrição Brilho Espelhado';
      result.title = 'Nutrição Luminosa com Wella Reboost';
      result.desc = 'Wella Reboost para aproveitar as cutículas alinhadas e conferir brilho espelhado e toque sedoso.';
      result.reason = 'As cutículas alinhadas pelo K.Pro vão refletir a luz com máxima intensidade com os lipídios nobres do Reboost.';
      result.products = ['Máscara Oil Reflections Reboost (Wella)', 'Óleo Oil Reflections Light (Wella)'];
    }
  }

  // CASO 5: Última ação foi APENAS SHAMPOO ANTICASPA / LAVAGEM RÁPIDA
  else if (lastAction === 'Anticaspa') {
    result.type = 'Hidratação';
    result.cycleName = 'Ciclo Resgate Scalp & Comprimento';
    result.title = 'Hidratação Reparadora com Pré-Poo';
    result.desc = 'Aplique 6 gotas de Óleo Farmax nas pontas antes do banho. Lave a raiz com Dercos (3 min) e trate as pontas com Wella Elements Renewing.';
    result.reason = 'O shampoo de tratamento de dermatite (Dercos/Cetoconazol) é adstringente e limpa o couro, mas resseca as pontas finas. O pré-poo com óleo vegetal de semente de uva cria uma barreira lipídica salvadora.';
    result.products = ['Óleo de Semente de Uva Farmax (Pré-poo Obrigatório)', 'Dercos Anticaspa / Cetoconazol', 'Máscara Elements Renewing (Wella)', 'Leave-in Lowell Bioplastia'];
    result.suggestPrePoo = true;
  }

  // REGRA DE COURO CABELUDO (Dermatite)
  if (feeling === 'dermatite' || daysSinceDermatitis >= 4) {
    result.scalpTip = '🚨 Couro Cabeludo em Alerta: Use o shampoo anticaspa (Dercos/Cetoconazol) exclusivamente no couro com pausa de 3 minutos no timer. BLINDE as pontas com 5 gotas de Óleo de Uva Farmax 15 min antes da água!';
  } else {
    result.scalpTip = 'Couro Cabeludo Saudável: Mantenha o shampoo anticaspa no espaçamento habitual (2 a 3x na semana). Nunca durma com a raiz úmida.';
  }

  return result;
}

