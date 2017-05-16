var expect = require('chai').expect;

// テスト対象
var Test = require('../oracledb');

describe('Test', function () {
	describe('.getDataByTestAPI()', function () {
		/** テスト対象に渡す引数 */
		var executeArgs = {};
		/** テスト対象に渡すcallback */
		var callback;
		/** request module */
		var request;
		// request.getに渡されるoptionの期待値
		var expectedOption;
		/** request.getのcallbackに渡される, db 接続の実行結果 */
		var resTest;
		/** request.getのcallbackに渡される,エラーメッセージ */
		var errMsg;
		/** request.getのcallbackに渡される,エラーネーム (module 内で固定) */
		var errData = 'Test';
		/** request.getのcallbackに渡される,エラーコード */
		var errCode;
		beforeEach( function () {
			// 正常系のデータを予めbeforeEach内で用意しておく
			// test への request
			oracledb_key = 'test';
			oracledb_user = 'test';
			// test からの response
			resTest = {
				result:'OK',
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
			
			// mudule の require
			};
		});

		//normal
		describe('normal', function () {
			it ('db に繋がる', function (done) {
				// request.getに渡されるoptionの期待値
				expectedOption = {
					oracledb_key: oracledb_key,
					oracledb_user: oracledb_user
				};

				//response期待値
				var expectedRes= {
					KanaData: 'テスト タロウ',
					KanjiData: 'てすと 太郎'
				};

				// テスト対象の実行
				Test.getDataByTestAPI (
					executeArgs,
					function (err, res) {
						expect(err).to.be.null;
						expect(res).to.deep.equal(expectedRes);
						done();
					}
				);
			});
		});
	});
});
