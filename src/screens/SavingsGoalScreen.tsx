// ============================================
// YASS Gold & YASS Bullion — Savings Goals Screen
// Goal-based 24K gold accumulation planner
// A product by YASS Group, Dubai
// ============================================

import React, { useState } from 'react';
import {
  ArrowLeft,
  Target,
  Plus,
  Flame,
  Calendar,
  Sparkles,
  X,
  Coins,
  Gem,
  Building,
  GraduationCap,
} from 'lucide-react';
import { useApp } from '../components/AppProvider';
import { DEMO_GOLD_RATE, COLORS } from '../constants';
import type { SavingsGoal } from '../types';

export const SavingsGoalScreen: React.FC = () => {
  const { state, setState, back, showToast } = useApp();
  const { user, holdings, goals } = state;

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
  const [contributeGrams, setContributeGrams] = useState('1.0');

  // Form state
  const [title, setTitle] = useState('');
  const [targetGrams, setTargetGrams] = useState('50');
  const [targetDate, setTargetDate] = useState('2027-01-01');
  const [category, setCategory] = useState<SavingsGoal['category']>('bullion');

  // Calculations for total goals
  const totalTargetGrams = goals.reduce((acc, g) => acc + g.targetGrams, 0);
  const totalCurrentGrams = goals.reduce((acc, g) => acc + g.currentGrams, 0);
  const overallPercent = totalTargetGrams > 0 ? Math.min(100, Math.round((totalCurrentGrams / totalTargetGrams) * 100)) : 0;

  // Handle goal creation
  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const grams = parseFloat(targetGrams);
    if (!title || isNaN(grams) || grams <= 0) {
      showToast('Please enter a valid goal name and target weight', 'error');
      return;
    }

    const newGoal: SavingsGoal = {
      id: `GOAL-${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
      title,
      targetGrams: grams,
      currentGrams: 0,
      targetDate,
      category,
      monthlyContributionAED: Math.round(((grams * DEMO_GOLD_RATE) / 12) * 10) / 10,
    };

    setState(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal],
    }));

    showToast(`Goal "${title}" created successfully!`, 'success');
    setShowCreateModal(false);
    setTitle('');
  };

  // Handle contribution to a goal
  const handleContribute = () => {
    if (!selectedGoal) return;
    const grams = parseFloat(contributeGrams);
    if (isNaN(grams) || grams <= 0) {
      showToast('Please enter a valid weight in grams', 'error');
      return;
    }

    if (grams > holdings.totalGrams) {
      showToast('Insufficient gold balance in wallet', 'error');
      return;
    }

    setState(prev => ({
      ...prev,
      goals: prev.goals.map(g =>
        g.id === selectedGoal.id
          ? { ...g, currentGrams: Math.min(g.targetGrams, g.currentGrams + grams) }
          : g
      ),
    }));

    showToast(`Allocated ${grams.toFixed(4)}g to "${selectedGoal.title}"!`, 'success');
    setShowContributeModal(false);
    setSelectedGoal(null);
  };

  const getCategoryIcon = (cat: SavingsGoal['category']) => {
    switch (cat) {
      case 'bullion':
        return <Coins size={20} color={COLORS.primaryGold} />;
      case 'wedding':
        return <Gem size={20} color="#D946EF" />;
      case 'property':
        return <Building size={20} color="#0EA5E9" />;
      case 'education':
        return <GraduationCap size={20} color="#10B981" />;
      default:
        return <Target size={20} color={COLORS.primaryGold} />;
    }
  };

  return (
    <div className="screen-container" style={{ paddingBottom: 90 }}>
      {/* Header */}
      <div className="screen-header">
        <button className="screen-header-back" onClick={back}>
          <ArrowLeft size={18} />
        </button>
        <span className="screen-header-title">Savings Goals</span>
        <button
          onClick={() => setShowCreateModal(true)}
          style={{
            background: 'none',
            border: 'none',
            color: COLORS.primaryGold,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          <Plus size={18} />
          <span>New</span>
        </button>
      </div>

      <div className="screen-content">
        {/* Streak & Gamification Banner */}
        <div
          style={{
            background: '#FFF7ED',
            borderRadius: 16,
            padding: '16px 20px',
            color: '#0F172A',
            marginBottom: 20,
            border: '1px solid #FED7AA',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: '#FFEDD5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Flame size={24} color="#EA580C" />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#9A3412' }}>
                  {user?.savingsStreakDays || 5}-Day Savings Streak! 🔥
                </div>
                <div style={{ fontSize: 12, color: '#C2410C' }}>
                  Save today to claim +5mg free 24K gold reward
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: '#EA580C', textTransform: 'uppercase', fontWeight: 800 }}>
                Rewards Won
              </div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#9A3412' }}>
                {user?.freeGoldRewardsMg || 25} mg
              </div>
            </div>
          </div>
        </div>

        {/* Overall Progress Card */}
        <div
          style={{
            background: '#FFF',
            borderRadius: 16,
            padding: '20px',
            border: '1px solid #E9E7E0',
            marginBottom: 22,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: COLORS.secondaryText, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Total Goal Progress
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.darkCharcoal, marginTop: 2 }}>
                {totalCurrentGrams.toFixed(2)} / {totalTargetGrams.toFixed(0)} <span style={{ fontSize: 14 }}>g</span>
              </div>
            </div>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#F7F5EF',
                border: '3px solid #E8B63F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 14,
                color: COLORS.primaryGold,
              }}
            >
              {overallPercent}%
            </div>
          </div>

          {/* Progress Bar */}
          <div
            style={{
              width: '100%',
              height: 10,
              background: '#E2E8F0',
              borderRadius: 6,
              overflow: 'hidden',
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: `${overallPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #E8B63F, #F4D681)',
                borderRadius: 6,
                transition: 'width 0.4s ease',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: COLORS.secondaryText }}>
            <span>{goals.length} Active Goals</span>
            <span>Target Value: AED {(totalTargetGrams * DEMO_GOLD_RATE).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
          </div>
        </div>

        {/* Goals List Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.darkCharcoal }}>
            My Active Goals
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              background: 'none',
              border: 'none',
              color: COLORS.primaryGold,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            + Add Another
          </button>
        </div>

        {/* Goals Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {goals.map(goal => {
            const percent = Math.min(100, Math.round((goal.currentGrams / goal.targetGrams) * 100));
            const remainingGrams = Math.max(0, goal.targetGrams - goal.currentGrams);

            return (
              <div
                key={goal.id}
                style={{
                  background: '#FFF',
                  borderRadius: 14,
                  padding: '18px',
                  border: '1px solid #E9E7E0',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: '#F7F5EF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {getCategoryIcon(goal.category)}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.darkCharcoal }}>
                        {goal.title}
                      </div>
                      <div style={{ fontSize: 11, color: COLORS.secondaryText, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Calendar size={12} />
                        <span>Target: {new Date(goal.targetDate).toLocaleDateString('en-AE', { month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.primaryGold }}>
                      {percent}%
                    </div>
                    <div style={{ fontSize: 11, color: COLORS.secondaryText }}>
                      {goal.currentGrams.toFixed(1)} / {goal.targetGrams}g
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    width: '100%',
                    height: 8,
                    background: '#EDF2F7',
                    borderRadius: 4,
                    overflow: 'hidden',
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      width: `${percent}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #E8B63F, #F4D681)',
                      borderRadius: 4,
                    }}
                  />
                </div>

                {/* Goal Footer Details & Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 10,
                    borderTop: '1px solid #F1F3F5',
                    fontSize: 12,
                  }}
                >
                  <div>
                    <span style={{ color: COLORS.secondaryText }}>To save: </span>
                    <strong style={{ color: COLORS.darkCharcoal }}>{remainingGrams.toFixed(1)}g</strong>
                    <span style={{ color: COLORS.secondaryText }}> (~AED {Math.round(remainingGrams * DEMO_GOLD_RATE).toLocaleString('en-US')})</span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedGoal(goal);
                      setShowContributeModal(true);
                    }}
                    style={{
                      background: '#F7F5EF',
                      border: '1px solid #E8B63F',
                      color: COLORS.darkCharcoal,
                      padding: '6px 14px',
                      borderRadius: 20,
                      fontWeight: 700,
                      fontSize: 11,
                      cursor: 'pointer',
                    }}
                  >
                    + Add Gold
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Micro-Savings Info Card */}
        <div
          style={{
            background: '#F7F5EF',
            borderRadius: 14,
            padding: '16px 18px',
            marginTop: 22,
            border: '1px solid #E9E7E0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: COLORS.primaryGold, marginBottom: 6 }}>
            <Sparkles size={18} />
            <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.darkCharcoal }}>
              YASS Daily Auto-Save Planner
            </span>
          </div>
          <div style={{ fontSize: 12, color: COLORS.secondaryText, lineHeight: 1.5 }}>
            Automate small daily savings starting from just AED 10/day. Your daily purchases automatically accumulate toward your chosen goals with 0% fees.
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* CREATE GOAL MODAL */}
      {/* ================================================= */}
      {showCreateModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 20,
          }}
        >
          <div
            style={{
              background: '#FFF',
              borderRadius: 16,
              padding: 24,
              maxWidth: 420,
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.darkCharcoal }}>Create Savings Goal</div>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.secondaryText }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateGoal}>
              <div style={{ marginBottom: 14 }}>
                <label className="form-label">Goal Category</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 6 }}>
                  {[
                    { id: 'bullion', label: '100g Bullion Bar', icon: <Coins size={16} /> },
                    { id: 'wedding', label: 'Dubai Wedding', icon: <Gem size={16} /> },
                    { id: 'property', label: 'Real Estate Down', icon: <Building size={16} /> },
                    { id: 'education', label: 'Child Education', icon: <GraduationCap size={16} /> },
                  ].map(cat => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setCategory(cat.id as any)}
                      style={{
                        padding: '10px',
                        borderRadius: 8,
                        border: category === cat.id ? '2px solid #E8B63F' : '1px solid #E2E8F0',
                        background: category === cat.id ? '#FFF9E6' : '#FAFAFA',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        color: COLORS.darkCharcoal,
                      }}
                    >
                      {cat.icon}
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label className="form-label">Goal Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 100g Dubai Good Delivery Ingot"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label className="form-label">Target Gold Weight (grams)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 50"
                  value={targetGrams}
                  onChange={e => setTargetGrams(e.target.value)}
                  min="1"
                  step="0.5"
                  required
                />
                <div style={{ fontSize: 11, color: COLORS.secondaryText, marginTop: 4 }}>
                  Est. Value: AED {(parseFloat(targetGrams || '0') * DEMO_GOLD_RATE).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label className="form-label">Target Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={targetDate}
                  onChange={e => setTargetDate(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* CONTRIBUTE TO GOAL MODAL */}
      {/* ================================================= */}
      {showContributeModal && selectedGoal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 20,
          }}
        >
          <div
            style={{
              background: '#FFF',
              borderRadius: 16,
              padding: 24,
              maxWidth: 400,
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.darkCharcoal }}>
                Allocate Gold to Goal
              </div>
              <button
                onClick={() => setShowContributeModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.secondaryText }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ fontSize: 13, color: COLORS.secondaryText, marginBottom: 14 }}>
              Assigning gold from your available vault balance to <strong>{selectedGoal.title}</strong>.
            </div>

            <div style={{ background: '#F7F5EF', padding: 12, borderRadius: 10, fontSize: 12, marginBottom: 14 }}>
              Available Vault Balance: <strong>{holdings.totalGrams.toFixed(4)} grams</strong>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="form-label">Grams to Allocate</label>
              <input
                type="number"
                className="form-input"
                step="0.1"
                min="0.1"
                max={holdings.totalGrams}
                value={contributeGrams}
                onChange={e => setContributeGrams(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => setShowContributeModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={handleContribute}
              >
                Confirm Allocation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingsGoalScreen;
