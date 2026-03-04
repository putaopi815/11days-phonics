# 脚本说明

## 批量生成单词读音（gen-tts.mjs）

使用 OpenAI TTS 为单词列表批量生成 MP3，一个单词一个文件。

### 1. 准备 data/words.txt

在项目根目录创建 `data/words.txt`，**每行一个单词**。可以包含：

- 重复（会按“大小写不敏感”去重，只生成一份音频）
- 空行（会自动忽略）
- 大小写混合（See / see 视为同一词，只生成一次）
- 带空格/符号的短语（如 `New York`，会生成 `new_york.mp3`）

示例：

```
see
green
meet
New York
```

### 2. 配置 API Key

复制环境变量示例并填入真实 key（不要提交到仓库）：

```bash
cp .env.local.example .env.local
# 编辑 .env.local，写入: OPENAI_API_KEY=sk-...
```

或临时导出后运行：

```bash
export OPENAI_API_KEY=sk-...
node scripts/gen-tts.mjs
```

### 3. 安装依赖

若尚未安装 `openai`：

```bash
npm i openai
```

### 4. 运行脚本

在项目根目录执行：

```bash
node scripts/gen-tts.mjs
```

脚本会：

- 读取 `data/words.txt` 并去重
- 已存在的 `public/word-audio/<safeWord>.mp3` 会跳过
- 每个新词最多重试 2 次；仍失败则写入 `logs/tts_failed.txt`
- 最后生成 `public/word-audio/mapping.json`（原始单词 -> 文件名）

### 5. 输出说明

| 路径 | 说明 |
|------|------|
| `public/word-audio/<safeWord>.mp3` | 单个单词的 MP3，文件名由“安全规则”生成 |
| `public/word-audio/mapping.json` | 映射表，如 `{ "see": "see.mp3", "new york": "new_york.mp3" }` |
| `logs/tts_failed.txt` | 生成失败的单词及错误信息（若有） |

### 6. 在浏览器中访问

Next 会把 `public/` 下的文件当作静态资源，可直接访问：

- 单个音频：`/word-audio/see.mp3`
- 映射表：`/word-audio/mapping.json`

示例：

```html
<audio src="/word-audio/see.mp3" controls />
```
