import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Layout from './components/Layout';
import Toast from './components/Toast';
import ModalPerfil from './components/ModalPerfil';
import ModalMeta from './components/ModalMeta';
import ModalSolicitar from './components/ModalSolicitar';
import ModalAuth from './components/ModalAuth';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import HorariosPage from './pages/HorariosPage';
import GestaoMetasPage from './pages/GestaoMetasPage';
import AlertasPage from './pages/AlertasPage';
import RelatorioPage from './pages/RelatorioPage';
import CriancaMetasPage from './pages/CriancaMetasPage';
import CriancaTempoPage from './pages/CriancaTempoPage';

export default function App() {
  const { isAuthenticated, currentUser } = useApp();

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas protegidas dentro do Layout */}
        <Route 
          path="/*" 
          element={
            isAuthenticated ? (
              <Layout>
                <Routes>
                  {/* Rotas dos Pais */}
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="horarios" element={<HorariosPage />} />
                  <Route path="gestao-metas" element={<GestaoMetasPage />} />
                  <Route path="alertas" element={<AlertasPage />} />
                  <Route path="relatorio" element={<RelatorioPage />} />

                  {/* Rotas da Criança */}
                  <Route path="crianca" element={<CriancaMetasPage />} />
                  <Route path="tempo-crianca" element={<CriancaTempoPage />} />

                  {/* Redirecionamento padrão de acordo com o perfil */}
                  <Route 
                    path="*" 
                    element={
                      <Navigate to={currentUser.role === 'child' ? '/crianca' : '/dashboard'} replace />
                    } 
                  />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
      </Routes>

      {/* Modais Globais e Toast */}
      <ModalPerfil />
      <ModalMeta />
      <ModalSolicitar />
      <ModalAuth />
      <Toast />
    </>
  );
}
