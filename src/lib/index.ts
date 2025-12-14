import {
    type App,
} from "vue"

import LSystemCanvas from "./lsystem-canvas.vue"
import LSystemSVG from "./lsystem-svg.vue"

export const LSystem = {
    install(app: App) {
        app
            .component("LSystemCanvas", LSystemCanvas)
            .component("LSystemSVG", LSystemSVG)
    }
}

export * from "@nealrame/l-system"
export * from "./types"
export {
    LSystemCanvas,
    LSystemSVG,
}
