import { useState, useRef, useEffect } from 'react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '嗨，我是小镜。如果你有些话想说，或者对刚才的问题有困惑，可以在这里告诉我。我会好好听着。'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        // API 失败，使用备用回复
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: getFallbackReply(userMessage)
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: getFallbackReply(userMessage)
      }]);
    }

    setIsLoading(false);
  };

  // 备用回复（当 API 不可用时）
  const getFallbackReply = (userInput) => {
    const input = userInput.toLowerCase();

    if (input.includes('不知道') || input.includes('说不出来')) {
      return '没关系，有些话确实很难说出口。慢慢来，等你想说的时候，我在这里。';
    }

    if (input.includes('累') || input.includes('辛苦')) {
      return '你一直在努力，我能感受到。有时候停下来歇一歇，也是很勇敢的事。';
    }

    if (input.includes('孤独') || input.includes('没人理解')) {
      return '孤独是很沉重的感受。谢谢你愿意告诉我这些。你的感受是被看见的。';
    }

    if (input.includes('该怎么办') || input.includes('怎么做')) {
      return '我没有答案，但我相信你自己心里有答案。也许现在只是还没找到表达的方式。我们慢慢来。';
    }

    return '我在听。你想说的任何话，都可以告诉我。';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* 浮动按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: isOpen ? '#FFF' : 'linear-gradient(135deg, #C4956A 0%, #D4A574 100%)',
          border: isOpen ? '1px solid rgba(196, 149, 106, 0.3)' : 'none',
          boxShadow: '0 4px 20px rgba(196, 149, 106, 0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          transition: 'all 0.3s ease',
          zIndex: 1000
        }}
        title="小镜 - 倾听助手"
      >
        {isOpen ? '✕' : '🪞'}
      </button>

      {/* 对话框 */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '96px',
          right: '24px',
          width: '360px',
          maxWidth: 'calc(100vw - 48px)',
          height: '480px',
          maxHeight: 'calc(100vh - 140px)',
          background: '#FFFCF5',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(60, 36, 21, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 999,
          animation: 'fadeIn 0.3s ease',
          overflow: 'hidden'
        }}>
          {/* 头部 */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(196, 149, 106, 0.15)',
            background: 'linear-gradient(135deg, #FFFDF7 0%, #FBF6EC 100%)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>🪞</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 500, color: '#3C2415' }}>小镜</h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>倾听与陪伴</p>
              </div>
            </div>
          </div>

          {/* 消息区域 */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user'
                    ? '16px 16px 4px 16px'
                    : '16px 16px 16px 4px',
                  background: msg.role === 'user'
                    ? '#C4956A'
                    : 'rgba(196, 149, 106, 0.1)',
                  color: msg.role === 'user' ? '#FFF' : '#3C2415',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'rgba(196, 149, 106, 0.1)',
                  fontSize: '14px',
                  color: '#999'
                }}>
                  正在听...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 输入区域 */}
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid rgba(196, 149, 106, 0.15)',
            background: '#FFF'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="想说点什么..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '20px',
                  border: '1px solid rgba(196, 149, 106, 0.2)',
                  fontSize: '14px',
                  outline: 'none',
                  background: '#FFFCF5'
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                style={{
                  padding: '10px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  background: input.trim() ? '#C4956A' : 'rgba(196, 149, 106, 0.3)',
                  color: '#FFF',
                  fontSize: '14px',
                  cursor: input.trim() ? 'pointer' : 'default',
                  transition: 'all 0.2s'
                }}
              >
                发送
              </button>
            </div>
            <p style={{
              margin: '8px 0 0',
              fontSize: '11px',
              color: '#999',
              textAlign: 'center'
            }}>
              小镜是一个倾听陪伴助手，不能提供诊断或治疗建议
            </p>
          </div>
        </div>
      )}
    </>
  );
}