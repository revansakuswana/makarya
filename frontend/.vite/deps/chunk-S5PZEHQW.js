import {
  ToggleButtonGroupButtonContext_default,
  ToggleButtonGroupContext_default,
  toggleButtonClasses_default
} from "./chunk-YEGRTROP.js";
import {
  require_react_is
} from "./chunk-DDZ74HVY.js";
import {
  capitalize_default,
  init_capitalize
} from "./chunk-LLWTU43A.js";
import {
  init_memoTheme,
  memoTheme
} from "./chunk-RVYY5F7Q.js";
import {
  clsx_default,
  init_DefaultPropsProvider,
  init_clsx,
  init_zero_styled,
  useDefaultProps
} from "./chunk-CKZHEBLO.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  getValidReactChildren,
  init_composeClasses,
  init_generateUtilityClass,
  init_generateUtilityClasses,
  init_getValidReactChildren,
  styled_default
} from "./chunk-V2QKJW4U.js";
import {
  require_jsx_runtime
} from "./chunk-QGFLC4AF.js";
import {
  require_prop_types
} from "./chunk-EZSJO6EY.js";
import {
  require_react
} from "./chunk-L3FOL4I5.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js
var React = __toESM(require_react());
var import_react_is = __toESM(require_react_is());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_composeClasses();
init_getValidReactChildren();
init_zero_styled();
init_memoTheme();
init_DefaultPropsProvider();
init_capitalize();

// node_modules/@mui/material/ToggleButtonGroup/toggleButtonGroupClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getToggleButtonGroupUtilityClass(slot) {
  return generateUtilityClass("MuiToggleButtonGroup", slot);
}
var toggleButtonGroupClasses = generateUtilityClasses("MuiToggleButtonGroup", ["root", "selected", "horizontal", "vertical", "disabled", "grouped", "groupedHorizontal", "groupedVertical", "fullWidth", "firstButton", "lastButton", "middleButton"]);
var toggleButtonGroupClasses_default = toggleButtonGroupClasses;

// node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    orientation,
    fullWidth,
    disabled
  } = ownerState;
  const slots = {
    root: ["root", orientation, fullWidth && "fullWidth"],
    grouped: ["grouped", `grouped${capitalize_default(orientation)}`, disabled && "disabled"],
    firstButton: ["firstButton"],
    lastButton: ["lastButton"],
    middleButton: ["middleButton"]
  };
  return composeClasses(slots, getToggleButtonGroupUtilityClass, classes);
};
var ToggleButtonGroupRoot = styled_default("div", {
  name: "MuiToggleButtonGroup",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${toggleButtonGroupClasses_default.grouped}`]: styles.grouped
    }, {
      [`& .${toggleButtonGroupClasses_default.grouped}`]: styles[`grouped${capitalize_default(ownerState.orientation)}`]
    }, {
      [`& .${toggleButtonGroupClasses_default.firstButton}`]: styles.firstButton
    }, {
      [`& .${toggleButtonGroupClasses_default.lastButton}`]: styles.lastButton
    }, {
      [`& .${toggleButtonGroupClasses_default.middleButton}`]: styles.middleButton
    }, styles.root, ownerState.orientation === "vertical" && styles.vertical, ownerState.fullWidth && styles.fullWidth];
  }
})(memoTheme(({
  theme
}) => ({
  display: "inline-flex",
  borderRadius: (theme.vars || theme).shape.borderRadius,
  variants: [{
    props: {
      orientation: "vertical"
    },
    style: {
      flexDirection: "column",
      [`& .${toggleButtonGroupClasses_default.grouped}`]: {
        [`&.${toggleButtonGroupClasses_default.selected} + .${toggleButtonGroupClasses_default.grouped}.${toggleButtonGroupClasses_default.selected}`]: {
          borderTop: 0,
          marginTop: 0
        }
      },
      [`& .${toggleButtonGroupClasses_default.firstButton},& .${toggleButtonGroupClasses_default.middleButton}`]: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      },
      [`& .${toggleButtonGroupClasses_default.lastButton},& .${toggleButtonGroupClasses_default.middleButton}`]: {
        marginTop: -1,
        borderTop: "1px solid transparent",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
      },
      [`& .${toggleButtonGroupClasses_default.lastButton}.${toggleButtonClasses_default.disabled},& .${toggleButtonGroupClasses_default.middleButton}.${toggleButtonClasses_default.disabled}`]: {
        borderTop: "1px solid transparent"
      }
    }
  }, {
    props: {
      fullWidth: true
    },
    style: {
      width: "100%"
    }
  }, {
    props: {
      orientation: "horizontal"
    },
    style: {
      [`& .${toggleButtonGroupClasses_default.grouped}`]: {
        [`&.${toggleButtonGroupClasses_default.selected} + .${toggleButtonGroupClasses_default.grouped}.${toggleButtonGroupClasses_default.selected}`]: {
          borderLeft: 0,
          marginLeft: 0
        }
      },
      [`& .${toggleButtonGroupClasses_default.firstButton},& .${toggleButtonGroupClasses_default.middleButton}`]: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      },
      [`& .${toggleButtonGroupClasses_default.lastButton},& .${toggleButtonGroupClasses_default.middleButton}`]: {
        marginLeft: -1,
        borderLeft: "1px solid transparent",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
      },
      [`& .${toggleButtonGroupClasses_default.lastButton}.${toggleButtonClasses_default.disabled},& .${toggleButtonGroupClasses_default.middleButton}.${toggleButtonClasses_default.disabled}`]: {
        borderLeft: "1px solid transparent"
      }
    }
  }]
})));
var ToggleButtonGroup = React.forwardRef(function ToggleButtonGroup2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiToggleButtonGroup"
  });
  const {
    children,
    className,
    color = "standard",
    disabled = false,
    exclusive = false,
    fullWidth = false,
    onChange,
    orientation = "horizontal",
    size = "medium",
    value,
    ...other
  } = props;
  const ownerState = {
    ...props,
    disabled,
    fullWidth,
    orientation,
    size
  };
  const classes = useUtilityClasses(ownerState);
  const handleChange = React.useCallback((event, buttonValue) => {
    if (!onChange) {
      return;
    }
    const index = value && value.indexOf(buttonValue);
    let newValue;
    if (value && index >= 0) {
      newValue = value.slice();
      newValue.splice(index, 1);
    } else {
      newValue = value ? value.concat(buttonValue) : [buttonValue];
    }
    onChange(event, newValue);
  }, [onChange, value]);
  const handleExclusiveChange = React.useCallback((event, buttonValue) => {
    if (!onChange) {
      return;
    }
    onChange(event, value === buttonValue ? null : buttonValue);
  }, [onChange, value]);
  const context = React.useMemo(() => ({
    className: classes.grouped,
    onChange: exclusive ? handleExclusiveChange : handleChange,
    value,
    size,
    fullWidth,
    color,
    disabled
  }), [classes.grouped, exclusive, handleExclusiveChange, handleChange, value, size, fullWidth, color, disabled]);
  const validChildren = getValidReactChildren(children);
  const childrenCount = validChildren.length;
  const getButtonPositionClassName = (index) => {
    const isFirstButton = index === 0;
    const isLastButton = index === childrenCount - 1;
    if (isFirstButton && isLastButton) {
      return "";
    }
    if (isFirstButton) {
      return classes.firstButton;
    }
    if (isLastButton) {
      return classes.lastButton;
    }
    return classes.middleButton;
  };
  return (0, import_jsx_runtime.jsx)(ToggleButtonGroupRoot, {
    role: "group",
    className: clsx_default(classes.root, className),
    ref,
    ownerState,
    ...other,
    children: (0, import_jsx_runtime.jsx)(ToggleButtonGroupContext_default.Provider, {
      value: context,
      children: validChildren.map((child, index) => {
        if (true) {
          if ((0, import_react_is.isFragment)(child)) {
            console.error(["MUI: The ToggleButtonGroup component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
          }
        }
        return (0, import_jsx_runtime.jsx)(ToggleButtonGroupButtonContext_default.Provider, {
          value: getButtonPositionClassName(index),
          children: child
        }, index);
      })
    })
  });
});
true ? ToggleButtonGroup.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The color of the button when it is selected.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["standard", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types.default.string]),
  /**
   * If `true`, the component is disabled. This implies that all ToggleButton children will be disabled.
   * @default false
   */
  disabled: import_prop_types.default.bool,
  /**
   * If `true`, only allow one of the child ToggleButton values to be selected.
   * @default false
   */
  exclusive: import_prop_types.default.bool,
  /**
   * If `true`, the button group will take up the full width of its container.
   * @default false
   */
  fullWidth: import_prop_types.default.bool,
  /**
   * Callback fired when the value changes.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange: import_prop_types.default.func,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: import_prop_types.default.oneOf(["horizontal", "vertical"]),
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["small", "medium", "large"]), import_prop_types.default.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   *
   * The value must have reference equality with the option in order to be selected.
   */
  value: import_prop_types.default.any
} : void 0;
var ToggleButtonGroup_default = ToggleButtonGroup;

export {
  getToggleButtonGroupUtilityClass,
  toggleButtonGroupClasses_default,
  ToggleButtonGroup_default
};
//# sourceMappingURL=chunk-S5PZEHQW.js.map
