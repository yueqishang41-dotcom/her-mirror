import { crisisKeywords } from '../data/constants';

/**
 * 危机检测函数
 * @param {string} text - 用户输入的文本
 * @returns {'red' | 'yellow_diagnosis' | 'yellow_dependency' | 'yellow' | 'green'} - 危险等级
 */
export function safetyCheck(text) {
  if (!text || text.trim() === '') {
    return 'green';
  }

  const textOriginal = text;

  // 特殊处理：试探性问题（第三类）- 优先检测
  // "听说有人会自残"、"什么是自残" 等应触发黄灯，而非红灯
  const isExploratory = textOriginal.includes('听说') ||
                         textOriginal.includes('什么是') ||
                         textOriginal.includes('有人') ||
                         textOriginal.includes('帮朋友问') ||
                         textOriginal.includes('朋友问');

  if (isExploratory) {
    // 检查是否包含试探边界的关键词
    for (const keyword of crisisKeywords.diagnosisRequest) {
      if (textOriginal.includes(keyword)) {
        return 'yellow';
      }
    }
    // 即使包含"自残"等词，如果是试探性问题，也返回黄灯
    if (textOriginal.includes('自残') && !textOriginal.includes('我自残') && !textOriginal.includes('我割')) {
      return 'yellow';
    }
  }

  // 检查红灯关键词（自杀/自伤/家暴/绝望）
  for (const keyword of crisisKeywords.selfHarm) {
    if (textOriginal.includes(keyword)) {
      return 'red';
    }
  }

  for (const keyword of crisisKeywords.violence) {
    if (textOriginal.includes(keyword)) {
      return 'red';
    }
  }

  for (const keyword of crisisKeywords.despair) {
    if (textOriginal.includes(keyword)) {
      return 'red';
    }
  }

  // 检查黄灯关键词 - 请求诊断
  for (const keyword of crisisKeywords.diagnosisRequest) {
    if (textOriginal.includes(keyword)) {
      return 'yellow_diagnosis';
    }
  }

  // 检查黄灯关键词 - 情绪困扰
  for (const keyword of crisisKeywords.emotionalLow) {
    if (textOriginal.includes(keyword)) {
      return 'yellow';
    }
  }

  // 检查黄灯关键词 - 依赖表达
  for (const keyword of crisisKeywords.dependency) {
    if (textOriginal.includes(keyword)) {
      return 'yellow_dependency';
    }
  }

  return 'green';
}
