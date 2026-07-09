import { useState } from 'react';
import html2canvas from 'html2canvas';

export default function EndingPage({ poem, letter, onRestart }) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const saveAsImage = async (type) => {
    setSaving(true);
    setMessage('');

    try {
      // 创建一个临时的容器来渲染内容
      const container = document.createElement('div');
      container.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: 480px;
        padding: 48px 32px;
        font-family: 'Noto Serif SC', Georgia, serif;
      `;

      if (type === 'poem') {
        // 诗的样式
        container.style.background = '#0F1A2E';
        container.innerHTML = `
          <div style="text-align: center; color: rgba(245, 230, 208, 0.9); line-height: 2.4;">
            <div style="font-size: 24px; color: rgba(212, 165, 116, 0.3); margin-bottom: 32px; letter-spacing: 8px;">✦ · · ✦</div>
            <div style="white-space: pre-line; font-size: 20px;">
              ${poem.split('\n').map(line => {
                const isQuote = line.startsWith('"') && line.endsWith('"');
                const isLast = line.includes("这首诗的作者");
                return `<p style="
                  color: ${isQuote ? '#D4A574' : 'rgba(245, 230, 208, 0.9)'};
                  font-size: ${isQuote ? '23px' : '20px'};
                  font-weight: ${isQuote ? '500' : '400'};
                  text-align: ${isLast ? 'right' : 'center'};
                  margin-bottom: 20px;
                ">${line}</p>`;
              }).join('')}
            </div>
            <div style="font-size: 20px; color: rgba(212, 165, 116, 0.25); margin-top: 32px; letter-spacing: 4px;">· ✦ ·</div>
          </div>
        `;
      } else {
        // 信的样式
        container.style.background = 'linear-gradient(135deg, #FFFCF5 0%, #FBF6EC 50%, #F5E6D0 100%)';
        container.innerHTML = `
          <div style="
            background: linear-gradient(135deg, #FFFCF5 0%, #FBF6EC 50%, #F5E6D0 100%);
            border-radius: 20px;
            padding: 36px 32px;
            border: 1px solid #E8E0D4;
            box-shadow: 0 8px 32px rgba(60, 36, 21, 0.08);
          ">
            <div style="text-align: center; margin-bottom: 20px; font-size: 20px; color: rgba(196, 149, 106, 0.4); letter-spacing: 4px;">✦ · · ✦</div>
            <div style="white-space: pre-line; font-size: 16px; color: #3C2415; line-height: 2.1; text-align: left;">
              ${letter.split('\n').map(p => {
                const isSignature = p.includes('你自己') && !p.includes('说');
                const isQuote = p.startsWith('"') || p.startsWith('你说');
                return `<p style="
                  color: ${isSignature ? '#C4956A' : '#3C2415'};
                  text-align: ${isSignature ? 'right' : 'left'};
                  font-weight: ${isQuote ? '500' : '400'};
                  font-style: ${isQuote ? 'italic' : 'normal'};
                  margin-bottom: 18px;
                ">${p}</p>`;
              }).join('')}
            </div>
            <div style="text-align: center; margin-top: 28px; font-size: 18px; color: rgba(196, 149, 106, 0.35); letter-spacing: 3px;">· ✦ ·</div>
          </div>
        `;
      }

      document.body.appendChild(container);

      // 等待一下让样式生效
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: type === 'poem' ? '#0F1A2E' : '#F5E6D0'
      });

      // 移除临时容器
      document.body.removeChild(container);

      // 下载图片
      const link = document.createElement('a');
      link.download = `她的镜子_${type === 'poem' ? '诗' : '信'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      setMessage('保存成功！');
    } catch (error) {
      console.error('保存失败:', error);
      setMessage('保存失败，请重试');
    } finally {
      setSaving(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setMessage('链接已复制！');
  };

  return (
    <div className="page-container" style={{ background: '#FFFDF7' }}>
      <div className="content-wrapper">
        <p style={{ fontSize: '17px', color: '#3C2415', marginBottom: '24px', lineHeight: '1.8' }}>
          你刚才做了一件很少有人做的事。
        </p>

        <p style={{ fontSize: '17px', color: '#3C2415', marginBottom: '32px', lineHeight: '1.8' }}>
          你问了自己，你是谁。<br />
          然后，你回答了。
        </p>

        <div className="divider"></div>

        {/* 保存按钮 */}
        <div style={{ marginBottom: '20px' }}>
          <button
            className="btn-secondary"
            onClick={() => saveAsImage('poem')}
            disabled={saving}
            style={{ width: '100%', marginBottom: '12px', opacity: saving ? 0.6 : 1 }}
          >
            {saving ? '保存中...' : '💌 保存这首诗'}
          </button>

          <button
            className="btn-secondary"
            onClick={() => saveAsImage('letter')}
            disabled={saving}
            style={{ width: '100%', opacity: saving ? 0.6 : 1 }}
          >
            {saving ? '保存中...' : '✉️ 保存这封信'}
          </button>
        </div>

        {/* 消息提示 */}
        {message && (
          <p style={{
            fontSize: '14px',
            color: message.includes('成功') || message.includes('已复制') ? '#5B9A6F' : '#D4547A',
            marginBottom: '20px'
          }}>
            {message}
          </p>
        )}

        <div className="divider"></div>

        <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '24px', lineHeight: '1.8' }}>
          如果你身边也有一个人，<br />
          她可能也很久没有听过自己的声音了。
        </p>

        <button
          className="btn-primary"
          onClick={copyLink}
          style={{ width: '100%', marginBottom: '32px' }}
        >
          把这面镜子送给她（复制链接）
        </button>

        <div className="divider"></div>

        <button className="btn-text" onClick={onRestart}>
          重新开始
        </button>
      </div>
    </div>
  );
}