import React, { useMemo, useState, useContext } from "react";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
import makeAnimated from "react-select/animated";
import { ITagSelect, ITagSelectOption, TOption } from "./ITagSelect";
import { customStyles } from "./utils";
import { CustomValueContext } from "../Form";

const TagSelectControlled = ({
  color = "primary",
  className = "",
  wrapperClasses = "col-md",
  isValid = true,
  label,
  disabled = false,
  selectOptions,
  noOptionsMessage = "No options",
  loadingMessage = "loading...",
  onChange = () => {
    return;
  },
}: ITagSelect<HTMLDivElement>) => {
  const customValueControl = useContext(CustomValueContext);
  customValueControl.setCustomizedReset(() => {
    selectedOptions.splice(0, selectedOptions.length);
    setShownOptions([]);
  });

  const mappedOptions = selectOptions.options.map((option) => {
    return { value: String(option.id), label: option.label };
  });
  const selectedOptions: TOption[] = useMemo(() => [], []);
  const [shownOptions, setShownOptions] = useState<ITagSelectOption[]>([]);

  const onChangeHandler = (
    _: OnChangeValue<ITagSelectOption, boolean>,
    actionMeta: ActionMeta<ITagSelectOption>
  ) => {
    if (actionMeta.action === "select-option" && actionMeta.option) {
      selectedOptions.push({
        id: actionMeta.option.value,
        label: actionMeta.option.label,
      });
    } else if (actionMeta.action === "create-option") {
      selectedOptions.push({ label: actionMeta.option.value });
    } else if (
      (actionMeta.action === "remove-value" || "pop-value") &&
      !(actionMeta.action === "clear")
    ) {
      let counter = 0;
      selectedOptions.forEach((option) => {
        if (option.label === actionMeta.removedValue?.label) {
          selectedOptions.splice(counter, 1);
        }
        counter++;
      });
    } else if (actionMeta.action === "clear") {
      selectedOptions.splice(0, selectedOptions.length);
    }
    setShownOptions(
      selectedOptions.map((option) => ({
        value: `${option.id ? option.id : option.label}`,
        label: option.label,
      }))
    );
    onChange(selectedOptions);
  };

  return (
    <div
      className={["form-floating", "multi-select-wrapper", wrapperClasses].join(
        " "
      )}
    >
      <CreatableSelect
        id={`${label.replace(/\s+/g, "-").toLowerCase()}`}
        isMulti
        onChange={onChangeHandler}
        options={selectOptions.isLoading ? [] : mappedOptions}
        styles={customStyles(color, isValid)}
        className={className}
        isDisabled={disabled}
        isLoading={selectOptions.isLoading}
        noOptionsMessage={() => noOptionsMessage}
        loadingMessage={() => loadingMessage}
        placeholder={label}
        components={makeAnimated()}
        value={shownOptions}
      />
    </div>
  );
};

export default TagSelectControlled;
