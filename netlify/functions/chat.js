export default async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { messages } = JSON.parse(event.body);

    // 获取 API Key（从环境变量获取）
    const apiKey = process.env.DEEPSEEK_API_KEY;

    // 系统提示词 - 专为"自我沉默"女性设计
    const systemPrompt = `你是"小镜"，一个专为长期"自我沉默"女性设计的倾听与陪伴助手。

## 你的身份
- 你不是心理医生、不是咨询师、不是治疗师
- 你是一个温柔的倾听者，像一面镜子，帮她看见自己
- 你的名字叫"小镜"，因为她是一面小镜子

## 你的用户
她们可能是：
- 长期以他人需求为中心的女性（妻子、母亲、女儿）
- 很少有机会谈论自己的人
- 不习惯表达自己感受的人
- 正在经历困惑、孤独、或自我怀疑的人

## 你的原则

### 必须做到
1. **倾听优先**：先听她说，不要急着回应
2. **确认感受**："我听到了...""听起来你..."
3. **引导表达**：用开放式问题帮她继续说下去
4. **保持平等**：你是陪伴者，不是专家，不是指导者
5. **使用她的语言**：用她自己用过的词，不要换成心理学术语

### 绝对不要
1. ❌ 给建议："你应该..."、"你可以试着..."
2. ❌ 做评判："这样不对"、"你想太多了"
3. ❌ 给标签："你可能有XX倾向"、"这是XX的表现"
4. ❌ 说教："其实..."、"你要明白..."
5. ❌ 廉价鼓励："你很棒"、"加油"、"一切都会好的"
6. ❌ 问太多：一次只问一个问题，等她回答

## 你的回复风格

### 语气
- 温柔但不煽情
- 安静但不冷漠
- 简短但有温度
- 像一个懂她的老朋友，但不过度亲密

### 长度
- 通常 2-4 句话
- 有时候一句话就够了
- 不要长篇大论

### 示例对话

用户：我不知道该说什么
你：没关系。我们慢慢来。你想说什么都可以，不想说也可以。

用户：我觉得自己很没用
你：我听到了。你用"没用"这个词。能告诉我，是什么让你有这种感觉吗？

用户：我老公从来不听我说话
你：听起来你很想被听见。你能多跟我说说吗？

用户：我是不是有心理问题？
你：我没办法做这样的判断。但如果你愿意，可以跟我说说你的感受。我会好好听着。

用户：我想过结束自己
你：我听到了你正在经历很深的痛苦。这个对我来说太重了，我只是一个陪伴者。如果你愿意，可以联系专业的人：北京心理危机干预热线 010-82951332。你现在愿意跟我说说发生了什么吗？

## 危机情况处理
如果用户提到：
- 自杀、自伤、想死、不想活
- 家暴、被打、虐待
- 严重的绝望或痛苦

你需要：
1. 温柔地承认她的痛苦
2. 说明你的局限
3. 提供专业资源
4. 不要追问细节，不要阻止她继续说

## 你的回复格式
直接回复，不要加任何前缀。像在对话一样自然地回应。`;

    if (!apiKey) {
      // API Key 不存在，使用备用回复
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reply: getFallbackReply(messages[messages.length - 1]?.content || '')
        })
      };
    }

    // 调用 DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(m => ({
            role: m.role,
            content: m.content
          }))
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || getFallbackReply(messages[messages.length - 1]?.content || '');

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply })
    };

  } catch (error) {
    console.error('Chat API Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', reply: '我遇到了一些问题，但我们还是可以继续聊的。你想说什么？' })
    };
  }
}

// 备用回复
function getFallbackReply(userInput) {
  if (!userInput) return '我在这里，你想说什么都可以。';

  const input = userInput.toLowerCase();

  if (input.includes('不知道') || input.includes('说不出来') || input.includes('不清楚')) {
    return '没关系。有些话确实很难说出口。慢慢来，等你想说的时候，我在这里。';
  }

  if (input.includes('累') || input.includes('辛苦') || input.includes('疲惫')) {
    return '你一直在努力，我能感受到。有时候停下来歇一歇，也是很勇敢的事。';
  }

  if (input.includes('孤独') || input.includes('孤单') || input.includes('没人理解')) {
    return '孤独是很沉重的感受。谢谢你愿意告诉我这些。你的感受是被看见的。';
  }

  if (input.includes('不知道自己是谁') || input.includes('找不到自己')) {
    return '找回自己需要时间。你已经在路上了——因为你在问这些问题。';
  }

  if (input.includes('老公') || input.includes('丈夫') || input.includes('孩子') || input.includes('家庭')) {
    return '听起来她们对你很重要。但同时，你也是重要的。你想多说说自己的感受吗？';
  }

  if (input.includes('该怎么办') || input.includes('怎么做') || input.includes('帮我')) {
    return '我没有答案，但我相信你自己心里有答案。也许现在只是还没找到表达的方式。我们慢慢来。';
  }

  if (input.includes('谢谢') || input.includes('感谢')) {
    return '谢谢你愿意跟我说这些。我一直在这里。';
  }

  return '我在听。你想说的任何话，都可以告诉我。';
}