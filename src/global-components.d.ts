import LSystemCanvas from "./lib/lsystem-canvas.vue"
import LSystemSVG from "./lib/lsystem-svg.vue"

declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        LSystemCanvas: typeof LSystemCanvas
        LSystemSVG: typeof LSystemSVG
    }
}
