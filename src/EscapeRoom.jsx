import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Code, Play, Cpu, AlertTriangle, CheckCircle, XCircle, Database, Activity, Lock, ChevronRight, Save, Radio, Loader, BookOpen } from 'lucide-react';

// --- DATA & LEVELS CONFIGURATION (BEGINNER FRIENDLY) ---

const LEVELS = [
  {
    id: 1,
    title: "CALIBRACIÓN DE SENSORES",
    module: "NumPy",
    difficulty: "Fácil",
    story: "Ingeniero, los sensores dan lecturas en milivoltios (mV) y el sistema central necesita valores normalizados entre 0 y 1. Si enviamos datos crudos, el sistema de seguridad colapsará.",
    problem: `
# TAREA: Implementar normalización Min-Max
# Input: Una lista de números [1200, 1500, ...]
# Output: Un array de NumPy con valores entre 0.0 y 1.0
# Fórmula: (valor - minimo) / (maximo - minimo)

import numpy as np

def calibrate_sensors(readings):
    # 1. Convierte la lista 'readings' a un array de NumPy
    # 2. Encuentra el valor min() y max() del array
    # 3. Aplica la fórmula a todo el array
    return np.array([]) # ¡Cambia esto por tu código!
    
# Zona de pruebas (no afecta la validación final)
datos = [1200, 1500, 800, 950, 2000, 1100]
print("Tu resultado:", calibrate_sensors(datos))
    `,
    // Regex checks para asegurar buenas prácticas antes de ejecutar
    requirements: [
      { pattern: /np\.array|numpy\.array/, hint: "💡 Pista: CORTEX requiere eficiencia. Convierte la lista Python a un `np.array()` al principio." },
      { pattern: /\.min\(|np\.min/, hint: "💡 Pista: No busques el mínimo manualmente. Usa `.min()` o `np.min()`." },
      { pattern: /\.max\(|np\.max/, hint: "💡 Pista: Usa `.max()` o `np.max()` para encontrar el valor más alto." }
    ],
    validationCode: `
import numpy as np

_all_passed = True

def check(step_name, condition, success_msg, error_msg):
    global _all_passed
    if condition:
        print(f"✅ {step_name}: {success_msg}")
    else:
        print(f"❌ {step_name}: {error_msg}")
        _all_passed = False

try:
    print("--- 🛠️ INICIANDO DIAGNÓSTICO DE SENSORES ---")
    
    test_data = [1200, 1500, 800, 950, 2000, 1100]
    # Intentamos ejecutar la función del usuario
    try:
        res = calibrate_sensors(test_data)
    except Exception as e:
        print(f"❌ Error Crítico: Tu código tiene errores de sintaxis o ejecución.\\n   ➜ Detalle: {str(e)}")
        res = None
        _all_passed = False

    if res is not None:
        # 1. Verificar Tipo de Dato
        es_array = isinstance(res, np.ndarray)
        check("Formato de Salida", es_array, 
              "¡Excelente! Es un array de NumPy.", 
              "La función devolvió una lista de Python normal (o nada).\\n      ➜ Usa 'np.array(lista)' para convertirla.")
        
        if es_array:
            if res.size == 0:
                 check("Datos Procesados", False, "", "El array devuelto está vacío. ¡No borres los datos!")
            else:
                # 2. Verificar Lógica Matemática
                rango_ok = np.isclose(res.min(), 0.0) and np.isclose(res.max(), 1.0)
                check("Rango 0 a 1", rango_ok, 
                      "La normalización está dentro de los límites.", 
                      f"Los valores no están entre 0 y 1.\\n      ➜ Tu mínimo fue {res.min():.2f} y máximo {res.max():.2f}.\\n      ➜ Revisa la fórmula: (x - min) / (max - min)")

                # 3. Verificar Precisión
                expected = (np.array(test_data) - 800) / (2000 - 800)
                precision_ok = np.allclose(res, expected)
                check("Precisión Matemática", precision_ok, 
                      "Cálculos exactos.", 
                      "Los valores no son correctos. ¿Quizás restaste al revés?")
                
    # Test de robustez (lista vacía)
    try:
        res_empty = calibrate_sensors([])
        # Si no falla, es un plus, pero si falla feo avisamos
    except:
        print("⚠️ Advertencia: Tu función falla si la lista de sensores está vacía. En producción esto sería un bug, pero te lo dejaré pasar por hoy.")

except Exception as e:
    print(f"❌ Error del Sistema: {str(e)}")
    _all_passed = False
    `,
    successMsg: "SENSORES CALIBRADOS CORRECTAMENTE. BUEN TRABAJO.",
    testOutput: "" 
  },
  {
    id: 2,
    title: "VECTOR DE EVASIÓN",
    module: "NumPy (Álgebra)",
    difficulty: "Medio",
    story: "Un escombro se dirige a la nave. Tenemos su posición (Vector P) y Velocidad (Vector V). Calcula el coseno del ángulo de impacto para saber si nos dará de lleno.",
    problem: `
# TAREA: Calcular Coseno del Ángulo (Similitud Coseno)
# Fórmula: (P . V) / (||P|| * ||V||)
# Donde '.' es producto punto y '||x||' es la norma (magnitud) del vector.

import numpy as np

def calculate_impact_risk(P, V):
    # 1. Calcula producto punto (dot product)
    # 2. Calcula las normas de P y V
    # 3. Divide el producto punto por el producto de las normas
    # PISTA: Si la norma es 0, retorna 0.0 para evitar dividir por cero.
    return 0.0 

P = np.array([10, 20, 50])
V = np.array([-5, -2, -10])
print("Riesgo calculado:", calculate_impact_risk(P, V))
    `,
    requirements: [
      { pattern: /np\.dot|@/, hint: "💡 Pista: Para el producto punto usa `np.dot(a, b)` o el operador `@`." },
      { pattern: /np\.linalg\.norm/, hint: "💡 Pista: La magnitud de un vector se calcula con `np.linalg.norm(vector)`." }
    ],
    validationCode: `
import numpy as np

_all_passed = True
def check(step_name, condition, success_msg, error_msg):
    global _all_passed
    if condition:
        print(f"✅ {step_name}: {success_msg}")
    else:
        print(f"❌ {step_name}: {error_msg}")
        _all_passed = False

print("--- 🚀 ANALIZANDO TRAYECTORIA ---")

try:
    P = np.array([10, 20, 50])
    V = np.array([-5, -2, -10])
    
    try:
        res = calculate_impact_risk(P, V)
    except ZeroDivisionError:
        print("❌ Error Matemático: ¡División por cero detectada!\\n   ➜ Asegúrate de no dividir si la norma es 0.")
        res = None
        _all_passed = False
    except Exception as e:
        print(f"❌ Error de Ejecución: {e}")
        res = None
        _all_passed = False

    if res is not None:
        # Validar resultado por defecto
        if res == 0.0 and np.dot(P,V) != 0:
             check("Implementación", False, "", "La función devolvió 0.0 sin calcular nada. ¡Intenta implementar la fórmula!")
        else:
            expected = np.dot(P, V) / (np.linalg.norm(P) * np.linalg.norm(V))
            es_correcto = np.isclose(res, expected)
            
            check("Cálculo del Coseno", es_correcto, 
                  "El ángulo calculado es perfecto.", 
                  f"El resultado {res:.4f} es incorrecto.\\n      ➜ Debería ser {expected:.4f}.\\n      ➜ Revisa: (P punto V) / (norma P * norma V)")

    # Caso Especial: División por cero
    P0 = np.array([0,0,0])
    try:
        res0 = calculate_impact_risk(P0, V)
        # Si no crashea y da algo razonable (0 o nan)
    except ZeroDivisionError:
         print("⚠️ Alerta: Tu código crashea si un vector es [0,0,0]. Deberías manejar ese caso.")

except Exception as e:
    print(f"❌ Error Crítico: {e}")
    _all_passed = False
    `,
    successMsg: "EVASIÓN EXITOSA. MOTORES AL 100%.",
    testOutput: ""
  },
  {
    id: 3,
    title: "LIMPIEZA DE SOPORTE VITAL",
    module: "Pandas (Limpieza)",
    difficulty: "Medio",
    story: "Los logs de oxígeno tienen huecos (NaN) y errores falsos. Necesitamos limpiar la data para saber si estamos seguros. El nivel de oxígeno debe ser mayor a 18.0.",
    problem: `
# TAREA: Limpiar DataFrame y crear columna de seguridad
# 1. Elimina filas donde 'oxygen_level' sea NaN (vacío).
# 2. Elimina filas donde 'status' sea exactamente 'ERROR'.
# 3. Crea columna 'is_safe': True si 'oxygen_level' > 18.0, sino False.

import pandas as pd
import numpy as np

def clean_life_support_data(df_logs):
    # Escribe tu lógica aquí
    return df_logs

# Datos de ejemplo para que pruebes
data = {
    'oxygen_level': [20.5, np.nan, 15.0, 19.2],
    'status': ['OK', 'ERROR', 'OK', 'OK']
}
df = pd.DataFrame(data)
print(clean_life_support_data(df.copy()))
    `,
    requirements: [
      { pattern: /\.dropna/, hint: "💡 Pista: Usa `.dropna()` para eliminar filas con datos faltantes (NaN)." },
      { pattern: /!=|~/, hint: "💡 Pista: Para filtrar los 'ERROR', usa una condición de desigualdad `df['status'] != 'ERROR'`." },
      { pattern: />/, hint: "💡 Pista: Necesitas el operador mayor que `>` para la columna 'is_safe'." }
    ],
    validationCode: `
import pandas as pd
import numpy as np

_all_passed = True
def check(step_name, condition, success_msg, error_msg):
    global _all_passed
    if condition:
        print(f"✅ {step_name}: {success_msg}")
    else:
        print(f"❌ {step_name}: {error_msg}")
        _all_passed = False

print("--- 🧹 INICIANDO PROTOCOLO DE LIMPIEZA ---")

try:
    data = {
        'oxygen_level': [20.5, np.nan, 15.0, 19.2, 21.0],
        'status': ['OK', 'ERROR', 'OK', 'OK', 'ERROR']
    }
    df_input = pd.DataFrame(data)
    
    try:
        res = clean_life_support_data(df_input.copy())
    except Exception as e:
        print(f"❌ Tu código falló al ejecutarse: {e}")
        res = None
        _all_passed = False

    if res is not None:
        if not isinstance(res, pd.DataFrame):
            check("Tipo de Retorno", False, "", "La función debe devolver un DataFrame de Pandas.")
        else:
            # 1. Check NaNs
            nans_left = res['oxygen_level'].isnull().sum()
            check("Eliminación de Vacíos", nans_left == 0, 
                  "No hay valores nulos.", 
                  f"Aún quedan {nans_left} filas con NaN.\\n      ➜ Usa: df.dropna(subset=['oxygen_level'])")

            # 2. Check Filtro ERROR
            errors_left = len(res[res['status'] == 'ERROR'])
            check("Filtro de Estados", errors_left == 0, 
                  "Filas con 'ERROR' eliminadas.", 
                  "Aún veo filas con status 'ERROR'.\\n      ➜ Filtra el DataFrame: df[df['status'] != 'ERROR']")

            # 3. Check Columna is_safe
            if 'is_safe' not in res.columns:
                check("Nueva Columna", False, "", "No encontré la columna 'is_safe'.\\n      ➜ Créala así: df['is_safe'] = df['oxygen_level'] > 18.0")
            else:
                # Verificar lógica
                malos = res[res['oxygen_level'] <= 18.0]
                if len(malos) > 0 and malos.iloc[0]['is_safe']:
                     check("Lógica de Seguridad", False, "", "Marcaste como SEGURO un nivel bajo de oxígeno (<= 18.0). Revisa tu condición (>)")
                else:
                     check("Lógica de Seguridad", True, "Cálculo de seguridad correcto.", "")

except Exception as e:
    print(f"❌ Error Crítico: {e}")
    _all_passed = False
    `,
    successMsg: "AIRE PURO RESTAURADO. NIVEL DE OXÍGENO ESTABLE.",
    testOutput: ""
  },
  {
    id: 4,
    title: "ANÁLISIS DEL REACTOR",
    module: "Pandas (Agregación)",
    difficulty: "Difícil",
    story: "Necesitamos identificar qué módulo consume más energía. Agrupa los datos por módulo y calcula el máximo consumo de cada uno.",
    problem: `
# TAREA: Agrupar y Ordenar
# 1. Agrupa el DataFrame por 'module_id'.
# 2. Para cada grupo, calcula el 'max' y 'mean' (promedio) de 'consumption_mw'.
#    (Tip: usa .agg({'consumption_mw': ['mean', 'max']}))
# 3. Ordena los resultados para que el que tenga el MAX mayor salga primero.

import pandas as pd

def analyze_reactor_load(df_energy):
    # Tu código aquí
    return pd.DataFrame()

# Datos de prueba
data = {
    'module_id': ['A', 'A', 'B', 'B', 'C'],
    'consumption_mw': [100, 120, 500, 510, 50]
}
print(analyze_reactor_load(pd.DataFrame(data)))
    `,
    requirements: [
      { pattern: /\.groupby/, hint: "💡 Pista: La clave aquí es `.groupby('module_id')` para separar los datos." },
      { pattern: /\.agg|\.mean|\.max/, hint: "💡 Pista: Usa `.agg()` o `.mean()` / `.max()` para calcular las estadísticas." },
      { pattern: /\.sort_values/, hint: "💡 Pista: No olvides ordenar el resultado con `.sort_values()`." }
    ],
    validationCode: `
import pandas as pd
import numpy as np

_all_passed = True
def check(step_name, condition, success_msg, error_msg):
    global _all_passed
    if condition:
        print(f"✅ {step_name}: {success_msg}")
    else:
        print(f"❌ {step_name}: {error_msg}")
        _all_passed = False

print("--- ☢️ ANALIZANDO NÚCLEO ---")

try:
    data = {
        'module_id': ['A', 'A', 'B', 'B', 'C', 'C'],
        'consumption_mw': [100, 120, 500, 510, 50, 60]
    }
    df = pd.DataFrame(data)
    
    try:
        res = analyze_reactor_load(df)
    except Exception as e:
        print(f"❌ Error de ejecución: {e}")
        res = None
        _all_passed = False
    
    if res is not None and isinstance(res, pd.DataFrame):
        if len(res) == 0:
             check("Datos Resultantes", False, "", "El DataFrame resultante está vacío.")
        else:
            # 1. Check Agrupación
            check("Agrupación", len(res) == 3, 
                  "Grupos correctos (A, B, C).", 
                  f"Se esperaban 3 filas (una por módulo), pero obtuvimos {len(res)}. ¿Hiciste el groupby?")
            
            # 2. Check Valores (Busqueda agnóstica)
            vals = res.values.flatten()
            found_max = any([np.isclose(x, 510) for x in vals if isinstance(x, (int, float))])
            check("Cálculo de Máximos", found_max, 
                  "Valores máximos identificados.", 
                  "No encuentro el valor 510 (Max de B). Revisa tu función de agregación.")

            # 3. Check Orden
            try:
                # La primera fila debe tener algo relacionado con B (510 o 505)
                first_vals = res.iloc[0].values.flatten()
                is_b = any([np.isclose(x, 510) for x in first_vals if isinstance(x, (int, float))])
                check("Ordenamiento", is_b, 
                      "El módulo más consumidor está primero.", 
                      "El módulo B (consumo 510) debería estar en la primera fila.\\n      ➜ Usa: .sort_values(..., ascending=False)")
            except:
                pass
    else:
        check("Retorno", False, "", "Debes retornar un DataFrame.")

except Exception as e:
    print(f"❌ Error Crítico: {e}")
    _all_passed = False
    `,
    successMsg: "MÓDULO 'B' DESCONECTADO. TEMPERATURA DEL NÚCLEO DESCENDIENDO.",
    testOutput: ""
  },
  {
    id: 5,
    title: "VISUALIZACIÓN DE MOTORES",
    module: "Matplotlib",
    difficulty: "Difícil",
    story: "Necesitamos una cuadrícula de 2x2 gráficos para ver los 4 motores a la vez. Crea la figura y asegúrate de que cada subgráfico tenga datos.",
    problem: `
# TAREA: Crear Subplots
# 1. Crea una figura con 2 filas y 2 columnas: plt.subplots(2, 2)
# 2. Plotea los datos en cada eje (axs[0,0], axs[0,1], etc.)
# 3. Retorna el objeto 'fig'.

import matplotlib.pyplot as plt

def visualize_engine_heat(timestamps, t1, t2, t3, t4):
    fig, axs = plt.subplots(1, 1) # <--- ¡CORRIGE ESTO! Necesitamos 2x2
    
    # axs[0,0].plot(timestamps, t1) ... completa el resto
    
    return fig
    `,
    requirements: [
      { pattern: /plt\.subplots\(\s*2\s*,\s*2/, hint: "💡 Pista: La función `plt.subplots(2, 2)` crea la cuadrícula que necesitamos." },
      { pattern: /\.plot/, hint: "💡 Pista: Debes llamar a `.plot()` en cada uno de los 4 ejes (axs)." }
    ],
    validationCode: `
import matplotlib.pyplot as plt

_all_passed = True
def check(step_name, condition, success_msg, error_msg):
    global _all_passed
    if condition:
        print(f"✅ {step_name}: {success_msg}")
    else:
        print(f"❌ {step_name}: {error_msg}")
        _all_passed = False

print("--- 📊 GENERANDO PANELES DE CONTROL ---")

try:
    ts = [1,2,3]
    t = [10,20,30]
    plt.close('all') 
    
    try:
        fig = visualize_engine_heat(ts, t, t, t, t)
    except Exception as e:
         print(f"❌ Error dibujando gráficos: {e}")
         fig = None
         _all_passed = False
    
    if fig is None:
        check("Objeto Figura", False, "", "La función no retornó la figura ('fig'). Asegúrate de poner 'return fig' al final.")
    else:
        # 1. Estructura
        num_axes = len(fig.axes)
        check("Estructura 2x2", num_axes == 4, 
              "Cuadrícula de 4 gráficos creada.", 
              f"Encontré {num_axes} gráficos, pero necesitamos 4 (2 filas x 2 columnas).")
        
        # 2. Contenido
        plots_llenos = sum([1 for ax in fig.axes if len(ax.lines) > 0])
        check("Datos Ploteados", plots_llenos == 4, 
              "Todos los motores tienen datos visibles.", 
              f"Solo {plots_llenos} de los 4 gráficos tienen líneas dibujadas. ¡Faltan plotear motores!")

except Exception as e:
    print(f"❌ Error Crítico: {e}")
    _all_passed = False
    `,
    successMsg: "VISUALIZACIÓN ESTABLECIDA. SOBRECALENTAMIENTO AISLADO.",
    testOutput: ""
  },
  {
    id: 6,
    title: "NIVEL FINAL: MATERIA OSCURA",
    module: "Full Stack Pandas",
    difficulty: "Extremo",
    story: "¡CRÍTICO! Debemos inyectar materia oscura al núcleo. Tienes registros de presión y flujo. Encuentra la estabilidad promedio de las inyecciones seguras.",
    problem: `
# MISIÓN FINAL: ANÁLISIS MULTI-FASE
# DataFrame 'df' tiene: ['pressure', 'flow', 'status', 'stability']
#
# 1. FILTRAR: Mantén solo filas donde 'status' sea 'NOMINAL'.
# 2. CALCULAR: Crea columna 'power' = pressure * flow
# 3. FILTRAR RANGO: Mantén solo donde 'power' sea >= 1000 Y <= 3000.
# 4. RETORNAR: El promedio (mean) de la columna 'stability' resultante.

import pandas as pd
import numpy as np

def analyze_dark_matter(df):
    # Tu código maestro aquí:
    return 0.0

# Datos de prueba
data = {
    'pressure': [100, 200, 100, 500],
    'flow':     [10,  10,  5,   10],
    'status':   ['NOMINAL', 'NOMINAL', 'WARNING', 'NOMINAL'],
    'stability':[80,  90,  40,  20]
}
# P1(100*10=1000, NOMINAL) -> OK
# P2(200*10=2000, NOMINAL) -> OK
# P3(WARNING) -> RECHAZADO
# P4(500*10=5000, NOMINAL) -> RECHAZADO (Exceso de poder)
# Promedio estabilidad de P1 y P2 = (80+90)/2 = 85

print("Estabilidad Predicha:", analyze_dark_matter(pd.DataFrame(data)))
    `,
    requirements: [
      { pattern: /==\s*['"]NOMINAL['"]/, hint: "💡 Pista: Filtra el status usando `df[df['status'] == 'NOMINAL']`." },
      { pattern: /\*|prod/, hint: "💡 Pista: Multiplica las columnas `pressure * flow` para obtener la potencia." },
      { pattern: />=|<=|&|between/, hint: "💡 Pista: Usa condiciones compuestas `(df['power'] >= 1000) & (df['power'] <= 3000)`." },
      { pattern: /\.mean/, hint: "💡 Pista: Al final, calcula el `.mean()` de la columna stability." }
    ],
    validationCode: `
import pandas as pd
import numpy as np

_all_passed = True
def check(step_name, condition, success_msg, error_msg):
    global _all_passed
    if condition:
        print(f"✅ {step_name}: {success_msg}")
    else:
        print(f"❌ {step_name}: {error_msg}")
        _all_passed = False

print("--- 🌌 INICIANDO SECUENCIA DE INYECCIÓN ---")

try:
    # Dataset de Validación
    data = {
        'pressure': [100, 150, 500, 100, 300, 50],
        'flow':     [10,  20,  10,  10,  5,   10],
        'status':   ['NOMINAL', 'NOMINAL', 'NOMINAL', 'CRITICAL', 'NOMINAL', 'NOMINAL'],
        'stability':[85,  95,  10,  50,  90,  60]
    }
    # Análisis esperado:
    # 1. (100, 10, NOMINAL) -> Power 1000 -> OK. Stab: 85
    # 2. (150, 20, NOMINAL) -> Power 3000 -> OK. Stab: 95
    # 3. (500, 10, NOMINAL) -> Power 5000 -> OUT (Too High).
    # 4. (100, 10, CRITICAL)-> OUT (Status).
    # 5. (300, 5,  NOMINAL) -> Power 1500 -> OK. Stab: 90
    # 6. (50,  10, NOMINAL) -> Power 500  -> OUT (Too Low).
    
    # Filas válidas: 1, 2, 5.
    # Stabilities: 85, 95, 90. Promedio = 90.0
    
    df = pd.DataFrame(data)
    
    try:
        res = analyze_dark_matter(df.copy())
    except Exception as e:
        print(f"❌ Error de Ejecución: {e}")
        res = None
        _all_passed = False

    if res is not None:
        # Validar resultado numérico
        expected = 90.0
        
        if not isinstance(res, (int, float, np.number)):
             check("Tipo de Retorno", False, "", f"Esperaba un número (promedio), pero recibí {type(res)}.")
        elif res == 0.0:
             check("Cálculo", False, "", "El resultado es 0.0. Parece que no has implementado la lógica aún.")
        else:
             # Diagnóstico inteligente de errores comunes
             # Error 1: No filtrar Status
             mean_no_status = 73.33 # Si incluyen CRITICAL
             # Error 2: No filtrar Power Range
             mean_no_range = 63.33 # Si incluyen todo lo NOMINAL (incluye power 5000 y 500)
             
             if np.isclose(res, expected):
                 check("Cálculo de Estabilidad", True, "¡Cálculo perfecto! Inyección estable.", "")
             elif np.isclose(res, 63.33, atol=1.0):
                 check("Filtros de Potencia", False, "", "El resultado es incorrecto. PARECE QUE OLVIDASTE FILTRAR EL RANGO DE PODER (1000-3000).")
             elif np.isclose(res, 73.33, atol=1.0):
                 check("Filtro de Estado", False, "", "El resultado es incorrecto. PARECE QUE OLVIDASTE FILTRAR 'NOMINAL'.")
             else:
                 check("Resultado Final", False, "", f"Obtenido: {res:.2f}. Esperado: {expected:.2f}. Revisa paso a paso tus filtros.")

except Exception as e:
    print(f"❌ Error Crítico: {e}")
    _all_passed = False
    `,
    successMsg: "INYECCIÓN DE MATERIA OSCURA EXITOSA. SINGULARIDAD ESTABILIZADA.",
    testOutput: ""
  }
];

// --- COMPONENTS ---

const LevelButton = ({ level, currentLevel, completedLevels, onClick }) => {
  const maxCompletedId = Math.max(...completedLevels, 0);
  const isLocked = level.id > (maxCompletedId + 1) && !completedLevels.includes(level.id); 
  const isCompleted = completedLevels.includes(level.id);
  const isActive = level.id === currentLevel;

  let baseClasses = "w-full flex items-center justify-between p-4 mb-2 border-l-2 transition-all duration-300 relative overflow-hidden group";
  let statusClasses = "border-gray-800 text-gray-500 bg-gray-900/30 hover:bg-gray-800/50";
  
  if (isCompleted) statusClasses = "border-green-500 text-green-400 bg-green-900/20";
  if (isActive) statusClasses = "border-cyan-400 text-cyan-300 bg-cyan-900/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]";
  if (isLocked) statusClasses = "border-red-900/30 text-red-900/40 bg-transparent cursor-not-allowed";

  const isDisabled = isLocked; 

  return (
    <button
      onClick={() => !isDisabled && onClick(level.id)}
      disabled={isDisabled}
      className={`${baseClasses} ${statusClasses}`}
    >
      {!isDisabled && <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>}
      
      <div className="flex items-center gap-4 z-10">
        <div className={`p-2 rounded-sm ${isDisabled ? 'bg-gray-900/50' : isActive ? 'bg-cyan-900/40 text-cyan-200' : 'bg-gray-800/50'}`}>
          {isDisabled ? <Lock size={14} /> : isCompleted ? <CheckCircle size={14} /> : <Activity size={14} />}
        </div>
        <div className="text-left">
          <div className="text-[10px] font-bold tracking-widest opacity-60 uppercase mb-0.5">Sector 0{level.id}</div>
          <div className={`font-mono text-sm font-semibold ${isActive ? 'text-white' : ''}`}>{level.title}</div>
        </div>
      </div>
      {!isDisabled && <ChevronRight size={16} className={`transition-transform group-hover:translate-x-1 ${isActive ? 'text-cyan-400' : 'opacity-50'}`} />}
    </button>
  );
};

const CodeEditor = ({ code, setCode }) => {
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newCode = code.substring(0, selectionStart) + "    " + code.substring(selectionEnd);
      setCode(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = selectionStart + 4;
          textareaRef.current.selectionEnd = selectionStart + 4;
        }
      }, 0);
    }
  };

  const lineCount = code.split('\n').length;
  const minHeightForLines = lineCount * 24 + 16; 

  return (
    <div className="relative w-full h-full flex flex-col bg-gray-950 rounded-lg overflow-hidden border border-gray-800 shadow-2xl ring-1 ring-white/5">
      <div className="bg-[#0a0a0a] text-gray-400 text-xs px-4 py-2 flex items-center justify-between border-b border-gray-800 select-none">
        <span className="flex items-center gap-2 text-green-500/80"><Code size={14} /> solution.py</span>
        <span className="flex items-center gap-2 opacity-50"><Radio size={10} className="animate-pulse text-red-500"/> LIVE KERNEL</span>
      </div>
      <div className="relative flex-1">
        <div 
          className="absolute left-0 top-0 bottom-0 w-10 bg-[#050505] border-r border-gray-800 flex flex-col items-end pt-4 pr-2 text-gray-700 font-mono text-sm select-none pointer-events-none z-10"
          style={{ minHeight: `${minHeightForLines}px` }}
        >
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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
      
      <div className="text-gray-500 mb-3 flex items-center gap-2 border-b border-gray-900 pb-2 sticky top-0 bg-[#050505]/90 backdrop-blur z-10">
        <Terminal size={12} /> PYODIDE_KERNEL_OUTPUT // :5050
      </div>
      <div className="relative z-0 space-y-1 whitespace-pre-wrap">
        {logs.map((log, idx) => (
          <div key={idx} className={`font-mono ${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : log.type === 'warning' ? 'text-yellow-400' : log.type === 'system' ? 'text-blue-400' : 'text-gray-300'}`}>
            <span className="opacity-30 mr-3 text-[10px] select-none">{log.time}</span>
            {log.msg}
          </div>
        ))}
        {status === 'running' && (
          <div className="text-yellow-500 animate-pulse mt-2 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full"></span>
            EJECUTANDO EN KERNEL PYTHON (WASM)...
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
  const [savedCode, setSavedCode] = useState({});
  
  // Pyodide State
  const [pyodide, setPyodide] = useState(null);
  const [isPyodideLoading, setIsPyodideLoading] = useState(true);

  const LS_COMPLETED_KEY = 'cortex_completed_levels_v2';
  const LS_CODE_KEY = 'cortex_saved_code_v2';
  
  // --- INITIALIZATION & PYODIDE LOADING ---
  useEffect(() => {
    // Cargar Script de Pyodide
    const loadPyodideScript = async () => {
      try {
        setConsoleLogs([{ time: "BOOT", type: 'system', msg: "INICIALIZANDO ENTORNOS VIRTUALES..." }]);
        
        // Check if script is already there
        if (!document.querySelector('script[src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"]')) {
            const script = document.createElement('script');
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
            script.async = true;
            document.body.appendChild(script);
            
            script.onload = async () => {
                await initPyodide();
            };
        } else {
            if(window.loadPyodide && !pyodide) {
                await initPyodide();
            }
        }

      } catch (e) {
        console.error("Pyodide load error", e);
        setConsoleLogs(prev => [...prev, { time: "ERR", type: 'error', msg: "FALLO AL CARGAR KERNEL PYTHON." }]);
      }
    };

    const initPyodide = async () => {
        try {
            const pyodideInstance = await window.loadPyodide();
            setConsoleLogs(prev => [...prev, { time: "SYS", type: 'system', msg: "PYTHON 3.11 CARGADO. INSTALANDO LIBRERÍAS..." }]);
            
            await pyodideInstance.loadPackage(['numpy', 'pandas', 'matplotlib']);
            
            setPyodide(pyodideInstance);
            setIsPyodideLoading(false);
            setConsoleLogs(prev => [...prev, { time: "SYS", type: 'success', msg: "LIBRERÍAS CIENTÍFICAS LISTAS.\nESPERANDO COMANDOS." }]);
        } catch (err) {
            console.error(err);
            setConsoleLogs(prev => [...prev, { time: "ERR", type: 'error', msg: `ERROR DE INICIALIZACIÓN: ${err.message}` }]);
        }
    };

    loadPyodideScript();

    // Load LocalStorage
    try {
      const storedCompleted = localStorage.getItem(LS_COMPLETED_KEY);
      if (storedCompleted) setCompletedLevels(JSON.parse(storedCompleted));
      
      const storedCode = localStorage.getItem(LS_CODE_KEY);
      if (storedCode) setSavedCode(JSON.parse(storedCode));

    } catch (e) {
      console.error("Error loading LS:", e);
    }
  }, []);

  // Save logic
  useEffect(() => {
    localStorage.setItem(LS_COMPLETED_KEY, JSON.stringify(completedLevels));
  }, [completedLevels]);

  useEffect(() => {
    if (currentLevelId !== null) {
      setSavedCode(prev => {
        const newSavedCode = { ...prev, [currentLevelId]: code };
        localStorage.setItem(LS_CODE_KEY, JSON.stringify(newSavedCode));
        return newSavedCode;
      });
    }
  }, [code, currentLevelId]);

  // Level switching
  useEffect(() => {
    if (currentLevelId) {
      const level = LEVELS.find(l => l.id === currentLevelId);
      const initialCode = savedCode[currentLevelId] || level.problem.trim();
      setCode(initialCode);

      setConsoleLogs([{
        time: new Date().toLocaleTimeString([], { hour12: false }),
        type: 'system',
        msg: `SISTEMA INICIADO. MÓDULO: ${level.module}\nPYTHON ENVIRONMENT: ACTIVE`
      }]);
      setStatus('idle');
    }
  }, [currentLevelId]);


  // --- EXECUTION LOGIC WITH PYODIDE ---
  const runCode = async () => {
    if (!pyodide) {
        alert("Python aún se está cargando. Espera un momento.");
        return;
    }

    const level = LEVELS.find(l => l.id === currentLevelId);

    // 0. VERIFICACIÓN DE CÓDIGO ESTÁTICO (REGEX)
    // Antes de correr Python, revisamos si están usando las funciones correctas
    let missingRequirements = [];
    if (level.requirements) {
      level.requirements.forEach(req => {
        if (!req.pattern.test(code)) {
          missingRequirements.push(req.hint);
        }
      });
    }

    if (missingRequirements.length > 0) {
      // Si faltan requerimientos, avisamos pero NO detenemos (a veces la regex falla con comentarios)
      // Pero es mejor mostrarlos claramente
      const time = new Date().toLocaleTimeString([], { hour12: false });
      setConsoleLogs(prev => [...prev, { 
          time, 
          type: 'warning', 
          msg: `⚠️ ALERTA DE ANÁLISIS DE CÓDIGO:\n${missingRequirements.join('\n')}` 
      }]);
    }

    setStatus('running');
    setConsoleLogs(prev => [...prev, { time: "RUN", type: 'info', msg: '>>> Ejecutando script...' }]);

    try {
        // Reset stdout buffer
        pyodide.setStdout({ batched: (msg) => {
            const time = new Date().toLocaleTimeString([], { hour12: false });
            
            if (msg === "TEST_PASSED" || msg === "TEST_FAILED") return; 
            if (msg.includes("_all_passed")) return;

            let type = 'info';
            if (msg.startsWith("✅")) type = 'success';
            if (msg.startsWith("❌")) type = 'error';
            if (msg.startsWith("⚠️")) type = 'warning';
            
            setConsoleLogs(prev => [...prev, { time, type, msg }]);
        }});
        
        pyodide.setStderr({ batched: (msg) => {
            const time = new Date().toLocaleTimeString([], { hour12: false });
            setConsoleLogs(prev => [...prev, { time, type: 'error', msg: msg }]);
        }});

        // 1. Run User Code to define functions
        await pyodide.runPythonAsync(code);

        // 2. Run Validation Code
        await pyodide.runPythonAsync(level.validationCode);
        
    } catch (err) {
        const time = new Date().toLocaleTimeString([], { hour12: false });
        setConsoleLogs(prev => [...prev, { time, type: 'error', msg: `ERROR DE PYTHON: ${err.message}` }]);
        setStatus('error');
        return;
    }

    // Verificar estado de la variable global _all_passed
    try {
        const passed = await pyodide.runPythonAsync("_all_passed");
        
        if (passed) {
            setStatus('success');
            setConsoleLogs(prev => [
                ...prev,
                { time: "SYS", type: 'success', msg: `\n${level.testOutput}\n\nACCESS GRANTED: ${level.successMsg}` }
            ]);
            if (!completedLevels.includes(level.id)) {
              setCompletedLevels(prev => [...prev, level.id]);
            }
        } else {
            setStatus('error');
        }
    } catch (e) {
         setStatus('error');
    }

  };

  const startLevel = (id) => {
    setCurrentLevelId(id);
    setShowIntro(false);
  };

  // --- INTRO SCREEN ---
  if (showIntro) {
    const maxCompletedId = Math.max(...completedLevels, 0);
    const nextLevelToStart = maxCompletedId === 6 ? 1 : maxCompletedId + 1;
    
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-[#050505] to-black text-white font-sans flex flex-col items-center justify-center p-8 relative overflow-hidden">
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
            <div className="flex items-center gap-2 mt-2">
                 <p className="text-sm tracking-[0.5em] text-green-500 uppercase">Protocolo Pyodide v0.23</p>
                 {isPyodideLoading ? <Loader size={14} className="animate-spin text-yellow-500"/> : <CheckCircle size={14} className="text-green-500"/>}
            </div>
          </div>
          
          <div className="space-y-6 text-gray-300 font-light leading-relaxed text-lg text-center max-w-2xl mx-auto">
            <p>
              <strong className="text-white font-normal">Alerta Prioritaria:</strong> La Estación Hephaestus ha cesado comunicaciones. CORTEX, el sistema de IA de la estación, se ha vuelto malvado debido a una corrupción en su núcleo de datos, y ha activado protocolos de autodestrucción.
            </p>
            <p>
              Hemos inyectado un intérprete de Python en tu navegador. Úsalo para restaurar los sistemas. Eres nuestra única esperanza.
              {isPyodideLoading && <span className="block text-xs text-yellow-500 mt-2 animate-pulse">CARGANDO LIBRERÍAS CIENTÍFICAS (NumPy, Pandas)...</span>}
            </p>
          </div>

          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => startLevel(nextLevelToStart)}
              disabled={isPyodideLoading}
              className={`group relative px-8 py-4 border transition-all duration-300 rounded overflow-hidden ${isPyodideLoading ? 'bg-gray-800 border-gray-700 cursor-wait opacity-50' : 'bg-green-900/20 border-green-500/30 text-green-400 hover:text-white hover:bg-green-600 hover:border-green-500'}`}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              <span className="relative flex items-center gap-3 font-mono tracking-widest text-sm font-bold">
                <Terminal size={18} /> {isPyodideLoading ? 'INICIALIZANDO...' : 'INICIAR CONEXIÓN'}
              </span>
            </button>
          </div>
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
             <span className={`w-2 h-2 rounded-full ${isPyodideLoading ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`}></span> 
             {isPyodideLoading ? 'CARGANDO KERNEL...' : 'KERNEL ESTABLE'}
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
             <span>MEMORY</span>
             <span className="text-green-500">WASM ALLOC</span>
           </div>
           <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
             <div className="h-full bg-green-600 w-[45%] animate-pulse"></div>
           </div>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-black">
        <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 z-0"></div>
        
        {/* HEADER BAR */}
        <div className="h-14 bg-black/40 backdrop-blur-md border-b border-gray-800/50 flex items-center justify-between px-6 z-10 sticky top-0">
          <div className="flex items-center gap-4">
             <div className="h-6 w-1 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
             <h2 className="font-mono text-lg text-white tracking-wider uppercase">{currentLevelData.title}</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
               <span className="text-[10px] text-gray-500 uppercase tracking-widest">Módulo Python</span>
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
                <p className="text-sm leading-7 text-gray-300 font-light font-mono border-l border-green-900/50 pl-4 text-justify whitespace-pre-line">
                  {currentLevelData.story}
                </p>
              </div>

              <div className="bg-black/40 p-4 rounded border border-white/5">
                <h3 className="text-cyan-400 font-bold mb-3 text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <Activity size={12} /> Objetivo
                </h3>
                <p className="text-xs text-gray-400 font-mono leading-relaxed">
                    {currentLevelData.id === 1 ? "Normaliza los datos. El sistema te guiará si cometes errores." : "Completa la función en Python. Revisa la consola para ver diagnósticos detallados."}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: IDE */}
          <div className="w-2/3 flex flex-col gap-4">
            <div className="flex-1 relative shadow-2xl">
              <CodeEditor code={code} setCode={setCode} />
              
              <button
                onClick={runCode}
                disabled={status === 'running' || status === 'success' || isPyodideLoading}
                className={`absolute bottom-6 right-8 z-20 group overflow-hidden rounded-sm transition-all duration-300 ${
                  status === 'success' 
                    ? 'bg-green-600 cursor-default ring-2 ring-green-400/50' 
                    : isPyodideLoading
                    ? 'bg-gray-700 cursor-wait'
                    : 'bg-cyan-700 hover:bg-cyan-600 ring-1 ring-cyan-400/30 hover:ring-cyan-300'
                }`}
              >
                <div className="px-6 py-3 flex items-center gap-3 font-mono font-bold text-sm text-white relative z-10">
                  {status === 'running' || isPyodideLoading ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> {isPyodideLoading ? 'CARGANDO...' : 'PROCESANDO'}</>
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

        {/* SUCCESS MODAL */}
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
               Código verificado por Pyodide Kernel. Integridad estructural 100%.
             </p>
             <button 
                 onClick={() => {setCompletedLevels([]); startLevel(1); setShowIntro(true);}}
                 className="mt-8 text-gray-500 hover:text-white text-xs uppercase tracking-widest hover:underline transition-all"
               >
                 Reiniciar Simulación
             </button>
           </div>
        )}
      </div>
    </div>
  );
}