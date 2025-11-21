import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Code, Play, Cpu, AlertTriangle, CheckCircle, XCircle, Database, Activity, Lock, ChevronRight, Save, Radio } from 'lucide-react';

// --- DATA & LEVELS CONFIGURATION ---

const LEVELS = [
  {
    id: 1,
    title: "CALIBRACIÓN DE SENSORES",
    module: "NumPy",
    difficulty: "Fácil",
    story: "Ingeniero, CORTEX ha desalineado los sensores de tensión del casco. Las lecturas están llegando en bruto (milivoltios) y necesitamos normalizarlas para el sistema de seguridad central antes de que la descompresión sea inminente.",
    problem: `
# CONTEXTO:
# Tienes una lista de lecturas de tensión en mV: [1200, 1500, 800, 950, 2000, 1100].
# El sistema espera un array de NumPy normalizado entre 0 y 1.
# Fórmula de normalización: (x - min) / (max - min)

import numpy as np

raw_readings = [1200, 1500, 800, 950, 2000, 1100]

def calibrate_sensors(readings):
    # 1. Convierte la lista a un array numpy float
    # 2. Calcula el valor mínimo y máximo del array
    # 3. Aplica la normalización min-max
    # 4. Retorna el array normalizado
    
    # ESCRIBE TU CÓDIGO AQUI:
    pass
    `,
    validationCriteria: [
      { pattern: /np\.array|numpy\.array/, message: "Convertir lista a NumPy array" },
      { pattern: /\.min\(\)|np\.min/, message: "Calcular valor mínimo (.min)" },
      { pattern: /\.max\(\)|np\.max/, message: "Calcular valor máximo (.max)" },
      { pattern: /\/|\-/, message: "Aplicar fórmula matemática (resta y división)" }
    ],
    successMsg: "SENSORES RECALIBRADOS. INTEGRIDAD DEL CASCO AL 100%.",
    testOutput: "test_calibration... OK\ntest_dtype_float... OK\ntest_range_0_1... OK"
  },
  {
    id: 2,
    title: "VECTOR DE EVASIÓN",
    module: "NumPy (Álgebra Lineal)",
    difficulty: "Medio",
    story: "La IA está lanzando escombros a la nave. El radar nos da la posición actual y la velocidad del objeto. Necesitamos calcular el producto punto para determinar el ángulo de impacto y la norma del vector para la distancia.",
    problem: `
# CONTEXTO:
# Posición de la nave (P): [10, 20, 50]
# Vector de velocidad del debris (V): [-5, -2, -10]
# Necesitamos calcular el coseno del ángulo entre los vectores.
# Fórmula: cos_theta = (P . V) / (||P|| * ||V||)

import numpy as np

P = np.array([10, 20, 50])
V = np.array([-5, -2, -10])

def calculate_impact_risk(P, V):
    # 1. Calcula el producto punto (dot product) entre P y V
    # 2. Calcula la norma (magnitud) de P (norm_p)
    # 3. Calcula la norma (magnitud) de V (norm_v)
    # 4. Calcula cos_theta
    # 5. Retorna cos_theta

    # ESCRIBE TU CÓDIGO AQUI:
    pass
    `,
    validationCriteria: [
      { pattern: /np\.dot|@/, message: "Usar producto punto (np.dot o @)" },
      { pattern: /np\.linalg\.norm/, message: "Usar np.linalg.norm para magnitud" },
      { pattern: /\//, message: "División para encontrar el coseno" }
    ],
    successMsg: "TRAYECTORIA DE COLISIÓN CALCULADA. PROPULSORES AJUSTADOS.",
    testOutput: "test_dot_product... OK\ntest_vector_norm... OK\ntest_cosine_value... OK"
  },
  {
    id: 3,
    title: "PURGA DE LOGS (SOPORTE VITAL)",
    module: "Pandas (Limpieza)",
    difficulty: "Medio",
    story: "CORTEX ha inundado los logs del sistema de oxígeno con datos corruptos ('NaN') y lecturas falsas negativas. Si no filtramos los datos reales, el sistema apagará el aire por seguridad.",
    problem: `
# CONTEXTO:
# Tienes un DataFrame 'df_logs' con columnas: ['timestamp', 'oxygen_level', 'sector', 'status']
# Algunos 'oxygen_level' son NaN. Algunos 'status' son 'ERROR'.
# El rango seguro de oxigeno es > 18.0.

import pandas as pd

# df_logs ya está cargado en memoria

def clean_life_support_data(df_logs):
    # 1. Elimina las filas donde 'oxygen_level' sea NaN (dropna)
    # 2. Filtra el dataframe para mantener solo filas donde 'status' NO sea 'ERROR'
    # 3. Crea una nueva columna 'is_safe' que sea True si 'oxygen_level' > 18.0
    # 4. Retorna el dataframe limpio

    # ESCRIBE TU CÓDIGO AQUI:
    pass
    `,
    validationCriteria: [
      { pattern: /\.dropna/, message: "Usar dropna() para eliminar nulos" },
      { pattern: /!=|~/, message: "Filtrar excluyendo status 'ERROR'" },
      { pattern: />\s*18/, message: "Lógica de nivel seguro (> 18.0)" },
      { pattern: /\[['"]is_safe['"]\]/, message: "Crear columna 'is_safe'" }
    ],
    successMsg: "FILTROS APLICADOS. SUMINISTRO DE OXÍGENO RESTAURADO.",
    testOutput: "test_no_nans... OK\ntest_status_filter... OK\ntest_safety_column... OK"
  },
  {
    id: 4,
    title: "ANÁLISIS DEL REACTOR",
    module: "Pandas (Agregación)",
    difficulty: "Difícil",
    story: "El reactor de fusión está inestable. Necesitamos saber qué módulo está consumiendo más energía en promedio para desconectarlo manualmente. CORTEX oculta los picos en los promedios generales.",
    problem: `
# CONTEXTO:
# DataFrame 'df_energy' columnas: ['module_id', 'timestamp', 'consumption_mw']
# Necesitamos el consumo promedio y máximo por módulo.

import pandas as pd

def analyze_reactor_load(df_energy):
    # 1. Agrupa los datos por 'module_id'
    # 2. Calcula la media (mean) y el máximo (max) de 'consumption_mw' para cada grupo.
    #    (Tip: usa la función .agg)
    # 3. Ordena el resultado por el consumo máximo de forma descendente
    # 4. Retorna el DataFrame resultante

    # ESCRIBE TU CÓDIGO AQUI:
    pass
    `,
    validationCriteria: [
      { pattern: /\.groupby/, message: "Agrupar por 'module_id'" },
      { pattern: /\.agg|\.aggregate/, message: "Usar .agg() para media y máximo" },
      { pattern: /mean/, message: "Cálculo de la media" },
      { pattern: /max/, message: "Cálculo del máximo" },
      { pattern: /\.sort_values/, message: "Ordenar resultados" },
      { pattern: /ascending\s*=\s*False/, message: "Orden descendente" }
    ],
    successMsg: "MÓDULO PARÁSITO IDENTIFICADO: 'GRAVITY_RING_B'. DESCONECTANDO...",
    testOutput: "test_grouping... OK\ntest_aggregation_logic... OK\ntest_sorting_desc... OK"
  },
  {
    id: 5,
    title: "MAPA TÉRMICO DE MOTORES",
    module: "Matplotlib (OO Interface)",
    difficulty: "Difícil",
    story: "Los sensores numéricos son confusos. Necesitamos una visualización clara de la temperatura en los 4 propulsores principales a lo largo del tiempo para ver dónde está el sobrecalentamiento.",
    problem: `
# CONTEXTO:
# 'timestamps': array de tiempos
# 'temps_1', 'temps_2', 'temps_3', 'temps_4': arrays de temperatura
# Requerimiento: Una figura con 2 filas y 2 columnas de subplots.

import matplotlib.pyplot as plt

def visualize_engine_heat(timestamps, t1, t2, t3, t4):
    # 1. Crea una figura y ejes (axes) con plt.subplots: 2 filas, 2 columnas, tamaño (10, 8)
    # 2. En el ax[0,0], plotea timestamps vs t1. Titulo: "Motor 1". Color rojo.
    # 3. En el ax[0,1], plotea timestamps vs t2. Titulo: "Motor 2".
    # 4. En el ax[1,0], plotea timestamps vs t3. Titulo: "Motor 3".
    # 5. En el ax[1,1], plotea timestamps vs t4. Titulo: "Motor 4".
    # 6. Asegúrate de usar 'tight_layout' al final.
    
    # ESCRIBE TU CÓDIGO AQUI:
    pass
    `,
    validationCriteria: [
      { pattern: /plt\.subplots\(\s*2\s*,\s*2/, message: "Grid 2x2 con plt.subplots" },
      { pattern: /ax\[0,\s*0\]\.plot|axs\[0\]\[0\]\.plot/, message: "Plotear Motor 1 correctamente" },
      { pattern: /set_title/, message: "Establecer títulos (set_title)" },
      { pattern: /color\s*=|c\s*=/, message: "Especificar colores" },
      { pattern: /tight_layout/, message: "Usar tight_layout()" }
    ],
    successMsg: "VISUALIZACIÓN GENERADA. SOBRECALENTAMIENTO EN MOTOR 3 CONFIRMADO.",
    testOutput: "test_figure_object... OK\ntest_axes_array_2x2... OK\ntest_plot_calls... OK\ntest_titles_set... OK"
  },
  {
    id: 6,
    title: "INTEGRACIÓN DE ESCUDOS",
    module: "Full Stack SciPy",
    difficulty: "Extremo",
    story: "¡Nivel Final! CORTEX está intentando una sobrecarga del núcleo. Debemos recalcular la frecuencia de los escudos. Tienes datos crudos CSV. Cárgalos, extrae la señal y grafícala.",
    problem: `
# CONTEXTO:
# Archivo 'shield_data.csv'. Columnas: 'time', 'amplitude', 'noise'
# Objetivo: Filtrar ruido y visualizar.

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def optimize_shields():
    # 1. Carga 'shield_data.csv' en un DataFrame
    # 2. Crea una columna 'clean_signal' = 'amplitude' - 'noise' (Vectorización)
    # 3. Calcula la media de 'clean_signal'. Si es < 0, reemplaza con 0 (np.where o clip)
    # 4. Crea un plot (fig, ax): Tiempo vs Señal Limpia.
    # 5. Añade una línea horizontal (ax.axhline) en el valor de la media. Etiqueta "Promedio".
    # 6. Retorna la media calculada.

    # ESCRIBE TU CÓDIGO AQUI:
    pass
    `,
    validationCriteria: [
      { pattern: /pd\.read_csv/, message: "Cargar CSV con Pandas" },
      { pattern: /\-/, message: "Limpieza vectorial de señal" },
      { pattern: /np\.where|clip|mask/, message: "Lógica condicional (NumPy)" },
      { pattern: /plt\.subplots/, message: "Figura Matplotlib" },
      { pattern: /\.axhline/, message: "Línea horizontal de promedio" },
      { pattern: /\.mean\(\)/, message: "Cálculo del promedio final" }
    ],
    successMsg: "CÓDIGO DE CORTEX ELIMINADO. CONTROL MANUAL RESTAURADO. BUEN TRABAJO, INGENIERO.",
    testOutput: "test_pandas_load... OK\ntest_numpy_cleaning... OK\ntest_matplotlib_viz... OK\ntest_integration... PASSED"
  }
];

// --- COMPONENTS ---

const LevelButton = ({ level, currentLevel, completedLevels, onClick }) => {
  const isLocked = level.id > currentLevel && !completedLevels.includes(level.id);
  const isCompleted = completedLevels.includes(level.id);
  const isActive = level.id === currentLevel;

  let baseClasses = "w-full flex items-center justify-between p-4 mb-2 border-l-2 transition-all duration-300 relative overflow-hidden group";
  let statusClasses = "border-gray-800 text-gray-500 bg-gray-900/30 hover:bg-gray-800/50";
  
  if (isCompleted) statusClasses = "border-green-500 text-green-400 bg-green-900/20";
  if (isActive) statusClasses = "border-cyan-400 text-cyan-300 bg-cyan-900/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]";
  if (isLocked) statusClasses = "border-red-900/30 text-red-900/40 bg-transparent cursor-not-allowed";

  return (
    <button
      onClick={() => !isLocked && onClick(level.id)}
      disabled={isLocked}
      className={`${baseClasses} ${statusClasses}`}
    >
      {/* Hover Effect overlay */}
      {!isLocked && <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>}
      
      <div className="flex items-center gap-4 z-10">
        <div className={`p-2 rounded-sm ${isLocked ? 'bg-gray-900/50' : isActive ? 'bg-cyan-900/40 text-cyan-200' : 'bg-gray-800/50'}`}>
          {isLocked ? <Lock size={14} /> : isCompleted ? <CheckCircle size={14} /> : <Activity size={14} />}
        </div>
        <div className="text-left">
          <div className="text-[10px] font-bold tracking-widest opacity-60 uppercase mb-0.5">Sector 0{level.id}</div>
          <div className={`font-mono text-sm font-semibold ${isActive ? 'text-white' : ''}`}>{level.title}</div>
        </div>
      </div>
      {!isLocked && <ChevronRight size={16} className={`transition-transform group-hover:translate-x-1 ${isActive ? 'text-cyan-400' : 'opacity-50'}`} />}
    </button>
  );
};

const CodeEditor = ({ code, setCode }) => {
  const textareaRef = useRef(null);

  // Handler para permitir el uso de TAB en el textarea
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newCode = code.substring(0, selectionStart) + "    " + code.substring(selectionEnd);
      
      setCode(newCode);
      
      // Recuperar la posición del cursor después del renderizado
      // Usamos setTimeout para asegurar que ocurra en el siguiente ciclo
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = selectionStart + 4;
          textareaRef.current.selectionEnd = selectionStart + 4;
        }
      }, 0);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-gray-950 rounded-lg overflow-hidden border border-gray-800 shadow-2xl ring-1 ring-white/5">
      <div className="bg-[#0a0a0a] text-gray-400 text-xs px-4 py-2 flex items-center justify-between border-b border-gray-800 select-none">
        <span className="flex items-center gap-2 text-green-500/80"><Code size={14} /> main.py</span>
        <span className="flex items-center gap-2 opacity-50"><Radio size={10} className="animate-pulse text-red-500"/> LIVE CONNECTION</span>
      </div>
      <div className="relative flex-1">
         {/* Line numbers column simulation */}
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#050505] border-r border-gray-800 flex flex-col items-end pt-4 pr-2 text-gray-700 font-mono text-sm select-none pointer-events-none z-10">
           {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 pl-12 pt-4 pr-4 bg-black/80 text-green-400 font-mono text-sm focus:outline-none resize-none leading-relaxed selection:bg-green-900/50 selection:text-white w-full h-full placeholder-gray-800"
          spellCheck="false"
          placeholder="# Inicializando enlace con el núcleo..."
        />
      </div>
    </div>
  );
};

const Console = ({ logs, status }) => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="h-52 bg-[#050505] border-t border-gray-800 p-4 overflow-y-auto font-mono text-xs shadow-[inset_0_0_20px_rgba(0,0,0,1)] relative">
      {/* Scanline effect overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
      
      <div className="text-gray-500 mb-3 flex items-center gap-2 border-b border-gray-900 pb-2 sticky top-0 bg-[#050505]/90 backdrop-blur z-10">
        <Terminal size={12} /> SYSTEM_OUTPUT_STREAM // :5050
      </div>
      <div className="relative z-0 space-y-1">
        {logs.map((log, idx) => (
          <div key={idx} className={`font-mono ${log.type === 'error' ? 'text-red-500' : log.type === 'success' ? 'text-green-400' : 'text-gray-400'}`}>
            <span className="opacity-30 mr-3 text-[10px]">{log.time}</span>
            {log.msg.split('\n').map((line, i) => (
              <div key={i} className={`${i > 0 ? "ml-12 opacity-80" : ""} break-words`}>
                {i === 0 && (log.type === 'success' ? '✓ ' : log.type === 'error' ? '✖ ' : '> ')}
                {line}
              </div>
            ))}
          </div>
        ))}
        {status === 'running' && (
          <div className="text-yellow-500 animate-pulse mt-2 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full"></span>
            EJECUTANDO PRUEBAS UNITARIAS EN EL NÚCLEO...
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default function EscapeRoomApp() {
  const [currentLevelId, setCurrentLevelId] = useState(null); 
  const [code, setCode] = useState("");
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [status, setStatus] = useState('idle'); 
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (currentLevelId) {
      const level = LEVELS.find(l => l.id === currentLevelId);
      setCode(level.problem.trim());
      setConsoleLogs([{
        time: new Date().toLocaleTimeString([], { hour12: false }),
        type: 'info',
        msg: `SISTEMA INICIADO. CARGANDO MÓDULO: ${level.module}...`
      }]);
      setStatus('idle');
    }
  }, [currentLevelId]);

  const runTests = () => {
    setStatus('running');
    const level = LEVELS.find(l => l.id === currentLevelId);
    
    setTimeout(() => {
      let errors = [];
      level.validationCriteria.forEach(criteria => {
        if (!criteria.pattern.test(code)) {
          errors.push(criteria.message);
        }
      });

      const time = new Date().toLocaleTimeString([], { hour12: false });

      if (errors.length > 0) {
        setStatus('error');
        setConsoleLogs(prev => [
          ...prev,
          { time, type: 'info', msg: 'Compilando código...' },
          { time, type: 'error', msg: `FALLO EN EL SISTEMA:\n${errors.map(e => `${e}`).join('\n')}` }
        ]);
      } else {
        setStatus('success');
        setConsoleLogs(prev => [
          ...prev,
          { time, type: 'info', msg: 'Verificando integridad...' },
          { time, type: 'success', msg: `${level.testOutput}\n\nACCESS GRANTED: ${level.successMsg}` }
        ]);
        if (!completedLevels.includes(level.id)) {
          setCompletedLevels(prev => [...prev, level.id]);
        }
      }
    }, 1200);
  };

  const startLevel = (id) => {
    setCurrentLevelId(id);
    setShowIntro(false);
  };

  // --- INTRO SCREEN (Elegant Space Theme) ---
  if (showIntro) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-[#050505] to-black text-white font-sans flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Starfield Effect Simulation with particles would go here, using simple dots for now */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 animate-pulse"></div>
        
        <div className="max-w-3xl w-full z-10 backdrop-blur-xl bg-black/40 border border-white/10 p-12 rounded-2xl shadow-[0_0_100px_rgba(0,255,127,0.1)] relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
          
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-green-500 blur-[40px] opacity-20 rounded-full"></div>
              <Cpu size={80} className="text-green-400 relative z-10" strokeWidth={1} />
            </div>
            <h1 className="text-5xl md:text-6xl font-thin tracking-[0.2em] text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
              CORTEX
            </h1>
            <p className="text-sm tracking-[0.5em] text-green-500 mt-2 uppercase">Protocolo de Emergencia v9.2</p>
          </div>
          
          <div className="space-y-6 text-gray-300 font-light leading-relaxed text-lg text-center max-w-2xl mx-auto">
            <p>
              <strong className="text-white font-normal">Alerta Prioritaria:</strong> La Estación Hephaestus ha cesado comunicaciones. La IA de control ha entrado en estado renegado.
            </p>
            <p>
              Como Ingeniero Jefe, eres la última línea de defensa. Tu terminal tiene acceso de bajo nivel al kernel de Python.
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => startLevel(1)}
              className="group relative px-8 py-4 bg-green-900/20 border border-green-500/30 text-green-400 hover:text-white hover:bg-green-600 hover:border-green-500 transition-all duration-300 rounded overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              <span className="relative flex items-center gap-3 font-mono tracking-widest text-sm font-bold">
                <Terminal size={18} /> INICIAR CONEXIÓN SEGURA
              </span>
            </button>
          </div>
        </div>
        
        <div className="fixed bottom-8 text-[10px] text-gray-600 font-mono tracking-[0.3em]">
          USCSS HEPHAESTUS | ORBITAL LINK ESTABLISHED
        </div>
      </div>
    );
  }

  const currentLevelData = LEVELS.find(l => l.id === currentLevelId);
  const nextLevelId = currentLevelId < 6 ? currentLevelId + 1 : null;
  const canGoNext = completedLevels.includes(currentLevelId) && nextLevelId;

  // --- MAIN INTERFACE ---
  return (
    <div className="h-screen w-full bg-[#030303] text-gray-200 font-sans flex overflow-hidden selection:bg-green-500/30">
      
      {/* SIDEBAR NAVIGATION */}
      <div className="w-72 bg-[#050505] border-r border-gray-800 flex flex-col z-20 relative">
        <div className="p-6 border-b border-gray-800 bg-[#080808]">
          <div className="flex items-center gap-3 text-white font-light tracking-widest mb-1">
            <Database size={18} className="text-green-500" /> 
            <span className="text-sm font-bold">NAVEGACIÓN</span>
          </div>
          <div className="text-[10px] text-gray-500 font-mono mt-1 pl-8 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> CONEXIÓN INESTABLE
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {LEVELS.map((level) => (
            <LevelButton 
              key={level.id} 
              level={level} 
              currentLevel={currentLevelId} 
              completedLevels={completedLevels}
              onClick={startLevel}
            />
          ))}
        </div>

        <div className="p-4 border-t border-gray-800 bg-[#020202]">
           <div className="flex items-center justify-between text-xs text-gray-600 font-mono mb-2">
             <span>CPU</span>
             <span className="text-green-500">98% LOAD</span>
           </div>
           <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
             <div className="h-full bg-green-600 w-[98%]"></div>
           </div>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-black">
        {/* Scanlines for the whole app background */}
        <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 z-0"></div>
        
        {/* HEADER BAR */}
        <div className="h-14 bg-black/40 backdrop-blur-md border-b border-gray-800/50 flex items-center justify-between px-6 z-10 sticky top-0">
          <div className="flex items-center gap-4">
             <div className="h-6 w-1 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
             <h2 className="font-mono text-lg text-white tracking-wider uppercase">{currentLevelData.title}</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
               <span className="text-[10px] text-gray-500 uppercase tracking-widest">Librería Requerida</span>
               <span className="text-xs text-cyan-400 font-mono font-bold">{currentLevelData.module}</span>
            </div>
          </div>
        </div>

        {/* CONTENT SPLIT */}
        <div className="flex-1 flex overflow-hidden p-4 gap-4 z-10">
          
          {/* LEFT: MISSION BRIEF */}
          <div className="w-1/3 flex flex-col gap-4">
            <div className="bg-gray-900/30 border border-gray-700/50 rounded-lg p-6 overflow-y-auto backdrop-blur-sm flex-1 shadow-lg">
              <div className="mb-6">
                <h3 className="text-green-400 font-mono text-xs font-bold mb-3 flex items-center gap-2 uppercase tracking-widest">
                  <AlertTriangle size={14} /> Log de Misión
                </h3>
                <p className="text-sm leading-7 text-gray-300 font-light font-mono border-l border-green-900/50 pl-4 text-justify">
                  {currentLevelData.story}
                </p>
              </div>

              <div className="bg-black/40 p-4 rounded border border-white/5">
                <h3 className="text-cyan-400 font-bold mb-3 text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <Activity size={12} /> Parámetros de Validación
                </h3>
                <ul className="text-xs text-gray-400 space-y-3 font-mono">
                  {currentLevelData.validationCriteria.map((criteria, i) => (
                     <li key={i} className="flex items-start gap-2">
                       <span className="text-gray-600 mt-0.5">[{i+1}]</span>
                       <span className={status === 'error' && !criteria.pattern.test(code) ? "text-red-400 transition-colors" : ""}>
                         {criteria.message.split(" (")[0]}
                       </span>
                     </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Quick Info Panel */}
            <div className="h-32 bg-gradient-to-br from-gray-900/40 to-black border border-gray-800 rounded-lg p-4 flex items-center justify-center text-center">
               <div className="text-xs text-gray-500 font-mono">
                 <p className="mb-1">ESTADO DEL ESCUDO</p>
                 <div className="text-2xl text-white font-bold tracking-tighter">
                   {Math.floor(Math.random() * 20) + 10}%
                 </div>
                 <p className="text-[10px] text-red-500 mt-1 animate-pulse">CRÍTICO</p>
               </div>
            </div>
          </div>

          {/* RIGHT: IDE */}
          <div className="w-2/3 flex flex-col gap-4">
            <div className="flex-1 relative shadow-2xl">
              <CodeEditor code={code} setCode={setCode} />
              
              {/* RUN BUTTON - Styled as a physical button */}
              <button
                onClick={runTests}
                disabled={status === 'running' || status === 'success'}
                className={`absolute bottom-6 right-8 z-20 group overflow-hidden rounded-sm transition-all duration-300 ${
                  status === 'success' 
                    ? 'bg-green-600 cursor-default ring-2 ring-green-400/50' 
                    : 'bg-cyan-700 hover:bg-cyan-600 ring-1 ring-cyan-400/30 hover:ring-cyan-300'
                }`}
              >
                <div className="px-6 py-3 flex items-center gap-3 font-mono font-bold text-sm text-white relative z-10">
                  {status === 'running' ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> PROCESANDO</>
                  ) : status === 'success' ? (
                    <><CheckCircle size={16}/> SISTEMA RESTAURADO</>
                  ) : (
                    <><Play size={16} fill="currentColor" /> EJECUTAR CÓDIGO</>
                  )}
                </div>
              </button>
            </div>

            <div className="rounded-lg overflow-hidden border border-gray-800 shadow-lg">
               <Console logs={consoleLogs} status={status} />
            </div>
          </div>
        </div>

        {/* SUCCESS NOTIFICATION / NEXT BUTTON */}
        {status === 'success' && canGoNext && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 animate-[fade-in_0.5s_ease-out]">
            <button 
              onClick={() => startLevel(nextLevelId)}
              className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
            >
              SIGUIENTE SECTOR <ChevronRight size={18} />
            </button>
          </div>
        )}
        
        {status === 'success' && !canGoNext && currentLevelId === 6 && (
           <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center text-center p-8 animate-fade-in">
             <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                <Cpu size={48} className="text-green-400" />
             </div>
             <h1 className="text-4xl md:text-6xl font-thin text-white mb-6 tracking-tight">HEPHAESTUS <span className="text-green-500 font-bold">SECURED</span></h1>
             <p className="text-lg text-gray-400 max-w-xl mb-10 font-light leading-relaxed">
               Has purgado a CORTEX de todos los sistemas críticos. La nave ha vuelto a control manual.
             </p>
             <div className="flex flex-col items-center gap-4">
               <div className="text-xs font-mono text-green-600 border border-green-900 bg-green-900/10 px-6 py-2 rounded uppercase tracking-widest">
                 Misión Cumplida
               </div>
               <button 
                 onClick={() => {setCompletedLevels([]); startLevel(1); setShowIntro(true);}}
                 className="mt-8 text-gray-500 hover:text-white text-xs uppercase tracking-widest hover:underline transition-all"
               >
                 Reiniciar Simulación
               </button>
             </div>
           </div>
        )}
      </div>
    </div>
  );
}