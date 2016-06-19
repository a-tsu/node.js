var sinon = require('sinon');
var rewire = require('rewire');
var expect = require('chai').expect;

// テスト対象
var Test;

describe('Test', function () {
	describe('.getDataByTestAPI()', function () {
		/** テスト対象に渡す引数 */
		var executeArgs = {};
		/** テスト対象に渡すcallback */
		var callback;
		/** request module */
		var request;
		/** requestのmock */
		var requestMock;
		// request.getに渡されるoptionの期待値
		var expectedOption;
		/** request.getのcallbackに渡される, test apiの実行結果 */
		var resTest;
		/** request.getのcallbackに渡される,エラーメッセージ */
		var errMsg;
		/** request.getのcallbackに渡される,エラーネーム (module 内で固定) */
		var errData = 'Test';
		/** request.getのcallbackに渡される,エラーコード */
		var errCode;
		/** 利用するURL */
		var testURL = 'https://api.test.co.jp/getData';
		beforeEach( function () {
			// 正常系のデータを予めbeforeEach内で用意しておく
			// test への request
			executeArgs.key = 'test_key01';
			// test からの response
			resTest = {
				result:'0',
			// unicode Escape
			name: {
				// namel : てすと
				namel:'\u3066\u3059\u3068',
				// namef : 太郎
				namef:'\u592a\u90ce',
				// kanal : テスト 
				kanal:'\u30C6\u30B9\u30C8',
				// kanaf : タロウ
				kanaf:'\u30bf\u30ed\u30a6'
				}
			};

			// test対象が依存しているmoduleのmockを作成
			request = require('request');
			requestMock = sinon.mock(request);

			// test対象のmoduleをrewireする
			Test = rewire('./chaiSinon');
			Test.__set__('request', request);
		});

		//normal
		describe('normal', function () {
			it ('given key shows Data', function (done) {

				// request.getに渡されるoptionの期待値
				expectedOption = {
					url: testURL,
					qs: {
					login: 'test_key01'
					},
				};

				//Mock期待値
				requestMock.expects('get')
				.once()
				.withArgs(expectedOption)
				.callsArgWith(1,null,{statusCode: 200},resTest);

				//response期待値
				var expectedRes= {
					KanaData: 'テスト タロウ',
					KanjiData: 'てすと 太郎'
				};

				// テスト対象の実行
				Test.getDataByTestAPI (
					executeArgs,
					function (err, res) {
						requestMock.verify();
						expect(err).to.be.null;
						expect(res).to.deep.equal(expectedRes);
						done();
					}
				);
			});

			it ('if partically Data not given, obj has partically null', function (done) {

				// test への request (存在しない key)
				executeArgs.key = 'hoge_huga_no_exist';
				// request.getに渡されるoptionの期待値
				expectedOption = {
					url: testURL,
					qs: {
						login: 'hoge_huga_no_exist'
			   		},
				};

				// test からの response
				// テストとしてカナ苗字が無い
				var resTestParticalEmpty = {
					result: '0',
					// unicode Escape
					name: {
					// namel : てすと
					   namel: '\u3066\u3059\u3068',
					// namef : 太郎
					   namef: '\u592a\u90ce',
					// kanal : null
					   kanal : null,
					// kanaf : タロウ
					   kanaf: '\u30bf\u30ed\u30a6'
					}
				};

				//Mock期待値
				requestMock.expects('get')
					.once()
					.withArgs(expectedOption)
					.callsArgWith(1,null,{statusCode: 200},resTestParticalEmpty);

				// response期待値
				var expectedRes = {
					KanjiData: 'てすと 太郎',
					KanaData: null
				};

				// テスト対象の実行
				Test.getDataByTestAPI(
						executeArgs,
						function (err, res) {
							requestMock.verify();
							expect(err).to.be.null;
							expect(res).to.deep.equal(expectedRes);
							done();
						}
				);
			});

			it ('if partically Data not given, obj has partically null (2nd pattern)', function (done) {

				// test への request (存在しない key)
				executeArgs.key = 'hoge_huga_no_exist';

				// request.getに渡されるoptionの期待値
				expectedOption = {
					url: testURL,
					qs: {
					login: 'hoge_huga_no_exist'
					},
				};

				// test からの response
				// テストとして漢字名前が無い
				var resTestParticalEmpty = {
					result: '0',
					// unicode Escape
					name: {
						// namel : てすと
						   namel: '\u3066\u3059\u3068',
						// namef : null
						   namef: null,
						// kanal : テスト
						   kanal: '\u30C6\u30B9\u30C8',
						// kanaf : タロウ
						   kanaf: '\u30bf\u30ed\u30a6'
			   		}
				};

				//Mock期待値
				requestMock.expects('get')
					.once()
					.withArgs(expectedOption)
					.callsArgWith(1,null,{statusCode: 200},resTestParticalEmpty);

				// response期待値
				var expectedRes = {
					KanjiData: null,
					KanaData: 'テスト タロウ'
				};

				// テスト対象の実行
				Test.getDataByTestAPI(
						executeArgs,
						function (err, res) {
							requestMock.verify();
							expect(err).to.be.null;
							expect(res).to.deep.equal(expectedRes);
							done();
						}
				);
			});

			it ('unexisted key returns null obj', function (done) {

				// test への request (存在しない key)
				executeArgs.key = 'hoge_huga_no_exist';

				// request.getに渡されるoptionの期待値
				expectedOption = {
					url: testURL,
					qs: {
						login: 'hoge_huga_no_exist'
					},
				};

				// test からの response
				var resTestEmpty = {
					result: '0',
					name: null
				};

				//Mock期待値
				requestMock.expects('get')
					.once()
					.withArgs(expectedOption)
					.callsArgWith(1,null,{statusCode: 200},resTestEmpty);

				// response期待値
				var expectedRes = {
					KanjiData: null,
					KanaData: null
				};

				// テスト対象の実行
				Test.getDataByTestAPI(
						executeArgs,
						function (err, res) {
							requestMock.verify();
							expect(err).to.be.null;
							expect(res).to.deep.equal(expectedRes);
							done();
						}
				);
			});
		});

		//abnormal
		describe('abnormal', function () {
			it ('Test API: request modules error', function (done) {

				// request.getに渡されるoptionの期待値(リクエスト先が間違っている)
				expectedOption = {
					url: testURL,
					qs: {
						login: 'test_key01'
					},
				};
				executeArgs.key = 'test_key01';

				//request Error Object
				var reqErr = new Error('An error occurs around request module');

				//Mock期待値
				requestMock.expects('get')
					.once()
					.withArgs(expectedOption)
					.callsArgWith(1,reqErr,null);

				//Error期待値
				errMsg = 'Error: An error occurs around request module';
				errCode = 1;

				// テスト対象の実行
				Test.getDataByTestAPI(
						executeArgs,
						function(err,res){
							expect(err.message).to.be.deep.equal(errMsg);
							expect(err.name).to.be.deep.equal(errData);
							expect(err.code).to.be.deep.equal(errCode);
							expect(res).to.be.deep.equal(null);
							done();
						}
				);
				requestMock.verify();
			});

			it ('Test API given status code, not 200(success) but some error', function (done) {

				// request.getに渡されるoptionの期待値(qsが間違っている)
				expectedOption = {
					url: testURL,
					qs: {
						login: 'test_key01'
					},
				};
				executeArgs.key = 'test_key01';

				//Mock期待値
				requestMock.expects('get')
					.once()
					.withArgs(expectedOption)
					.callsArgWith(1, null, {statusCode: 500}, null);

				//Error期待値
				errMsg = 'TestAPI failed. status code is 500';
				errCode = 2;

				// テスト対象の実行
				Test.getDataByTestAPI (
					executeArgs,
					function (err, res) {
						expect(err.message).to.be.deep.equal(errMsg);
						expect(err.name).to.be.deep.equal(errData);
						expect(err.code).to.be.deep.equal(errCode);
						expect(res).to.be.deep.equal(null);
						done();
					}
				);
				requestMock.verify();
			});

			it ('Test API shows original code not 0(success) but some error', function (done) {

				// request.getに渡されるoptionの期待値(qsが間違っている)
				expectedOption = {
					url: testURL,
					qs: {
						login: '#$%&'
					},
				};
				executeArgs.key = '#$%&';

				//Mock期待値
				requestMock.expects('get')
				.once()
				.withArgs(expectedOption)
				.callsArgWith(1, null, {statusCode: 200}, {
					result: '1',
					err_msg: 'validation error. Exception: a query must begin with [a-zA-Z] and must be within [a-zA-Z0-9_]'
				},null);

				//Error期待値
				errMsg = 'TestAPI error. code:1 msg:validation error. Exception: a query must begin with [a-zA-Z] and must be within [a-zA-Z0-9_]';
				errCode = 3;

				// テスト対象の実行
				Test.getDataByTestAPI(
						executeArgs,
						function (err, res) {
							expect(err.message).to.be.deep.equal(errMsg);
							expect(err.name).to.be.deep.equal(errData);
							expect(err.code).to.be.deep.equal(errCode);
							expect(res).to.be.deep.equal(null);
							done();
						}
				);
				requestMock.verify();
			});
		});
	});
});
