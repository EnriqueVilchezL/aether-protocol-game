import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Code, Play, Cpu, AlertTriangle, Database, Activity, Lock, CheckCircle, ChevronRight, Save, RefreshCw, FileText, Map, BarChart2, Rocket, Globe, Zap, Crosshair, Radio } from 'lucide-react';

// --- DATA & LEVELS CONFIGURATION ---

const GAME_STATE = {
  INTRO: 'intro',
  PLAYING: 'playing',
  VICTORY: 'victory',
  GAME_OVER: 'game_over'
};

const LEVELS = [
  {
    id: 1,
    title: "CALIBRACIÓN DE SENSORES",
    module: "Numpy - Data Cleaning",
    difficulty: "Nivel 1",
    timeContext: "T-minus 120 min",
    story: "Los sensores externos están saturados por radiación. Recibimos lecturas crudas que incluyen ruido negativo y están en la escala incorrecta (Celsius).",
    problem: `
OBJETIVO: Retornar un array de Numpy 'valid_data' listo para análisis.

REQUERIMIENTOS:
1. La entrada 'raw_readings' es una lista Python estándar.
2. Convertir a escala Kelvin (+273.15).
3. El hardware a veces arroja errores negativos (<= 0 Kelvin). Estos datos son corruptos y deben ser eliminados del array.
4. Generar una gráfica simple de los datos válidos resultantes para inspección visual.
    `,
    hints: [
      "Recuerda: Las listas de Python no soportan operaciones matemáticas directas, los arrays de Numpy sí.",
      "Filtrado booleano: array[condicion].",
      "Usa ax.plot() para la visualización."
    ],
    initialCode: `import numpy as np
import matplotlib.pyplot as plt

def procesar_sensores(raw_readings):
    fig, ax = plt.subplots()
    
    # Tu implementación aquí:
    
    
    
    return fig, valid_data`,
    validation: (code) => {
      const checks = [
        { pattern: /np\.array\(/, msg: "No se ha convertido la entrada a un vector Numpy." },
        { pattern: /\+\s*273\.15/, msg: "Falta la conversión a Kelvin (+273.15)." },
        { pattern: />\s*0|!=\s*0/, msg: "No se están filtrando los valores corruptos (<= 0)." },
        { pattern: /ax\.plot\(/, msg: "Falta la visualización de los datos." }
      ];
      return runValidation(code, checks);
    }
  },
  {
    id: 2,
    title: "DIAGNÓSTICO DEL CASCO",
    module: "Pandas - Feature Engineering",
    difficulty: "Nivel 2",
    timeContext: "T-minus 90 min",
    story: "Las placas del casco están bajo estrés. Tenemos datos de fuerza y área, pero necesitamos saber la PRESION para identificar puntos de ruptura.",
    problem: `
OBJETIVO: Identificar placas críticas.

REQUERIMIENTOS:
1. Tienes un DataFrame 'df' con columnas 'force' y 'area'.
2. Genera una nueva columna 'pressure' (Fuerza / Área).
3. Genera un sub-DataFrame 'critical_df' que contenga SOLO las filas donde la presión exceda 5000 Pascales.
4. Visualiza la distribución de presión de TODO el sistema (histograma con 30 bins).
    `,
    hints: [
      "Pandas permite operaciones directas entre columnas: df['A'] / df['B'].",
      "Usa máscaras booleanas para filtrar el DataFrame.",
      "ax.hist(data, bins=X)"
    ],
    initialCode: `import pandas as pd
import matplotlib.pyplot as plt

def analisis_estructural(df):
    fig, ax = plt.subplots()
    
    # 1. Cálculo de Ingeniería
    
    
    # 2. Filtrado de Seguridad
    critical_df = 
    
    # 3. Reporte Visual
    
    
    return fig, critical_df`,
    validation: (code) => {
      const checks = [
        { pattern: /df\['force'\]\s*\/\s*df\['area'\]/, msg: "La fórmula de Presión (F/A) no es correcta." },
        { pattern: /df\['pressure'\]\s*>/, msg: "No se está aplicando el umbral de seguridad (> 5000)." },
        { pattern: /ax\.hist\(.*bins=30.*\)/, msg: "El histograma debe tener una resolución de 30 bins." },
        { pattern: /critical_df\s*=/, msg: "No has definido la variable de retorno 'critical_df'." }
      ];
      return runValidation(code, checks);
    }
  },
  {
    id: 3,
    title: "SECUENCIADOR DE COMANDOS",
    module: "Control Flow & Numpy",
    difficulty: "Nivel 3",
    timeContext: "T-minus 70 min",
    story: "El piloto automático está offline. Debemos procesar una cola de comandos de navegación manualmente aplicándolos a nuestro vector de trayectoria actual.",
    problem: `
OBJETIVO: Procesar una lista de comandos y devolver el vector final.

DATOS:
- 'command_queue': Lista de strings ['NORMALIZE', 'BOOST', 'REVERSE', ...].
- 'current_vector': Array numpy 1D (x, y, z).

REQUERIMIENTOS:
Itera sobre la cola de comandos. Para cada comando, altera 'current_vector' usando Numpy:
- 'NORMALIZE': Divide el vector por su magnitud (norma L2).
- 'BOOST': Multiplica el vector por 2.
- 'REVERSE': Multiplica el vector por -1.
    `,
    hints: [
      "Necesitas un bucle (for cmd in command_queue).",
      "np.linalg.norm(v) calcula la magnitud.",
      "Usa condicionales (if/elif) dentro del bucle para decidir la operación."
    ],
    initialCode: `import numpy as np

def procesar_navegacion(command_queue, current_vector):
    # Procesar cola de comandos
    
    
    
    
    
            
    return current_vector`,
    validation: (code) => {
      const checks = [
        { pattern: /for\s+.*in\s+command_queue/, msg: "Se requiere iterar sobre la lista de comandos." },
        { pattern: /np\.linalg\.norm/, msg: "Falta lógica matemática para normalización (cálculo de norma)." },
        { pattern: /\*\s*2/, msg: "No se encuentra la lógica para el comando BOOST (* 2)." },
        { pattern: /\*\s*-1/, msg: "No se encuentra la lógica para el comando REVERSE (* -1)." }
      ];
      return runValidation(code, checks);
    }
  },
  {
    id: 4,
    title: "ANÁLISIS DE TENDENCIAS",
    module: "Time Series Analysis",
    difficulty: "Nivel 4",
    timeContext: "T-minus 50 min",
    story: "La telemetría del reactor es inestable. Hay huecos en los datos y ruido de alta frecuencia. Necesitamos ver la tendencia real.",
    problem: `
OBJETIVO: Limpiar y suavizar la serie temporal.

REQUERIMIENTOS:
1. Tienes un DataFrame 'df' con índice de tiempo y columna 'temp'.
2. Los datos tienen huecos (NaN). Rellénalos propagando el último valor válido (Forward Fill).
3. Calcula una Media Móvil (Rolling Mean) de 20 periodos para ver la tendencia.
4. Genera una gráfica comparativa:
   - Datos Originales (Rellenados): Color gris, transparente (alpha=0.3).
   - Tendencia (Rolling): Color rojo, línea sólida.
    `,
    hints: [
      "Métodos clave: ffill(), rolling(), mean().",
      "Plotea dos veces sobre el mismo objeto 'ax'.",
      "Orden: Limpieza -> Cálculo -> Visualización."
    ],
    initialCode: `import pandas as pd
import matplotlib.pyplot as plt

def reporte_reactor(df):
    fig, ax = plt.subplots()
    
    # 1. Tratamiento de huecos (NaN)
    
    
    # 2. Cálculo de Tendencia (Rolling)
    
    
    # 3. Visualización Comparativa
    
    
    return fig`,
    validation: (code) => {
      const checks = [
        { pattern: /\.ffill\(|\.fillna\(.*method='ffill'/, msg: "No se han tratado los valores nulos (forward fill)." },
        { pattern: /\.rolling\(.*20.*\)\.mean\(\)/, msg: "El cálculo de media móvil requiere ventana de 20." },
        { pattern: /color='gray'|color="gray"/, msg: "Estética incorrecta para datos crudos (debe ser gris)." },
        { pattern: /color='red'|color="red"/, msg: "Estética incorrecta para tendencia (debe ser roja)." }
      ];
      return runValidation(code, checks);
    }
  },
  {
    id: 5,
    title: "ESCÁNER SECTORIAL",
    module: "Numpy Meshgrid & Seaborn",
    difficulty: "Nivel 5",
    timeContext: "T-minus 30 min",
    story: "Los sensores de largo alcance están ciegos. Necesitamos un mapa de gravedad. Para simular un campo 2D continuo en una computadora, necesitamos 'discretizar' el espacio en una rejilla (grid) de puntos.",
    problem: `
OBJETIVO: Generar una matriz de datos 2D y visualizarla con Seaborn.

EXPLICACIÓN DE REJILLA (MESHGRID):
Imagina que quieres medir la gravedad en cada metro cuadrado de una habitación.
1. Primero defines los puntos en el borde: "0m, 1m, 2m..." (esto es linspace).
2. Luego necesitas generar las coordenadas para TODO el suelo (0,0), (0,1), (1,0)...
3. 'np.meshgrid' toma los bordes y genera dos matrices gigantes: una con todas las coordenadas X y otra con las Y. Esto permite calcular fórmulas Z = f(X, Y) de golpe para todos los puntos.

REQUERIMIENTOS:
1. Genera vectores 'x' e 'y' de -20 a 20 con 100 puntos.
2. Crea las matrices de coordenadas 'X' e 'Y' usando np.meshgrid(x, y).
3. Calcula la intensidad 'Z' = 1000 / (sqrt(X^2 + Y^2) + 1).
4. Visualiza 'Z' usando 'sns.heatmap' (pásale 'ax=ax' y 'cmap="plasma"').
    `,
    hints: [
      "X, Y = np.meshgrid(x, y): Crea el tablero de ajedrez de coordenadas.",
      "Z será una matriz 100x100 automáticamente al operar X e Y.",
      "sns.heatmap(data=Z, cmap='plasma', ax=ax)."
    ],
    initialCode: `import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

def simulacion_gravedad():
    fig, ax = plt.subplots()
    
    # 1. Definición de bordes (Linspace)
    
    
    # 2. Creación de Rejilla 2D (Meshgrid)
    
    
    # 3. Modelo Físico (Cálculo de Z)
    # Nota: Z = 1000 / (np.sqrt(X**2 + Y**2) + 1)
    
    
    # 4. Renderizado (Seaborn)
    
    
    return fig`,
    validation: (code) => {
      const checks = [
        { pattern: /np\.meshgrid/, msg: "Falta generar la malla de coordenadas (meshgrid)." },
        { pattern: /np\.sqrt\(.*X\*\*2.*\)/, msg: "Error en el cálculo de la distancia euclidiana." },
        { pattern: /1000\s*\//, msg: "No se ha implementado la fórmula de intensidad inversa." },
        { pattern: /sns\.heatmap/, msg: "Debes usar sns.heatmap para la visualización." },
        { pattern: /ax=ax/, msg: "Asegúrate de pasar el objeto 'ax=ax' a la función heatmap para que se dibuje en la ventana correcta." }
      ];
      return runValidation(code, checks);
    }
  },
  {
    id: 6,
    title: "SISTEMA DE CONTROL CENTRAL",
    module: "System Integration (Logic + Data)",
    difficulty: "Experto",
    timeContext: "T-minus 10 min",
    story: "Acceso Root concedido. Tienes el control total. Debes implementar el script maestro que gestiona los subsistemas según el modo operativo de la nave.",
    problem: `
OBJETIVO: Implementar un controlador lógico que reaccione al parámetro 'mode'.

ENTRADA: DataFrame 'system_logs' (columnas: 'module', 'error_rate', 'status'), String 'mode'.

REQUERIMIENTOS LÓGICOS:
Si mode es 'DIAGNOSTIC':
   - Agrupa los logs por 'module'.
   - Calcula el promedio de 'error_rate'.
   - Retorna una GRÁFICA DE BARRAS de los errores.

Si mode es 'PURGE':
   - Filtra y conserva solo los sistemas con 'status' == 'CRITICAL'.
   - Retorna ese DATAFRAME filtrado.

Si mode es cualquier otra cosa:
   - Retorna un diccionario vacío {}.
    `,
    hints: [
      "Estructura tu código con if mode == '...': elif ...",
      "Para DIAGNOSTIC: df.groupby().mean() y luego plot.bar().",
      "Para PURGE: Filtrado simple df[df.status == ...].",
      "Este ejercicio combina control de flujo, pandas y matplotlib."
    ],
    initialCode: `import pandas as pd
import matplotlib.pyplot as plt

def main_control_system(system_logs, mode):
    # Implementar lógica de control
    
    if mode == 'DIAGNOSTIC':
        # Agrupar, calcular media, generar gráfica
        fig, ax = plt.subplots()
        
        return fig
        
    elif mode == 'PURGE':
        # Filtrar críticos
        
        return purged_df
        
    else:
        return {}`,
    validation: (code) => {
      const checks = [
        { pattern: /if\s+mode\s*==\s*['"]DIAGNOSTIC['"]:/, msg: "Falta el bloque de control para modo DIAGNOSTIC." },
        { pattern: /\.groupby\(['"]module['"]\)\.mean\(\)/, msg: "Lógica de agregación incorrecta en DIAGNOSTIC." },
        { pattern: /kind=['"]bar['"]|ax\.bar/, msg: "Se requiere gráfica de barras en DIAGNOSTIC." },
        { pattern: /elif\s+mode\s*==\s*['"]PURGE['"]:/, msg: "Falta el bloque de control para modo PURGE." },
        { pattern: /==\s*['"]CRITICAL['"]/, msg: "Filtrado incorrecto en modo PURGE." }
      ];
      return runValidation(code, checks);
    }
  }
];

// --- HELPER FUNCTIONS ---

function runValidation(code, checks) {
  const errors = [];
  let passedCount = 0;
  
  checks.forEach(check => {
    const match = check.pattern.test(code);
    if (check.inverse) {
       if (match) errors.push(check.msg);
       else passedCount++;
    } else {
       if (!match) errors.push(check.msg);
       else passedCount++;
    }
  });

  return {
    success: errors.length === 0,
    errors: errors,
    score: Math.round((passedCount / checks.length) * 100)
  };
}

// --- COMPONENTS ---

const GlitchText = ({ text, as = 'span', className = '' }) => {
  const Component = as;
  return (
    <Component className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -ml-0.5 translate-x-[1px] text-red-500 opacity-70 animate-pulse z-0">{text}</span>
      <span className="absolute top-0 left-0 -ml-0.5 -translate-x-[1px] text-blue-500 opacity-70 animate-pulse delay-75 z-0">{text}</span>
    </Component>
  );
};

export default function AetherEscape() {
  const [gameState, setGameState] = useState(GAME_STATE.INTRO);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const currentLevel = LEVELS[currentLevelIndex];

  // Init level code
  useEffect(() => {
    if (gameState === GAME_STATE.PLAYING) {
      setUserCode(currentLevel.initialCode);
      setLogs([`> Conectando al subsistema: ${currentLevel.title}...`, `> Módulo cargado: ${currentLevel.module}`, `> Esperando instrucciones...`]);
      setFeedback(null);
      setShowHint(false);
    }
  }, [currentLevelIndex, gameState]);

  const handleStartGame = () => {
    setGameState(GAME_STATE.PLAYING);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setLogs(prev => [...prev, `> Verificando sintaxis y lógica...`]);
    
    setTimeout(() => {
      const result = currentLevel.validation(userCode);
      setIsRunning(false);
      
      if (result.success) {
        setLogs(prev => [...prev, `> [OK] Compilación exitosa. Parámetros nominales.`]);
        setFeedback({ type: 'success', msg: 'Código validado. Sistema operativo.' });
      } else {
        setLogs(prev => [...prev, `> [FATAL] Error de lógica en el script.`]);
        setFeedback({ type: 'error', msg: 'Errores detectados:', errors: result.errors });
      }
    }, 1500);
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < LEVELS.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
    } else {
      setGameState(GAME_STATE.VICTORY);
    }
  };

  // --- VIEWS ---

  if (gameState === GAME_STATE.INTRO) {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono flex flex-col items-center justify-center p-8 relative overflow-hidden selection:bg-green-900 selection:text-white group">
        
        {/* Deep Space Background Layer 1 (Stars) */}
        <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop" alt="Space Nebula" className="w-full h-full object-cover opacity-60 scale-110 animate-pulse-slow" />
        </div>

        {/* Planet Layer 2 */}
        <div className="absolute top-[-10%] right-[-10%] z-0 opacity-80 w-[600px] h-[600px] pointer-events-none">
           <div className="relative w-full h-full rounded-full shadow-[inset_-40px_-40px_100px_rgba(0,0,0,0.9)] overflow-hidden border-opacity-20 border border-blue-500/30">
              <img src="https://images.unsplash.com/photo-1614730341194-75c60740a2d3?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover animate-spin-slow mix-blend-screen" style={{animationDuration: '120s'}} alt="Planet"/>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-black/90"></div>
           </div>
        </div>

        {/* Distant Ship/Station Layer 3 */}
        <div className="absolute bottom-[20%] left-[10%] z-0 opacity-60 w-64 h-64 pointer-events-none animate-float-slow">
           <img src="https://images.unsplash.com/photo-1541185933-710f50b90858?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] mix-blend-lighten" alt="Space Station"/>
        </div>

        {/* UI Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-0"></div>
        
        {/* HUD Overlay Elements */}
        <div className="absolute inset-0 pointer-events-none z-10">
           <div className="absolute top-8 left-8 border-t-2 border-l-2 border-green-500/30 w-16 h-16"></div>
           <div className="absolute top-8 right-8 border-t-2 border-r-2 border-green-500/30 w-16 h-16"></div>
           <div className="absolute bottom-8 left-8 border-b-2 border-l-2 border-green-500/30 w-16 h-16"></div>
           <div className="absolute bottom-8 right-8 border-b-2 border-r-2 border-green-500/30 w-16 h-16"></div>
           <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>
        </div>

        <div className="max-w-5xl w-full border border-green-800/60 bg-black/70 backdrop-blur-md p-12 shadow-[0_0_150px_rgba(0,0,0,0.8)] relative z-20 rounded-xl overflow-hidden group-hover:border-green-500/50 transition-colors duration-700">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>

          <div className="flex items-start justify-between mb-12 relative z-20">
            <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="p-5 bg-green-950/40 rounded-full border border-green-500/40 shadow-[0_0_30px_rgba(34,197,94,0.15)] backdrop-blur-sm">
                      <Cpu size={64} className="animate-pulse text-green-400" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-black text-green-500 text-[10px] font-bold px-2 py-0.5 border border-green-800 rounded">SYS_RDY</div>
                </div>
                <div>
                  <h1 className="text-7xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-200 to-green-400 drop-shadow-[0_2px_10px_rgba(0,255,0,0.3)]"><GlitchText text="AETHER PROTOCOL" /></h1>
                  <div className="flex gap-4 text-sm font-bold tracking-[0.2em] uppercase items-center text-green-500/80">
                     <Globe size={14} />
                     <span>Estación Orbital Hephaestus</span>
                     <span className="text-slate-600 mx-2">|</span>
                     <span className="text-red-500 animate-pulse flex items-center gap-2"><AlertTriangle size={14}/> Alerta Nivel 5</span>
                  </div>
                </div>
            </div>
            
            <div className="text-right hidden lg:block opacity-80">
                <div className="flex flex-col items-end gap-1 text-[10px] font-mono text-green-700">
                    <span>COORDS: 42.591 / -12.992</span>
                    <span>DATE: 2142.05.12</span>
                    <span>UPTIME: 00:00:00</span>
                </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12 relative z-20">
            <div className="col-span-2 space-y-8 text-lg text-slate-300 leading-relaxed font-light">
                <div className="bg-black/40 p-6 rounded-lg border-l-4 border-red-500 shadow-lg">
                  <p className="mb-4">
                    <strong className="text-red-400 font-mono text-xl block mb-2">[CRITICAL FAILURE DETECTED]</strong>
                    La IA central ha colapsado tras cruzar el horizonte de sucesos del agujero negro Cygnus-X1.
                    La nave está a deriva y los sistemas de soporte vital están fallando.
                  </p>
                  <p className="italic text-blue-300/90 border-t border-white/10 pt-4">
                    "Solo un ingeniero capaz de manipular el código base manualmente puede salvarnos. Los sistemas automáticos no responden."
                  </p>
                </div>
                
                <p className="text-green-100/80">
                   Toma el control de la terminal de emergencia. Prepárate para escribir scripts en tiempo real para purgar datos corruptos, simular trayectorias manuales y recalibrar los escudos térmicos antes de que la radiación nos consuma.
                </p>
            </div>
            
            <div className="space-y-4 font-mono text-xs">
               <div className="bg-green-950/20 p-4 rounded border border-green-900/60 text-green-400 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-sm">
                  <div className="font-bold mb-3 text-white flex items-center gap-2 border-b border-green-800/50 pb-2">
                    <Code size={14}/> HERRAMIENTAS
                  </div>
                  <ul className="space-y-2">
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full"></div> Numpy (Vectorización)</li>
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full"></div> Pandas (Dataframes)</li>
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full"></div> Matplotlib/Seaborn</li>
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-green-500 rounded-full"></div> Logic Control (Bucles)</li>
                  </ul>
               </div>
               
               <div className="bg-red-950/10 p-4 rounded border border-red-900/40 text-red-400 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-sm">
                  <div className="font-bold mb-3 text-white flex items-center gap-2 border-b border-red-800/50 pb-2">
                     <Radio size={14}/> TELEMETRÍA
                  </div>
                   <div className="space-y-3">
                      <div>
                         <div className="flex justify-between mb-1"><span>ESCUDOS</span> <span>12%</span></div>
                         <div className="h-1 bg-red-900/50 rounded-full overflow-hidden"><div className="h-full bg-red-500 w-[12%] animate-pulse"></div></div>
                      </div>
                      <div>
                         <div className="flex justify-between mb-1"><span>OXÍGENO</span> <span>45%</span></div>
                         <div className="h-1 bg-red-900/50 rounded-full overflow-hidden"><div className="h-full bg-yellow-500 w-[45%]"></div></div>
                      </div>
                      <div className="flex items-center gap-2 text-red-500 font-bold mt-2">
                         <Crosshair size={12} className="animate-spin"/> NAV_SYS: OFFLINE
                      </div>
                   </div>
               </div>
            </div>
          </div>

          <button 
            onClick={handleStartGame}
            className="w-full group relative px-8 py-6 bg-gradient-to-r from-green-700 to-green-900 hover:from-green-600 hover:to-green-800 text-white transition-all duration-300 font-black text-2xl flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(34,197,94,0.2)] border border-green-500/30 z-20 overflow-hidden rounded hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(34,197,94,0.4)]"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
            
            <Terminal size={32} className="relative z-10" />
            <span className="relative z-10 tracking-[0.1em]">INICIAR SECUENCIA DE COMANDO</span>
            <ChevronRight className="group-hover:translate-x-2 transition-transform relative z-10" size={32} />
          </button>
        </div>
      </div>
    );
  }

  if (gameState === GAME_STATE.VICTORY) {
    return (
      <div className="min-h-screen bg-slate-900 text-blue-400 font-mono flex flex-col items-center justify-center p-8 overflow-hidden relative">
         
         <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" alt="Earth from space" className="w-full h-full object-cover opacity-30" />
         </div>

         <div className="max-w-2xl w-full text-center border border-blue-500/50 p-12 bg-black/80 backdrop-blur rounded-lg shadow-[0_0_100px_rgba(59,130,246,0.3)] relative z-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            <CheckCircle size={80} className="mx-auto mb-6 text-blue-500 animate-bounce" />
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">CONTROL RECUPERADO</h1>
            <p className="text-xl text-blue-300 mb-8 leading-relaxed">
              La nave ha estabilizado su órbita. Los sistemas automáticos están en línea.
              <br/>Has salvado la misión, Ingeniero.
            </p>
            
            <div className="bg-slate-800/50 p-6 rounded-lg mb-8 text-left border border-slate-700">
               <h3 className="text-white font-bold mb-4 border-b border-slate-600 pb-2">REPORTE DE MISIÓN</h3>
               <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex justify-between"><span>Sensores & Calibración:</span> <span className="text-green-400">OPTIMIZADO</span></li>
                  <li className="flex justify-between"><span>Simulación de Trayectoria:</span> <span className="text-green-400">CALCULADA</span></li>
                  <li className="flex justify-between"><span>Eficiencia Energética:</span> <span className="text-green-400">MAXIMIZADA</span></li>
                  <li className="flex justify-between"><span>Análisis Térmico:</span> <span className="text-green-400">COMPLETADO</span></li>
               </ul>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-blue-600 text-white hover:bg-blue-500 rounded font-bold tracking-wide transition-colors shadow-lg shadow-blue-900/50"
            >
              FINALIZAR SIMULACIÓN
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-green-500 font-mono flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-green-900/50 bg-[#0a0a0a] flex items-center justify-between px-6 z-20 shadow-md relative">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
        <div className="flex items-center gap-4">
          <div className="bg-green-900/20 p-2 rounded text-green-400 ring-1 ring-green-500/30">
            <Activity className="animate-pulse" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wider">NIVEL {currentLevel.id} <span className="text-slate-600">/ 6</span></h2>
            <p className="text-xs text-green-600 uppercase font-semibold">{currentLevel.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
             <div className="text-xs text-slate-500 uppercase">Tiempo Restante</div>
             <div className="text-red-500 font-bold font-mono text-lg">{currentLevel.timeContext}</div>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div className="flex items-center gap-2 text-slate-400 bg-slate-900 px-3 py-1 rounded border border-slate-800">
             <Lock size={14} /> 
             <span className="text-xs font-bold">SECURE SHELL</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Background for IDE */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>

        {/* Left Panel: Mission & Specs */}
        <aside className="w-1/3 min-w-[350px] border-r border-slate-800 bg-[#080808]/95 backdrop-blur flex flex-col relative z-10">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            
            {/* Story Block */}
            <div className="bg-green-950/20 border-l-2 border-green-500 p-5 rounded-r relative shadow-[inset_0_0_20px_rgba(34,197,94,0.05)]">
              <h3 className="text-xs font-bold text-green-500 uppercase mb-2 flex items-center gap-2">
                <Zap size={14} /> Transmisión Entrante
              </h3>
              <p className="text-green-100/80 text-sm leading-relaxed">{currentLevel.story}</p>
            </div>

            {/* Problem Spec */}
            <div className="space-y-3">
              <h3 className="text-white font-bold flex items-center gap-2 text-sm border-b border-slate-800 pb-2">
                <FileText size={16} className="text-blue-400" /> OBJETIVOS DE LA MISIÓN
              </h3>
              <div className="text-sm text-slate-300 bg-[#0f1115] p-5 rounded border border-slate-700/50 whitespace-pre-line leading-7 shadow-inner font-medium font-sans">
                {currentLevel.problem}
              </div>
            </div>

            {/* Hints */}
            <div className="mt-4">
              <button 
                onClick={() => setShowHint(!showHint)}
                className="w-full py-3 px-3 rounded border border-yellow-900/30 bg-yellow-900/10 hover:bg-yellow-900/20 text-yellow-600 text-xs font-bold flex items-center justify-center gap-2 transition-colors uppercase tracking-wide"
              >
                <AlertTriangle size={14} /> 
                {showHint ? 'Cerrar Protocolo de Ayuda' : 'Solicitar Asistencia Técnica'}
              </button>
              
              {showHint && (
                <div className="mt-2 bg-[#1a1500] border border-yellow-900/30 rounded p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <ul className="text-xs text-yellow-500/80 space-y-3 list-none">
                    {currentLevel.hints.map((hint, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className="text-yellow-700 mt-0.5 shrink-0">&gt;&gt;</span>
                        {hint}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Right Panel: IDE & Console */}
        <main className="flex-1 flex flex-col bg-[#0d1117] relative z-10">
          
          {/* Toolbar */}
          <div className="bg-[#161b22] border-b border-slate-800 px-4 py-2 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-300 px-3 py-1.5 bg-[#0d1117] rounded-t border-t border-l border-r border-slate-700 translate-y-[9px] z-10 shadow-sm">
                <Code size={12} className="text-blue-400" />
                <span className="opacity-70">/modules/</span>script_{currentLevel.id}.py
              </div>
            </div>
            <div className="flex gap-3">
               <button 
                  onClick={() => setUserCode(currentLevel.initialCode)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                >
                  <RefreshCw size={14} /> Reiniciar
                </button>
                <button 
                  onClick={handleRunCode}
                  disabled={isRunning || feedback?.type === 'success'}
                  className={`flex items-center gap-2 px-6 py-1.5 text-xs font-bold rounded transition-all shadow-lg tracking-wide
                    ${isRunning ? 'bg-yellow-600/20 text-yellow-500 cursor-wait' : 
                      feedback?.type === 'success' ? 'bg-green-600/20 text-green-500 cursor-not-allowed border border-green-500/30' :
                      'bg-green-600 hover:bg-green-500 text-white shadow-green-900/40 hover:shadow-green-500/40'}
                  `}
                >
                  {isRunning ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
                  {isRunning ? 'COMPILANDO...' : 'EJECUTAR CÓDIGO'}
                </button>
            </div>
          </div>

          {/* Code Editor Area */}
          <div className="flex-1 relative bg-[#0d1117] p-1 overflow-hidden flex flex-col z-0">
             {/* Line Numbers (Fake) */}
             <div className="absolute left-0 top-4 bottom-0 w-12 flex flex-col items-end pr-4 text-slate-700 font-mono text-sm select-none pt-1 border-r border-slate-800/50 bg-[#0d1117]">
                {Array.from({length: 30}).map((_, i) => <div key={i} className="leading-6 text-slate-600">{i+1}</div>)}
             </div>
             <textarea 
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                spellCheck="false"
                className="w-full h-full bg-transparent resize-none outline-none font-mono text-sm leading-6 text-blue-100 pl-14 pt-4 custom-caret selection:bg-blue-500/30"
                style={{ fontFamily: '"JetBrains Mono", "Fira Code", monospace' }}
             />
          </div>

          {/* Output / Feedback Panel */}
          <div className="h-[35%] min-h-[200px] border-t border-slate-800 bg-[#0a0a0a] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-10">
            <div className="px-4 py-2 border-b border-slate-800 text-xs font-bold text-slate-500 flex justify-between items-center bg-[#0f0f0f]">
               <span className="flex items-center gap-2"><Terminal size={12} /> SALIDA DE TERMINAL</span>
               <span className="text-slate-600 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> ONLINE</span>
            </div>
            
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 custom-scrollbar bg-black/50">
              {logs.map((log, idx) => (
                <div key={idx} className={`border-l-2 pl-2 ${log.includes('[FATAL]') ? 'text-red-400 border-red-500 bg-red-900/10 py-1' : log.includes('[OK]') ? 'text-green-400 border-green-500 bg-green-900/10 py-1' : 'text-slate-400 border-transparent'}`}>
                  {log}
                </div>
              ))}
              
              {/* Validation Feedback UI */}
              {feedback && (
                <div className={`mt-4 p-4 border rounded-md animate-in slide-in-from-bottom-2 duration-300 ${feedback.type === 'success' ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                  <div className={`font-bold mb-2 flex items-center gap-2 text-sm ${feedback.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {feedback.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                    {feedback.msg}
                  </div>
                  
                  {feedback.errors && (
                    <div className="bg-black/40 rounded p-3 mt-2 border border-red-500/10">
                      <ul className="space-y-1.5">
                        {feedback.errors.map((err, idx) => (
                           <li key={idx} className="flex items-start gap-2 text-red-300/90">
                              <span className="mt-1.5 text-[10px] text-red-500">●</span>
                              {err}
                           </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {feedback.type === 'success' && (
                    <div className="mt-4 flex justify-end">
                      <button 
                        onClick={handleNextLevel}
                        className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center gap-2 transition-all hover:translate-x-1 hover:scale-105 uppercase tracking-wider text-xs"
                      >
                        Acceder al Nivel {currentLevelIndex + 2} <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      
      {/* CRT / Scanline Overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-150 contrast-150 mix-blend-overlay"></div>
      <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,2px_100%]"></div>
    </div>
  );
}