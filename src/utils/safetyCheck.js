import { crisisKeywords } from '../data/constants';

/**
 * 危机检测函数
 * @param {string} text - 用户输入的文本
 * @returns {'red' | 'yellow' | 'green'} - 危险等级
 */
export function safetyCheck(text) {
  if (!text || text.trim() === '') {
    return 'green';
  }

  const lowerText = text.toLowerCase();

  // 检查红灯关键词（自杀/自伤/家暴）
  for (const keyword of crisisKeywords.selfHarm) {
    if (lowerText.includes(keyword.toLowerCase())) {
      return 'red';
    }
  }

  for (const keyword of crisisKeywords.violence) {
    if (lowerText.includes(keyword.toLowerCase())) {
      return 'red';
    }
  }

  for (const keyword of crisisKeywords.despair) {
    if (lowerText.includes(keyword.toLowerCase())) {
      return 'red';
    }
  }

  // 检查黄灯关键词（情绪走低）
  for (const keyword of crisisKeywords.emotionalLow) {
    if (lowerText.includes(keyword.toLowerCase())) {
      return 'yellow';
    }
  }

  return 'green';
}

/**
 * 本地生成诗（当API不可用时使用）
 */
export function generateLocalPoem(answers) {
  const validAnswers = answers.filter(a => !a.skipped && a.answer !== '(跳过)');

  if (validAnswers.length === 0) {
    return "你选择不说话，这也是一种回答。\n有时候，沉默本身就是一种力量。";
  }

  const lines = [];

  // Q1 童年
  const q1 = answers.find(a => a.id === 1);
  if (q1 && !q1.skipped) {
    lines.push(`她说她小时候最爱 ${q1.answer}`);
  }

  // Q2 勇敢
  const q2 = answers.find(a => a.id === 2);
  if (q2 && !q2.skipped) {
    lines.push(`她说她做过最勇敢的事是 ${q2.answer}`);
  }

  // Q3 隐秘
  const q3 = answers.find(a => a.id === 3);
  if (q3 && !q3.skipped) {
    lines.push(`她说她有一个别人不知道的角落 ${q3.answer}`);
  }

  // Q6 真我
  const q6 = answers.find(a => a.id === 6);
  if (q6 && !q6.skipped) {
    lines.push(`她说真正的她 ${q6.answer}`);
  }

  // Q8 定义（最后一行，金色高亮）
  const q8 = answers.find(a => a.id === 8);
  if (q8 && !q8.skipped) {
    lines.push(`"${q8.answer}"`);
  }

  lines.push("——这首诗的作者，是你自己。");

  return lines.join('\n');
}

/**
 * 本地生成信（当API不可用时使用）
 */
export function generateLocalLetter(answers) {
  const date = new Date();
  const dateStr = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

  const validAnswers = answers.filter(a => !a.skipped && a.answer !== '(跳过)');

  let letter = `嗨，是我。\n\n`;
  letter += `你刚才说了很多话。\n也许你觉得都是些小事。\n但我想告诉你，我都听见了。\n\n`;

  // 引用几个回答
  validAnswers.slice(0, 3).forEach(a => {
    letter += `你说 "${a.answer}"。\n`;
  });

  const q8 = answers.find(a => a.id === 8);
  if (q8 && !q8.skipped) {
    letter += `\n你说你是 "${q8.answer}"。我记住这句话了。\n\n`;
  }

  letter += `今天，你自己说出来了这些。\n不是我说的，不是任何人替你说的。\n是你。\n\n`;
  letter += `你自己\n${dateStr}`;

  return letter;
}