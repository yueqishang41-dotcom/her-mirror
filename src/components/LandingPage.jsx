import { useState, useEffect } from 'react';

export default function LandingPage({ onStart }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="page-container" style={{
      background: 'linear-gradient(160deg, #FFFDF7 0%, #FBF6EC 40%, #F5E6D0 100%)'
    }}>
      <div className={`content-wrapper ${visible ? 'fade-in' : ''}`}>
        <p style={{
          fontSize: '18px',
          color: '#C4956A',
          marginBottom: '24px',
          fontWeight: 400,
          letterSpacing: '1px'
        }}>
          你有多久没有想过——
        </p>

        <h1 style={{
          fontSize: '32px',
          fontWeight: 300,
          color: '#3C2415',
          marginBottom: '32px',
          lineHeight: '1.5'
        }}>
          "我是一个什么样的人？"
        </h1>

        <p style={{
          fontSize: '16px',
          color: '#6B7280',
          marginBottom: '40px',
          lineHeight: '1.8'
        }}>
          不是妈妈。不是妻子。不是别人的谁。<br />
          就是你。
        </p>

        <div className="divider"></div>

        <p style={{
          fontSize: '15px',
          color: '#6B7280',
          marginBottom: '40px',
          lineHeight: '1.8'
        }}>
          这里没有测试。没有标签。没有对错。<br />
          只有几个问题，和你自己的回答。
        </p>

        <p style={{
          fontSize: '13px',
          color: '#999',
          marginBottom: '48px',
          lineHeight: '1.8'
        }}>
          你的回答不会被保存到服务器。<br />
          你可以随时关闭页面，一切都会消失。<br />
          这是你的时间，只有你能看到。
        </p>

        <button className="btn-primary" onClick={onStart}>
          开始
        </button>
      </div>
    </div>
  );
}