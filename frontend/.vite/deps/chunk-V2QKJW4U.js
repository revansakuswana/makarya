import {
  CacheProvider,
  Global,
  ThemeContext,
  createCache,
  init_emotion_cache_browser_development_esm,
  init_emotion_react_browser_development_esm,
  init_emotion_styled_browser_development_esm,
  newStyled,
  require_jsx_runtime
} from "./chunk-QGFLC4AF.js";
import {
  require_prop_types
} from "./chunk-EZSJO6EY.js";
import {
  require_react
} from "./chunk-L3FOL4I5.js";
import {
  __commonJS,
  __esm,
  __publicField,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@mui/utils/esm/composeClasses/composeClasses.js
function composeClasses(slots, getUtilityClass, classes = void 0) {
  const output = {};
  for (const slotName in slots) {
    const slot = slots[slotName];
    let buffer = "";
    for (let i = 0; i < slot.length; i += 1) {
      const value = slot[i];
      if (value) {
        buffer += getUtilityClass(value) + " ";
        if (classes && classes[value]) {
          buffer += classes[value] + " ";
        }
      }
    }
    output[slotName] = buffer;
  }
  return output;
}
var init_composeClasses = __esm({
  "node_modules/@mui/utils/esm/composeClasses/composeClasses.js"() {
  }
});

// node_modules/@mui/utils/esm/composeClasses/index.js
var init_composeClasses2 = __esm({
  "node_modules/@mui/utils/esm/composeClasses/index.js"() {
    init_composeClasses();
  }
});

// node_modules/@mui/utils/esm/formatMuiErrorMessage/formatMuiErrorMessage.js
var init_formatMuiErrorMessage = __esm({
  "node_modules/@mui/utils/esm/formatMuiErrorMessage/formatMuiErrorMessage.js"() {
  }
});

// node_modules/@mui/utils/esm/formatMuiErrorMessage/index.js
var init_formatMuiErrorMessage2 = __esm({
  "node_modules/@mui/utils/esm/formatMuiErrorMessage/index.js"() {
    init_formatMuiErrorMessage();
  }
});

// node_modules/@mui/utils/esm/clamp/clamp.js
function clamp(val, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
  return Math.max(min, Math.min(val, max));
}
var clamp_default;
var init_clamp = __esm({
  "node_modules/@mui/utils/esm/clamp/clamp.js"() {
    clamp_default = clamp;
  }
});

// node_modules/@mui/utils/esm/clamp/index.js
var init_clamp2 = __esm({
  "node_modules/@mui/utils/esm/clamp/index.js"() {
    init_clamp();
  }
});

// node_modules/@mui/system/colorManipulator/colorManipulator.js
function clampWrapper(value, min = 0, max = 1) {
  if (true) {
    if (value < min || value > max) {
      console.error(`MUI: The value provided ${value} is out of range [${min}, ${max}].`);
    }
  }
  return clamp_default(value, min, max);
}
function hexToRgb(color2) {
  color2 = color2.slice(1);
  const re = new RegExp(`.{1,${color2.length >= 6 ? 2 : 1}}`, "g");
  let colors = color2.match(re);
  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }
  return colors ? `rgb${colors.length === 4 ? "a" : ""}(${colors.map((n, index) => {
    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3;
  }).join(", ")})` : "";
}
function intToHex(int) {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}
function decomposeColor(color2) {
  if (color2.type) {
    return color2;
  }
  if (color2.charAt(0) === "#") {
    return decomposeColor(hexToRgb(color2));
  }
  const marker = color2.indexOf("(");
  const type = color2.substring(0, marker);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(type)) {
    throw new Error(true ? `MUI: Unsupported \`${color2}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : formatMuiErrorMessage(9, color2));
  }
  let values2 = color2.substring(marker + 1, color2.length - 1);
  let colorSpace;
  if (type === "color") {
    values2 = values2.split(" ");
    colorSpace = values2.shift();
    if (values2.length === 4 && values2[3].charAt(0) === "/") {
      values2[3] = values2[3].slice(1);
    }
    if (!["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(colorSpace)) {
      throw new Error(true ? `MUI: unsupported \`${colorSpace}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : formatMuiErrorMessage(10, colorSpace));
    }
  } else {
    values2 = values2.split(",");
  }
  values2 = values2.map((value) => parseFloat(value));
  return {
    type,
    values: values2,
    colorSpace
  };
}
function recomposeColor(color2) {
  const {
    type,
    colorSpace
  } = color2;
  let {
    values: values2
  } = color2;
  if (type.includes("rgb")) {
    values2 = values2.map((n, i) => i < 3 ? parseInt(n, 10) : n);
  } else if (type.includes("hsl")) {
    values2[1] = `${values2[1]}%`;
    values2[2] = `${values2[2]}%`;
  }
  if (type.includes("color")) {
    values2 = `${colorSpace} ${values2.join(" ")}`;
  } else {
    values2 = `${values2.join(", ")}`;
  }
  return `${type}(${values2})`;
}
function rgbToHex(color2) {
  if (color2.startsWith("#")) {
    return color2;
  }
  const {
    values: values2
  } = decomposeColor(color2);
  return `#${values2.map((n, i) => intToHex(i === 3 ? Math.round(255 * n) : n)).join("")}`;
}
function hslToRgb(color2) {
  color2 = decomposeColor(color2);
  const {
    values: values2
  } = color2;
  const h = values2[0];
  const s = values2[1] / 100;
  const l = values2[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  let type = "rgb";
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  if (color2.type === "hsla") {
    type += "a";
    rgb.push(values2[3]);
  }
  return recomposeColor({
    type,
    values: rgb
  });
}
function getLuminance(color2) {
  color2 = decomposeColor(color2);
  let rgb = color2.type === "hsl" || color2.type === "hsla" ? decomposeColor(hslToRgb(color2)).values : color2.values;
  rgb = rgb.map((val) => {
    if (color2.type !== "color") {
      val /= 255;
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function alpha(color2, value) {
  color2 = decomposeColor(color2);
  value = clampWrapper(value);
  if (color2.type === "rgb" || color2.type === "hsl") {
    color2.type += "a";
  }
  if (color2.type === "color") {
    color2.values[3] = `/${value}`;
  } else {
    color2.values[3] = value;
  }
  return recomposeColor(color2);
}
function private_safeAlpha(color2, value, warning) {
  try {
    return alpha(color2, value);
  } catch (error) {
    if (warning && true) {
      console.warn(warning);
    }
    return color2;
  }
}
function darken(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clampWrapper(coefficient);
  if (color2.type.includes("hsl")) {
    color2.values[2] *= 1 - coefficient;
  } else if (color2.type.includes("rgb") || color2.type.includes("color")) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(color2);
}
function private_safeDarken(color2, coefficient, warning) {
  try {
    return darken(color2, coefficient);
  } catch (error) {
    if (warning && true) {
      console.warn(warning);
    }
    return color2;
  }
}
function lighten(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clampWrapper(coefficient);
  if (color2.type.includes("hsl")) {
    color2.values[2] += (100 - color2.values[2]) * coefficient;
  } else if (color2.type.includes("rgb")) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] += (255 - color2.values[i]) * coefficient;
    }
  } else if (color2.type.includes("color")) {
    for (let i = 0; i < 3; i += 1) {
      color2.values[i] += (1 - color2.values[i]) * coefficient;
    }
  }
  return recomposeColor(color2);
}
function private_safeLighten(color2, coefficient, warning) {
  try {
    return lighten(color2, coefficient);
  } catch (error) {
    if (warning && true) {
      console.warn(warning);
    }
    return color2;
  }
}
function emphasize(color2, coefficient = 0.15) {
  return getLuminance(color2) > 0.5 ? darken(color2, coefficient) : lighten(color2, coefficient);
}
function private_safeEmphasize(color2, coefficient, warning) {
  try {
    return emphasize(color2, coefficient);
  } catch (error) {
    if (warning && true) {
      console.warn(warning);
    }
    return color2;
  }
}
var colorChannel, private_safeColorChannel;
var init_colorManipulator = __esm({
  "node_modules/@mui/system/colorManipulator/colorManipulator.js"() {
    init_formatMuiErrorMessage2();
    init_clamp2();
    colorChannel = (color2) => {
      const decomposedColor = decomposeColor(color2);
      return decomposedColor.values.slice(0, 3).map((val, idx) => decomposedColor.type.includes("hsl") && idx !== 0 ? `${val}%` : val).join(" ");
    };
    private_safeColorChannel = (color2, warning) => {
      try {
        return colorChannel(color2);
      } catch (error) {
        if (warning && true) {
          console.warn(warning);
        }
        return color2;
      }
    };
  }
});

// node_modules/@mui/styled-engine/StyledEngineProvider/StyledEngineProvider.js
function StyledEngineProvider(props) {
  const {
    injectFirst,
    children
  } = props;
  return injectFirst && cache ? (0, import_jsx_runtime.jsx)(CacheProvider, {
    value: cache,
    children
  }) : children;
}
var React, import_prop_types, import_jsx_runtime, cache;
var init_StyledEngineProvider = __esm({
  "node_modules/@mui/styled-engine/StyledEngineProvider/StyledEngineProvider.js"() {
    "use client";
    React = __toESM(require_react());
    import_prop_types = __toESM(require_prop_types());
    init_emotion_react_browser_development_esm();
    init_emotion_cache_browser_development_esm();
    import_jsx_runtime = __toESM(require_jsx_runtime());
    if (typeof document === "object") {
      cache = createCache({
        key: "css",
        prepend: true
      });
    }
    true ? StyledEngineProvider.propTypes = {
      /**
       * Your component tree.
       */
      children: import_prop_types.default.node,
      /**
       * By default, the styles are injected last in the <head> element of the page.
       * As a result, they gain more specificity than any other style sheet.
       * If you want to override MUI's styles, set this prop.
       */
      injectFirst: import_prop_types.default.bool
    } : void 0;
  }
});

// node_modules/@mui/styled-engine/StyledEngineProvider/index.js
var init_StyledEngineProvider2 = __esm({
  "node_modules/@mui/styled-engine/StyledEngineProvider/index.js"() {
    "use client";
    init_StyledEngineProvider();
  }
});

// node_modules/@mui/styled-engine/GlobalStyles/GlobalStyles.js
function isEmpty(obj) {
  return obj === void 0 || obj === null || Object.keys(obj).length === 0;
}
function GlobalStyles(props) {
  const {
    styles,
    defaultTheme: defaultTheme5 = {}
  } = props;
  const globalStyles = typeof styles === "function" ? (themeInput) => styles(isEmpty(themeInput) ? defaultTheme5 : themeInput) : styles;
  return (0, import_jsx_runtime2.jsx)(Global, {
    styles: globalStyles
  });
}
var React2, import_prop_types2, import_jsx_runtime2;
var init_GlobalStyles = __esm({
  "node_modules/@mui/styled-engine/GlobalStyles/GlobalStyles.js"() {
    "use client";
    React2 = __toESM(require_react());
    import_prop_types2 = __toESM(require_prop_types());
    init_emotion_react_browser_development_esm();
    import_jsx_runtime2 = __toESM(require_jsx_runtime());
    true ? GlobalStyles.propTypes = {
      defaultTheme: import_prop_types2.default.object,
      styles: import_prop_types2.default.oneOfType([import_prop_types2.default.array, import_prop_types2.default.string, import_prop_types2.default.object, import_prop_types2.default.func])
    } : void 0;
  }
});

// node_modules/@mui/styled-engine/GlobalStyles/index.js
var init_GlobalStyles2 = __esm({
  "node_modules/@mui/styled-engine/GlobalStyles/index.js"() {
    "use client";
    init_GlobalStyles();
  }
});

// node_modules/@mui/styled-engine/index.js
function styled(tag, options) {
  const stylesFactory = newStyled(tag, options);
  if (true) {
    return (...styles) => {
      const component = typeof tag === "string" ? `"${tag}"` : "component";
      if (styles.length === 0) {
        console.error([`MUI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join("\n"));
      } else if (styles.some((style4) => style4 === void 0)) {
        console.error(`MUI: the styled(${component})(...args) API requires all its args to be defined.`);
      }
      return stylesFactory(...styles);
    };
  }
  return stylesFactory;
}
var internal_processStyles;
var init_styled_engine = __esm({
  "node_modules/@mui/styled-engine/index.js"() {
    "use client";
    init_emotion_styled_browser_development_esm();
    init_emotion_react_browser_development_esm();
    init_StyledEngineProvider2();
    init_GlobalStyles2();
    internal_processStyles = (tag, processor) => {
      if (Array.isArray(tag.__emotion_styles)) {
        tag.__emotion_styles = processor(tag.__emotion_styles);
      }
    };
  }
});

// node_modules/@mui/system/createBreakpoints/createBreakpoints.js
function createBreakpoints(breakpoints) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: values2 = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    },
    unit = "px",
    step = 5,
    ...other
  } = breakpoints;
  const sortedValues = sortBreakpointsValues(values2);
  const keys = Object.keys(sortedValues);
  function up(key) {
    const value = typeof values2[key] === "number" ? values2[key] : key;
    return `@media (min-width:${value}${unit})`;
  }
  function down(key) {
    const value = typeof values2[key] === "number" ? values2[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }
  function between(start, end) {
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${typeof values2[start] === "number" ? values2[start] : start}${unit}) and (max-width:${(endIndex !== -1 && typeof values2[keys[endIndex]] === "number" ? values2[keys[endIndex]] : end) - step / 100}${unit})`;
  }
  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }
    return up(key);
  }
  function not(key) {
    const keyIndex = keys.indexOf(key);
    if (keyIndex === 0) {
      return up(keys[1]);
    }
    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }
    return between(key, keys[keys.indexOf(key) + 1]).replace("@media", "@media not all and");
  }
  return {
    keys,
    values: sortedValues,
    up,
    down,
    between,
    only,
    not,
    unit,
    ...other
  };
}
var sortBreakpointsValues;
var init_createBreakpoints = __esm({
  "node_modules/@mui/system/createBreakpoints/createBreakpoints.js"() {
    sortBreakpointsValues = (values2) => {
      const breakpointsAsArray = Object.keys(values2).map((key) => ({
        key,
        val: values2[key]
      })) || [];
      breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
      return breakpointsAsArray.reduce((acc, obj) => {
        return {
          ...acc,
          [obj.key]: obj.val
        };
      }, {});
    };
  }
});

// node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js
var defaultGenerator, createClassNameGenerator, ClassNameGenerator, ClassNameGenerator_default;
var init_ClassNameGenerator = __esm({
  "node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js"() {
    defaultGenerator = (componentName) => componentName;
    createClassNameGenerator = () => {
      let generate = defaultGenerator;
      return {
        configure(generator) {
          generate = generator;
        },
        generate(componentName) {
          return generate(componentName);
        },
        reset() {
          generate = defaultGenerator;
        }
      };
    };
    ClassNameGenerator = createClassNameGenerator();
    ClassNameGenerator_default = ClassNameGenerator;
  }
});

// node_modules/@mui/utils/esm/ClassNameGenerator/index.js
var init_ClassNameGenerator2 = __esm({
  "node_modules/@mui/utils/esm/ClassNameGenerator/index.js"() {
    init_ClassNameGenerator();
  }
});

// node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js
function generateUtilityClass(componentName, slot, globalStatePrefix = "Mui") {
  const globalStateClass = globalStateClasses[slot];
  return globalStateClass ? `${globalStatePrefix}-${globalStateClass}` : `${ClassNameGenerator_default.generate(componentName)}-${slot}`;
}
var globalStateClasses;
var init_generateUtilityClass = __esm({
  "node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"() {
    init_ClassNameGenerator2();
    globalStateClasses = {
      active: "active",
      checked: "checked",
      completed: "completed",
      disabled: "disabled",
      error: "error",
      expanded: "expanded",
      focused: "focused",
      focusVisible: "focusVisible",
      open: "open",
      readOnly: "readOnly",
      required: "required",
      selected: "selected"
    };
  }
});

// node_modules/@mui/utils/esm/generateUtilityClass/index.js
var init_generateUtilityClass2 = __esm({
  "node_modules/@mui/utils/esm/generateUtilityClass/index.js"() {
    init_generateUtilityClass();
    init_generateUtilityClass();
  }
});

// node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js
function generateUtilityClasses(componentName, slots, globalStatePrefix = "Mui") {
  const result = {};
  slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix);
  });
  return result;
}
var init_generateUtilityClasses = __esm({
  "node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"() {
    init_generateUtilityClass2();
  }
});

// node_modules/@mui/utils/esm/generateUtilityClasses/index.js
var init_generateUtilityClasses2 = __esm({
  "node_modules/@mui/utils/esm/generateUtilityClasses/index.js"() {
    init_generateUtilityClasses();
  }
});

// node_modules/@mui/utils/esm/useEnhancedEffect/useEnhancedEffect.js
var React3, useEnhancedEffect, useEnhancedEffect_default;
var init_useEnhancedEffect = __esm({
  "node_modules/@mui/utils/esm/useEnhancedEffect/useEnhancedEffect.js"() {
    "use client";
    React3 = __toESM(require_react());
    useEnhancedEffect = typeof window !== "undefined" ? React3.useLayoutEffect : React3.useEffect;
    useEnhancedEffect_default = useEnhancedEffect;
  }
});

// node_modules/@mui/utils/esm/useEnhancedEffect/index.js
var init_useEnhancedEffect2 = __esm({
  "node_modules/@mui/utils/esm/useEnhancedEffect/index.js"() {
    init_useEnhancedEffect();
  }
});

// node_modules/@mui/utils/esm/resolveProps/resolveProps.js
function resolveProps(defaultProps, props) {
  const output = {
    ...props
  };
  for (const key in defaultProps) {
    if (Object.prototype.hasOwnProperty.call(defaultProps, key)) {
      const propName = key;
      if (propName === "components" || propName === "slots") {
        output[propName] = {
          ...defaultProps[propName],
          ...output[propName]
        };
      } else if (propName === "componentsProps" || propName === "slotProps") {
        const defaultSlotProps = defaultProps[propName];
        const slotProps = props[propName];
        if (!slotProps) {
          output[propName] = defaultSlotProps || {};
        } else if (!defaultSlotProps) {
          output[propName] = slotProps;
        } else {
          output[propName] = {
            ...slotProps
          };
          for (const slotKey in defaultSlotProps) {
            if (Object.prototype.hasOwnProperty.call(defaultSlotProps, slotKey)) {
              const slotPropName = slotKey;
              output[propName][slotPropName] = resolveProps(defaultSlotProps[slotPropName], slotProps[slotPropName]);
            }
          }
        }
      } else if (output[propName] === void 0) {
        output[propName] = defaultProps[propName];
      }
    }
  }
  return output;
}
var init_resolveProps = __esm({
  "node_modules/@mui/utils/esm/resolveProps/resolveProps.js"() {
  }
});

// node_modules/@mui/utils/esm/resolveProps/index.js
var init_resolveProps2 = __esm({
  "node_modules/@mui/utils/esm/resolveProps/index.js"() {
    init_resolveProps();
  }
});

// node_modules/@mui/system/useThemeProps/getThemeProps.js
function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  return resolveProps(theme.components[name].defaultProps, props);
}
var init_getThemeProps = __esm({
  "node_modules/@mui/system/useThemeProps/getThemeProps.js"() {
    init_resolveProps2();
  }
});

// node_modules/@mui/utils/esm/deepmerge/deepmerge.js
function isPlainObject(item) {
  if (typeof item !== "object" || item === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(item);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in item) && !(Symbol.iterator in item);
}
function deepClone(source) {
  if (!isPlainObject(source)) {
    return source;
  }
  const output = {};
  Object.keys(source).forEach((key) => {
    output[key] = deepClone(source[key]);
  });
  return output;
}
function deepmerge(target, source, options = {
  clone: true
}) {
  const output = options.clone ? {
    ...target
  } : target;
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isPlainObject(source[key]) && // Avoid prototype pollution
      Object.prototype.hasOwnProperty.call(target, key) && isPlainObject(target[key])) {
        output[key] = deepmerge(target[key], source[key], options);
      } else if (options.clone) {
        output[key] = isPlainObject(source[key]) ? deepClone(source[key]) : source[key];
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}
var init_deepmerge = __esm({
  "node_modules/@mui/utils/esm/deepmerge/deepmerge.js"() {
  }
});

// node_modules/@mui/utils/esm/deepmerge/index.js
var init_deepmerge2 = __esm({
  "node_modules/@mui/utils/esm/deepmerge/index.js"() {
    init_deepmerge();
    init_deepmerge();
  }
});

// node_modules/@mui/system/cssContainerQueries/cssContainerQueries.js
function sortContainerQueries(theme, css2) {
  if (!theme.containerQueries) {
    return css2;
  }
  const sorted = Object.keys(css2).filter((key) => key.startsWith("@container")).sort((a, b) => {
    var _a, _b;
    const regex = /min-width:\s*([0-9.]+)/;
    return +(((_a = a.match(regex)) == null ? void 0 : _a[1]) || 0) - +(((_b = b.match(regex)) == null ? void 0 : _b[1]) || 0);
  });
  if (!sorted.length) {
    return css2;
  }
  return sorted.reduce((acc, key) => {
    const value = css2[key];
    delete acc[key];
    acc[key] = value;
    return acc;
  }, {
    ...css2
  });
}
function isCqShorthand(breakpointKeys, value) {
  return value === "@" || value.startsWith("@") && (breakpointKeys.some((key) => value.startsWith(`@${key}`)) || !!value.match(/^@\d/));
}
function getContainerQuery(theme, shorthand) {
  const matches = shorthand.match(/^@([^/]+)?\/?(.+)?$/);
  if (!matches) {
    if (true) {
      throw new Error(true ? `MUI: The provided shorthand ${`(${shorthand})`} is invalid. The format should be \`@<breakpoint | number>\` or \`@<breakpoint | number>/<container>\`.
For example, \`@sm\` or \`@600\` or \`@40rem/sidebar\`.` : formatMuiErrorMessage(18, `(${shorthand})`));
    }
    return null;
  }
  const [, containerQuery, containerName] = matches;
  const value = Number.isNaN(+containerQuery) ? containerQuery || 0 : +containerQuery;
  return theme.containerQueries(containerName).up(value);
}
function cssContainerQueries(themeInput) {
  const toContainerQuery = (mediaQuery, name) => mediaQuery.replace("@media", name ? `@container ${name}` : "@container");
  function attachCq(node2, name) {
    node2.up = (...args) => toContainerQuery(themeInput.breakpoints.up(...args), name);
    node2.down = (...args) => toContainerQuery(themeInput.breakpoints.down(...args), name);
    node2.between = (...args) => toContainerQuery(themeInput.breakpoints.between(...args), name);
    node2.only = (...args) => toContainerQuery(themeInput.breakpoints.only(...args), name);
    node2.not = (...args) => {
      const result = toContainerQuery(themeInput.breakpoints.not(...args), name);
      if (result.includes("not all and")) {
        return result.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or");
      }
      return result;
    };
  }
  const node = {};
  const containerQueries = (name) => {
    attachCq(node, name);
    return node;
  };
  attachCq(containerQueries);
  return {
    ...themeInput,
    containerQueries
  };
}
var init_cssContainerQueries = __esm({
  "node_modules/@mui/system/cssContainerQueries/cssContainerQueries.js"() {
    init_formatMuiErrorMessage2();
  }
});

// node_modules/@mui/system/cssContainerQueries/index.js
var init_cssContainerQueries2 = __esm({
  "node_modules/@mui/system/cssContainerQueries/index.js"() {
    init_cssContainerQueries();
    init_cssContainerQueries();
  }
});

// node_modules/@mui/system/createTheme/shape.js
var shape, shape_default;
var init_shape = __esm({
  "node_modules/@mui/system/createTheme/shape.js"() {
    shape = {
      borderRadius: 4
    };
    shape_default = shape;
  }
});

// node_modules/@mui/system/responsivePropType/responsivePropType.js
var import_prop_types3, responsivePropType, responsivePropType_default;
var init_responsivePropType = __esm({
  "node_modules/@mui/system/responsivePropType/responsivePropType.js"() {
    import_prop_types3 = __toESM(require_prop_types());
    responsivePropType = true ? import_prop_types3.default.oneOfType([import_prop_types3.default.number, import_prop_types3.default.string, import_prop_types3.default.object, import_prop_types3.default.array]) : {};
    responsivePropType_default = responsivePropType;
  }
});

// node_modules/@mui/system/responsivePropType/index.js
var init_responsivePropType2 = __esm({
  "node_modules/@mui/system/responsivePropType/index.js"() {
    "use client";
    init_responsivePropType();
  }
});

// node_modules/@mui/system/merge/merge.js
function merge(acc, item) {
  if (!item) {
    return acc;
  }
  return deepmerge(acc, item, {
    clone: false
    // No need to clone deep, it's way faster.
  });
}
var merge_default;
var init_merge = __esm({
  "node_modules/@mui/system/merge/merge.js"() {
    init_deepmerge2();
    merge_default = merge;
  }
});

// node_modules/@mui/system/merge/index.js
var init_merge2 = __esm({
  "node_modules/@mui/system/merge/index.js"() {
    "use client";
    init_merge();
  }
});

// node_modules/@mui/system/breakpoints/breakpoints.js
function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme = props.theme || {};
  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }
  if (typeof propValue === "object") {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      if (isCqShorthand(themeBreakpoints.keys, breakpoint)) {
        const containerKey = getContainerQuery(theme.containerQueries ? theme : defaultContainerQueries, breakpoint);
        if (containerKey) {
          acc[containerKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
        }
      } else if (Object.keys(themeBreakpoints.values || values).includes(breakpoint)) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }
      return acc;
    }, {});
  }
  const output = styleFromPropValue(propValue);
  return output;
}
function createEmptyBreakpointObject(breakpointsInput = {}) {
  var _a;
  const breakpointsInOrder = (_a = breakpointsInput.keys) == null ? void 0 : _a.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
function removeUnusedBreakpoints(breakpointKeys, style4) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;
    if (isBreakpointUnused) {
      delete acc[key];
    }
    return acc;
  }, style4);
}
function mergeBreakpointsInOrder(breakpointsInput, ...styles) {
  const emptyBreakpoints = createEmptyBreakpointObject(breakpointsInput);
  const mergedOutput = [emptyBreakpoints, ...styles].reduce((prev, next) => deepmerge(prev, next), {});
  return removeUnusedBreakpoints(Object.keys(emptyBreakpoints), mergedOutput);
}
function computeBreakpointsBase(breakpointValues, themeBreakpoints) {
  if (typeof breakpointValues !== "object") {
    return {};
  }
  const base = {};
  const breakpointsKeys = Object.keys(themeBreakpoints);
  if (Array.isArray(breakpointValues)) {
    breakpointsKeys.forEach((breakpoint, i) => {
      if (i < breakpointValues.length) {
        base[breakpoint] = true;
      }
    });
  } else {
    breakpointsKeys.forEach((breakpoint) => {
      if (breakpointValues[breakpoint] != null) {
        base[breakpoint] = true;
      }
    });
  }
  return base;
}
function resolveBreakpointValues({
  values: breakpointValues,
  breakpoints: themeBreakpoints,
  base: customBase
}) {
  const base = customBase || computeBreakpointsBase(breakpointValues, themeBreakpoints);
  const keys = Object.keys(base);
  if (keys.length === 0) {
    return breakpointValues;
  }
  let previous;
  return keys.reduce((acc, breakpoint, i) => {
    if (Array.isArray(breakpointValues)) {
      acc[breakpoint] = breakpointValues[i] != null ? breakpointValues[i] : breakpointValues[previous];
      previous = i;
    } else if (typeof breakpointValues === "object") {
      acc[breakpoint] = breakpointValues[breakpoint] != null ? breakpointValues[breakpoint] : breakpointValues[previous];
      previous = breakpoint;
    } else {
      acc[breakpoint] = breakpointValues;
    }
    return acc;
  }, {});
}
var import_prop_types4, values, defaultBreakpoints, defaultContainerQueries;
var init_breakpoints = __esm({
  "node_modules/@mui/system/breakpoints/breakpoints.js"() {
    import_prop_types4 = __toESM(require_prop_types());
    init_deepmerge2();
    init_merge2();
    init_cssContainerQueries2();
    values = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    };
    defaultBreakpoints = {
      // Sorted ASC by size. That's important.
      // It can't be configured as it's used statically for propTypes.
      keys: ["xs", "sm", "md", "lg", "xl"],
      up: (key) => `@media (min-width:${values[key]}px)`
    };
    defaultContainerQueries = {
      containerQueries: (containerName) => ({
        up: (key) => {
          let result = typeof key === "number" ? key : values[key] || key;
          if (typeof result === "number") {
            result = `${result}px`;
          }
          return containerName ? `@container ${containerName} (min-width:${result})` : `@container (min-width:${result})`;
        }
      })
    };
  }
});

// node_modules/@mui/system/breakpoints/index.js
var init_breakpoints2 = __esm({
  "node_modules/@mui/system/breakpoints/index.js"() {
    "use client";
    init_breakpoints();
    init_breakpoints();
  }
});

// node_modules/@mui/utils/esm/capitalize/capitalize.js
function capitalize(string) {
  if (typeof string !== "string") {
    throw new Error(true ? `MUI: \`capitalize(string)\` expects a string argument.` : formatMuiErrorMessage(7));
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
var init_capitalize = __esm({
  "node_modules/@mui/utils/esm/capitalize/capitalize.js"() {
    init_formatMuiErrorMessage2();
  }
});

// node_modules/@mui/utils/esm/capitalize/index.js
var init_capitalize2 = __esm({
  "node_modules/@mui/utils/esm/capitalize/index.js"() {
    init_capitalize();
  }
});

// node_modules/@mui/system/style/style.js
function getPath(obj, path, checkVars = true) {
  if (!path || typeof path !== "string") {
    return null;
  }
  if (obj && obj.vars && checkVars) {
    const val = `vars.${path}`.split(".").reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
    if (val != null) {
      return val;
    }
  }
  return path.split(".").reduce((acc, item) => {
    if (acc && acc[item] != null) {
      return acc[item];
    }
    return null;
  }, obj);
}
function getStyleValue(themeMapping, transform, propValueFinal, userValue = propValueFinal) {
  let value;
  if (typeof themeMapping === "function") {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }
  if (transform) {
    value = transform(value, userValue, themeMapping);
  }
  return value;
}
function style(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform
  } = options;
  const fn = (props) => {
    if (props[prop] == null) {
      return null;
    }
    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = (propValueFinal) => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === "string") {
        value = getStyleValue(themeMapping, transform, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, propValue, styleFromPropValue);
  };
  fn.propTypes = true ? {
    [prop]: responsivePropType_default
  } : {};
  fn.filterProps = [prop];
  return fn;
}
var style_default;
var init_style = __esm({
  "node_modules/@mui/system/style/style.js"() {
    init_capitalize2();
    init_responsivePropType2();
    init_breakpoints2();
    style_default = style;
  }
});

// node_modules/@mui/system/style/index.js
var init_style2 = __esm({
  "node_modules/@mui/system/style/index.js"() {
    "use client";
    init_style();
    init_style();
  }
});

// node_modules/@mui/system/memoize/memoize.js
function memoize(fn) {
  const cache2 = {};
  return (arg) => {
    if (cache2[arg] === void 0) {
      cache2[arg] = fn(arg);
    }
    return cache2[arg];
  };
}
var init_memoize = __esm({
  "node_modules/@mui/system/memoize/memoize.js"() {
  }
});

// node_modules/@mui/system/memoize/index.js
var init_memoize2 = __esm({
  "node_modules/@mui/system/memoize/index.js"() {
    "use client";
    init_memoize();
  }
});

// node_modules/@mui/system/spacing/spacing.js
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  const themeSpacing = getPath(theme, themeKey, true) ?? defaultValue;
  if (typeof themeSpacing === "number" || typeof themeSpacing === "string") {
    return (val) => {
      if (typeof val === "string") {
        return val;
      }
      if (true) {
        if (typeof val !== "number") {
          console.error(`MUI: Expected ${propName} argument to be a number or a string, got ${val}.`);
        }
      }
      if (typeof themeSpacing === "string") {
        return `calc(${val} * ${themeSpacing})`;
      }
      return themeSpacing * val;
    };
  }
  if (Array.isArray(themeSpacing)) {
    return (val) => {
      if (typeof val === "string") {
        return val;
      }
      const abs = Math.abs(val);
      if (true) {
        if (!Number.isInteger(abs)) {
          console.error([`MUI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`].join("\n"));
        } else if (abs > themeSpacing.length - 1) {
          console.error([`MUI: The value provided (${abs}) overflows.`, `The supported values are: ${JSON.stringify(themeSpacing)}.`, `${abs} > ${themeSpacing.length - 1}, you need to add the missing values.`].join("\n"));
        }
      }
      const transformed = themeSpacing[abs];
      if (val >= 0) {
        return transformed;
      }
      if (typeof transformed === "number") {
        return -transformed;
      }
      return `-${transformed}`;
    };
  }
  if (typeof themeSpacing === "function") {
    return themeSpacing;
  }
  if (true) {
    console.error([`MUI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`, "It should be a number, an array or a function."].join("\n"));
  }
  return () => void 0;
}
function createUnarySpacing(theme) {
  return createUnaryUnit(theme, "spacing", 8, "spacing");
}
function getValue(transformer, propValue) {
  if (typeof propValue === "string" || propValue == null) {
    return propValue;
  }
  return transformer(propValue);
}
function getStyleFromPropValue(cssProperties, transformer) {
  return (propValue) => cssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = getValue(transformer, propValue);
    return acc;
  }, {});
}
function resolveCssProperty(props, keys, prop, transformer) {
  if (!keys.includes(prop)) {
    return null;
  }
  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}
function style2(props, keys) {
  const transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map((prop) => resolveCssProperty(props, keys, prop, transformer)).reduce(merge_default, {});
}
function margin(props) {
  return style2(props, marginKeys);
}
function padding(props) {
  return style2(props, paddingKeys);
}
function spacing(props) {
  return style2(props, spacingKeys);
}
var properties, directions, aliases, getCssProperties, marginKeys, paddingKeys, spacingKeys, spacing_default;
var init_spacing = __esm({
  "node_modules/@mui/system/spacing/spacing.js"() {
    init_responsivePropType2();
    init_breakpoints2();
    init_style2();
    init_merge2();
    init_memoize2();
    properties = {
      m: "margin",
      p: "padding"
    };
    directions = {
      t: "Top",
      r: "Right",
      b: "Bottom",
      l: "Left",
      x: ["Left", "Right"],
      y: ["Top", "Bottom"]
    };
    aliases = {
      marginX: "mx",
      marginY: "my",
      paddingX: "px",
      paddingY: "py"
    };
    getCssProperties = memoize((prop) => {
      if (prop.length > 2) {
        if (aliases[prop]) {
          prop = aliases[prop];
        } else {
          return [prop];
        }
      }
      const [a, b] = prop.split("");
      const property = properties[a];
      const direction = directions[b] || "";
      return Array.isArray(direction) ? direction.map((dir) => property + dir) : [property + direction];
    });
    marginKeys = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"];
    paddingKeys = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
    spacingKeys = [...marginKeys, ...paddingKeys];
    margin.propTypes = true ? marginKeys.reduce((obj, key) => {
      obj[key] = responsivePropType_default;
      return obj;
    }, {}) : {};
    margin.filterProps = marginKeys;
    padding.propTypes = true ? paddingKeys.reduce((obj, key) => {
      obj[key] = responsivePropType_default;
      return obj;
    }, {}) : {};
    padding.filterProps = paddingKeys;
    spacing.propTypes = true ? spacingKeys.reduce((obj, key) => {
      obj[key] = responsivePropType_default;
      return obj;
    }, {}) : {};
    spacing.filterProps = spacingKeys;
    spacing_default = spacing;
  }
});

// node_modules/@mui/system/spacing/index.js
var init_spacing2 = __esm({
  "node_modules/@mui/system/spacing/index.js"() {
    "use client";
    init_spacing();
    init_spacing();
  }
});

// node_modules/@mui/system/createTheme/createSpacing.js
function createSpacing(spacingInput = 8, transform = createUnarySpacing({
  spacing: spacingInput
})) {
  if (spacingInput.mui) {
    return spacingInput;
  }
  const spacing2 = (...argsInput) => {
    if (true) {
      if (!(argsInput.length <= 4)) {
        console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`);
      }
    }
    const args = argsInput.length === 0 ? [1] : argsInput;
    return args.map((argument) => {
      const output = transform(argument);
      return typeof output === "number" ? `${output}px` : output;
    }).join(" ");
  };
  spacing2.mui = true;
  return spacing2;
}
var init_createSpacing = __esm({
  "node_modules/@mui/system/createTheme/createSpacing.js"() {
    init_spacing2();
  }
});

// node_modules/@mui/system/compose/compose.js
function compose(...styles) {
  const handlers = styles.reduce((acc, style4) => {
    style4.filterProps.forEach((prop) => {
      acc[prop] = style4;
    });
    return acc;
  }, {});
  const fn = (props) => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge_default(acc, handlers[prop](props));
      }
      return acc;
    }, {});
  };
  fn.propTypes = true ? styles.reduce((acc, style4) => Object.assign(acc, style4.propTypes), {}) : {};
  fn.filterProps = styles.reduce((acc, style4) => acc.concat(style4.filterProps), []);
  return fn;
}
var compose_default;
var init_compose = __esm({
  "node_modules/@mui/system/compose/compose.js"() {
    init_merge2();
    compose_default = compose;
  }
});

// node_modules/@mui/system/compose/index.js
var init_compose2 = __esm({
  "node_modules/@mui/system/compose/index.js"() {
    "use client";
    init_compose();
  }
});

// node_modules/@mui/system/borders/borders.js
function borderTransform(value) {
  if (typeof value !== "number") {
    return value;
  }
  return `${value}px solid`;
}
function createBorderStyle(prop, transform) {
  return style_default({
    prop,
    themeKey: "borders",
    transform
  });
}
var border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, outline, outlineColor, borderRadius, borders, borders_default;
var init_borders = __esm({
  "node_modules/@mui/system/borders/borders.js"() {
    init_responsivePropType2();
    init_style2();
    init_compose2();
    init_spacing2();
    init_breakpoints2();
    border = createBorderStyle("border", borderTransform);
    borderTop = createBorderStyle("borderTop", borderTransform);
    borderRight = createBorderStyle("borderRight", borderTransform);
    borderBottom = createBorderStyle("borderBottom", borderTransform);
    borderLeft = createBorderStyle("borderLeft", borderTransform);
    borderColor = createBorderStyle("borderColor");
    borderTopColor = createBorderStyle("borderTopColor");
    borderRightColor = createBorderStyle("borderRightColor");
    borderBottomColor = createBorderStyle("borderBottomColor");
    borderLeftColor = createBorderStyle("borderLeftColor");
    outline = createBorderStyle("outline", borderTransform);
    outlineColor = createBorderStyle("outlineColor");
    borderRadius = (props) => {
      if (props.borderRadius !== void 0 && props.borderRadius !== null) {
        const transformer = createUnaryUnit(props.theme, "shape.borderRadius", 4, "borderRadius");
        const styleFromPropValue = (propValue) => ({
          borderRadius: getValue(transformer, propValue)
        });
        return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
      }
      return null;
    };
    borderRadius.propTypes = true ? {
      borderRadius: responsivePropType_default
    } : {};
    borderRadius.filterProps = ["borderRadius"];
    borders = compose_default(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius, outline, outlineColor);
    borders_default = borders;
  }
});

// node_modules/@mui/system/borders/index.js
var init_borders2 = __esm({
  "node_modules/@mui/system/borders/index.js"() {
    "use client";
    init_borders();
    init_borders();
  }
});

// node_modules/@mui/system/cssGrid/cssGrid.js
var gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea, grid, cssGrid_default;
var init_cssGrid = __esm({
  "node_modules/@mui/system/cssGrid/cssGrid.js"() {
    init_style2();
    init_compose2();
    init_spacing2();
    init_breakpoints2();
    init_responsivePropType2();
    gap = (props) => {
      if (props.gap !== void 0 && props.gap !== null) {
        const transformer = createUnaryUnit(props.theme, "spacing", 8, "gap");
        const styleFromPropValue = (propValue) => ({
          gap: getValue(transformer, propValue)
        });
        return handleBreakpoints(props, props.gap, styleFromPropValue);
      }
      return null;
    };
    gap.propTypes = true ? {
      gap: responsivePropType_default
    } : {};
    gap.filterProps = ["gap"];
    columnGap = (props) => {
      if (props.columnGap !== void 0 && props.columnGap !== null) {
        const transformer = createUnaryUnit(props.theme, "spacing", 8, "columnGap");
        const styleFromPropValue = (propValue) => ({
          columnGap: getValue(transformer, propValue)
        });
        return handleBreakpoints(props, props.columnGap, styleFromPropValue);
      }
      return null;
    };
    columnGap.propTypes = true ? {
      columnGap: responsivePropType_default
    } : {};
    columnGap.filterProps = ["columnGap"];
    rowGap = (props) => {
      if (props.rowGap !== void 0 && props.rowGap !== null) {
        const transformer = createUnaryUnit(props.theme, "spacing", 8, "rowGap");
        const styleFromPropValue = (propValue) => ({
          rowGap: getValue(transformer, propValue)
        });
        return handleBreakpoints(props, props.rowGap, styleFromPropValue);
      }
      return null;
    };
    rowGap.propTypes = true ? {
      rowGap: responsivePropType_default
    } : {};
    rowGap.filterProps = ["rowGap"];
    gridColumn = style_default({
      prop: "gridColumn"
    });
    gridRow = style_default({
      prop: "gridRow"
    });
    gridAutoFlow = style_default({
      prop: "gridAutoFlow"
    });
    gridAutoColumns = style_default({
      prop: "gridAutoColumns"
    });
    gridAutoRows = style_default({
      prop: "gridAutoRows"
    });
    gridTemplateColumns = style_default({
      prop: "gridTemplateColumns"
    });
    gridTemplateRows = style_default({
      prop: "gridTemplateRows"
    });
    gridTemplateAreas = style_default({
      prop: "gridTemplateAreas"
    });
    gridArea = style_default({
      prop: "gridArea"
    });
    grid = compose_default(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
    cssGrid_default = grid;
  }
});

// node_modules/@mui/system/cssGrid/index.js
var init_cssGrid2 = __esm({
  "node_modules/@mui/system/cssGrid/index.js"() {
    "use client";
    init_cssGrid();
    init_cssGrid();
  }
});

// node_modules/@mui/system/palette/palette.js
function paletteTransform(value, userValue) {
  if (userValue === "grey") {
    return userValue;
  }
  return value;
}
var color, bgcolor, backgroundColor, palette, palette_default;
var init_palette = __esm({
  "node_modules/@mui/system/palette/palette.js"() {
    init_style2();
    init_compose2();
    color = style_default({
      prop: "color",
      themeKey: "palette",
      transform: paletteTransform
    });
    bgcolor = style_default({
      prop: "bgcolor",
      cssProperty: "backgroundColor",
      themeKey: "palette",
      transform: paletteTransform
    });
    backgroundColor = style_default({
      prop: "backgroundColor",
      themeKey: "palette",
      transform: paletteTransform
    });
    palette = compose_default(color, bgcolor, backgroundColor);
    palette_default = palette;
  }
});

// node_modules/@mui/system/palette/index.js
var init_palette2 = __esm({
  "node_modules/@mui/system/palette/index.js"() {
    "use client";
    init_palette();
    init_palette();
  }
});

// node_modules/@mui/system/sizing/sizing.js
function sizingTransform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
var width, maxWidth, minWidth, height, maxHeight, minHeight, sizeWidth, sizeHeight, boxSizing, sizing, sizing_default;
var init_sizing = __esm({
  "node_modules/@mui/system/sizing/sizing.js"() {
    init_style2();
    init_compose2();
    init_breakpoints2();
    width = style_default({
      prop: "width",
      transform: sizingTransform
    });
    maxWidth = (props) => {
      if (props.maxWidth !== void 0 && props.maxWidth !== null) {
        const styleFromPropValue = (propValue) => {
          var _a, _b, _c, _d, _e;
          const breakpoint = ((_c = (_b = (_a = props.theme) == null ? void 0 : _a.breakpoints) == null ? void 0 : _b.values) == null ? void 0 : _c[propValue]) || values[propValue];
          if (!breakpoint) {
            return {
              maxWidth: sizingTransform(propValue)
            };
          }
          if (((_e = (_d = props.theme) == null ? void 0 : _d.breakpoints) == null ? void 0 : _e.unit) !== "px") {
            return {
              maxWidth: `${breakpoint}${props.theme.breakpoints.unit}`
            };
          }
          return {
            maxWidth: breakpoint
          };
        };
        return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
      }
      return null;
    };
    maxWidth.filterProps = ["maxWidth"];
    minWidth = style_default({
      prop: "minWidth",
      transform: sizingTransform
    });
    height = style_default({
      prop: "height",
      transform: sizingTransform
    });
    maxHeight = style_default({
      prop: "maxHeight",
      transform: sizingTransform
    });
    minHeight = style_default({
      prop: "minHeight",
      transform: sizingTransform
    });
    sizeWidth = style_default({
      prop: "size",
      cssProperty: "width",
      transform: sizingTransform
    });
    sizeHeight = style_default({
      prop: "size",
      cssProperty: "height",
      transform: sizingTransform
    });
    boxSizing = style_default({
      prop: "boxSizing"
    });
    sizing = compose_default(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
    sizing_default = sizing;
  }
});

// node_modules/@mui/system/sizing/index.js
var init_sizing2 = __esm({
  "node_modules/@mui/system/sizing/index.js"() {
    "use client";
    init_sizing();
    init_sizing();
  }
});

// node_modules/@mui/system/styleFunctionSx/defaultSxConfig.js
var defaultSxConfig, defaultSxConfig_default;
var init_defaultSxConfig = __esm({
  "node_modules/@mui/system/styleFunctionSx/defaultSxConfig.js"() {
    init_spacing2();
    init_borders2();
    init_cssGrid2();
    init_palette2();
    init_sizing2();
    defaultSxConfig = {
      // borders
      border: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderTop: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderRight: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderBottom: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderLeft: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderColor: {
        themeKey: "palette"
      },
      borderTopColor: {
        themeKey: "palette"
      },
      borderRightColor: {
        themeKey: "palette"
      },
      borderBottomColor: {
        themeKey: "palette"
      },
      borderLeftColor: {
        themeKey: "palette"
      },
      outline: {
        themeKey: "borders",
        transform: borderTransform
      },
      outlineColor: {
        themeKey: "palette"
      },
      borderRadius: {
        themeKey: "shape.borderRadius",
        style: borderRadius
      },
      // palette
      color: {
        themeKey: "palette",
        transform: paletteTransform
      },
      bgcolor: {
        themeKey: "palette",
        cssProperty: "backgroundColor",
        transform: paletteTransform
      },
      backgroundColor: {
        themeKey: "palette",
        transform: paletteTransform
      },
      // spacing
      p: {
        style: padding
      },
      pt: {
        style: padding
      },
      pr: {
        style: padding
      },
      pb: {
        style: padding
      },
      pl: {
        style: padding
      },
      px: {
        style: padding
      },
      py: {
        style: padding
      },
      padding: {
        style: padding
      },
      paddingTop: {
        style: padding
      },
      paddingRight: {
        style: padding
      },
      paddingBottom: {
        style: padding
      },
      paddingLeft: {
        style: padding
      },
      paddingX: {
        style: padding
      },
      paddingY: {
        style: padding
      },
      paddingInline: {
        style: padding
      },
      paddingInlineStart: {
        style: padding
      },
      paddingInlineEnd: {
        style: padding
      },
      paddingBlock: {
        style: padding
      },
      paddingBlockStart: {
        style: padding
      },
      paddingBlockEnd: {
        style: padding
      },
      m: {
        style: margin
      },
      mt: {
        style: margin
      },
      mr: {
        style: margin
      },
      mb: {
        style: margin
      },
      ml: {
        style: margin
      },
      mx: {
        style: margin
      },
      my: {
        style: margin
      },
      margin: {
        style: margin
      },
      marginTop: {
        style: margin
      },
      marginRight: {
        style: margin
      },
      marginBottom: {
        style: margin
      },
      marginLeft: {
        style: margin
      },
      marginX: {
        style: margin
      },
      marginY: {
        style: margin
      },
      marginInline: {
        style: margin
      },
      marginInlineStart: {
        style: margin
      },
      marginInlineEnd: {
        style: margin
      },
      marginBlock: {
        style: margin
      },
      marginBlockStart: {
        style: margin
      },
      marginBlockEnd: {
        style: margin
      },
      // display
      displayPrint: {
        cssProperty: false,
        transform: (value) => ({
          "@media print": {
            display: value
          }
        })
      },
      display: {},
      overflow: {},
      textOverflow: {},
      visibility: {},
      whiteSpace: {},
      // flexbox
      flexBasis: {},
      flexDirection: {},
      flexWrap: {},
      justifyContent: {},
      alignItems: {},
      alignContent: {},
      order: {},
      flex: {},
      flexGrow: {},
      flexShrink: {},
      alignSelf: {},
      justifyItems: {},
      justifySelf: {},
      // grid
      gap: {
        style: gap
      },
      rowGap: {
        style: rowGap
      },
      columnGap: {
        style: columnGap
      },
      gridColumn: {},
      gridRow: {},
      gridAutoFlow: {},
      gridAutoColumns: {},
      gridAutoRows: {},
      gridTemplateColumns: {},
      gridTemplateRows: {},
      gridTemplateAreas: {},
      gridArea: {},
      // positions
      position: {},
      zIndex: {
        themeKey: "zIndex"
      },
      top: {},
      right: {},
      bottom: {},
      left: {},
      // shadows
      boxShadow: {
        themeKey: "shadows"
      },
      // sizing
      width: {
        transform: sizingTransform
      },
      maxWidth: {
        style: maxWidth
      },
      minWidth: {
        transform: sizingTransform
      },
      height: {
        transform: sizingTransform
      },
      maxHeight: {
        transform: sizingTransform
      },
      minHeight: {
        transform: sizingTransform
      },
      boxSizing: {},
      // typography
      font: {
        themeKey: "font"
      },
      fontFamily: {
        themeKey: "typography"
      },
      fontSize: {
        themeKey: "typography"
      },
      fontStyle: {
        themeKey: "typography"
      },
      fontWeight: {
        themeKey: "typography"
      },
      letterSpacing: {},
      textTransform: {},
      lineHeight: {},
      textAlign: {},
      typography: {
        cssProperty: false,
        themeKey: "typography"
      }
    };
    defaultSxConfig_default = defaultSxConfig;
  }
});

// node_modules/@mui/system/styleFunctionSx/styleFunctionSx.js
function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}
function callIfFn(maybeFn, arg) {
  return typeof maybeFn === "function" ? maybeFn(arg) : maybeFn;
}
function unstable_createStyleFunctionSx() {
  function getThemeValue(prop, val, theme, config) {
    const props = {
      [prop]: val,
      theme
    };
    const options = config[prop];
    if (!options) {
      return {
        [prop]: val
      };
    }
    const {
      cssProperty = prop,
      themeKey,
      transform,
      style: style4
    } = options;
    if (val == null) {
      return null;
    }
    if (themeKey === "typography" && val === "inherit") {
      return {
        [prop]: val
      };
    }
    const themeMapping = getPath(theme, themeKey) || {};
    if (style4) {
      return style4(props);
    }
    const styleFromPropValue = (propValueFinal) => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === "string") {
        value = getStyleValue(themeMapping, transform, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, val, styleFromPropValue);
  }
  function styleFunctionSx2(props) {
    const {
      sx,
      theme = {}
    } = props || {};
    if (!sx) {
      return null;
    }
    const config = theme.unstable_sxConfig ?? defaultSxConfig_default;
    function traverse(sxInput) {
      let sxObject = sxInput;
      if (typeof sxInput === "function") {
        sxObject = sxInput(theme);
      } else if (typeof sxInput !== "object") {
        return sxInput;
      }
      if (!sxObject) {
        return null;
      }
      const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
      const breakpointsKeys = Object.keys(emptyBreakpoints);
      let css2 = emptyBreakpoints;
      Object.keys(sxObject).forEach((styleKey) => {
        const value = callIfFn(sxObject[styleKey], theme);
        if (value !== null && value !== void 0) {
          if (typeof value === "object") {
            if (config[styleKey]) {
              css2 = merge_default(css2, getThemeValue(styleKey, value, theme, config));
            } else {
              const breakpointsValues = handleBreakpoints({
                theme
              }, value, (x) => ({
                [styleKey]: x
              }));
              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css2[styleKey] = styleFunctionSx2({
                  sx: value,
                  theme
                });
              } else {
                css2 = merge_default(css2, breakpointsValues);
              }
            }
          } else {
            css2 = merge_default(css2, getThemeValue(styleKey, value, theme, config));
          }
        }
      });
      return sortContainerQueries(theme, removeUnusedBreakpoints(breakpointsKeys, css2));
    }
    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }
  return styleFunctionSx2;
}
var styleFunctionSx, styleFunctionSx_default;
var init_styleFunctionSx = __esm({
  "node_modules/@mui/system/styleFunctionSx/styleFunctionSx.js"() {
    init_capitalize2();
    init_merge2();
    init_style2();
    init_breakpoints2();
    init_cssContainerQueries2();
    init_defaultSxConfig();
    styleFunctionSx = unstable_createStyleFunctionSx();
    styleFunctionSx.filterProps = ["sx"];
    styleFunctionSx_default = styleFunctionSx;
  }
});

// node_modules/@mui/system/createTheme/applyStyles.js
function applyStyles(key, styles) {
  var _a;
  const theme = this;
  if (theme.vars) {
    if (!((_a = theme.colorSchemes) == null ? void 0 : _a[key]) || typeof theme.getColorSchemeSelector !== "function") {
      return {};
    }
    let selector = theme.getColorSchemeSelector(key);
    if (selector.includes("data-") || selector.includes(".")) {
      selector = `*:where(${selector.replace(/\s*&$/, "")}) &`;
    }
    return {
      [selector]: styles
    };
  }
  if (theme.palette.mode === key) {
    return styles;
  }
  return {};
}
var init_applyStyles = __esm({
  "node_modules/@mui/system/createTheme/applyStyles.js"() {
  }
});

// node_modules/@mui/system/createTheme/createTheme.js
function createTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {},
    ...other
  } = options;
  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing2 = createSpacing(spacingInput);
  let muiTheme = deepmerge({
    breakpoints,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: {
      mode: "light",
      ...paletteInput
    },
    spacing: spacing2,
    shape: {
      ...shape_default,
      ...shapeInput
    }
  }, other);
  muiTheme = cssContainerQueries(muiTheme);
  muiTheme.applyStyles = applyStyles;
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  muiTheme.unstable_sxConfig = {
    ...defaultSxConfig_default,
    ...other == null ? void 0 : other.unstable_sxConfig
  };
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx_default({
      sx: props,
      theme: this
    });
  };
  return muiTheme;
}
var createTheme_default;
var init_createTheme = __esm({
  "node_modules/@mui/system/createTheme/createTheme.js"() {
    init_deepmerge2();
    init_createBreakpoints();
    init_cssContainerQueries2();
    init_shape();
    init_createSpacing();
    init_styleFunctionSx();
    init_defaultSxConfig();
    init_applyStyles();
    createTheme_default = createTheme;
  }
});

// node_modules/@mui/system/createTheme/index.js
var init_createTheme2 = __esm({
  "node_modules/@mui/system/createTheme/index.js"() {
    init_createTheme();
    init_createBreakpoints();
    init_applyStyles();
  }
});

// node_modules/@mui/system/useThemeWithoutDefault/useThemeWithoutDefault.js
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function useTheme(defaultTheme5 = null) {
  const contextTheme = React4.useContext(ThemeContext);
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme5 : contextTheme;
}
var React4, useThemeWithoutDefault_default;
var init_useThemeWithoutDefault = __esm({
  "node_modules/@mui/system/useThemeWithoutDefault/useThemeWithoutDefault.js"() {
    "use client";
    React4 = __toESM(require_react());
    init_styled_engine();
    useThemeWithoutDefault_default = useTheme;
  }
});

// node_modules/@mui/system/useThemeWithoutDefault/index.js
var init_useThemeWithoutDefault2 = __esm({
  "node_modules/@mui/system/useThemeWithoutDefault/index.js"() {
    "use client";
    init_useThemeWithoutDefault();
  }
});

// node_modules/@mui/system/useTheme/useTheme.js
function useTheme2(defaultTheme5 = systemDefaultTheme) {
  return useThemeWithoutDefault_default(defaultTheme5);
}
var systemDefaultTheme, useTheme_default;
var init_useTheme = __esm({
  "node_modules/@mui/system/useTheme/useTheme.js"() {
    "use client";
    init_createTheme2();
    init_useThemeWithoutDefault2();
    systemDefaultTheme = createTheme_default();
    useTheme_default = useTheme2;
  }
});

// node_modules/@mui/system/useTheme/index.js
var init_useTheme2 = __esm({
  "node_modules/@mui/system/useTheme/index.js"() {
    "use client";
    init_useTheme();
    init_useTheme();
  }
});

// node_modules/@mui/system/useThemeProps/useThemeProps.js
function useThemeProps({
  props,
  name,
  defaultTheme: defaultTheme5,
  themeId
}) {
  let theme = useTheme_default(defaultTheme5);
  if (themeId) {
    theme = theme[themeId] || theme;
  }
  return getThemeProps({
    theme,
    name,
    props
  });
}
var init_useThemeProps = __esm({
  "node_modules/@mui/system/useThemeProps/useThemeProps.js"() {
    "use client";
    init_getThemeProps();
    init_useTheme2();
  }
});

// node_modules/@mui/system/useThemeProps/index.js
var init_useThemeProps2 = __esm({
  "node_modules/@mui/system/useThemeProps/index.js"() {
    "use client";
    init_useThemeProps();
    init_getThemeProps();
  }
});

// node_modules/@mui/system/useMediaQuery/useMediaQuery.js
function useMediaQueryOld(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr) {
  const [match, setMatch] = React5.useState(() => {
    if (noSsr && matchMedia) {
      return matchMedia(query).matches;
    }
    if (ssrMatchMedia) {
      return ssrMatchMedia(query).matches;
    }
    return defaultMatches;
  });
  useEnhancedEffect_default(() => {
    if (!matchMedia) {
      return void 0;
    }
    const queryList = matchMedia(query);
    const updateMatch = () => {
      setMatch(queryList.matches);
    };
    updateMatch();
    queryList.addEventListener("change", updateMatch);
    return () => {
      queryList.removeEventListener("change", updateMatch);
    };
  }, [query, matchMedia]);
  return match;
}
function useMediaQueryNew(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr) {
  const getDefaultSnapshot = React5.useCallback(() => defaultMatches, [defaultMatches]);
  const getServerSnapshot = React5.useMemo(() => {
    if (noSsr && matchMedia) {
      return () => matchMedia(query).matches;
    }
    if (ssrMatchMedia !== null) {
      const {
        matches
      } = ssrMatchMedia(query);
      return () => matches;
    }
    return getDefaultSnapshot;
  }, [getDefaultSnapshot, query, ssrMatchMedia, noSsr, matchMedia]);
  const [getSnapshot, subscribe] = React5.useMemo(() => {
    if (matchMedia === null) {
      return [getDefaultSnapshot, () => () => {
      }];
    }
    const mediaQueryList = matchMedia(query);
    return [() => mediaQueryList.matches, (notify) => {
      mediaQueryList.addEventListener("change", notify);
      return () => {
        mediaQueryList.removeEventListener("change", notify);
      };
    }];
  }, [getDefaultSnapshot, matchMedia, query]);
  const match = maybeReactUseSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return match;
}
function useMediaQuery(queryInput, options = {}) {
  const theme = useThemeWithoutDefault_default();
  const supportMatchMedia = typeof window !== "undefined" && typeof window.matchMedia !== "undefined";
  const {
    defaultMatches = false,
    matchMedia = supportMatchMedia ? window.matchMedia : null,
    ssrMatchMedia = null,
    noSsr = false
  } = getThemeProps({
    name: "MuiUseMediaQuery",
    props: options,
    theme
  });
  if (true) {
    if (typeof queryInput === "function" && theme === null) {
      console.error(["MUI: The `query` argument provided is invalid.", "You are providing a function without a theme in the context.", "One of the parent elements needs to use a ThemeProvider."].join("\n"));
    }
  }
  let query = typeof queryInput === "function" ? queryInput(theme) : queryInput;
  query = query.replace(/^@media( ?)/m, "");
  const useMediaQueryImplementation = maybeReactUseSyncExternalStore !== void 0 ? useMediaQueryNew : useMediaQueryOld;
  const match = useMediaQueryImplementation(query, defaultMatches, matchMedia, ssrMatchMedia, noSsr);
  if (true) {
    React5.useDebugValue({
      query,
      match
    });
  }
  return match;
}
var React5, maybeReactUseSyncExternalStore;
var init_useMediaQuery = __esm({
  "node_modules/@mui/system/useMediaQuery/useMediaQuery.js"() {
    "use client";
    React5 = __toESM(require_react());
    init_useEnhancedEffect2();
    init_useThemeProps2();
    init_useThemeWithoutDefault2();
    maybeReactUseSyncExternalStore = React5["useSyncExternalStore"];
  }
});

// node_modules/@mui/system/useMediaQuery/index.js
var init_useMediaQuery2 = __esm({
  "node_modules/@mui/system/useMediaQuery/index.js"() {
    init_useMediaQuery();
    init_useMediaQuery();
  }
});

// node_modules/@mui/utils/esm/chainPropTypes/chainPropTypes.js
function chainPropTypes(propType1, propType2) {
  if (false) {
    return () => null;
  }
  return function validate(...args) {
    return propType1(...args) || propType2(...args);
  };
}
var init_chainPropTypes = __esm({
  "node_modules/@mui/utils/esm/chainPropTypes/chainPropTypes.js"() {
  }
});

// node_modules/@mui/utils/esm/chainPropTypes/index.js
var init_chainPropTypes2 = __esm({
  "node_modules/@mui/utils/esm/chainPropTypes/index.js"() {
    init_chainPropTypes();
  }
});

// node_modules/@mui/utils/esm/elementAcceptingRef/elementAcceptingRef.js
function isClassComponent(elementType) {
  const {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}
function acceptingRef(props, propName, componentName, location, propFullName) {
  const element = props[propName];
  const safePropName = propFullName || propName;
  if (element == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window === "undefined") {
    return null;
  }
  let warningHint;
  const elementType = element.type;
  if (typeof elementType === "function" && !isClassComponent(elementType)) {
    warningHint = "Did you accidentally use a plain function component for an element instead?";
  }
  if (warningHint !== void 0) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element that can hold a ref. ${warningHint} For more information see https://mui.com/r/caveat-with-refs-guide`);
  }
  return null;
}
var import_prop_types5, elementAcceptingRef, elementAcceptingRef_default;
var init_elementAcceptingRef = __esm({
  "node_modules/@mui/utils/esm/elementAcceptingRef/elementAcceptingRef.js"() {
    import_prop_types5 = __toESM(require_prop_types());
    init_chainPropTypes2();
    elementAcceptingRef = chainPropTypes(import_prop_types5.default.element, acceptingRef);
    elementAcceptingRef.isRequired = chainPropTypes(import_prop_types5.default.element.isRequired, acceptingRef);
    elementAcceptingRef_default = elementAcceptingRef;
  }
});

// node_modules/@mui/utils/esm/elementAcceptingRef/index.js
var init_elementAcceptingRef2 = __esm({
  "node_modules/@mui/utils/esm/elementAcceptingRef/index.js"() {
    init_elementAcceptingRef();
  }
});

// node_modules/@mui/utils/esm/elementTypeAcceptingRef/elementTypeAcceptingRef.js
function isClassComponent2(elementType) {
  const {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}
function elementTypeAcceptingRef(props, propName, componentName, location, propFullName) {
  const propValue = props[propName];
  const safePropName = propFullName || propName;
  if (propValue == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window === "undefined") {
    return null;
  }
  let warningHint;
  if (typeof propValue === "function" && !isClassComponent2(propValue)) {
    warningHint = "Did you accidentally provide a plain function component instead?";
  }
  if (warningHint !== void 0) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element type that can hold a ref. ${warningHint} For more information see https://mui.com/r/caveat-with-refs-guide`);
  }
  return null;
}
var import_prop_types6, elementTypeAcceptingRef_default;
var init_elementTypeAcceptingRef = __esm({
  "node_modules/@mui/utils/esm/elementTypeAcceptingRef/elementTypeAcceptingRef.js"() {
    import_prop_types6 = __toESM(require_prop_types());
    init_chainPropTypes2();
    elementTypeAcceptingRef_default = chainPropTypes(import_prop_types6.default.elementType, elementTypeAcceptingRef);
  }
});

// node_modules/@mui/utils/esm/elementTypeAcceptingRef/index.js
var init_elementTypeAcceptingRef2 = __esm({
  "node_modules/@mui/utils/esm/elementTypeAcceptingRef/index.js"() {
    init_elementTypeAcceptingRef();
  }
});

// node_modules/@mui/utils/esm/exactProp/exactProp.js
function exactProp(propTypes) {
  if (false) {
    return propTypes;
  }
  return {
    ...propTypes,
    [specialProperty]: (props) => {
      const unsupportedProps = Object.keys(props).filter((prop) => !propTypes.hasOwnProperty(prop));
      if (unsupportedProps.length > 0) {
        return new Error(`The following props are not supported: ${unsupportedProps.map((prop) => `\`${prop}\``).join(", ")}. Please remove them.`);
      }
      return null;
    }
  };
}
var specialProperty;
var init_exactProp = __esm({
  "node_modules/@mui/utils/esm/exactProp/exactProp.js"() {
    specialProperty = "exact-prop: ​";
  }
});

// node_modules/@mui/utils/esm/exactProp/index.js
var init_exactProp2 = __esm({
  "node_modules/@mui/utils/esm/exactProp/index.js"() {
    init_exactProp();
  }
});

// node_modules/@mui/utils/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/@mui/utils/node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_SERVER_CONTEXT_TYPE = Symbol.for("react.server_context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_SERVER_CONTEXT_TYPE:
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef2 = REACT_FORWARD_REF_TYPE;
        var Fragment2 = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo2 = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isConcurrentMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
              hasWarnedAboutDeprecatedIsConcurrentMode = true;
              console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        function isSuspenseList(object) {
          return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
        }
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef2;
        exports.Fragment = Fragment2;
        exports.Lazy = Lazy;
        exports.Memo = Memo2;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.SuspenseList = SuspenseList;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isSuspenseList = isSuspenseList;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/@mui/utils/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/@mui/utils/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/@mui/utils/esm/getDisplayName/getDisplayName.js
function getFunctionComponentName(Component, fallback = "") {
  return Component.displayName || Component.name || fallback;
}
function getWrappedName(outerType, innerType, wrapperName) {
  const functionName = getFunctionComponentName(innerType);
  return outerType.displayName || (functionName !== "" ? `${wrapperName}(${functionName})` : wrapperName);
}
function getDisplayName(Component) {
  if (Component == null) {
    return void 0;
  }
  if (typeof Component === "string") {
    return Component;
  }
  if (typeof Component === "function") {
    return getFunctionComponentName(Component, "Component");
  }
  if (typeof Component === "object") {
    switch (Component.$$typeof) {
      case import_react_is.ForwardRef:
        return getWrappedName(Component, Component.render, "ForwardRef");
      case import_react_is.Memo:
        return getWrappedName(Component, Component.type, "memo");
      default:
        return void 0;
    }
  }
  return void 0;
}
var import_react_is;
var init_getDisplayName = __esm({
  "node_modules/@mui/utils/esm/getDisplayName/getDisplayName.js"() {
    import_react_is = __toESM(require_react_is());
  }
});

// node_modules/@mui/utils/esm/getDisplayName/index.js
var init_getDisplayName2 = __esm({
  "node_modules/@mui/utils/esm/getDisplayName/index.js"() {
    init_getDisplayName();
  }
});

// node_modules/@mui/utils/esm/HTMLElementType/HTMLElementType.js
function HTMLElementType(props, propName, componentName, location, propFullName) {
  if (false) {
    return null;
  }
  const propValue = props[propName];
  const safePropName = propFullName || propName;
  if (propValue == null) {
    return null;
  }
  if (propValue && propValue.nodeType !== 1) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an HTMLElement.`);
  }
  return null;
}
var init_HTMLElementType = __esm({
  "node_modules/@mui/utils/esm/HTMLElementType/HTMLElementType.js"() {
  }
});

// node_modules/@mui/utils/esm/HTMLElementType/index.js
var init_HTMLElementType2 = __esm({
  "node_modules/@mui/utils/esm/HTMLElementType/index.js"() {
    init_HTMLElementType();
  }
});

// node_modules/@mui/utils/esm/ponyfillGlobal/ponyfillGlobal.js
var ponyfillGlobal_default;
var init_ponyfillGlobal = __esm({
  "node_modules/@mui/utils/esm/ponyfillGlobal/ponyfillGlobal.js"() {
    ponyfillGlobal_default = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
  }
});

// node_modules/@mui/utils/esm/ponyfillGlobal/index.js
var init_ponyfillGlobal2 = __esm({
  "node_modules/@mui/utils/esm/ponyfillGlobal/index.js"() {
    init_ponyfillGlobal();
  }
});

// node_modules/@mui/utils/esm/refType/refType.js
var import_prop_types7, refType, refType_default;
var init_refType = __esm({
  "node_modules/@mui/utils/esm/refType/refType.js"() {
    import_prop_types7 = __toESM(require_prop_types());
    refType = import_prop_types7.default.oneOfType([import_prop_types7.default.func, import_prop_types7.default.object]);
    refType_default = refType;
  }
});

// node_modules/@mui/utils/esm/refType/index.js
var init_refType2 = __esm({
  "node_modules/@mui/utils/esm/refType/index.js"() {
    init_refType();
  }
});

// node_modules/@mui/utils/esm/createChainedFunction/createChainedFunction.js
function createChainedFunction(...funcs) {
  return funcs.reduce((acc, func) => {
    if (func == null) {
      return acc;
    }
    return function chainedFunction(...args) {
      acc.apply(this, args);
      func.apply(this, args);
    };
  }, () => {
  });
}
var init_createChainedFunction = __esm({
  "node_modules/@mui/utils/esm/createChainedFunction/createChainedFunction.js"() {
  }
});

// node_modules/@mui/utils/esm/createChainedFunction/index.js
var init_createChainedFunction2 = __esm({
  "node_modules/@mui/utils/esm/createChainedFunction/index.js"() {
    init_createChainedFunction();
  }
});

// node_modules/@mui/utils/esm/debounce/debounce.js
function debounce(func, wait = 166) {
  let timeout;
  function debounced(...args) {
    const later = () => {
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  debounced.clear = () => {
    clearTimeout(timeout);
  };
  return debounced;
}
var init_debounce = __esm({
  "node_modules/@mui/utils/esm/debounce/debounce.js"() {
  }
});

// node_modules/@mui/utils/esm/debounce/index.js
var init_debounce2 = __esm({
  "node_modules/@mui/utils/esm/debounce/index.js"() {
    init_debounce();
    init_debounce();
  }
});

// node_modules/@mui/utils/esm/deprecatedPropType/deprecatedPropType.js
function deprecatedPropType(validator2, reason) {
  if (false) {
    return () => null;
  }
  return (props, propName, componentName, location, propFullName) => {
    const componentNameSafe = componentName || "<<anonymous>>";
    const propFullNameSafe = propFullName || propName;
    if (typeof props[propName] !== "undefined") {
      return new Error(`The ${location} \`${propFullNameSafe}\` of \`${componentNameSafe}\` is deprecated. ${reason}`);
    }
    return null;
  };
}
var init_deprecatedPropType = __esm({
  "node_modules/@mui/utils/esm/deprecatedPropType/deprecatedPropType.js"() {
  }
});

// node_modules/@mui/utils/esm/deprecatedPropType/index.js
var init_deprecatedPropType2 = __esm({
  "node_modules/@mui/utils/esm/deprecatedPropType/index.js"() {
    init_deprecatedPropType();
  }
});

// node_modules/@mui/utils/esm/isMuiElement/isMuiElement.js
function isMuiElement(element, muiNames) {
  var _a, _b, _c;
  return React6.isValidElement(element) && muiNames.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    element.type.muiName ?? ((_c = (_b = (_a = element.type) == null ? void 0 : _a._payload) == null ? void 0 : _b.value) == null ? void 0 : _c.muiName)
  ) !== -1;
}
var React6;
var init_isMuiElement = __esm({
  "node_modules/@mui/utils/esm/isMuiElement/isMuiElement.js"() {
    React6 = __toESM(require_react());
  }
});

// node_modules/@mui/utils/esm/isMuiElement/index.js
var init_isMuiElement2 = __esm({
  "node_modules/@mui/utils/esm/isMuiElement/index.js"() {
    init_isMuiElement();
  }
});

// node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}
var init_ownerDocument = __esm({
  "node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js"() {
  }
});

// node_modules/@mui/utils/esm/ownerDocument/index.js
var init_ownerDocument2 = __esm({
  "node_modules/@mui/utils/esm/ownerDocument/index.js"() {
    init_ownerDocument();
  }
});

// node_modules/@mui/utils/esm/ownerWindow/ownerWindow.js
function ownerWindow(node) {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}
var init_ownerWindow = __esm({
  "node_modules/@mui/utils/esm/ownerWindow/ownerWindow.js"() {
    init_ownerDocument2();
  }
});

// node_modules/@mui/utils/esm/ownerWindow/index.js
var init_ownerWindow2 = __esm({
  "node_modules/@mui/utils/esm/ownerWindow/index.js"() {
    init_ownerWindow();
  }
});

// node_modules/@mui/utils/esm/requirePropFactory/requirePropFactory.js
function requirePropFactory(componentNameInError, Component) {
  if (false) {
    return () => null;
  }
  const prevPropTypes = Component ? {
    ...Component.propTypes
  } : null;
  const requireProp = (requiredProp) => (props, propName, componentName, location, propFullName, ...args) => {
    const propFullNameSafe = propFullName || propName;
    const defaultTypeChecker = prevPropTypes == null ? void 0 : prevPropTypes[propFullNameSafe];
    if (defaultTypeChecker) {
      const typeCheckerResult = defaultTypeChecker(props, propName, componentName, location, propFullName, ...args);
      if (typeCheckerResult) {
        return typeCheckerResult;
      }
    }
    if (typeof props[propName] !== "undefined" && !props[requiredProp]) {
      return new Error(`The prop \`${propFullNameSafe}\` of \`${componentNameInError}\` can only be used together with the \`${requiredProp}\` prop.`);
    }
    return null;
  };
  return requireProp;
}
var init_requirePropFactory = __esm({
  "node_modules/@mui/utils/esm/requirePropFactory/requirePropFactory.js"() {
  }
});

// node_modules/@mui/utils/esm/requirePropFactory/index.js
var init_requirePropFactory2 = __esm({
  "node_modules/@mui/utils/esm/requirePropFactory/index.js"() {
    init_requirePropFactory();
  }
});

// node_modules/@mui/utils/esm/setRef/setRef.js
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
var init_setRef = __esm({
  "node_modules/@mui/utils/esm/setRef/setRef.js"() {
  }
});

// node_modules/@mui/utils/esm/setRef/index.js
var init_setRef2 = __esm({
  "node_modules/@mui/utils/esm/setRef/index.js"() {
    init_setRef();
  }
});

// node_modules/@mui/utils/esm/useId/useId.js
function useGlobalId(idOverride) {
  const [defaultId, setDefaultId] = React7.useState(idOverride);
  const id = idOverride || defaultId;
  React7.useEffect(() => {
    if (defaultId == null) {
      globalId += 1;
      setDefaultId(`mui-${globalId}`);
    }
  }, [defaultId]);
  return id;
}
function useId(idOverride) {
  if (maybeReactUseId !== void 0) {
    const reactId = maybeReactUseId();
    return idOverride ?? reactId;
  }
  return useGlobalId(idOverride);
}
var React7, globalId, maybeReactUseId;
var init_useId = __esm({
  "node_modules/@mui/utils/esm/useId/useId.js"() {
    "use client";
    React7 = __toESM(require_react());
    globalId = 0;
    maybeReactUseId = React7["useId".toString()];
  }
});

// node_modules/@mui/utils/esm/useId/index.js
var init_useId2 = __esm({
  "node_modules/@mui/utils/esm/useId/index.js"() {
    init_useId();
  }
});

// node_modules/@mui/utils/esm/unsupportedProp/unsupportedProp.js
function unsupportedProp(props, propName, componentName, location, propFullName) {
  if (false) {
    return null;
  }
  const propFullNameSafe = propFullName || propName;
  if (typeof props[propName] !== "undefined") {
    return new Error(`The prop \`${propFullNameSafe}\` is not supported. Please remove it.`);
  }
  return null;
}
var init_unsupportedProp = __esm({
  "node_modules/@mui/utils/esm/unsupportedProp/unsupportedProp.js"() {
  }
});

// node_modules/@mui/utils/esm/unsupportedProp/index.js
var init_unsupportedProp2 = __esm({
  "node_modules/@mui/utils/esm/unsupportedProp/index.js"() {
    init_unsupportedProp();
  }
});

// node_modules/@mui/utils/esm/useControlled/useControlled.js
function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = "value"
}) {
  const {
    current: isControlled
  } = React8.useRef(controlled !== void 0);
  const [valueState, setValue] = React8.useState(defaultProp);
  const value = isControlled ? controlled : valueState;
  if (true) {
    React8.useEffect(() => {
      if (isControlled !== (controlled !== void 0)) {
        console.error([`MUI: A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join("\n"));
      }
    }, [state, name, controlled]);
    const {
      current: defaultValue
    } = React8.useRef(defaultProp);
    React8.useEffect(() => {
      if (!isControlled && !Object.is(defaultValue, defaultProp)) {
        console.error([`MUI: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. To suppress this warning opt to use a controlled ${name}.`].join("\n"));
      }
    }, [JSON.stringify(defaultProp)]);
  }
  const setValueIfUncontrolled = React8.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}
var React8;
var init_useControlled = __esm({
  "node_modules/@mui/utils/esm/useControlled/useControlled.js"() {
    "use client";
    React8 = __toESM(require_react());
  }
});

// node_modules/@mui/utils/esm/useControlled/index.js
var init_useControlled2 = __esm({
  "node_modules/@mui/utils/esm/useControlled/index.js"() {
    init_useControlled();
  }
});

// node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js
function useEventCallback(fn) {
  const ref = React9.useRef(fn);
  useEnhancedEffect_default(() => {
    ref.current = fn;
  });
  return React9.useRef((...args) => (
    // @ts-expect-error hide `this`
    (0, ref.current)(...args)
  )).current;
}
var React9, useEventCallback_default;
var init_useEventCallback = __esm({
  "node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js"() {
    "use client";
    React9 = __toESM(require_react());
    init_useEnhancedEffect2();
    useEventCallback_default = useEventCallback;
  }
});

// node_modules/@mui/utils/esm/useEventCallback/index.js
var init_useEventCallback2 = __esm({
  "node_modules/@mui/utils/esm/useEventCallback/index.js"() {
    init_useEventCallback();
  }
});

// node_modules/@mui/utils/esm/useForkRef/useForkRef.js
function useForkRef(...refs) {
  return React10.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (instance) => {
      refs.forEach((ref) => {
        setRef(ref, instance);
      });
    };
  }, refs);
}
var React10;
var init_useForkRef = __esm({
  "node_modules/@mui/utils/esm/useForkRef/useForkRef.js"() {
    "use client";
    React10 = __toESM(require_react());
    init_setRef2();
  }
});

// node_modules/@mui/utils/esm/useForkRef/index.js
var init_useForkRef2 = __esm({
  "node_modules/@mui/utils/esm/useForkRef/index.js"() {
    init_useForkRef();
  }
});

// node_modules/@mui/utils/esm/useLazyRef/useLazyRef.js
function useLazyRef(init, initArg) {
  const ref = React11.useRef(UNINITIALIZED);
  if (ref.current === UNINITIALIZED) {
    ref.current = init(initArg);
  }
  return ref;
}
var React11, UNINITIALIZED;
var init_useLazyRef = __esm({
  "node_modules/@mui/utils/esm/useLazyRef/useLazyRef.js"() {
    "use client";
    React11 = __toESM(require_react());
    UNINITIALIZED = {};
  }
});

// node_modules/@mui/utils/esm/useLazyRef/index.js
var init_useLazyRef2 = __esm({
  "node_modules/@mui/utils/esm/useLazyRef/index.js"() {
    init_useLazyRef();
  }
});

// node_modules/@mui/utils/esm/useOnMount/useOnMount.js
function useOnMount(fn) {
  React12.useEffect(fn, EMPTY);
}
var React12, EMPTY;
var init_useOnMount = __esm({
  "node_modules/@mui/utils/esm/useOnMount/useOnMount.js"() {
    "use client";
    React12 = __toESM(require_react());
    EMPTY = [];
  }
});

// node_modules/@mui/utils/esm/useTimeout/useTimeout.js
function useTimeout() {
  const timeout = useLazyRef(Timeout.create).current;
  useOnMount(timeout.disposeEffect);
  return timeout;
}
var Timeout;
var init_useTimeout = __esm({
  "node_modules/@mui/utils/esm/useTimeout/useTimeout.js"() {
    "use client";
    init_useLazyRef();
    init_useOnMount();
    Timeout = class _Timeout {
      constructor() {
        __publicField(this, "currentId", null);
        __publicField(this, "clear", () => {
          if (this.currentId !== null) {
            clearTimeout(this.currentId);
            this.currentId = null;
          }
        });
        __publicField(this, "disposeEffect", () => {
          return this.clear;
        });
      }
      static create() {
        return new _Timeout();
      }
      /**
       * Executes `fn` after `delay`, clearing any previously scheduled call.
       */
      start(delay, fn) {
        this.clear();
        this.currentId = setTimeout(() => {
          this.currentId = null;
          fn();
        }, delay);
      }
    };
  }
});

// node_modules/@mui/utils/esm/useTimeout/index.js
var init_useTimeout2 = __esm({
  "node_modules/@mui/utils/esm/useTimeout/index.js"() {
    init_useTimeout();
    init_useTimeout();
  }
});

// node_modules/@mui/utils/esm/useOnMount/index.js
var init_useOnMount2 = __esm({
  "node_modules/@mui/utils/esm/useOnMount/index.js"() {
    init_useOnMount();
  }
});

// node_modules/@mui/utils/esm/isFocusVisible/isFocusVisible.js
function isFocusVisible(element) {
  try {
    return element.matches(":focus-visible");
  } catch (error) {
    if (!/jsdom/.test(window.navigator.userAgent)) {
      console.warn(["MUI: The `:focus-visible` pseudo class is not supported in this browser.", "Some components rely on this feature to work properly."].join("\n"));
    }
  }
  return false;
}
var init_isFocusVisible = __esm({
  "node_modules/@mui/utils/esm/isFocusVisible/isFocusVisible.js"() {
  }
});

// node_modules/@mui/utils/esm/isFocusVisible/index.js
var init_isFocusVisible2 = __esm({
  "node_modules/@mui/utils/esm/isFocusVisible/index.js"() {
    init_isFocusVisible();
  }
});

// node_modules/@mui/utils/esm/getScrollbarSize/getScrollbarSize.js
function getScrollbarSize(doc) {
  const documentWidth = doc.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}
var init_getScrollbarSize = __esm({
  "node_modules/@mui/utils/esm/getScrollbarSize/getScrollbarSize.js"() {
  }
});

// node_modules/@mui/utils/esm/getScrollbarSize/index.js
var init_getScrollbarSize2 = __esm({
  "node_modules/@mui/utils/esm/getScrollbarSize/index.js"() {
    init_getScrollbarSize();
  }
});

// node_modules/@mui/utils/esm/usePreviousProps/usePreviousProps.js
var React13, usePreviousProps, usePreviousProps_default;
var init_usePreviousProps = __esm({
  "node_modules/@mui/utils/esm/usePreviousProps/usePreviousProps.js"() {
    "use client";
    React13 = __toESM(require_react());
    usePreviousProps = (value) => {
      const ref = React13.useRef({});
      React13.useEffect(() => {
        ref.current = value;
      });
      return ref.current;
    };
    usePreviousProps_default = usePreviousProps;
  }
});

// node_modules/@mui/utils/esm/usePreviousProps/index.js
var init_usePreviousProps2 = __esm({
  "node_modules/@mui/utils/esm/usePreviousProps/index.js"() {
    init_usePreviousProps();
  }
});

// node_modules/@mui/utils/esm/getValidReactChildren/getValidReactChildren.js
function getValidReactChildren(children) {
  return React14.Children.toArray(children).filter((child) => React14.isValidElement(child));
}
var React14;
var init_getValidReactChildren = __esm({
  "node_modules/@mui/utils/esm/getValidReactChildren/getValidReactChildren.js"() {
    React14 = __toESM(require_react());
  }
});

// node_modules/@mui/utils/esm/getValidReactChildren/index.js
var init_getValidReactChildren2 = __esm({
  "node_modules/@mui/utils/esm/getValidReactChildren/index.js"() {
    init_getValidReactChildren();
  }
});

// node_modules/@mui/utils/esm/visuallyHidden/visuallyHidden.js
var visuallyHidden, visuallyHidden_default;
var init_visuallyHidden = __esm({
  "node_modules/@mui/utils/esm/visuallyHidden/visuallyHidden.js"() {
    visuallyHidden = {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px"
    };
    visuallyHidden_default = visuallyHidden;
  }
});

// node_modules/@mui/utils/esm/visuallyHidden/index.js
var init_visuallyHidden2 = __esm({
  "node_modules/@mui/utils/esm/visuallyHidden/index.js"() {
    init_visuallyHidden();
  }
});

// node_modules/@mui/utils/esm/integerPropType/integerPropType.js
function getTypeByValue(value) {
  const valueType = typeof value;
  switch (valueType) {
    case "number":
      if (Number.isNaN(value)) {
        return "NaN";
      }
      if (!Number.isFinite(value)) {
        return "Infinity";
      }
      if (value !== Math.floor(value)) {
        return "float";
      }
      return "number";
    case "object":
      if (value === null) {
        return "null";
      }
      return value.constructor.name;
    default:
      return valueType;
  }
}
function requiredInteger(props, propName, componentName, location) {
  const propValue = props[propName];
  if (propValue == null || !Number.isInteger(propValue)) {
    const propType = getTypeByValue(propValue);
    return new RangeError(`Invalid ${location} \`${propName}\` of type \`${propType}\` supplied to \`${componentName}\`, expected \`integer\`.`);
  }
  return null;
}
function validator(props, propName, ...other) {
  const propValue = props[propName];
  if (propValue === void 0) {
    return null;
  }
  return requiredInteger(props, propName, ...other);
}
function validatorNoop() {
  return null;
}
var integerPropType_default;
var init_integerPropType = __esm({
  "node_modules/@mui/utils/esm/integerPropType/integerPropType.js"() {
    validator.isRequired = requiredInteger;
    validatorNoop.isRequired = validatorNoop;
    integerPropType_default = false ? validatorNoop : validator;
  }
});

// node_modules/@mui/utils/esm/integerPropType/index.js
var init_integerPropType2 = __esm({
  "node_modules/@mui/utils/esm/integerPropType/index.js"() {
    init_integerPropType();
    init_integerPropType();
  }
});

// node_modules/@mui/utils/esm/isHostComponent/isHostComponent.js
function isHostComponent(element) {
  return typeof element === "string";
}
var isHostComponent_default;
var init_isHostComponent = __esm({
  "node_modules/@mui/utils/esm/isHostComponent/isHostComponent.js"() {
    isHostComponent_default = isHostComponent;
  }
});

// node_modules/@mui/utils/esm/isHostComponent/index.js
var init_isHostComponent2 = __esm({
  "node_modules/@mui/utils/esm/isHostComponent/index.js"() {
    init_isHostComponent();
  }
});

// node_modules/@mui/utils/esm/appendOwnerState/appendOwnerState.js
function appendOwnerState(elementType, otherProps, ownerState) {
  if (elementType === void 0 || isHostComponent_default(elementType)) {
    return otherProps;
  }
  return {
    ...otherProps,
    ownerState: {
      ...otherProps.ownerState,
      ...ownerState
    }
  };
}
var appendOwnerState_default;
var init_appendOwnerState = __esm({
  "node_modules/@mui/utils/esm/appendOwnerState/appendOwnerState.js"() {
    init_isHostComponent2();
    appendOwnerState_default = appendOwnerState;
  }
});

// node_modules/@mui/utils/esm/appendOwnerState/index.js
var init_appendOwnerState2 = __esm({
  "node_modules/@mui/utils/esm/appendOwnerState/index.js"() {
    init_appendOwnerState();
  }
});

// node_modules/@mui/utils/node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default;
var init_clsx = __esm({
  "node_modules/@mui/utils/node_modules/clsx/dist/clsx.mjs"() {
    clsx_default = clsx;
  }
});

// node_modules/@mui/utils/esm/extractEventHandlers/extractEventHandlers.js
function extractEventHandlers(object, excludeKeys = []) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => prop.match(/^on[A-Z]/) && typeof object[prop] === "function" && !excludeKeys.includes(prop)).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}
var extractEventHandlers_default;
var init_extractEventHandlers = __esm({
  "node_modules/@mui/utils/esm/extractEventHandlers/extractEventHandlers.js"() {
    extractEventHandlers_default = extractEventHandlers;
  }
});

// node_modules/@mui/utils/esm/extractEventHandlers/index.js
var init_extractEventHandlers2 = __esm({
  "node_modules/@mui/utils/esm/extractEventHandlers/index.js"() {
    init_extractEventHandlers();
  }
});

// node_modules/@mui/utils/esm/omitEventHandlers/omitEventHandlers.js
function omitEventHandlers(object) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === "function")).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}
var omitEventHandlers_default;
var init_omitEventHandlers = __esm({
  "node_modules/@mui/utils/esm/omitEventHandlers/omitEventHandlers.js"() {
    omitEventHandlers_default = omitEventHandlers;
  }
});

// node_modules/@mui/utils/esm/omitEventHandlers/index.js
var init_omitEventHandlers2 = __esm({
  "node_modules/@mui/utils/esm/omitEventHandlers/index.js"() {
    init_omitEventHandlers();
  }
});

// node_modules/@mui/utils/esm/mergeSlotProps/mergeSlotProps.js
function mergeSlotProps(parameters) {
  const {
    getSlotProps,
    additionalProps,
    externalSlotProps,
    externalForwardedProps,
    className
  } = parameters;
  if (!getSlotProps) {
    const joinedClasses2 = clsx_default(additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
    const mergedStyle2 = {
      ...additionalProps == null ? void 0 : additionalProps.style,
      ...externalForwardedProps == null ? void 0 : externalForwardedProps.style,
      ...externalSlotProps == null ? void 0 : externalSlotProps.style
    };
    const props2 = {
      ...additionalProps,
      ...externalForwardedProps,
      ...externalSlotProps
    };
    if (joinedClasses2.length > 0) {
      props2.className = joinedClasses2;
    }
    if (Object.keys(mergedStyle2).length > 0) {
      props2.style = mergedStyle2;
    }
    return {
      props: props2,
      internalRef: void 0
    };
  }
  const eventHandlers = extractEventHandlers_default({
    ...externalForwardedProps,
    ...externalSlotProps
  });
  const componentsPropsWithoutEventHandlers = omitEventHandlers_default(externalSlotProps);
  const otherPropsWithoutEventHandlers = omitEventHandlers_default(externalForwardedProps);
  const internalSlotProps = getSlotProps(eventHandlers);
  const joinedClasses = clsx_default(internalSlotProps == null ? void 0 : internalSlotProps.className, additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
  const mergedStyle = {
    ...internalSlotProps == null ? void 0 : internalSlotProps.style,
    ...additionalProps == null ? void 0 : additionalProps.style,
    ...externalForwardedProps == null ? void 0 : externalForwardedProps.style,
    ...externalSlotProps == null ? void 0 : externalSlotProps.style
  };
  const props = {
    ...internalSlotProps,
    ...additionalProps,
    ...otherPropsWithoutEventHandlers,
    ...componentsPropsWithoutEventHandlers
  };
  if (joinedClasses.length > 0) {
    props.className = joinedClasses;
  }
  if (Object.keys(mergedStyle).length > 0) {
    props.style = mergedStyle;
  }
  return {
    props,
    internalRef: internalSlotProps.ref
  };
}
var mergeSlotProps_default;
var init_mergeSlotProps = __esm({
  "node_modules/@mui/utils/esm/mergeSlotProps/mergeSlotProps.js"() {
    init_clsx();
    init_extractEventHandlers2();
    init_omitEventHandlers2();
    mergeSlotProps_default = mergeSlotProps;
  }
});

// node_modules/@mui/utils/esm/mergeSlotProps/index.js
var init_mergeSlotProps2 = __esm({
  "node_modules/@mui/utils/esm/mergeSlotProps/index.js"() {
    init_mergeSlotProps();
  }
});

// node_modules/@mui/utils/esm/resolveComponentProps/resolveComponentProps.js
function resolveComponentProps(componentProps, ownerState, slotState) {
  if (typeof componentProps === "function") {
    return componentProps(ownerState, slotState);
  }
  return componentProps;
}
var resolveComponentProps_default;
var init_resolveComponentProps = __esm({
  "node_modules/@mui/utils/esm/resolveComponentProps/resolveComponentProps.js"() {
    resolveComponentProps_default = resolveComponentProps;
  }
});

// node_modules/@mui/utils/esm/resolveComponentProps/index.js
var init_resolveComponentProps2 = __esm({
  "node_modules/@mui/utils/esm/resolveComponentProps/index.js"() {
    init_resolveComponentProps();
  }
});

// node_modules/@mui/utils/esm/useSlotProps/useSlotProps.js
function useSlotProps(parameters) {
  var _a;
  const {
    elementType,
    externalSlotProps,
    ownerState,
    skipResolvingSlotProps = false,
    ...other
  } = parameters;
  const resolvedComponentsProps = skipResolvingSlotProps ? {} : resolveComponentProps_default(externalSlotProps, ownerState);
  const {
    props: mergedProps,
    internalRef
  } = mergeSlotProps_default({
    ...other,
    externalSlotProps: resolvedComponentsProps
  });
  const ref = useForkRef(internalRef, resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, (_a = parameters.additionalProps) == null ? void 0 : _a.ref);
  const props = appendOwnerState_default(elementType, {
    ...mergedProps,
    ref
  }, ownerState);
  return props;
}
var useSlotProps_default;
var init_useSlotProps = __esm({
  "node_modules/@mui/utils/esm/useSlotProps/useSlotProps.js"() {
    "use client";
    init_useForkRef2();
    init_appendOwnerState2();
    init_mergeSlotProps2();
    init_resolveComponentProps2();
    useSlotProps_default = useSlotProps;
  }
});

// node_modules/@mui/utils/esm/useSlotProps/index.js
var init_useSlotProps2 = __esm({
  "node_modules/@mui/utils/esm/useSlotProps/index.js"() {
    init_useSlotProps();
  }
});

// node_modules/@mui/utils/esm/getReactNodeRef/getReactNodeRef.js
function getReactNodeRef(element) {
  if (!element || !React15.isValidElement(element)) {
    return null;
  }
  return element.props.propertyIsEnumerable("ref") ? element.props.ref : (
    // @ts-expect-error element.ref is not included in the ReactElement type
    // We cannot check for it, but isValidElement is true at this point
    // https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/70189
    element.ref
  );
}
var React15;
var init_getReactNodeRef = __esm({
  "node_modules/@mui/utils/esm/getReactNodeRef/getReactNodeRef.js"() {
    React15 = __toESM(require_react());
  }
});

// node_modules/@mui/utils/esm/getReactNodeRef/index.js
var init_getReactNodeRef2 = __esm({
  "node_modules/@mui/utils/esm/getReactNodeRef/index.js"() {
    init_getReactNodeRef();
  }
});

// node_modules/@mui/utils/esm/types.js
var init_types = __esm({
  "node_modules/@mui/utils/esm/types.js"() {
  }
});

// node_modules/@mui/utils/esm/index.js
var init_esm = __esm({
  "node_modules/@mui/utils/esm/index.js"() {
    init_chainPropTypes2();
    init_deepmerge2();
    init_deepmerge2();
    init_elementAcceptingRef2();
    init_elementTypeAcceptingRef2();
    init_exactProp2();
    init_formatMuiErrorMessage2();
    init_getDisplayName2();
    init_HTMLElementType2();
    init_ponyfillGlobal2();
    init_refType2();
    init_capitalize2();
    init_createChainedFunction2();
    init_debounce2();
    init_deprecatedPropType2();
    init_isMuiElement2();
    init_ownerDocument2();
    init_ownerWindow2();
    init_requirePropFactory2();
    init_setRef2();
    init_useEnhancedEffect2();
    init_useId2();
    init_unsupportedProp2();
    init_useControlled2();
    init_useEventCallback2();
    init_useForkRef2();
    init_useLazyRef2();
    init_useTimeout2();
    init_useOnMount2();
    init_isFocusVisible2();
    init_getScrollbarSize2();
    init_usePreviousProps2();
    init_getValidReactChildren2();
    init_visuallyHidden2();
    init_integerPropType2();
    init_resolveProps2();
    init_composeClasses2();
    init_generateUtilityClass2();
    init_generateUtilityClass2();
    init_generateUtilityClass2();
    init_generateUtilityClasses2();
    init_ClassNameGenerator2();
    init_clamp2();
    init_useSlotProps2();
    init_resolveComponentProps2();
    init_extractEventHandlers2();
    init_getReactNodeRef2();
    init_types();
  }
});

// node_modules/@mui/system/GlobalStyles/GlobalStyles.js
function GlobalStyles2({
  styles,
  themeId,
  defaultTheme: defaultTheme5 = {}
}) {
  const upperTheme = useTheme_default(defaultTheme5);
  const globalStyles = typeof styles === "function" ? styles(themeId ? upperTheme[themeId] || upperTheme : upperTheme) : styles;
  return (0, import_jsx_runtime3.jsx)(GlobalStyles, {
    styles: globalStyles
  });
}
var React16, import_prop_types8, import_jsx_runtime3, GlobalStyles_default;
var init_GlobalStyles3 = __esm({
  "node_modules/@mui/system/GlobalStyles/GlobalStyles.js"() {
    "use client";
    React16 = __toESM(require_react());
    import_prop_types8 = __toESM(require_prop_types());
    init_styled_engine();
    init_useTheme2();
    import_jsx_runtime3 = __toESM(require_jsx_runtime());
    true ? GlobalStyles2.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * @ignore
       */
      defaultTheme: import_prop_types8.default.object,
      /**
       * @ignore
       */
      styles: import_prop_types8.default.oneOfType([import_prop_types8.default.array, import_prop_types8.default.func, import_prop_types8.default.number, import_prop_types8.default.object, import_prop_types8.default.string, import_prop_types8.default.bool]),
      /**
       * @ignore
       */
      themeId: import_prop_types8.default.string
    } : void 0;
    GlobalStyles_default = GlobalStyles2;
  }
});

// node_modules/@mui/system/GlobalStyles/index.js
var init_GlobalStyles4 = __esm({
  "node_modules/@mui/system/GlobalStyles/index.js"() {
    "use client";
    init_GlobalStyles3();
    init_GlobalStyles3();
  }
});

// node_modules/@mui/system/display/display.js
var displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace, display_default;
var init_display = __esm({
  "node_modules/@mui/system/display/display.js"() {
    init_style2();
    init_compose2();
    displayPrint = style_default({
      prop: "displayPrint",
      cssProperty: false,
      transform: (value) => ({
        "@media print": {
          display: value
        }
      })
    });
    displayRaw = style_default({
      prop: "display"
    });
    overflow = style_default({
      prop: "overflow"
    });
    textOverflow = style_default({
      prop: "textOverflow"
    });
    visibility = style_default({
      prop: "visibility"
    });
    whiteSpace = style_default({
      prop: "whiteSpace"
    });
    display_default = compose_default(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace);
  }
});

// node_modules/@mui/system/display/index.js
var init_display2 = __esm({
  "node_modules/@mui/system/display/index.js"() {
    "use client";
    init_display();
    init_display();
  }
});

// node_modules/@mui/system/flexbox/flexbox.js
var flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf, flexbox, flexbox_default;
var init_flexbox = __esm({
  "node_modules/@mui/system/flexbox/flexbox.js"() {
    init_style2();
    init_compose2();
    flexBasis = style_default({
      prop: "flexBasis"
    });
    flexDirection = style_default({
      prop: "flexDirection"
    });
    flexWrap = style_default({
      prop: "flexWrap"
    });
    justifyContent = style_default({
      prop: "justifyContent"
    });
    alignItems = style_default({
      prop: "alignItems"
    });
    alignContent = style_default({
      prop: "alignContent"
    });
    order = style_default({
      prop: "order"
    });
    flex = style_default({
      prop: "flex"
    });
    flexGrow = style_default({
      prop: "flexGrow"
    });
    flexShrink = style_default({
      prop: "flexShrink"
    });
    alignSelf = style_default({
      prop: "alignSelf"
    });
    justifyItems = style_default({
      prop: "justifyItems"
    });
    justifySelf = style_default({
      prop: "justifySelf"
    });
    flexbox = compose_default(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
    flexbox_default = flexbox;
  }
});

// node_modules/@mui/system/flexbox/index.js
var init_flexbox2 = __esm({
  "node_modules/@mui/system/flexbox/index.js"() {
    "use client";
    init_flexbox();
    init_flexbox();
  }
});

// node_modules/@mui/system/positions/positions.js
var position, zIndex, top, right, bottom, left, positions_default;
var init_positions = __esm({
  "node_modules/@mui/system/positions/positions.js"() {
    init_style2();
    init_compose2();
    position = style_default({
      prop: "position"
    });
    zIndex = style_default({
      prop: "zIndex",
      themeKey: "zIndex"
    });
    top = style_default({
      prop: "top"
    });
    right = style_default({
      prop: "right"
    });
    bottom = style_default({
      prop: "bottom"
    });
    left = style_default({
      prop: "left"
    });
    positions_default = compose_default(position, zIndex, top, right, bottom, left);
  }
});

// node_modules/@mui/system/positions/index.js
var init_positions2 = __esm({
  "node_modules/@mui/system/positions/index.js"() {
    "use client";
    init_positions();
    init_positions();
  }
});

// node_modules/@mui/system/shadows/shadows.js
var boxShadow, shadows_default;
var init_shadows = __esm({
  "node_modules/@mui/system/shadows/shadows.js"() {
    init_style2();
    boxShadow = style_default({
      prop: "boxShadow",
      themeKey: "shadows"
    });
    shadows_default = boxShadow;
  }
});

// node_modules/@mui/system/shadows/index.js
var init_shadows2 = __esm({
  "node_modules/@mui/system/shadows/index.js"() {
    "use client";
    init_shadows();
  }
});

// node_modules/@mui/system/typography/typography.js
var fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, textTransform, lineHeight, textAlign, typographyVariant, typography, typography_default;
var init_typography = __esm({
  "node_modules/@mui/system/typography/typography.js"() {
    init_style2();
    init_compose2();
    fontFamily = style_default({
      prop: "fontFamily",
      themeKey: "typography"
    });
    fontSize = style_default({
      prop: "fontSize",
      themeKey: "typography"
    });
    fontStyle = style_default({
      prop: "fontStyle",
      themeKey: "typography"
    });
    fontWeight = style_default({
      prop: "fontWeight",
      themeKey: "typography"
    });
    letterSpacing = style_default({
      prop: "letterSpacing"
    });
    textTransform = style_default({
      prop: "textTransform"
    });
    lineHeight = style_default({
      prop: "lineHeight"
    });
    textAlign = style_default({
      prop: "textAlign"
    });
    typographyVariant = style_default({
      prop: "typography",
      cssProperty: false,
      themeKey: "typography"
    });
    typography = compose_default(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign, textTransform);
    typography_default = typography;
  }
});

// node_modules/@mui/system/typography/index.js
var init_typography2 = __esm({
  "node_modules/@mui/system/typography/index.js"() {
    "use client";
    init_typography();
    init_typography();
  }
});

// node_modules/@mui/system/styleFunctionSx/extendSxProp.js
function extendSxProp(props) {
  const {
    sx: inSx,
    ...other
  } = props;
  const {
    systemProps,
    otherProps
  } = splitProps(other);
  let finalSx;
  if (Array.isArray(inSx)) {
    finalSx = [systemProps, ...inSx];
  } else if (typeof inSx === "function") {
    finalSx = (...args) => {
      const result = inSx(...args);
      if (!isPlainObject(result)) {
        return systemProps;
      }
      return {
        ...systemProps,
        ...result
      };
    };
  } else {
    finalSx = {
      ...systemProps,
      ...inSx
    };
  }
  return {
    ...otherProps,
    sx: finalSx
  };
}
var splitProps;
var init_extendSxProp = __esm({
  "node_modules/@mui/system/styleFunctionSx/extendSxProp.js"() {
    init_deepmerge2();
    init_defaultSxConfig();
    splitProps = (props) => {
      var _a;
      const result = {
        systemProps: {},
        otherProps: {}
      };
      const config = ((_a = props == null ? void 0 : props.theme) == null ? void 0 : _a.unstable_sxConfig) ?? defaultSxConfig_default;
      Object.keys(props).forEach((prop) => {
        if (config[prop]) {
          result.systemProps[prop] = props[prop];
        } else {
          result.otherProps[prop] = props[prop];
        }
      });
      return result;
    };
  }
});

// node_modules/@mui/system/styleFunctionSx/index.js
var init_styleFunctionSx2 = __esm({
  "node_modules/@mui/system/styleFunctionSx/index.js"() {
    init_styleFunctionSx();
    init_styleFunctionSx();
    init_extendSxProp();
    init_defaultSxConfig();
  }
});

// node_modules/@mui/system/getThemeValue/getThemeValue.js
var filterPropsMapping, styleFunctionMapping, propToStyleFunction;
var init_getThemeValue = __esm({
  "node_modules/@mui/system/getThemeValue/getThemeValue.js"() {
    init_borders2();
    init_display2();
    init_flexbox2();
    init_cssGrid2();
    init_positions2();
    init_palette2();
    init_shadows2();
    init_sizing2();
    init_spacing2();
    init_typography2();
    filterPropsMapping = {
      borders: borders_default.filterProps,
      display: display_default.filterProps,
      flexbox: flexbox_default.filterProps,
      grid: cssGrid_default.filterProps,
      positions: positions_default.filterProps,
      palette: palette_default.filterProps,
      shadows: shadows_default.filterProps,
      sizing: sizing_default.filterProps,
      spacing: spacing_default.filterProps,
      typography: typography_default.filterProps
    };
    styleFunctionMapping = {
      borders: borders_default,
      display: display_default,
      flexbox: flexbox_default,
      grid: cssGrid_default,
      positions: positions_default,
      palette: palette_default,
      shadows: shadows_default,
      sizing: sizing_default,
      spacing: spacing_default,
      typography: typography_default
    };
    propToStyleFunction = Object.keys(filterPropsMapping).reduce((acc, styleFnName) => {
      filterPropsMapping[styleFnName].forEach((propName) => {
        acc[propName] = styleFunctionMapping[styleFnName];
      });
      return acc;
    }, {});
  }
});

// node_modules/@mui/system/getThemeValue/index.js
var init_getThemeValue2 = __esm({
  "node_modules/@mui/system/getThemeValue/index.js"() {
    "use client";
    init_getThemeValue();
    init_getThemeValue();
  }
});

// node_modules/@mui/system/node_modules/clsx/dist/clsx.mjs
function r2(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r2(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx2() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r2(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default2;
var init_clsx2 = __esm({
  "node_modules/@mui/system/node_modules/clsx/dist/clsx.mjs"() {
    clsx_default2 = clsx2;
  }
});

// node_modules/@mui/system/createBox/createBox.js
function createBox(options = {}) {
  const {
    themeId,
    defaultTheme: defaultTheme5,
    defaultClassName = "MuiBox-root",
    generateClassName
  } = options;
  const BoxRoot = styled("div", {
    shouldForwardProp: (prop) => prop !== "theme" && prop !== "sx" && prop !== "as"
  })(styleFunctionSx_default);
  const Box2 = React17.forwardRef(function Box3(inProps, ref) {
    const theme = useTheme_default(defaultTheme5);
    const {
      className,
      component = "div",
      ...other
    } = extendSxProp(inProps);
    return (0, import_jsx_runtime4.jsx)(BoxRoot, {
      as: component,
      ref,
      className: clsx_default2(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),
      theme: themeId ? theme[themeId] || theme : theme,
      ...other
    });
  });
  return Box2;
}
var React17, import_jsx_runtime4;
var init_createBox = __esm({
  "node_modules/@mui/system/createBox/createBox.js"() {
    "use client";
    React17 = __toESM(require_react());
    init_clsx2();
    init_styled_engine();
    init_styleFunctionSx2();
    init_useTheme2();
    import_jsx_runtime4 = __toESM(require_jsx_runtime());
  }
});

// node_modules/@mui/system/createBox/index.js
var init_createBox2 = __esm({
  "node_modules/@mui/system/createBox/index.js"() {
    "use client";
    init_createBox();
  }
});

// node_modules/@mui/system/Box/boxClasses.js
var boxClasses, boxClasses_default;
var init_boxClasses = __esm({
  "node_modules/@mui/system/Box/boxClasses.js"() {
    init_generateUtilityClasses2();
    boxClasses = generateUtilityClasses("MuiBox", ["root"]);
    boxClasses_default = boxClasses;
  }
});

// node_modules/@mui/system/Box/Box.js
var import_prop_types9, Box;
var init_Box = __esm({
  "node_modules/@mui/system/Box/Box.js"() {
    "use client";
    import_prop_types9 = __toESM(require_prop_types());
    init_ClassNameGenerator2();
    init_createBox2();
    init_boxClasses();
    Box = createBox({
      defaultClassName: boxClasses_default.root,
      generateClassName: ClassNameGenerator_default.generate
    });
    true ? Box.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * @ignore
       */
      children: import_prop_types9.default.node,
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: import_prop_types9.default.elementType,
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx: import_prop_types9.default.oneOfType([import_prop_types9.default.arrayOf(import_prop_types9.default.oneOfType([import_prop_types9.default.func, import_prop_types9.default.object, import_prop_types9.default.bool])), import_prop_types9.default.func, import_prop_types9.default.object])
    } : void 0;
  }
});

// node_modules/@mui/system/Box/index.js
var init_Box2 = __esm({
  "node_modules/@mui/system/Box/index.js"() {
    "use client";
    init_Box();
    init_boxClasses();
    init_boxClasses();
  }
});

// node_modules/@mui/system/createStyled/createStyled.js
function shouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
function resolveTheme(themeId, theme, defaultTheme5) {
  return isObjectEmpty2(theme) ? defaultTheme5 : theme[themeId] || theme;
}
function attachTheme(props, themeId, defaultTheme5) {
  if (PROCESSED_PROPS in props) {
    return props[PROCESSED_PROPS];
  }
  const processedProps = {
    ...props,
    theme: resolveTheme(themeId, props.theme, defaultTheme5)
  };
  props[PROCESSED_PROPS] = processedProps;
  processedProps[PROCESSED_PROPS] = processedProps;
  return processedProps;
}
function defaultOverridesResolver(slot) {
  if (!slot) {
    return null;
  }
  return (_props, styles) => styles[slot];
}
function processStyle(style4, props) {
  var _a;
  const resolvedStyle = typeof style4 === "function" ? style4(props) : style4;
  if (Array.isArray(resolvedStyle)) {
    return resolvedStyle.flatMap((subStyle) => processStyle(subStyle, props));
  }
  if (Array.isArray(resolvedStyle == null ? void 0 : resolvedStyle.variants)) {
    const {
      variants,
      ...otherStyles
    } = resolvedStyle;
    let result = otherStyles;
    let mergedState;
    variantLoop: for (let i = 0; i < variants.length; i += 1) {
      const variant = variants[i];
      if (typeof variant.props === "function") {
        mergedState ?? (mergedState = {
          ...props,
          ...props.ownerState,
          ownerState: props.ownerState
        });
        if (!variant.props(mergedState)) {
          continue;
        }
      } else {
        for (const key in variant.props) {
          if (props[key] !== variant.props[key] && ((_a = props.ownerState) == null ? void 0 : _a[key]) !== variant.props[key]) {
            continue variantLoop;
          }
        }
      }
      if (!Array.isArray(result)) {
        result = [result];
      }
      if (typeof variant.style === "function") {
        mergedState ?? (mergedState = {
          ...props,
          ...props.ownerState,
          ownerState: props.ownerState
        });
        result.push(variant.style(mergedState));
      } else {
        result.push(variant.style);
      }
    }
    return result;
  }
  return resolvedStyle;
}
function createStyled(input = {}) {
  const {
    themeId,
    defaultTheme: defaultTheme5 = systemDefaultTheme2,
    rootShouldForwardProp: rootShouldForwardProp2 = shouldForwardProp,
    slotShouldForwardProp: slotShouldForwardProp2 = shouldForwardProp
  } = input;
  const systemSx = (props) => {
    return styleFunctionSx_default(attachTheme(props, themeId, defaultTheme5));
  };
  systemSx.__mui_systemSx = true;
  const styled4 = (tag, inputOptions = {}) => {
    internal_processStyles(tag, (styles) => styles.filter((style4) => !(style4 == null ? void 0 : style4.__mui_systemSx)));
    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver = defaultOverridesResolver(lowercaseFirstLetter(componentSlot)),
      ...options
    } = inputOptions;
    const skipVariantsResolver = inputSkipVariantsResolver !== void 0 ? inputSkipVariantsResolver : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      componentSlot && componentSlot !== "Root" && componentSlot !== "root" || false
    );
    const skipSx = inputSkipSx || false;
    let label;
    if (true) {
      if (componentName) {
        label = `${componentName}-${lowercaseFirstLetter(componentSlot || "Root")}`;
      }
    }
    let shouldForwardPropOption = shouldForwardProp;
    if (componentSlot === "Root" || componentSlot === "root") {
      shouldForwardPropOption = rootShouldForwardProp2;
    } else if (componentSlot) {
      shouldForwardPropOption = slotShouldForwardProp2;
    } else if (isStringTag(tag)) {
      shouldForwardPropOption = void 0;
    }
    const defaultStyledResolver = styled(tag, {
      shouldForwardProp: shouldForwardPropOption,
      label,
      ...options
    });
    const transformStyleArg = (style4) => {
      if (typeof style4 === "function" && style4.__emotion_real !== style4 || isPlainObject(style4)) {
        return (props) => processStyle(style4, attachTheme(props, themeId, defaultTheme5));
      }
      return style4;
    };
    const muiStyledResolver = (style4, ...expressions) => {
      let transformedStyle = transformStyleArg(style4);
      const expressionsWithDefaultTheme = expressions ? expressions.map(transformStyleArg) : [];
      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = resolveTheme(themeId, props.theme, defaultTheme5);
          if (!theme.components || !theme.components[componentName] || !theme.components[componentName].styleOverrides) {
            return null;
          }
          const styleOverrides = theme.components[componentName].styleOverrides;
          const resolvedStyleOverrides = {};
          const propsWithTheme = attachTheme(props, themeId, defaultTheme5);
          for (const slotKey in styleOverrides) {
            resolvedStyleOverrides[slotKey] = processStyle(styleOverrides[slotKey], propsWithTheme);
          }
          return overridesResolver(props, resolvedStyleOverrides);
        });
      }
      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push((props) => {
          var _a, _b;
          const theme = resolveTheme(themeId, props.theme, defaultTheme5);
          const themeVariants = (_b = (_a = theme == null ? void 0 : theme.components) == null ? void 0 : _a[componentName]) == null ? void 0 : _b.variants;
          if (!themeVariants) {
            return null;
          }
          return processStyle({
            variants: themeVariants
          }, attachTheme(props, themeId, defaultTheme5));
        });
      }
      if (!skipSx) {
        expressionsWithDefaultTheme.push(systemSx);
      }
      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;
      if (Array.isArray(style4) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill("");
        transformedStyle = [...style4, ...placeholders];
        transformedStyle.raw = [...style4.raw, ...placeholders];
      }
      const Component = defaultStyledResolver(transformedStyle, ...expressionsWithDefaultTheme);
      if (true) {
        let displayName;
        if (componentName) {
          displayName = `${componentName}${capitalize(componentSlot || "")}`;
        }
        if (displayName === void 0) {
          displayName = `Styled(${getDisplayName(tag)})`;
        }
        Component.displayName = displayName;
      }
      if (tag.muiName) {
        Component.muiName = tag.muiName;
      }
      return Component;
    };
    if (defaultStyledResolver.withConfig) {
      muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
    }
    return muiStyledResolver;
  };
  return styled4;
}
function isObjectEmpty2(object) {
  for (const _ in object) {
    return false;
  }
  return true;
}
function isStringTag(tag) {
  return typeof tag === "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96;
}
function lowercaseFirstLetter(string) {
  if (!string) {
    return string;
  }
  return string.charAt(0).toLowerCase() + string.slice(1);
}
var systemDefaultTheme2, PROCESSED_PROPS;
var init_createStyled = __esm({
  "node_modules/@mui/system/createStyled/createStyled.js"() {
    init_styled_engine();
    init_deepmerge2();
    init_capitalize2();
    init_getDisplayName2();
    init_createTheme2();
    init_styleFunctionSx2();
    systemDefaultTheme2 = createTheme_default();
    PROCESSED_PROPS = Symbol("mui.processed_props");
  }
});

// node_modules/@mui/system/createStyled/index.js
var init_createStyled2 = __esm({
  "node_modules/@mui/system/createStyled/index.js"() {
    "use client";
    init_createStyled();
    init_createStyled();
  }
});

// node_modules/@mui/system/styled/styled.js
var styled2, styled_default;
var init_styled = __esm({
  "node_modules/@mui/system/styled/styled.js"() {
    init_createStyled2();
    styled2 = createStyled();
    styled_default = styled2;
  }
});

// node_modules/@mui/system/styled/index.js
var init_styled2 = __esm({
  "node_modules/@mui/system/styled/index.js"() {
    "use client";
    init_styled();
  }
});

// node_modules/@mui/system/colorManipulator/index.js
var init_colorManipulator2 = __esm({
  "node_modules/@mui/system/colorManipulator/index.js"() {
    "use client";
    init_colorManipulator();
  }
});

// node_modules/@mui/private-theming/useTheme/ThemeContext.js
var React18, ThemeContext2, ThemeContext_default;
var init_ThemeContext = __esm({
  "node_modules/@mui/private-theming/useTheme/ThemeContext.js"() {
    React18 = __toESM(require_react());
    ThemeContext2 = React18.createContext(null);
    if (true) {
      ThemeContext2.displayName = "ThemeContext";
    }
    ThemeContext_default = ThemeContext2;
  }
});

// node_modules/@mui/private-theming/useTheme/useTheme.js
function useTheme3() {
  const theme = React19.useContext(ThemeContext_default);
  if (true) {
    React19.useDebugValue(theme);
  }
  return theme;
}
var React19;
var init_useTheme3 = __esm({
  "node_modules/@mui/private-theming/useTheme/useTheme.js"() {
    React19 = __toESM(require_react());
    init_ThemeContext();
  }
});

// node_modules/@mui/private-theming/useTheme/index.js
var init_useTheme4 = __esm({
  "node_modules/@mui/private-theming/useTheme/index.js"() {
    init_useTheme3();
  }
});

// node_modules/@mui/private-theming/ThemeProvider/nested.js
var hasSymbol, nested_default;
var init_nested = __esm({
  "node_modules/@mui/private-theming/ThemeProvider/nested.js"() {
    hasSymbol = typeof Symbol === "function" && Symbol.for;
    nested_default = hasSymbol ? Symbol.for("mui.nested") : "__THEME_NESTED__";
  }
});

// node_modules/@mui/private-theming/ThemeProvider/ThemeProvider.js
function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === "function") {
    const mergedTheme = localTheme(outerTheme);
    if (true) {
      if (!mergedTheme) {
        console.error(["MUI: You should return an object from your theme function, i.e.", "<ThemeProvider theme={() => ({})} />"].join("\n"));
      }
    }
    return mergedTheme;
  }
  return {
    ...outerTheme,
    ...localTheme
  };
}
function ThemeProvider(props) {
  const {
    children,
    theme: localTheme
  } = props;
  const outerTheme = useTheme3();
  if (true) {
    if (outerTheme === null && typeof localTheme === "function") {
      console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join("\n"));
    }
  }
  const theme = React20.useMemo(() => {
    const output = outerTheme === null ? {
      ...localTheme
    } : mergeOuterLocalTheme(outerTheme, localTheme);
    if (output != null) {
      output[nested_default] = outerTheme !== null;
    }
    return output;
  }, [localTheme, outerTheme]);
  return (0, import_jsx_runtime5.jsx)(ThemeContext_default.Provider, {
    value: theme,
    children
  });
}
var React20, import_prop_types10, import_jsx_runtime5, ThemeProvider_default;
var init_ThemeProvider = __esm({
  "node_modules/@mui/private-theming/ThemeProvider/ThemeProvider.js"() {
    React20 = __toESM(require_react());
    import_prop_types10 = __toESM(require_prop_types());
    init_esm();
    init_ThemeContext();
    init_useTheme4();
    init_nested();
    import_jsx_runtime5 = __toESM(require_jsx_runtime());
    true ? ThemeProvider.propTypes = {
      /**
       * Your component tree.
       */
      children: import_prop_types10.default.node,
      /**
       * A theme object. You can provide a function to extend the outer theme.
       */
      theme: import_prop_types10.default.oneOfType([import_prop_types10.default.object, import_prop_types10.default.func]).isRequired
    } : void 0;
    if (true) {
      true ? ThemeProvider.propTypes = exactProp(ThemeProvider.propTypes) : void 0;
    }
    ThemeProvider_default = ThemeProvider;
  }
});

// node_modules/@mui/private-theming/ThemeProvider/index.js
var init_ThemeProvider2 = __esm({
  "node_modules/@mui/private-theming/ThemeProvider/index.js"() {
    init_ThemeProvider();
    init_nested();
  }
});

// node_modules/@mui/private-theming/index.js
var init_private_theming = __esm({
  "node_modules/@mui/private-theming/index.js"() {
    init_ThemeProvider2();
    init_ThemeProvider2();
    init_useTheme4();
  }
});

// node_modules/@mui/system/RtlProvider/index.js
function RtlProvider({
  value,
  ...props
}) {
  return (0, import_jsx_runtime6.jsx)(RtlContext.Provider, {
    value: value ?? true,
    ...props
  });
}
var React21, import_prop_types11, import_jsx_runtime6, RtlContext, useRtl, RtlProvider_default;
var init_RtlProvider = __esm({
  "node_modules/@mui/system/RtlProvider/index.js"() {
    React21 = __toESM(require_react());
    import_prop_types11 = __toESM(require_prop_types());
    import_jsx_runtime6 = __toESM(require_jsx_runtime());
    RtlContext = React21.createContext();
    true ? RtlProvider.propTypes = {
      children: import_prop_types11.default.node,
      value: import_prop_types11.default.bool
    } : void 0;
    useRtl = () => {
      const value = React21.useContext(RtlContext);
      return value ?? false;
    };
    RtlProvider_default = RtlProvider;
  }
});

// node_modules/@mui/system/DefaultPropsProvider/DefaultPropsProvider.js
function DefaultPropsProvider({
  value,
  children
}) {
  return (0, import_jsx_runtime7.jsx)(PropsContext.Provider, {
    value,
    children
  });
}
function getThemeProps2(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name]) {
    return props;
  }
  const config = theme.components[name];
  if (config.defaultProps) {
    return resolveProps(config.defaultProps, props);
  }
  if (!config.styleOverrides && !config.variants) {
    return resolveProps(config, props);
  }
  return props;
}
function useDefaultProps({
  props,
  name
}) {
  const ctx = React22.useContext(PropsContext);
  return getThemeProps2({
    props,
    name,
    theme: {
      components: ctx
    }
  });
}
var React22, import_prop_types12, import_jsx_runtime7, PropsContext, DefaultPropsProvider_default;
var init_DefaultPropsProvider = __esm({
  "node_modules/@mui/system/DefaultPropsProvider/DefaultPropsProvider.js"() {
    "use client";
    React22 = __toESM(require_react());
    import_prop_types12 = __toESM(require_prop_types());
    init_resolveProps2();
    import_jsx_runtime7 = __toESM(require_jsx_runtime());
    PropsContext = React22.createContext(void 0);
    true ? DefaultPropsProvider.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * @ignore
       */
      children: import_prop_types12.default.node,
      /**
       * @ignore
       */
      value: import_prop_types12.default.object
    } : void 0;
    DefaultPropsProvider_default = DefaultPropsProvider;
  }
});

// node_modules/@mui/system/DefaultPropsProvider/index.js
var init_DefaultPropsProvider2 = __esm({
  "node_modules/@mui/system/DefaultPropsProvider/index.js"() {
    init_DefaultPropsProvider();
  }
});

// node_modules/@mui/system/ThemeProvider/ThemeProvider.js
function useThemeScoping(themeId, upperTheme, localTheme, isPrivate = false) {
  return React23.useMemo(() => {
    const resolvedTheme = themeId ? upperTheme[themeId] || upperTheme : upperTheme;
    if (typeof localTheme === "function") {
      const mergedTheme = localTheme(resolvedTheme);
      const result = themeId ? {
        ...upperTheme,
        [themeId]: mergedTheme
      } : mergedTheme;
      if (isPrivate) {
        return () => result;
      }
      return result;
    }
    return themeId ? {
      ...upperTheme,
      [themeId]: localTheme
    } : {
      ...upperTheme,
      ...localTheme
    };
  }, [themeId, upperTheme, localTheme, isPrivate]);
}
function ThemeProvider2(props) {
  const {
    children,
    theme: localTheme,
    themeId
  } = props;
  const upperTheme = useThemeWithoutDefault_default(EMPTY_THEME);
  const upperPrivateTheme = useTheme3() || EMPTY_THEME;
  if (true) {
    if (upperTheme === null && typeof localTheme === "function" || themeId && upperTheme && !upperTheme[themeId] && typeof localTheme === "function") {
      console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join("\n"));
    }
  }
  const engineTheme = useThemeScoping(themeId, upperTheme, localTheme);
  const privateTheme = useThemeScoping(themeId, upperPrivateTheme, localTheme, true);
  const rtlValue = engineTheme.direction === "rtl";
  return (0, import_jsx_runtime8.jsx)(ThemeProvider_default, {
    theme: privateTheme,
    children: (0, import_jsx_runtime8.jsx)(ThemeContext.Provider, {
      value: engineTheme,
      children: (0, import_jsx_runtime8.jsx)(RtlProvider_default, {
        value: rtlValue,
        children: (0, import_jsx_runtime8.jsx)(DefaultPropsProvider_default, {
          value: engineTheme == null ? void 0 : engineTheme.components,
          children
        })
      })
    })
  });
}
var React23, import_prop_types13, import_jsx_runtime8, EMPTY_THEME, ThemeProvider_default2;
var init_ThemeProvider3 = __esm({
  "node_modules/@mui/system/ThemeProvider/ThemeProvider.js"() {
    "use client";
    React23 = __toESM(require_react());
    import_prop_types13 = __toESM(require_prop_types());
    init_private_theming();
    init_exactProp2();
    init_styled_engine();
    init_useThemeWithoutDefault2();
    init_RtlProvider();
    init_DefaultPropsProvider2();
    import_jsx_runtime8 = __toESM(require_jsx_runtime());
    EMPTY_THEME = {};
    true ? ThemeProvider2.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * Your component tree.
       */
      children: import_prop_types13.default.node,
      /**
       * A theme object. You can provide a function to extend the outer theme.
       */
      theme: import_prop_types13.default.oneOfType([import_prop_types13.default.func, import_prop_types13.default.object]).isRequired,
      /**
       * The design system's unique id for getting the corresponded theme when there are multiple design systems.
       */
      themeId: import_prop_types13.default.string
    } : void 0;
    if (true) {
      true ? ThemeProvider2.propTypes = exactProp(ThemeProvider2.propTypes) : void 0;
    }
    ThemeProvider_default2 = ThemeProvider2;
  }
});

// node_modules/@mui/system/ThemeProvider/index.js
var init_ThemeProvider4 = __esm({
  "node_modules/@mui/system/ThemeProvider/index.js"() {
    "use client";
    init_ThemeProvider3();
  }
});

// node_modules/@mui/system/InitColorSchemeScript/InitColorSchemeScript.js
function InitColorSchemeScript(options) {
  const {
    defaultLightColorScheme = "light",
    defaultDarkColorScheme = "dark",
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    attribute: initialAttribute = DEFAULT_ATTRIBUTE,
    colorSchemeNode = "document.documentElement",
    nonce
  } = options || {};
  let setter = "";
  let attribute = initialAttribute;
  if (initialAttribute === "class") {
    attribute = ".%s";
  }
  if (initialAttribute === "data") {
    attribute = "[data-%s]";
  }
  if (attribute.startsWith(".")) {
    const selector = attribute.substring(1);
    setter += `${colorSchemeNode}.classList.remove('${selector}'.replace('%s', light), '${selector}'.replace('%s', dark));
      ${colorSchemeNode}.classList.add('${selector}'.replace('%s', colorScheme));`;
  }
  const matches = attribute.match(/\[([^\]]+)\]/);
  if (matches) {
    const [attr, value] = matches[1].split("=");
    if (!value) {
      setter += `${colorSchemeNode}.removeAttribute('${attr}'.replace('%s', light));
      ${colorSchemeNode}.removeAttribute('${attr}'.replace('%s', dark));`;
    }
    setter += `
      ${colorSchemeNode}.setAttribute('${attr}'.replace('%s', colorScheme), ${value ? `${value}.replace('%s', colorScheme)` : '""'});`;
  } else {
    setter += `${colorSchemeNode}.setAttribute('${attribute}', colorScheme);`;
  }
  return (0, import_jsx_runtime9.jsx)("script", {
    suppressHydrationWarning: true,
    nonce: typeof window === "undefined" ? nonce : "",
    dangerouslySetInnerHTML: {
      __html: `(function() {
try {
  var mode = localStorage.getItem('${modeStorageKey}') || 'system';
  var colorScheme = '';
  var dark = localStorage.getItem('${colorSchemeStorageKey}-dark') || '${defaultDarkColorScheme}';
  var light = localStorage.getItem('${colorSchemeStorageKey}-light') || '${defaultLightColorScheme}';
  if (mode === 'system') {
    // handle system mode
    var mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = dark
    } else {
      colorScheme = light
    }
  }
  if (mode === 'light') {
    colorScheme = light;
  }
  if (mode === 'dark') {
    colorScheme = dark;
  }
  if (colorScheme) {
    ${setter}
  }
} catch(e){}})();`
    }
  }, "mui-color-scheme-init");
}
var React24, import_jsx_runtime9, DEFAULT_MODE_STORAGE_KEY, DEFAULT_COLOR_SCHEME_STORAGE_KEY, DEFAULT_ATTRIBUTE;
var init_InitColorSchemeScript = __esm({
  "node_modules/@mui/system/InitColorSchemeScript/InitColorSchemeScript.js"() {
    React24 = __toESM(require_react());
    import_jsx_runtime9 = __toESM(require_jsx_runtime());
    DEFAULT_MODE_STORAGE_KEY = "mode";
    DEFAULT_COLOR_SCHEME_STORAGE_KEY = "color-scheme";
    DEFAULT_ATTRIBUTE = "data-color-scheme";
  }
});

// node_modules/@mui/system/cssVars/useCurrentColorScheme.js
function getSystemMode(mode) {
  if (typeof window !== "undefined" && typeof window.matchMedia === "function" && mode === "system") {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    if (mql.matches) {
      return "dark";
    }
    return "light";
  }
  return void 0;
}
function processState(state, callback) {
  if (state.mode === "light" || state.mode === "system" && state.systemMode === "light") {
    return callback("light");
  }
  if (state.mode === "dark" || state.mode === "system" && state.systemMode === "dark") {
    return callback("dark");
  }
  return void 0;
}
function getColorScheme(state) {
  return processState(state, (mode) => {
    if (mode === "light") {
      return state.lightColorScheme;
    }
    if (mode === "dark") {
      return state.darkColorScheme;
    }
    return void 0;
  });
}
function initializeValue(key, defaultValue) {
  if (typeof window === "undefined") {
    return void 0;
  }
  let value;
  try {
    value = localStorage.getItem(key) || void 0;
    if (!value) {
      localStorage.setItem(key, defaultValue);
    }
  } catch (e) {
  }
  return value || defaultValue;
}
function useCurrentColorScheme(options) {
  const {
    defaultMode = "light",
    defaultLightColorScheme,
    defaultDarkColorScheme,
    supportedColorSchemes = [],
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    storageWindow = typeof window === "undefined" ? void 0 : window
  } = options;
  const joinedColorSchemes = supportedColorSchemes.join(",");
  const isMultiSchemes = supportedColorSchemes.length > 1;
  const [state, setState] = React25.useState(() => {
    const initialMode = initializeValue(modeStorageKey, defaultMode);
    const lightColorScheme = initializeValue(`${colorSchemeStorageKey}-light`, defaultLightColorScheme);
    const darkColorScheme = initializeValue(`${colorSchemeStorageKey}-dark`, defaultDarkColorScheme);
    return {
      mode: initialMode,
      systemMode: getSystemMode(initialMode),
      lightColorScheme,
      darkColorScheme
    };
  });
  const [, setHasMounted] = React25.useState(false);
  const hasMounted = React25.useRef(false);
  React25.useEffect(() => {
    if (isMultiSchemes) {
      setHasMounted(true);
    }
    hasMounted.current = true;
  }, [isMultiSchemes]);
  const colorScheme = getColorScheme(state);
  const setMode = React25.useCallback((mode) => {
    setState((currentState) => {
      if (mode === currentState.mode) {
        return currentState;
      }
      const newMode = mode ?? defaultMode;
      try {
        localStorage.setItem(modeStorageKey, newMode);
      } catch (e) {
      }
      return {
        ...currentState,
        mode: newMode,
        systemMode: getSystemMode(newMode)
      };
    });
  }, [modeStorageKey, defaultMode]);
  const setColorScheme = React25.useCallback((value) => {
    if (!value) {
      setState((currentState) => {
        try {
          localStorage.setItem(`${colorSchemeStorageKey}-light`, defaultLightColorScheme);
          localStorage.setItem(`${colorSchemeStorageKey}-dark`, defaultDarkColorScheme);
        } catch (e) {
        }
        return {
          ...currentState,
          lightColorScheme: defaultLightColorScheme,
          darkColorScheme: defaultDarkColorScheme
        };
      });
    } else if (typeof value === "string") {
      if (value && !joinedColorSchemes.includes(value)) {
        console.error(`\`${value}\` does not exist in \`theme.colorSchemes\`.`);
      } else {
        setState((currentState) => {
          const newState = {
            ...currentState
          };
          processState(currentState, (mode) => {
            try {
              localStorage.setItem(`${colorSchemeStorageKey}-${mode}`, value);
            } catch (e) {
            }
            if (mode === "light") {
              newState.lightColorScheme = value;
            }
            if (mode === "dark") {
              newState.darkColorScheme = value;
            }
          });
          return newState;
        });
      }
    } else {
      setState((currentState) => {
        const newState = {
          ...currentState
        };
        const newLightColorScheme = value.light === null ? defaultLightColorScheme : value.light;
        const newDarkColorScheme = value.dark === null ? defaultDarkColorScheme : value.dark;
        if (newLightColorScheme) {
          if (!joinedColorSchemes.includes(newLightColorScheme)) {
            console.error(`\`${newLightColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
          } else {
            newState.lightColorScheme = newLightColorScheme;
            try {
              localStorage.setItem(`${colorSchemeStorageKey}-light`, newLightColorScheme);
            } catch (error) {
            }
          }
        }
        if (newDarkColorScheme) {
          if (!joinedColorSchemes.includes(newDarkColorScheme)) {
            console.error(`\`${newDarkColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
          } else {
            newState.darkColorScheme = newDarkColorScheme;
            try {
              localStorage.setItem(`${colorSchemeStorageKey}-dark`, newDarkColorScheme);
            } catch (error) {
            }
          }
        }
        return newState;
      });
    }
  }, [joinedColorSchemes, colorSchemeStorageKey, defaultLightColorScheme, defaultDarkColorScheme]);
  const handleMediaQuery = React25.useCallback((event) => {
    if (state.mode === "system") {
      setState((currentState) => {
        const systemMode = (event == null ? void 0 : event.matches) ? "dark" : "light";
        if (currentState.systemMode === systemMode) {
          return currentState;
        }
        return {
          ...currentState,
          systemMode
        };
      });
    }
  }, [state.mode]);
  const mediaListener = React25.useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;
  React25.useEffect(() => {
    if (typeof window.matchMedia !== "function" || !isMultiSchemes) {
      return void 0;
    }
    const handler = (...args) => mediaListener.current(...args);
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addListener(handler);
    handler(media);
    return () => {
      media.removeListener(handler);
    };
  }, [isMultiSchemes]);
  React25.useEffect(() => {
    if (storageWindow && isMultiSchemes) {
      const handleStorage = (event) => {
        const value = event.newValue;
        if (typeof event.key === "string" && event.key.startsWith(colorSchemeStorageKey) && (!value || joinedColorSchemes.match(value))) {
          if (event.key.endsWith("light")) {
            setColorScheme({
              light: value
            });
          }
          if (event.key.endsWith("dark")) {
            setColorScheme({
              dark: value
            });
          }
        }
        if (event.key === modeStorageKey && (!value || ["light", "dark", "system"].includes(value))) {
          setMode(value || defaultMode);
        }
      };
      storageWindow.addEventListener("storage", handleStorage);
      return () => {
        storageWindow.removeEventListener("storage", handleStorage);
      };
    }
    return void 0;
  }, [setColorScheme, setMode, modeStorageKey, colorSchemeStorageKey, joinedColorSchemes, defaultMode, storageWindow, isMultiSchemes]);
  return {
    ...state,
    mode: hasMounted.current || !isMultiSchemes ? state.mode : void 0,
    systemMode: hasMounted.current || !isMultiSchemes ? state.systemMode : void 0,
    colorScheme: hasMounted.current || !isMultiSchemes ? colorScheme : void 0,
    setMode,
    setColorScheme
  };
}
var React25;
var init_useCurrentColorScheme = __esm({
  "node_modules/@mui/system/cssVars/useCurrentColorScheme.js"() {
    "use client";
    React25 = __toESM(require_react());
    init_InitColorSchemeScript();
  }
});

// node_modules/@mui/system/cssVars/createCssVarsProvider.js
function createCssVarsProvider(options) {
  const {
    themeId,
    /**
     * This `theme` object needs to follow a certain structure to
     * be used correctly by the finel `CssVarsProvider`. It should have a
     * `colorSchemes` key with the light and dark (and any other) palette.
     * It should also ideally have a vars object created using `prepareCssVars`.
     */
    theme: defaultTheme5 = {},
    modeStorageKey: defaultModeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey: defaultColorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    disableTransitionOnChange: designSystemTransitionOnChange = false,
    defaultColorScheme,
    resolveTheme: resolveTheme2
  } = options;
  const defaultContext = {
    allColorSchemes: [],
    colorScheme: void 0,
    darkColorScheme: void 0,
    lightColorScheme: void 0,
    mode: void 0,
    setColorScheme: () => {
    },
    setMode: () => {
    },
    systemMode: void 0
  };
  const ColorSchemeContext = React26.createContext(void 0);
  if (true) {
    ColorSchemeContext.displayName = "ColorSchemeContext";
  }
  const useColorScheme = () => React26.useContext(ColorSchemeContext) || defaultContext;
  function CssVarsProvider(props) {
    var _a, _b, _c, _d, _e;
    const {
      children,
      theme: themeProp,
      modeStorageKey = defaultModeStorageKey,
      colorSchemeStorageKey = defaultColorSchemeStorageKey,
      disableTransitionOnChange = designSystemTransitionOnChange,
      storageWindow = typeof window === "undefined" ? void 0 : window,
      documentNode = typeof document === "undefined" ? void 0 : document,
      colorSchemeNode = typeof document === "undefined" ? void 0 : document.documentElement,
      disableNestedContext = false,
      disableStyleSheetGeneration = false
    } = props;
    const hasMounted = React26.useRef(false);
    const upperTheme = useTheme3();
    const ctx = React26.useContext(ColorSchemeContext);
    const nested = !!ctx && !disableNestedContext;
    const initialTheme = React26.useMemo(() => {
      if (themeProp) {
        return themeProp;
      }
      return typeof defaultTheme5 === "function" ? defaultTheme5() : defaultTheme5;
    }, [themeProp]);
    const scopedTheme = initialTheme[themeId];
    const {
      colorSchemes = {},
      components = {},
      cssVarPrefix,
      ...restThemeProp
    } = scopedTheme || initialTheme;
    const joinedColorSchemes = Object.keys(colorSchemes).filter((k) => !!colorSchemes[k]).join(",");
    const allColorSchemes = React26.useMemo(() => joinedColorSchemes.split(","), [joinedColorSchemes]);
    const defaultLightColorScheme2 = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.light;
    const defaultDarkColorScheme2 = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.dark;
    const defaultMode = colorSchemes[defaultLightColorScheme2] && colorSchemes[defaultDarkColorScheme2] ? "system" : ((_b = (_a = colorSchemes[restThemeProp.defaultColorScheme]) == null ? void 0 : _a.palette) == null ? void 0 : _b.mode) || ((_c = restThemeProp.palette) == null ? void 0 : _c.mode);
    const {
      mode: stateMode,
      setMode,
      systemMode,
      lightColorScheme,
      darkColorScheme,
      colorScheme: stateColorScheme,
      setColorScheme
    } = useCurrentColorScheme({
      supportedColorSchemes: allColorSchemes,
      defaultLightColorScheme: defaultLightColorScheme2,
      defaultDarkColorScheme: defaultDarkColorScheme2,
      modeStorageKey,
      colorSchemeStorageKey,
      defaultMode,
      storageWindow
    });
    let mode = stateMode;
    let colorScheme = stateColorScheme;
    if (nested) {
      mode = ctx.mode;
      colorScheme = ctx.colorScheme;
    }
    const calculatedColorScheme = colorScheme || restThemeProp.defaultColorScheme;
    const themeVars = ((_d = restThemeProp.generateThemeVars) == null ? void 0 : _d.call(restThemeProp)) || restThemeProp.vars;
    const theme = {
      ...restThemeProp,
      components,
      colorSchemes,
      cssVarPrefix,
      vars: themeVars
    };
    if (typeof theme.generateSpacing === "function") {
      theme.spacing = theme.generateSpacing();
    }
    if (calculatedColorScheme) {
      const scheme = colorSchemes[calculatedColorScheme];
      if (scheme && typeof scheme === "object") {
        Object.keys(scheme).forEach((schemeKey) => {
          if (scheme[schemeKey] && typeof scheme[schemeKey] === "object") {
            theme[schemeKey] = {
              ...theme[schemeKey],
              ...scheme[schemeKey]
            };
          } else {
            theme[schemeKey] = scheme[schemeKey];
          }
        });
      }
    }
    const colorSchemeSelector = restThemeProp.colorSchemeSelector;
    React26.useEffect(() => {
      if (colorScheme && colorSchemeNode && colorSchemeSelector && colorSchemeSelector !== "media") {
        const selector = colorSchemeSelector;
        let rule = colorSchemeSelector;
        if (selector === "class") {
          rule = `.%s`;
        }
        if (selector === "data") {
          rule = `[data-%s]`;
        }
        if ((selector == null ? void 0 : selector.startsWith("data-")) && !selector.includes("%s")) {
          rule = `[${selector}="%s"]`;
        }
        if (rule.startsWith(".")) {
          colorSchemeNode.classList.remove(...allColorSchemes.map((scheme) => rule.substring(1).replace("%s", scheme)));
          colorSchemeNode.classList.add(rule.substring(1).replace("%s", colorScheme));
        } else {
          const matches = rule.replace("%s", colorScheme).match(/\[([^\]]+)\]/);
          if (matches) {
            const [attr, value] = matches[1].split("=");
            if (!value) {
              allColorSchemes.forEach((scheme) => {
                colorSchemeNode.removeAttribute(attr.replace(colorScheme, scheme));
              });
            }
            colorSchemeNode.setAttribute(attr, value ? value.replace(/"|'/g, "") : "");
          } else {
            colorSchemeNode.setAttribute(rule, colorScheme);
          }
        }
      }
    }, [colorScheme, colorSchemeSelector, colorSchemeNode, allColorSchemes]);
    React26.useEffect(() => {
      let timer;
      if (disableTransitionOnChange && hasMounted.current && documentNode) {
        const css2 = documentNode.createElement("style");
        css2.appendChild(documentNode.createTextNode(DISABLE_CSS_TRANSITION));
        documentNode.head.appendChild(css2);
        (() => window.getComputedStyle(documentNode.body))();
        timer = setTimeout(() => {
          documentNode.head.removeChild(css2);
        }, 1);
      }
      return () => {
        clearTimeout(timer);
      };
    }, [colorScheme, disableTransitionOnChange, documentNode]);
    React26.useEffect(() => {
      hasMounted.current = true;
      return () => {
        hasMounted.current = false;
      };
    }, []);
    const contextValue = React26.useMemo(() => ({
      allColorSchemes,
      colorScheme,
      darkColorScheme,
      lightColorScheme,
      mode,
      setColorScheme,
      setMode,
      systemMode
    }), [allColorSchemes, colorScheme, darkColorScheme, lightColorScheme, mode, setColorScheme, setMode, systemMode]);
    let shouldGenerateStyleSheet = true;
    if (disableStyleSheetGeneration || restThemeProp.cssVariables === false || nested && (upperTheme == null ? void 0 : upperTheme.cssVarPrefix) === cssVarPrefix) {
      shouldGenerateStyleSheet = false;
    }
    const element = (0, import_jsx_runtime10.jsxs)(React26.Fragment, {
      children: [shouldGenerateStyleSheet && (0, import_jsx_runtime10.jsx)(React26.Fragment, {
        children: (((_e = theme.generateStyleSheets) == null ? void 0 : _e.call(theme)) || []).map((styles, index) => (0, import_jsx_runtime10.jsx)(GlobalStyles, {
          styles
        }, index))
      }), (0, import_jsx_runtime10.jsx)(ThemeProvider_default2, {
        themeId: scopedTheme ? themeId : void 0,
        theme: resolveTheme2 ? resolveTheme2(theme) : theme,
        children
      })]
    });
    if (nested) {
      return element;
    }
    return (0, import_jsx_runtime10.jsx)(ColorSchemeContext.Provider, {
      value: contextValue,
      children: element
    });
  }
  true ? CssVarsProvider.propTypes = {
    /**
     * The component tree.
     */
    children: import_prop_types14.default.node,
    /**
     * The node used to attach the color-scheme attribute
     */
    colorSchemeNode: import_prop_types14.default.any,
    /**
     * localStorage key used to store `colorScheme`
     */
    colorSchemeStorageKey: import_prop_types14.default.string,
    /**
     * If `true`, the provider creates its own context and generate stylesheet as if it is a root `CssVarsProvider`.
     */
    disableNestedContext: import_prop_types14.default.bool,
    /**
     * If `true`, the style sheet won't be generated.
     *
     * This is useful for controlling nested CssVarsProvider behavior.
     */
    disableStyleSheetGeneration: import_prop_types14.default.bool,
    /**
     * Disable CSS transitions when switching between modes or color schemes.
     */
    disableTransitionOnChange: import_prop_types14.default.bool,
    /**
     * The document to attach the attribute to.
     */
    documentNode: import_prop_types14.default.any,
    /**
     * The key in the local storage used to store current color scheme.
     */
    modeStorageKey: import_prop_types14.default.string,
    /**
     * The window that attaches the 'storage' event listener.
     * @default window
     */
    storageWindow: import_prop_types14.default.any,
    /**
     * The calculated theme object that will be passed through context.
     */
    theme: import_prop_types14.default.object
  } : void 0;
  const defaultLightColorScheme = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.light;
  const defaultDarkColorScheme = typeof defaultColorScheme === "string" ? defaultColorScheme : defaultColorScheme.dark;
  const getInitColorSchemeScript = (params) => InitColorSchemeScript({
    colorSchemeStorageKey: defaultColorSchemeStorageKey,
    defaultLightColorScheme,
    defaultDarkColorScheme,
    modeStorageKey: defaultModeStorageKey,
    ...params
  });
  return {
    CssVarsProvider,
    useColorScheme,
    getInitColorSchemeScript
  };
}
var React26, import_prop_types14, import_jsx_runtime10, DISABLE_CSS_TRANSITION;
var init_createCssVarsProvider = __esm({
  "node_modules/@mui/system/cssVars/createCssVarsProvider.js"() {
    React26 = __toESM(require_react());
    import_prop_types14 = __toESM(require_prop_types());
    init_styled_engine();
    init_private_theming();
    init_ThemeProvider4();
    init_InitColorSchemeScript();
    init_useCurrentColorScheme();
    import_jsx_runtime10 = __toESM(require_jsx_runtime());
    DISABLE_CSS_TRANSITION = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
  }
});

// node_modules/@mui/system/cssVars/createGetCssVar.js
function createGetCssVar(prefix = "") {
  function appendVar(...vars) {
    if (!vars.length) {
      return "";
    }
    const value = vars[0];
    if (typeof value === "string" && !value.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/)) {
      return `, var(--${prefix ? `${prefix}-` : ""}${value}${appendVar(...vars.slice(1))})`;
    }
    return `, ${value}`;
  }
  const getCssVar = (field, ...fallbacks) => {
    return `var(--${prefix ? `${prefix}-` : ""}${field}${appendVar(...fallbacks)})`;
  };
  return getCssVar;
}
var init_createGetCssVar = __esm({
  "node_modules/@mui/system/cssVars/createGetCssVar.js"() {
  }
});

// node_modules/@mui/system/cssVars/cssVarsParser.js
function cssVarsParser(theme, options) {
  const {
    prefix,
    shouldSkipGeneratingVar: shouldSkipGeneratingVar2
  } = options || {};
  const css2 = {};
  const vars = {};
  const varsWithDefaults = {};
  walkObjectDeep(
    theme,
    (keys, value, arrayKeys) => {
      if (typeof value === "string" || typeof value === "number") {
        if (!shouldSkipGeneratingVar2 || !shouldSkipGeneratingVar2(keys, value)) {
          const cssVar = `--${prefix ? `${prefix}-` : ""}${keys.join("-")}`;
          const resolvedValue = getCssValue(keys, value);
          Object.assign(css2, {
            [cssVar]: resolvedValue
          });
          assignNestedKeys(vars, keys, `var(${cssVar})`, arrayKeys);
          assignNestedKeys(varsWithDefaults, keys, `var(${cssVar}, ${resolvedValue})`, arrayKeys);
        }
      }
    },
    (keys) => keys[0] === "vars"
    // skip 'vars/*' paths
  );
  return {
    css: css2,
    vars,
    varsWithDefaults
  };
}
var assignNestedKeys, walkObjectDeep, getCssValue;
var init_cssVarsParser = __esm({
  "node_modules/@mui/system/cssVars/cssVarsParser.js"() {
    assignNestedKeys = (obj, keys, value, arrayKeys = []) => {
      let temp = obj;
      keys.forEach((k, index) => {
        if (index === keys.length - 1) {
          if (Array.isArray(temp)) {
            temp[Number(k)] = value;
          } else if (temp && typeof temp === "object") {
            temp[k] = value;
          }
        } else if (temp && typeof temp === "object") {
          if (!temp[k]) {
            temp[k] = arrayKeys.includes(k) ? [] : {};
          }
          temp = temp[k];
        }
      });
    };
    walkObjectDeep = (obj, callback, shouldSkipPaths) => {
      function recurse(object, parentKeys = [], arrayKeys = []) {
        Object.entries(object).forEach(([key, value]) => {
          if (!shouldSkipPaths || shouldSkipPaths && !shouldSkipPaths([...parentKeys, key])) {
            if (value !== void 0 && value !== null) {
              if (typeof value === "object" && Object.keys(value).length > 0) {
                recurse(value, [...parentKeys, key], Array.isArray(value) ? [...arrayKeys, key] : arrayKeys);
              } else {
                callback([...parentKeys, key], value, arrayKeys);
              }
            }
          }
        });
      }
      recurse(obj);
    };
    getCssValue = (keys, value) => {
      if (typeof value === "number") {
        if (["lineHeight", "fontWeight", "opacity", "zIndex"].some((prop) => keys.includes(prop))) {
          return value;
        }
        const lastKey = keys[keys.length - 1];
        if (lastKey.toLowerCase().indexOf("opacity") >= 0) {
          return value;
        }
        return `${value}px`;
      }
      return value;
    };
  }
});

// node_modules/@mui/system/cssVars/prepareCssVars.js
function prepareCssVars(theme, parserConfig = {}) {
  const {
    getSelector = defaultGetSelector,
    disableCssColorScheme,
    colorSchemeSelector: selector
  } = parserConfig;
  const {
    colorSchemes = {},
    components,
    defaultColorScheme = "light",
    ...otherTheme
  } = theme;
  const {
    vars: rootVars,
    css: rootCss,
    varsWithDefaults: rootVarsWithDefaults
  } = cssVarsParser(otherTheme, parserConfig);
  let themeVars = rootVarsWithDefaults;
  const colorSchemesMap = {};
  const {
    [defaultColorScheme]: defaultScheme,
    ...otherColorSchemes
  } = colorSchemes;
  Object.entries(otherColorSchemes || {}).forEach(([key, scheme]) => {
    const {
      vars,
      css: css2,
      varsWithDefaults
    } = cssVarsParser(scheme, parserConfig);
    themeVars = deepmerge(themeVars, varsWithDefaults);
    colorSchemesMap[key] = {
      css: css2,
      vars
    };
  });
  if (defaultScheme) {
    const {
      css: css2,
      vars,
      varsWithDefaults
    } = cssVarsParser(defaultScheme, parserConfig);
    themeVars = deepmerge(themeVars, varsWithDefaults);
    colorSchemesMap[defaultColorScheme] = {
      css: css2,
      vars
    };
  }
  function defaultGetSelector(colorScheme, cssObject) {
    var _a, _b;
    let rule = selector;
    if (selector === "class") {
      rule = ".%s";
    }
    if (selector === "data") {
      rule = "[data-%s]";
    }
    if ((selector == null ? void 0 : selector.startsWith("data-")) && !selector.includes("%s")) {
      rule = `[${selector}="%s"]`;
    }
    if (colorScheme) {
      if (rule === "media") {
        if (theme.defaultColorScheme === colorScheme) {
          return ":root";
        }
        const mode = ((_b = (_a = colorSchemes[colorScheme]) == null ? void 0 : _a.palette) == null ? void 0 : _b.mode) || colorScheme;
        return {
          [`@media (prefers-color-scheme: ${mode})`]: {
            ":root": cssObject
          }
        };
      }
      if (rule) {
        if (theme.defaultColorScheme === colorScheme) {
          return `:root, ${rule.replace("%s", String(colorScheme))}`;
        }
        return rule.replace("%s", String(colorScheme));
      }
    }
    return ":root";
  }
  const generateThemeVars = () => {
    let vars = {
      ...rootVars
    };
    Object.entries(colorSchemesMap).forEach(([, {
      vars: schemeVars
    }]) => {
      vars = deepmerge(vars, schemeVars);
    });
    return vars;
  };
  const generateStyleSheets = () => {
    var _a, _b;
    const stylesheets = [];
    const colorScheme = theme.defaultColorScheme || "light";
    function insertStyleSheet(key, css2) {
      if (Object.keys(css2).length) {
        stylesheets.push(typeof key === "string" ? {
          [key]: {
            ...css2
          }
        } : key);
      }
    }
    insertStyleSheet(getSelector(void 0, {
      ...rootCss
    }), rootCss);
    const {
      [colorScheme]: defaultSchemeVal,
      ...other
    } = colorSchemesMap;
    if (defaultSchemeVal) {
      const {
        css: css2
      } = defaultSchemeVal;
      const cssColorSheme = (_b = (_a = colorSchemes[colorScheme]) == null ? void 0 : _a.palette) == null ? void 0 : _b.mode;
      const finalCss = !disableCssColorScheme && cssColorSheme ? {
        colorScheme: cssColorSheme,
        ...css2
      } : {
        ...css2
      };
      insertStyleSheet(getSelector(colorScheme, {
        ...finalCss
      }), finalCss);
    }
    Object.entries(other).forEach(([key, {
      css: css2
    }]) => {
      var _a2, _b2;
      const cssColorSheme = (_b2 = (_a2 = colorSchemes[key]) == null ? void 0 : _a2.palette) == null ? void 0 : _b2.mode;
      const finalCss = !disableCssColorScheme && cssColorSheme ? {
        colorScheme: cssColorSheme,
        ...css2
      } : {
        ...css2
      };
      insertStyleSheet(getSelector(key, {
        ...finalCss
      }), finalCss);
    });
    return stylesheets;
  };
  return {
    vars: themeVars,
    generateThemeVars,
    generateStyleSheets
  };
}
var prepareCssVars_default;
var init_prepareCssVars = __esm({
  "node_modules/@mui/system/cssVars/prepareCssVars.js"() {
    init_deepmerge2();
    init_cssVarsParser();
    prepareCssVars_default = prepareCssVars;
  }
});

// node_modules/@mui/system/cssVars/getColorSchemeSelector.js
function createGetColorSchemeSelector(selector) {
  return function getColorSchemeSelector(colorScheme) {
    if (selector === "media") {
      if (true) {
        if (colorScheme !== "light" && colorScheme !== "dark") {
          console.error(`MUI: @media (prefers-color-scheme) supports only 'light' or 'dark', but receive '${colorScheme}'.`);
        }
      }
      return `@media (prefers-color-scheme: ${colorScheme})`;
    }
    if (selector) {
      if (selector.startsWith("data-") && !selector.includes("%s")) {
        return `[${selector}="${colorScheme}"] &`;
      }
      if (selector === "class") {
        return `.${colorScheme} &`;
      }
      if (selector === "data") {
        return `[data-${colorScheme}] &`;
      }
      return `${selector.replace("%s", colorScheme)} &`;
    }
    return "&";
  };
}
var init_getColorSchemeSelector = __esm({
  "node_modules/@mui/system/cssVars/getColorSchemeSelector.js"() {
  }
});

// node_modules/@mui/system/cssVars/createCssVarsTheme.js
var init_createCssVarsTheme = __esm({
  "node_modules/@mui/system/cssVars/createCssVarsTheme.js"() {
    init_prepareCssVars();
    init_getColorSchemeSelector();
    init_InitColorSchemeScript();
  }
});

// node_modules/@mui/system/version/index.js
var major, minor, patch, preReleaseNumber;
var init_version = __esm({
  "node_modules/@mui/system/version/index.js"() {
    major = Number("6");
    minor = Number("0");
    patch = Number("0");
    preReleaseNumber = Number(void 0) || null;
  }
});

// node_modules/@mui/system/Container/createContainer.js
function createContainer(options = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent,
    useThemeProps: useThemeProps2 = useThemePropsDefault,
    componentName = "MuiContainer"
  } = options;
  const ContainerRoot = createStyledComponent(({
    theme,
    ownerState
  }) => ({
    width: "100%",
    marginLeft: "auto",
    boxSizing: "border-box",
    marginRight: "auto",
    ...!ownerState.disableGutters && {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      // @ts-ignore module augmentation fails if custom breakpoints are used
      [theme.breakpoints.up("sm")]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
      }
    }
  }), ({
    theme,
    ownerState
  }) => ownerState.fixed && Object.keys(theme.breakpoints.values).reduce((acc, breakpointValueKey) => {
    const breakpoint = breakpointValueKey;
    const value = theme.breakpoints.values[breakpoint];
    if (value !== 0) {
      acc[theme.breakpoints.up(breakpoint)] = {
        maxWidth: `${value}${theme.breakpoints.unit}`
      };
    }
    return acc;
  }, {}), ({
    theme,
    ownerState
  }) => ({
    // @ts-ignore module augmentation fails if custom breakpoints are used
    ...ownerState.maxWidth === "xs" && {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      [theme.breakpoints.up("xs")]: {
        // @ts-ignore module augmentation fails if custom breakpoints are used
        maxWidth: Math.max(theme.breakpoints.values.xs, 444)
      }
    },
    ...ownerState.maxWidth && // @ts-ignore module augmentation fails if custom breakpoints are used
    ownerState.maxWidth !== "xs" && {
      // @ts-ignore module augmentation fails if custom breakpoints are used
      [theme.breakpoints.up(ownerState.maxWidth)]: {
        // @ts-ignore module augmentation fails if custom breakpoints are used
        maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}`
      }
    }
  }));
  const Container2 = React27.forwardRef(function Container3(inProps, ref) {
    const props = useThemeProps2(inProps);
    const {
      className,
      component = "div",
      disableGutters = false,
      fixed = false,
      maxWidth: maxWidth2 = "lg",
      classes: classesProp,
      ...other
    } = props;
    const ownerState = {
      ...props,
      component,
      disableGutters,
      fixed,
      maxWidth: maxWidth2
    };
    const classes = useUtilityClasses(ownerState, componentName);
    return (
      // @ts-ignore theme is injected by the styled util
      (0, import_jsx_runtime11.jsx)(ContainerRoot, {
        as: component,
        ownerState,
        className: clsx_default2(classes.root, className),
        ref,
        ...other
      })
    );
  });
  true ? Container2.propTypes = {
    children: import_prop_types15.default.node,
    classes: import_prop_types15.default.object,
    className: import_prop_types15.default.string,
    component: import_prop_types15.default.elementType,
    disableGutters: import_prop_types15.default.bool,
    fixed: import_prop_types15.default.bool,
    maxWidth: import_prop_types15.default.oneOfType([import_prop_types15.default.oneOf(["xs", "sm", "md", "lg", "xl", false]), import_prop_types15.default.string]),
    sx: import_prop_types15.default.oneOfType([import_prop_types15.default.arrayOf(import_prop_types15.default.oneOfType([import_prop_types15.default.func, import_prop_types15.default.object, import_prop_types15.default.bool])), import_prop_types15.default.func, import_prop_types15.default.object])
  } : void 0;
  return Container2;
}
var React27, import_prop_types15, import_jsx_runtime11, defaultTheme, defaultCreateStyledComponent, useThemePropsDefault, useUtilityClasses;
var init_createContainer = __esm({
  "node_modules/@mui/system/Container/createContainer.js"() {
    React27 = __toESM(require_react());
    import_prop_types15 = __toESM(require_prop_types());
    init_clsx2();
    init_generateUtilityClass2();
    init_composeClasses2();
    init_capitalize2();
    init_useThemeProps2();
    init_styled2();
    init_createTheme2();
    import_jsx_runtime11 = __toESM(require_jsx_runtime());
    defaultTheme = createTheme_default();
    defaultCreateStyledComponent = styled_default("div", {
      name: "MuiContainer",
      slot: "Root",
      overridesResolver: (props, styles) => {
        const {
          ownerState
        } = props;
        return [styles.root, styles[`maxWidth${capitalize(String(ownerState.maxWidth))}`], ownerState.fixed && styles.fixed, ownerState.disableGutters && styles.disableGutters];
      }
    });
    useThemePropsDefault = (inProps) => useThemeProps({
      props: inProps,
      name: "MuiContainer",
      defaultTheme
    });
    useUtilityClasses = (ownerState, componentName) => {
      const getContainerUtilityClass = (slot) => {
        return generateUtilityClass(componentName, slot);
      };
      const {
        classes,
        fixed,
        disableGutters,
        maxWidth: maxWidth2
      } = ownerState;
      const slots = {
        root: ["root", maxWidth2 && `maxWidth${capitalize(String(maxWidth2))}`, fixed && "fixed", disableGutters && "disableGutters"]
      };
      return composeClasses(slots, getContainerUtilityClass, classes);
    };
  }
});

// node_modules/@mui/system/Container/Container.js
var import_prop_types16, Container;
var init_Container = __esm({
  "node_modules/@mui/system/Container/Container.js"() {
    "use client";
    import_prop_types16 = __toESM(require_prop_types());
    init_createContainer();
    Container = createContainer();
    true ? Container.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * @ignore
       */
      children: import_prop_types16.default.node,
      /**
       * Override or extend the styles applied to the component.
       */
      classes: import_prop_types16.default.object,
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: import_prop_types16.default.elementType,
      /**
       * If `true`, the left and right padding is removed.
       * @default false
       */
      disableGutters: import_prop_types16.default.bool,
      /**
       * Set the max-width to match the min-width of the current breakpoint.
       * This is useful if you'd prefer to design for a fixed set of sizes
       * instead of trying to accommodate a fully fluid viewport.
       * It's fluid by default.
       * @default false
       */
      fixed: import_prop_types16.default.bool,
      /**
       * Determine the max-width of the container.
       * The container width grows with the size of the screen.
       * Set to `false` to disable `maxWidth`.
       * @default 'lg'
       */
      maxWidth: import_prop_types16.default.oneOfType([import_prop_types16.default.oneOf(["xs", "sm", "md", "lg", "xl", false]), import_prop_types16.default.string]),
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx: import_prop_types16.default.oneOfType([import_prop_types16.default.arrayOf(import_prop_types16.default.oneOfType([import_prop_types16.default.func, import_prop_types16.default.object, import_prop_types16.default.bool])), import_prop_types16.default.func, import_prop_types16.default.object])
    } : void 0;
  }
});

// node_modules/@mui/system/Container/containerClasses.js
var containerClasses;
var init_containerClasses = __esm({
  "node_modules/@mui/system/Container/containerClasses.js"() {
    init_generateUtilityClasses2();
    init_generateUtilityClass2();
    containerClasses = generateUtilityClasses("MuiContainer", ["root", "disableGutters", "fixed", "maxWidthXs", "maxWidthSm", "maxWidthMd", "maxWidthLg", "maxWidthXl"]);
  }
});

// node_modules/@mui/system/Container/index.js
var init_Container2 = __esm({
  "node_modules/@mui/system/Container/index.js"() {
    "use client";
    init_Container();
    init_containerClasses();
    init_containerClasses();
  }
});

// node_modules/@mui/system/Grid/traverseBreakpoints.js
var filterBreakpointKeys, traverseBreakpoints;
var init_traverseBreakpoints = __esm({
  "node_modules/@mui/system/Grid/traverseBreakpoints.js"() {
    filterBreakpointKeys = (breakpointsKeys, responsiveKeys) => breakpointsKeys.filter((key) => responsiveKeys.includes(key));
    traverseBreakpoints = (breakpoints, responsive, iterator) => {
      const smallestBreakpoint = breakpoints.keys[0];
      if (Array.isArray(responsive)) {
        responsive.forEach((breakpointValue, index) => {
          iterator((responsiveStyles, style4) => {
            if (index <= breakpoints.keys.length - 1) {
              if (index === 0) {
                Object.assign(responsiveStyles, style4);
              } else {
                responsiveStyles[breakpoints.up(breakpoints.keys[index])] = style4;
              }
            }
          }, breakpointValue);
        });
      } else if (responsive && typeof responsive === "object") {
        const keys = Object.keys(responsive).length > breakpoints.keys.length ? breakpoints.keys : filterBreakpointKeys(breakpoints.keys, Object.keys(responsive));
        keys.forEach((key) => {
          if (breakpoints.keys.includes(key)) {
            const breakpointValue = responsive[key];
            if (breakpointValue !== void 0) {
              iterator((responsiveStyles, style4) => {
                if (smallestBreakpoint === key) {
                  Object.assign(responsiveStyles, style4);
                } else {
                  responsiveStyles[breakpoints.up(key)] = style4;
                }
              }, breakpointValue);
            }
          }
        });
      } else if (typeof responsive === "number" || typeof responsive === "string") {
        iterator((responsiveStyles, style4) => {
          Object.assign(responsiveStyles, style4);
        }, responsive);
      }
    };
  }
});

// node_modules/@mui/system/Grid/gridGenerator.js
function appendLevel(level) {
  if (!level) {
    return "";
  }
  return `Level${level}`;
}
function isNestedContainer(ownerState) {
  return ownerState.unstable_level > 0 && ownerState.container;
}
function createGetSelfSpacing(ownerState) {
  return function getSelfSpacing(axis) {
    return `var(--Grid-${axis}Spacing${appendLevel(ownerState.unstable_level)})`;
  };
}
function createGetParentSpacing(ownerState) {
  return function getParentSpacing(axis) {
    if (ownerState.unstable_level === 0) {
      return `var(--Grid-${axis}Spacing)`;
    }
    return `var(--Grid-${axis}Spacing${appendLevel(ownerState.unstable_level - 1)})`;
  };
}
function getParentColumns(ownerState) {
  if (ownerState.unstable_level === 0) {
    return `var(--Grid-columns)`;
  }
  return `var(--Grid-columns${appendLevel(ownerState.unstable_level - 1)})`;
}
var generateGridSizeStyles, generateGridOffsetStyles, generateGridColumnsStyles, generateGridRowSpacingStyles, generateGridColumnSpacingStyles, generateGridDirectionStyles, generateGridStyles, generateSizeClassNames, generateSpacingClassNames, generateDirectionClasses;
var init_gridGenerator = __esm({
  "node_modules/@mui/system/Grid/gridGenerator.js"() {
    init_traverseBreakpoints();
    generateGridSizeStyles = ({
      theme,
      ownerState
    }) => {
      const getParentSpacing = createGetParentSpacing(ownerState);
      const styles = {};
      traverseBreakpoints(theme.breakpoints, ownerState.size, (appendStyle, value) => {
        let style4 = {};
        if (value === "grow") {
          style4 = {
            flexBasis: 0,
            flexGrow: 1,
            maxWidth: "100%"
          };
        }
        if (value === "auto") {
          style4 = {
            flexBasis: "auto",
            flexGrow: 0,
            flexShrink: 0,
            maxWidth: "none",
            width: "auto"
          };
        }
        if (typeof value === "number") {
          style4 = {
            flexGrow: 0,
            flexBasis: "auto",
            width: `calc(100% * ${value} / ${getParentColumns(ownerState)} - (${getParentColumns(ownerState)} - ${value}) * (${getParentSpacing("column")} / ${getParentColumns(ownerState)}))`
          };
        }
        appendStyle(styles, style4);
      });
      return styles;
    };
    generateGridOffsetStyles = ({
      theme,
      ownerState
    }) => {
      const getParentSpacing = createGetParentSpacing(ownerState);
      const styles = {};
      traverseBreakpoints(theme.breakpoints, ownerState.offset, (appendStyle, value) => {
        let style4 = {};
        if (value === "auto") {
          style4 = {
            marginLeft: "auto"
          };
        }
        if (typeof value === "number") {
          style4 = {
            marginLeft: value === 0 ? "0px" : `calc(100% * ${value} / ${getParentColumns(ownerState)} + ${getParentSpacing("column")} * ${value} / ${getParentColumns(ownerState)})`
          };
        }
        appendStyle(styles, style4);
      });
      return styles;
    };
    generateGridColumnsStyles = ({
      theme,
      ownerState
    }) => {
      if (!ownerState.container) {
        return {};
      }
      const styles = isNestedContainer(ownerState) ? {
        [`--Grid-columns${appendLevel(ownerState.unstable_level)}`]: getParentColumns(ownerState)
      } : {
        "--Grid-columns": 12
      };
      traverseBreakpoints(theme.breakpoints, ownerState.columns, (appendStyle, value) => {
        appendStyle(styles, {
          [`--Grid-columns${appendLevel(ownerState.unstable_level)}`]: value
        });
      });
      return styles;
    };
    generateGridRowSpacingStyles = ({
      theme,
      ownerState
    }) => {
      if (!ownerState.container) {
        return {};
      }
      const getParentSpacing = createGetParentSpacing(ownerState);
      const styles = isNestedContainer(ownerState) ? {
        // Set the default spacing as its parent spacing.
        // It will be overridden if spacing props are provided
        [`--Grid-rowSpacing${appendLevel(ownerState.unstable_level)}`]: getParentSpacing("row")
      } : {};
      traverseBreakpoints(theme.breakpoints, ownerState.rowSpacing, (appendStyle, value) => {
        var _a;
        appendStyle(styles, {
          [`--Grid-rowSpacing${appendLevel(ownerState.unstable_level)}`]: typeof value === "string" ? value : (_a = theme.spacing) == null ? void 0 : _a.call(theme, value)
        });
      });
      return styles;
    };
    generateGridColumnSpacingStyles = ({
      theme,
      ownerState
    }) => {
      if (!ownerState.container) {
        return {};
      }
      const getParentSpacing = createGetParentSpacing(ownerState);
      const styles = isNestedContainer(ownerState) ? {
        // Set the default spacing as its parent spacing.
        // It will be overridden if spacing props are provided
        [`--Grid-columnSpacing${appendLevel(ownerState.unstable_level)}`]: getParentSpacing("column")
      } : {};
      traverseBreakpoints(theme.breakpoints, ownerState.columnSpacing, (appendStyle, value) => {
        var _a;
        appendStyle(styles, {
          [`--Grid-columnSpacing${appendLevel(ownerState.unstable_level)}`]: typeof value === "string" ? value : (_a = theme.spacing) == null ? void 0 : _a.call(theme, value)
        });
      });
      return styles;
    };
    generateGridDirectionStyles = ({
      theme,
      ownerState
    }) => {
      if (!ownerState.container) {
        return {};
      }
      const styles = {};
      traverseBreakpoints(theme.breakpoints, ownerState.direction, (appendStyle, value) => {
        appendStyle(styles, {
          flexDirection: value
        });
      });
      return styles;
    };
    generateGridStyles = ({
      ownerState
    }) => {
      const getSelfSpacing = createGetSelfSpacing(ownerState);
      return {
        minWidth: 0,
        boxSizing: "border-box",
        ...ownerState.container && {
          display: "flex",
          flexWrap: "wrap",
          ...ownerState.wrap && ownerState.wrap !== "wrap" && {
            flexWrap: ownerState.wrap
          },
          gap: `${getSelfSpacing("row")} ${getSelfSpacing("column")}`
        }
      };
    };
    generateSizeClassNames = (size) => {
      const classNames = [];
      Object.entries(size).forEach(([key, value]) => {
        if (value !== false && value !== void 0) {
          classNames.push(`grid-${key}-${String(value)}`);
        }
      });
      return classNames;
    };
    generateSpacingClassNames = (spacing2, smallestBreakpoint = "xs") => {
      function isValidSpacing(val) {
        if (val === void 0) {
          return false;
        }
        return typeof val === "string" && !Number.isNaN(Number(val)) || typeof val === "number" && val > 0;
      }
      if (isValidSpacing(spacing2)) {
        return [`spacing-${smallestBreakpoint}-${String(spacing2)}`];
      }
      if (typeof spacing2 === "object" && !Array.isArray(spacing2)) {
        const classNames = [];
        Object.entries(spacing2).forEach(([key, value]) => {
          if (isValidSpacing(value)) {
            classNames.push(`spacing-${key}-${String(value)}`);
          }
        });
        return classNames;
      }
      return [];
    };
    generateDirectionClasses = (direction) => {
      if (direction === void 0) {
        return [];
      }
      if (typeof direction === "object") {
        return Object.entries(direction).map(([key, value]) => `direction-${key}-${value}`);
      }
      return [`direction-xs-${String(direction)}`];
    };
  }
});

// node_modules/@mui/system/Grid/createGrid.js
function useThemePropsDefault2(props) {
  return useThemeProps({
    props,
    name: "MuiGrid",
    defaultTheme: defaultTheme2
  });
}
function createGrid(options = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent2,
    useThemeProps: useThemeProps2 = useThemePropsDefault2,
    componentName = "MuiGrid"
  } = options;
  const useUtilityClasses2 = (ownerState, theme) => {
    const {
      container,
      direction,
      spacing: spacing2,
      wrap,
      size
    } = ownerState;
    const slots = {
      root: ["root", container && "container", wrap !== "wrap" && `wrap-xs-${String(wrap)}`, ...generateDirectionClasses(direction), ...generateSizeClassNames(size), ...container ? generateSpacingClassNames(spacing2, theme.breakpoints.keys[0]) : []]
    };
    return composeClasses(slots, (slot) => generateUtilityClass(componentName, slot), {});
  };
  function parseResponsiveProp(propValue, breakpoints, shouldUseValue = () => true) {
    const parsedProp = {};
    if (propValue === null) {
      return parsedProp;
    }
    if (Array.isArray(propValue)) {
      propValue.forEach((value, index) => {
        if (value !== null && shouldUseValue(value) && breakpoints.keys[index]) {
          parsedProp[breakpoints.keys[index]] = value;
        }
      });
    } else if (typeof propValue === "object") {
      Object.keys(propValue).forEach((key) => {
        const value = propValue[key];
        if (value !== null && value !== void 0 && shouldUseValue(value)) {
          parsedProp[key] = value;
        }
      });
    } else {
      parsedProp[breakpoints.keys[0]] = propValue;
    }
    return parsedProp;
  }
  const GridRoot = createStyledComponent(generateGridColumnsStyles, generateGridColumnSpacingStyles, generateGridRowSpacingStyles, generateGridSizeStyles, generateGridDirectionStyles, generateGridStyles, generateGridOffsetStyles);
  const Grid2 = React28.forwardRef(function Grid3(inProps, ref) {
    const theme = useTheme_default();
    const themeProps = useThemeProps2(inProps);
    const props = extendSxProp(themeProps);
    const {
      className,
      children,
      columns: columnsProp = 12,
      container = false,
      component = "div",
      direction = "row",
      wrap = "wrap",
      size: sizeProp = {},
      offset: offsetProp = {},
      spacing: spacingProp = 0,
      rowSpacing: rowSpacingProp = spacingProp,
      columnSpacing: columnSpacingProp = spacingProp,
      unstable_level: level = 0,
      ...other
    } = props;
    const size = parseResponsiveProp(sizeProp, theme.breakpoints, (val) => val !== false);
    const offset = parseResponsiveProp(offsetProp, theme.breakpoints);
    const columns = inProps.columns ?? (level ? void 0 : columnsProp);
    const spacing2 = inProps.spacing ?? (level ? void 0 : spacingProp);
    const rowSpacing = inProps.rowSpacing ?? inProps.spacing ?? (level ? void 0 : rowSpacingProp);
    const columnSpacing = inProps.columnSpacing ?? inProps.spacing ?? (level ? void 0 : columnSpacingProp);
    const ownerState = {
      ...props,
      level,
      columns,
      container,
      direction,
      wrap,
      spacing: spacing2,
      rowSpacing,
      columnSpacing,
      size,
      offset
    };
    const classes = useUtilityClasses2(ownerState, theme);
    return (0, import_jsx_runtime12.jsx)(GridRoot, {
      ref,
      as: component,
      ownerState,
      className: clsx_default2(classes.root, className),
      ...other,
      children: React28.Children.map(children, (child) => {
        var _a;
        if (React28.isValidElement(child) && isMuiElement(child, ["Grid"])) {
          return React28.cloneElement(child, {
            unstable_level: ((_a = child.props) == null ? void 0 : _a.unstable_level) ?? level + 1
          });
        }
        return child;
      })
    });
  });
  true ? Grid2.propTypes = {
    children: import_prop_types17.default.node,
    className: import_prop_types17.default.string,
    columns: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.number), import_prop_types17.default.number, import_prop_types17.default.object]),
    columnSpacing: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.number, import_prop_types17.default.string])), import_prop_types17.default.number, import_prop_types17.default.object, import_prop_types17.default.string]),
    component: import_prop_types17.default.elementType,
    container: import_prop_types17.default.bool,
    direction: import_prop_types17.default.oneOfType([import_prop_types17.default.oneOf(["column-reverse", "column", "row-reverse", "row"]), import_prop_types17.default.arrayOf(import_prop_types17.default.oneOf(["column-reverse", "column", "row-reverse", "row"])), import_prop_types17.default.object]),
    offset: import_prop_types17.default.oneOfType([import_prop_types17.default.string, import_prop_types17.default.number, import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.string, import_prop_types17.default.number])), import_prop_types17.default.object]),
    rowSpacing: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.number, import_prop_types17.default.string])), import_prop_types17.default.number, import_prop_types17.default.object, import_prop_types17.default.string]),
    size: import_prop_types17.default.oneOfType([import_prop_types17.default.string, import_prop_types17.default.bool, import_prop_types17.default.number, import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.string, import_prop_types17.default.bool, import_prop_types17.default.number])), import_prop_types17.default.object]),
    spacing: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.number, import_prop_types17.default.string])), import_prop_types17.default.number, import_prop_types17.default.object, import_prop_types17.default.string]),
    sx: import_prop_types17.default.oneOfType([import_prop_types17.default.arrayOf(import_prop_types17.default.oneOfType([import_prop_types17.default.func, import_prop_types17.default.object, import_prop_types17.default.bool])), import_prop_types17.default.func, import_prop_types17.default.object]),
    wrap: import_prop_types17.default.oneOf(["nowrap", "wrap-reverse", "wrap"])
  } : void 0;
  Grid2.muiName = "Grid";
  return Grid2;
}
var React28, import_prop_types17, import_jsx_runtime12, defaultTheme2, defaultCreateStyledComponent2;
var init_createGrid = __esm({
  "node_modules/@mui/system/Grid/createGrid.js"() {
    React28 = __toESM(require_react());
    import_prop_types17 = __toESM(require_prop_types());
    init_clsx2();
    init_isMuiElement2();
    init_generateUtilityClass2();
    init_composeClasses2();
    init_styled2();
    init_useThemeProps2();
    init_useTheme2();
    init_styleFunctionSx2();
    init_createTheme2();
    init_gridGenerator();
    import_jsx_runtime12 = __toESM(require_jsx_runtime());
    defaultTheme2 = createTheme_default();
    defaultCreateStyledComponent2 = styled_default("div", {
      name: "MuiGrid",
      slot: "Root",
      overridesResolver: (props, styles) => styles.root
    });
  }
});

// node_modules/@mui/system/Grid/Grid.js
var import_prop_types18, Grid;
var init_Grid = __esm({
  "node_modules/@mui/system/Grid/Grid.js"() {
    "use client";
    import_prop_types18 = __toESM(require_prop_types());
    init_createGrid();
    Grid = createGrid();
    true ? Grid.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * The content of the component.
       */
      children: import_prop_types18.default.node,
      /**
       * The number of columns.
       * @default 12
       */
      columns: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.number), import_prop_types18.default.number, import_prop_types18.default.object]),
      /**
       * Defines the horizontal space between the type `item` components.
       * It overrides the value of the `spacing` prop.
       */
      columnSpacing: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.number, import_prop_types18.default.string])), import_prop_types18.default.number, import_prop_types18.default.object, import_prop_types18.default.string]),
      /**
       * If `true`, the component will have the flex *container* behavior.
       * You should be wrapping *items* with a *container*.
       * @default false
       */
      container: import_prop_types18.default.bool,
      /**
       * Defines the `flex-direction` style property.
       * It is applied for all screen sizes.
       * @default 'row'
       */
      direction: import_prop_types18.default.oneOfType([import_prop_types18.default.oneOf(["column-reverse", "column", "row-reverse", "row"]), import_prop_types18.default.arrayOf(import_prop_types18.default.oneOf(["column-reverse", "column", "row-reverse", "row"])), import_prop_types18.default.object]),
      /**
       * Defines the offset value for the type `item` components.
       */
      offset: import_prop_types18.default.oneOfType([import_prop_types18.default.string, import_prop_types18.default.number, import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.string, import_prop_types18.default.number])), import_prop_types18.default.object]),
      /**
       * Defines the vertical space between the type `item` components.
       * It overrides the value of the `spacing` prop.
       */
      rowSpacing: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.number, import_prop_types18.default.string])), import_prop_types18.default.number, import_prop_types18.default.object, import_prop_types18.default.string]),
      /**
       * Defines the size of the the type `item` components.
       */
      size: import_prop_types18.default.oneOfType([import_prop_types18.default.string, import_prop_types18.default.bool, import_prop_types18.default.number, import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.string, import_prop_types18.default.bool, import_prop_types18.default.number])), import_prop_types18.default.object]),
      /**
       * Defines the space between the type `item` components.
       * It can only be used on a type `container` component.
       * @default 0
       */
      spacing: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.number, import_prop_types18.default.string])), import_prop_types18.default.number, import_prop_types18.default.object, import_prop_types18.default.string]),
      /**
       * @ignore
       */
      sx: import_prop_types18.default.oneOfType([import_prop_types18.default.arrayOf(import_prop_types18.default.oneOfType([import_prop_types18.default.func, import_prop_types18.default.object, import_prop_types18.default.bool])), import_prop_types18.default.func, import_prop_types18.default.object]),
      /**
       * @internal
       * The level of the grid starts from `0`
       * and increases when the grid nests inside another grid regardless of container or item.
       *
       * ```js
       * <Grid> // level 0
       *   <Grid> // level 1
       *     <Grid> // level 2
       *   <Grid> // level 1
       * ```
       *
       * Only consecutive grid is considered nesting.
       * A grid container will start at `0` if there are non-Grid element above it.
       *
       * ```js
       * <Grid> // level 0
       *   <div>
       *     <Grid> // level 0
       *       <Grid> // level 1
       * ```
       */
      unstable_level: import_prop_types18.default.number,
      /**
       * Defines the `flex-wrap` style property.
       * It's applied for all screen sizes.
       * @default 'wrap'
       */
      wrap: import_prop_types18.default.oneOf(["nowrap", "wrap-reverse", "wrap"])
    } : void 0;
  }
});

// node_modules/@mui/system/Grid/GridProps.js
var init_GridProps = __esm({
  "node_modules/@mui/system/Grid/GridProps.js"() {
  }
});

// node_modules/@mui/system/Grid/gridClasses.js
var SPACINGS, DIRECTIONS, WRAPS, GRID_SIZES, gridClasses;
var init_gridClasses = __esm({
  "node_modules/@mui/system/Grid/gridClasses.js"() {
    init_generateUtilityClasses2();
    init_generateUtilityClass2();
    SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    DIRECTIONS = ["column-reverse", "column", "row-reverse", "row"];
    WRAPS = ["nowrap", "wrap-reverse", "wrap"];
    GRID_SIZES = ["auto", "grow", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    gridClasses = generateUtilityClasses("MuiGrid", [
      "root",
      "container",
      "item",
      // spacings
      ...SPACINGS.map((spacing2) => `spacing-xs-${spacing2}`),
      // direction values
      ...DIRECTIONS.map((direction) => `direction-xs-${direction}`),
      // wrap values
      ...WRAPS.map((wrap) => `wrap-xs-${wrap}`),
      // grid sizes for all breakpoints
      ...GRID_SIZES.map((size) => `grid-xs-${size}`),
      ...GRID_SIZES.map((size) => `grid-sm-${size}`),
      ...GRID_SIZES.map((size) => `grid-md-${size}`),
      ...GRID_SIZES.map((size) => `grid-lg-${size}`),
      ...GRID_SIZES.map((size) => `grid-xl-${size}`)
    ]);
  }
});

// node_modules/@mui/system/Grid/index.js
var init_Grid2 = __esm({
  "node_modules/@mui/system/Grid/index.js"() {
    "use client";
    init_Grid();
    init_createGrid();
    init_GridProps();
    init_gridClasses();
    init_gridClasses();
    init_traverseBreakpoints();
  }
});

// node_modules/@mui/system/Stack/createStack.js
function useThemePropsDefault3(props) {
  return useThemeProps({
    props,
    name: "MuiStack",
    defaultTheme: defaultTheme3
  });
}
function joinChildren(children, separator) {
  const childrenArray = React29.Children.toArray(children).filter(Boolean);
  return childrenArray.reduce((output, child, index) => {
    output.push(child);
    if (index < childrenArray.length - 1) {
      output.push(React29.cloneElement(separator, {
        key: `separator-${index}`
      }));
    }
    return output;
  }, []);
}
function createStack(options = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent3,
    useThemeProps: useThemeProps2 = useThemePropsDefault3,
    componentName = "MuiStack"
  } = options;
  const useUtilityClasses2 = () => {
    const slots = {
      root: ["root"]
    };
    return composeClasses(slots, (slot) => generateUtilityClass(componentName, slot), {});
  };
  const StackRoot = createStyledComponent(style3);
  const Stack2 = React29.forwardRef(function Grid2(inProps, ref) {
    const themeProps = useThemeProps2(inProps);
    const props = extendSxProp(themeProps);
    const {
      component = "div",
      direction = "column",
      spacing: spacing2 = 0,
      divider,
      children,
      className,
      useFlexGap = false,
      ...other
    } = props;
    const ownerState = {
      direction,
      spacing: spacing2,
      useFlexGap
    };
    const classes = useUtilityClasses2();
    return (0, import_jsx_runtime13.jsx)(StackRoot, {
      as: component,
      ownerState,
      ref,
      className: clsx_default2(classes.root, className),
      ...other,
      children: divider ? joinChildren(children, divider) : children
    });
  });
  true ? Stack2.propTypes = {
    children: import_prop_types19.default.node,
    direction: import_prop_types19.default.oneOfType([import_prop_types19.default.oneOf(["column-reverse", "column", "row-reverse", "row"]), import_prop_types19.default.arrayOf(import_prop_types19.default.oneOf(["column-reverse", "column", "row-reverse", "row"])), import_prop_types19.default.object]),
    divider: import_prop_types19.default.node,
    spacing: import_prop_types19.default.oneOfType([import_prop_types19.default.arrayOf(import_prop_types19.default.oneOfType([import_prop_types19.default.number, import_prop_types19.default.string])), import_prop_types19.default.number, import_prop_types19.default.object, import_prop_types19.default.string]),
    sx: import_prop_types19.default.oneOfType([import_prop_types19.default.arrayOf(import_prop_types19.default.oneOfType([import_prop_types19.default.func, import_prop_types19.default.object, import_prop_types19.default.bool])), import_prop_types19.default.func, import_prop_types19.default.object])
  } : void 0;
  return Stack2;
}
var React29, import_prop_types19, import_jsx_runtime13, defaultTheme3, defaultCreateStyledComponent3, getSideFromDirection, style3;
var init_createStack = __esm({
  "node_modules/@mui/system/Stack/createStack.js"() {
    React29 = __toESM(require_react());
    import_prop_types19 = __toESM(require_prop_types());
    init_clsx2();
    init_deepmerge2();
    init_generateUtilityClass2();
    init_composeClasses2();
    init_styled2();
    init_useThemeProps2();
    init_styleFunctionSx2();
    init_createTheme2();
    init_breakpoints2();
    init_spacing2();
    import_jsx_runtime13 = __toESM(require_jsx_runtime());
    defaultTheme3 = createTheme_default();
    defaultCreateStyledComponent3 = styled_default("div", {
      name: "MuiStack",
      slot: "Root",
      overridesResolver: (props, styles) => styles.root
    });
    getSideFromDirection = (direction) => {
      return {
        row: "Left",
        "row-reverse": "Right",
        column: "Top",
        "column-reverse": "Bottom"
      }[direction];
    };
    style3 = ({
      ownerState,
      theme
    }) => {
      let styles = {
        display: "flex",
        flexDirection: "column",
        ...handleBreakpoints({
          theme
        }, resolveBreakpointValues({
          values: ownerState.direction,
          breakpoints: theme.breakpoints.values
        }), (propValue) => ({
          flexDirection: propValue
        }))
      };
      if (ownerState.spacing) {
        const transformer = createUnarySpacing(theme);
        const base = Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
          if (typeof ownerState.spacing === "object" && ownerState.spacing[breakpoint] != null || typeof ownerState.direction === "object" && ownerState.direction[breakpoint] != null) {
            acc[breakpoint] = true;
          }
          return acc;
        }, {});
        const directionValues = resolveBreakpointValues({
          values: ownerState.direction,
          base
        });
        const spacingValues = resolveBreakpointValues({
          values: ownerState.spacing,
          base
        });
        if (typeof directionValues === "object") {
          Object.keys(directionValues).forEach((breakpoint, index, breakpoints) => {
            const directionValue = directionValues[breakpoint];
            if (!directionValue) {
              const previousDirectionValue = index > 0 ? directionValues[breakpoints[index - 1]] : "column";
              directionValues[breakpoint] = previousDirectionValue;
            }
          });
        }
        const styleFromPropValue = (propValue, breakpoint) => {
          if (ownerState.useFlexGap) {
            return {
              gap: getValue(transformer, propValue)
            };
          }
          return {
            // The useFlexGap={false} implement relies on each child to give up control of the margin.
            // We need to reset the margin to avoid double spacing.
            "& > :not(style):not(style)": {
              margin: 0
            },
            "& > :not(style) ~ :not(style)": {
              [`margin${getSideFromDirection(breakpoint ? directionValues[breakpoint] : ownerState.direction)}`]: getValue(transformer, propValue)
            }
          };
        };
        styles = deepmerge(styles, handleBreakpoints({
          theme
        }, spacingValues, styleFromPropValue));
      }
      styles = mergeBreakpointsInOrder(theme.breakpoints, styles);
      return styles;
    };
  }
});

// node_modules/@mui/system/Stack/Stack.js
var import_prop_types20, Stack;
var init_Stack = __esm({
  "node_modules/@mui/system/Stack/Stack.js"() {
    "use client";
    import_prop_types20 = __toESM(require_prop_types());
    init_createStack();
    Stack = createStack();
    true ? Stack.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * The content of the component.
       */
      children: import_prop_types20.default.node,
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: import_prop_types20.default.elementType,
      /**
       * Defines the `flex-direction` style property.
       * It is applied for all screen sizes.
       * @default 'column'
       */
      direction: import_prop_types20.default.oneOfType([import_prop_types20.default.oneOf(["column-reverse", "column", "row-reverse", "row"]), import_prop_types20.default.arrayOf(import_prop_types20.default.oneOf(["column-reverse", "column", "row-reverse", "row"])), import_prop_types20.default.object]),
      /**
       * Add an element between each child.
       */
      divider: import_prop_types20.default.node,
      /**
       * Defines the space between immediate children.
       * @default 0
       */
      spacing: import_prop_types20.default.oneOfType([import_prop_types20.default.arrayOf(import_prop_types20.default.oneOfType([import_prop_types20.default.number, import_prop_types20.default.string])), import_prop_types20.default.number, import_prop_types20.default.object, import_prop_types20.default.string]),
      /**
       * The system prop, which allows defining system overrides as well as additional CSS styles.
       */
      sx: import_prop_types20.default.oneOfType([import_prop_types20.default.arrayOf(import_prop_types20.default.oneOfType([import_prop_types20.default.func, import_prop_types20.default.object, import_prop_types20.default.bool])), import_prop_types20.default.func, import_prop_types20.default.object]),
      /**
       * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
       *
       * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
       * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
       *
       * To enable this flag globally, follow the theme's default props configuration.
       * @default false
       */
      useFlexGap: import_prop_types20.default.bool
    } : void 0;
  }
});

// node_modules/@mui/system/Stack/StackProps.js
var init_StackProps = __esm({
  "node_modules/@mui/system/Stack/StackProps.js"() {
  }
});

// node_modules/@mui/system/Stack/stackClasses.js
var stackClasses;
var init_stackClasses = __esm({
  "node_modules/@mui/system/Stack/stackClasses.js"() {
    init_generateUtilityClasses2();
    init_generateUtilityClass2();
    stackClasses = generateUtilityClasses("MuiStack", ["root"]);
  }
});

// node_modules/@mui/system/Stack/index.js
var init_Stack2 = __esm({
  "node_modules/@mui/system/Stack/index.js"() {
    "use client";
    init_Stack();
    init_createStack();
    init_StackProps();
    init_stackClasses();
    init_stackClasses();
  }
});

// node_modules/@mui/system/index.js
var init_system = __esm({
  "node_modules/@mui/system/index.js"() {
    init_formatMuiErrorMessage2();
    init_styled_engine();
    init_GlobalStyles4();
    init_borders2();
    init_borders2();
    init_breakpoints2();
    init_cssContainerQueries2();
    init_breakpoints2();
    init_compose2();
    init_display2();
    init_flexbox2();
    init_flexbox2();
    init_cssGrid2();
    init_cssGrid2();
    init_palette2();
    init_palette2();
    init_positions2();
    init_positions2();
    init_shadows2();
    init_sizing2();
    init_sizing2();
    init_spacing2();
    init_spacing2();
    init_style2();
    init_typography2();
    init_typography2();
    init_styleFunctionSx2();
    init_getThemeValue2();
    init_Box2();
    init_createBox2();
    init_createStyled2();
    init_createStyled2();
    init_styled2();
    init_createTheme2();
    init_createBreakpoints();
    init_createSpacing();
    init_shape();
    init_useThemeProps2();
    init_useTheme2();
    init_useThemeWithoutDefault2();
    init_useMediaQuery2();
    init_colorManipulator2();
    init_ThemeProvider4();
    init_createCssVarsProvider();
    init_createGetCssVar();
    init_cssVarsParser();
    init_prepareCssVars();
    init_createCssVarsTheme();
    init_responsivePropType2();
    init_RtlProvider();
    init_RtlProvider();
    init_version();
    init_createContainer();
    init_Container2();
    init_Container2();
    init_Grid();
    init_Grid2();
    init_Stack();
    init_Stack2();
  }
});

// node_modules/@mui/material/styles/createMixins.js
function createMixins(breakpoints, mixins) {
  return {
    toolbar: {
      minHeight: 56,
      [breakpoints.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [breakpoints.up("sm")]: {
        minHeight: 64
      }
    },
    ...mixins
  };
}
var init_createMixins = __esm({
  "node_modules/@mui/material/styles/createMixins.js"() {
  }
});

// node_modules/@mui/material/styles/createTypography.js
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
function createTypography(palette2, typography2) {
  const {
    fontFamily: fontFamily2 = defaultFontFamily,
    // The default font size of the Material Specification.
    fontSize: fontSize2 = 14,
    // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 16,
    // Apply the CSS properties to all the variants.
    allVariants,
    pxToRem: pxToRem2,
    ...other
  } = typeof typography2 === "function" ? typography2(palette2) : typography2;
  if (true) {
    if (typeof fontSize2 !== "number") {
      console.error("MUI: `fontSize` is required to be a number.");
    }
    if (typeof htmlFontSize !== "number") {
      console.error("MUI: `htmlFontSize` is required to be a number.");
    }
  }
  const coef = fontSize2 / 14;
  const pxToRem = pxToRem2 || ((size) => `${size / htmlFontSize * coef}rem`);
  const buildVariant = (fontWeight2, size, lineHeight2, letterSpacing2, casing) => ({
    fontFamily: fontFamily2,
    fontWeight: fontWeight2,
    fontSize: pxToRem(size),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: lineHeight2,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...fontFamily2 === defaultFontFamily ? {
      letterSpacing: `${round(letterSpacing2 / size)}em`
    } : {},
    ...casing,
    ...allVariants
  });
  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return deepmerge({
    htmlFontSize,
    pxToRem,
    fontFamily: fontFamily2,
    fontSize: fontSize2,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
    ...variants
  }, other, {
    clone: false
    // No need to clone deep
  });
}
var caseAllCaps, defaultFontFamily;
var init_createTypography = __esm({
  "node_modules/@mui/material/styles/createTypography.js"() {
    init_deepmerge2();
    caseAllCaps = {
      textTransform: "uppercase"
    };
    defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
  }
});

// node_modules/@mui/material/styles/createTransitions.js
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}
function getAutoHeightDuration(height2) {
  if (!height2) {
    return 0;
  }
  const constant = height2 / 36;
  return Math.min(Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10), 3e3);
}
function createTransitions(inputTransitions) {
  const mergedEasing = {
    ...easing,
    ...inputTransitions.easing
  };
  const mergedDuration = {
    ...duration,
    ...inputTransitions.duration
  };
  const create = (props = ["all"], options = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0,
      ...other
    } = options;
    if (true) {
      const isString = (value) => typeof value === "string";
      const isNumber = (value) => !Number.isNaN(parseFloat(value));
      if (!isString(props) && !Array.isArray(props)) {
        console.error('MUI: Argument "props" must be a string or Array.');
      }
      if (!isNumber(durationOption) && !isString(durationOption)) {
        console.error(`MUI: Argument "duration" must be a number or a string but found ${durationOption}.`);
      }
      if (!isString(easingOption)) {
        console.error('MUI: Argument "easing" must be a string.');
      }
      if (!isNumber(delay) && !isString(delay)) {
        console.error('MUI: Argument "delay" must be a number or a string.');
      }
      if (typeof options !== "object") {
        console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join("\n"));
      }
      if (Object.keys(other).length !== 0) {
        console.error(`MUI: Unrecognized argument(s) [${Object.keys(other).join(",")}].`);
      }
    }
    return (Array.isArray(props) ? props : [props]).map((animatedProp) => `${animatedProp} ${typeof durationOption === "string" ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === "string" ? delay : formatMs(delay)}`).join(",");
  };
  return {
    getAutoHeightDuration,
    create,
    ...inputTransitions,
    easing: mergedEasing,
    duration: mergedDuration
  };
}
var easing, duration;
var init_createTransitions = __esm({
  "node_modules/@mui/material/styles/createTransitions.js"() {
    easing = {
      // This is the most common easing curve.
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
    };
    duration = {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195
    };
  }
});

// node_modules/@mui/material/colors/common.js
var common, common_default;
var init_common = __esm({
  "node_modules/@mui/material/colors/common.js"() {
    common = {
      black: "#000",
      white: "#fff"
    };
    common_default = common;
  }
});

// node_modules/@mui/material/colors/grey.js
var grey, grey_default;
var init_grey = __esm({
  "node_modules/@mui/material/colors/grey.js"() {
    grey = {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161"
    };
    grey_default = grey;
  }
});

// node_modules/@mui/material/colors/purple.js
var purple, purple_default;
var init_purple = __esm({
  "node_modules/@mui/material/colors/purple.js"() {
    purple = {
      50: "#f3e5f5",
      100: "#e1bee7",
      200: "#ce93d8",
      300: "#ba68c8",
      400: "#ab47bc",
      500: "#9c27b0",
      600: "#8e24aa",
      700: "#7b1fa2",
      800: "#6a1b9a",
      900: "#4a148c",
      A100: "#ea80fc",
      A200: "#e040fb",
      A400: "#d500f9",
      A700: "#aa00ff"
    };
    purple_default = purple;
  }
});

// node_modules/@mui/material/colors/red.js
var red, red_default;
var init_red = __esm({
  "node_modules/@mui/material/colors/red.js"() {
    red = {
      50: "#ffebee",
      100: "#ffcdd2",
      200: "#ef9a9a",
      300: "#e57373",
      400: "#ef5350",
      500: "#f44336",
      600: "#e53935",
      700: "#d32f2f",
      800: "#c62828",
      900: "#b71c1c",
      A100: "#ff8a80",
      A200: "#ff5252",
      A400: "#ff1744",
      A700: "#d50000"
    };
    red_default = red;
  }
});

// node_modules/@mui/material/colors/orange.js
var orange, orange_default;
var init_orange = __esm({
  "node_modules/@mui/material/colors/orange.js"() {
    orange = {
      50: "#fff3e0",
      100: "#ffe0b2",
      200: "#ffcc80",
      300: "#ffb74d",
      400: "#ffa726",
      500: "#ff9800",
      600: "#fb8c00",
      700: "#f57c00",
      800: "#ef6c00",
      900: "#e65100",
      A100: "#ffd180",
      A200: "#ffab40",
      A400: "#ff9100",
      A700: "#ff6d00"
    };
    orange_default = orange;
  }
});

// node_modules/@mui/material/colors/blue.js
var blue, blue_default;
var init_blue = __esm({
  "node_modules/@mui/material/colors/blue.js"() {
    blue = {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3",
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
      A100: "#82b1ff",
      A200: "#448aff",
      A400: "#2979ff",
      A700: "#2962ff"
    };
    blue_default = blue;
  }
});

// node_modules/@mui/material/colors/lightBlue.js
var lightBlue, lightBlue_default;
var init_lightBlue = __esm({
  "node_modules/@mui/material/colors/lightBlue.js"() {
    lightBlue = {
      50: "#e1f5fe",
      100: "#b3e5fc",
      200: "#81d4fa",
      300: "#4fc3f7",
      400: "#29b6f6",
      500: "#03a9f4",
      600: "#039be5",
      700: "#0288d1",
      800: "#0277bd",
      900: "#01579b",
      A100: "#80d8ff",
      A200: "#40c4ff",
      A400: "#00b0ff",
      A700: "#0091ea"
    };
    lightBlue_default = lightBlue;
  }
});

// node_modules/@mui/material/colors/green.js
var green, green_default;
var init_green = __esm({
  "node_modules/@mui/material/colors/green.js"() {
    green = {
      50: "#e8f5e9",
      100: "#c8e6c9",
      200: "#a5d6a7",
      300: "#81c784",
      400: "#66bb6a",
      500: "#4caf50",
      600: "#43a047",
      700: "#388e3c",
      800: "#2e7d32",
      900: "#1b5e20",
      A100: "#b9f6ca",
      A200: "#69f0ae",
      A400: "#00e676",
      A700: "#00c853"
    };
    green_default = green;
  }
});

// node_modules/@mui/material/styles/createPalette.js
function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === "light") {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === "dark") {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}
function getDefaultPrimary(mode = "light") {
  if (mode === "dark") {
    return {
      main: blue_default[200],
      light: blue_default[50],
      dark: blue_default[400]
    };
  }
  return {
    main: blue_default[700],
    light: blue_default[400],
    dark: blue_default[800]
  };
}
function getDefaultSecondary(mode = "light") {
  if (mode === "dark") {
    return {
      main: purple_default[200],
      light: purple_default[50],
      dark: purple_default[400]
    };
  }
  return {
    main: purple_default[500],
    light: purple_default[300],
    dark: purple_default[700]
  };
}
function getDefaultError(mode = "light") {
  if (mode === "dark") {
    return {
      main: red_default[500],
      light: red_default[300],
      dark: red_default[700]
    };
  }
  return {
    main: red_default[700],
    light: red_default[400],
    dark: red_default[800]
  };
}
function getDefaultInfo(mode = "light") {
  if (mode === "dark") {
    return {
      main: lightBlue_default[400],
      light: lightBlue_default[300],
      dark: lightBlue_default[700]
    };
  }
  return {
    main: lightBlue_default[700],
    light: lightBlue_default[500],
    dark: lightBlue_default[900]
  };
}
function getDefaultSuccess(mode = "light") {
  if (mode === "dark") {
    return {
      main: green_default[400],
      light: green_default[300],
      dark: green_default[700]
    };
  }
  return {
    main: green_default[800],
    light: green_default[500],
    dark: green_default[900]
  };
}
function getDefaultWarning(mode = "light") {
  if (mode === "dark") {
    return {
      main: orange_default[400],
      light: orange_default[300],
      dark: orange_default[700]
    };
  }
  return {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: orange_default[500],
    dark: orange_default[900]
  };
}
function createPalette(palette2) {
  const {
    mode = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2,
    ...other
  } = palette2;
  const primary = palette2.primary || getDefaultPrimary(mode);
  const secondary = palette2.secondary || getDefaultSecondary(mode);
  const error = palette2.error || getDefaultError(mode);
  const info = palette2.info || getDefaultInfo(mode);
  const success = palette2.success || getDefaultSuccess(mode);
  const warning = palette2.warning || getDefaultWarning(mode);
  function getContrastText(background) {
    const contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    if (true) {
      const contrast = getContrastRatio(background, contrastText);
      if (contrast < 3) {
        console.error([`MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join("\n"));
      }
    }
    return contrastText;
  }
  const augmentColor = ({
    color: color2,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color2 = {
      ...color2
    };
    if (!color2.main && color2[mainShade]) {
      color2.main = color2[mainShade];
    }
    if (!color2.hasOwnProperty("main")) {
      throw new Error(true ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${mainShade}\` property.` : formatMuiErrorMessage(11, name ? ` (${name})` : "", mainShade));
    }
    if (typeof color2.main !== "string") {
      throw new Error(true ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(color2.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : formatMuiErrorMessage(12, name ? ` (${name})` : "", JSON.stringify(color2.main)));
    }
    addLightOrDark(color2, "light", lightShade, tonalOffset);
    addLightOrDark(color2, "dark", darkShade, tonalOffset);
    if (!color2.contrastText) {
      color2.contrastText = getContrastText(color2.main);
    }
    return color2;
  };
  const modes = {
    dark,
    light
  };
  if (true) {
    if (!modes[mode]) {
      console.error(`MUI: The palette mode \`${mode}\` is not supported.`);
    }
  }
  const paletteOutput = deepmerge({
    // A collection of common colors.
    common: {
      ...common_default
    },
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode,
    // The colors used to represent primary interface elements for a user.
    primary: augmentColor({
      color: primary,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: augmentColor({
      color: secondary,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: augmentColor({
      color: error,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: augmentColor({
      color: warning,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: augmentColor({
      color: info,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: augmentColor({
      color: success,
      name: "success"
    }),
    // The grey colors.
    grey: grey_default,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText,
    // Generate a rich color object.
    augmentColor,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset,
    // The light and dark mode object.
    ...modes[mode]
  }, other);
  return paletteOutput;
}
var light, dark;
var init_createPalette = __esm({
  "node_modules/@mui/material/styles/createPalette.js"() {
    init_formatMuiErrorMessage2();
    init_deepmerge2();
    init_colorManipulator2();
    init_common();
    init_grey();
    init_purple();
    init_red();
    init_orange();
    init_blue();
    init_lightBlue();
    init_green();
    light = {
      // The colors used to style the text.
      text: {
        // The most important text.
        primary: "rgba(0, 0, 0, 0.87)",
        // Secondary text.
        secondary: "rgba(0, 0, 0, 0.6)",
        // Disabled text have even lower visual prominence.
        disabled: "rgba(0, 0, 0, 0.38)"
      },
      // The color used to divide different elements.
      divider: "rgba(0, 0, 0, 0.12)",
      // The background colors used to style the surfaces.
      // Consistency between these values is important.
      background: {
        paper: common_default.white,
        default: common_default.white
      },
      // The colors used to style the action elements.
      action: {
        // The color of an active action like an icon button.
        active: "rgba(0, 0, 0, 0.54)",
        // The color of an hovered action.
        hover: "rgba(0, 0, 0, 0.04)",
        hoverOpacity: 0.04,
        // The color of a selected action.
        selected: "rgba(0, 0, 0, 0.08)",
        selectedOpacity: 0.08,
        // The color of a disabled action.
        disabled: "rgba(0, 0, 0, 0.26)",
        // The background color of a disabled action.
        disabledBackground: "rgba(0, 0, 0, 0.12)",
        disabledOpacity: 0.38,
        focus: "rgba(0, 0, 0, 0.12)",
        focusOpacity: 0.12,
        activatedOpacity: 0.12
      }
    };
    dark = {
      text: {
        primary: common_default.white,
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.5)",
        icon: "rgba(255, 255, 255, 0.5)"
      },
      divider: "rgba(255, 255, 255, 0.12)",
      background: {
        paper: "#121212",
        default: "#121212"
      },
      action: {
        active: common_default.white,
        hover: "rgba(255, 255, 255, 0.08)",
        hoverOpacity: 0.08,
        selected: "rgba(255, 255, 255, 0.16)",
        selectedOpacity: 0.16,
        disabled: "rgba(255, 255, 255, 0.3)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        disabledOpacity: 0.38,
        focus: "rgba(255, 255, 255, 0.12)",
        focusOpacity: 0.12,
        activatedOpacity: 0.24
      }
    };
  }
});

// node_modules/@mui/material/styles/shadows.js
function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(",");
}
var shadowKeyUmbraOpacity, shadowKeyPenumbraOpacity, shadowAmbientShadowOpacity, shadows, shadows_default2;
var init_shadows3 = __esm({
  "node_modules/@mui/material/styles/shadows.js"() {
    shadowKeyUmbraOpacity = 0.2;
    shadowKeyPenumbraOpacity = 0.14;
    shadowAmbientShadowOpacity = 0.12;
    shadows = ["none", createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
    shadows_default2 = shadows;
  }
});

// node_modules/@mui/material/styles/zIndex.js
var zIndex2, zIndex_default;
var init_zIndex = __esm({
  "node_modules/@mui/material/styles/zIndex.js"() {
    zIndex2 = {
      mobileStepper: 1e3,
      fab: 1050,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500
    };
    zIndex_default = zIndex2;
  }
});

// node_modules/@mui/material/styles/createThemeNoVars.js
function createThemeNoVars(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput,
    mixins: mixinsInput = {},
    spacing: spacingInput,
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {},
    shape: shapeInput,
    ...other
  } = options;
  if (options.vars) {
    throw new Error(true ? `MUI: \`vars\` is a private field used for CSS variables support.
Please use another name.` : formatMuiErrorMessage(20));
  }
  const palette2 = createPalette(paletteInput);
  const systemTheme = createTheme_default(options);
  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette: palette2,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: shadows_default2.slice(),
    typography: createTypography(palette2, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: {
      ...zIndex_default
    }
  });
  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  if (true) {
    const stateClasses = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"];
    const traverse = (node, component) => {
      let key;
      for (key in node) {
        const child = node[key];
        if (stateClasses.includes(key) && Object.keys(child).length > 0) {
          if (true) {
            const stateClass = generateUtilityClass("", key);
            console.error([`MUI: The \`${component}\` component increases the CSS specificity of the \`${key}\` internal state.`, "You can not override it like this: ", JSON.stringify(node, null, 2), "", `Instead, you need to use the '&.${stateClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${stateClass}`]: child
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join("\n"));
          }
          node[key] = {};
        }
      }
    };
    Object.keys(muiTheme.components).forEach((component) => {
      const styleOverrides = muiTheme.components[component].styleOverrides;
      if (styleOverrides && component.startsWith("Mui")) {
        traverse(styleOverrides, component);
      }
    });
  }
  muiTheme.unstable_sxConfig = {
    ...defaultSxConfig_default,
    ...other == null ? void 0 : other.unstable_sxConfig
  };
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx_default({
      sx: props,
      theme: this
    });
  };
  return muiTheme;
}
function createMuiTheme(...args) {
  if (true) {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(["MUI: the createMuiTheme function was renamed to createTheme.", "", "You should use `import { createTheme } from '@mui/material/styles'`"].join("\n"));
    }
  }
  return createThemeNoVars(...args);
}
var warnedOnce, createThemeNoVars_default;
var init_createThemeNoVars = __esm({
  "node_modules/@mui/material/styles/createThemeNoVars.js"() {
    init_formatMuiErrorMessage2();
    init_deepmerge2();
    init_styleFunctionSx2();
    init_createTheme2();
    init_generateUtilityClass2();
    init_createMixins();
    init_createPalette();
    init_createTypography();
    init_shadows3();
    init_createTransitions();
    init_zIndex();
    warnedOnce = false;
    createThemeNoVars_default = createThemeNoVars;
  }
});

// node_modules/@mui/material/styles/getOverlayAlpha.js
function getOverlayAlpha(elevation) {
  let alphaValue;
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }
  return Math.round(alphaValue * 10) / 1e3;
}
var init_getOverlayAlpha = __esm({
  "node_modules/@mui/material/styles/getOverlayAlpha.js"() {
  }
});

// node_modules/@mui/material/styles/createColorScheme.js
function getOpacity(mode) {
  return {
    inputPlaceholder: mode === "dark" ? 0.5 : 0.42,
    inputUnderline: mode === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: mode === "dark" ? 0.2 : 0.12,
    switchTrack: mode === "dark" ? 0.3 : 0.38
  };
}
function getOverlays(mode) {
  return mode === "dark" ? defaultDarkOverlays : [];
}
function createColorScheme(options) {
  const {
    palette: paletteInput = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity,
    overlays,
    ...rest
  } = options;
  const palette2 = createPalette(paletteInput);
  return {
    palette: palette2,
    opacity: {
      ...getOpacity(palette2.mode),
      ...opacity
    },
    overlays: overlays || getOverlays(palette2.mode),
    ...rest
  };
}
var defaultDarkOverlays;
var init_createColorScheme = __esm({
  "node_modules/@mui/material/styles/createColorScheme.js"() {
    init_createPalette();
    init_getOverlayAlpha();
    defaultDarkOverlays = [...Array(25)].map((_, index) => {
      if (index === 0) {
        return void 0;
      }
      const overlay = getOverlayAlpha(index);
      return `linear-gradient(rgba(255 255 255 / ${overlay}), rgba(255 255 255 / ${overlay}))`;
    });
  }
});

// node_modules/@mui/material/styles/shouldSkipGeneratingVar.js
function shouldSkipGeneratingVar(keys) {
  var _a;
  return !!keys[0].match(/(cssVarPrefix|colorSchemeSelector|typography|mixins|breakpoints|direction|transitions)/) || !!keys[0].match(/sxConfig$/) || // ends with sxConfig
  keys[0] === "palette" && !!((_a = keys[1]) == null ? void 0 : _a.match(/(mode|contrastThreshold|tonalOffset)/));
}
var init_shouldSkipGeneratingVar = __esm({
  "node_modules/@mui/material/styles/shouldSkipGeneratingVar.js"() {
  }
});

// node_modules/@mui/material/styles/excludeVariablesFromRoot.js
var excludeVariablesFromRoot, excludeVariablesFromRoot_default;
var init_excludeVariablesFromRoot = __esm({
  "node_modules/@mui/material/styles/excludeVariablesFromRoot.js"() {
    excludeVariablesFromRoot = (cssVarPrefix) => [...[...Array(24)].map((_, index) => `--${cssVarPrefix ? `${cssVarPrefix}-` : ""}overlays-${index + 1}`), `--${cssVarPrefix ? `${cssVarPrefix}-` : ""}palette-AppBar-darkBg`, `--${cssVarPrefix ? `${cssVarPrefix}-` : ""}palette-AppBar-darkColor`];
    excludeVariablesFromRoot_default = excludeVariablesFromRoot;
  }
});

// node_modules/@mui/system/cssVars/prepareTypographyVars.js
function prepareTypographyVars(typography2) {
  const vars = {};
  const entries = Object.entries(typography2);
  entries.forEach((entry) => {
    const [key, value] = entry;
    if (typeof value === "object") {
      vars[key] = `${value.fontStyle ? `${value.fontStyle} ` : ""}${value.fontVariant ? `${value.fontVariant} ` : ""}${value.fontWeight ? `${value.fontWeight} ` : ""}${value.fontStretch ? `${value.fontStretch} ` : ""}${value.fontSize || ""}${value.lineHeight ? `/${value.lineHeight} ` : ""}${value.fontFamily || ""}`;
    }
  });
  return vars;
}
var init_prepareTypographyVars = __esm({
  "node_modules/@mui/system/cssVars/prepareTypographyVars.js"() {
  }
});

// node_modules/@mui/system/cssVars/index.js
var init_cssVars = __esm({
  "node_modules/@mui/system/cssVars/index.js"() {
    "use client";
    init_createCssVarsProvider();
    init_prepareCssVars();
    init_prepareTypographyVars();
    init_createCssVarsTheme();
    init_getColorSchemeSelector();
  }
});

// node_modules/@mui/material/styles/createGetSelector.js
var createGetSelector_default;
var init_createGetSelector = __esm({
  "node_modules/@mui/material/styles/createGetSelector.js"() {
    init_excludeVariablesFromRoot();
    createGetSelector_default = (theme) => (colorScheme, css2) => {
      const selector = theme.colorSchemeSelector;
      let rule = selector;
      if (selector === "class") {
        rule = ".%s";
      }
      if (selector === "data") {
        rule = "[data-%s]";
      }
      if ((selector == null ? void 0 : selector.startsWith("data-")) && !selector.includes("%s")) {
        rule = `[${selector}="%s"]`;
      }
      if (theme.defaultColorScheme === colorScheme) {
        if (colorScheme === "dark") {
          const excludedVariables = {};
          excludeVariablesFromRoot_default(theme.cssVarPrefix).forEach((cssVar) => {
            excludedVariables[cssVar] = css2[cssVar];
            delete css2[cssVar];
          });
          if (rule === "media") {
            return {
              ":root": css2,
              [`@media (prefers-color-scheme: dark)`]: {
                ":root": excludedVariables
              }
            };
          }
          if (rule) {
            return {
              [rule.replace("%s", colorScheme)]: excludedVariables,
              [`:root, ${rule.replace("%s", colorScheme)}`]: css2
            };
          }
          return {
            ":root": {
              ...css2,
              ...excludedVariables
            }
          };
        }
        if (rule && rule !== "media") {
          return `:root, ${rule.replace("%s", String(colorScheme))}`;
        }
      } else if (colorScheme) {
        if (rule === "media") {
          return {
            [`@media (prefers-color-scheme: ${String(colorScheme)})`]: {
              ":root": css2
            }
          };
        }
        if (rule) {
          return rule.replace("%s", String(colorScheme));
        }
      }
      return ":root";
    };
  }
});

// node_modules/@mui/material/styles/stringifyTheme.js
function isSerializable(val) {
  return isPlainObject(val) || typeof val === "undefined" || typeof val === "string" || typeof val === "boolean" || typeof val === "number" || Array.isArray(val);
}
function stringifyTheme(baseTheme = {}) {
  const serializableTheme = {
    ...baseTheme
  };
  function serializeTheme(object) {
    const array = Object.entries(object);
    for (let index = 0; index < array.length; index++) {
      const [key, value] = array[index];
      if (!isSerializable(value) || key.startsWith("unstable_")) {
        delete object[key];
      } else if (isPlainObject(value)) {
        object[key] = {
          ...value
        };
        serializeTheme(object[key]);
      }
    }
  }
  serializeTheme(serializableTheme);
  return `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(serializableTheme, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
var init_stringifyTheme = __esm({
  "node_modules/@mui/material/styles/stringifyTheme.js"() {
    init_deepmerge2();
  }
});

// node_modules/@mui/material/styles/createThemeWithVars.js
function assignNode(obj, keys) {
  keys.forEach((k) => {
    if (!obj[k]) {
      obj[k] = {};
    }
  });
}
function setColor(obj, key, defaultValue) {
  if (!obj[key] && defaultValue) {
    obj[key] = defaultValue;
  }
}
function toRgb(color2) {
  if (!color2 || !color2.startsWith("hsl")) {
    return color2;
  }
  return hslToRgb(color2);
}
function setColorChannel(obj, key) {
  if (!(`${key}Channel` in obj)) {
    obj[`${key}Channel`] = private_safeColorChannel(toRgb(obj[key]), `MUI: Can't create \`palette.${key}Channel\` because \`palette.${key}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${key}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`);
  }
}
function getSpacingVal(spacingInput) {
  if (typeof spacingInput === "number") {
    return `${spacingInput}px`;
  }
  if (typeof spacingInput === "string" || typeof spacingInput === "function" || Array.isArray(spacingInput)) {
    return spacingInput;
  }
  return "8px";
}
function attachColorScheme(colorSchemes, scheme, restTheme, colorScheme) {
  if (!scheme) {
    return void 0;
  }
  scheme = scheme === true ? {} : scheme;
  const mode = colorScheme === "dark" ? "dark" : "light";
  if (!restTheme) {
    colorSchemes[colorScheme] = createColorScheme({
      ...scheme,
      palette: {
        mode,
        ...scheme == null ? void 0 : scheme.palette
      }
    });
    return void 0;
  }
  const {
    palette: palette2,
    ...muiTheme
  } = createThemeNoVars_default({
    ...restTheme,
    palette: {
      mode,
      ...scheme == null ? void 0 : scheme.palette
    }
  });
  colorSchemes[colorScheme] = {
    ...scheme,
    palette: palette2,
    opacity: {
      ...getOpacity(mode),
      ...scheme == null ? void 0 : scheme.opacity
    },
    overlays: (scheme == null ? void 0 : scheme.overlays) || getOverlays(mode)
  };
  return muiTheme;
}
function createThemeWithVars(options = {}, ...args) {
  const {
    colorSchemes: colorSchemesInput = {
      light: true
    },
    defaultColorScheme: defaultColorSchemeInput,
    disableCssColorScheme = false,
    cssVarPrefix = "mui",
    shouldSkipGeneratingVar: shouldSkipGeneratingVar2 = shouldSkipGeneratingVar,
    colorSchemeSelector: selector = colorSchemesInput.light && colorSchemesInput.dark ? "media" : void 0,
    ...input
  } = options;
  const firstColorScheme = Object.keys(colorSchemesInput)[0];
  const defaultColorScheme = defaultColorSchemeInput || (colorSchemesInput.light && firstColorScheme !== "light" ? "light" : firstColorScheme);
  const getCssVar = createGetCssVar2(cssVarPrefix);
  const {
    [defaultColorScheme]: defaultSchemeInput,
    light: builtInLight,
    dark: builtInDark,
    ...customColorSchemes
  } = colorSchemesInput;
  const colorSchemes = {
    ...customColorSchemes
  };
  let defaultScheme = defaultSchemeInput;
  if (defaultColorScheme === "dark" && !("dark" in colorSchemesInput) || defaultColorScheme === "light" && !("light" in colorSchemesInput)) {
    defaultScheme = true;
  }
  if (!defaultScheme) {
    throw new Error(true ? `MUI: The \`colorSchemes.${defaultColorScheme}\` option is either missing or invalid.` : formatMuiErrorMessage(21, defaultColorScheme));
  }
  const muiTheme = attachColorScheme(colorSchemes, defaultScheme, input, defaultColorScheme);
  if (builtInLight && !colorSchemes.light) {
    attachColorScheme(colorSchemes, builtInLight, void 0, "light");
  }
  if (builtInDark && !colorSchemes.dark) {
    attachColorScheme(colorSchemes, builtInDark, void 0, "dark");
  }
  let theme = {
    defaultColorScheme,
    ...muiTheme,
    cssVarPrefix,
    colorSchemeSelector: selector,
    getCssVar,
    colorSchemes,
    font: {
      ...prepareTypographyVars(muiTheme.typography),
      ...muiTheme.font
    },
    spacing: getSpacingVal(input.spacing)
  };
  Object.keys(theme.colorSchemes).forEach((key) => {
    const palette2 = theme.colorSchemes[key].palette;
    const setCssVarColor = (cssVar) => {
      const tokens = cssVar.split("-");
      const color2 = tokens[1];
      const colorToken = tokens[2];
      return getCssVar(cssVar, palette2[color2][colorToken]);
    };
    if (palette2.mode === "light") {
      setColor(palette2.common, "background", "#fff");
      setColor(palette2.common, "onBackground", "#000");
    }
    if (palette2.mode === "dark") {
      setColor(palette2.common, "background", "#000");
      setColor(palette2.common, "onBackground", "#fff");
    }
    assignNode(palette2, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]);
    if (palette2.mode === "light") {
      setColor(palette2.Alert, "errorColor", private_safeDarken(palette2.error.light, 0.6));
      setColor(palette2.Alert, "infoColor", private_safeDarken(palette2.info.light, 0.6));
      setColor(palette2.Alert, "successColor", private_safeDarken(palette2.success.light, 0.6));
      setColor(palette2.Alert, "warningColor", private_safeDarken(palette2.warning.light, 0.6));
      setColor(palette2.Alert, "errorFilledBg", setCssVarColor("palette-error-main"));
      setColor(palette2.Alert, "infoFilledBg", setCssVarColor("palette-info-main"));
      setColor(palette2.Alert, "successFilledBg", setCssVarColor("palette-success-main"));
      setColor(palette2.Alert, "warningFilledBg", setCssVarColor("palette-warning-main"));
      setColor(palette2.Alert, "errorFilledColor", silent(() => palette2.getContrastText(palette2.error.main)));
      setColor(palette2.Alert, "infoFilledColor", silent(() => palette2.getContrastText(palette2.info.main)));
      setColor(palette2.Alert, "successFilledColor", silent(() => palette2.getContrastText(palette2.success.main)));
      setColor(palette2.Alert, "warningFilledColor", silent(() => palette2.getContrastText(palette2.warning.main)));
      setColor(palette2.Alert, "errorStandardBg", private_safeLighten(palette2.error.light, 0.9));
      setColor(palette2.Alert, "infoStandardBg", private_safeLighten(palette2.info.light, 0.9));
      setColor(palette2.Alert, "successStandardBg", private_safeLighten(palette2.success.light, 0.9));
      setColor(palette2.Alert, "warningStandardBg", private_safeLighten(palette2.warning.light, 0.9));
      setColor(palette2.Alert, "errorIconColor", setCssVarColor("palette-error-main"));
      setColor(palette2.Alert, "infoIconColor", setCssVarColor("palette-info-main"));
      setColor(palette2.Alert, "successIconColor", setCssVarColor("palette-success-main"));
      setColor(palette2.Alert, "warningIconColor", setCssVarColor("palette-warning-main"));
      setColor(palette2.AppBar, "defaultBg", setCssVarColor("palette-grey-100"));
      setColor(palette2.Avatar, "defaultBg", setCssVarColor("palette-grey-400"));
      setColor(palette2.Button, "inheritContainedBg", setCssVarColor("palette-grey-300"));
      setColor(palette2.Button, "inheritContainedHoverBg", setCssVarColor("palette-grey-A100"));
      setColor(palette2.Chip, "defaultBorder", setCssVarColor("palette-grey-400"));
      setColor(palette2.Chip, "defaultAvatarColor", setCssVarColor("palette-grey-700"));
      setColor(palette2.Chip, "defaultIconColor", setCssVarColor("palette-grey-700"));
      setColor(palette2.FilledInput, "bg", "rgba(0, 0, 0, 0.06)");
      setColor(palette2.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)");
      setColor(palette2.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)");
      setColor(palette2.LinearProgress, "primaryBg", private_safeLighten(palette2.primary.main, 0.62));
      setColor(palette2.LinearProgress, "secondaryBg", private_safeLighten(palette2.secondary.main, 0.62));
      setColor(palette2.LinearProgress, "errorBg", private_safeLighten(palette2.error.main, 0.62));
      setColor(palette2.LinearProgress, "infoBg", private_safeLighten(palette2.info.main, 0.62));
      setColor(palette2.LinearProgress, "successBg", private_safeLighten(palette2.success.main, 0.62));
      setColor(palette2.LinearProgress, "warningBg", private_safeLighten(palette2.warning.main, 0.62));
      setColor(palette2.Skeleton, "bg", `rgba(${setCssVarColor("palette-text-primaryChannel")} / 0.11)`);
      setColor(palette2.Slider, "primaryTrack", private_safeLighten(palette2.primary.main, 0.62));
      setColor(palette2.Slider, "secondaryTrack", private_safeLighten(palette2.secondary.main, 0.62));
      setColor(palette2.Slider, "errorTrack", private_safeLighten(palette2.error.main, 0.62));
      setColor(palette2.Slider, "infoTrack", private_safeLighten(palette2.info.main, 0.62));
      setColor(palette2.Slider, "successTrack", private_safeLighten(palette2.success.main, 0.62));
      setColor(palette2.Slider, "warningTrack", private_safeLighten(palette2.warning.main, 0.62));
      const snackbarContentBackground = private_safeEmphasize(palette2.background.default, 0.8);
      setColor(palette2.SnackbarContent, "bg", snackbarContentBackground);
      setColor(palette2.SnackbarContent, "color", silent(() => palette2.getContrastText(snackbarContentBackground)));
      setColor(palette2.SpeedDialAction, "fabHoverBg", private_safeEmphasize(palette2.background.paper, 0.15));
      setColor(palette2.StepConnector, "border", setCssVarColor("palette-grey-400"));
      setColor(palette2.StepContent, "border", setCssVarColor("palette-grey-400"));
      setColor(palette2.Switch, "defaultColor", setCssVarColor("palette-common-white"));
      setColor(palette2.Switch, "defaultDisabledColor", setCssVarColor("palette-grey-100"));
      setColor(palette2.Switch, "primaryDisabledColor", private_safeLighten(palette2.primary.main, 0.62));
      setColor(palette2.Switch, "secondaryDisabledColor", private_safeLighten(palette2.secondary.main, 0.62));
      setColor(palette2.Switch, "errorDisabledColor", private_safeLighten(palette2.error.main, 0.62));
      setColor(palette2.Switch, "infoDisabledColor", private_safeLighten(palette2.info.main, 0.62));
      setColor(palette2.Switch, "successDisabledColor", private_safeLighten(palette2.success.main, 0.62));
      setColor(palette2.Switch, "warningDisabledColor", private_safeLighten(palette2.warning.main, 0.62));
      setColor(palette2.TableCell, "border", private_safeLighten(private_safeAlpha(palette2.divider, 1), 0.88));
      setColor(palette2.Tooltip, "bg", private_safeAlpha(palette2.grey[700], 0.92));
    }
    if (palette2.mode === "dark") {
      setColor(palette2.Alert, "errorColor", private_safeLighten(palette2.error.light, 0.6));
      setColor(palette2.Alert, "infoColor", private_safeLighten(palette2.info.light, 0.6));
      setColor(palette2.Alert, "successColor", private_safeLighten(palette2.success.light, 0.6));
      setColor(palette2.Alert, "warningColor", private_safeLighten(palette2.warning.light, 0.6));
      setColor(palette2.Alert, "errorFilledBg", setCssVarColor("palette-error-dark"));
      setColor(palette2.Alert, "infoFilledBg", setCssVarColor("palette-info-dark"));
      setColor(palette2.Alert, "successFilledBg", setCssVarColor("palette-success-dark"));
      setColor(palette2.Alert, "warningFilledBg", setCssVarColor("palette-warning-dark"));
      setColor(palette2.Alert, "errorFilledColor", silent(() => palette2.getContrastText(palette2.error.dark)));
      setColor(palette2.Alert, "infoFilledColor", silent(() => palette2.getContrastText(palette2.info.dark)));
      setColor(palette2.Alert, "successFilledColor", silent(() => palette2.getContrastText(palette2.success.dark)));
      setColor(palette2.Alert, "warningFilledColor", silent(() => palette2.getContrastText(palette2.warning.dark)));
      setColor(palette2.Alert, "errorStandardBg", private_safeDarken(palette2.error.light, 0.9));
      setColor(palette2.Alert, "infoStandardBg", private_safeDarken(palette2.info.light, 0.9));
      setColor(palette2.Alert, "successStandardBg", private_safeDarken(palette2.success.light, 0.9));
      setColor(palette2.Alert, "warningStandardBg", private_safeDarken(palette2.warning.light, 0.9));
      setColor(palette2.Alert, "errorIconColor", setCssVarColor("palette-error-main"));
      setColor(palette2.Alert, "infoIconColor", setCssVarColor("palette-info-main"));
      setColor(palette2.Alert, "successIconColor", setCssVarColor("palette-success-main"));
      setColor(palette2.Alert, "warningIconColor", setCssVarColor("palette-warning-main"));
      setColor(palette2.AppBar, "defaultBg", setCssVarColor("palette-grey-900"));
      setColor(palette2.AppBar, "darkBg", setCssVarColor("palette-background-paper"));
      setColor(palette2.AppBar, "darkColor", setCssVarColor("palette-text-primary"));
      setColor(palette2.Avatar, "defaultBg", setCssVarColor("palette-grey-600"));
      setColor(palette2.Button, "inheritContainedBg", setCssVarColor("palette-grey-800"));
      setColor(palette2.Button, "inheritContainedHoverBg", setCssVarColor("palette-grey-700"));
      setColor(palette2.Chip, "defaultBorder", setCssVarColor("palette-grey-700"));
      setColor(palette2.Chip, "defaultAvatarColor", setCssVarColor("palette-grey-300"));
      setColor(palette2.Chip, "defaultIconColor", setCssVarColor("palette-grey-300"));
      setColor(palette2.FilledInput, "bg", "rgba(255, 255, 255, 0.09)");
      setColor(palette2.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)");
      setColor(palette2.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)");
      setColor(palette2.LinearProgress, "primaryBg", private_safeDarken(palette2.primary.main, 0.5));
      setColor(palette2.LinearProgress, "secondaryBg", private_safeDarken(palette2.secondary.main, 0.5));
      setColor(palette2.LinearProgress, "errorBg", private_safeDarken(palette2.error.main, 0.5));
      setColor(palette2.LinearProgress, "infoBg", private_safeDarken(palette2.info.main, 0.5));
      setColor(palette2.LinearProgress, "successBg", private_safeDarken(palette2.success.main, 0.5));
      setColor(palette2.LinearProgress, "warningBg", private_safeDarken(palette2.warning.main, 0.5));
      setColor(palette2.Skeleton, "bg", `rgba(${setCssVarColor("palette-text-primaryChannel")} / 0.13)`);
      setColor(palette2.Slider, "primaryTrack", private_safeDarken(palette2.primary.main, 0.5));
      setColor(palette2.Slider, "secondaryTrack", private_safeDarken(palette2.secondary.main, 0.5));
      setColor(palette2.Slider, "errorTrack", private_safeDarken(palette2.error.main, 0.5));
      setColor(palette2.Slider, "infoTrack", private_safeDarken(palette2.info.main, 0.5));
      setColor(palette2.Slider, "successTrack", private_safeDarken(palette2.success.main, 0.5));
      setColor(palette2.Slider, "warningTrack", private_safeDarken(palette2.warning.main, 0.5));
      const snackbarContentBackground = private_safeEmphasize(palette2.background.default, 0.98);
      setColor(palette2.SnackbarContent, "bg", snackbarContentBackground);
      setColor(palette2.SnackbarContent, "color", silent(() => palette2.getContrastText(snackbarContentBackground)));
      setColor(palette2.SpeedDialAction, "fabHoverBg", private_safeEmphasize(palette2.background.paper, 0.15));
      setColor(palette2.StepConnector, "border", setCssVarColor("palette-grey-600"));
      setColor(palette2.StepContent, "border", setCssVarColor("palette-grey-600"));
      setColor(palette2.Switch, "defaultColor", setCssVarColor("palette-grey-300"));
      setColor(palette2.Switch, "defaultDisabledColor", setCssVarColor("palette-grey-600"));
      setColor(palette2.Switch, "primaryDisabledColor", private_safeDarken(palette2.primary.main, 0.55));
      setColor(palette2.Switch, "secondaryDisabledColor", private_safeDarken(palette2.secondary.main, 0.55));
      setColor(palette2.Switch, "errorDisabledColor", private_safeDarken(palette2.error.main, 0.55));
      setColor(palette2.Switch, "infoDisabledColor", private_safeDarken(palette2.info.main, 0.55));
      setColor(palette2.Switch, "successDisabledColor", private_safeDarken(palette2.success.main, 0.55));
      setColor(palette2.Switch, "warningDisabledColor", private_safeDarken(palette2.warning.main, 0.55));
      setColor(palette2.TableCell, "border", private_safeDarken(private_safeAlpha(palette2.divider, 1), 0.68));
      setColor(palette2.Tooltip, "bg", private_safeAlpha(palette2.grey[700], 0.92));
    }
    setColorChannel(palette2.background, "default");
    setColorChannel(palette2.background, "paper");
    setColorChannel(palette2.common, "background");
    setColorChannel(palette2.common, "onBackground");
    setColorChannel(palette2, "divider");
    Object.keys(palette2).forEach((color2) => {
      const colors = palette2[color2];
      if (colors && typeof colors === "object") {
        if (colors.main) {
          setColor(palette2[color2], "mainChannel", private_safeColorChannel(toRgb(colors.main)));
        }
        if (colors.light) {
          setColor(palette2[color2], "lightChannel", private_safeColorChannel(toRgb(colors.light)));
        }
        if (colors.dark) {
          setColor(palette2[color2], "darkChannel", private_safeColorChannel(toRgb(colors.dark)));
        }
        if (colors.contrastText) {
          setColor(palette2[color2], "contrastTextChannel", private_safeColorChannel(toRgb(colors.contrastText)));
        }
        if (color2 === "text") {
          setColorChannel(palette2[color2], "primary");
          setColorChannel(palette2[color2], "secondary");
        }
        if (color2 === "action") {
          if (colors.active) {
            setColorChannel(palette2[color2], "active");
          }
          if (colors.selected) {
            setColorChannel(palette2[color2], "selected");
          }
        }
      }
    });
  });
  theme = args.reduce((acc, argument) => deepmerge(acc, argument), theme);
  const parserConfig = {
    prefix: cssVarPrefix,
    disableCssColorScheme,
    shouldSkipGeneratingVar: shouldSkipGeneratingVar2,
    getSelector: createGetSelector_default(theme)
  };
  const {
    vars,
    generateThemeVars,
    generateStyleSheets
  } = prepareCssVars_default(theme, parserConfig);
  theme.vars = vars;
  Object.entries(theme.colorSchemes[theme.defaultColorScheme]).forEach(([key, value]) => {
    theme[key] = value;
  });
  theme.generateThemeVars = generateThemeVars;
  theme.generateStyleSheets = generateStyleSheets;
  theme.generateSpacing = function generateSpacing() {
    return createSpacing(input.spacing, createUnarySpacing(this));
  };
  theme.getColorSchemeSelector = createGetColorSchemeSelector(selector);
  theme.spacing = theme.generateSpacing();
  theme.shouldSkipGeneratingVar = shouldSkipGeneratingVar2;
  theme.unstable_sxConfig = {
    ...defaultSxConfig_default,
    ...input == null ? void 0 : input.unstable_sxConfig
  };
  theme.unstable_sx = function sx(props) {
    return styleFunctionSx_default({
      sx: props,
      theme: this
    });
  };
  theme.toRuntimeSource = stringifyTheme;
  return theme;
}
var silent, createGetCssVar2;
var init_createThemeWithVars = __esm({
  "node_modules/@mui/material/styles/createThemeWithVars.js"() {
    init_formatMuiErrorMessage2();
    init_deepmerge2();
    init_system();
    init_spacing2();
    init_cssVars();
    init_styleFunctionSx2();
    init_colorManipulator2();
    init_createThemeNoVars();
    init_createColorScheme();
    init_shouldSkipGeneratingVar();
    init_createGetSelector();
    init_stringifyTheme();
    silent = (fn) => {
      try {
        return fn();
      } catch (error) {
      }
      return void 0;
    };
    createGetCssVar2 = (cssVarPrefix = "mui") => createGetCssVar(cssVarPrefix);
  }
});

// node_modules/@mui/material/styles/createTheme.js
function attachColorScheme2(theme, scheme, colorScheme) {
  if (!theme.colorSchemes) {
    return void 0;
  }
  if (colorScheme) {
    theme.colorSchemes[scheme] = {
      ...colorScheme !== true && colorScheme,
      palette: createPalette({
        ...colorScheme === true ? {} : colorScheme,
        mode: scheme
      })
      // cast type to skip module augmentation test
    };
  }
}
function createTheme2(options = {}, ...args) {
  const {
    palette: palette2,
    cssVariables = false,
    colorSchemes: initialColorSchemes = !palette2 ? {
      light: true
    } : void 0,
    defaultColorScheme: initialDefaultColorScheme = palette2 == null ? void 0 : palette2.mode,
    ...rest
  } = options;
  const defaultColorSchemeInput = initialDefaultColorScheme || "light";
  const defaultScheme = initialColorSchemes == null ? void 0 : initialColorSchemes[defaultColorSchemeInput];
  const colorSchemesInput = {
    ...initialColorSchemes,
    ...palette2 ? {
      [defaultColorSchemeInput]: {
        ...typeof defaultScheme !== "boolean" && defaultScheme,
        palette: palette2
      }
    } : void 0
  };
  if (cssVariables === false) {
    const theme = createThemeNoVars_default(options, ...args);
    if (!("colorSchemes" in options)) {
      return theme;
    }
    theme.defaultColorScheme = defaultColorSchemeInput;
    theme.colorSchemes = colorSchemesInput;
    if (theme.palette.mode === "light") {
      theme.colorSchemes.light = {
        palette: theme.palette
      };
      attachColorScheme2(theme, "dark", colorSchemesInput.dark);
    }
    if (theme.palette.mode === "dark") {
      theme.colorSchemes.dark = {
        palette: theme.palette
      };
      attachColorScheme2(theme, "light", colorSchemesInput.light);
    }
    return theme;
  }
  return createThemeWithVars({
    ...rest,
    colorSchemes: colorSchemesInput,
    defaultColorScheme: defaultColorSchemeInput,
    ...typeof cssVariables !== "boolean" && cssVariables
  }, ...args);
}
var init_createTheme3 = __esm({
  "node_modules/@mui/material/styles/createTheme.js"() {
    init_createPalette();
    init_createThemeWithVars();
    init_createThemeNoVars();
    init_createThemeNoVars();
  }
});

// node_modules/@mui/material/styles/identifier.js
var identifier_default;
var init_identifier = __esm({
  "node_modules/@mui/material/styles/identifier.js"() {
    identifier_default = "$$material";
  }
});

// node_modules/@mui/material/styles/defaultTheme.js
var defaultTheme4, defaultTheme_default;
var init_defaultTheme = __esm({
  "node_modules/@mui/material/styles/defaultTheme.js"() {
    "use client";
    init_createTheme3();
    defaultTheme4 = createTheme2();
    defaultTheme_default = defaultTheme4;
  }
});

// node_modules/@mui/material/styles/slotShouldForwardProp.js
function slotShouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
var slotShouldForwardProp_default;
var init_slotShouldForwardProp = __esm({
  "node_modules/@mui/material/styles/slotShouldForwardProp.js"() {
    slotShouldForwardProp_default = slotShouldForwardProp;
  }
});

// node_modules/@mui/material/styles/rootShouldForwardProp.js
var rootShouldForwardProp, rootShouldForwardProp_default;
var init_rootShouldForwardProp = __esm({
  "node_modules/@mui/material/styles/rootShouldForwardProp.js"() {
    init_slotShouldForwardProp();
    rootShouldForwardProp = (prop) => slotShouldForwardProp_default(prop) && prop !== "classes";
    rootShouldForwardProp_default = rootShouldForwardProp;
  }
});

// node_modules/@mui/material/styles/styled.js
var styled3, styled_default2;
var init_styled3 = __esm({
  "node_modules/@mui/material/styles/styled.js"() {
    "use client";
    init_createStyled2();
    init_defaultTheme();
    init_identifier();
    init_rootShouldForwardProp();
    init_slotShouldForwardProp();
    init_rootShouldForwardProp();
    styled3 = createStyled({
      themeId: identifier_default,
      defaultTheme: defaultTheme_default,
      rootShouldForwardProp: rootShouldForwardProp_default
    });
    styled_default2 = styled3;
  }
});

export {
  resolveProps,
  init_resolveProps2 as init_resolveProps,
  composeClasses,
  init_composeClasses2 as init_composeClasses,
  init_formatMuiErrorMessage2 as init_formatMuiErrorMessage,
  clamp_default,
  init_clamp2 as init_clamp,
  hexToRgb,
  decomposeColor,
  recomposeColor,
  rgbToHex,
  hslToRgb,
  getLuminance,
  getContrastRatio,
  alpha,
  darken,
  lighten,
  emphasize,
  init_colorManipulator2 as init_colorManipulator,
  slotShouldForwardProp_default,
  init_slotShouldForwardProp,
  rootShouldForwardProp_default,
  init_rootShouldForwardProp,
  capitalize,
  init_capitalize2 as init_capitalize,
  deepmerge,
  init_deepmerge2 as init_deepmerge,
  handleBreakpoints,
  resolveBreakpointValues,
  getPath,
  init_style2 as init_style,
  styleFunctionSx_default,
  extendSxProp,
  init_styleFunctionSx2 as init_styleFunctionSx,
  StyledEngineProvider,
  createBreakpoints,
  init_createBreakpoints,
  createSpacing,
  useTheme_default,
  GlobalStyles_default,
  ClassNameGenerator_default,
  createBox,
  generateUtilityClass,
  init_generateUtilityClass2 as init_generateUtilityClass,
  generateUtilityClasses,
  init_generateUtilityClasses2 as init_generateUtilityClasses,
  getDisplayName,
  init_getDisplayName2 as init_getDisplayName,
  getThemeProps,
  useThemeProps,
  init_useThemeProps2 as init_useThemeProps,
  useEnhancedEffect_default,
  init_useEnhancedEffect2 as init_useEnhancedEffect,
  useMediaQuery,
  init_useMediaQuery2 as init_useMediaQuery,
  chainPropTypes,
  init_chainPropTypes2 as init_chainPropTypes,
  elementAcceptingRef_default,
  init_elementAcceptingRef2 as init_elementAcceptingRef,
  elementTypeAcceptingRef_default,
  init_elementTypeAcceptingRef2 as init_elementTypeAcceptingRef,
  exactProp,
  init_exactProp2 as init_exactProp,
  HTMLElementType,
  init_HTMLElementType2 as init_HTMLElementType,
  refType_default,
  init_refType2 as init_refType,
  createChainedFunction,
  init_createChainedFunction2 as init_createChainedFunction,
  debounce,
  init_debounce2 as init_debounce,
  deprecatedPropType,
  init_deprecatedPropType2 as init_deprecatedPropType,
  isMuiElement,
  init_isMuiElement2 as init_isMuiElement,
  ownerDocument,
  init_ownerDocument2 as init_ownerDocument,
  ownerWindow,
  init_ownerWindow2 as init_ownerWindow,
  requirePropFactory,
  init_requirePropFactory2 as init_requirePropFactory,
  setRef,
  init_setRef2 as init_setRef,
  useId,
  init_useId2 as init_useId,
  unsupportedProp,
  init_unsupportedProp2 as init_unsupportedProp,
  useControlled,
  init_useControlled2 as init_useControlled,
  useEventCallback_default,
  init_useEventCallback2 as init_useEventCallback,
  useForkRef,
  init_useForkRef2 as init_useForkRef,
  useLazyRef,
  init_useLazyRef2 as init_useLazyRef,
  Timeout,
  useTimeout,
  init_useTimeout2 as init_useTimeout,
  isFocusVisible,
  init_isFocusVisible2 as init_isFocusVisible,
  getScrollbarSize,
  init_getScrollbarSize2 as init_getScrollbarSize,
  usePreviousProps_default,
  init_usePreviousProps2 as init_usePreviousProps,
  getValidReactChildren,
  init_getValidReactChildren2 as init_getValidReactChildren,
  visuallyHidden_default,
  init_visuallyHidden2 as init_visuallyHidden,
  integerPropType_default,
  init_integerPropType2 as init_integerPropType,
  appendOwnerState_default,
  init_appendOwnerState2 as init_appendOwnerState,
  extractEventHandlers_default,
  init_extractEventHandlers2 as init_extractEventHandlers,
  mergeSlotProps_default,
  init_mergeSlotProps2 as init_mergeSlotProps,
  resolveComponentProps_default,
  init_resolveComponentProps2 as init_resolveComponentProps,
  useSlotProps_default,
  init_useSlotProps2 as init_useSlotProps,
  getReactNodeRef,
  init_getReactNodeRef2 as init_getReactNodeRef,
  init_esm,
  useRtl,
  init_RtlProvider,
  useDefaultProps,
  DefaultPropsProvider_default,
  init_DefaultPropsProvider2 as init_DefaultPropsProvider,
  ThemeProvider_default2 as ThemeProvider_default,
  init_InitColorSchemeScript,
  createCssVarsProvider,
  createContainer,
  createGrid,
  init_Grid2 as init_Grid,
  createStack,
  init_system,
  common_default,
  init_common,
  grey_default,
  init_grey,
  purple_default,
  init_purple,
  red_default,
  init_red,
  orange_default,
  init_orange,
  blue_default,
  init_blue,
  lightBlue_default,
  init_lightBlue,
  green_default,
  init_green,
  createMixins,
  init_createMixins,
  createTypography,
  init_createTypography,
  easing,
  duration,
  createTransitions,
  init_createTransitions,
  createMuiTheme,
  getOverlayAlpha,
  init_getOverlayAlpha,
  createColorScheme,
  init_createColorScheme,
  shouldSkipGeneratingVar,
  init_shouldSkipGeneratingVar,
  excludeVariablesFromRoot_default,
  init_excludeVariablesFromRoot,
  createThemeWithVars,
  init_createThemeWithVars,
  createTheme2 as createTheme,
  init_createTheme3 as init_createTheme,
  defaultTheme_default,
  init_defaultTheme,
  identifier_default,
  init_identifier,
  styled_default2 as styled_default,
  init_styled3 as init_styled
};
/*! Bundled license information:

@mui/styled-engine/index.js:
  (**
   * @mui/styled-engine v6.0.0
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-is/cjs/react-is.development.js:
  (**
   * @license React
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@mui/private-theming/index.js:
  (**
   * @mui/private-theming v6.0.0
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@mui/system/index.js:
  (**
   * @mui/system v6.0.0
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=chunk-V2QKJW4U.js.map
