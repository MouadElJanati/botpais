const { fetchJson, toBuffer } = require('../tools/fetcher')
const { twitter } = require('video-url-link')
const { promisify } = require('util')
const config = require('../config.json')

const twtGetInfo = promisify(twitter.getInfo)

/**
 * Get Instagram media from URL.
 * @param {String} q
 * @returns {Object}
 */
const insta = (q) => new Promise((resolve, reject) => {
    //console.log(`Get Instagram media from ${q}`)
    fetchJson(`https://api.vhtear.com/instadl?link=${q}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get TikTok video from URL.
 * @param {String} q 
 * @returns {Object}
 */
const tik = (q) => new Promise((resolve, reject) => {
    //console.log(`Get TikTok media from ${q}`)
    fetchJson(`https://api.vhtear.com/tiktokdl?link=${q}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get media from Facebook.
 * @param {String} q
 * @returns {Object}
 */
const fb = (q) => new Promise((resolve, reject) => {
    //console.log(`Downloading FB Video from ${q}`)
    fetchJson(`https://api.vhtear.com/fbdl?link=${q}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get YouTube media from URL.
 * @param {String} q
 * @returns {Object}
 */
const ytdl = (q) => new Promise((resolve, reject) => {
    //console.log(`Get YouTube media from ${q}`)
    fetchJson(`http://api.vhtear.com/ytdl?link=${q}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Joox music metadata from title.
 * @param {String} q
 * @returns {Object}
 */
const joox = (q) => new Promise((resolve, reject) => {
    //console.log(`Get Joox music from ${q}...`)
    fetchJson(`https://api.vhtear.com/music?query=${q}&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Twitter media from URL.
 * @param {String} url 
 * @returns {Object}
 */
const tweet = (q) => new Promise((resolve, reject) => {
    //console.log(`Get Twitter media from ${q}`)
    twtGetInfo(url, {}, (error, info) => {
        if (error) {
            reject(error)
        } else {
            resolve(info)
        }
    })
})

/**
 * Get TikTok video with no WM.
 * @param {String} q 
 * @returns {Object}
 */
const tikNoWm = (q) => new Promise((resolve, reject) => {
    //console.log(`Get TikTok with no WM from ${q}`)
    fetchJson(`https://videfikri.com/api/tiktok/?url=${q}`)
        .then((res) => {
            const { result } = res
            toBuffer(result.link)
                .then((buffer) => resolve(buffer))
                .catch((err) => reject(err))
        })
        .catch((err) => reject(err))
})

module.exports = {
    fb,
    ytdl,
    tik,
    joox,
    insta,
    tweet,
    tikNoWm
}
