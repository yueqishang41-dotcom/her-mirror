import { useState } from 'react';

// 帮助资源数据
const helpResources = {
  hotlines: [
    { name: "北京心理危机干预热线", number: "010-82951332", desc: "24小时，专业心理危机干预" },
    { name: "全国心理援助热线", number: "400-161-9995", desc: "24小时，全国范围" },
    { name: "希望24热线", number: "400-161-9995", desc: "生命教育与危机干预" },
    { name: "全国妇联维权热线", number: "12338", desc: "家庭暴力、权益保护" },
    { name: "青少年心理热线", number: "12355", desc: "青少年心理支持" }
  ],
  books: [
    {
      title: "《情绪急救》",
      author: "盖伊·温奇",
      desc: "如何处理拒绝、孤独、失败等心理创伤",
      link: "#"
    },
    {
      title: "《自我关怀》",
      author: "克里斯汀·内夫",
      desc: "学会善待自己，建立内在安全感",
      link: "#"
    },
    {
      title: "《身体从未忘记》",
      author: "范德考克",
      desc: "理解创伤，找到疗愈的方法",
      link: "#"
    },
    {
      title: "《被讨厌的勇气》",
      author: "岸见一郎",
      desc: "自我接纳，勇敢做自己",
      link: "#"
    },
    {
      title: "《她世界》",
      author: "伊丽莎白·卡多赫",
      desc: "女性自信心的心理学探索",
      link: "#"
    }
  ],
  courses: [
    {
      title: "正念冥想入门",
      platform: "中国大学MOOC",
      desc: "学习正念，缓解焦虑和压力",
      link: "https://www.icourse163.org"
    },
    {
      title: "积极心理学",
      platform: "Coursera",
      desc: "培养积极心态，提升幸福感",
      link: "https://www.coursera.org"
    },
    {
      title: "女性心理健康",
      platform: "学堂在线",
      desc: "专为女性设计的心理健康课程",
      link: "https://www.xuetangx.com"
    }
  ],
  articles: [
    {
      title: "如何知道自己是否需要心理咨询？",
      source: "简单心理",
      link: "#"
    },
    {
      title: "当你感到孤独时，可以做的5件事",
      source: "KnowYourself",
      link: "#"
    },
    {
      title: "自我关怀：当你的内心批评者出现时",
      source: "壹心理",
      link: "#"
    }
  ]
};

export default function HelpPage({ onClose }) {
  const [activeTab, setActiveTab] = useState('hotlines');

  const tabs = [
    { key: 'hotlines', label: '心理热线' },
    { key: 'books', label: '推荐书籍' },
    { key: 'courses', label: '学习课程' },
    { key: 'articles', label: '相关文章' }
  ];

  return (
    <div className="page-container" style={{
      background: 'linear-gradient(160deg, #FFFDF7 0%, #FBF6EC 40%, #F5E6D0 100%)',
      minHeight: '100vh',
      paddingTop: '20px'
    }}>
      <div style={{
        maxWidth: '640px',
        margin: '0 auto',
        padding: '0 20px 40px'
      }}>
        {/* 头部 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 400,
            color: '#3C2415',
            letterSpacing: '1px'
          }}>
            帮助资源
          </h1>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '14px',
              color: '#999',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '20px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(196, 149, 106, 0.1)';
              e.target.style.color = '#C4956A';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#999';
            }}
          >
            返回
          </button>
        </div>

        {/* 引言 */}
        <p style={{
          fontSize: '15px',
          color: '#6B7280',
          lineHeight: '1.8',
          marginBottom: '32px',
          padding: '0 4px'
        }}>
          如果你正在经历困难，或者想了解更多关于心理健康的内容，以下是一些可以帮助到你的资源。
        </p>

        {/* 标签栏 */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '28px',
          overflowX: 'auto',
          paddingBottom: '8px'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '10px 20px',
                borderRadius: '20px',
                border: 'none',
                fontSize: '14px',
                fontWeight: activeTab === tab.key ? 500 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                background: activeTab === tab.key ? '#C4956A' : 'rgba(196, 149, 106, 0.1)',
                color: activeTab === tab.key ? '#FFF' : '#C4956A'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 内容区域 */}
        <div style={{
          animation: 'fadeIn 0.3s ease-out'
        }}>
          {/* 心理热线 */}
          {activeTab === 'hotlines' && (
            <div>
              <p style={{
                fontSize: '13px',
                color: '#999',
                marginBottom: '20px',
                lineHeight: '1.6'
              }}>
                以下热线均由专业人员接听，你可以随时拨打寻求帮助。
              </p>
              {helpResources.hotlines.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: '#FFFCF5',
                    border: '1px solid rgba(196, 149, 106, 0.15)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '12px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#3C2415',
                      margin: 0
                    }}>
                      {item.name}
                    </h3>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: 500,
                      color: '#C4956A',
                      letterSpacing: '0.5px'
                    }}>
                      {item.number}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '13px',
                    color: '#999',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 推荐书籍 */}
          {activeTab === 'books' && (
            <div>
              {helpResources.books.map((book, index) => (
                <div
                  key={index}
                  style={{
                    background: '#FFFCF5',
                    border: '1px solid rgba(196, 149, 106, 0.15)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '12px'
                  }}
                >
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#3C2415',
                    marginBottom: '6px'
                  }}>
                    {book.title}
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: '#C4956A',
                    marginBottom: '8px'
                  }}>
                    {book.author}
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {book.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 学习课程 */}
          {activeTab === 'courses' && (
            <div>
              {helpResources.courses.map((course, index) => (
                <a
                  key={index}
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    background: '#FFFCF5',
                    border: '1px solid rgba(196, 149, 106, 0.15)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '12px',
                    textDecoration: 'none'
                  }}
                >
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#3C2415',
                    marginBottom: '6px'
                  }}>
                    {course.title}
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: '#C4956A',
                    marginBottom: '8px'
                  }}>
                    {course.platform}
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {course.desc}
                  </p>
                </a>
              ))}
            </div>
          )}

          {/* 相关文章 */}
          {activeTab === 'articles' && (
            <div>
              {helpResources.articles.map((article, index) => (
                <a
                  key={index}
                  href={article.link}
                  style={{
                    display: 'block',
                    background: '#FFFCF5',
                    border: '1px solid rgba(196, 149, 106, 0.15)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    marginBottom: '12px',
                    textDecoration: 'none'
                  }}
                >
                  <p style={{
                    fontSize: '15px',
                    color: '#3C2415',
                    marginBottom: '4px'
                  }}>
                    {article.title}
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: '#999',
                    margin: 0
                  }}>
                    {article.source}
                  </p>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* 底部提示 */}
        <p style={{
          fontSize: '13px',
          color: '#999',
          textAlign: 'center',
          marginTop: '40px',
          lineHeight: '1.8'
        }}>
          如果你正在经历紧急危机，请直接拨打心理热线或 110 求助。<br />
          你值得被帮助。
        </p>
      </div>
    </div>
  );
}