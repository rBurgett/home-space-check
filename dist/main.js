'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _promisifyNode = require('promisify-node');

var _promisifyNode2 = _interopRequireDefault(_promisifyNode);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var largeSize = 100000000;

var fs = (0, _promisifyNode2.default)(_fs2.default);

var home = process.env.HOME;

var checkFolder = function checkFolder(p) {
    return new _promise2.default(function (resolve) {
        (0, _co2.default)(_regenerator2.default.mark(function _callee() {
            var items, largeFiles, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, f, filePath, stats;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return fs.readdir(p);

                        case 2:
                            items = _context.sent;
                            largeFiles = [];
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 7;
                            _iterator = (0, _getIterator3.default)(items);

                        case 9:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 32;
                                break;
                            }

                            f = _step.value;
                            filePath = _path2.default.join(p, f);
                            _context.prev = 12;
                            _context.next = 15;
                            return fs.stat(filePath);

                        case 15:
                            stats = _context.sent;

                            if (!stats.isDirectory()) {
                                _context.next = 24;
                                break;
                            }

                            _context.t0 = largeFiles;
                            _context.next = 20;
                            return checkFolder(filePath);

                        case 20:
                            _context.t1 = _context.sent;
                            largeFiles = _context.t0.concat.call(_context.t0, _context.t1);
                            _context.next = 25;
                            break;

                        case 24:
                            if (stats.isFile()) {
                                if (stats.size >= largeSize) {
                                    largeFiles = largeFiles.concat([filePath]);
                                }
                            }

                        case 25:
                            _context.next = 29;
                            break;

                        case 27:
                            _context.prev = 27;
                            _context.t2 = _context['catch'](12);

                        case 29:
                            _iteratorNormalCompletion = true;
                            _context.next = 9;
                            break;

                        case 32:
                            _context.next = 38;
                            break;

                        case 34:
                            _context.prev = 34;
                            _context.t3 = _context['catch'](7);
                            _didIteratorError = true;
                            _iteratorError = _context.t3;

                        case 38:
                            _context.prev = 38;
                            _context.prev = 39;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 41:
                            _context.prev = 41;

                            if (!_didIteratorError) {
                                _context.next = 44;
                                break;
                            }

                            throw _iteratorError;

                        case 44:
                            return _context.finish(41);

                        case 45:
                            return _context.finish(38);

                        case 46:
                            // do nothing with error, just let the process continue

                            resolve(largeFiles);

                        case 47:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[7, 34, 38, 46], [12, 27], [39,, 41, 45]]);
        }));
    });
};

(0, _co2.default)(_regenerator2.default.mark(function _callee2() {
    var items, folders, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, f, itemPath, stats, folderPromises, results, largeFiles;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return fs.readdir(home);

                case 3:
                    items = _context2.sent;
                    folders = [];
                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    _context2.prev = 8;
                    _iterator2 = (0, _getIterator3.default)(items);

                case 10:
                    if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                        _context2.next = 20;
                        break;
                    }

                    f = _step2.value;
                    itemPath = _path2.default.join(home, f);
                    _context2.next = 15;
                    return fs.stat(itemPath);

                case 15:
                    stats = _context2.sent;

                    if (stats.isDirectory()) folders.push(itemPath);

                case 17:
                    _iteratorNormalCompletion2 = true;
                    _context2.next = 10;
                    break;

                case 20:
                    _context2.next = 26;
                    break;

                case 22:
                    _context2.prev = 22;
                    _context2.t0 = _context2['catch'](8);
                    _didIteratorError2 = true;
                    _iteratorError2 = _context2.t0;

                case 26:
                    _context2.prev = 26;
                    _context2.prev = 27;

                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }

                case 29:
                    _context2.prev = 29;

                    if (!_didIteratorError2) {
                        _context2.next = 32;
                        break;
                    }

                    throw _iteratorError2;

                case 32:
                    return _context2.finish(29);

                case 33:
                    return _context2.finish(26);

                case 34:
                    folderPromises = folders.map(function (f) {
                        return new _promise2.default(function (resolve, reject) {
                            checkFolder(f).then(function (files) {
                                return resolve(files);
                            }).catch(function (err) {
                                return reject(err);
                            });
                        });
                    });
                    _context2.next = 37;
                    return _promise2.default.all(folderPromises);

                case 37:
                    results = _context2.sent;
                    largeFiles = results.reduce(function (arr, files) {
                        return arr.concat(files);
                    }, []);


                    console.log('Large Files:\n', (0, _stringify2.default)(largeFiles, null, '  '));

                    _context2.next = 45;
                    break;

                case 42:
                    _context2.prev = 42;
                    _context2.t1 = _context2['catch'](0);

                    console.error(_context2.t1);

                case 45:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, this, [[0, 42], [8, 22, 26, 34], [27,, 29, 33]]);
}));