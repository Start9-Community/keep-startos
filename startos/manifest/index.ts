import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'keep',
  title: 'Keep',
  license: 'MIT',
  packageRepo: 'https://github.com/privkeyio/keep-startos',
  upstreamRepo: 'https://github.com/privkeyio/keep',
  marketingUrl: 'https://github.com/privkeyio/keep',
  donationUrl: null,
  description: {
    short,
    long,
  },
  volumes: ['main'],
  images: {
    keep: {
      source: {
        dockerBuild: {},
      },
      arch: ['x86_64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
