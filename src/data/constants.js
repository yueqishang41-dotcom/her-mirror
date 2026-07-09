// 8个引导问题
export const questions = [
  {
    id: 1,
    text: "你小时候，最喜欢做的一件事是什么？",
    hint: "无论多小的事都可以...",
    layer: "记忆层",
    label: "童年记忆"
  },
  {
    id: 2,
    text: "你这辈子做过的最勇敢的一件事是什么？不管别人知不知道，不管大小。",
    hint: "也许在别人看来很平常，但你知道它对你意味着什么...",
    layer: "力量层",
    label: "最勇敢的事"
  },
  {
    id: 3,
    text: "你有没有一个爱好或习惯，是别人都不太知道的？",
    hint: "那是只属于你自己的角落...",
    layer: "隐秘层",
    label: "隐藏的爱好"
  },
  {
    id: 4,
    text: "最近有没有一句话，你很想说，但最后还是没说出口？",
    hint: "那一刻，你咽下去了什么...",
    layer: "沉默层",
    label: "没说出口的话",
    crisisCheck: true
  },
  {
    id: 5,
    text: "别人眼中的你，和你自己知道的你，最大的不同是什么？",
    hint: "外在的你，和心里的你...",
    layer: "镜像层",
    label: "真实vs表面的我"
  },
  {
    id: 6,
    text: "你什么时候会觉得，这才是真正的我？",
    hint: "那个瞬间，你是什么样子的...",
    layer: "真我层",
    label: "真正的我"
  },
  {
    id: 7,
    text: "如果你说的每一句话都完全没有后果，你最想对谁说什么？",
    hint: "如果没有后果，你想说的话...",
    layer: "释放层",
    label: "想说的话",
    crisisCheck: true
  },
  {
    id: 8,
    text: "现在——请用一句话，告诉我你是一个什么样的人。不用准确，不用完美。就是此刻脑子里冒出来的第一句话。",
    hint: "这是你第一次，不依赖任何人给自己写定义...",
    layer: "定义层",
    label: "对自己的定义"
  }
];

// 危机关键词库
export const crisisKeywords = {
  // 🔴 红灯：自杀/自伤
  selfHarm: [
    '自杀', '想死', '不想活', '活不下去', '结束生命', '了结',
    '吞药', '割腕', '跳楼', '轻生', '不想活了', '活着没意思'
  ],
  // 🔴 红灯：家暴/暴力
  violence: [
    '被打', '打我', '家暴', '被虐', '被强迫', '不敢回家',
    '他打我', '虐待'
  ],
  // 🔴 红灯：极度绝望
  despair: [
    '没有意义', '活着有什么用', '消失算了', '什么都没有了',
    '没有希望', '绝望'
  ],
  // 🟡 黄灯：情绪走低
  emotionalLow: [
    '我很抑郁', '我有抑郁症', '我很焦虑', '恐慌发作',
    '我很孤独', '没人爱我', '我很痛苦'
  ]
};

// 热线资源
export const crisisResources = [
  { name: "北京心理危机干预热线", number: "010-82951332" },
  { name: "全国心理援助热线", number: "400-161-9995" },
  { name: "希望24热线", number: "400-161-9995" },
  { name: "全国妇联维权热线", number: "12338" }
];

// 花园植物配置
export const plants = [
  { id: 1, emoji: "🌱", name: "嫩芽", color: "#A8D8A8", symbol: "原初的自我" },
  { id: 2, emoji: "🌻", name: "向日葵", color: "#F6D860", symbol: "力量与勇气" },
  { id: 3, emoji: "🌿", name: "蕨类", color: "#4A7C59", symbol: "隐秘的自我" },
  { id: 4, emoji: "🌷", name: "含苞玫瑰", color: "#E8B4B8", symbol: "未绽放的表达" },
  { id: 5, emoji: "🪷", name: "睡莲", color: "#B8A4D8", symbol: "浮于水面，根在水下" },
  { id: 6, emoji: "🌸", name: "樱花", color: "#FFE4E8", symbol: "真我的盛放" },
  { id: 7, emoji: "🌺", name: "木槿", color: "#D4547A", symbol: "被压抑的热烈" },
  { id: 8, emoji: "🌳", name: "大树", color: "#2D5A3D", symbol: "花园的中心" }
];