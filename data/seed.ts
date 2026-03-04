import type { DayPlan } from "../types";

/** 48 音标 × 5 单词 + IPA（宽式/偏英式），Step3 展示用 */
export const SEED_PLANS: DayPlan[] = [
  {
    dayIndex: 1,
    title: "前元音",
    phonemes: [
      {
        ipa: "iː",
        tips: "长元音 i，嘴角向两侧拉，音更长",
        graphemes: ["ee", "ea", "e", "ie"],
        words: [
          { word: "see", ipa: "siː" },
          { word: "green", ipa: "ɡriːn" },
          { word: "meet", ipa: "miːt" },
          { word: "sheep", ipa: "ʃiːp" },
          { word: "leave", ipa: "liːv" },
        ],
      },
      {
        ipa: "ɪ",
        tips: "短元音 i，更短更放松",
        graphemes: ["i", "y"],
        words: [
          { word: "sit", ipa: "sɪt" },
          { word: "ship", ipa: "ʃɪp" },
          { word: "big", ipa: "bɪɡ" },
          { word: "milk", ipa: "mɪlk" },
          { word: "fish", ipa: "fɪʃ" },
        ],
      },
      {
        ipa: "e",
        tips: "bed/head 的 e，嘴角略向两侧",
        graphemes: ["e", "ea"],
        words: [
          { word: "bed", ipa: "bed" },
          { word: "red", ipa: "red" },
          { word: "head", ipa: "hed" },
          { word: "pen", ipa: "pen" },
          { word: "leg", ipa: "leɡ" },
        ],
      },
      {
        ipa: "æ",
        tips: "更开口的 a，pen-pan 对比",
        graphemes: ["a"],
        words: [
          { word: "cat", ipa: "kæt" },
          { word: "map", ipa: "mæp" },
          { word: "bag", ipa: "bæɡ" },
          { word: "hand", ipa: "hænd" },
          { word: "plan", ipa: "plæn" },
        ],
      },
    ],
  },
  {
    dayIndex: 2,
    title: "中元音",
    phonemes: [
      {
        ipa: "ɜː",
        tips: "bird 的音，重读更明显",
        graphemes: ["er", "ir", "ur", "ear"],
        words: [
          { word: "bird", ipa: "bɜːd" },
          { word: "girl", ipa: "ɡɜːl" },
          { word: "work", ipa: "wɜːk" },
          { word: "learn", ipa: "lɜːn" },
          { word: "nurse", ipa: "nɜːs" },
        ],
      },
      {
        ipa: "ə",
        tips: "弱读 schwa，非重读常出现",
        graphemes: ["a", "o", "e"],
        words: [
          { word: "about", ipa: "əˈbaʊt" },
          { word: "ago", ipa: "əˈɡəʊ" },
          { word: "teacher", ipa: "ˈtiːtʃə" },
          { word: "problem", ipa: "ˈprɒbləm" },
          { word: "support", ipa: "səˈpɔːt" },
        ],
      },
      {
        ipa: "ʌ",
        tips: "cup 的音，短促",
        graphemes: ["u", "o", "ou"],
        words: [
          { word: "cup", ipa: "kʌp" },
          { word: "love", ipa: "lʌv" },
          { word: "sun", ipa: "sʌn" },
          { word: "money", ipa: "ˈmʌni" },
          { word: "tough", ipa: "tʌf" },
        ],
      },
    ],
  },
  {
    dayIndex: 3,
    title: "后元音",
    phonemes: [
      {
        ipa: "uː",
        tips: "food 的长 u",
        graphemes: ["oo", "u", "ew"],
        words: [
          { word: "food", ipa: "fuːd" },
          { word: "blue", ipa: "bluː" },
          { word: "school", ipa: "skuːl" },
          { word: "move", ipa: "muːv" },
          { word: "room", ipa: "ruːm" },
        ],
      },
      {
        ipa: "ʊ",
        tips: "book 的短 u",
        graphemes: ["oo", "u"],
        words: [
          { word: "book", ipa: "bʊk" },
          { word: "look", ipa: "lʊk" },
          { word: "good", ipa: "ɡʊd" },
          { word: "foot", ipa: "fʊt" },
          { word: "cook", ipa: "kʊk" },
        ],
      },
      {
        ipa: "ɔː",
        tips: "saw/sort 的长 o",
        graphemes: ["aw", "or", "au"],
        words: [
          { word: "saw", ipa: "sɔː" },
          { word: "talk", ipa: "tɔːk" },
          { word: "law", ipa: "lɔː" },
          { word: "door", ipa: "dɔː" },
          { word: "morning", ipa: "ˈmɔːnɪŋ" },
        ],
      },
      {
        ipa: "ɒ",
        tips: "hot 这一类（英式更常见），先会读即可",
        graphemes: ["o"],
        words: [
          { word: "hot", ipa: "hɒt" },
          { word: "rock", ipa: "rɒk" },
          { word: "not", ipa: "nɒt" },
          { word: "job", ipa: "dʒɒb" },
          { word: "watch", ipa: "wɒtʃ" },
        ],
      },
      {
        ipa: "ɑː",
        tips: "后开口长 a（美式 hot/want 常见），先会读即可",
        graphemes: ["a"],
        words: [
          { word: "father", ipa: "ˈfɑːðə" },
          { word: "car", ipa: "kɑː" },
          { word: "start", ipa: "stɑːt" },
          { word: "hard", ipa: "hɑːd" },
          { word: "park", ipa: "pɑːk" },
        ],
      },
    ],
  },
  {
    dayIndex: 4,
    title: "开合双元音",
    phonemes: [
      {
        ipa: "eɪ",
        tips: "rain/day",
        graphemes: ["ai", "ay"],
        words: [
          { word: "day", ipa: "deɪ" },
          { word: "name", ipa: "neɪm" },
          { word: "make", ipa: "meɪk" },
          { word: "rain", ipa: "reɪn" },
          { word: "train", ipa: "treɪn" },
        ],
      },
      {
        ipa: "aɪ",
        tips: "night/time",
        graphemes: ["igh", "i-e"],
        words: [
          { word: "my", ipa: "maɪ" },
          { word: "time", ipa: "taɪm" },
          { word: "five", ipa: "faɪv" },
          { word: "night", ipa: "naɪt" },
          { word: "like", ipa: "laɪk" },
        ],
      },
      {
        ipa: "ɔɪ",
        tips: "boy/coin",
        graphemes: ["oi", "oy"],
        words: [
          { word: "boy", ipa: "bɔɪ" },
          { word: "toy", ipa: "tɔɪ" },
          { word: "coin", ipa: "kɔɪn" },
          { word: "noise", ipa: "nɔɪz" },
          { word: "join", ipa: "dʒɔɪn" },
        ],
      },
      {
        ipa: "aʊ",
        tips: "now/out",
        graphemes: ["ou", "ow"],
        words: [
          { word: "now", ipa: "naʊ" },
          { word: "out", ipa: "aʊt" },
          { word: "house", ipa: "haʊs" },
          { word: "down", ipa: "daʊn" },
          { word: "shout", ipa: "ʃaʊt" },
        ],
      },
      {
        ipa: "əʊ",
        tips: "boat/snow",
        graphemes: ["oa", "ow"],
        words: [
          { word: "go", ipa: "ɡəʊ" },
          { word: "no", ipa: "nəʊ" },
          { word: "home", ipa: "həʊm" },
          { word: "boat", ipa: "bəʊt" },
          { word: "snow", ipa: "snəʊ" },
        ],
      },
    ],
  },
  {
    dayIndex: 5,
    title: "集中双元音",
    phonemes: [
      {
        ipa: "ɪə",
        tips: "near/fear",
        graphemes: ["ear"],
        words: [
          { word: "near", ipa: "nɪə" },
          { word: "here", ipa: "hɪə" },
          { word: "fear", ipa: "fɪə" },
          { word: "ear", ipa: "ɪə" },
          { word: "clear", ipa: "klɪə" },
        ],
      },
      {
        ipa: "eə",
        tips: "hair/care",
        graphemes: ["air", "are", "ear"],
        words: [
          { word: "hair", ipa: "heə" },
          { word: "care", ipa: "keə" },
          { word: "bear", ipa: "beə" },
          { word: "there", ipa: "ðeə" },
          { word: "pair", ipa: "peə" },
        ],
      },
      {
        ipa: "ʊə",
        tips: "tour/pure",
        graphemes: ["our", "ure"],
        words: [
          { word: "tour", ipa: "tʊə" },
          { word: "pure", ipa: "pjʊə" },
          { word: "cure", ipa: "kjʊə" },
          { word: "sure", ipa: "ʃʊə" },
          { word: "poor", ipa: "pʊə" },
        ],
      },
    ],
  },
  {
    dayIndex: 6,
    title: "爆破音",
    phonemes: [
      {
        ipa: "p",
        tips: "清辅音送气",
        graphemes: ["p"],
        words: [
          { word: "pin", ipa: "pɪn" },
          { word: "map", ipa: "mæp" },
          { word: "paper", ipa: "ˈpeɪpə" },
          { word: "open", ipa: "ˈəʊpən" },
          { word: "happy", ipa: "ˈhæpi" },
        ],
      },
      {
        ipa: "t",
        tips: "清辅音送气",
        graphemes: ["t"],
        words: [
          { word: "tea", ipa: "tiː" },
          { word: "time", ipa: "taɪm" },
          { word: "ten", ipa: "ten" },
          { word: "city", ipa: "ˈsɪti" },
          { word: "water", ipa: "ˈwɔːtə" },
        ],
      },
      {
        ipa: "k",
        tips: "清辅音送气",
        graphemes: ["k", "c"],
        words: [
          { word: "cat", ipa: "kæt" },
          { word: "key", ipa: "kiː" },
          { word: "make", ipa: "meɪk" },
          { word: "school", ipa: "skuːl" },
          { word: "back", ipa: "bæk" },
        ],
      },
      {
        ipa: "b",
        tips: "浊辅音声带振动",
        graphemes: ["b"],
        words: [
          { word: "bad", ipa: "bæd" },
          { word: "big", ipa: "bɪɡ" },
          { word: "baby", ipa: "ˈbeɪbi" },
          { word: "job", ipa: "dʒɒb" },
          { word: "blue", ipa: "bluː" },
        ],
      },
      {
        ipa: "d",
        tips: "浊辅音声带振动",
        graphemes: ["d"],
        words: [
          { word: "dog", ipa: "dɒɡ" },
          { word: "day", ipa: "deɪ" },
          { word: "need", ipa: "niːd" },
          { word: "ride", ipa: "raɪd" },
          { word: "door", ipa: "dɔː" },
        ],
      },
      {
        ipa: "g",
        tips: "浊辅音声带振动",
        graphemes: ["g"],
        words: [
          { word: "go", ipa: "ɡəʊ" },
          { word: "game", ipa: "ɡeɪm" },
          { word: "big", ipa: "bɪɡ" },
          { word: "green", ipa: "ɡriːn" },
          { word: "bag", ipa: "bæɡ" },
        ],
      },
    ],
  },
  {
    dayIndex: 7,
    title: "摩擦音",
    phonemes: [
      {
        ipa: "f",
        graphemes: ["f", "ph"],
        words: [
          { word: "fine", ipa: "faɪn" },
          { word: "food", ipa: "fuːd" },
          { word: "coffee", ipa: "ˈkɒfi" },
          { word: "laugh", ipa: "lɑːf" },
          { word: "phone", ipa: "fəʊn" },
        ],
      },
      {
        ipa: "s",
        graphemes: ["s", "c"],
        words: [
          { word: "see", ipa: "siː" },
          { word: "sun", ipa: "sʌn" },
          { word: "bus", ipa: "bʌs" },
          { word: "city", ipa: "ˈsɪti" },
          { word: "rice", ipa: "raɪs" },
        ],
      },
      {
        ipa: "ʃ",
        graphemes: ["sh", "ti"],
        words: [
          { word: "ship", ipa: "ʃɪp" },
          { word: "she", ipa: "ʃiː" },
          { word: "fish", ipa: "fɪʃ" },
          { word: "shop", ipa: "ʃɒp" },
          { word: "sure", ipa: "ʃʊə" },
        ],
      },
      {
        ipa: "θ",
        graphemes: ["th"],
        words: [
          { word: "think", ipa: "θɪŋk" },
          { word: "thin", ipa: "θɪn" },
          { word: "bath", ipa: "bɑːθ" },
          { word: "teeth", ipa: "tiːθ" },
          { word: "author", ipa: "ˈɔːθə" },
        ],
      },
      {
        ipa: "h",
        graphemes: ["h"],
        words: [
          { word: "hat", ipa: "hæt" },
          { word: "hot", ipa: "hɒt" },
          { word: "home", ipa: "həʊm" },
          { word: "behind", ipa: "bɪˈhaɪnd" },
          { word: "help", ipa: "help" },
        ],
      },
      {
        ipa: "v",
        graphemes: ["v"],
        words: [
          { word: "very", ipa: "ˈveri" },
          { word: "love", ipa: "lʌv" },
          { word: "move", ipa: "muːv" },
          { word: "seven", ipa: "ˈsevən" },
          { word: "voice", ipa: "vɔɪs" },
        ],
      },
      {
        ipa: "z",
        graphemes: ["z", "s"],
        words: [
          { word: "zoo", ipa: "zuː" },
          { word: "zero", ipa: "ˈzɪərəʊ" },
          { word: "busy", ipa: "ˈbɪzi" },
          { word: "easy", ipa: "ˈiːzi" },
          { word: "noise", ipa: "nɔɪz" },
        ],
      },
      {
        ipa: "ʒ",
        graphemes: ["s", "ge"],
        words: [
          { word: "vision", ipa: "ˈvɪʒən" },
          { word: "television", ipa: "ˈtelɪˌvɪʒən" },
          { word: "pleasure", ipa: "ˈpleʒə" },
          { word: "usual", ipa: "ˈjuːʒuəl" },
          { word: "measure", ipa: "ˈmeʒə" },
        ],
      },
      {
        ipa: "ð",
        graphemes: ["th"],
        words: [
          { word: "this", ipa: "ðɪs" },
          { word: "that", ipa: "ðæt" },
          { word: "they", ipa: "ðeɪ" },
          { word: "mother", ipa: "ˈmʌðə" },
          { word: "brother", ipa: "ˈbrʌðə" },
        ],
      },
      {
        ipa: "r",
        graphemes: ["r"],
        words: [
          { word: "red", ipa: "red" },
          { word: "right", ipa: "raɪt" },
          { word: "rain", ipa: "reɪn" },
          { word: "around", ipa: "əˈraʊnd" },
          { word: "sorry", ipa: "ˈsɒri" },
        ],
      },
    ],
  },
  {
    dayIndex: 8,
    title: "破擦音 + 连缀",
    phonemes: [
      {
        ipa: "tʃ",
        graphemes: ["ch"],
        words: [
          { word: "chip", ipa: "tʃɪp" },
          { word: "chair", ipa: "tʃeə" },
          { word: "watch", ipa: "wɒtʃ" },
          { word: "teacher", ipa: "ˈtiːtʃə" },
          { word: "match", ipa: "mætʃ" },
        ],
      },
      {
        ipa: "dʒ",
        graphemes: ["j", "g"],
        words: [
          { word: "job", ipa: "dʒɒb" },
          { word: "jump", ipa: "dʒʌmp" },
          { word: "age", ipa: "eɪdʒ" },
          { word: "enjoy", ipa: "ɪnˈdʒɔɪ" },
          { word: "orange", ipa: "ˈɒrɪndʒ" },
        ],
      },
      {
        ipa: "ts",
        graphemes: ["ts"],
        words: [
          { word: "cats", ipa: "kæts" },
          { word: "hats", ipa: "hæts" },
          { word: "fits", ipa: "fɪts" },
          { word: "gets", ipa: "ɡets" },
          { word: "lots", ipa: "lɒts" },
        ],
      },
      {
        ipa: "dz",
        graphemes: ["ds", "dz"],
        words: [
          { word: "beds", ipa: "bedz" },
          { word: "kids", ipa: "kɪdz" },
          { word: "hands", ipa: "hændz" },
          { word: "roads", ipa: "rəʊdz" },
          { word: "needs", ipa: "niːdz" },
        ],
      },
      {
        ipa: "tr",
        graphemes: ["tr"],
        words: [
          { word: "train", ipa: "treɪn" },
          { word: "tree", ipa: "triː" },
          { word: "try", ipa: "traɪ" },
          { word: "true", ipa: "truː" },
          { word: "trip", ipa: "trɪp" },
        ],
      },
      {
        ipa: "dr",
        graphemes: ["dr"],
        words: [
          { word: "drink", ipa: "drɪŋk" },
          { word: "dress", ipa: "dres" },
          { word: "drive", ipa: "draɪv" },
          { word: "dry", ipa: "draɪ" },
          { word: "drum", ipa: "drʌm" },
        ],
      },
    ],
  },
  {
    dayIndex: 9,
    title: "鼻辅音",
    phonemes: [
      {
        ipa: "m",
        graphemes: ["m"],
        words: [
          { word: "me", ipa: "miː" },
          { word: "name", ipa: "neɪm" },
          { word: "time", ipa: "taɪm" },
          { word: "come", ipa: "kʌm" },
          { word: "milk", ipa: "mɪlk" },
        ],
      },
      {
        ipa: "n",
        graphemes: ["n"],
        words: [
          { word: "no", ipa: "nəʊ" },
          { word: "nice", ipa: "naɪs" },
          { word: "ten", ipa: "ten" },
          { word: "name", ipa: "neɪm" },
          { word: "sun", ipa: "sʌn" },
        ],
      },
      {
        ipa: "ŋ",
        graphemes: ["ng", "nk"],
        words: [
          { word: "sing", ipa: "sɪŋ" },
          { word: "song", ipa: "sɒŋ" },
          { word: "long", ipa: "lɒŋ" },
          { word: "think", ipa: "θɪŋk" },
          { word: "ring", ipa: "rɪŋ" },
        ],
      },
    ],
  },
  {
    dayIndex: 10,
    title: "舌边音",
    phonemes: [
      {
        ipa: "l",
        graphemes: ["l", "ll", "le"],
        words: [
          { word: "light", ipa: "laɪt" },
          { word: "look", ipa: "lʊk" },
          { word: "milk", ipa: "mɪlk" },
          { word: "blue", ipa: "bluː" },
          { word: "all", ipa: "ɔːl" },
        ],
      },
    ],
  },
  {
    dayIndex: 11,
    title: "半元音 + 混合快读",
    phonemes: [
      {
        ipa: "j",
        graphemes: ["y"],
        words: [
          { word: "yes", ipa: "jes" },
          { word: "you", ipa: "juː" },
          { word: "yellow", ipa: "ˈjeləʊ" },
          { word: "use", ipa: "juːz" },
          { word: "unit", ipa: "ˈjuːnɪt" },
        ],
      },
      {
        ipa: "w",
        graphemes: ["w"],
        words: [
          { word: "we", ipa: "wiː" },
          { word: "win", ipa: "wɪn" },
          { word: "water", ipa: "ˈwɔːtə" },
          { word: "away", ipa: "əˈweɪ" },
          { word: "window", ipa: "ˈwɪndəʊ" },
        ],
      },
      {
        ipa: "review",
        tips: "混合快读（不作为音素播放）",
        graphemes: [],
        words: [
          { word: "day" },
          { word: "night" },
          { word: "boat" },
          { word: "now" },
          { word: "near" },
        ],
      },
    ],
  },
];

/** 兼容 store 等原有引用 */
export const seedPlans = SEED_PLANS;
