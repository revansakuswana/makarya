import {
  defaultTheme_default,
  identifier_default,
  init_defaultTheme,
  init_identifier,
  init_system,
  useTheme_default
} from "./chunk-V2QKJW4U.js";
import {
  require_react
} from "./chunk-L3FOL4I5.js";
import {
  __esm,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@mui/material/styles/useTheme.js
function useTheme() {
  const theme = useTheme_default(defaultTheme_default);
  if (true) {
    React.useDebugValue(theme);
  }
  return theme[identifier_default] || theme;
}
var React;
var init_useTheme = __esm({
  "node_modules/@mui/material/styles/useTheme.js"() {
    "use client";
    React = __toESM(require_react());
    init_system();
    init_defaultTheme();
    init_identifier();
  }
});

export {
  useTheme,
  init_useTheme
};
//# sourceMappingURL=chunk-DIQURBVJ.js.map
