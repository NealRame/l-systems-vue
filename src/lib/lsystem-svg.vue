<script setup lang="ts">
import {
    computed,
    toRefs,
    unref,
} from "vue"

import {
    createGenerator,
    createRenderer,
    defineLSystemProductionRules,
    defineLSystemRenderingRules,
    Path2DRendererDevice,
} from "@nealrame/l-system"

import {
    type TLSystemSVGRendererComponentProps,
} from  "./types"

const props = withDefaults(defineProps<TLSystemSVGRendererComponentProps>(), {
    backgroundColor: null,
    stroke: "black",
    strokeWidth: 1,
    padding: 0,
    steps: 1,
})

const {
    axiom,
    productionRules,
    renderingRules,
    steps,
    backgroundColor,
    stroke,
    strokeWidth,
    padding,
} = toRefs(props)

const word = computed(() => {
    const generate = createGenerator(defineLSystemProductionRules(productionRules.value))
    return generate(axiom.value, steps.value)
})

const device = computed(() => {
    const device = new Path2DRendererDevice()
    const render = createRenderer(defineLSystemRenderingRules(renderingRules.value))
    
    render(word.value, device)

    return {
        path: device.path,
        rect: device.rect,
    }
})

const style = computed(() => {
    const bgColor = unref(backgroundColor)

    return Object.assign({},
        bgColor != null ? { backgroundColor: bgColor } : {},
    )
})

const viewBox = computed(() => {
    const pad = 2*unref(padding)
    const { rect } = unref(device)

    return `${rect.x} ${rect.y} ${rect.w + pad} ${rect.h + pad}`
})

const transform = computed(() => {
    const pad = unref(padding)

    return `translate(${pad} ${pad})`
})

const d = computed(() => unref(device).path)
</script>

<template>
<svg
    :viewBox
    :style
    preserveAspectRatio="xMidYMid meet"
>
    <g :transform>
        <path
            :d
            :stroke
            :stroke-width="`${strokeWidth}px`"
            stroke-linecap="round"
            fill="none"
            vector-effect="non-scaling-stroke"
        />
    </g>
</svg>
</template>