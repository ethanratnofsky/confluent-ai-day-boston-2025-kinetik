import { createLayerComponent } from '@react-leaflet/core'
import L from 'leaflet'
import 'leaflet.heat'

const createHeatLayer = (props, context) => {
  const { points = [], ...options } = props
  const instance = L.heatLayer(points, options)
  return { instance, context }
}

const updateHeatLayer = (instance, props, prevProps) => {
  if (props.points !== prevProps.points) {
    instance.setLatLngs(props.points)
  }

  const optionKeys = ['radius', 'blur', 'max', 'maxZoom', 'minOpacity', 'gradient']
  let shouldUpdateOptions = false
  for (const key of optionKeys) {
    if (props[key] !== prevProps[key]) {
      shouldUpdateOptions = true
      break
    }
  }
  if (shouldUpdateOptions) {
    instance.setOptions({
      radius: props.radius,
      blur: props.blur,
      max: props.max,
      maxZoom: props.maxZoom,
      minOpacity: props.minOpacity,
      gradient: props.gradient
    })
  }

  instance.redraw()
}

const HeatmapLayer = createLayerComponent(createHeatLayer, updateHeatLayer)

export default HeatmapLayer


