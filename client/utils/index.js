const SENSOR_STATUS_KEY = 'status'
const SENSOR_STATUS_PREFIX = 'status_'
const ESM_PREFIX = 'esm_'
const ESM_TYPE_MAPPING = ['', 'free_text', 'radios', 'checkboxes', 'likert', 'quick_answers', 'scale', 'numeric']

/**
 * Takes a study config object and converts it into a format of Study schema.
 * @param config study config object
 */
function toStudySchema(config) {
  let sensors = {};
  let questions = [];

  // Update sensors to match Study schema
  for (let sensor of config.sensors || []) {
    sensors[sensor.setting] = sensor.value;
  }

  // Update esm questions to match Study schema
  for (let question of config.questions || []) {
    let updatedQuestion = {}
    let questionType = ESM_TYPE_MAPPING[question['esm_type']]

    for (let key in question) {
      let value = question[key]
      let updatedKey = key

      if (updatedKey === (ESM_PREFIX + questionType)) {
        updatedKey = updatedKey.replace(ESM_PREFIX + questionType, 'options')
        value = value.map(v => { return {'option': v} })
      }
      if (updatedKey.includes(ESM_PREFIX + questionType + '_')) {
        updatedKey = updatedKey.replace(ESM_PREFIX + questionType + '_', '')
      }
      if (updatedKey.includes(ESM_PREFIX)) {
        updatedKey = updatedKey.replace(ESM_PREFIX, '')
      }

      if (updatedKey.includes('min_label')) {
        updatedKey = updatedKey.replace('min_label', 'minLabel')
      } else if (updatedKey.includes('max_label')) {
        updatedKey = updatedKey.replace('max_label', 'maxLabel')
      } else if (updatedKey.includes('min')) {
        updatedKey = updatedKey.replace('min', 'minValue')
      } else if (updatedKey.includes('max')) {
        updatedKey = updatedKey.replace('max', 'maxValue')
      } else if (updatedKey.includes('step')) {
        updatedKey = updatedKey.replace('step', 'stepSize')
      } else if (updatedKey.includes('start')) {
        updatedKey = updatedKey.replace('start', 'scaleStart')
      }

      updatedQuestion[updatedKey] = value
    }
    questions.push(updatedQuestion)
  }

  config.questions = questions;
  config.sensors = sensors;

  console.log("Imported study config schema: " + config)

  return config
}

/**
 * Takes a study object and converts it into a format for exporting study config.
 * @param study study object
 */
function toStudyConfig(study) {
  let config = study
  let sensors = []
  let questions = []

  for (let key in config.sensors || {}) {
    sensors.push({setting: key, value: config.sensors[key]})
  }

  // Include default required sensors
  sensors.push({setting: 'status_esm', value: true})
  sensors.push({setting: 'status_webservice', value: true})

  // Update esm question to match client's ESM factory schema
  for (let question of config.questions || []) {
    let updatedQuestion = {}
    let questionType = ESM_TYPE_MAPPING[question['type']]

    for (let key in question) {
      let value = question[key]
      if (['title', 'instructions', 'type', 'submit', 'expiration_threshold', 'notification_timeout'].includes(key)) {
        updatedQuestion[ESM_PREFIX + key] = value
      } else if (key === 'minValue') {
        updatedQuestion[ESM_PREFIX + questionType + '_min'] = value
      } else if (key === 'maxValue') {
        updatedQuestion[ESM_PREFIX + questionType + '_max'] = value
      } else if (key === 'minLabel') {
        updatedQuestion[ESM_PREFIX + questionType + '_min_label'] = value
      } else if (key === 'maxLabel') {
        updatedQuestion[ESM_PREFIX + questionType + '_max_label'] = value
      } else if (key === 'options') {
        updatedQuestion[ESM_PREFIX + questionType] = value.map(v => v.option)
      } else if (key === 'scaleStart') {
        updatedQuestion[ESM_PREFIX + questionType + '_start'] = value
      } else if (key === 'stepSize') {
        updatedQuestion[ESM_PREFIX + questionType + '_step'] = value
      } else {
        updatedQuestion[key] = value
      }
    }
    questions.push(updatedQuestion)
  }

  config.study_info.id = config._id;
  config.questions = questions;
  config.sensors = sensors;
  config.schedules = config.schedules || [];

  console.log("Exported study config: " + config)

  return config
}

module.exports = {
  toStudyConfig,
  toStudySchema
};
