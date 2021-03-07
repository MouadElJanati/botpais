const fs = require('fs-extra')

/**
 * Get user ID from db.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {String}
 */
const getLevelingBalanceId = (userId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        return _dir[position].id
    }
} 

/**
 * Get user level from db.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Number}
 */
const getLevelingBalance = (userId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        return _dir[position].level
    }
}

/**
 * Get user XP from db.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Number}
 */
const getLevelingXpBC = (userId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        return _dir[position].xp
    }
}

/**
 * Add user to db.
 * @param {String} userId 
 * @param {Object} _dir 
 */
const addLevelingIdBC = (userId, _dir) => {
    const obj = { id: userId, xp: 0, level: 1 }
    _dir.push(obj)
    fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(_dir))
}

/**
 * Add user level to db.
 * @param {String} userId 
 * @param {Number} amount 
 * @param {Object} _dir 
 */
const addLevelingBalance = (userId, amount, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        _dir[position].level += amount
        fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(_dir))
    }
}

/**
 * Add user XP to db.
 * @param {String} userId 
 * @param {Number} amount 
 * @param {Object} _dir 
 */
const addLevelingXpBalance = (userId, amount, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        _dir[position].xp += amount
        fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(_dir))
    }
}

/**
 * Add user XP to db.
 * @param {String} userId 
 * @param {Number} amount 
 * @param {Object} _dir 
 */
const lessLevelingXpBalance = (userId, amount, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        _dir[position].xp -= amount
        fs.writeFileSync('./database/user/userbalance.json', JSON.stringify(_dir))
    }
}

module.exports = {
    getLevelingBalanceId,
    getLevelingBalance,
    getLevelingXpBC,
    addLevelingIdBC,
    addLevelingBalance,
    addLevelingXpBalance,
    lessLevelingXpBalance
}