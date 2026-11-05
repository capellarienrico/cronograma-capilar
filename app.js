// CapilarFlow - Aplicativo de Cronograma Capilar & Scalp Care
// Personalizado para Cabelo 2C/3A Fio Fino + Raiz Oleosa / Dermatite Seborreica

const STORAGE_KEY = 'capilarflow_app_data_v1';

// Cronogramas de acordo com a porosidade
const SCHEDULE_TEMPLATES = {
  alta: [
    { week: 1, step: 1, type: 'Hidratação', desc: 'Reposição hídrica com máscara fluida (babosa/pantenol)' },
    { week: 1, step: 2, type: 'Nutrição', desc: 'Reposição de óleos leves (argan/semente de uva) para combater o frizz' },
    { week: 1, step: 3, type: 'Hidratação', desc: 'Reforço de umidade e maleabilidade' },
    
    { week: 2, step: 1, type: 'Hidratação', desc: 'Hidratação profunda sem pesar no fio fino' },
    { week: 2, step: 2, type: 'Nutrição', desc: 'Nutrição leve para alinhar e devolver o brilho espelhado' },
    { week: 2, step: 3, type: 'Reconstrução', desc: 'Queratina suave/aminoácidos + Dica: use Acidificante antes!' },
    
    { week: 3, step: 1, type: 'Hidratação', desc: 'Desembaraço e emoliência' },
    { week: 3, step: 2, type: 'Nutrição', desc: 'Nutrição para manter a definição do cacho 2C/3A' },
    { week: 3, step: 3, type: 'Hidratação', desc: 'Selagem leve e maciez' },
    
    { week: 4, step: 1, type: 'Nutrição', desc: 'Nutrição suave' },
    { week: 4, step: 2, type: 'Hidratação', desc: 'Hidratação intensa' },
    { week: 4, step: 3, type: 'Reconstrução', desc: 'Fortalecimento da fibra + Acidificação para fechar cutículas' },
  ],
  media: [
    { week: 1, step: 1, type: 'Hidratação', desc: 'Reposição hídrica' },
    { week: 1, step: 2, type: 'Nutrição', desc: 'Nutrição com óleos vegetais leves' },
    { week: 1, step: 3, type: 'Hidratação', desc: 'Manutenção de maciez' },
    
    { week: 2, step: 1, type: 'Hidratação', desc: 'Hidratação com foco em desembaraço' },
    { week: 2, step: 2, type: 'Hidratação', desc: 'Hidratação leve' },
    { week: 2, step: 3, type: 'Nutrição', desc: 'Nutrição equilibrada' },
    
    { week: 3, step: 1, type: 'Hidratação', desc: 'Hidratação suave' },
    { week: 3, step: 2, type: 'Nutrição', desc: 'Nutrição' },
    { week: 3, step: 3, type: 'Hidratação', desc: 'Hidratação' },
    
    { week: 4, step: 1, type: 'Hidratação', desc: 'Hidratação' },
    { week: 4, step: 2, type: 'Nutrição', desc: 'Nutrição leve' },
    { week: 4, step: 3, type: 'Reconstrução', desc: 'Reconstrução mensal preventiva' },
  ],
  baixa: [
    { week: 1, step: 1, type: 'Hidratação', desc: 'Hidratação com enxágue em água morna' },
    { week: 1, step: 2, type: 'Hidratação', desc: 'Hidratação com máscara bem líquida/gel' },
    { week: 1, step: 3, type: 'Nutrição', desc: 'Nutrição com óleo de jojoba/semente de uva' },
    
    { week: 2, step: 1, type: 'Hidratação', desc: 'Hidratação leve' },
    { week: 2, step: 2, type: 'Hidratação', desc: 'Hidratação' },
    { week: 2, step: 3, type: 'Hidratação', desc: 'Hidratação' },
    
    { week: 3, step: 1, type: 'Hidratação', desc: 'Hidratação' },
    { week: 3, step: 2, type: 'Nutrição', desc: 'Nutrição bem dosada' },
    { week: 3, step: 3, type: 'Hidratação', desc: 'Hidratação' },
    
    { week: 4, step: 1, type: 'Hidratação', desc: 'Hidratação' },
    { week: 4, step: 2, type: 'Hidratação', desc: 'Hidratação' },
    { week: 4, step: 3, type: 'Reconstrução', desc: 'Reconstrução ultra leve (aminoácidos)' },
  ]
};

// Produtos sugeridos inicialmente
const DEFAULT_PRODUCTS = [
  { id: 'p1', name: 'Dercos Anticaspa DS', brand: 'Vichy', category: 'dermatite', notes: 'Aplicar no couro cabeludo, pausar 3 a 5 min. Usar 2-3x/semana.' },
  { id: 'p2', name: 'Shampoo Cetoconazol 2%', brand: 'Genérico / Medley', category: 'dermatite', notes: 'Tratamento antifúngico para crises de dermatite.' },
  { id: 'p3', name: 'Yamasterol Babosa & D-Pantenol', brand: 'Yamá', category: 'pre-poo', notes: 'Perfeito para Pré-Poo! Passar nas pontas antes de lavar para proteger do shampoo anticaspa.' },
  { id: 'p4', name: 'Be(M)dita Ghee Banana & Aloe Vera', brand: 'Lola Cosmetics', category: 'hidratação', notes: 'Fórmula leve em gel/emulsão, não pesa no 2C/3A fino.' },
  { id: 'p5', name: 'Máscara Líquida Booster Danos Vorazes', brand: 'Lola Cosmetics', category: 'nutrição', notes: 'Líquida que vira creme: brilho espelhado sem deixar o fio murcho.' },
  { id: 'p6', name: 'Acidificante Densidade pH 3.0', brand: 'Lola Cosmetics', category: 'acidificante', notes: 'Sela as cutículas, acaba com a aspereza e facilita o desembaraço instantaneamente.' },
  { id: 'p7', name: 'Máscara Tarja Preta Queratina Vegetal', brand: 'Lola Cosmetics', category: 'reconstrução', notes: 'Reposição de aminoácidos para recuperar a força do fio.' },
  { id: 'p8', name: 'Óleo Oil Reflections Light', brand: 'Wella Professionals', category: 'finalizador', notes: 'Óleo levíssimo específico para cabelos finos. Dá brilho sem oleosidade.' }
];

// Estado da aplicação
let appState = {
  porosity: 'alta', // padrão indicado pelos sintomas de toque áspero e embaraço
  currentStepIndex: 0, // 0 a 11
  history: [],
  products: [...DEFAULT_PRODUCTS],
  lastDermatitisDate: null,
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
    }
  } catch (err) {
    console.error('Erro ao ler localStorage', err);
  }
}

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

  badgeNextType.textContent = currentStep.type;
  badgeScheduleDay.textContent = `Semana ${currentStep.week} • Etapa ${currentStep.step}`;
  nextStepTitle.textContent = `Próximo Cuidado: ${currentStep.type}`;
  nextStepDesc.textContent = currentStep.desc;

  // Cores do badge
  badgeNextType.className = 'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ';
  if (currentStep.type === 'Hidratação') {
    badgeNextType.classList.add('bg-sky-500/20', 'text-sky-300', 'border-sky-500/40');
  } else if (currentStep.type === 'Nutrição') {
    badgeNextType.classList.add('bg-amber-500/20', 'text-amber-300', 'border-amber-500/40');
  } else if (currentStep.type === 'Reconstrução') {
    badgeNextType.classList.add('bg-purple-500/20', 'text-purple-300', 'border-purple-500/40');
  } else {
    badgeNextType.classList.add('bg-slate-700', 'text-slate-200', 'border-slate-600');
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

  // Fechar modais ao clicar no X ou fora
  document.querySelectorAll('.btnCloseModal').forEach(b => {
    b.addEventListener('click', () => modalLog.classList.add('hidden'));
  });

  document.querySelectorAll('.btnCloseProductModal').forEach(b => {
    b.addEventListener('click', () => modalProd.classList.add('hidden'));
  });

  modalLog.addEventListener('click', (e) => {
    if (e.target === modalLog) modalLog.classList.add('hidden');
  });

  modalProd.addEventListener('click', (e) => {
    if (e.target === modalProd) modalProd.classList.add('hidden');
  });

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
      saveState();
      renderDashboard();
      renderHistory();
      showToast('Histórico reiniciado.');
    }
  });
}

function openDefaultLogModal() {
  const currentSchedule = SCHEDULE_TEMPLATES[appState.porosity] || SCHEDULE_TEMPLATES.alta;
  const currentStep = currentSchedule[appState.currentStepIndex] || currentSchedule[0];
  openLogCareModalWithStep(currentStep.type, appState.currentStepIndex);
}

window.openLogCareModalWithStep = function(type, stepIndex) {
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

  modal.classList.remove('hidden');
  lucide.createIcons();
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
  {
    id: 'rec_dercos',
    name: 'Dercos Anticaspa DS',
    brand: 'Vichy',
    category: 'dermatite',
    price: '~ R$ 90 - 110',
    why: 'Padrão ouro em dermatite seborreica. Controla o fungo Malassezia sem causar tanta ardência.'
  },
  {
    id: 'rec_yamasterol',
    name: 'Yamasterol Amarelo (Babosa & D-Pantenol)',
    brand: 'Yamá',
    category: 'pre-poo',
    price: '~ R$ 8 - 14',
    why: 'Essencial como PRÉ-POO! Fórmula aquosa, sem silicones pesados, protege o comprimento fino sem pesar.'
  },
  {
    id: 'rec_ghee_banana',
    name: 'Be(M)dita Ghee Banana & Aloe Vera',
    brand: 'Lola Cosmetics',
    category: 'hidratação',
    price: '~ R$ 35 - 45',
    why: 'Textura em emulsão cremosa-aquosa. Hidrata profundamente sem plastificar o fio de baixa porosidade.'
  },
  {
    id: 'rec_skala_babosa',
    name: 'Skala Expert Babosa',
    brand: 'Skala Cosméticos',
    category: 'hidratação',
    price: '~ R$ 10 - 14',
    why: 'Opção super econômica, super fluida e leve. Excelente para hidratações rápidas durante a semana.'
  },
  {
    id: 'rec_danos_booster',
    name: 'Booster / Máscara Líquida Danos Vorazes',
    brand: 'Lola Cosmetics',
    category: 'nutrição',
    price: '~ R$ 38 - 48',
    why: 'Máscara líquida que age em segundos com Cannabinoid Active System (CBA). Dá brilho imediato sem murchar o fio fino.'
  },
  {
    id: 'rec_maria_natureza',
    name: 'Máscara Maria Natureza Óleos Milenares',
    brand: 'Salon Line',
    category: 'nutrição',
    price: '~ R$ 22 - 30',
    why: 'Nutrição com óleo de argan e semente de uva. Liberada e não pesa se usada em quantidade moderada.'
  },
  {
    id: 'rec_acidificante',
    name: 'Acidificante Densidade pH 3.0',
    brand: 'Lola Cosmetics',
    category: 'acidificante',
    price: '~ R$ 36 - 45',
    why: 'O segredo para o brilho e desembaraço fácil. Equilibra o pH das cutículas e combate a aspereza instantaneamente.'
  },
  {
    id: 'rec_tarja_preta',
    name: 'Máscara Restauradora Tarja Preta',
    brand: 'Lola Cosmetics',
    category: 'reconstrução',
    price: '~ R$ 35 - 45',
    why: 'Queratina vegetal e aminoácidos em dosagem segura. Ideal para a reconstrução mensal de baixa porosidade.'
  },
  {
    id: 'rec_oil_light',
    name: 'Oil Reflections Luminous Light',
    brand: 'Wella Professionals',
    category: 'finalizador',
    price: '~ R$ 75 - 110',
    why: 'Óleo ultraleve com óleo de camélia. Não pesa no cacho 2C/3A e confere brilho espelhado.'
  }
];

function renderRecommendedCatalogue() {
  const container = document.getElementById('recommendedCatalogue');
  if (!container) return;

  container.innerHTML = '';
  RECOMMENDED_MARKET_PRODUCTS.forEach(item => {
    const isAlreadyInShelf = appState.products.some(p => p.name.toLowerCase() === item.name.toLowerCase());

    const card = document.createElement('div');
    card.className = 'p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between space-y-2.5';
    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between text-[10px] font-semibold text-slate-500 mb-1">
          <span class="uppercase tracking-wider px-1.5 py-0.5 rounded bg-white border border-slate-200">${item.category}</span>
          <span class="text-emerald-700 font-bold">${item.price}</span>
        </div>
        <h4 class="font-bold text-xs text-slate-900 leading-snug">${item.name}</h4>
        <span class="text-[11px] text-slate-500 block mb-1.5">${item.brand}</span>
        <p class="text-[11px] text-slate-600 leading-relaxed">${item.why}</p>
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

