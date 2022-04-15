/*
 * @Author: seachen
 * @Date: 2022-04-15 10:37:27
 * @LastEditors: seachen
 * @LastEditTime: 2022-04-15 15:38:01
 * @Description: dfa core
 * @FilePath: /js-dfa/src/dfa.js
 */
export const __dfa__tree__ = Object.create(null)

/**
 * add word to dfa tree
 * @param {string} word
 * @returns void
 */
export function add(word){
    if(typeof word !== 'string'){
        return
    }
    __add(__dfa__tree__, word)
}

const __add = function(obj,word){
    if(word.length <= 0){
        obj.__e = true
        return
    }
    const __word = word[0]
    if(!Object.prototype.hasOwnProperty.call(obj,__word)){
        obj[__word] = {}
    }
    __add(obj[__word], word.substring(1))
}

/**
 * has any word in dfa tree
 * @param {string} word 
 * @returns {boolean}
 */
export function has(word){
    if(typeof word !== 'string'){
        return false
    }
    return __has(__dfa__tree__, word)
}

const __has = function(obj,word){
    if(word.length <= 0){
        return obj.__e === true
    }
    const _w = word[0]
    if(Object.prototype.hasOwnProperty.call(obj,_w)){
        return __has(obj[_w], word.substring(1))
    }else{
        return false
    }
}

/**
 * find word and replace it to replace_str
 * @param {string} text 
 * @param {string} replace_str 
 * @returns {string}
 */
export function replace(text, replace_str){
    if(typeof text !== 'string'){
        return text
    }
    let __f = []
    let __o = __dfa__tree__
    let __need_replace = []
    let i=0
    let max=text.length

    while(i<max){
        let _w = text[i]

        if(Object.prototype.hasOwnProperty.call(__o,'__e') && __o.__e === true){
            __need_replace.push(__f.map(item=>text[item]).join(''))
            __o = __dfa__tree__
            __f = []
            i++
            continue
        }

        if(!Object.prototype.hasOwnProperty.call(__o,_w)){
            if(__f.length > 0){
                i-=__f.length
                __f = []
            }
            __o = __dfa__tree__
            i++
            continue
        }
        __f.push(i)
        __o = __o[_w]
        i++
    }

    let reg = new RegExp(__need_replace.join('|'),'g')
    text = text.replace(reg, replace_str)
    return text
}

export default {
    add,
    has,
    replace,
    __dfa__tree__
}