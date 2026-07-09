import { crisisResources } from '../data/constants';

export default function CrisisPage({ onExit }) {
  return (
    <div className="page-container" style={{ background: '#FFFDF7' }}>
      <div className="content-wrapper">
        <p style={{ fontSize: '24px', color: '#3C2415', fontWeight: 500, marginBottom: '24px' }}>
          我听到了你的痛苦。
        </p>

        <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '32px', lineHeight: '1.8' }}>
          但我只是一个小小的对话体验，<br />
          没有能力真正帮到你。
        </p>

        <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '24px' }}>
          如果你正在经历很难的时刻，<br />
          请联系真正能帮助你的人：
        </p>

        <div style={{ marginBottom: '32px' }}>
          {crisisResources.slice(0, 3).map((resource, index) => (
            <div key={index} className="crisis-card">
              <p style={{ fontWeight: 500, color: '#3C2415', marginBottom: '4px' }}>
                {resource.name}
              </p>
              <p style={{ fontSize: '18px', color: '#C4956A', fontWeight: 500 }}>
                {resource.number}
              </p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '32px' }}>
          你值得被真正帮助。
        </p>

        <button className="btn-secondary" onClick={onExit}>
          我已知晓，退出体验
        </button>
      </div>
    </div>
  );
}