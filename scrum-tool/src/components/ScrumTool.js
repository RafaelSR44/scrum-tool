import React, { useState } from 'react';
import { Users, Calendar, CheckSquare, Plus, Trash2, AlertCircle, Move, FileText } from 'lucide-react';

const ScrumTool = () => {
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Rafael Santana', role: 'Estagiário' },
    { id: 2, name: 'Vinicius Alves', role: 'Estagiário' },
    { id: 3, name: 'João Santos', role: 'Estagiário' },
    { id: 4, name: 'Gustavo Diniz', role: 'Gerente do Projeto' }
  ]);
  
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');
  
  const [dailyEntries, setDailyEntries] = useState({});
  const [closingEntries, setClosingEntries] = useState({});
  
  const [kanbanCards, setKanbanCards] = useState({
    fazer: [],
    fazendo: [],
    feito: []
  });
  
  const [activeTab, setActiveTab] = useState('daily');
  const [isProcessing, setIsProcessing] = useState(false);
  const [draggedCard, setDraggedCard] = useState(null);

  const addTeamMember = () => {
    if (newMemberName.trim() && newMemberRole.trim()) {
      const newMember = {
        id: Date.now(),
        name: newMemberName.trim(),
        role: newMemberRole.trim()
      };
      setTeamMembers([...teamMembers, newMember]);
      setNewMemberName('');
      setNewMemberRole('');
    }
  };

  const removeTeamMember = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    
    const newDailyEntries = { ...dailyEntries };
    const newClosingEntries = { ...closingEntries };
    delete newDailyEntries[id];
    delete newClosingEntries[id];
    setDailyEntries(newDailyEntries);
    setClosingEntries(newClosingEntries);
  };

  const updateDailyEntry = (memberId, field, value) => {
    setDailyEntries(prev => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        [field]: value
      }
    }));
  };

  const updateClosingEntry = (memberId, field, value) => {
    setClosingEntries(prev => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        [field]: value
      }
    }));
  };

  // Função local para extrair tarefas (substitui a IA temporariamente)
  const extractTasksFromText = (text, memberName) => {
    if (!text || text.trim().length < 5) return [];
    
    // Simulação simples de extração de tarefas
    // Em produção, você pode integrar com OpenAI API, Anthropic API, etc.
    const sentences = text.split(/[.!?;,]/).filter(s => s.trim().length > 3);
    const tasks = sentences
      .slice(0, 4) // Máximo 4 tarefas
      .map(sentence => {
        let task = sentence.trim();
        // Remove palavras muito comuns
        task = task.replace(/^(vou|vai|preciso|tenho que|devo)/i, '');
        // Capitaliza primeira letra
        task = task.charAt(0).toUpperCase() + task.slice(1);
        return task.length > 10 ? task.substring(0, 50) + '...' : task;
      })
      .filter(task => task.length > 5);
    
    return tasks;
  };

  const generateTasksFromDailies = async () => {
    setIsProcessing(true);
    const newCards = [];
    let processedMembers = 0;
    
    for (let i = 0; i < teamMembers.length; i++) {
      const member = teamMembers[i];
      const entry = dailyEntries[member.id];
      
      if (entry && entry.planToday && entry.planToday.trim().length > 5) {
        const tasks = extractTasksFromText(entry.planToday, member.name);
        
        if (tasks.length > 0) {
          processedMembers++;
          tasks.forEach((task, index) => {
            newCards.push({
              id: `task-${member.id}-${Date.now()}-${index}-${Math.random()}`,
              content: task,
              assignee: member.name,
              createdAt: new Date().toLocaleString('pt-BR', { 
                day: '2-digit', 
                month: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit' 
              })
            });
          });
        }
        
        // Simula delay de processamento
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    setKanbanCards(prev => ({
      ...prev,
      fazer: [...prev.fazer, ...newCards]
    }));
    
    if (newCards.length > 0) {
      alert(`✅ Sucesso! ${newCards.length} cards gerados para ${processedMembers} membros.`);
    } else {
      alert('⚠️ Nenhum card foi gerado. Verifique se os membros preencheram o campo "O que vai fazer hoje?" com pelo menos 6 caracteres.');
    }
    
    setIsProcessing(false);
  };

  // Drag and Drop handlers
  const handleDragStart = (e, card, sourceColumn) => {
    setDraggedCard({ card, sourceColumn });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    
    if (!draggedCard) return;
    
    const { card, sourceColumn } = draggedCard;
    
    if (sourceColumn === targetColumn) {
      setDraggedCard(null);
      return;
    }
    
    const sourceCards = kanbanCards[sourceColumn].filter(c => c.id !== card.id);
    const targetCards = [...kanbanCards[targetColumn], card];
    
    setKanbanCards(prev => ({
      ...prev,
      [sourceColumn]: sourceCards,
      [targetColumn]: targetCards
    }));
    
    setDraggedCard(null);
  };

  const moveCard = (card, fromColumn, toColumn) => {
    if (fromColumn === toColumn) return;
    
    const sourceCards = kanbanCards[fromColumn].filter(c => c.id !== card.id);
    const targetCards = [...kanbanCards[toColumn], card];
    
    setKanbanCards(prev => ({
      ...prev,
      [fromColumn]: sourceCards,
      [toColumn]: targetCards
    }));
  };

  const getColumnColor = (columnId) => {
    switch (columnId) {
      case 'fazer': return 'bg-red-100 border-red-200';
      case 'fazendo': return 'bg-yellow-100 border-yellow-200';
      case 'feito': return 'bg-green-100 border-green-200';
      default: return 'bg-gray-100';
    }
  };

  const getCardColor = (columnId) => {
    switch (columnId) {
      case 'fazer': return 'bg-red-50 border-red-200 text-red-800';
      case 'fazendo': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'feito': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50';
    }
  };

  const removeCard = (cardId, column) => {
    setKanbanCards(prev => ({
      ...prev,
      [column]: prev[column].filter(card => card.id !== cardId)
    }));
  };

  const clearAllDailies = () => {
    if (window.confirm('Tem certeza que deseja limpar todas as entradas das dailies?')) {
      setDailyEntries({});
    }
  };

  const clearAllClosings = () => {
    if (window.confirm('Tem certeza que deseja limpar todas as entradas dos fechamentos?')) {
      setClosingEntries({});
    }
  };

  const generatePDF = (type) => {
    const date = new Date().toLocaleDateString('pt-BR');
    const entries = type === 'daily' ? dailyEntries : closingEntries;
    const title = type === 'daily' ? 'Daily Scrum' : 'Fechamento do Dia';
    const fields = type === 'daily' 
      ? ['didYesterday', 'planToday', 'blockers']
      : ['didToday', 'blockers', 'planTomorrow'];
    const fieldLabels = type === 'daily'
      ? ['O que fez ontem?', 'O que vai fazer hoje?', 'Impedimentos?']
      : ['O que conseguiu fazer hoje?', 'Teve impedimentos?', 'O que vai fazer amanhã?'];

    const printContent = `
      <html>
        <head>
          <title>${title} - ${date}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .member-section { margin-bottom: 25px; page-break-inside: avoid; }
            .member-name { background: #f0f9ff; padding: 10px; border-left: 4px solid #3b82f6; font-weight: bold; font-size: 16px; }
            .field { margin-bottom: 15px; }
            .field-label { font-weight: bold; color: #374151; margin-bottom: 5px; }
            .field-content { background: #f9fafb; padding: 10px; border: 1px solid #d1d5db; border-radius: 4px; min-height: 40px; white-space: pre-wrap; }
            .no-content { color: #9ca3af; font-style: italic; }
            .blocker-alert { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 8px; border-radius: 4px; margin-top: 5px; }
            @media print { 
              body { margin: 0; } 
              .member-section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🚀 ${title}</h1>
            <p>Data: ${date}</p>
          </div>
          ${teamMembers.map(member => {
            const memberData = entries[member.id] || {};
            return `
              <div class="member-section">
                <div class="member-name">${member.name} - ${member.role}</div>
                ${fields.map((field, index) => `
                  <div class="field">
                    <div class="field-label">${fieldLabels[index]}</div>
                    <div class="field-content">
                      ${memberData[field] ? memberData[field] : '<span class="no-content">Não preenchido</span>'}
                    </div>
                    ${field === 'blockers' && memberData[field] ? 
                      '<div class="blocker-alert">⚠️ Impedimento reportado</div>' : ''}
                  </div>
                `).join('')}
              </div>
            `;
          }).join('')}
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🚀 Ferramenta Scrum</h1>
        <p className="text-gray-600">Gerencie dailies, fechamentos e tarefas com Kanban inteligente</p>
      </div>

      {/* Team Management */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Time</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {teamMembers.map(member => (
            <div key={member.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="font-medium text-gray-800">{member.name}</p>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
              <button
                onClick={() => removeTeamMember(member.id)}
                className="text-red-500 hover:text-red-700 p-1"
                title="Remover membro"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nome do membro"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Função"
            value={newMemberRole}
            onChange={(e) => setNewMemberRole(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTeamMember}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex-1 px-6 py-4 text-center font-medium ${
              activeTab === 'daily'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Calendar className="w-5 h-5 mx-auto mb-1" />
            Dailies
          </button>
          <button
            onClick={() => setActiveTab('closing')}
            className={`flex-1 px-6 py-4 text-center font-medium ${
              activeTab === 'closing'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <CheckSquare className="w-5 h-5 mx-auto mb-1" />
            Fechamentos
          </button>
          <button
            onClick={() => setActiveTab('kanban')}
            className={`flex-1 px-6 py-4 text-center font-medium ${
              activeTab === 'kanban'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="w-5 h-5 mx-auto mb-1 bg-blue-600 rounded"></div>
            Kanban
          </button>
        </div>

        {/* Daily Content */}
        {activeTab === 'daily' && (
          <div className="p-6">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Daily Scrum</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={clearAllDailies}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Limpar Tudo
                </button>
                <button
                  onClick={() => generatePDF('daily')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Gerar PDF
                </button>
                <button
                  onClick={generateTasksFromDailies}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processando...
                    </>
                  ) : (
                    <>
                      🤖 Gerar Cards IA
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">🤖 Dicas para melhor geração de cards pela IA:</h4>
              <div className="text-sm text-green-700 space-y-1">
                <p>• Seja específico no campo "O que vai fazer hoje?"</p>
                <p>• Use verbos de ação: "Implementar", "Revisar", "Criar", "Testar"</p>
                <p>• Exemplo bom: "Implementar login do usuário, Revisar código da API, Criar testes unitários"</p>
                <p>• Evite textos genéricos como apenas "trabalhar no projeto"</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {teamMembers.map(member => (
                <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-4">{member.name} - {member.role}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        O que fez ontem?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Descreva as atividades realizadas..."
                        value={dailyEntries[member.id]?.didYesterday || ''}
                        onChange={(e) => updateDailyEntry(member.id, 'didYesterday', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        O que vai fazer hoje?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Liste as tarefas planejadas..."
                        value={dailyEntries[member.id]?.planToday || ''}
                        onChange={(e) => updateDailyEntry(member.id, 'planToday', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Impedimentos?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Bloqueios ou dificuldades..."
                        value={dailyEntries[member.id]?.blockers || ''}
                        onChange={(e) => updateDailyEntry(member.id, 'blockers', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  {dailyEntries[member.id]?.blockers && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-800">Este membro reportou impedimentos</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Closing Content */}
        {activeTab === 'closing' && (
          <div className="p-6">
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Fechamento do Dia</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={clearAllClosings}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Limpar Tudo
                </button>
                <button
                  onClick={() => generatePDF('closing')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Gerar PDF
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              {teamMembers.map(member => (
                <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-4">{member.name} - {member.role}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        O que conseguiu fazer hoje?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Atividades concluídas..."
                        value={closingEntries[member.id]?.didToday || ''}
                        onChange={(e) => updateClosingEntry(member.id, 'didToday', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teve impedimentos?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Bloqueios encontrados..."
                        value={closingEntries[member.id]?.blockers || ''}
                        onChange={(e) => updateClosingEntry(member.id, 'blockers', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        O que vai fazer amanhã?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Próximas atividades..."
                        value={closingEntries[member.id]?.planTomorrow || ''}
                        onChange={(e) => updateClosingEntry(member.id, 'planTomorrow', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Kanban Content */}
        {activeTab === 'kanban' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Quadro Kanban</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: 'fazer', title: 'Para Fazer', icon: '🔴' },
                { id: 'fazendo', title: 'Fazendo', icon: '🟡' },
                { id: 'feito', title: 'Feito', icon: '🟢' }
              ].map(column => (
                <div 
                  key={column.id} 
                  className={`rounded-lg border-2 ${getColumnColor(column.id)} p-4`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, column.id)}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">{column.icon}</span>
                    <h3 className="font-semibold text-gray-800">{column.title}</h3>
                    <span className="bg-white px-2 py-1 rounded-full text-sm font-medium">
                      {kanbanCards[column.id].length}
                    </span>
                  </div>
                  
                  <div className="min-h-[200px] space-y-3">
                    {kanbanCards[column.id].map((card) => (
                      <div
                        key={card.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, card, column.id)}
                        className={`p-3 rounded-lg border-2 ${getCardColor(column.id)} shadow-sm cursor-move hover:shadow-md transition-shadow group`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-medium text-sm flex-1">{card.content}</p>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Move className="w-4 h-4 text-gray-500" />
                            <button
                              onClick={() => removeCard(card.id, column.id)}
                              className="text-red-500 hover:text-red-700"
                              title="Remover card"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium">{card.assignee}</span>
                          <span className="opacity-60">{card.createdAt}</span>
                        </div>
                        
                        {/* Quick move buttons */}
                        <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {column.id !== 'fazer' && (
                            <button
                              onClick={() => moveCard(card, column.id, 'fazer')}
                              className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200"
                            >
                              → Fazer
                            </button>
                          )}
                          {column.id !== 'fazendo' && (
                            <button
                              onClick={() => moveCard(card, column.id, 'fazendo')}
                              className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                            >
                              → Fazendo
                            </button>
                          )}
                          {column.id !== 'feito' && (
                            <button
                              onClick={() => moveCard(card, column.id, 'feito')}
                              className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                            >
                              → Feito
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">💡 Como usar o Kanban:</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• Arraste e solte os cards entre as colunas</p>
                <p>• Use os botões rápidos que aparecem ao passar o mouse</p>
                <p>• Cards vermelhos = Para Fazer | Amarelos = Fazendo | Verdes = Feito</p>
                <p>• Gere novos cards automaticamente a partir das dailies!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrumTool;