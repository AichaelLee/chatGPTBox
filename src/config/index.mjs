import { defaults } from 'lodash-es'
import Browser from 'webextension-polyfill'
import { isMobile } from '../utils/is-mobile.mjs'

/**
 * @typedef {object} Model
 * @property {string} value
 * @property {string} desc
 */
/**
 * @type {Object.<string,Model>}
 */
export const Models = {
  chatgptFree35: { value: 'text-davinci-002-render-sha', desc: 'ChatGPT (Web)' },
  chatgptPlus4: { value: 'gpt-4', desc: 'ChatGPT (Web, GPT-4)' },
  chatgptApi35: { value: 'gpt-3.5-turbo', desc: 'ChatGPT (GPT-3.5-turbo)' },
  bingFree4: { value: '', desc: 'Bing (Web, GPT-4)' },
  bingFreeSydney: { value: '', desc: 'Bing (Web, GPT-4, Sydney)' },
  poeAiWebSage: { value: 'sage', desc: 'Poe AI (Web, Sage)' },
  poeAiWebGPT4: { value: 'gpt-4', desc: 'Poe AI (Web, GPT-4)' },
  poeAiWebClaudePlus: { value: 'claude+', desc: 'Poe AI (Web, Claude+)' },
  poeAiWebClaude: { value: 'claude', desc: 'Poe AI (Web, Claude)' },
  chatgptApi4_8k: { value: 'gpt-4', desc: 'ChatGPT (GPT-4-8k)' },
  chatgptApi4_32k: { value: 'gpt-4-32k', desc: 'ChatGPT (GPT-4-32k)' },
  gptApiDavinci: { value: 'text-davinci-003', desc: 'GPT-3.5' },
  customModel: { value: '', desc: 'Custom Model' },
  azureOpenAi: { value: '', desc: 'ChatGPT (Azure)' },
  waylaidwandererApi: { value: '', desc: 'Waylaidwanderer API (Github)' },
  poeAiWebCustom: { value: '', desc: 'Poe AI (Web, Custom)' },
  poeAiWebChatGpt: { value: 'chatgpt', desc: 'Poe AI (Web, ChatGPT)' },
  poeAiWebDragonfly: { value: 'dragonfly', desc: 'Poe AI (Web, Dragonfly)' },
}

export const chatgptWebModelKeys = ['chatgptFree35', 'chatgptPlus4']
export const bingWebModelKeys = ['bingFree4', 'bingFreeSydney']
export const gptApiModelKeys = ['gptApiDavinci']
export const chatgptApiModelKeys = ['chatgptApi35', 'chatgptApi4_8k', 'chatgptApi4_32k']
export const customApiModelKeys = ['customModel']
export const azureOpenAiApiModelKeys = ['azureOpenAi']
export const githubThirdPartyApiModelKeys = ['waylaidwandererApi']
export const poeWebModelKeys = [
  'poeAiWebSage',
  'poeAiWebGPT4',
  'poeAiWebClaudePlus',
  'poeAiWebClaude',
  'poeAiWebCustom',
  'poeAiWebChatGpt',
  'poeAiWebDragonfly',
]

export const TriggerMode = {
  always: 'Always',
  questionMark: 'When query ends with question mark (?)',
  manually: 'Manually',
}

export const ThemeMode = {
  light: 'Light',
  dark: 'Dark',
  auto: 'Auto',
}

export const ModelMode = {
  balanced: 'Balanced',
  creative: 'Creative',
  precise: 'Precise',
  fast: 'Fast',
}

/**
 * @typedef {typeof defaultConfig} UserConfig
 */
export const defaultConfig = {
  // general

  /** @type {keyof TriggerMode}*/
  triggerMode: 'manually',
  /** @type {keyof ThemeMode}*/
  themeMode: 'auto',
  /** @type {keyof Models}*/
  modelName: 'chatgptFree35',

  preferredLanguage: getNavigatorLanguage(),
  insertAtTop: isMobile(),
  lockWhenAnswer: false,
  autoRegenAfterSwitchModel: false,
  alwaysPinWindow: false,

  apiKey: '', // openai ApiKey

  azureApiKey: '',
  azureEndpoint: '',
  azureDeploymentName: '',

  poeCustomBotName: '',

  /** @type {keyof ModelMode}*/
  modelMode: 'balanced',

  customModelApiUrl: 'http://localhost:8000/chat/completions',
  customModelName: 'llama-7b-int4',
  githubThirdPartyUrl: 'http://127.0.0.1:3000/conversation',

  // advanced

  maxResponseTokenLength: 1000,
  maxConversationContextLength: 9,
  customChatGptWebApiUrl: 'https://chat.openai.com',
  customChatGptWebApiPath: '/backend-api/conversation',
  customOpenAiApiUrl: 'https://api.openai.com',
  siteRegex: 'match nothing',
  useSiteRegexOnly: false,
  inputQuery: '',
  appendQuery: '',
  prependQuery: '',

  // others

  alwaysCreateNewConversationWindow: false,
  activeSelectionTools: ['translate', 'summary', 'polish', 'code', 'ask'],
  activeSiteAdapters: [
    'bilibili',
    'github',
    'gitlab',
    'quora',
    'reddit',
    'youtube',
    'zhihu',
    'stackoverflow',
    'juejin',
    'mp.weixin.qq',
  ],
  accessToken: '',
  tokenSavedOn: 0,

  // unchangeable

  userLanguage: getNavigatorLanguage(),
  selectionTools: [
    'translate',
    'translateToEn',
    'translateBidi',
    'summary',
    'polish',
    'sentiment',
    'divide',
    'code',
    'ask',
  ],
  selectionToolsDesc: [
    'Translate',
    'Translate (To English)',
    'Translate (Bidirectional)',
    'Summary',
    'Polish',
    'Sentiment Analysis',
    'Divide Paragraphs',
    'Code Explain',
    'Ask',
  ],
  // importing configuration will result in gpt-3-encoder being packaged into the output file
  siteAdapters: [
    'bilibili',
    'github',
    'gitlab',
    'quora',
    'reddit',
    'youtube',
    'zhihu',
    'stackoverflow',
    'juejin',
    'mp.weixin.qq',
  ],
}

export function getNavigatorLanguage() {
  const l = navigator.language.toLowerCase()
  if (['zh-hk', 'zh-mo', 'zh-tw', 'zh-cht', 'zh-hant'].includes(l)) return 'zhHant'
  return navigator.language.substring(0, 2)
}

export function isUsingApiKey(configOrSession) {
  return (
    gptApiModelKeys.includes(configOrSession.modelName) ||
    chatgptApiModelKeys.includes(configOrSession.modelName)
  )
}

export function isUsingMultiModeModel(configOrSession) {
  return bingWebModelKeys.includes(configOrSession.modelName)
}

export function isUsingCustomModel(configOrSession) {
  return customApiModelKeys.includes(configOrSession.modelName)
}

export function isUsingCustomNameOnlyModel(configOrSession) {
  return configOrSession.modelName === 'poeAiWebCustom'
}

export function isUsingAzureOpenAi(configOrSession) {
  return azureOpenAiApiModelKeys.includes(configOrSession.modelName)
}

export function isUsingGithubThirdPartyApi(configOrSession) {
  return githubThirdPartyApiModelKeys.includes(configOrSession.modelName)
}

export async function getPreferredLanguageKey() {
  const config = await getUserConfig()
  if (config.preferredLanguage === 'auto') return config.userLanguage
  return config.preferredLanguage
}

/**
 * get user config from local storage
 * @returns {Promise<UserConfig>}
 */
export async function getUserConfig() {
  const options = await Browser.storage.local.get(Object.keys(defaultConfig))
  return defaults(options, defaultConfig)
}

/**
 * set user config to local storage
 * @param {Partial<UserConfig>} value
 */
export async function setUserConfig(value) {
  await Browser.storage.local.set(value)
}

export async function setAccessToken(accessToken) {
  await setUserConfig({ accessToken, tokenSavedOn: Date.now() })
}

const TOKEN_DURATION = 30 * 24 * 3600 * 1000

export async function clearOldAccessToken() {
  const duration = Date.now() - (await getUserConfig()).tokenSavedOn
  if (duration > TOKEN_DURATION) {
    await setAccessToken('')
  }
}
