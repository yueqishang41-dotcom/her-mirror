export default async function handler(event) {
  // 只允许 POST 请求
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { answers } = JSON.parse(event.body);

    // 获取 API Key（从环境变量获取）
    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      // 如果没有 API Key，返回本地生成的结果
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          poem: generateLocalPoem(answers),
          letter: generateLocalLetter(answers)
        })
      };
    }

    // 生成诗
    const poemPrompt = buildPoemPrompt(answers);
    const poemResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: poemPrompt }],
        max_tokens: 600,
        temperature: 0.8
      })
    });

    const poemData = await poemResponse.json();
    const poem = poemData.choices?.[0]?.message?.content || generateLocalPoem(answers);

    // 生成信
    const letterPrompt = buildLetterPrompt(answers);
    const letterResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: letterPrompt }],
        max_tokens: 800,
        temperature: 0.7
      })
    });

    const letterData = await letterResponse.json();
    const letter = letterData.choices?.[0]?.message?.content || generateLocalLetter(answers);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ poem, letter })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error', details: error.message })
    };
  }
}

// 构建 poem prompt
function buildPoemPrompt(answers) {
  return `你是一个温柔的诗人，也是一个好的倾听者。

以下是一位女性对8个自我探索问题的原始回答。
请用她的原话为素材，写一首10-14行的短诗。

【严格规则】
1. 每一行必须包含她的原话片段（直接引用，可微调语序使其通顺）
2. 使用"她说……"的句式，像一个温柔的第三者在转述她的声音
3. 诗的顺序大致遵循：童年记忆 → 力量 → 隐秘 → 压抑 → 真我 → 她对自己的定义
4. 最后两行固定为：
   "[她Q8的原话]"
   "——这首诗的作者，是你自己。"
5. 语气：温暖、安静、克制，不煽情，不励志
6. 不使用任何心理学术语，不分析，不评判
7. 如果某题被跳过，直接跳过对应的行，不要编造内容
8. 如果某题的回答中涉及自杀、自伤、家暴等内容，改为温和的转述，如"她说她经历过很深很深的痛苦"

【用户的回答】
${answers.map(a => `Q${a.id}：${a.answer}`).join('\n')}

请生成诗（10-14行）：`;
}

// 构建 letter prompt
function buildLetterPrompt(answers) {
  const date = new Date();
  const dateStr = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

  return `你是一个温暖的写信人。

以下是一位女性对8个自我探索问题的回答。
请以"写给她自己的一封信"的形式，整理她的回答。

【严格规则】
1. 开头：以"亲爱的，你好。" 或 "嗨，是我。" 温暖亲近的方式开头
2. 信中必须直接引用她的原话至少3处（用引号标出）
3. 核心信息：你刚才说的那些话，是你自己说的——这就是你
4. 语气：像一个最了解她的老朋友，温暖、平等、不说教
5. 不分析她，不给建议，不使用心理学术语
6. 不要说"你很勇敢""你很棒"这类廉价的鼓励
7. 落稿："你自己 ${dateStr}"
8. 总字数：200-280字
9. 如果某题被跳过，不提及对应内容
10. 如果回答中涉及危机内容，在信末加一行："如果你现在很难，请记得你值得被帮助。"

【用户的回答】
${answers.map(a => `Q${a.id}：${a.answer}`).join('\n')}

请生成信（200-280字）：`;
}

// 本地生成函数（当 API 不可用时）
function generateLocalPoem(answers) {
  const lines = [];
  const q1 = answers.find(a => a.id === 1);
  if (q1 && !q1.skipped) lines.push(`她说她小时候最爱 ${q1.answer}`);
  const q2 = answers.find(a => a.id === 2);
  if (q2 && !q2.skipped) lines.push(`她说她做过最勇敢的事是 ${q2.answer}`);
  const q6 = answers.find(a => a.id === 6);
  if (q6 && !q6.skipped) lines.push(`她说真正的她 ${q6.answer}`);
  const q8 = answers.find(a => a.id === 8);
  if (q8 && !q8.skipped) lines.push(`"${q8.answer}"`);
  lines.push("——这首诗的作者，是你自己。");
  return lines.join('\n');
}

function generateLocalLetter(answers) {
  const date = new Date();
  const dateStr = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  let letter = `嗨，是我。\n\n你刚才说了很多话。也许你觉得都是些小事。\n但我想告诉你，我都听见了。\n\n`;
  answers.filter(a => !a.skipped).slice(0, 3).forEach(a => {
    letter += `你说 "${a.answer}"。\n`;
  });
  const q8 = answers.find(a => a.id === 8);
  if (q8 && !q8.skipped) letter += `\n你说你是 "${q8.answer}"。我记住这句话了。\n\n`;
  letter += `今天，你自己说出来了这些。\n不是我说的，不是任何人替你说的。\n是你。\n\n你自己\n${dateStr}`;
  return letter;
}