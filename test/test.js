/*
 * @Author: seachen
 * @Date: 2022-04-15 10:37:03
 * @LastEditors: seachen
 * @LastEditTime: 2022-04-15 15:39:10
 * @Description: file content
 * @FilePath: /js-dfa/test/test.js
 */
const path = require('path')
const fs = require('fs')
import dfa from '../src/dfa'
const assert = require('assert')

const words_file_path = path.join(__dirname,"./p_words.txt")
const test_file_path = path.join(__dirname,"./test.txt")

const words_content = fs.readFileSync(words_file_path,'utf-8')
const words = words_content.split(/\s/)

let test_string = fs.readFileSync(test_file_path,'utf-8')

describe("生成dfa测试",function(){
    words.map(item=>{
        dfa.add(item)
    })
    it(`生成成功`,function(){
        words.map(item=>{
            assert.equal(dfa.has(item), true)
        })
    })
    fs.writeFile(path.join(__dirname,'./tree.txt'), JSON.stringify(dfa.__dfa__tree__),err=>{
        err !== null && console.log(err)
    })
})

describe("测试替换",function(){
    const new_word = dfa.replace(test_string,'***')
    it(`列表中的文字必须替换`,function(){
        words.map(item=>{
            assert.equal(new_word.indexOf(item), -1, item)
        })
    })
})