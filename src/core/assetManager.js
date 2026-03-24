export class AssetManager {

    constructor() {
        this.sheets = {}
    }

    async loadSheet(key, path, p) {
        this.sheets[key] = await p.loadImage(path)
    }

    get(key) {
        return this.sheets[key]
    }

}