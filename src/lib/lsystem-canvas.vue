<script setup lang="ts">
import {
    computed,
    useTemplateRef,
    watchEffect,
} from "vue"

import {
    createGenerator,
    createRenderer,
    defineLSystemProductionRules,
    defineLSystemRenderingRules,
    Path2DRendererDevice,
} from "@nealrame/l-system"

import {
    type TLSystemCanvasRendererComponentProps,
} from  "./types"

const props = withDefaults(defineProps<TLSystemCanvasRendererComponentProps>(), {
    backgroundColor: null,
    stroke: "black",
    strokeWidth: 1,
    padding: 0,
    steps: 1,
})

const canvasRef = useTemplateRef("canvas")

const word = computed(() => {
    const generate = createGenerator(defineLSystemProductionRules(props.productionRules))
    return generate(props.axiom, props.steps)
})

const device = computed(() => {
    const device = new Path2DRendererDevice()
    const render = createRenderer(defineLSystemRenderingRules(props.renderingRules))
    
    render(word.value, device)

    return {
        path: device.path,
        rect: device.rect,
    }
})

const d = computed(() => device.value?.path ?? "")

watchEffect(() => {
    const canvas = canvasRef.value

    if (canvas == null) {
        return
    }

    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    const ctx = canvas.getContext("2d")

    const pad = props.padding
    const rect = device.value?.rect ?? { x: 0, y: 0, w: 0, h: 0 }
    const strokeStyle = props.stroke
    const lineWidth = props.strokeWidth

    if (ctx != null) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.save()
        ctx.fillStyle = props.backgroundColor ?? "rgba(0, 0, 0, 0)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.translate(pad, pad)

        const vw = Math.max(canvas.width - 2*pad, 0)
        const vh = Math.max(canvas.height - 2*pad, 0)
        const f = Math.min(
            vw/Math.max(1, rect.w),
            vh/Math.max(1, rect.h),
        )

        const tx = vw/2 - (rect.x + rect.w/2)*f
        const ty = vh/2 - (rect.y + rect.h/2)*f

        ctx.translate(tx, ty)
        ctx.scale(f, f)
        ctx.strokeStyle = strokeStyle
        ctx.lineWidth = lineWidth/f
        ctx.stroke(new Path2D(d.value))

        ctx.restore()
    }
})
</script>

<template>
<canvas
    ref="canvas"
></canvas>
</template>

<style lang="css" scope>
canvas {
    height: 100%;
    width: 100%;
}
</style>