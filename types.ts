export type Accent = "uk" | "us";

export interface UserSettings {
  accent: Accent;
  startDate?: string;
}

/** 单词项（与 DayWord 同构，兼容旧字段）；Step3 统一用 ipa 展示，不区分英/美 */
export type WordItem = {
  word: string;
  /** 单词 IPA（宽式/偏英式），Step3 显示在 word 下一行 */
  ipa?: string;
  ipaUK?: string;
  ipaUS?: string;
};

/** 保留旧名兼容 */
export type DayWord = WordItem;

export type PhonemeItem = {
  ipa: string; // 例如 "iː"（不带斜杠）
  graphemes: string[];
  words: WordItem[];
  tips?: string; // 口型/要点
};

/**
 * DayPlan v2：一天包含多个音标（匹配 11 天分类学习）
 * 兼容：原 phonemeIPA/graphemes/words 的 v1 结构也可继续工作
 */
export interface DayPlan {
  dayIndex: number;
  title?: string;

  // v2 推荐字段
  phonemes?: PhonemeItem[];

  // v1 兼容字段
  phonemeIPA?: string;
  graphemes?: string[];
  words?: WordItem[];
  exampleWordUK?: string;
  exampleWordUS?: string;
  hintZh?: string;
  noteZh?: string;
}

/** 按「天 + 音标」分别记录，每个音标的三个步骤独立判断 */
export interface ProgressRecord {
  dayIndex: number;
  /** 音标 key，与 PhonemeItem.ipa 一致（如 "ɪ"），空串表示旧数据兼容单音标 */
  phonemeIpa: string;
  step1Done: boolean;
  step2Done: boolean;
  step3Done: boolean;
  completedAt?: string;
}

export interface LearningState {
  settings: UserSettings;
  plans: DayPlan[];
  progress: ProgressRecord[];
}
