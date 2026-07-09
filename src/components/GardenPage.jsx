import { useState, useEffect } from 'react';
import { plants } from '../data/constants';
import StarField from './StarField';

export default function GardenPage({ answers, onContinue }) {
  const [visiblePlants, setVisiblePlants] = useState(0);
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    const timers = [];
    plants.forEach((_, index) => {
      timers.push(setTimeout(() => setVisiblePlants(index + 1), index * 700));
    });
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const handlePlantClick = (plant) => {
    const answer = answers.find(a => a.id === plant.id);
    if (answer && !answer.skipped) {
      setSelectedPlant({ plant, answer });
    }
  };

  const closeModal = () => {
    setSelectedPlant(null);
  };

  return (
    <div className="page-container" style={{
      background: '#000',
      overflow: 'hidden'
    }}>
      {/* 惊艳星空背景 - 手势可交互 */}
      <StarField intensity="intense" />

      <div className="content-wrapper" style={{ position: 'relative', zIndex: 1 }}>
        {/* 标题 */}
        <p style={{
          fontSize: '26px',
          color: 'rgba(255, 255, 255, 0.95)',
          marginBottom: '12px',
          fontFamily: 'Noto Serif SC, serif',
          fontWeight: 500,
          textShadow: '0 0 30px rgba(255, 255, 255, 0.2)'
        }}>
          这是你的花园
        </p>

        <p style={{
          fontSize: '15px',
          color: 'rgba(255, 255, 255, 0.5)',
          marginBottom: '48px',
          lineHeight: '1.6'
        }}>
          每一株植物，都是你说过的话
        </p>

        {/* 花园 */}
        <div className="garden-container">
          {plants.map((plant, index) => {
            const answer = answers.find(a => a.id === plant.id);
            const hasAnswer = answer && !answer.skipped;

            return (
              <div
                key={plant.id}
                className="plant-item"
                onClick={() => hasAnswer && handlePlantClick(plant)}
                style={{
                  opacity: visiblePlants > index ? 1 : 0,
                  transform: visiblePlants > index ? 'scale(1)' : 'scale(0)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  cursor: hasAnswer ? 'pointer' : 'default',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '12px'
                }}
              >
                <div
                  className="plant-emoji"
                  style={{
                    opacity: hasAnswer ? 1 : 0.3,
                    filter: hasAnswer ? 'none' : 'grayscale(0.5)',
                    textShadow: hasAnswer ? '0 0 20px rgba(255, 255, 255, 0.3)' : 'none'
                  }}
                >
                  {plant.emoji}
                </div>
                <div className="plant-label" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {hasAnswer ? plant.name : '?'}
                </div>
              </div>
            );
          })}
        </div>

        {/* 提示 */}
        {visiblePlants >= plants.length && (
          <p style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.4)',
            marginTop: '32px',
            marginBottom: '36px',
            fontStyle: 'italic'
          }}>
            点击一株植物，听听你当时说的话
          </p>
        )}

        {/* 继续按钮 */}
        {visiblePlants >= plants.length && (
          <button
            className="btn-primary"
            onClick={onContinue}
            style={{
              borderColor: 'rgba(212, 165, 116, 0.5)',
              color: 'rgba(255, 255, 255, 0.8)',
              background: 'rgba(212, 165, 116, 0.1)'
            }}
          >
            继续 ↓
          </button>
        )}
      </div>

      {/* 植物详情弹窗 */}
      {selectedPlant && (
        <div
          className="plant-modal"
          onClick={closeModal}
          style={{
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <div
            className="plant-modal-content"
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 252, 245, 1) 0%, rgba(245, 230, 208, 1) 100%)'
            }}
          >
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>
              {selectedPlant.plant.emoji}
            </div>
            <h3 style={{
              fontSize: '22px',
              color: '#3C2415',
              marginBottom: '8px',
              fontWeight: 600
            }}>
              {selectedPlant.plant.label}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#C4956A',
              marginBottom: '24px'
            }}>
              {selectedPlant.plant.symbol}
            </p>
            <div style={{
              background: 'rgba(255, 252, 245, 0.8)',
              borderRadius: '12px',
              padding: '18px',
              marginBottom: '24px'
            }}>
              <p style={{
                fontSize: '16px',
                color: '#3C2415',
                lineHeight: '1.9',
                fontStyle: 'italic'
              }}>
                "{selectedPlant.answer.answer}"
              </p>
            </div>
            <button
              onClick={closeModal}
              style={{
                background: '#C4956A',
                color: '#FFFDF7',
                border: 'none',
                padding: '12px 32px',
                borderRadius: '24px',
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
}