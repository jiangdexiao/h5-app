/**
 * 
 * 商品
 * @class Good
 */
class Good {
    /**
     * Creates an instance of Good.
     * @param {any} goodsId 商品id
     * @param {any} goodsName 商品名称
     * @param {any} goodsMainImages 商品主图 
     * @param {any} goodsDescUrl 图文详情
     * @memberof Good
     */
    constructor(goodsId, goodsName, goodsMainImages, goodsDescUrl) {
        this.goodsId = goodsId
        this.goodsName = goodsName
        this.goodsMainImages = goodsMainImages
        this.goodsDescUrl = goodsDescUrl
    }


}