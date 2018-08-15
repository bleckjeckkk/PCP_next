webpackHotUpdate(4,{

/***/ "./pages/login.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Layout__ = __webpack_require__("./components/Layout.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__material_ui_core_TextField__ = __webpack_require__("./node_modules/@material-ui/core/TextField/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__material_ui_core_TextField___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__material_ui_core_TextField__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__material_ui_core_Button__ = __webpack_require__("./node_modules/@material-ui/core/Button/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__material_ui_core_Button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__material_ui_core_Button__);
var _jsxFileName = "C:\\PCP_next\\pages\\login.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

 // import {
//     Redirect,
//     Link
//   } from 'react-router-dom'





var Login =
/*#__PURE__*/
function (_Component) {
  _inherits(Login, _Component);

  function Login(props) {
    var _this;

    _classCallCheck(this, Login);

    _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "addUser", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(credentials) {
        console.log("addUser");
        var fName = credentials.firstName;
        var lName = credentials.lastName;
        var username = credentials.username;
        var password = credentials.password;
        var uID = _this.state.lastUserID;
        fetch("http://localhost:4000/users/add?userID=".concat(uID, "&userName=").concat(username, "&userPassword=").concat(password, "&lastName=").concat(lName, "&firstName=").concat(fName)).then(function (response) {
          return response.json();
        }).then(function (response) {
          return console.log(response);
        }).catch(function (err) {
          return console.error(err);
        });
      }
    });
    _this.state = {
      fName: '',
      lName: '',
      login_username: '',
      signin_username: '',
      login_password: '',
      signin_password: '',
      adminRoute: '',
      willAuth: false,
      lastUserID: -1
    };
    return _this;
  }

  _createClass(Login, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log("componentWillMount");
      this.getMaxID();
    }
  }, {
    key: "getMaxID",
    value: function getMaxID() {
      console.log("getMaxID"); // fetch('http://localhost:4000/users/getCount')
      // .then(response => response.json())
      // .then(json => console.log(json));
      //depending on the console.log, 
      //update state.lastUserID by adding the result of getCount by 1
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      switch (event.target.id) {
        case 'login_username':
          this.setState({
            login_username: event.target.value
          });
          break;

        case 'login_password':
          this.setState({
            login_password: event.target.value
          });
          break;

        case 'signin_username':
          this.setState({
            signin_username: event.target.value
          });
          break;

        case 'signin_password':
          this.setState({
            signin_password: event.target.value
          });
          break;

        case 'fName':
          this.setState({
            fName: event.target.value
          });
          break;

        case 'lName':
          this.setState({
            lName: event.target.value
          });
          break;

        default:
          console.log("this wasn't supposed to happen.");
          break;
      }

      this.setState({
        willAuth: true
      });
      console.log(event.target);
    }
  }, {
    key: "auth",
    value: function auth() {
      console.log("auth");
      var credentials = {
        username: this.state.login_username,
        password: this.state.login_password
      };

      if (this.state.willAuth) {
        if (credentials.username === "admin") {
          console.log("---admin---");
          this.setState({
            adminRoute: '/admin/home'
          });
        } else {
          console.log("---not admin---");
          this.setState({
            adminRoute: ''
          });
        }

        this.setState({
          willAuth: false
        });
      }

      console.log(credentials);
    }
  }, {
    key: "login",
    value: function login() {
      console.log("button pressed!");
      var credentials = {
        username: this.state.login_username,
        password: this.state.login_password
      };

      if (credentials.username === "admin") {
        console.log("admin");
      } else {
        console.log("not admin");
      }

      console.log(credentials);
    }
  }, {
    key: "signup",
    value: function signup() {
      console.log("signup button pressed!");
      var credentials = {
        firstName: this.state.fName,
        lastName: this.state.lName,
        username: this.state.signin_username,
        password: this.state.signin_password
      };
      this.addUser(credentials);
    }
  }, {
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_Layout__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 106
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "container",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "column",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "row",
        horizontal: "start",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "card",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 110
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        style: {
          width: 750
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "cardcontent",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "row",
        vertical: "center",
        horizontal: "space-around",
        flexGrow: 1,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "column",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "column",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__material_ui_core_TextField___default.a, {
        id: "login_username",
        label: "User Name",
        value: this.state.login_username,
        onChange: this.onChange.bind(this),
        margin: "normal",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        }
      }))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "column",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "column",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__material_ui_core_TextField___default.a, {
        id: "login_password",
        label: "Password",
        value: this.state.login_password,
        onChange: this.onChange.bind(this),
        margin: "normal",
        type: "password",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        }
      }))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "column",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__material_ui_core_Button___default.a, {
        variant: "contained",
        onClick: this.login.bind(this),
        onPointerEnter: this.auth.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 139
        }
      }, "Login"))))))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "row",
        horizontal: "around",
        flexGrow: 1,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 148
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "column",
        flexGrow: .5,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 149
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 150
        }
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "column",
        flexGrow: .5,
        horizontal: "center",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 155
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "row",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "card",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 158
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "cardcontent",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 159
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "row",
        flexGrow: 1,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 160
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161
        }
      }, "Sign Up")), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "row",
        flexGrow: 1,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 163
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 164
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__material_ui_core_TextField___default.a, {
        id: "fName",
        label: "First Name",
        value: this.state.fName,
        onChange: this.onChange.bind(this),
        margin: "normal",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 165
        }
      }))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "row",
        flexGrow: 1,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 174
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 175
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__material_ui_core_TextField___default.a, {
        id: "lName",
        label: "Last Name",
        value: this.state.lName,
        onChange: this.onChange.bind(this),
        margin: "normal",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 176
        }
      }))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "row",
        flexGrow: 1,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 185
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 186
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__material_ui_core_TextField___default.a, {
        id: "signin_username",
        label: "User Name",
        value: this.state.signin_username,
        onChange: this.onChange.bind(this),
        margin: "normal",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 187
        }
      }))), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        "class": "row",
        flexGrow: 1,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 196
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__material_ui_core_TextField___default.a, {
        id: "signin_password",
        label: "Password",
        value: this.state.signin_password,
        onChange: this.onChange.bind(this),
        margin: "normal",
        type: "password",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 197
        }
      })), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__material_ui_core_Button___default.a, {
        variant: "contained",
        onClick: this.signup.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 206
        }
      }, "Signup"))))))))));
    }
  }]);

  return Login;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Login);
    (function (Component, route) {
      if(!Component) return
      if (false) return
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/login")
  
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=4.9adf62f095b08b8909f3.hot-update.js.map