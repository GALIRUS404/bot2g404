(async () => {
  require("./config");
  const {
    useMultiFileAuthState: _0x533881,
    DisconnectReason: _0x53ced4,
    generateForwardMessageContent: _0x23bf46,
    prepareWAMessageMedia: _0x901b1,
    generateWAMessageFromContent: _0x5042cb,
    generateMessageID: _0x54905c,
    downloadContentFromMessage: _0x347add,
    makeInMemoryStore: _0x30e0b3,
    jidDecode: _0x4612e5,
    PHONENUMBER_MCC: _0x26ff49,
    fetchLatestBaileysVersion: _0x1785e0,
    proto: _0x2d6734
  } = require("@adiwajshing/baileys");
  const _0x49398d = require("pino");
  const _0x524852 = require('ws');
  const _0x680a27 = require('path');
  const _0x32f29f = require('fs');
  const _0x276499 = require("yargs/yargs");
  const _0xc1204a = require("child_process");
  const _0x1ecbca = require("lodash");
  const _0x392d82 = require('syntax-error');
  const _0x470804 = require('os');
  const _0x58b12a = require("node-fetch");
  const _0x88dc80 = require("chalk");
  let _0x23c5c6 = require("./lib/simple");
  var _0x563417;
  try {
    _0x563417 = require("lowdb");
  } catch (_0x3b3723) {
    _0x563417 = require("./lib/lowdb");
  }
  const {
    Low: _0x133260,
    JSONFile: _0x2627b5
  } = _0x563417;
  const _0x27d6e2 = require('./lib/mongoDB');
  const _0x196326 = require("readline");
  const _0x2ab022 = process.argv.includes("--code") || process.argv.includes("--pairing");
  const _0x4c1105 = process.argv.includes("--mobile");
  const _0x47ba5e = _0x196326.createInterface({
    'input': process.stdin,
    'output': process.stdout
  });
  const _0x3bc568 = _0x5317ce => new Promise(_0x55cf2f => _0x47ba5e.question(_0x5317ce, _0x55cf2f));
  global.API = (_0x453b31, _0x5ea4d0 = '/', _0x1d2fe3 = {}, _0x1bc09b) => (_0x453b31 in global.APIs ? global.APIs[_0x453b31] : _0x453b31) + _0x5ea4d0 + (_0x1d2fe3 || _0x1bc09b ? '?' + new URLSearchParams(Object.entries({
    ..._0x1d2fe3,
    ...(_0x1bc09b ? {
      [_0x1bc09b]: global.APIKeys[_0x453b31 in global.APIs ? global.APIs[_0x453b31] : _0x453b31]
    } : {})
  })) : '');
  global.timestamp = {
    'start': new Date()
  };
  global.opts = new Object(_0x276499(process.argv.slice(0x2)).exitProcess(false).parse());
  global.prefix = new RegExp('^[' + (opts.prefix || "‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-").replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + ']');
  global.db = new _0x133260(/https?:\/\//.test(opts.db || '') ? new cloudDBAdapter(opts.db) : /mongodb/.test(opts.db) ? new _0x27d6e2(opts.db) : new _0x2627b5((opts._[0x0] ? opts._[0x0] + '_' : '') + 'database.json'));
  global.DATABASE = global.db;
  global.loadDatabase = async function _0x4cc2a4() {
    if (global.db.READ) {
      return new Promise(_0x189c0c => setInterval(function () {
        if (!global.db.READ) {
          clearInterval(this);
          _0x189c0c(global.db.data == null ? global.loadDatabase() : global.db.data);
        } else {
          null;
        }
      }, 1000));
    }
    if (global.db.data !== null) {
      return;
    }
    global.db.READ = true;
    await global.db.read();
    global.db.READ = false;
    global.db.data = {
      'users': {},
      'chats': {},
      'stats': {},
      'msgs': {},
      'sticker': {},
      ...(global.db.data || {})
    };
    global.db.chain = _0x1ecbca.chain(global.db.data);
  };
  loadDatabase();
  const _0x515740 = '' + (opts._[0x0] || "sessions");
  global.isInit = !_0x32f29f.existsSync(_0x515740);
  const {
    state: _0x5193b2,
    saveState: _0x1bd7c8,
    saveCreds: _0x31aff6
  } = await _0x533881(_0x515740);
  const {
    version: _0x5a53bc,
    isLatest: _0x59dded
  } = await _0x1785e0();
  console.log(_0x88dc80.magenta("-- using WA v" + _0x5a53bc.join('.') + ", isLatest: " + _0x59dded + " --"));
  const _0x12181b = {
    'printQRInTerminal': !_0x2ab022,
    'syncFullHistory': true,
    'markOnlineOnConnect': true,
    'connectTimeoutMs': 0xea60,
    'defaultQueryTimeoutMs': 0x0,
    'keepAliveIntervalMs': 0x2710,
    'generateHighQualityLinkPreview': true,
    'patchMessageBeforeSending': _0x5826df => {
      const _0x328020 = !!(_0x5826df.buttonsMessage || _0x5826df.templateMessage || _0x5826df.listMessage);
      if (_0x328020) {
        _0x5826df = {
          'viewOnceMessage': {
            'message': {
              'messageContextInfo': {
                'deviceListMetadataVersion': 0x2,
                'deviceListMetadata': {}
              },
              ..._0x5826df
            }
          }
        };
      }
      return _0x5826df;
    },
    'auth': _0x5193b2,
    'browser': ["Ubuntu", 'Chrome', '20.0.04'],
    'logger': _0x49398d({
      'level': "silent"
    }),
    'version': (await (await _0x58b12a("https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json")).json()).version
  };
  global.conn = _0x23c5c6.makeWASocket(_0x12181b);
  if (!opts.test) {
    if (global.db) {
      setInterval(async () => {
        if (global.db.data) {
          await global.db.write();
        }
        if (!opts.tmp && (global.support || {}).find) {
          tmp = [_0x470804.tmpdir(), "tmp"];
          tmp.forEach(_0x400962 => _0xc1204a.spawn("find", [_0x400962, "-amin", '3', "-type", 'f', "-delete"]));
        }
      }, 30000);
    }
  }
  async function _0x478e67(_0x219e74) {
    const {
      connection: _0x4b1c77,
      lastDisconnect: _0x514321
    } = _0x219e74;
    global.timestamp.connect = new Date();
    if (_0x514321 && _0x514321.error && _0x514321.error.output && _0x514321.error.output.statusCode !== _0x53ced4.loggedOut && conn.ws.readyState !== _0x524852.CONNECTING) {
      console.log(global.reloadHandler(true));
    }
    if (global.db.data == null) {
      await loadDatabase();
    }
  }
  if ((_0x2ab022 || _0x4c1105) && _0x32f29f.existsSync("./sessions/creds.json") && !conn.authState.creds.registered) {
    console.log(_0x88dc80.yellow("-- WARNING: creds.json is broken, please delete it first --"));
    process.exit(0x0);
  }
  if (_0x2ab022 && !conn.authState.creds.registered) {
    if (_0x4c1105) {
      throw new Error("Cannot use pairing code with mobile api");
    }
    let _0x25d10d = '';
    do {
      _0x25d10d = await _0x3bc568(_0x88dc80.blueBright("ENTER A VALID NUMBER START WITH REGION CODE. Example : 62xxx:\n"));
    } while (!Object.keys(_0x26ff49).some(_0x4141a0 => _0x25d10d.startsWith(_0x4141a0)));
    _0x47ba5e.close();
    _0x25d10d = _0x25d10d.replace(/\D/g, '');
    console.log(_0x88dc80.bgWhite(_0x88dc80.blue("-- Please wait, generating code... --")));
    setTimeout(async () => {
      let _0x1198cf = await conn.requestPairingCode(_0x25d10d);
      _0x1198cf = _0x1198cf?.["match"](/.{1,4}/g)?.["join"]('-') || _0x1198cf;
      console.log(_0x88dc80.black(_0x88dc80.bgGreen("Your Pairing Code : ")), _0x88dc80.black(_0x88dc80.white(_0x1198cf)));
    }, 0xbb8);
  }
  process.on('uncaughtException', console.error);
  const _0x28dbc1 = _0x30060a => {
    _0x30060a = require.resolve(_0x30060a);
    let _0x5db7b4;
    let _0x2a1668 = 0x0;
    do {
      if (_0x30060a in require.cache) {
        delete require.cache[_0x30060a];
      }
      _0x5db7b4 = require(_0x30060a);
      _0x2a1668++;
    } while ((!_0x5db7b4 || Array.isArray(_0x5db7b4) || _0x5db7b4 instanceof String ? !(_0x5db7b4 || []).length : typeof _0x5db7b4 == "object" && !Buffer.isBuffer(_0x5db7b4) ? !Object.keys(_0x5db7b4 || {}).length : true) && _0x2a1668 <= 0xa);
    return _0x5db7b4;
  };
  let _0x4dd1f2 = true;
  global.reloadHandler = function (_0x530614) {
    let _0x4f81f4 = _0x28dbc1('./handler');
    if (_0x530614) {
      try {
        global.conn.ws.close();
      } catch {}
      global.conn = {
        ...global.conn,
        ..._0x23c5c6.makeWASocket(_0x12181b)
      };
    }
    if (!_0x4dd1f2) {
      conn.ev.off("messages.upsert", conn.handler);
      conn.ev.off("group-participants.update", conn.participantsUpdate);
      conn.ev.off('message.delete', conn.onDelete);
      conn.ev.off("connection.update", conn.connectionUpdate);
      conn.ev.off("creds.update", conn.credsUpdate);
    }
    conn.welcome = "Selamat datang @user di group @subject utamakan baca desk ya \n@desc";
    conn.bye = "Selamat tinggal @user 👋";
    conn.promote = "@user sekarang admin!";
    conn.demote = "@user sekarang bukan admin!";
    conn.handler = _0x4f81f4.handler.bind(conn);
    conn.participantsUpdate = _0x4f81f4.participantsUpdate.bind(conn);
    conn.onDelete = _0x4f81f4["delete"].bind(conn);
    conn.connectionUpdate = _0x478e67.bind(conn);
    conn.credsUpdate = _0x31aff6.bind(conn);
    conn.ev.on("messages.upsert", conn.handler);
    conn.ev.on('group-participants.update', conn.participantsUpdate);
    conn.ev.on('message.delete', conn.onDelete);
    conn.ev.on("connection.update", conn.connectionUpdate);
    conn.ev.on("creds.update", conn.credsUpdate);
    _0x4dd1f2 = false;
    return true;
  };
  let _0xfbc211 = _0x680a27.join(__dirname, "plugins");
  let _0x38c1fe = _0x1ca55d => /\.js$/.test(_0x1ca55d);
  global.plugins = {};
  for (let _0x2dbb31 of _0x32f29f.readdirSync(_0xfbc211).filter(_0x38c1fe)) {
    try {
      global.plugins[_0x2dbb31] = require(_0x680a27.join(_0xfbc211, _0x2dbb31));
    } catch (_0x198e42) {
      conn.logger.error(_0x198e42);
      delete global.plugins[_0x2dbb31];
    }
  }
  console.log(Object.keys(global.plugins));
  global.reload = (_0x3113db, _0x35b4ad) => {
    if (/\.js$/.test(_0x35b4ad)) {
      let _0x40f89c = _0x680a27.join(_0xfbc211, _0x35b4ad);
      if (_0x40f89c in require.cache) {
        delete require.cache[_0x40f89c];
        if (_0x32f29f.existsSync(_0x40f89c)) {
          conn.logger.info("re - require plugin '" + _0x35b4ad + "'");
        } else {
          conn.logger.warn("deleted plugin '" + _0x35b4ad + "'");
          return delete global.plugins[_0x35b4ad];
        }
      } else {
        conn.logger.info("requiring new plugin '" + _0x35b4ad + "'");
      }
      let _0x411a74 = _0x392d82(_0x32f29f.readFileSync(_0x40f89c), _0x35b4ad);
      if (_0x411a74) {
        conn.logger.error("syntax error while loading '" + _0x35b4ad + "'\n" + _0x411a74);
      } else {
        try {
          global.plugins[_0x35b4ad] = require(_0x40f89c);
        } catch (_0x9093fd) {
          conn.logger.error(_0x9093fd);
        } finally {
          global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([_0x510347], [_0x59a90c]) => _0x510347.localeCompare(_0x59a90c)));
        }
      }
    }
  };
  Object.freeze(global.reload);
  _0x32f29f.watch(_0x680a27.join(__dirname, 'plugins'), global.reload);
  global.reloadHandler();
  async function _0x5adff5() {
    let _0x547272 = await Promise.all([_0xc1204a.spawn("ffmpeg"), _0xc1204a.spawn("ffprobe"), _0xc1204a.spawn("ffmpeg", ["-hide_banner", "-loglevel", "error", "-filter_complex", "color", '-frames:v', '1', '-f', 'webp', '-']), _0xc1204a.spawn("convert"), _0xc1204a.spawn('magick'), _0xc1204a.spawn('gm'), _0xc1204a.spawn("find", ["--version"])].map(_0x568faa => {
      return Promise.race([new Promise(_0xefe56c => {
        _0x568faa.on("close", _0x2e4897 => {
          _0xefe56c(_0x2e4897 !== 0x7f);
        });
      }), new Promise(_0x465155 => {
        _0x568faa.on("error", _0x2285de => _0x465155(false));
      })]);
    }));
    let [_0x56d1f2, _0xf82eba, _0x493eb5, _0x5d3325, _0x297d5e, _0x1d4e33, _0x776094] = _0x547272;
    console.log(_0x547272);
    let _0x2db56a = global.support = {
      'ffmpeg': _0x56d1f2,
      'ffprobe': _0xf82eba,
      'ffmpegWebp': _0x493eb5,
      'convert': _0x5d3325,
      'magick': _0x297d5e,
      'gm': _0x1d4e33,
      'find': _0x776094
    };
    Object.freeze(global.support);
    if (!_0x2db56a.ffmpeg) {
      conn.logger.warn("Please install ffmpeg for sending videos (pkg install ffmpeg)");
    }
    if (_0x2db56a.ffmpeg && !_0x2db56a.ffmpegWebp) {
      conn.logger.warn("Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)");
    }
    if (!_0x2db56a.convert && !_0x2db56a.magick && !_0x2db56a.gm) {
      conn.logger.warn("Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)");
    }
  }
  _0x5adff5().then(() => conn.logger.info("Quick Test Done"))["catch"]("done");
})();