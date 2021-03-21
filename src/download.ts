export interface Download {
  architecture: string
  extension: string
  location: string
  platform: string
  template: string
  version: string
}

export interface Downloads {
  downloads: Download[]
  latest: string
}
