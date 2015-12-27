/**
 *
 * test API Module
 *
 * */

var request = require('request');
var util = require('util');
//var config = require('../../conf/config.json');
var Test = function  () {};

// module 内の定数: error obj の NAME
Test.NAME = 'Test';

// module 内の定数: リクエストモジュールのエラー
Test.ERROR_REQUEST = 1;

// module 内の定数: ステータスコードが 200 以外のエラー
Test.ERROR_STATUSCODE = 2;

// module 内の定数: TestAPI 固有ステータスが0000(正常)以外のエラー
Test.ERROR_WALLETAPI = 3;

/**
* Get Kana / Kanji Data by given key from Test API
*
* @param object which has key
* @param callback function to return names
* @return an error if it occurs
* @return object which has [Kana|Kanji]Data related from key
*/

Test.getDataByTestAPI = function (obj,callback) {
    var option = {
        url: 'https://api.test.co.jp/getData',
        qs: {
            login: obj.key
    },
};

request.get(option, function (error, response, body) {
    var errorObj;
    if (error) {
        // request のエラー
        errorObj = makeError(error.toString(),Test.ERROR_REQUEST);
        callback(errorObj, null);
        return;
    }
    if (response.statusCode !== 200) {
        // Test API のステータスコードが 200 以外のエラー
        errorObj = makeError(
            util.format('TestAPI failed. status code is %s', response.statusCode),
            Test.ERROR_STATUSCODE);
        callback(errorObj, null);
        return;
    }
    if (body.result !== '0') {
        // Test API 独自実装のステータスコードが 0(正常) 以外のエラー
        errorObj = makeError(
            util.format('TestAPI error. code:%s msg:%s', body.result, body.err_msg),
            Test.ERROR_WALLETAPI);
        callback(errorObj, null);
        return;
    }
    callback(error, parseTest(body));
    });
};

/**
* fix API obj to return object
*
* @param object which returns from Test API
* @return object response for this module
**/
var parseTest = function (body) {
    var res = {
        KanaData: null,
        KanjiData: null
    };
    if (body.name) {
        if (body.name.kanal && body.name.kanaf) {
            res.KanaData = body.name.kanal + " " + body.name.kanaf;
        }
        if (body.name.namel && body.name.namef) {
            res.KanjiData = body.name.namel + " " + body.name.namef;
        }
    }
    return res;
};

/**
* Create an error object
*
* @param String message
* @param Int code
* @return error object
**/

var makeError = function (message,code) {
    var error = new Error(message);
    error.name = Test.NAME;
    error.code = code;
    return error;
};

module.exports = Test;
