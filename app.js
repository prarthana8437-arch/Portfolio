/**
 * PortfoliX - Minimalist Editorial Portfolio Logic
 * Alex Rivera | AI & Machine Learning Engineer
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLucide();
  initMobileMenu();
  initProjectFiltering();
  initDemoLab();
  initContactActions();
});

// Initialize Lucide icons
function initLucide() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/* ==========================================================================
   1. Theme Management (Light / Dark Mode)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Retrieve stored theme or default to system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = html.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      initLucide();
    });
  }
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const links = document.querySelectorAll('.mobile-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

/* ==========================================================================
   3. Project Filtering (All, LLMs, CV, MLOps)
   ========================================================================== */
function initProjectFiltering() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab styles
      tabs.forEach(t => {
        t.classList.remove('active-filter', 'font-medium');
        t.classList.add('text-editorial-600', 'dark:text-editorial-400');
      });

      tab.classList.add('active-filter', 'font-medium');
      tab.classList.remove('text-editorial-600', 'dark:text-editorial-400');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. Interactive ML Demo Lab (Client-side Tokenizer & Sentiment Engine)
   ========================================================================== */
function initDemoLab() {
  const input = document.getElementById('demoInput');
  const presetButtons = document.querySelectorAll('.preset-btn');

  if (!input) return;

  const runAnalysis = () => {
    const text = input.value.trim();
    const tokenContainer = document.getElementById('tokenChunks');
    const metricTokens = document.getElementById('metricTokens');
    const metricChars = document.getElementById('metricChars');
    const metricVocab = document.getElementById('metricVocab');
    const metricLatency = document.getElementById('metricLatency');
    const sentimentLabel = document.getElementById('sentimentLabel');
    const sentimentBar = document.getElementById('sentimentBar');
    const vectorHash = document.getElementById('vectorHash');

    if (!text) {
      if (tokenContainer) tokenContainer.innerHTML = '<span class="text-editorial-400">Awaiting prompt input...</span>';
      return;
    }

    const startTime = performance.now();

    // 1. Token chunk simulation (BPE style splitting based on words/punctuation)
    const words = text.match(/[\w']+|[.,!?;]/g) || [text];
    const simulatedTokens = [];

    words.forEach(word => {
      if (word.length > 6) {
        simulatedTokens.push(word.slice(0, 4) + '·');
        simulatedTokens.push('·' + word.slice(4));
      } else {
        simulatedTokens.push(word);
      }
    });

    if (tokenContainer) {
      tokenContainer.innerHTML = simulatedTokens
        .map(t => `<span class="token-pill">${escapeHTML(t)}</span>`)
        .join('');
    }

    // 2. Metrics calculation
    const tokenCount = simulatedTokens.length;
    const charCount = text.length;
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
    const lexicalRichness = (uniqueWords / (words.length || 1)).toFixed(2);

    if (metricTokens) metricTokens.textContent = tokenCount;
    if (metricChars) metricChars.textContent = charCount;
    if (metricVocab) metricVocab.textContent = lexicalRichness;

    // 3. Sentiment & Polarity Lexical Heuristic
    const positiveWords = ['exceptional', 'precision', 'speedup', 'high', 'reduced', 'zero', 'stable', 'normal', 'improved', 'optimal', 'boosted', 'clean', 'reliable', 'success', 'best', 'accurate'];
    const negativeWords = ['bottleneck', 'error', 'severe', 'drift', 'hallucination', 'hallucinations', 'latency', 'out-of-memory', 'failure', 'drop', 'unstable', 'crash', 'loss', 'poor'];

    let score = 0;
    const lowerWords = words.map(w => w.toLowerCase());
    lowerWords.forEach(w => {
      if (positiveWords.includes(w)) score += 1.5;
      if (negativeWords.includes(w)) score -= 1.8;
    });

    // Normalize score to percentage 0 - 100
    let normalized = Math.min(Math.max(50 + (score * 12), 10), 98);
    let label = 'Neutral (0.00)';
    let colorClass = 'text-editorial-600 dark:text-editorial-300';
    let barColor = 'bg-editorial-400';

    if (score > 0.5) {
      const conf = (0.5 + Math.min(score * 0.12, 0.48)).toFixed(2);
      label = `Positive (+${conf})`;
      colorClass = 'text-emerald-600 dark:text-emerald-400';
      barColor = 'bg-emerald-500';
    } else if (score < -0.5) {
      const conf = (-0.5 - Math.min(Math.abs(score) * 0.12, 0.48)).toFixed(2);
      label = `Alert / Negative (${conf})`;
      colorClass = 'text-rose-600 dark:text-rose-400';
      barColor = 'bg-rose-500';
    }

    if (sentimentLabel) {
      sentimentLabel.className = `font-bold ${colorClass}`;
      sentimentLabel.textContent = label;
    }
    if (sentimentBar) {
      sentimentBar.className = `h-full rounded-full transition-all duration-300 ${barColor}`;
      sentimentBar.style.width = `${normalized}%`;
    }

    // 4. Simulated vector hash
    if (vectorHash) {
      const pseudoRand = (seed) => {
        let x = Math.sin(seed++) * 10000;
        return (x - Math.floor(x) * 2 - 1).toFixed(3);
      };
      const v1 = pseudoRand(text.length * 3);
      const v2 = pseudoRand(text.length * 7);
      const v3 = pseudoRand(text.length * 11);
      const v4 = pseudoRand(text.length * 19);
      vectorHash.textContent = `[${v1}, ${v2}, ${v3}, ${v4}, ... +124 dims]`;
    }

    const endTime = performance.now();
    const latency = Math.max(0.4, (endTime - startTime)).toFixed(1);
    if (metricLatency) metricLatency.textContent = `${latency} ms`;
  };

  input.addEventListener('input', runAnalysis);

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sampleText = btn.getAttribute('data-text');
      if (sampleText) {
        input.value = sampleText;
        runAnalysis();
      }
    });
  });

  // Run initial pass on page load
  runAnalysis();
}

/* ==========================================================================
   5. Project Architecture Modal Data & Controls
   ========================================================================== */
const projectData = {
  'project-rag': {
    title: 'ContextEngine: Self-Reflective Hybrid RAG Architecture',
    subtitle: 'Enterprise Semantic Retrieval, RRF Fusion & Hallucination Mitigation',
    tag: 'Production Architecture',
    metrics: [
      { label: 'Documents Indexed', value: '4.2 Million' },
      { label: 'P95 Latency', value: '48 ms' },
      { label: 'Faithfulness Score', value: '0.96 (RAGAS)' }
    ],
    summary: 'A production-grade Retrieval-Augmented Generation system designed for complex, heterogeneous enterprise knowledge bases. Unlike standard dense-only retrieval which suffers from keyword blindspots, ContextEngine employs Reciprocal Rank Fusion (RRF) between sparse BM25 and high-dimensional Qdrant dense vector embeddings.',
    architecture: [
      'Query Expansion: Fine-tuned lightweight Llama-3-8B rewrites colloquial prompts into dense search hypotheses (HyDE) and Boolean keyword filters.',
      'Hybrid Retrieval: Dual-stage parallel query execution across BM25 and cosine dense index.',
      'Cross-Encoder Re-ranking: Top-50 candidates are re-scored using BAAI/bge-reranker-large.',
      'Claim Verification Guard: Output text is deterministically matched against ground-truth citation chunks before streaming to the client.'
    ],
    tech: ['PyTorch', 'Qdrant', 'LangChain', 'FastAPI', 'Llama-3', 'Docker', 'RAGAS']
  },
  'project-cv': {
    title: 'VisionGuard: Millisecond Semiconductor Defect Classifier',
    subtitle: 'NVIDIA Jetson Edge Inference with Sub-5ms TensorRT Pipelines',
    tag: 'Industrial Computer Vision',
    metrics: [
      { label: 'Throughput', value: '120 FPS' },
      { label: 'Hardware', value: 'NVIDIA Jetson AGX Orin' },
      { label: 'Precision', value: '99.2%' }
    ],
    summary: 'Deployed directly on manufacturing assembly lines to detect microscopic cracks and misalignment in silicon wafer production. The system operates entirely air-gapped on edge hardware with strict zero-frame-drop SLA constraints.',
    architecture: [
      'Model Architecture: Hybrid YOLOv8-Detection coupled with SegFormer for pixel-level semantic crack segmentation.',
      'Optimization: INT8 PTQ (Post-Training Quantization) calibration using representative wafer dataset, yielding 3.2x latency compression with <0.3% mAP loss.',
      'Zero-Copy Pipeline: Utilizes NVIDIA DeepStream and CUDA unified memory to bypass host-device memory copying bottlenecks.'
    ],
    tech: ['TensorRT', 'CUDA', 'OpenCV', 'PyTorch', 'ONNX Runtime', 'C++', 'NVIDIA DeepStream']
  },
  'project-mlops': {
    title: 'DriftWatch: Automated Continuous Training & Kolmogorov Monitor',
    subtitle: 'Statistical Distribution Drift & Automated Retraining Engine',
    tag: 'MLOps Infrastructure',
    metrics: [
      { label: 'Streams Tracked', value: '140+ Features' },
      { label: 'False Alarms', value: '-78%' },
      { label: 'Retrain Automation', value: 'Fully Automated' }
    ],
    summary: 'High-frequency streaming telemetry monitor designed to detect concept and covariate shift before models degrade in production. Computes two-sample Kolmogorov-Smirnov and Wasserstein distance tests over tumbling 6-hour windows.',
    architecture: [
      'Stream Ingestion: Apache Kafka processes real-time model input/output tensors.',
      'Statistical Testing: Distributed Ray workers compute drift matrices vs. baseline training distributions.',
      'Automated Retrain Trigger: When Wasserstein distance exceeds threshold for 3 consecutive windows, an automated Kubeflow pipeline trains and validates a candidate challenger model.',
      'Shadow Routing: Challenger model receives 10% shadow traffic to confirm calibration prior to blue-green promotion.'
    ],
    tech: ['Ray Train', 'MLflow', 'Evidently AI', 'Prometheus', 'Grafana', 'Kubernetes', 'Kafka']
  },
  'project-ts': {
    title: 'ChronoFlux: Multi-Horizon Probabilistic Energy Forecaster',
    subtitle: 'Deep State-Space & Temporal Fusion Transformers for Grid Load',
    tag: 'Time-Series Research',
    metrics: [
      { label: 'Horizon', value: '72 Hours' },
      { label: 'MAPE', value: '3.41%' },
      { label: 'Confidence Bands', value: 'P10 / P50 / P90' }
    ],
    summary: 'Probabilistic time-series forecasting model implemented for municipal power authorities to balance renewable solar/wind intermittency against conventional generation reserves.',
    architecture: [
      'Variable Selection Network: Automatically learns non-linear feature importances across weather satellite arrays and seasonal demand cycles.',
      'Self-Attention Mechanism: Captures long-range weekly dependencies and sudden extreme weather demand spikes.',
      'Quantile Loss Optimization: Directly minimizes pinball loss to provide rigorous P10, P50, and P90 risk bounds.'
    ],
    tech: ['PyTorch Lightning', 'Temporal Fusion Transformer', 'Polars', 'DuckDB', 'Optuna', 'Docker']
  }
};

window.openModal = function(projectId) {
  const data = projectData[projectId];
  const modal = document.getElementById('projectModal');
  const container = document.getElementById('modalContent');

  if (!data || !modal || !container) return;

  container.innerHTML = `
    <div class="border-b border-editorial-200 dark:border-editorial-800 pb-4">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-editorial-100 dark:bg-editorial-800 text-editorial-700 dark:text-editorial-300">${escapeHTML(data.tag)}</span>
      </div>
      <h2 class="text-2xl font-serif text-editorial-950 dark:text-white">${escapeHTML(data.title)}</h2>
      <p class="text-xs font-mono text-editorial-500 dark:text-editorial-400 mt-1">${escapeHTML(data.subtitle)}</p>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-3 gap-3 py-2">
      ${data.metrics.map(m => `
        <div class="p-3 rounded-lg bg-editorial-50 dark:bg-editorial-900/60 border border-editorial-200 dark:border-editorial-800 text-center">
          <span class="block text-[11px] font-mono text-editorial-500">${escapeHTML(m.label)}</span>
          <span class="text-sm font-mono font-bold text-editorial-950 dark:text-white mt-0.5 block">${escapeHTML(m.value)}</span>
        </div>
      `).join('')}
    </div>

    <!-- Summary -->
    <div class="space-y-2">
      <h4 class="text-xs font-mono uppercase tracking-wider text-editorial-500">Problem & Approach</h4>
      <p class="text-xs sm:text-sm text-editorial-700 dark:text-editorial-300 leading-relaxed">${escapeHTML(data.summary)}</p>
    </div>

    <!-- Architecture Highlights -->
    <div class="space-y-2">
      <h4 class="text-xs font-mono uppercase tracking-wider text-editorial-500">Key Engineering Decisions</h4>
      <ul class="space-y-1.5 text-xs text-editorial-600 dark:text-editorial-300">
        ${data.architecture.map(a => `
          <li class="flex items-start gap-2">
            <span class="text-emerald-500 font-bold">›</span>
            <span>${escapeHTML(a)}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <!-- Tech Stack -->
    <div class="pt-2">
      <h4 class="text-xs font-mono uppercase tracking-wider text-editorial-500 mb-2">Technologies Used</h4>
      <div class="flex flex-wrap gap-1.5">
        ${data.tech.map(t => `<span class="tech-tag">${escapeHTML(t)}</span>`).join('')}
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  initLucide();
};

window.closeModal = function() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
};

// Close modal on Escape key or outside click
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

const modalEl = document.getElementById('projectModal');
if (modalEl) {
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) closeModal();
  });
}

/* ==========================================================================
   6. Contact Actions & Toast Notifications
   ========================================================================== */
function initContactActions() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText');
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText.textContent.trim()).then(() => {
        showToast('Email address copied to clipboard');
      }).catch(() => {
        showToast('Direct email: ' + emailText.textContent.trim());
      });
    });
  }

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;

      formFeedback.className = 'mt-4 p-3 rounded-lg text-xs font-mono border border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300';
      formFeedback.innerHTML = `✓ Thank you, ${escapeHTML(name)}! Your message has been prepared. Alex will respond to <strong>${escapeHTML(email)}</strong> shortly.`;
      formFeedback.classList.remove('hidden');

      contactForm.reset();
      showToast('Message sent successfully!');
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMessage');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3500);
}

// Utility: Escape HTML
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
