import {
  SvgIcon_default,
  init_SvgIcon
} from "./chunk-FL2J3BCF.js";
import {
  require_jsx_runtime
} from "./chunk-QGFLC4AF.js";
import {
  require_react
} from "./chunk-L3FOL4I5.js";
import {
  __esm,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@mui/material/utils/createSvgIcon.js
function createSvgIcon(path, displayName) {
  function Component(props, ref) {
    return (0, import_jsx_runtime.jsx)(SvgIcon_default, {
      "data-testid": `${displayName}Icon`,
      ref,
      ...props,
      children: path
    });
  }
  if (true) {
    Component.displayName = `${displayName}Icon`;
  }
  Component.muiName = SvgIcon_default.muiName;
  return React.memo(React.forwardRef(Component));
}
var React, import_jsx_runtime;
var init_createSvgIcon = __esm({
  "node_modules/@mui/material/utils/createSvgIcon.js"() {
    "use client";
    React = __toESM(require_react());
    init_SvgIcon();
    import_jsx_runtime = __toESM(require_jsx_runtime());
  }
});

export {
  createSvgIcon,
  init_createSvgIcon
};
//# sourceMappingURL=chunk-64IBE7KZ.js.map
