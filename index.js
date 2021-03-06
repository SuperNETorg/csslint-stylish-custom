'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _textTable = require('text-table');

var _textTable2 = _interopRequireDefault(_textTable);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  id: 'stylish',
  name: 'CSSLint Stylish format',

  totalErrors: 0,
  totalWarnings: 0,

  startFormat: function startFormat() {
    this.totalErrors = 0;
    this.totalWarnings = 0;

    return '';
  },
  endFormat: function endFormat() {
    var totalErrors = this.totalErrors;
    var totalWarnings = this.totalWarnings;

    var totalViolations = totalErrors + totalWarnings;
    var output = '\n\n';

    if (totalViolations === 0) {
      return '\nNo violations';
    }

    if (totalErrors > 0) {
      output += '    ' + _logSymbols2.default.error + '  ' + totalErrors + ' ' + (totalErrors > 1 ? 'errors' : 'error') + '\n';
    }

    if (totalWarnings > 0) {
      output += '    ' + _logSymbols2.default.warning + '  ' + totalWarnings + ' ' + (totalWarnings > 1 ? 'warnings' : 'warning') + '\n';
    }

    return output;
  },
  formatResults: function formatResults(_ref, filename) {
    var messages = _ref.messages;

    var _this = this;

    var _ref2 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var absoluteFilePathsForFormatters = _ref2.absoluteFilePathsForFormatters;

    var output = [];
    var underlinedFilename = void 0;

    if (messages.length > 0) {
      if (filename) {
        if (absoluteFilePathsForFormatters) {
          underlinedFilename = _chalk2.default.underline(filename);
        } else {
          var relateFilename = _path2.default.relative(process.cwd(), filename);

          underlinedFilename = _chalk2.default.underline(relateFilename);
        }
      }

      output = messages.map(function (_ref3) {
        var message = _ref3.message;
        var rollup = _ref3.rollup;
        var line = _ref3.line;
        var col = _ref3.col;
        var type = _ref3.type;

        var formatted = [''];
        var isWarning = type === 'warning';

        if (isWarning) {
          _this.totalWarnings++;
        } else {
          _this.totalErrors++;
        }

        if (rollup) {
          formatted.push('');
          formatted.push('');
        } else {
          formatted.push(_chalk2.default.gray('line ' + line));
          formatted.push(_chalk2.default.gray('char ' + col));
        }

        formatted.push(isWarning ? _chalk2.default.yellow(message) + _chalk2.default.white('\n\n  ' + _ref3.evidence.trim() + '\n\n\n') : _chalk2.default.red(message));

        return formatted;
      });
    }

    if (underlinedFilename) {
      return '\n' + underlinedFilename + '\n' + (0, _textTable2.default)(output);
    }
    return '\n' + (0, _textTable2.default)(output);
  }
};
module.exports = exports['default'];
