import request from './lib/request'
import { apiMap, useMock } from './lib/config'
import * as mockData from './data'

export async function getTabs () {
  if (useMock) {
    return mockData.tabs()
  }

  return request.get(apiMap.getTabs)
    .then(({ data: { data }}) => data.map((item) => ({
      id: item.id,
      icon: item.icon,
      label: item.label
    })))
}

export function getProps () {
  if (useMock) {
    return mockData.props()
  }

  return request.get(apiMap.getProps)
    .then(({ data: { data }}) => data)
}

export function getOthers () {
  if (useMock) {
    return mockData.others()
  }

  return request.get(apiMap.getOthers)
    .then(({ data: { data }}) => data)
}
