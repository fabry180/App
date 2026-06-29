import streamlit as st
import pandas as pd
import datetime

# Configurazione Pagina
st.set_page_config(page_title="Life Performance Tracker", page_icon="⚡", layout="wide")
st.title("⚡ Life Performance Tracker")
st.write("Monitora e ottimizza la tua vita: Corpo, Mente e Finanze.")

# --- SIDEBAR PER INPUT GIORNALIERI ---
st.sidebar.header("📝 Inserisci i Dati di Oggi")

# Input Fisica
st.sidebar.subheader("🏃 Attività Fisica")
passi = st.sidebar.number_input("Passi effettuati", min_value=0, value=6000, step=500)
allenamento = st.sidebar.checkbox("Ti sei allenato oggi?")

# Input Economia
st.sidebar.subheader("💰 Economia")
entrate = st.sidebar.number_input("Entrate oggi (€)", min_value=0.0, value=0.0)
uscite = st.sidebar.number_input("Uscite oggi (€)", min_value=0.0, value=0.0)

# Input Conoscenza
st.sidebar.subheader("📚 Conoscenza")
pagine = st.sidebar.number_input("Pagine lette", min_value=0, value=0)
studio_minuti = st.sidebar.number_input("Minuti di studio/corsi", min_value=0, value=0, step=5)

# --- CALCOLO METRICHE & TARGET ---
# Target arbitrari per calcolare i progressi
TARGET_PASSI = 10000
TARGET_PAGINE = 15
TARGET_STUDIO = 45

progresso_fisico = min(passi / TARGET_PASSI, 1.0) if not allenamento else 1.0
progresso_mente = min(((pagine/TARGET_PAGINE) + (studio_minuti/TARGET_STUDIO)) / 2, 1.0)
bilancio_oggi = entrate - uscite

# --- DASHBOARD PRINCIPALE ---
col1, col2, col3 = st.columns(3)

with col1:
    st.markdown("### 🏃 Corpo")
    st.metric(label="Passi", value=f"{passi} / {TARGET_PASSI}")
    st.progress(progresso_fisico)
    if allenamento:
        st.success("💪 Allenamento Completato!")

with col2:
    st.markdown("### 💰 Finanze")
    st.metric(label="Bilancio Odierno", value=f"{bilancio_oggi:.2f} €", delta=f"{-uscite:.2f} € Uscite")
    if bilancio_oggi >= 0:
        st.caption("🟢 Oggi sei in attivo o in pareggio.")
    else:
        st.caption("🔴 Oggi hai speso più di quanto hai incassato.")

with col3:
    st.markdown("### 📚 Mente")
    st.metric(label="Studio", value=f"{studio_minuti} min", delta=f"{pagine} pagine lette")
    st.progress(progresso_mente)

st.markdown("---")

# --- STORICO E LOGICA DI SALVATAGGIO (Simulata) ---
st.subheader("📈 Andamento Settimanale (Esempio)")
# Dati dimostrativi per il grafico
dati_esempio = pd.DataFrame({
    'Giorno': ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
    'Performance Fisica (%)': [80, 100, 60, 90, 100, 40, 50],
    'Risparmio (€)': [20, -5, 15, 40, -12, 100, -20],
    'Minuti Studio': [30, 45, 15, 60, 0, 90, 45]
})

tab1, tab2, tab3 = st.tabs(["Focus Salute", "Focus Finanze", "Focus Studio"])
with tab1:
    st.line_chart(dati_esempio, x='Giorno', y='Performance Fisica (%)')
with tab2:
    st.bar_chart(dati_esempio, x='Giorno', y='Risparmio (€)')
with tab3:
    st.line_chart(dati_esempio, x='Giorno', y='Minuti Studio')